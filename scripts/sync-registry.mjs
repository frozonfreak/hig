#!/usr/bin/env node
/**
 * Build rules/registry.yaml from rules/INDEX.md + Layer 7 severities in HIG.md.
 * Run after INDEX or HIG guardrail changes: node scripts/sync-registry.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function extractIndexRows(text) {
  const block = text.split('## Complete rule ID registry')[1]?.split('## Archetype applicability')[0] ?? '';
  const rows = [];
  for (const line of block.split(/\r?\n/)) {
    const match = line.match(/^\|\s*(HIG-[A-Z0-9]+-\d+)\s*\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|/);
    if (!match) continue;
    rows.push({
      id: match[1],
      summary: match[2].trim(),
      module: match[3].trim(),
      hig_section: match[4].trim(),
    });
  }
  return rows;
}

function extractGuardrails(higText) {
  const block =
    higText.match(/```yaml\r?\nagent_enforcement_rules:[\s\S]*?```/)?.[0] ?? '';
  const map = new Map();
  const chunks = block.split(/\n    - id: /).slice(1);
  for (const chunk of chunks) {
    const id = chunk.match(/^(HIG-[A-Z0-9]+-\d+)/)?.[1];
    if (!id) continue;
    const severity = chunk.match(/\n      severity: (\w+)/)?.[1];
    const archetypesMatch = chunk.match(/\n      archetypes: \[([^\]]+)\]/);
    const archetypes = archetypesMatch
      ? archetypesMatch[1].split(',').map((s) => s.trim())
      : undefined;
    if (severity) map.set(id, { severity, archetypes });
  }
  return map;
}

const QUICK_PROFILE_IDS = new Set([
  'HIG-SIM-001',
  'HIG-DOC-001',
  'HIG-DOC-002',
  'HIG-DOC-003',
  'HIG-TOK-001',
  'HIG-TOK-002',
  'HIG-MOT-001',
  'HIG-MOT-002',
  'HIG-MOT-003',
  'HIG-MOT-004',
  'HIG-MOT-005',
  'HIG-CQ-001',
  'HIG-CQ-002',
  'HIG-UX-001',
  'HIG-A11Y-001',
  'HIG-A11Y-002',
  'HIG-A11Y-003',
  'HIG-A11Y-004',
  'HIG-A11Y-005',
  'HIG-A11Y-006',
  'HIG-A11Y-007',
  'HIG-A11Y-008',
  'HIG-SSR-001',
  'HIG-SSR-002',
  'HIG-SSR-003',
  'HIG-MUT-001',
  'HIG-PERF-001',
  'HIG-PERF-002',
]);

const STATIC_ONLY = new Set([
  'HIG-TOK-001',
  'HIG-TOK-002',
  'HIG-MOT-001',
  'HIG-MOT-002',
  'HIG-MOT-003',
  'HIG-MOT-004',
  'HIG-MOT-005',
  'HIG-CQ-001',
  'HIG-CQ-002',
  'HIG-UX-001',
  'HIG-I18N-001',
  'HIG-A11Y-001',
  'HIG-A11Y-005',
  'HIG-MUT-001',
  'HIG-SEC-001',
  'HIG-VT-001',
  'HIG-SSR-002',
]);

const STATIC_AND_RUNTIME = new Set([
  'HIG-A11Y-004',
  'HIG-A11Y-003',
  'HIG-A11Y-006',
  'HIG-A11Y-007',
  'HIG-A11Y-008',
  'HIG-FRM-001',
  'HIG-DOC-001',
  'HIG-DOC-002',
  'HIG-DOC-003',
  'HIG-DOC-004',
  'HIG-DOC-005',
  'HIG-DOC-006',
  'HIG-SEO-001',
  'HIG-SEO-002',
  'HIG-SEO-003',
  'HIG-SSR-001',
  'HIG-SSR-003',
  'HIG-SEC-002',
  'HIG-SEC-004',
]);

const OBSERVATION = new Set(['HIG-PERF-002']);

const AUTOFIX = {
  'HIG-MOT-001': 'safe',
  'HIG-A11Y-004': 'safe',
  'HIG-A11Y-005': 'unsafe',
  'HIG-UX-001': 'unsafe',
  'HIG-I18N-001': 'unsafe',
  'HIG-CQ-001': 'none',
  'HIG-CQ-002': 'none',
  'HIG-MUT-001': 'none',
};

const ESLINT = {
  'HIG-CQ-001': 'web-hig/enforce-container-queries',
  'HIG-CQ-002': 'web-hig/enforce-container-queries',
  'HIG-SSR-002': 'web-hig/streaming-boundary',
  'HIG-A11Y-004': 'web-hig/no-unlabeled-icon-buttons',
  'HIG-MOT-004': 'web-hig/micro-animation-budget',
  'HIG-MUT-001': 'web-hig/no-optimistic-destructive',
  'HIG-MOT-001': 'web-hig/no-transition-all',
  'HIG-FRM-001': 'web-hig/require-form-label',
  'HIG-A11Y-001': 'web-hig/reduced-motion-required',
};

function defaultArchetypes(id, guardrail) {
  if (guardrail?.archetypes) return guardrail.archetypes;
  if (id.startsWith('HIG-SEO-')) return ['content', 'commerce'];
  if (id.startsWith('HIG-SSR-')) return ['commerce', 'application', 'auth'];
  if (id.startsWith('HIG-EXP-')) return ['content'];
  if (id.startsWith('HIG-SRCH-')) return ['commerce', 'application'];
  if (id.startsWith('HIG-DEN-')) return ['application'];
  if (id === 'HIG-MUT-002') return ['commerce', 'application'];
  if (
    id.startsWith('HIG-ERR-') ||
    id.startsWith('HIG-EMP-') ||
    id.startsWith('HIG-LOD-') ||
    id === 'HIG-FRM-001' ||
    id === 'HIG-NTF-001'
  ) {
    return ['commerce', 'application', 'auth'];
  }
  if (id === 'HIG-SEC-004') return ['commerce', 'application', 'auth'];
  return ['content', 'commerce', 'application', 'auth'];
}

function evaluationFor(id) {
  if (OBSERVATION.has(id)) return ['observation'];
  if (STATIC_ONLY.has(id)) return ['static'];
  if (STATIC_AND_RUNTIME.has(id)) return ['static', 'runtime'];
  if (id === 'HIG-A11Y-002') return ['manual', 'runtime'];
  if (id === 'HIG-SIM-001') return ['manual'];
  if (id.startsWith('HIG-EXP-')) return ['manual', 'runtime'];
  if (id.startsWith('HIG-PERF-')) return ['runtime', 'observation'];
  if (id.startsWith('HIG-SEC-')) return ['static', 'manual'];
  return ['manual'];
}

function defaultSeverity(id, guardrail) {
  if (guardrail?.severity) return guardrail.severity;
  if (id === 'HIG-SIM-001') return 'warning';
  if (id.startsWith('HIG-EXP-')) return 'error';
  if (id === 'HIG-VT-001') return 'warning';
  return 'warning';
}

function yamlQuote(text) {
  if (!/[:\n#'"]/.test(text)) return text;
  return `"${text.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

const version = read('VERSION').trim();
const rows = extractIndexRows(read('rules/INDEX.md'));
const guardrails = extractGuardrails(read('HIG.md'));

if (!rows.length) {
  console.error('No INDEX registry rows found');
  process.exit(1);
}

const lines = [
  '# The Web HIG — machine-readable rule registry',
  `# Version: ${version}`,
  '# Normative prose: HIG.md · Index: rules/INDEX.md · Tooling: NPM-TOOLING.md',
  '# Regenerate: node scripts/sync-registry.mjs',
  '',
  `version: "${version}"`,
  '',
  'rules:',
];

for (const row of rows) {
  const guard = guardrails.get(row.id);
  const severity = defaultSeverity(row.id, guard);
  const profiles = QUICK_PROFILE_IDS.has(row.id)
    ? ['quick', 'practical', 'full']
    : ['practical', 'full'];
  const archetypes = defaultArchetypes(row.id, guard);
  const evaluation = evaluationFor(row.id);
  const autofix = AUTOFIX[row.id] ?? 'none';
  const eslint = ESLINT[row.id];

  lines.push(`  ${row.id}:`);
  lines.push(`    severity: ${severity}`);
  lines.push(`    requirement: ${yamlQuote(row.summary)}`);
  lines.push(`    profiles:`);
  for (const p of profiles) lines.push(`      - ${p}`);
  lines.push(`    archetypes:`);
  for (const a of archetypes) lines.push(`      - ${a}`);
  lines.push(`    evaluation:`);
  for (const e of evaluation) lines.push(`      - ${e}`);
  lines.push(`    autofix: ${autofix}`);
  lines.push(`    module: ${row.module}`);
  lines.push(`    hig_section: ${yamlQuote(row.hig_section)}`);
  if (eslint) lines.push(`    eslint_rule: ${eslint}`);
  lines.push('');
}

const outPath = path.join(root, 'rules/registry.yaml');
fs.writeFileSync(outPath, `${lines.join('\n').trimEnd()}\n`, 'utf8');
console.log(`Wrote ${path.relative(root, outPath)} (${rows.length} rules)`);
