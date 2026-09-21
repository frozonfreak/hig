import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runCheck } from '../../packages/cli/lib/commands/check.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const goldenDir = path.join(root, 'examples/golden-path');

assert.ok(fs.existsSync(path.join(goldenDir, 'web-hig.yaml')), 'golden-path web-hig.yaml');
assert.ok(fs.existsSync(path.join(goldenDir, 'src/app.css')), 'golden-path planted violation');

const prevCwd = process.cwd();
const prevRoot = process.env.WEB_HIG_ROOT;
process.env.WEB_HIG_ROOT = root;
process.chdir(goldenDir);
try {
  const code = await runCheck([]);
  assert.equal(code, 1, 'golden-path must fail check on planted HIG-MOT-001');
} finally {
  process.chdir(prevCwd);
  if (prevRoot === undefined) delete process.env.WEB_HIG_ROOT;
  else process.env.WEB_HIG_ROOT = prevRoot;
}

console.log('golden-path.test.mjs passed');
