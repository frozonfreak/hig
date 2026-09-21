/**
 * Shared parsers for HIG contract validation and tests.
 */
import fs from 'node:fs';
import path from 'node:path';

export function extractRuleIds(text) {
  return new Set([...text.matchAll(/HIG-[A-Z0-9]+-\d+/g)].map((m) => m[0]));
}

export function extractQuickNumberedRules(text) {
  const rules = [];
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^(\d+)\.\s+(.+)$/);
    if (!match) continue;
    rules.push({ number: Number(match[1]), line: match[2].trim() });
  }
  return rules;
}

export function extractIndexRegistry(text) {
  const block = text.split('## Complete rule ID registry')[1]?.split('## Archetype applicability')[0] ?? '';
  const rows = [];
  const seen = new Set();
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(
      /^\|\s*(HIG-[A-Z0-9]+-\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/,
    );
    if (!match) continue;
    const id = match[1];
    if (seen.has(id)) {
      throw new Error(`INDEX.md duplicate rule ID: ${id}`);
    }
    seen.add(id);
    rows.push({
      id,
      summary: match[2].trim(),
      module: match[3].trim(),
      hig_section: match[4].trim(),
    });
  }
  return rows;
}

export function parseQuickRuleMapYaml(yaml) {
  const version = yaml.match(/^version:\s*"([^"]+)"/m)?.[1];
  const entries = [];
  let current = null;
  for (const line of yaml.split(/\r?\n/)) {
    const num = line.match(/^  - number:\s*(\d+)/);
    if (num) {
      if (current) entries.push(current);
      current = { number: Number(num[1]), ids: [], quick_only: false };
      continue;
    }
    if (!current) continue;
    if (/^\s+quick_only:\s*true/.test(line)) current.quick_only = true;
    const id = line.match(/^\s+- (HIG-[A-Z0-9]+-\d+)/);
    if (id) current.ids.push(id[1]);
  }
  if (current) entries.push(current);
  return { version, entries };
}

export function readRepoFile(root, file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}
