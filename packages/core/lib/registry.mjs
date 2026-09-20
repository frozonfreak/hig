import fs from 'node:fs';
import path from 'node:path';

export function parseRegistryYaml(yaml) {
  const version = yaml.match(/^version:\s*"([^"]+)"/m)?.[1];
  const rules = new Map();
  for (const match of yaml.matchAll(/^  (HIG-[A-Z0-9]+-\d+):\r?\n((?:    .+\r?\n)*)/gm)) {
    const id = match[1];
    const body = match[2];
    const pick = (key) => body.match(new RegExp(`^    ${key}:\\s*(.+)$`, 'm'))?.[1]?.trim();
    const profiles = [...body.matchAll(/^    profiles:\r?\n((?:      - \S+\r?\n)*)/gm)][0];
    const profileList = profiles
      ? [...profiles[1].matchAll(/^      - (\S+)/gm)].map((m) => m[1])
      : [];
    const archetypeBlock = [...body.matchAll(/^    archetypes:\r?\n((?:      - \S+\r?\n)*)/gm)][0];
    const archetypeList = archetypeBlock
      ? [...archetypeBlock[1].matchAll(/^      - (\S+)/gm)].map((m) => m[1])
      : [];
    const evalBlock = [...body.matchAll(/^    evaluation:\r?\n((?:      - \S+\r?\n)*)/gm)][0];
    const evaluationList = evalBlock
      ? [...evalBlock[1].matchAll(/^      - (\S+)/gm)].map((m) => m[1])
      : [];

    rules.set(id, {
      id,
      severity: pick('severity'),
      requirement: pick('requirement')?.replace(/^"|"$/g, ''),
      profiles: profileList,
      archetypes: archetypeList,
      evaluation: evaluationList,
      autofix: pick('autofix'),
      module: pick('module'),
      hig_section: pick('hig_section')?.replace(/^"|"$/g, ''),
      eslint_rule: pick('eslint_rule'),
    });
  }
  return { version, rules };
}

export function loadRegistry(higRoot) {
  const filePath = path.join(higRoot, 'rules', 'registry.yaml');
  const yaml = fs.readFileSync(filePath, 'utf8');
  return parseRegistryYaml(yaml);
}

export function filterRulesByContract(registry, { profile, archetype }) {
  const applicable = [];
  for (const rule of registry.rules.values()) {
    if (!rule.profiles.includes(profile)) continue;
    if (!rule.archetypes.includes(archetype)) continue;
    if (!rule.evaluation.includes('static')) continue;
    applicable.push(rule);
  }
  return applicable;
}
