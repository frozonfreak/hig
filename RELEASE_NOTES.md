# Release Notes

User-facing notes for each published version of the Modern Web HIG. The brief machine-oriented summary lives in [`HIG.md` §8.1](./HIG.md#81-version-history); this file expands those entries with highlights, adoption guidance, and layer impact.

Versions follow [Semantic Versioning](https://semver.org/). Newest first.

---

## [v1.5.0](./HIG.md) — 2026-09-08

Functional micro-animations become a first-class Layer 1 contract: motion is feedback, not decoration.

### Highlights

- **Allowlisted micro-feedback** for hover/focus, press, toggles, inline validation, pending indicators, toasts, and modal open/close — each tied to duration tokens.
- **Deny list** bans decorative loops, parallax, scroll-jacking, >300 ms micro-motion, layout-property animation, and JS tween libraries when CSS suffices.
- **Motion tokens** in Layer 3 (`--duration-instant/fast/base/slow`, `--ease-out-momentum`) plus semantic aliases (`--motion-duration-*`).
- **Agent enforcement:** new `hig/micro-animation-budget` ESLint rule and Layer 7 YAML flags for tokenized timing, compositor-safe properties, and the 300 ms cap.

### Layer impact

| Layer | Change |
| --- | --- |
| 0 | Applicability matrix now lists micro-animations with motion & View Transitions |
| 1 | New §1.4 Functional Micro-Animations; Input Feedback Threshold prefers micro-motion when allowed |
| 3 | Motion duration/easing primitives added to the token system |
| 7 | Micro-animation budget rule and YAML enforcement keys |

### Adoption notes

- Replace hard-coded `transition`/`animation` millisecond values with `--duration-*` / `--motion-duration-*` tokens.
- Keep micro-feedback on `transform` and `opacity` only; continue to honor `prefers-reduced-motion`.
- Wire `hig/micro-animation-budget` into your ESLint pipeline alongside existing HIG rules.

---

## [v1.4.0](./HIG.md) — 2026-09-07

The contract expands for server-driven UI, container-first layout, and native page transitions.

### Highlights

- **RSC & streaming:** Server Components, Suspense skeleton boundaries, and Server Action / `useActionState` / `useOptimistic` mutation standards (Layer 4).
- **Container queries:** Component tokens and responsive rules shift from viewport `@media` to CSS `@container` (Layer 3).
- **View Transitions API:** Prefer `document.startViewTransition` for SPA/MPA route transitions; reduced-motion disables morphing (Layer 1).
- **New lint rules:** `hig/enforce-container-queries` and `hig/rsc-suspense-boundary`.

### Layer impact

| Layer | Change |
| --- | --- |
| 0 | Matrix updated for View Transitions, Container Queries, RSC streaming, and Server Actions |
| 1 | New §1.2 Native View Transitions API |
| 3 | Container-first responsive engine |
| 4 | RSC hydration boundaries and Server Action state model |
| 7–8 | Container-query and RSC Suspense enforcement in lint + CI gates |

### Adoption notes

- Wrap async Server Components in layout-matching `<Suspense>` skeletons.
- Prefer `@container` for component-level breakpoints; reserve `@media` for true viewport/device concerns.
- Limit simultaneous `view-transition-name` usage to one visible element to avoid animation collisions.

---

## [v1.3.0](./HIG.md) — 2026-09-07

First open-source contract release: a universal 9-layer HIG with explicit page-archetype scope.

### Highlights

- **Layer 0 Applicability & Scope** — Content/Marketing, Commerce, Application, and Auth archetypes with a mandatory/optional matrix.
- **Token contrast fixes** — corrected muted text and focus-ring values; status colors split into fill vs. text variants.
- **WCAG 2.2 AA** criteria, optimistic UI reversibility, CSS logical properties, and field vs. lab Web Vitals definitions.
- Repo scaffolding: README, CONTRIBUTING, Code of Conduct, Security policy, and issue/PR templates.

### Adoption notes

- Start at Layer 0: pick an archetype, then apply only the mandatory rows in the matrix.
- Treat Accessibility, tokens/typography, and Web Vitals as universal — never optional.

---

## Earlier versions

These predate the public repository; summaries are retained for continuity with `HIG.md` §8.1.

### v1.2.0 — 2026-09-07

Re-architected into the multi-layer framework. WCAG 2.2 AA made mandatory; 16 ms rule redefined as visual acknowledgment; async state machines and Product IA standards added.

### v1.1.0 — 2026-09-07

Introduced the 3-tier token architecture, motion guidance, optimistic UI, mobile ergonomics, and AI enforcement guardrails.

### v1.0.0 — 2026-09-07

Initial base HIG release.
