import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  extractIndexRegistry,
  extractQuickNumberedRules,
  parseQuickRuleMapYaml,
} from '../lib/contract-parse.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

const version = read('VERSION').trim();
const quickRules = extractQuickNumberedRules(read('HIG-QUICK.md'));
assert.equal(quickRules.length, 98, 'HIG-QUICK should expose 98 numbered rules');

const registry = extractIndexRegistry(read('rules/INDEX.md'));
assert.ok(registry.length >= 70, 'INDEX registry should list canonical rule IDs');

const { version: mapVersion, entries } = parseQuickRuleMapYaml(read('rules/quick-rule-map.yaml'));
assert.equal(mapVersion, version, 'quick-rule-map version should match VERSION');
assert.equal(entries.length, 98, 'quick-rule-map should have 98 entries');

const registryIds = new Set(registry.map((row) => row.id));
for (const entry of entries) {
  for (const id of entry.ids) {
    assert.ok(registryIds.has(id), `${id} from Quick #${entry.number} must exist in INDEX`);
  }
}

const validateRun = spawnSync(process.execPath, ['scripts/validate-hig.mjs'], {
  cwd: root,
  encoding: 'utf8',
});
assert.equal(validateRun.status, 0, validateRun.stderr || validateRun.stdout);

console.log('validate-hig.test.mjs passed');
