export async function runAudit(argv) {
  if (argv.includes('--help')) {
    console.log('Usage: web-hig audit [url]\n\nRuntime audit is planned (Playwright + axe).');
    return 0;
  }
  console.error('web-hig audit is not implemented yet. See NPM-TOOLING.md Phase 5.');
  return 1;
}
