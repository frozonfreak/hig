# Changelog

All notable changes to **The Web HIG contract** are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning policy: [VERSIONING.md](./VERSIONING.md).  
Expanded adoption notes: [RELEASE_NOTES.md](./RELEASE_NOTES.md).

## [Unreleased]

---

## [1.11.0] - 2026-09-19

### Added

- Agent-ready distribution: canonical [`skills/web-hig`](./skills/web-hig/SKILL.md) skill, Windsurf and Copilot path-specific templates, and `npx @web-hig/install`.
- Discovery polish: benefit-focused description, GitHub topics, social preview image, README badges (version, license, CI, Pin me), and an empty [ADOPTERS.md](./ADOPTERS.md) community table ready for PRs.
- Quality gates on every push/PR: Markdown link checks, rule ID consistency, version bump rules, and `npm run validate`. Version tags draft GitHub Release notes from CHANGELOG + RELEASE_NOTES.
- Share badge and copy-paste markdown (`SHARE.md`, documentation site `#share`) with UTM parameters so inbound links can be attributed by source.
- Documentation site share metadata (canonical URL, Open Graph image, JSON-LD), generated sitemap/robots/404 artifacts, and a weekly GitHub Action that reports broken external links as issues.
- Standard repository documentation: rationale, specification index, profiles, roadmap, adopters, machine-readable roadmap, and changelog.

---

## [1.10.1] - 2026-09-15

### Fixed

- Synchronized explicit version headers across Level 2 modules, archetype packs, framework adapters, manifests, examples, and documentation surfaces.
- Aligned `schema/manifest.schema.json` with the actual `archetype_packs.default_modules` / `conditional_modules` manifest shape.
- Expanded `scripts/validate-hig.mjs` to fail on stale version headers, missing local Markdown links/anchors, and manifest-schema pack-key drift.
- Replaced broken repository-local Markdown links that pointed at consumer-repo paths.

### Added

- Stable rule IDs for document fundamentals (`HIG-DOC-001`–`006`), SEO/share metadata (`HIG-SEO-001`–`003`), search (`HIG-SRCH-001`–`006`), data density (`HIG-DEN-001`–`008`), and performance (`HIG-PERF-001`–`004`) so evaluator findings can cite rule IDs consistently.

---

## [1.10.0] - 2026-09-12

### Added

- **Expressive Surface Baseline** — **HIG-EXP-001** through **HIG-EXP-012** for content routes with `surface: hybrid` or `surface: experience` ([rules/expressive-surface.md](./rules/expressive-surface.md), HIG.md §0.3, §1.5).
- **Evaluator report contract** — multidimensional output (BLOCKING/WARNINGS/OBSERVATIONS + 8 dimensions); [EVALUATOR.md](./EVALUATOR.md), [schema/evaluator-report.schema.json](./schema/evaluator-report.schema.json), [rules/evaluator-dimensions.yaml](./rules/evaluator-dimensions.yaml).
- Motion tier **HIG-EXP-006** — surface × `motion_class` permission matrix; **HIG-EXP-013** / **HIG-EXP-014** taxonomy and classification; [rules/motion-tiers.yaml](./rules/motion-tiers.yaml) machine-readable registry.

### Changed

- Content archetype scope includes portfolios and studio sites; surface declaration in product scope (**HIG-EXP-001**).
- **HIG-CQ-001** softened to SHOULD (prefer `@container` for component-internal layout); **HIG-CQ-002** MUST when multi-context reuse would break on viewport breakpoints; **HIG-SIM-001** anti-pattern for artificial containers.
- **HIG-A11Y-007** / §5.4 — 24×24 labeled WCAG 2.5.8 normative floor; 44×44 labeled HIG ergonomic SHOULD (not mandatory).


---

## [1.9.0] - 2026-09-09

### Added

- [HIG-QUICK.md](./HIG-QUICK.md) Layer 1 Quick Reference (98 rules).
- Archetype rule packs under `rules/archetypes/`.
- [rules/applicability.md](./rules/applicability.md) Layer 0 extract.
- [VERSION](./VERSION) pin file and [scripts/validate-hig.mjs](./scripts/validate-hig.mjs).
- GitHub Actions contract validation workflow.

### Changed

- Three-layer consumption model documented across README, INTEGRATION, and agent templates.

---

## [1.8.0] - 2026-09-09

### Added

- 16 standalone Level 2 modules in `rules/`.
- Framework adapters: React, Next.js, Vue, Nuxt, Astro.

### Changed

- [rules/manifest.yaml](./rules/manifest.yaml) references module files instead of HIG.md section anchors only.

---

## [1.7.0] - 2026-09-09

### Added

- [HIG-CORE.md](./HIG-CORE.md), [HIG-LITE.md](./HIG-LITE.md), [rules/INDEX.md](./rules/INDEX.md), progressive loading manifest.

---

## [1.6.0] - 2026-09-09

### Added

- Layer 9 Security & Privacy.
- Product UX taxonomies (error, empty, loading, search, notifications), forms contract, i18n, data density, browser permissions UX.

---

## [1.5.1] - 2026-09-09

### Fixed

- WCAG classifications, lab vs field performance semantics, focus trapping, framework-neutral Layer 4.

### Added

- Normative vocabulary, exception system, expanded Layer 7 rule ID schema, Layer 8 gate classes.

---

## [1.5.0] - 2026-09-08

### Added

- Layer 1 functional micro-animations contract and motion tokens.

---

## [1.4.0] - 2026-09-07

### Added

- Server-driven UI / streaming standards, container-query layout engine, View Transitions guidance.

---

## [1.3.0] - 2026-09-07

### Added

- Layer 0 applicability matrix, public repository scaffolding.

---

## [1.2.0] - 2026-09-07

### Changed

- Multi-layer framework re-architecture; WCAG 2.2 AA mandatory.

---

## [1.1.0] - 2026-09-07

### Added

- Three-tier token architecture, optimistic UI, AI enforcement guardrails.

---

## [1.0.0] - 2026-09-07

### Added

- Initial base HIG release.

---

[Unreleased]: https://github.com/frozonfreak/hig/compare/v1.11.0...HEAD
[1.11.0]: https://github.com/frozonfreak/hig/compare/v1.10.1...v1.11.0
[1.10.1]: https://github.com/frozonfreak/hig/compare/v1.10.0...v1.10.1
[1.10.0]: https://github.com/frozonfreak/hig/compare/v1.9.0...v1.10.0
[1.9.0]: https://github.com/frozonfreak/hig/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/frozonfreak/hig/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/frozonfreak/hig/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/frozonfreak/hig/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/frozonfreak/hig/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/frozonfreak/hig/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/frozonfreak/hig/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/frozonfreak/hig/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/frozonfreak/hig/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/frozonfreak/hig/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/frozonfreak/hig/releases/tag/v1.0.0
