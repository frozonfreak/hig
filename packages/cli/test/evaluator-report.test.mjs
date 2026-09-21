import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

const example = JSON.parse(
  fs.readFileSync(path.join(root, 'examples/evaluator-report.example.json'), 'utf8'),
);
const schema = JSON.parse(
  fs.readFileSync(path.join(root, 'schema/evaluator-report.schema.json'), 'utf8'),
);

for (const key of schema.required) {
  assert.ok(Object.hasOwn(example, key), `example report missing required field: ${key}`);
}

assert.equal(typeof example.hig_version, 'string');
assert.ok(Array.isArray(example.findings));
assert.ok(example.findings.length > 0);
assert.match(example.findings[0].rule_id, /^HIG-/);

console.log('evaluator-report.test.mjs passed');
