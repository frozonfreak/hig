# Roadmap — The Web HIG

This roadmap describes **contract and tooling** direction for the standard repository. Dates are intent, not commitments. Normative changes ship only through semver and [CONTRIBUTING.md](./CONTRIBUTING.md).

**Current version:** [VERSION](./VERSION)

**Tooling and adoption program:** [readiness implementation and acceptance gates](./READINESS.md). The first reliability foundation is implemented in source; browser helpers, agent benchmarks, baseline-aware PR reporting, complete reference apps and external pilots remain tracked there. Target maturity is not a measured score.

---

## Shipped (foundation)

- [x] 10-layer normative specification ([HIG.md](./HIG.md))
- [x] Layer 0 archetypes and applicability matrix
- [x] Stable rule IDs and Layer 7 agent guardrails
- [x] Progressive loading: HIG-CORE, HIG-QUICK, HIG-LITE, `rules/`, `framework/`
- [x] [rules/manifest.yaml](./rules/manifest.yaml) topic triggers + **JSON Schema validation in CI**
- [x] [rules/registry.yaml](./rules/registry.yaml) + [rules/quick-rule-map.yaml](./rules/quick-rule-map.yaml) with drift checks
- [x] Contract validation (`npm run validate`) and CI
- [x] `@web-hig/core` / `@web-hig/cli` / `@web-hig/install` — `init`, `check`, `explain`, `upgrade` (pin report)
- [x] Static CSS checks in `web-hig check`; minimal `--json` evaluator output
- [x] Integration guide, agent templates, documentation site
- [x] Agent-ready distribution (`skills/web-hig`, editor templates, `npx @web-hig/install`)
- [x] Docs site GitHub Pages deploy, share metadata (Open Graph / JSON-LD), weekly external link check
- [x] Quality gates: Markdown links, rule ID consistency, version bump rules, tag release-note drafts
- [x] Consumer layout fixture: [examples/golden-path](./examples/golden-path/) (planted violation + CI test)
- [x] npm workspaces at repo root; shared ESLint / Prettier for `scripts/` and `packages/`

---

## Shipped — explicit limits (not oversold)

| Area | Today | Not promised yet |
| --- | --- | --- |
| **ESLint** | `web-hig check` static subset; agent YAML guardrails | In-repo **`eslint-plugin-hig`** ([MACHINE_READABLE.md](./MACHINE_READABLE.md)) |
| **Evaluator** | `web-hig check --json` minimal report; full schema + [example](./examples/evaluator-report.example.json) | Full multidimensional CLI matching [schema/evaluator-report.schema.json](./schema/evaluator-report.schema.json) on every run |
| **Runtime audit** | `web-hig audit` marked experimental / not shipped | Playwright + axe orchestration ([NPM-TOOLING.md](./NPM-TOOLING.md) Phase 5) |

---

## Near term

| Item | Outcome |
| --- | --- |
| **Conformance profiles** | Documented in [PROFILES.md](./PROFILES.md); optional badge/checklist for adopters |
| **Adopter registry** | [ADOPTERS.md](./ADOPTERS.md) — add rows by PR |
| **Spec change log discipline** | Tagged releases draft GitHub notes from [CHANGELOG.md](./CHANGELOG.md) + [RELEASE_NOTES.md](./RELEASE_NOTES.md) |
| **Expand static `web-hig check` rules** | More registry `evaluation: static` rules without waiting on ESLint plugin |

---

## Medium term

| Item | Outcome |
| --- | --- |
| **`eslint-plugin-hig` (separate or optional package)** | Reference rules from [rules/ai-enforcement.md](./rules/ai-enforcement.md) — static subset only |
| **Full evaluator CLI output** | Dimensions block + schema-valid JSON on every `check` / audit aggregation |
| **`web-hig audit`** | Runtime behavioural verification |
| **Archetype conformance packs** | Checklists generated from Layer 0 matrix per archetype |
| **Third-party adapter templates** | Svelte, Solid, Angular community adapters under `framework/` |

---

## Long term

| Item | Outcome |
| --- | --- |
| **Policy-as-code for agents** | Export registry to MCP/tool schemas for deterministic agent loading |
| **Field performance SLO templates** | RUM dashboards aligned with Layer 6 SLO definitions |
| **Formal working group** | Maintainers + adopters for major semver proposals |

---

## Research watchlist (2026-11-06)

Informational — not commitments. From the weekly Web HIG research briefs:

| Topic | Status |
| --- | --- |
| Adaptive Dark Mode | Safari 27.3 beta can repaint an undeclared light page. Declare `light dark` in the initial document when both schemes are supported. `light only` is an opt-out. Screenshot review; computed color is authored color. The browser’s 4.5:1 aim is not WCAG conformance. Beta 1 did not support `only`. |
| Long Animation Frames | Chrome 157 can report `styleDuration`, `layoutDuration`, `forcedStyleDuration`, and `forcedLayoutDuration`. Feature-detect them. Combined style-and-layout timing is the fallback. Diagnostic only; Core Web Vitals thresholds are unchanged. |
| HTML-in-Canvas | Chrome 157, WICG proposal, Chromium-only. Semantic DOM stays the preference. No audit rule until another engine implements it and independent assistive-technology testing exists. |
| Safari Technology Preview 256 | List-marker text, nested-iframe VoiceOver entry, and doubled text zoom on font-relative sizes are fixed in the preview. Do not change stable compatibility expectations yet. |
| Core Web Vitals | Stable LCP, INP, and CLS thresholds are unchanged. Experimental CrUX soft-navigation variants (September 2026 dataset, published 13 October 2026) are a separate labeled series and must not share a pass/fail. Possible Chrome graduation in May 2027 is not a HIG date. |
| AI/agent interfaces | No new primary research in the 31 October–6 November interval strong enough to alter guidance; keep visible agent state, confirmation for consequential actions, reversibility, provenance, accessible status. Safari 27.2 live-region behavior is a manual AT retest, not a new author rule. |
| W3C drafts | WCAG 3 remains years out and is expected to change substantially ([WAI, 4 November 2026](https://www.w3.org/WAI/update/)). ARIA 1.3 Candidate Recommendation Snapshot and an updated WCAG2Mobile Working Draft are planned for November or December. Defer until those documents are published. The WCAG 2.2 Editor’s Draft is not a new Recommendation. |
| Scroll-driven animations | Firefox 159 enables them by default. Still limited availability, not Baseline. Guard with reduced motion; do not treat duration shortening as sufficient. Necessity stays manual. |
| Grid Lanes | Safari 27.2 renames `flow-tolerance` to `fit-tolerance` (`flow-tolerance` remains a deprecated alias). No HIG examples use the old name. Not a universal implementation requirement and not an audit rule. DOM order stays logical if examples are added later. |
| Modern CSS (Safari TP experiments) | Track `interpolate-size`, `calc-size()`, `symbols()`, linked parameters — no HIG recommendation or automated rule yet |
| JPEG XL multi-engine + field evidence | Spec guidance landed in **HIG-DOC-005** (progressive enhancement only); consider a future informational audit for JXL-only delivery after stable multi-engine support |

## Explicit non-roadmap

- Shipping a component library in this repository
- Mandating a single CSS framework or design system
- Replacing WCAG or platform specifications

---

## How to influence the roadmap

1. Open a **[Spec change proposal](./.github/ISSUE_TEMPLATE/spec-change.yml)** for normative changes.
2. Open a **feature issue** for tooling (validate script, schema, eslint rules).
3. Send a PR to [ADOPTERS.md](./ADOPTERS.md) when your product pins the contract (see template there).
