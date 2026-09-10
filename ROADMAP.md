# Roadmap — The Web HIG

This roadmap describes **contract and tooling** direction for the standard repository. Dates are intent, not commitments. Normative changes ship only through semver and [CONTRIBUTING.md](./CONTRIBUTING.md).

**Current version:** [VERSION](./VERSION)

---

## Shipped (foundation)

- [x] 10-layer normative specification ([HIG.md](./HIG.md))
- [x] Layer 0 archetypes and applicability matrix
- [x] Stable rule IDs and Layer 7 agent guardrails
- [x] Progressive loading: HIG-CORE, HIG-QUICK, HIG-LITE, `rules/`, `framework/`
- [x] [rules/manifest.yaml](./rules/manifest.yaml) topic triggers
- [x] Contract validation (`npm run validate`) and CI
- [x] Integration guide, agent templates, documentation site

---

## Near term

| Item | Outcome |
| --- | --- |
| **Conformance profiles** | Documented in [PROFILES.md](./PROFILES.md); optional badge/checklist for adopters |
| **Adopter registry** | [ADOPTERS.md](./ADOPTERS.md) — public examples of pinned implementations |
| **Spec change log discipline** | Every tagged release updates [CHANGELOG.md](./CHANGELOG.md) + [RELEASE_NOTES.md](./RELEASE_NOTES.md) |
| **Manifest JSON Schema** | Validate `rules/manifest.yaml` shape in CI ([schema/](./schema/)) |

---

## Medium term

| Item | Outcome |
| --- | --- |
| **Rule registry (`rules/registry.yaml`)** | One row per rule ID: severity, archetypes, autofix, HIG section — see [MACHINE_READABLE.md](./MACHINE_READABLE.md) |
| **`eslint-plugin-hig` (reference)** | Implements Layer 7 rules listed in [rules/ai-enforcement.md](./rules/ai-enforcement.md) |
| **Archetype conformance packs** | Checklists generated from Layer 0 matrix per archetype |
| **Third-party adapter templates** | Svelte, Solid, Angular community adapters under `framework/` |

---

## Long term

| Item | Outcome |
| --- | --- |
| **Automated rule ID drift detection** | Registry ↔ HIG.md ↔ modules synced in validate script |
| **Policy-as-code for agents** | Export registry to MCP/tool schemas for deterministic agent loading |
| **Field performance SLO templates** | RUM dashboards aligned with Layer 6 SLO definitions |
| **Formal working group** | Maintainers + adopters for major semver proposals |

---

## Explicit non-roadmap

- Shipping a component library in this repository
- Mandating a single CSS framework or design system
- Replacing WCAG or platform specifications

---

## How to influence the roadmap

1. Open a **[Spec change proposal](https://github.com/frozonfreak/hig/issues/new?template=spec-change.yml)** for normative changes.
2. Open a **feature issue** for tooling (validate script, schema, eslint rules).
3. Send a PR to [ADOPTERS.md](./ADOPTERS.md) when your product pins the contract (see template there).
