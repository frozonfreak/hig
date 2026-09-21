import fs from 'node:fs';
import path from 'node:path';
import { loadProjectConfig, loadRegistry, resolveHigRoot } from '@web-hig/core';

function parseFlags(argv) {
  const flags = { dryRun: false, config: 'web-hig.yaml' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--dry-run') flags.dryRun = true;
    else if (arg === '--config') flags.config = argv[++i];
  }
  return flags;
}

function readPinnedVersion(cwd) {
  const candidates = [
    path.join(cwd, 'docs', 'hig', 'VERSION'),
    path.join(cwd, 'docs', 'hig', 'version'),
    path.join(cwd, 'VERSION'),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const value = fs.readFileSync(file, 'utf8').trim();
    if (value) return { source: path.relative(cwd, file), version: value };
  }
  return null;
}

function compareSemver(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i += 1) {
    const diff = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

export async function runUpgrade(argv) {
  if (argv.includes('--help')) {
    console.log(`Usage: web-hig upgrade [options]

Compare pinned contract version (web-hig.yaml + docs/hig/VERSION) to the installed HIG registry.

Options:
  --dry-run          Print upgrade steps without changing files
  --config <path>    Config file (default: web-hig.yaml)
`);
    return 0;
  }

  const flags = parseFlags(argv);
  const cwd = process.cwd();
  const higRoot = resolveHigRoot(cwd);
  if (!higRoot) {
    console.error('Cannot find rules/registry.yaml. Set WEB_HIG_ROOT or run from the HIG repository.');
    return 1;
  }

  const registry = loadRegistry(higRoot);
  const loaded = loadProjectConfig(cwd, flags.config);
  const pinned = readPinnedVersion(cwd);
  const configVersion = loaded.exists ? loaded.config.version : null;
  const pinVersion = configVersion || pinned?.version || null;

  if (!pinVersion) {
    console.error('No pinned version found. Add web-hig.yaml version or docs/hig/VERSION.');
    return 1;
  }

  const cmp = compareSemver(pinVersion, registry.version);
  console.log(`Pinned contract: v${pinVersion}${pinned ? ` (${pinned.source})` : ''}`);
  console.log(`Registry at ${higRoot}: v${registry.version}`);

  if (cmp === 0) {
    console.log('\nPin is current — no upgrade needed.');
    return 0;
  }

  if (cmp > 0) {
    console.warn('\nPinned version is newer than the registry (unexpected). Verify WEB_HIG_ROOT.');
    return 1;
  }

  console.log('\nUpgrade available.');
  const steps = [
    `Review RELEASE_NOTES.md / CHANGELOG.md for v${registry.version}.`,
    'Update docs/hig/VERSION and vendored HIG files (or re-run npx @web-hig/install).',
    `Set web-hig.yaml version: "${registry.version}".`,
    'Run your project test suite and npm run validate on vendored pins if applicable.',
  ];
  for (const step of steps) console.log(`  • ${step}`);

  if (flags.dryRun) {
    console.log('\n(dry-run — no files modified)');
    return 0;
  }

  console.log('\nRe-run with --dry-run to preview only. Automatic file rewrites are not implemented yet.');
  return 2;
}
