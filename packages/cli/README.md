# `@web-hig/cli`

Command-line conformance tooling for [The Web HIG](https://github.com/frozonfreak/hig).

## Local development (monorepo)

```bash
cd packages/cli
npm install
node bin/cli.mjs explain HIG-A11Y-004
```

From a product repo, point at the spec checkout:

```bash
set WEB_HIG_ROOT=C:\path\to\hig
node C:\path\to\hig\packages\cli\bin\cli.mjs check
```

## Commands

| Command | Status |
| --- | --- |
| `init` | Wraps `@web-hig/install` |
| `check` | Static checks + evaluator report |
| `explain` | Rule metadata from `rules/registry.yaml` |
| `audit` | Planned (Playwright) |
| `upgrade` | Planned |

Design: [NPM-TOOLING.md](../../NPM-TOOLING.md).
