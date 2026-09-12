# Machine-readable rules — The Web HIG

Layer 7 defines how requirements become **deterministic** for linters, CI, and AI agents. This document describes what exists today and the path to a full rule registry.

**Normative source:** [HIG.md §7](./HIG.md#layer-7-ai--agent-enforcement-contract) · **Module:** [rules/ai-enforcement.md](./rules/ai-enforcement.md)

---

## Today (v1.10.0)

| Artifact | Format | Purpose |
| --- | --- | --- |
| [rules/manifest.yaml](./rules/manifest.yaml) | YAML | Progressive loading: layers, modules, triggers, rule ID lists per module |
| [rules/motion-tiers.yaml](./rules/motion-tiers.yaml) | YAML | Motion Tier 0–3 + ambient class; surface permission matrix (**HIG-EXP-006**) |
| Agent templates | Markdown + YAML | Layer 7 guardrails in [examples/agent-rules/](./examples/agent-rules/) |
| Rule IDs in prose | `HIG-*` in HIG.md and `rules/*.md` | Human and agent citation |
| [scripts/validate-hig.mjs](./scripts/validate-hig.mjs) | JavaScript | VERSION sync, file existence, rule ID cross-checks, docs/adopter pins, manifest schema keys |
| [rules/evaluator-dimensions.yaml](./rules/evaluator-dimensions.yaml) | YAML | Evaluator dimension ↔ rule prefix map |
| [schema/evaluator-report.schema.json](./schema/evaluator-report.schema.json) | JSON Schema | Multidimensional evaluator report shape |
| [EVALUATOR.md](./EVALUATOR.md) | Markdown | Evaluator contract (Layer 8 §8.2) |

### Manifest schema (draft)

A JSON Schema draft for the manifest lives at [schema/manifest.schema.json](./schema/manifest.schema.json). CI validates required top-level keys via `npm run validate`; full YAML shape validation may follow in a later release.

---

## Rule record schema (normative intent)

Every machine-enforceable rule **should** eventually export these fields (see HIG §7.1):

```yaml
id: HIG-A11Y-004
severity: error          # error | warning | info
requirement: "Icon-only controls MUST have an accessible name."
archetypes: [application, commerce, auth, content]
autofix: safe            # safe | unsafe | none
exceptions:
  - documented_in: hig_exception_registry
hig_section: "§5.2"
module: rules/accessibility.md
```

Agent guardrails in product repos are **projections** of this schema — not a second standard.

---

## Planned: `rules/registry.yaml`

**Status:** Not yet shipped — tracked on [ROADMAP.md](./ROADMAP.md).

Goals:

- Single registry keyed by rule ID
- Generated or validated against HIG.md and topic modules
- Export formats: ESLint rule metadata, PR bot comments, agent tool manifests

Until the registry lands, treat [rules/manifest.yaml](./rules/manifest.yaml) module `rules:` arrays and HIG.md as authoritative.

---

## Intended linter surface

Reference list from [rules/ai-enforcement.md](./rules/ai-enforcement.md):

| Rule | Intent |
| --- | --- |
| `hig/enforce-container-queries` | Component layout uses `@container` |
| `hig/streaming-boundary` | Slow async regions have streaming boundaries |
| `hig/no-unlabeled-icon-buttons` | Accessible names on icon controls |
| `hig/micro-animation-budget` | Motion ≤300 ms, tokenized durations |
| `hig/no-optimistic-destructive` | No optimistic destructive mutations |
| `hig/no-transition-all` | Ban `transition: all` in app CSS |

Implementations may live in a separate `eslint-plugin-hig` repository to keep this repo specification-only.

---

## Validation in consumer repos

Minimum:

```bash
# In a clone of github.com/frozonfreak/hig at tag vX.Y.Z
npm run validate
```

Recommended when vendoring `docs/hig/`:

- Pin `docs/hig/VERSION`
- Run validate on upgrade PRs
- Add CI that fails when VERSION ≠ agent rule declared version

---

## Contributing machine-readable artifacts

See [CONTRIBUTING.md](./CONTRIBUTING.md). Changes to rule IDs or severity require:

1. HIG.md update
2. Matching `rules/*.md` module
3. [rules/manifest.yaml](./rules/manifest.yaml) / INDEX updates
4. [CHANGELOG.md](./CHANGELOG.md) entry under appropriate semver bump
