#!/usr/bin/env node
/**
 * Generate static documentation-site artifacts (sitemap, robots, 404)
 * and verify share/SEO metadata on the landing page.
 *
 * Run: node scripts/build-docs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PUBLIC_DOC_PAGES, SITE, renderSitemapXml } from './doc-site.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const docs = path.join(root, 'docs');

export { SITE };

const errors = [];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function writeDocs(name, contents) {
  fs.writeFileSync(path.join(docs, name), contents.endsWith('\n') ? contents : `${contents}\n`, 'utf8');
}

function fail(msg) {
  errors.push(msg);
}

const version = read('VERSION').trim();
const home = `${SITE.origin}/`;
const sitemapUrl = `${SITE.origin}/sitemap.xml`;
const stylesheet = `${SITE.origin}/css/site.css`;

writeDocs(
  'robots.txt',
  ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl}`, ''].join('\n'),
);

writeDocs('sitemap.xml', renderSitemapXml(SITE.origin));

writeDocs(
  '404.html',
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page not found — The Web HIG</title>
  <meta name="description" content="This URL is not part of The Web HIG documentation site.">
  <meta name="robots" content="noindex">
  <link rel="canonical" href="${home}">
  <link rel="stylesheet" href="${stylesheet}">
</head>
<body>
  <a class="skip-link" href="#top">Skip to main content</a>
  <main id="top" tabindex="-1">
    <header class="hero">
      <p class="hero-eyebrow">The Web HIG</p>
      <h1>Page not found</h1>
      <p class="lead">That URL is not part of this documentation site.</p>
      <div class="hero-actions">
        <a class="btn btn-primary" href="${home}">Back to the documentation home</a>
        <a class="btn btn-secondary" href="${SITE.github}">View on GitHub</a>
      </div>
    </header>
  </main>
</body>
</html>
`,
);

const index = read('docs/index.html');
const requiredSnippets = [
  ['canonical URL (HIG-SEO-001)', `rel="canonical" href="${home}"`],
  ['meta description (HIG-SEO-001)', 'name="description"'],
  ['Open Graph image (HIG-SEO-002)', `property="og:image" content="${SITE.origin}/social/og-image.png"`],
  ['Twitter large image card (HIG-SEO-002)', 'name="twitter:card" content="summary_large_image"'],
  ['JSON-LD structured data (HIG-SEO-003)', 'type="application/ld+json"'],
  ['JSON-LD version stamp', `"version": "${version}"`],
];

for (const [label, snippet] of requiredSnippets) {
  if (!index.includes(snippet)) {
    fail(`docs/index.html missing ${label}`);
  }
}

if (!fs.existsSync(path.join(docs, 'social', 'og-image.png'))) {
  fail('docs/social/og-image.png is missing (Open Graph share card)');
}

if (!fs.existsSync(path.join(docs, '.nojekyll'))) {
  fail('docs/.nojekyll is missing (required so GitHub Pages serves static files as-is)');
}

for (const page of PUBLIC_DOC_PAGES) {
  if (!fs.existsSync(path.join(docs, page))) {
    fail(`docs/${page} is missing (linked from docs/index.html navigation)`);
  }
}

if (errors.length) {
  console.error('Documentation site build failed:');
  for (const err of errors) console.error(`  ✗ ${err}`);
  process.exit(1);
}

console.log(`✓ Documentation site artifacts generated for v${version} → ${home}`);
