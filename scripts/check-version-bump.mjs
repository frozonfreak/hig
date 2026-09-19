#!/usr/bin/env node
/**
 * The Web HIG — version bump rules (see VERSIONING.md)
 * Run: node scripts/check-version-bump.mjs
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];

function git(args) {
  return execSync(`git ${args}`, { cwd: root, encoding: 'utf8' }).trim();
}

function parseSemver(value) {
  const match = String(value)
    .trim()
    .replace(/^v/, '')
    .match(/^(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return { major: Number(match[1]), minor: Number(match[2]), patch: Number(match[3]), raw: `${match[1]}.${match[2]}.${match[3]}` };
}

function compare(a, b) {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  return a.patch - b.patch;
}

function bumpKind(from, to) {
  if (to.major > from.major) return 'major';
  if (to.minor > from.minor) return 'minor';
  if (to.patch > from.patch) return 'patch';
  return 'none';
}

function posix(file) {
  return file.replace(/\\/g, '/');
}

function isAlwaysContract(file) {
  const rel = posix(file);
  return (
    rel === 'VERSION' ||
    rel === 'HIG.md' ||
    rel === 'HIG-CORE.md' ||
    rel === 'HIG-LITE.md' ||
    rel === 'EVALUATOR.md' ||
    rel.startsWith('rules/') ||
    rel.startsWith('framework/') ||
    rel.startsWith('schema/')
  );
}

function diffTouchesNumberedRules(baseSha, file) {
  let diff = '';
  try {
    diff = git(`diff -U0 ${baseSha} -- "${file}"`);
  } catch {
    return false;
  }
  return /^[+-]\s*\d+\.\s+/m.test(diff);
}

function resolveBaseRef() {
  if (process.env.GITHUB_EVENT_NAME === 'pull_request') {
    const base = process.env.GITHUB_BASE_REF || process.env.BASE_REF;
    if (base) return `origin/${base}`;
  }
  const before = process.env.GITHUB_EVENT_BEFORE;
  if (before && !/^0+$/.test(before)) return before;
  try {
    git('rev-parse --verify origin/main');
    return 'origin/main';
  } catch {
    return null;
  }
}

const baseRef = resolveBaseRef();
if (!baseRef) {
  console.log('No comparison ref; skipping version bump rules.');
  process.exit(0);
}

let baseSha;
try {
  baseSha = git(`rev-parse ${baseRef}`);
} catch {
  console.log(`Cannot resolve ${baseRef}; skipping version bump rules.`);
  process.exit(0);
}

const headSha = git('rev-parse HEAD');
if (headSha === baseSha) {
  console.log('HEAD equals comparison ref; skipping version bump rules.');
  process.exit(0);
}

const changed = git(`diff --name-only ${baseSha}`)
  .split(/\r?\n/)
  .map(posix)
  .filter(Boolean);

const contractChanged = changed.filter((file) => {
  if (isAlwaysContract(file)) return true;
  if (file === 'HIG-QUICK.md') return diffTouchesNumberedRules(baseSha, file);
  return false;
});

const headVersion = parseSemver(fs.readFileSync(path.join(root, 'VERSION'), 'utf8'));
let baseVersionRaw;
try {
  baseVersionRaw = git(`show ${baseSha}:VERSION`).trim();
} catch {
  baseVersionRaw = headVersion?.raw ?? '';
}
const baseVersion = parseSemver(baseVersionRaw);

if (!headVersion) errors.push('VERSION is not valid semver X.Y.Z');
if (!baseVersion) errors.push(`base VERSION (${baseVersionRaw || 'missing'}) is not valid semver`);

if (headVersion && baseVersion) {
  const delta = compare(headVersion, baseVersion);
  if (delta < 0) {
    errors.push(`VERSION decreased (${baseVersion.raw} → ${headVersion.raw})`);
  }
  if (contractChanged.length && delta === 0) {
    errors.push(
      [
        `Contract files changed without a VERSION bump (${headVersion.raw}). See VERSIONING.md.`,
        ...contractChanged.map((file) => `  - ${file}`),
      ].join('\n'),
    );
  }
  if (delta > 0) {
    const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');
    const hasVersionHeading = changelog.includes(`## [${headVersion.raw}]`);
    const unreleasedSection = changelog.split('## [Unreleased]')[1]?.split(/^## \[/m)[0] ?? '';
    const unreleasedItems = /^\s*-\s+\S+/m.test(unreleasedSection);
    if (!hasVersionHeading && !unreleasedItems) {
      errors.push(
        `VERSION bumped to ${headVersion.raw} but CHANGELOG.md has no ## [${headVersion.raw}] section and Unreleased has no entries`,
      );
    }
    const kind = bumpKind(baseVersion, headVersion);
    if (kind === 'minor' || kind === 'major') {
      const notes = fs.readFileSync(path.join(root, 'RELEASE_NOTES.md'), 'utf8');
      if (!notes.includes(`v${headVersion.raw}`)) {
        errors.push(`${kind} bump to ${headVersion.raw} requires a RELEASE_NOTES.md entry`);
      }
    }
  }
}

if (errors.length) {
  console.error('Version bump rules failed:');
  for (const error of errors) console.error(`  ✗ ${error}`);
  process.exit(1);
}

console.log(
  `✓ Version bump rules passed (VERSION ${headVersion.raw} vs ${baseVersion.raw}, contract files changed: ${contractChanged.length})`,
);
