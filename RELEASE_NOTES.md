# Release Notes

User-facing notes for each published version of the Modern Web HIG. The brief machine-oriented summary lives in [`HIG.md` §8.1](./HIG.md#81-version-history); this file expands those entries with highlights, adoption guidance, and layer impact.

Versions follow [Semantic Versioning](https://semver.org/). Newest first.

---

## [v1.6.0](./HIG.md) — 2026-09-09

P2 capability expansion — product UX taxonomies, forms contract, i18n, data density, and a dedicated Security & Privacy layer.

### Highlights

- **Layer 9: Security & Privacy** — CSP, XSS/CSRF mitigation, secure cookies, PII masking, auth UX, session management, third-party script governance, and audit logging.
- **Error UX taxonomy (§2.5)** — 11 error categories with prescribed UI behavior (validation, auth, network, conflict, offline, etc.).
- **Empty-state taxonomy (§2.6)** — First-use, no results, filtered, permission, error, offline, and completed states.
- **Loading-state taxonomy (§2.7)** — Initial, background refresh, mutation pending, skeleton, progressive stream, pagination, infinite scroll.
- **Internationalization (§2.8)** — Pluralization, locale formatting, CJK typography, bidirectional text; logical layout properties mandatory.
- **Search standard (§2.9)** — Debounce → pending → results/no-results/error state machine with keyboard nav and URL sync.
- **Notifications taxonomy (§2.10)** — Toast, inline status, banner, modal, system notification with duration and stacking rules.
- **Forms contract (§2.11)** — Labels, validation timing, autocomplete, password managers, multi-step, draft persistence, error summary.
- **Data density standards (§3.3)** — Compact/default/comfortable row heights, numeric alignment, truncation, sticky headers, bulk actions, virtualization.
- **Browser permissions UX (§5.5)** — Camera, clipboard, geolocation, notifications, file system with graceful degradation.

### Layer impact

| Layer | Change |
| --- | --- |
| 0 | Matrix expanded for error/empty/loading, forms, search, i18n, data density, permissions, security |
| 2 | §2.5–2.11: error, empty, loading, i18n, search, notifications, forms |
| 3 | §3.3: data density standards for Application/Dashboard |
| 5 | §5.5: browser permissions UX |
| 7 | New rule IDs: HIG-ERR, HIG-EMP, HIG-LOD, HIG-FRM, HIG-I18N, HIG-NTF, HIG-SEC |
| 9 | New layer: Security & Privacy |

### Adoption notes

- Map existing error/empty/loading UI to the new taxonomies; gaps become actionable backlog items.
- Audit forms against §2.11 — especially checkout and settings flows.
- Review Layer 9 against your security posture: CSP headers, cookie attributes, PII in logs/analytics.
- Use logical CSS properties for all new layout work (§2.8).

---

## [v1.5.1](./HIG.md) — 2026-09-09

Corrections and clarifications to v1.5.0. This is a **standards-accuracy release** — it fixes incorrect WCAG classifications, performance metric semantics, focus-trapping guidance, and framework-neutral architecture without changing the overall 9-layer structure.

### Highlights

- **Normative vocabulary** — MUST/SHOULD/MAY keywords (RFC 2119) and exception governance with rule IDs, severity, applicability, and autofix safety.
- **Framework-neutral Layer 4** — Universal server-driven rendering reference architecture with separate React/Next, Vue/Nuxt, and Astro adapters. RSC is now correctly scoped as a React implementation detail.
- **Lab vs. field performance** — Synthetic interaction latency in CI; field INP as RUM/SLO monitoring (not a deterministic build gate). TTFB correctly classified as a supporting metric, not a Core Web Vital.
- **Accessibility precision** — WCAG 2.3.3 correctly classified as AAA; focus trapping requires actual containment (not just `aria-modal`); accessible name computation order; native HTML preferred over ARIA; keyboard interaction patterns; zoom/reflow requirements.
- **Expanded state architecture** — Stale data, network failure, conflict, idempotency, retry rules, and offline/degraded mode definitions.
- **CI gate classification** — Blocking, warning, and observation levels; security CI, visual regression, and cross-browser testing added to Layer 8.

### Layer impact

| Layer | Change |
| --- | --- |
| — | New normative vocabulary and exception system sections |
| 1 | WCAG 2.3.3 AAA fix; view-transition uniqueness; micro-feedback 300ms scope; application-authored `transition: all` |
| 2 | Archetype-aware metadata; navigation depth as SHOULD; destructive action models clarified |
| 3 | Contrast as combination verification; spacing/elevation/z-index tokens; theme selection; @container/@media roles |
| 4 | Framework-neutral architecture; streaming boundary nuance; stale/error/conflict/offline states |
| 5 | Focus trapping; accessible names; keyboard patterns; target size exceptions (24px min, 44px preferred) |
| 6 | Lab/field split; HIG Target/Acceptable thresholds; regression gates; performance budgets |
| 7 | Rule IDs, severity, applicability, autofix; prefer simplest compliant implementation |
| 8 | Blocking/warning/observation gates; security CI; visual regression; cross-browser testing |
| Appendix | P2 planned capabilities listed for v1.6+ |

### Adoption notes

- Update agent rules to reference v1.5.1 and the new rule ID schema (HIG-XXX-NNN).
- Replace "field INP fails build" CI gates with synthetic interaction latency for lab/CI and field INP for RUM/SLO monitoring.
- Review Layer 4 implementations against the universal reference architecture — RSC-specific language should map to framework adapters.
- Use the exception system when deviating from container-query or media-query rules.

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

- Wrap slow async server regions in layout-matching streaming boundaries with skeletons.
- Prefer `@container` for component-level breakpoints; reserve `@media` for viewport, preferences, and page-level concerns.
- Ensure `view-transition-name` values are unique within each transition capture context.

---

## [v1.3.0](./HIG.md) — 2026-09-07

First open-source contract release: a universal 9-layer HIG with explicit page-archetype scope.

### Highlights

- **Layer 0 Applicability & Scope** — Content/Marketing, Commerce, Application, and Auth archetypes with a mandatory/optional matrix.
- **Token contrast fixes** — corrected muted text and focus-ring values; status colors split into fill vs. text variants.
- **WCAG 2.2 AA** conformance requirement, optimistic UI reversibility, CSS logical properties, and field vs. lab Web Vitals definitions.
- Repo scaffolding: README, CONTRIBUTING, Code of Conduct, Security policy, and issue/PR templates.

### Adoption notes

- Start at Layer 0: pick an archetype, then apply only the mandatory rows in the matrix.
- Treat Accessibility, tokens/typography, and performance as universal — never optional.

---

## Earlier versions

These predate the public repository; summaries are retained for continuity with `HIG.md` §8.1.

### v1.2.0 — 2026-09-07

Re-architected into the multi-layer framework. WCAG 2.2 AA made mandatory; 16 ms rule redefined as visual acknowledgment; async state machines and Product IA standards added.

### v1.1.0 — 2026-09-07

Introduced the 3-tier token architecture, motion guidance, optimistic UI, mobile ergonomics, and AI enforcement guardrails.

### v1.0.0 — 2026-09-07

Initial base HIG release.
