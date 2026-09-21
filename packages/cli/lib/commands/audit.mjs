export async function runAudit(argv) {
  if (argv.includes('--help')) {
    console.log(`Usage: web-hig audit [url]

Status: experimental / not shipped.

Runtime audit (Playwright + axe) is planned. Use static evaluation today:

  web-hig check
  web-hig check --json

See NPM-TOOLING.md Phase 5 for the runtime roadmap.
`);
    return 0;
  }
  console.error(
    'web-hig audit is experimental and not available yet. Use `web-hig check` for static Layer 8 findings.',
  );
  return 2;
}
