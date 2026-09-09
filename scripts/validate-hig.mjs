#!/usr/bin/env node
/**
 * Web HIG — contract validation (Phase 3)
 * Run: node scripts/validate-hig.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];

function read(file) {
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function fail(msg) {
  errors.push(msg);
}

function warn(msg) {
  warnings.push(msg);
}

function extractManifestFiles(yaml) {
  const files = new Set();
  for (const match of yaml.matchAll(/^\s+file:\s+(\S+)/gm)) {
    files.add(match[1].replace(/#.*$/, '').trim());
  }
  return files;
}

function extractRuleIds(text) {
  return new Set([...text.matchAll(/HIG-[A-Z0-9]+-\d+/g)].map((m) => m[0]));
}

function extractVersionFromTitle(md) {
  const m = md.match(/^#\s+.+\s+v(\d+\.\d+\.\d+)/m);
  return m ? m[1] : null;
}

// --- VERSION sync ---
const versionFile = read('VERSION').trim();
const manifestYaml = read('rules/manifest.yaml');
const manifestVersion = manifestYaml.match(/^version:\s*"([^"]+)"/m)?.[1];
const higVersion = extractVersionFromTitle(read('HIG.md'));
const liteVersion = read('HIG-LITE.md').match(/\*\*Version:\*\*\s+v(\d+\.\d+\.\d+)/)?.[1];
const coreVersion = read('HIG-CORE.md').match(/\*\*Version:\*\*\s+v(\d+\.\d+\.\d+)/)?.[1];

if (!manifestVersion) fail('manifest.yaml: missing version field');
if (versionFile !== manifestVersion) {
  fail(`VERSION (${versionFile}) !== manifest.yaml (${manifestVersion})`);
}
if (higVersion !== versionFile) {
  fail(`HIG.md title (${higVersion}) !== VERSION (${versionFile})`);
}
if (liteVersion !== versionFile) {
  fail(`HIG-LITE.md (${liteVersion}) !== VERSION (${versionFile})`);
}
if (coreVersion !== versionFile) {
  fail(`HIG-CORE.md (${coreVersion}) !== VERSION (${versionFile})`);
}

// --- Referenced files exist ---
for (const file of extractManifestFiles(manifestYaml)) {
  if (!exists(file)) {
    fail(`manifest references missing file: ${file}`);
  }
}

// --- Archetype packs ---
const archetypeIds = ['content', 'commerce', 'application', 'auth'];
for (const id of archetypeIds) {
  const pack = `rules/archetypes/${id}.md`;
  if (!exists(pack)) fail(`missing archetype pack: ${pack}`);
}

if (!exists('rules/applicability.md')) {
  fail('missing rules/applicability.md');
}

// --- Module files registered in manifest ---
const rulesDir = path.join(root, 'rules');
const moduleFiles = fs
  .readdirSync(rulesDir)
  .filter((f) => f.endsWith('.md') && f !== 'INDEX.md' && f !== 'applicability.md')
  .map((f) => `rules/${f}`);

for (const file of moduleFiles) {
  if (!manifestYaml.includes(file)) {
    warn(`rules module not referenced in manifest: ${file}`);
  }
}

// --- Rule IDs: INDEX vs manifest ---
const indexText = read('rules/INDEX.md');
const indexRuleIds = extractRuleIds(indexText);
const manifestRuleIds = extractRuleIds(manifestYaml);

for (const id of manifestRuleIds) {
  if (!indexRuleIds.has(id)) {
    warn(`rule ID in manifest but not INDEX.md: ${id}`);
  }
}

for (const id of indexRuleIds) {
  if (!manifestRuleIds.has(id) && id !== 'HIG-SIM-001') {
    warn(`rule ID in INDEX.md but not manifest modules: ${id}`);
  }
}

// --- HIG-LITE rule ID links ---
const liteText = read('HIG-LITE.md');
for (const id of indexRuleIds) {
  if (!liteText.includes(id) && !['HIG-VT-001', 'HIG-I18N-001'].includes(id)) {
    warn(`rule ID not mentioned in HIG-LITE.md: ${id}`);
  }
}

// --- Report ---
if (warnings.length) {
  console.warn('Warnings:');
  for (const w of warnings) console.warn(`  ⚠ ${w}`);
}

if (errors.length) {
  console.error('Validation failed:');
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}

console.log(`✓ Web HIG v${versionFile} validation passed (${moduleFiles.length} modules, ${archetypeIds.length} archetype packs)`);
