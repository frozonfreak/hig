# Golden path — consumer layout example

Minimal **product-repo-shaped** fixture inside the HIG monorepo. Use it to see how pinning, agent skills, and CI fit together.

## What this demonstrates

| Piece | Path |
| --- | --- |
| Contract pin | `docs/hig/VERSION` + `docs/hig/HIG-QUICK.md` (Layer 1) |
| Archetype map | `docs/hig-scope.md` |
| Agent skill | `.cursor/skills/web-hig/SKILL.md` (copy of canonical skill) |
| Executable gate | `web-hig.yaml` + `web-hig check` on `src/` |
| Planted violation | `src/app.css` — `transition: all` (**HIG-MOT-001**) |

## Run locally (from this directory)

From the **HIG repository root** (after `npm install`):

```bash
cd examples/golden-path
set WEB_HIG_ROOT=../..          # PowerShell: $env:WEB_HIG_ROOT='../..'
node ../../packages/cli/bin/cli.mjs check
```

Expect **exit code 1** and a blocking finding for `HIG-MOT-001`.

## Copy into your product repo

1. Copy this folder’s layout (or run `npx @web-hig/install` for real pins).
2. Point `WEB_HIG_ROOT` at vendored `docs/hig/` **or** depend on published `@web-hig/cli` with registry on npm.
3. Add CI: [../github/workflows/web-hig-check.yml](../github/workflows/web-hig-check.yml).

The monorepo runs [scripts/test/golden-path.test.mjs](../../scripts/test/golden-path.test.mjs) in `npm test` to keep this fixture honest.
