import fs from 'node:fs';
import path from 'node:path';

const DEFAULTS = {
  profile: 'practical',
  archetype: 'application',
  framework: { name: null },
  scope: { files: ['src/**'], exclude: [], routes: ['/**'] },
  gates: { blocking: 'fail', warnings: 'report', observations: 'report' },
};

export function defaultProjectConfig(higVersion) {
  return {
    version: higVersion,
    ...structuredClone(DEFAULTS),
  };
}

function parseScalar(line) {
  const trimmed = line.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

/** Minimal web-hig.yaml parser (no dependency). */
export function loadProjectConfig(cwd, fileName = 'web-hig.yaml') {
  const configPath = path.join(cwd, fileName);
  if (!fs.existsSync(configPath)) {
    return { configPath: null, config: null, exists: false };
  }

  const text = fs.readFileSync(configPath, 'utf8');
  const config = structuredClone(DEFAULTS);
  let version = null;
  let section = null;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, '').trimEnd();
    if (!line.trim() || line.trim().startsWith('#')) continue;

    if (/^scope:\s*$/.test(line)) {
      section = 'scope';
      continue;
    }
    if (/^framework:\s*$/.test(line)) {
      section = 'framework';
      continue;
    }
    if (/^gates:\s*$/.test(line)) {
      section = 'gates';
      continue;
    }

    const top = line.match(/^(\w+):\s*(.*)$/);
    if (top && !line.startsWith(' ')) {
      section = null;
      const [, key, value] = top;
      if (key === 'version') version = parseScalar(value);
      if (key === 'profile') config.profile = parseScalar(value);
      if (key === 'archetype') config.archetype = parseScalar(value);
      continue;
    }

    const nested = line.match(/^\s{2}(\w+):\s*(.*)$/);
    if (!nested) continue;
    const [, key, value] = nested;

    if (section === 'framework' && key === 'name') {
      config.framework.name = parseScalar(value);
    }
    if (section === 'gates') {
      config.gates[key] = parseScalar(value);
    }
    if (section === 'scope' && (key === 'files' || key === 'exclude' || key === 'routes')) {
      if (!Array.isArray(config.scope[key])) config.scope[key] = [];
    }
  }

  const lines = text.split(/\r?\n/);
  let scopeList = null;
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (/^\s{2}files:\s*$/.test(line)) scopeList = 'files';
    else if (/^\s{2}exclude:\s*$/.test(line)) scopeList = 'exclude';
    else if (/^\s{2}routes:\s*$/.test(line)) scopeList = 'routes';
    else if (/^\s{2}\w/.test(line) && !/^\s{4}-/.test(line)) scopeList = null;
    else if (scopeList && /^\s{4}-\s+(.+)$/.test(line)) {
      config.scope[scopeList].push(parseScalar(line.match(/^\s{4}-\s+(.+)$/)[1]));
    }
  }

  return {
    configPath,
    exists: true,
    config: { version, ...config },
  };
}
