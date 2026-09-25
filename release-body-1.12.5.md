## Changelog summary

### Added

- Layer 1 ↔ rule ID map ([rules/quick-rule-map.yaml](./rules/quick-rule-map.yaml), `npm run sync:quick-map`) and **How Quick counts relate** guidance for agents.
- [examples/golden-path](./examples/golden-path/) consumer-layout fixture (pin, skill, planted `web-hig check` violation) with CI test.
- Manifest JSON Schema enforcement ([scripts/validate-manifest-schema.mjs](./scripts/validate-manifest-schema.mjs)) in `npm run validate`.
- Root npm **workspaces**, shared **ESLint** / **Prettier**, and Node **`>=20`** engines across `@web-hig/*`.
- `web-hig upgrade` pin comparison and `--dry-run` checklist; explicit experimental status for `web-hig audit`.

### Changed

- Contract validation expanded (Quick map, registry ↔ INDEX ↔ manifest drift).
- Documentation site split into a hub home page plus **Understand**, **Adopt**, **AI & agents**, and **Reference** pages (mobile nav, share UI on Adopt).
- [ROADMAP.md](./ROADMAP.md) and [README.md](./README.md) **Tooling today** table — shipped vs deferred (`eslint-plugin-hig`, full evaluator, runtime audit).

---

## Release notes

Patch release: **contract clarity, validation, and adoption fixtures**. No normative rule was added, removed, or retightened.

### Highlights

- **98 Quick imperatives vs 76 `HIG-*` IDs** — documented everywhere agents look; [rules/quick-rule-map.yaml](./rules/quick-rule-map.yaml) validated in CI.
- **Stronger `npm run validate`** — manifest JSON Schema, Quick map, registry drift checks.
- **[examples/golden-path](./examples/golden-path/)** — copyable consumer layout; `npm test` ensures `web-hig check` fails on a planted violation.
- **Monorepo hygiene** — npm workspaces, ESLint/Prettier on `scripts/` and `packages/`, Node 20+ engines.
- **`web-hig upgrade`** pin report; **`web-hig audit`** marked experimental (use `check`).
- **Roadmap/README honesty** — what ships today vs deferred ESLint plugin / full evaluator / runtime audit.

### Upgrade from v1.12.4

1. Pin **[VERSION](./VERSION)** (`1.12.5`) or run `npx @web-hig/install` when you next refresh docs.
2. No rule ID changes — optional upgrade for tooling and agent clarity.
3. Run `npm run validate` (or `npm test` if you vendor the full repo tooling).

---

---

Pin: [HIG-QUICK.md](https://github.com/frozonfreak/hig/blob/main/HIG-QUICK.md) · Contract: [VERSION](https://github.com/frozonfreak/hig/blob/main/VERSION)
