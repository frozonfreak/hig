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
- [x] Agent-ready distribution (`skills/web-hig`, editor templates, `npx @web-hig/install`)
- [x] Docs site GitHub Pages deploy, share metadata (Open Graph / JSON-LD), weekly external link check
- [x] Quality gates: Markdown links, rule ID consistency, version bump rules, tag release-note drafts

---

## Near term

| Item | Outcome |
| --- | --- |
| **Conformance profiles** | Documented in [PROFILES.md](./PROFILES.md); optional badge/checklist for adopters |
| **Adopter registry** | [ADOPTERS.md](./ADOPTERS.md) template and empty community table — add rows by PR |
| **Spec change log discipline** | Tagged releases draft GitHub notes from [CHANGELOG.md](./CHANGELOG.md) + [RELEASE_NOTES.md](./RELEASE_NOTES.md) |
| **Manifest JSON Schema** | Validate `rules/manifest.yaml` shape in CI ([schema/](./schema/)) |

---

## Medium term

| Item | Outcome |
| --- | --- |
| **Rule registry (`rules/registry.yaml`)** | [x] Initial registry + CI drift checks — [NPM-TOOLING.md](./NPM-TOOLING.md) |
| **`@web-hig/cli` / `@web-hig/core`** | [x] Initial `check`, `explain`, `init` — expand static rules and `audit` |
| **`eslint-plugin-hig` (reference)** | **Deferred / not in this repo** — use `web-hig check` static subset + project ESLint/a11y plugins until a separate plugin ships ([MACHINE_READABLE.md](./MACHINE_READABLE.md)) |
| **HIG evaluator report** | Multidimensional CI output per [EVALUATOR.md](./EVALUATOR.md) (not a single-score metric) |
| **Archetype conformance packs** | Checklists generated from Layer 0 matrix per archetype |
| **Third-party adapter templates** | Svelte, Solid, Angular community adapters under `framework/` |

---

## Long term

| Item | Outcome |
| --- | --- |
| **Automated rule ID drift detection** | [x] Registry ↔ INDEX ↔ manifest ↔ modules ↔ Quick map in `npm run validate` |
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
