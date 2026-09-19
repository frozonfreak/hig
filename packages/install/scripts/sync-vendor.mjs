#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const pkgRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = path.join(pkgRoot, '..', '..');
const vendor = path.join(pkgRoot, 'vendor');

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else copyFile(from, to);
  }
}

if (!fs.existsSync(path.join(repoRoot, 'HIG-QUICK.md'))) {
  throw new Error(`Cannot vendor HIG files; missing repo root at ${repoRoot}`);
}

fs.rmSync(vendor, { recursive: true, force: true });

for (const name of ['VERSION', 'HIG-QUICK.md', 'HIG-CORE.md', 'HIG-LITE.md', 'HIG.md']) {
  copyFile(path.join(repoRoot, name), path.join(vendor, name));
}

copyFile(
  path.join(repoRoot, 'examples', 'hig-scope.example.md'),
  path.join(vendor, 'hig-scope.example.md'),
);
copyDir(path.join(repoRoot, 'skills', 'web-hig'), path.join(vendor, 'skills', 'web-hig'));
copyDir(path.join(repoRoot, 'examples', 'agent-rules'), path.join(vendor, 'agent-rules'));
copyDir(path.join(repoRoot, 'rules'), path.join(vendor, 'rules'));
copyDir(path.join(repoRoot, 'framework'), path.join(vendor, 'framework'));

console.log(`Vendored The Web HIG payload into ${vendor}`);
