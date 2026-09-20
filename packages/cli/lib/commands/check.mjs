import fs from 'node:fs';
import path from 'node:path';
import {
  createReport,
  defaultProjectConfig,
  filterRulesByContract,
  loadProjectConfig,
  loadRegistry,
  printTerminalReport,
  resolveHigRoot,
  severityBucketForRule,
} from '@web-hig/core';
import { collectScopedFiles, runStaticChecks } from '../static-checks.mjs';

function parseFlags(argv) {
  const flags = { profile: null, json: false, config: 'web-hig.yaml' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--profile') flags.profile = argv[++i];
    else if (arg === '--json') flags.json = true;
    else if (arg === '--config') flags.config = argv[++i];
  }
  return flags;
}

export async function runCheck(argv) {
  if (argv.includes('--help')) {
    console.log(`Usage: web-hig check [options]

Options:
  --profile <quick|practical|full>   Override web-hig.yaml profile
  --config <path>                    Config file (default: web-hig.yaml)
  --json                             JSON evaluator output
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
  const config = loaded.exists
    ? loaded.config
    : defaultProjectConfig(registry.version);

  if (flags.profile) config.profile = flags.profile;

  const applicableRules = filterRulesByContract(registry, {
    profile: config.profile,
    archetype: config.archetype,
  });

  const files = collectScopedFiles(cwd, config.scope);
  const rawFindings = runStaticChecks(files, { applicableRuleIds: new Set(applicableRules.map((r) => r.id)) });
  const findings = rawFindings.map((f) => {
    const rule = registry.rules.get(f.rule_id);
    return {
      rule_id: f.rule_id,
      dimension: dimensionForRule(f.rule_id),
      severity_bucket: severityBucketForRule(rule?.severity ?? 'error'),
      message: f.message,
      location: f.location,
      evaluation: 'static',
    };
  });

  const report = createReport({
    higVersion: registry.version,
    profile: config.profile,
    archetype: config.archetype,
    framework: config.framework?.name,
    findings,
  });

  if (flags.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log(printTerminalReport(report));
    if (!loaded.exists) {
      console.log('\nNote: no web-hig.yaml found — using default contract.');
    }
    console.log(`\nStatic rules in scope: ${applicableRules.length} · Files scanned: ${files.length}`);
  }

  const failOnBlocking = config.gates?.blocking === 'fail';
  if (failOnBlocking && report.severity_counts.blocking > 0) return 1;
  return 0;
}

function dimensionForRule(ruleId) {
  if (ruleId.startsWith('HIG-A11Y')) return 'accessibility';
  if (ruleId.startsWith('HIG-MOT') || ruleId.startsWith('HIG-VT')) return 'motion';
  if (ruleId.startsWith('HIG-CQ')) return 'responsive';
  if (ruleId.startsWith('HIG-TOK')) return 'ux';
  return 'ux';
}
