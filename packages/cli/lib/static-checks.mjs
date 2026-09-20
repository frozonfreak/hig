import fs from 'node:fs';
import path from 'node:path';

const SOURCE_EXTENSIONS = new Set([
  '.css',
  '.scss',
  '.vue',
  '.jsx',
  '.tsx',
  '.js',
  '.ts',
  '.html',
  '.astro',
]);

export function collectScopedFiles(projectRoot, scope) {
  const patterns = scope?.files?.length ? scope.files : ['**/*'];
  const excludes = scope?.exclude ?? [];
  const files = [];

  for (const pattern of patterns) {
    const base = pattern.replace(/\/\*\*$/, '').replace(/\*\*$/, '');
    const scanRoot = path.join(projectRoot, base);
    if (!fs.existsSync(scanRoot)) continue;
    walk(scanRoot, files);
  }

  return files.filter((file) => {
    const rel = path.relative(projectRoot, file).split(path.sep).join('/');
    if (!SOURCE_EXTENSIONS.has(path.extname(file))) return false;
    return !excludes.some((ex) => matchGlob(rel, ex));
  });
}

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(filePath, out);
    else out.push(filePath);
  }
}

function matchGlob(rel, pattern) {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '.*')
    .replace(/\*/g, '[^/]*');
  return new RegExp(`^${escaped}$`).test(rel);
}

export function runStaticChecks(files, { applicableRuleIds }) {
  const findings = [];
  for (const filePath of files) {
    const text = fs.readFileSync(filePath, 'utf8');
    const rel = filePath.split(path.sep).join('/');

    if (applicableRuleIds.has('HIG-MOT-001')) {
      for (const match of text.matchAll(/transition\s*:\s*[^;\n]*\ball\b/gi)) {
        findings.push({
          rule_id: 'HIG-MOT-001',
          message: 'Application CSS uses transition: all — enumerate properties instead.',
          location: `${rel}:${lineNumberAt(text, match.index)}`,
        });
      }
    }

    if (applicableRuleIds.has('HIG-A11Y-001')) {
      const hasReducedMotion =
        /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/i.test(text) ||
        /@media\s*\(\s*prefers-reduced-motion\s*:\s*no-preference\s*\)/i.test(text);
      const mentionsMotion =
        /transition\s*:|animation\s*:|@keyframes/i.test(text) ||
        (path.extname(filePath) === '.vue' && /<transition/i.test(text));
      if (mentionsMotion && !hasReducedMotion && isStylesheetLike(filePath)) {
        findings.push({
          rule_id: 'HIG-A11Y-001',
          message: 'Motion styles without a prefers-reduced-motion media query.',
          location: rel,
        });
      }
    }
  }
  return findings;
}

function isStylesheetLike(filePath) {
  const ext = path.extname(filePath);
  return ext === '.css' || ext === '.scss' || ext === '.vue' || ext === '.astro';
}

function lineNumberAt(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}
