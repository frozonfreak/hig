#!/usr/bin/env node
/**
 * Validate rules/manifest.yaml against schema/manifest.schema.json
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import yaml from 'yaml';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const manifestPath = path.join(root, 'rules/manifest.yaml');
const schemaPath = path.join(root, 'schema/manifest.schema.json');

const manifest = yaml.parse(fs.readFileSync(manifestPath, 'utf8'));
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

if (!validate(manifest)) {
  console.error('manifest.yaml failed JSON Schema validation:');
  for (const err of validate.errors ?? []) {
    console.error(`  ${err.instancePath || '/'} ${err.message}`);
  }
  process.exit(1);
}

console.log('✓ rules/manifest.yaml matches schema/manifest.schema.json');
