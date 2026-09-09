# Contributing to Web HIG

Thank you for your interest in improving the Web HIG. This document explains how to propose changes to the contract.

## What belongs here

This repository is the **source of truth** for the HIG specification itself — design principles, token definitions, state-machine diagrams, agent guardrails, and CI gate thresholds. It is not a reference implementation or component library.

Good contributions include:

- Clarifying ambiguous rules or resolving internal contradictions
- Adding missing WCAG, performance, or i18n criteria
- Correcting contrast-verified token values
- Expanding the Layer 0 applicability matrix for new page archetypes
- Improving machine-readable enforcement specs (YAML, ESLint/Stylelint configs)
- Improving [INTEGRATION.md](./INTEGRATION.md) or the copy-paste templates under `examples/agent-rules/`
- Updating [HIG-QUICK.md](./HIG-QUICK.md) when adding high-frequency imperative rules (Layer 1 Quick Reference)
- Updating [HIG-LITE.md](./HIG-LITE.md) when adding practical rules with rule IDs (every Lite rule MUST map to a canonical rule ID in `HIG.md`)
- Updating the corresponding [rules/*.md](./rules/) module when changing layer content — keep modules synchronized with `HIG.md`
- Expanding [rules/INDEX.md](./rules/INDEX.md) and [rules/manifest.yaml](./rules/manifest.yaml) when adding new topic modules
- Adding or updating [framework/*.md](./framework/) adapters when framework guidance changes
- Updating [rules/archetypes/](./rules/archetypes/) packs when the Layer 0 matrix changes
- Running `npm run validate` before opening a PR — CI will reject contract integrity failures

## How to propose a change

1. **Search existing issues** to avoid duplicate work.
2. **Open an issue** describing the problem, the proposed change, and which layer(s) it affects.
3. **Fork the repo** and create a branch from `main`.
4. **Edit `HIG.md`** — keep changes focused and update the version history (Section 8.1) when the change is substantive. If the change affects high-frequency agent rules, also update `HIG-QUICK.md`, `HIG-LITE.md`, the relevant `rules/*.md` module, and `rules/INDEX.md` / `rules/manifest.yaml`.
5. **Update [RELEASE_NOTES.md](./RELEASE_NOTES.md)** for minor and major bumps — expand the §8.1 summary with highlights, layer impact, and adoption notes.
6. **Open a pull request** using the provided template.

## Versioning guidelines

This contract follows [Semantic Versioning](https://semver.org/):

- **Patch** (e.g. 1.5.1) — typo fixes, clarifications that do not change meaning
- **Minor** (e.g. 1.6.0) — new rules, new criteria, or expanded guidance that is backward-compatible
- **Major** (e.g. 2.0.0) — breaking changes to mandatory requirements or token semantics

Update the version number in the `HIG.md` title, add an entry to the version history (Section 8.1), and add a matching section to `RELEASE_NOTES.md` when bumping.

## Writing style

- Be precise and testable — rules should be verifiable by humans and by linters where possible
- Prefer tables, diagrams, and code blocks over prose when they reduce ambiguity
- Cross-reference related sections rather than duplicating content
- Mark archetype-specific rules explicitly (Content, Commerce, Application, Auth)

## Code of conduct

All participants are expected to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).
