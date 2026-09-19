import fs from 'node:fs';
import path from 'node:path';
import { helpText, parseArgs } from './args.mjs';
import { mergeMarked, posixRel, readText, walkFiles } from './files.mjs';
import { resolvePayload } from './payload.mjs';

export async function run(argv, { packageRoot, cwd = process.cwd(), log = console.log } = {}) {
  if (!packageRoot) {
    throw new Error('packageRoot is required');
  }

  const options = parseArgs(argv, { cwd });

  if (options.help) {
    log(helpText());
    return 0;
  }

  const payload = resolvePayload(packageRoot);

  if (options.version) {
    log(payload.version);
    return 0;
  }

  const targetRoot = options.dir;
  const docsDir = path.resolve(targetRoot, options.docsDir);
  const results = [];

  const plan = buildPlan(payload, targetRoot, docsDir, options);
  for (const item of plan) {
    results.push(applyItem(item, options, targetRoot));
  }

  printSummary(log, payload.version, targetRoot, results, options.dryRun);
  return 0;
}

function buildPlan(payload, targetRoot, docsDir, options) {
  const plan = [];
  const pinNames = ['VERSION', 'HIG-QUICK.md', 'HIG-CORE.md'];
  if (options.profile === 'practical' || options.profile === 'full') {
    pinNames.push('HIG-LITE.md');
  }
  if (options.profile === 'full') {
    pinNames.push('HIG.md');
  }

  for (const name of pinNames) {
    plan.push({
      kind: 'copy',
      src: payload.files[name],
      dest: path.join(docsDir, name),
    });
  }

  if (options.profile === 'practical' || options.profile === 'full') {
    plan.push(
      { kind: 'tree', src: payload.files.rules, dest: path.join(docsDir, 'rules') },
      { kind: 'tree', src: payload.files.framework, dest: path.join(docsDir, 'framework') },
    );
  }

  if (options.scope) {
    plan.push({
      kind: 'copy',
      src: payload.files.scope,
      dest: path.join(targetRoot, 'docs', 'hig-scope.md'),
    });
  }

  const editors = new Set(options.editors);
  if (editors.has('cursor')) {
    plan.push(
      { kind: 'copy', src: payload.files.cursorRule, dest: path.join(targetRoot, '.cursor', 'rules', 'hig.mdc') },
      { kind: 'copy', src: payload.files.skill, dest: path.join(targetRoot, '.cursor', 'skills', 'web-hig', 'SKILL.md') },
    );
  }
  if (editors.has('claude')) {
    plan.push(
      { kind: 'merge', src: payload.files.claudeRule, dest: path.join(targetRoot, 'CLAUDE.md') },
      { kind: 'copy', src: payload.files.skill, dest: path.join(targetRoot, '.claude', 'skills', 'web-hig', 'SKILL.md') },
    );
  }
  if (editors.has('copilot')) {
    plan.push(
      { kind: 'merge', src: payload.files.copilotRule, dest: path.join(targetRoot, '.github', 'copilot-instructions.md') },
      {
        kind: 'copy',
        src: payload.files.copilotPathRule,
        dest: path.join(targetRoot, '.github', 'instructions', 'hig.instructions.md'),
      },
      { kind: 'copy', src: payload.files.skill, dest: path.join(targetRoot, '.github', 'skills', 'web-hig', 'SKILL.md') },
    );
  }
  if (editors.has('windsurf')) {
    plan.push(
      { kind: 'copy', src: payload.files.windsurfRule, dest: path.join(targetRoot, '.windsurf', 'rules', 'hig.md') },
      { kind: 'copy', src: payload.files.skill, dest: path.join(targetRoot, '.windsurf', 'skills', 'web-hig', 'SKILL.md') },
    );
  }
  if (editors.has('agents')) {
    plan.push({
      kind: 'merge',
      src: payload.files.agentsRule,
      dest: path.join(targetRoot, 'AGENTS.md'),
    });
  }

  return plan;
}

function applyItem(item, options, targetRoot) {
  if (item.kind === 'tree') {
    return applyTree(item, options, targetRoot);
  }
  if (item.kind === 'merge') {
    return applyMerge(item, options, targetRoot);
  }
  return applyCopy(item, options, targetRoot);
}

function applyCopy(item, options, targetRoot) {
  const exists = fs.existsSync(item.dest);
  const rel = posixRel(targetRoot, item.dest);
  if (exists && !options.force) {
    return { action: options.dryRun ? 'would-skip' : 'skipped', path: rel };
  }
  if (options.dryRun) {
    return { action: 'would-write', path: rel };
  }
  fs.mkdirSync(path.dirname(item.dest), { recursive: true });
  fs.copyFileSync(item.src, item.dest);
  return { action: 'written', path: rel };
}

function applyMerge(item, options, targetRoot) {
  const rel = posixRel(targetRoot, item.dest);
  const exists = fs.existsSync(item.dest);
  const incoming = readText(item.src);
  const existing = exists ? readText(item.dest) : '';
  const next = mergeMarked(existing, incoming);
  if (exists && existing === next) {
    return { action: options.dryRun ? 'would-skip' : 'skipped', path: rel };
  }
  if (options.dryRun) {
    return { action: exists ? 'would-merge' : 'would-write', path: rel };
  }
  fs.mkdirSync(path.dirname(item.dest), { recursive: true });
  fs.writeFileSync(item.dest, next, 'utf8');
  return { action: exists ? 'merged' : 'written', path: rel };
}

function applyTree(item, options, targetRoot) {
  const files = walkFiles(item.src);
  const results = [];
  for (const srcFile of files) {
    const relFromSrc = path.relative(item.src, srcFile);
    const dest = path.join(item.dest, relFromSrc);
    results.push(applyCopy({ kind: 'copy', src: srcFile, dest }, options, targetRoot));
  }
  return results;
}

function printSummary(log, version, targetRoot, results, dryRun) {
  const flat = results.flat(Infinity);
  const groups = {
    written: [],
    merged: [],
    skipped: [],
    'would-write': [],
    'would-merge': [],
    'would-skip': [],
  };
  for (const item of flat) {
    groups[item.action]?.push(item.path);
  }

  const title = dryRun
    ? `The Web HIG v${version} dry run for ${targetRoot}`
    : `The Web HIG v${version} installed into ${targetRoot}`;
  log(title);

  const order = dryRun
    ? [
        ['Would write', 'would-write'],
        ['Would merge', 'would-merge'],
        ['Would skip', 'would-skip'],
      ]
    : [
        ['Written', 'written'],
        ['Merged', 'merged'],
        ['Skipped (exists; use --force)', 'skipped'],
      ];

  for (const [label, key] of order) {
    if (!groups[key].length) continue;
    log('');
    log(`${label}:`);
    for (const filePath of groups[key]) {
      log(`  ${filePath}`);
    }
  }
}
