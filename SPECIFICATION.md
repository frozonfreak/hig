# Specification index — The Web HIG

**Normative document:** [HIG.md](./HIG.md) (Layer 3, complete contract)  
**Version:** [VERSION](./VERSION) · **Status:** Published open standard (MIT)

Use this page as a **table of contents for implementers and auditors**. All requirements are authoritative in `HIG.md` unless explicitly marked informative elsewhere.

---

## How to read the spec

1. **Resolve archetype** — Content, Commerce, Application, or Auth ([Layer 0](./rules/applicability.md)); for Content, resolve **surface** ([§0.3](./HIG.md#03-expressive-surfaces)).
2. **Apply universal rules** — Accessibility, tokens, and performance are never optional.
3. **Load depth as needed** — Default to [HIG-QUICK.md](./HIG-QUICK.md); escalate via [rules/manifest.yaml](./rules/manifest.yaml).
4. **Cite rule IDs** — Format `HIG-{DOMAIN}-{NNN}` (e.g. `HIG-A11Y-003`) in PRs, exceptions, and agent prompts.

**Session preamble (informative structure, normative vocabulary):** [HIG-CORE.md](./HIG-CORE.md)

---

## Normative layers (HIG.md)

| Layer | Title | Topic module |
| --- | --- | --- |
| 0 | Applicability & Scope | [rules/applicability.md](./rules/applicability.md) |
| 1 | UX Principles | [rules/ux.md](./rules/ux.md), [rules/animation.md](./rules/animation.md), [rules/expressive-surface.md](./rules/expressive-surface.md), [rules/data-density.md](./rules/data-density.md) |
| 2 | Information Architecture & Product Standards | [rules/states.md](./rules/states.md), [rules/forms.md](./rules/forms.md), [rules/search.md](./rules/search.md), [rules/notifications.md](./rules/notifications.md), [rules/i18n.md](./rules/i18n.md) |
| 3 | Visual, Design Tokens & Container Engine | [rules/tokens.md](./rules/tokens.md), [rules/responsive.md](./rules/responsive.md) |
| 4 | Reference Architecture & State Machines | [rules/architecture.md](./rules/architecture.md), [rules/mutations.md](./rules/mutations.md) |
| 5 | Accessibility & Keyboard Navigation | [rules/accessibility.md](./rules/accessibility.md) |
| 6 | Performance (Lab & Field) | [rules/performance.md](./rules/performance.md) |
| 7 | AI & Agent Enforcement | [rules/ai-enforcement.md](./rules/ai-enforcement.md) |
| 8 | Quality Assurance & CI/CD Gates | (§8 in HIG.md; summarized in ai-enforcement module) · [EVALUATOR.md](./EVALUATOR.md) report contract |
| 9 | Security & Privacy | [rules/security.md](./rules/security.md) |

Full module registry: [rules/INDEX.md](./rules/INDEX.md)

---

## Archetype packs (Layer 0 preload)

After archetype resolution, preload the matching pack before topic modules:

| Archetype | Pack |
| --- | --- |
| Content / Marketing | [rules/archetypes/content.md](./rules/archetypes/content.md) |
| Commerce | [rules/archetypes/commerce.md](./rules/archetypes/commerce.md) |
| Application / Dashboard | [rules/archetypes/application.md](./rules/archetypes/application.md) |
| Auth / Account | [rules/archetypes/auth.md](./rules/archetypes/auth.md) |

---

## Framework adapters (informative mapping)

Adapters map normative Layer 4 concepts to stack-specific patterns. They do not replace `HIG.md`.

| Framework | File |
| --- | --- |
| React | [framework/react.md](./framework/react.md) |
| Next.js | [framework/next.md](./framework/next.md) |
| Vue | [framework/vue.md](./framework/vue.md) |
| Nuxt | [framework/nuxt.md](./framework/nuxt.md) |
| Astro | [framework/astro.md](./framework/astro.md) |

---

## Supporting artifacts

| Artifact | Role |
| --- | --- |
| [HIG-QUICK.md](./HIG-QUICK.md) | Layer 1 — imperative subset (maps to canonical IDs) |
| [HIG-LITE.md](./HIG-LITE.md) | Layer 2 — practical summary with links |
| [rules/manifest.yaml](./rules/manifest.yaml) | Machine-readable module triggers |
| [VERSION](./VERSION) | Single semver pin for product repos |
| [scripts/validate-hig.mjs](./scripts/validate-hig.mjs) | Contract integrity checks |
| [MACHINE_READABLE.md](./MACHINE_READABLE.md) | Registry and schema roadmap |

---

## Conformance

See [PROFILES.md](./PROFILES.md) for lightweight vs full adoption. **Full conformance** means applicable MUST requirements for the resolved archetype are satisfied, with documented exceptions per the exception system in HIG.md.

---

## Change control

- Propose changes: [CONTRIBUTING.md](./CONTRIBUTING.md) · GitHub issue template **Spec change proposal**
- Version policy: [VERSIONING.md](./VERSIONING.md)
- Release narrative: [RELEASE_NOTES.md](./RELEASE_NOTES.md)
