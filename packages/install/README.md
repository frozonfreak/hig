# `@web-hig/install`

One-command installer that pins The Web HIG Quick Reference and copies agent rules plus editor skills into a product repository.

```bash
npx @web-hig/install
```

Default (Quick Reference profile):

- `docs/hig/VERSION`, `HIG-QUICK.md`, `HIG-CORE.md`
- `docs/hig-scope.md` (example, only if missing)
- Cursor, Claude Code, GitHub Copilot, Windsurf, and `AGENTS.md` rules + skills

## Options

```text
npx @web-hig/install --dir ./my-app
npx @web-hig/install --editors cursor,claude
npx @web-hig/install --profile practical
npx @web-hig/install --profile full --force
npx @web-hig/install --dry-run
```

| Flag | Meaning |
| --- | --- |
| `--dir <path>` | Target project (default: cwd) |
| `--editors <list>` | `cursor`, `claude`, `copilot`, `windsurf`, `agents` (default: all) |
| `--profile <name>` | `quick` (default), `practical`, `full` |
| `--docs-dir <path>` | Pin directory (default: `docs/hig`) |
| `--force` | Overwrite existing dedicated HIG files |
| `--dry-run` | Print actions without writing |
| `--no-scope` | Skip `docs/hig-scope.md` |

`practical` also copies `HIG-LITE.md`, `rules/`, and `framework/`. `full` adds `HIG.md`.

## Publish (maintainers)

From this directory, after the contract `VERSION` matches `package.json`:

```bash
node scripts/sync-vendor.mjs
npm publish --access public
```

`prepack` syncs `vendor/` automatically. Do not commit `vendor/`.
