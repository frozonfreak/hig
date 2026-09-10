# Changelog

All notable changes to **The Web HIG contract** are documented here.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).  
Versioning policy: [VERSIONING.md](./VERSIONING.md).  
Expanded adoption notes: [RELEASE_NOTES.md](./RELEASE_NOTES.md).

## [Unreleased]

### Added

- Standard repository documentation: rationale, specification index, profiles, roadmap, adopters, machine-readable roadmap, and changelog.

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

[Unreleased]: https://github.com/frozonfreak/hig/compare/v1.9.0...HEAD
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
