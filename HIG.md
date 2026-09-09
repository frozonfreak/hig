# Web HIG & Product Engine Contract — v1.9.0

## Executive Summary

Web HIG v1.9.0 defines design principles, normative requirements, information architecture, state machines, interaction rules, accessibility standards, security & privacy standards, and programmatic execution constraints for modern web applications, content, commerce, and server-driven web platforms.

This release adds a three-layer consumption model and archetype rule packs:

1. **[HIG-QUICK.md](./HIG-QUICK.md) (Layer 1)** — 98 imperative rules, ~5 minutes. **Default agent context.** Tell AI: *"Follow Modern Web HIG Quick Reference."*
2. **[HIG-LITE.md](./HIG-LITE.md) + [rules/](./rules/) + [framework/](./framework/) (Layer 2)** — Practical documentation with rule IDs, topic modules, and archetype packs.
3. **HIG.md (Layer 3)** — Complete normative specification (this document). Edge cases and CI gate definitions only.
4. **[HIG-CORE.md](./HIG-CORE.md)** — Session preamble: philosophy, vocabulary, archetype resolution, HIG-SIM-001.

Run `npm run validate` (or `node scripts/validate-hig.mjs`) to verify VERSION, manifest, and file integrity.

HIG-LITE and Level 2 modules are extracts of HIG — not separate standards. Every rule maps to a canonical rule ID here. When editing modules, keep them synchronized with this document.

The v1.6.0 P2 capability expansion remains in force:

1. **Layer 9: Security & Privacy** — CSP, XSS/CSRF mitigation, secure cookies, PII handling, auth UX, session management, and audit logging.
2. **Product UX taxonomies** — Error, empty-state, loading-state, notification, and search standards with explicit state-machine contracts.
3. **Forms contract** — Field grouping, validation timing, autocomplete, multi-step flows, and error summaries.
4. **Internationalization** — Pluralization, locale formatting, bidirectional text, and logical (not physical) layout coordinates.
5. **Data density standards** — Table density, truncation, virtualization, and bulk actions for Application/Dashboard archetypes.

### Document Structure

```
WEB HIG — three consumption layers
│
├── HIG-QUICK.md             ← Layer 1: Quick Reference (~5 min, 98 rules) — AI default
├── HIG-LITE.md              ← Layer 2: Practical summary with rule ID links
├── rules/ + framework/      ← Layer 2: topic modules, archetype packs, adapters
├── HIG.md                     ← Layer 3: complete specification (this file)
│
├── HIG-CORE.md              ← Session preamble (philosophy, archetypes)
├── rules/
│   ├── INDEX.md               ← Topic index + rule ID registry
│   ├── manifest.yaml          ← Machine-readable load triggers
│   ├── accessibility.md       ← Topic modules (16 topics)
│   ├── ux.md, forms.md, states.md, tokens.md, responsive.md, …
│   └── archetypes/            ← Per-archetype module preload lists
│
├── framework/
│   ├── react.md, next.md, vue.md, nuxt.md, astro.md
│
├── scripts/validate-hig.mjs   ← CI contract validation
├── VERSION                    ← Single version pin
│
├── Normative Vocabulary & Exception System
├── Layer 0: Applicability & Scope (Archetype Matrix)
├── Layer 1: UX Principles
├── Layer 2: Information Architecture & Product Standards
├── Layer 3: Visual, Design Token System & Container Engine
├── Layer 4: Reference Architecture, State Machines & Framework Adapters
├── Layer 5: Accessibility & Keyboard Navigation
├── Layer 6: Performance (Lab & Field)
├── Layer 7: AI & Agent Enforcement Contract
├── Layer 8: Quality Assurance & CI/CD Gates
└── Layer 9: Security & Privacy
```

This contract is organized into a **10-Layer Governance Framework** (Layers 0–9):

* **Layer 0: Applicability & Scope** — Page archetypes and which layers are mandatory per archetype.
* **Layer 1: UX Principles** — Ergonomic, spatial, motion, functional micro-animations, reduced-motion, and View Transitions guidelines.
* **Layer 2: Information Architecture & Product Standards** — Hierarchy, document fundamentals, progressive disclosure, empty states, onboarding, i18n/RTL.
* **Layer 3: Visual, Design Token System & Container Engine** — Typography, contrast-verified semantic combinations, container queries, fluid layouts, and three-tier token architecture.
* **Layer 4: Interaction, State Architecture & Data Protection** — Universal server-driven rendering model, state machines, optimistic UI, data persistence, and friction models.
* **Layer 5: Accessibility (a11y) & Keyboard Navigation** — WCAG 2.2 Level AA conformance, focus management, target sizes, and keyboard interaction patterns.
* **Layer 6: Performance & Web Vitals** — Lab vs. field metrics, Core Web Vitals, supporting metrics, and budget thresholds.
* **Layer 7: AI & Agent Enforcement Contract** — Rule IDs, severity, applicability, deterministic logic, and system-prompt contracts for AI coding agents.
* **Layer 8: Quality Assurance & CI/CD Gates** — Blocking, warning, and observation gates.
* **Layer 9: Security & Privacy** — CSP, XSS/CSRF, secure storage, PII masking, auth UX, session expiry, and audit logging.

---

## Normative Vocabulary

All requirements in this document use [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119) keywords:

| Keyword | Meaning |
| --- | --- |
| **MUST** | Mandatory — non-compliance is a defect |
| **MUST NOT** | Prohibited |
| **SHOULD** | Default recommendation — deviate only with documented justification |
| **SHOULD NOT** | Strongly discouraged |
| **MAY** | Permitted |
| **EXCEPTION** | Documented deviation from a rule (see Exception System below) |

---

## Exception System

Every machine-enforceable rule MUST support legitimate deviation. Exceptions require explicit justification and MUST NOT be used to bypass security, accessibility, or data-protection requirements.

```yaml
rule:
  id: HIG-CQ-001
  severity: error
  requirement: component_responsiveness_uses_container_queries
  exceptions:
    allowed:
      - accessibility_preference    # e.g. prefers-reduced-motion
      - viewport_navigation         # page-level layout
      - print
      - external_vendor_code
    requires_justification: true
```

**Agent rule:** The simplest implementation that satisfies applicable HIG requirements MUST be preferred. Do not satisfy a HIG rule by introducing unnecessary complexity (extra Suspense boundaries, containers, animations, ARIA, or client components).

---

## Layer 0: Applicability & Scope

> **Level 2 module:** [rules/applicability.md](./rules/applicability.md) · **Archetype packs:** [rules/archetypes/](./rules/archetypes/)

Not every rule applies to every page. A blog post does not need an async mutation state machine; a dashboard does. This layer defines page archetypes and the mandatory/optional matrix so that both humans and AI agents apply the correct subset.

### 0.1 Page Archetypes

* **Content / Marketing** — Landing pages, blogs, docs, campaign pages. Read-mostly, SEO-critical, often server-rendered.
* **Commerce** — Product listings, PDPs, cart, checkout. Mixed read/write, conversion-critical, payment-sensitive.
* **Application / Dashboard** — Authenticated tools, admin panels, data workflows. Write-heavy, state-heavy, RBAC-governed.
* **Auth / Account** — Sign-in, sign-up, recovery, settings. Security- and privacy-sensitive.

### 0.2 Applicability Matrix

| Capability | Content/Marketing | Commerce | Application | Auth/Account |
| --- | --- | --- | --- | --- |
| Layer 1 UX, motion, micro-animations & View Transitions | ✅ | ✅ | ✅ | ✅ |
| Layer 2 Document fundamentals (lang, landmarks, metadata) | ✅ | ✅ | ✅ | ✅ |
| Layer 2 SEO / structured data | ✅ | ✅ | ⚪ Optional | ⚪ |
| Layer 2 URL-as-state sync | ⚪ (filters if present) | ✅ (facets/pagination) | ✅ | ⚪ |
| Layer 2 Unsaved-changes protection | ⚪ | ✅ (checkout) | ✅ | ✅ (settings) |
| Layer 3 Tokens, typography & Container Queries | ✅ | ✅ | ✅ | ✅ |
| Layer 4 Global state machine & streaming boundaries | ⚪ | ✅ (dynamic views) | ✅ | ✅ |
| Layer 4 Optimistic mutation / server mutation model | ❌ | ⚪ (cart only) | ✅ | ⚪ |
| Layer 4 RBAC visibility guardrails | ❌ | ⚪ | ✅ | ✅ |
| Layer 2 Error / empty / loading taxonomies | ⚪ | ✅ | ✅ | ✅ |
| Layer 2 Forms contract | ⚪ | ✅ (checkout) | ✅ | ✅ (settings) |
| Layer 2 Search standard | ⚪ | ✅ | ✅ | ⚪ |
| Layer 2 Notifications taxonomy | ⚪ | ✅ | ✅ | ✅ |
| Layer 2 i18n / localization | ⚪ | ✅ | ✅ | ⚪ |
| Layer 3 Data density standards | ❌ | ⚪ | ✅ | ⚪ |
| Layer 5 WCAG 2.2 AA | ✅ | ✅ | ✅ | ✅ |
| Layer 5 Browser permissions UX | ⚪ | ⚪ | ✅ | ⚪ |
| Layer 6 Performance (lab + field) | ✅ | ✅ | ✅ | ✅ |
| Layer 9 Security & Privacy | ✅ | ✅ | ✅ | ✅ |

Legend: ✅ Mandatory · ⚪ Conditional (apply where the feature exists) · ❌ Not applicable.

Accessibility (Layer 5), tokens/typography (Layer 3), and performance (Layer 6) are **universal** and never optional.

---

## Layer 1: Universal UX Principles

> **Level 2 module:** [rules/animation.md](./rules/animation.md)

### 1.1 Direct Manipulation & Motion Ergonomics

* **Spatial Origin:** UI elements MUST originate from their logical trigger point (modals expand out from the clicked button; slide-overs anchor to the active edge).
* **Physics-Based Curves:** Use non-linear cubic-bezier momentum curves (`cubic-bezier(0.16, 1, 0.3, 1)`) rather than linear or basic `ease-in-out` transitions. Application-authored CSS MUST NOT use `transition: all` — enumerate the specific properties being animated. (External/vendor CSS is out of scope.)
* **Input Feedback Threshold:** Every user interaction MUST produce an immediate local visual acknowledgement (hover, active press state, focus ring, or pending loader) without waiting for asynchronous network I/O. Prefer functional micro-animations (§1.4) over instant jumps when motion is allowed.

### 1.2 Native View Transitions API

For SPA route navigation and MPA document transitions, use the native View Transitions API (`document.startViewTransition`) rather than mounting heavy JS wrapper libraries:

```css
/* Standard cross-fade transition fallback */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: var(--duration-base); /* 180ms */
  animation-timing-function: var(--ease-out-momentum);
}

/* Explicit element morphing */
.card-hero {
  view-transition-name: hero-card-active;
}
```

* **Rule (HIG-VT-001):** A `view-transition-name` MUST uniquely identify an element within a single transition capture unless an intentional grouping strategy is being used. Duplicate names within the same capture context cause layout engine animation collisions.

### 1.3 Reduced Motion & Animation Safety

Motion is an enhancement, never a dependency. Respect `prefers-reduced-motion: reduce` as a **mandatory HIG requirement**. This exceeds the minimum WCAG 2.2 AA baseline. [WCAG 2.3.3 Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) is a Level **AAA** criterion — the HIG treats reduced-motion support as mandatory regardless.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  ::view-transition-group(*),
  ::view-transition-old(*),
  ::view-transition-new(*) {
    animation: none !important;
  }
}
```

* Replace transform/momentum animations with instant state changes or a minimal opacity fade.
* Disable parallax, auto-playing carousels, native View Transitions morphing, and decorative looping motion.

### 1.4 Functional Micro-Animations

Micro-animations are **functional feedback only** — never decorative flourish. They exist to acknowledge input, clarify state change, or communicate progress. Brand personality MAY live in timing tokens and easing, not in idle ornament.

#### Allowlist (required when the control exists)

| Interaction | Duration token | Typical duration | Notes |
| --- | --- | --- | --- |
| Hover / focus affordance | `--duration-fast` | 100–150 ms | MUST NOT block pointer travel across dense controls |
| Press / active acknowledgment | `--duration-fast` | 100–150 ms | Tied to Input Feedback Threshold (§1.1) |
| Toggle / checkbox / switch | `--duration-base` | 150–200 ms | Show the state transition clearly |
| Inline validation appear/dismiss | `--duration-base` | 150–200 ms | Prefer opacity; avoid layout shift |
| Pending / loading indicator | continuous only while pending | — | MUST stop immediately when settled |
| Toast / snackbar enter | `--duration-slow` | 200–250 ms | Exit faster than enter (`--duration-base`) |
| Modal / overlay open | `--duration-slow` | 200–250 ms | Close at `--duration-base` (150–200 ms) |

#### Deny list

* Decorative loops, idle wiggles, continuous brand ornaments, and autoplay attention-grabbers.
* Parallax, scroll-jacking, and large-field oscillations.
* **Micro-feedback** MUST NOT exceed **300 ms** unless an explicit exception is documented. (Page transitions, large overlays, complex spatial transitions, and accessibility-oriented transitions are not subject to this cap.)
* JS main-thread animation libraries for micro-feedback when CSS transitions/animations suffice.
* Animating layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`) for micro-feedback.

#### Implementation rules

* **Micro-feedback properties:** Micro-feedback SHOULD use `transform` and `opacity` whenever practical. Other properties require explicit justification. This keeps micro-motion off the layout/paint path and protects interaction latency budgets.
* **Tokenized timing:** reference Layer 3 motion tokens (`--duration-*`, `--ease-out-momentum`) — do not invent per-component millisecond values.
* **CSS-first:** prefer CSS transitions/animations over `requestAnimationFrame` or JS tween libraries for allowlisted micro-feedback.
* **Reduced motion:** §1.3 still applies — under `prefers-reduced-motion: reduce`, replace spatial micro-motion with instant state changes or a minimal opacity fade.
* **One job:** a micro-animation MUST communicate exactly one of: affordance, acknowledgment, state change, or progress. If removing it loses no information and no feedback, it belongs on the deny list.

---

## Layer 2: Information Architecture & Product Standards

> **Level 2 modules:** [rules/ux.md](./rules/ux.md) · [rules/states.md](./rules/states.md) · [rules/forms.md](./rules/forms.md) · [rules/search.md](./rules/search.md) · [rules/notifications.md](./rules/notifications.md) · [rules/i18n.md](./rules/i18n.md)

### 2.1 Document Fundamentals

#### Universal (all archetypes)

Every page MUST ship:

* **Language:** `<html lang="…">` set correctly (and `dir` where relevant).
* **Landmarks:** A document MUST contain exactly one primary `<main>` landmark. Nested browsing contexts (e.g. iframes) are separate documents with their own landmark sets. Use `<header>`, `<nav>`, `<footer>`, `<aside>`, etc. when their corresponding semantic regions exist — they are not universally mandatory. Interactive elements MUST use native semantics (`<button>`, `<a>`), never `<div onClick>`.
* **Title:** A unique, descriptive `<title>`.
* **Viewport:** Responsive viewport meta tag.
* **Responsive images (CLS-safe):** Every `<img>` declares intrinsic `width`/`height` or an `aspect-ratio`; use `srcset`/`sizes` for resolution switching. Lazy-load non-critical images where appropriate; avoid lazy-loading the LCP candidate and other immediately needed content. The LCP candidate SHOULD be discoverable early and MAY use `fetchpriority="high"` when appropriate.
* **Fonts:** Fonts MUST use `font-display: swap` or `optional`. Preload only critical font resources when field/lab evidence demonstrates a benefit — preloading every font can hurt performance.

#### SEO / shareable (Content, Commerce — where applicable)

* Meta description and canonical URL where duplication is possible.
* Open Graph and platform-specific social metadata for shareable pages.
* JSON-LD structured data (`Article`, `Product`, `BreadcrumbList`, `Organization`) where the archetype warrants it.

### 2.2 Container-Aware Component Layouts

* **Primary Content Prominence:** Primary tasks and core operational data occupy the reading-order start — the **block-start / inline-start** region (not physical top-left/top-right coordinates).
* **Navigation Depth:** Core features SHOULD be reachable through a predictable and discoverable navigation path, targeting ≤3 user navigation steps where practical. A global command palette MAY supplement but MUST NOT be the sole path to a feature.
* **Progressive Disclosure:** Complex settings, deep parameters, and secondary metadata SHOULD be deferred to expandable accordions, secondary tabs, or drill-down slide-over sheets.

### 2.3 Navigation Architecture, Command Palette & Deep-Linking

* **URL as Single Source of Truth:** Every distinct layout view, active tab, page filter, search query, and pagination offset MUST be bidirectionally synced with URL query parameters (e.g., `/orders?status=shipped&page=2&sort=date_desc`).
* **Command Palette:** A global command palette by the `Cmd/Ctrl+K` convention is permitted as a documented exception to Layer 5's conflict rule. It MUST activate only when the document has focus and no input is capturing text, MUST NOT be the sole path to a feature, and MUST provide a visible trigger button.
* **Unsaved Changes & Data-Loss Protection** (Commerce/App/Auth):
  * Track form dirty state dynamically.
  * Use SPA route guards or framework navigation blockers as primary interception.
  * Use `beforeunload` as a secondary backstop for tab close / external reload.
  * Implement `localStorage`/`IndexedDB` auto-save drafts for multi-step forms.

### 2.4 Destructive Actions & Permission Guardrails

* **Role-Based Visibility** (App/Auth): Hide or explicitly disable actions that exceed a user's RBAC permissions. If disabled due to permissions, explain required administrative privileges on focus/hover.
* **Destructive Flow Friction:** Irreversible operations MUST require an intentional multi-step modal with explicit confirmation input (typing the resource name or `DELETE`).
* **Deletion models** — distinguish by severity:

```
User requests delete
       ↓
Soft delete / reversible state
       ↓
Undo window
       ↓
Permanent commit
```

| Type | Pattern |
| --- | --- |
| **Reversible deletion** | MAY use optimistic removal when the system supports reliable rollback or soft deletion |
| **Soft deletion** | Hide from UI; retain recoverable state server-side |
| **Irreversible deletion** | Multi-step confirmation; MUST NOT use conventional optimistic confirmation |
| **Financial / legal action** | Explicit confirmation; idempotency protection required (§4.5) |

Destructive mutations MUST NOT use conventional optimistic confirmation. Reversible deletion MAY use optimistic removal with an undo window (5–10 s toast) when the system supports reliable rollback or soft deletion — the backend need not literally delay the mutation if soft-delete semantics provide reversibility.

### 2.5 Error UX Taxonomy

Every error state MUST map to a defined category with prescribed UI behavior:

| Category | UI behavior |
| --- | --- |
| **Validation** | Inline field errors; focus first invalid field; preserve user input |
| **Authentication** | Clear re-auth prompt; do not expose whether account exists |
| **Authorization** | Explain insufficient permissions; offer escalation path if applicable |
| **Network** | Retry action; preserve form state; indicate connectivity status |
| **Timeout** | Retry with backoff; show elapsed wait if helpful |
| **Conflict** | Present diff/merge/overwrite options (§4.5) |
| **Rate limit** | Inform user of wait period; disable submit until eligible |
| **Server (5xx)** | Generic error message; retry; log correlation ID internally |
| **Offline** | Degraded mode indicator; queue actions where supported (§4.6) |
| **Partial failure** | Per-item error states; summarize success/failure counts |
| **Unknown** | Fallback error with retry and support contact; never silent failure |

Errors MUST NOT rely on color alone. Each error MUST include text and, where applicable, an icon or pattern.

### 2.6 Empty-State Taxonomy

Empty states MUST be categorized and designed accordingly:

| Type | Purpose | Required elements |
| --- | --- | --- |
| **First-use** | Onboard new users | Explanation, primary CTA to create/add |
| **No results** | Search/filter returned nothing | Clear message, suggest broadening criteria |
| **Filtered empty** | Active filters exclude all items | Show active filters; offer clear-filters action |
| **Permission empty** | User lacks access | Explain required permission; no misleading CTAs |
| **Error empty** | Data failed to load | Error message with retry |
| **Offline empty** | No connectivity | Offline indicator; queued actions if supported |
| **Completed** | All tasks done | Positive confirmation; suggest next action |

### 2.7 Loading-State Taxonomy

Loading states MUST be differentiated — never use a generic spinner for all async operations:

| Type | When | UI pattern |
| --- | --- | --- |
| **Initial loading** | First page/data fetch | Full-page or region skeleton matching final layout |
| **Background refresh** | Stale-while-revalidate | Subtle indicator; preserve existing content (§4.3) |
| **Mutation pending** | Form submit / action in flight | Disable trigger; inline spinner on action |
| **Skeleton** | Known layout, unknown content | Layout-matching placeholder shapes |
| **Progressive stream** | Streaming server render | Incremental content reveal at boundaries |
| **Pagination loading** | Next/previous page fetch | Inline loader in pagination control or table footer |
| **Infinite-scroll loading** | Scroll-triggered fetch | Bottom sentinel with loader; preserve scroll position |

### 2.8 Internationalization & Localization

Applications with multiple locales MUST support:

* **Pluralization** — locale-aware plural rules (not hard-coded English forms).
* **Date/time formatting** — locale-aware display; store/transmit in ISO 8601 UTC.
* **Number & currency formatting** — locale decimal separators, grouping, currency symbols.
* **Timezone** — display in user's timezone; store in UTC.
* **Locale-aware sorting** — use `Intl.Collator` or equivalent, not ASCII sort.
* **Text expansion** — layouts MUST accommodate 30–40% longer translated strings without breaking.
* **CJK typography** — appropriate line-height, word-break, and font fallbacks for CJK scripts.
* **Bidirectional text** — support RTL locales with `dir="rtl"` and logical CSS properties.

**Layout coordinates MUST use logical properties** — `block-start`, `inline-start`, `margin-inline`, `padding-block` — not physical `top`/`left`/`right`/`bottom` for layout rules. Physical coordinates MAY appear only in non-localizable decorative contexts.

### 2.9 Search Standard (Commerce / Application)

Search flows MUST follow this state machine:

```
[input] ──debounce──> [pending] ──┬──> [results]
                                  ├──> [no results]
                                  └──> [error]
```

Requirements:

* Debounce input (typically 200–400 ms); show pending indicator after debounce threshold.
* Results MUST support keyboard navigation (arrow keys, Enter to select).
* Search query MUST sync to URL where search is a primary navigation pattern (§2.3).
* No-results and error states MUST follow §2.5 / §2.6 taxonomies.
* Recent searches MAY be persisted locally; MUST respect privacy settings (Layer 9).

### 2.10 Notifications Taxonomy

| Type | Duration | Use when |
| --- | --- | --- |
| **Toast / snackbar** | 4–10 s (dismissible) | Transient success/failure feedback; undo actions |
| **Inline status** | Persistent until resolved | Field-level or section-level status within context |
| **Banner** | Persistent until dismissed or resolved | System-wide alerts, maintenance, policy notices |
| **Modal** | Until user acts | Requires decision; blocks interaction |
| **System notification** | OS-managed | Background events when tab is inactive (requires permission §5.5) |

Toasts MUST NOT stack beyond 3 visible simultaneously. Critical errors SHOULD use banners or modals, not toasts alone.

### 2.11 Forms Contract

Forms MUST follow these standards (Commerce checkout, Application settings, Auth flows):

| Concern | Requirement |
| --- | --- |
| **Field grouping** | Related fields grouped with `<fieldset>`/`<legend>` or visual grouping with programmatic association |
| **Labels** | Every input MUST have a visible, programmatically associated `<label>` |
| **Help text** | Supplementary guidance linked via `aria-describedby` |
| **Validation timing** | Inline on blur for field-level; on submit for form-level; never validate before user interaction unless pre-filled |
| **Server validation** | Map server errors to specific fields; preserve all user input |
| **Autocomplete** | Use appropriate `autocomplete` tokens for common fields (name, email, address, cc-*) |
| **Password managers** | Do not block autofill; use standard input types and `autocomplete="current-password"` / `"new-password"` |
| **Input types** | Use semantic types (`email`, `tel`, `url`, `number`) for mobile keyboard optimization |
| **Keyboard behavior** | Enter submits single-field forms; Tab order follows visual order |
| **Multi-step forms** | Show progress indicator; preserve state between steps; allow back navigation |
| **Draft persistence** | Auto-save drafts for forms >3 fields or multi-step flows (§2.3) |
| **Error summary** | On submit failure, focus error summary linking to first invalid field |

---

## Layer 3: Visual, Design Token System & Container Engine

> **Level 2 modules:** [rules/tokens.md](./rules/tokens.md) · [rules/responsive.md](./rules/responsive.md) · [rules/data-density.md](./rules/data-density.md)

### 3.1 Design Token Architecture

Tokens follow a **true three-tier structure**: **Global (Raw) → Semantic → Component**. Raw scale values live in Tier 1 as primitives; components consume Tier 3, which maps to Tier 2.

**Contrast verification** applies to semantic foreground/background and UI-state **combinations** — not to raw tokens in isolation. A token like `--pr-blue-500` has no contrast ratio by itself; contrast is a relationship. All semantic foreground/background and UI-state combinations MUST be contrast-verified using WCAG 2.2 contrast algorithms for:

* Text/background combinations
* Interactive states (hover, active, disabled)
* Focus indicators
* Meaningful graphical objects

```css
:root {
  /* Tier 1: Global Primitive Tokens */
  --pr-blue-500: #2563eb;
  --pr-blue-600: #1d4ed8;
  --pr-blue-400: #60a5fa;
  --pr-slate-900: #0f172a;
  --pr-slate-600: #475569;
  --pr-slate-500: #64748b;
  --pr-slate-400: #94a3b8;
  --pr-slate-100: #f1f5f9;

  --pr-emerald-700: #047857;
  --pr-emerald-500: #059669;
  --pr-amber-700:   #b45309;
  --pr-amber-500:   #d97706;
  --pr-red-600:     #dc2626;
  --pr-red-700:     #b91c1c;

  /* Spacing, layout, elevation */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  --size-radius-sm: 6px;
  --size-radius-md: 10px;
  --size-radius-lg: 16px;
  --size-measure-max: 75ch;
  --size-control-height-sm: 32px;
  --size-control-height-md: 40px;
  --size-control-height-lg: 48px;
  --size-border-width: 1px;
  --size-border-width-focus: 3px;

  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal: 400;
  --z-toast: 500;

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.10);

  --breakpoint-page-sm: 640px;
  --breakpoint-page-md: 768px;
  --breakpoint-page-lg: 1024px;
  --breakpoint-page-xl: 1280px;

  /* Tier 1: Motion primitives (functional micro-animations §1.4) */
  --duration-instant: 0ms;
  --duration-fast: 100ms;
  --duration-base: 180ms;
  --duration-slow: 250ms;
  --ease-out-momentum: cubic-bezier(0.16, 1, 0.3, 1);

  /* Tier 2: Semantic Tokens (Light Baseline) */
  --surface-base: #ffffff;
  --surface-raised: var(--pr-slate-100);
  --surface-overlay: rgba(255, 255, 255, 0.90);

  --text-primary: var(--pr-slate-900);   /* ~16:1 on base */
  --text-secondary: var(--pr-slate-600); /* ~7.5:1 on base */
  --text-muted: var(--pr-slate-500);     /* ~4.8:1 on base */

  --brand-primary: var(--pr-blue-500);
  --brand-hover: var(--pr-blue-600);
  --focus-ring: var(--pr-blue-600);      /* ~5.2:1 on base */

  --status-success: var(--pr-emerald-500);
  --status-warning: var(--pr-amber-500);
  --status-danger:  var(--pr-red-600);

  --status-success-text: var(--pr-emerald-700);
  --status-warning-text: var(--pr-amber-700);
  --status-danger-text:  var(--pr-red-700);

  --radius-sm: var(--size-radius-sm);
  --radius-md: var(--size-radius-md);
  --radius-lg: var(--size-radius-lg);
  --line-measure-max: var(--size-measure-max);

  --motion-duration-fast: var(--duration-fast);
  --motion-duration-base: var(--duration-base);
  --motion-duration-slow: var(--duration-slow);
  --motion-ease-out: var(--ease-out-momentum);

  /* Tier 3: Component Tokens */
  --button-bg: var(--brand-primary);
  --button-bg-hover: var(--brand-hover);
  --button-fg: var(--surface-base);
  --input-border: var(--text-muted);
  --input-focus-ring: var(--focus-ring);
  --card-surface: var(--surface-raised);
  --card-radius: var(--radius-md);
}

/* System preference (default) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --surface-base: #090d16;
    --surface-raised: #1e293b;
    --surface-overlay: rgba(15, 23, 42, 0.90);
    --text-primary: #f8fafc;
    --text-secondary: #cbd5e1;
    --text-muted: var(--pr-slate-400);
    --brand-primary: #3b82f6;
    --brand-hover: #60a5fa;
    --focus-ring: #60a5fa;
    --status-success: #34d399;
    --status-warning: #fbbf24;
    --status-danger:  #f87171;
    --status-success-text: #34d399;
    --status-warning-text: #fbbf24;
    --status-danger-text:  #f87171;
  }
}

/* Explicit application-level theme selection */
:root[data-theme="dark"] { /* same dark overrides */ }
:root[data-theme="light"] { /* light overrides */ }
```

Applications SHOULD support system preference by default, while allowing application-level theme selection (`system` / `light` / `dark`) where appropriate.

### 3.2 Container Queries Engine

Reusable UI components (cards, tables, form groups) MUST respond to their immediate parent container width rather than the screen viewport.

```css
.component-container {
  container-type: inline-size;
  container-name: card-grid;
}

.product-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@container card-grid (min-width: 420px) {
  .product-card {
    flex-direction: row;
    align-items: center;
  }
}
```

**Responsive query roles (HIG-CQ-001):**

| Query type | Purpose |
| --- | --- |
| `@container` | Component-size adaptation |
| `@media` (viewport) | Page layout, navigation structure |
| `@media` (preferences) | Accessibility (`prefers-reduced-motion`), user preferences (`prefers-color-scheme`), print, environment/device conditions |

`@media (prefers-reduced-motion: reduce)` and similar preference queries are legitimate even inside component stylesheets. Component layout adaptation SHOULD use `@container`; viewport `@media` is for page-level concerns.

### 3.3 Data Density Standards (Application / Dashboard)

Data-heavy interfaces MUST use tokenized density levels:

| Token | Row height | Use case |
| --- | --- | --- |
| `--density-compact` | 32–36 px | Dense dashboards, admin tables |
| `--density-default` | 40–48 px | Standard application tables |
| `--density-comfortable` | 52–56 px | Primary workflows, touch-friendly |

Additional requirements:

* **Numeric alignment** — numbers MUST be right-aligned (or `text-align: end`); text left-aligned (`start`).
* **Truncation** — long text truncates with ellipsis; full value available on hover/focus or expand action.
* **Overflow** — horizontal scroll ONLY as last resort; prefer column hiding/reordering at container breakpoints.
* **Sticky headers** — table headers SHOULD stick on scroll for datasets >10 rows.
* **Bulk actions** — multi-select with visible selection count and batch action bar.
* **Pagination** — preferred over infinite scroll for operational data requiring URL state (§2.3); infinite scroll permitted for feed/browse patterns.
* **Virtualization** — datasets >100 rows SHOULD use virtual scrolling to maintain performance (Layer 6).

---

## Layer 4: Interaction, State Architecture & Data Protection

> **Level 2 modules:** [rules/architecture.md](./rules/architecture.md) · [rules/mutations.md](./rules/mutations.md) · [framework/](./framework/)

### 4.1 Server-Driven & Progressive Rendering Architecture

Modern hybrid web applications MUST separate server rendering from interactive client islands. This is a **framework-neutral reference architecture** — not all frameworks implement it as React Server Components (RSC).

```
[Incoming Request]
        │
        ▼
[Server Rendering]
        │
        ▼
[Progressive / Streaming Rendering]
        │
        ▼
[Hydration Boundaries]
        │
        ▼
[Interactive Client Islands]
        │
        ▼
[Server Mutation]
        │
        ▼
[Pending]
        │
        ▼
[Optimistic (when eligible)]
        │
        ▼
[Confirmed / Failed]
```

**Universal standards:**

1. **Server First:** Default to server rendering. Add client interactivity only when attaching state, browser event listeners, or lifecycle effects.
2. **Streaming boundaries:** Every independently slow, progressively renderable, or failure-isolatable asynchronous UI region SHOULD have an explicit loading/streaming boundary with a layout-matching skeleton. Do not add meaningless Suspense/streaming wrappers around fast or atomic regions.

#### Framework Adapters

| Universal concept | React / Next.js | Vue / Nuxt | Astro |
| --- | --- | --- | --- |
| Server rendering | React Server Components | SSR / server components | `.astro` server components |
| Client interactivity | `'use client'` directive | `<ClientOnly>` / `.client.vue` | `client:*` islands |
| Streaming boundary | `<Suspense fallback={…}>` | `<Suspense>` (Vue 3) | slot streaming |
| Server mutation | Server Actions | server API routes + form actions | server endpoints |
| Pending state | `useFormStatus`, `useActionState` | form pending refs | island pending UI |
| Optimistic update | `useOptimistic` | manual optimistic state | island-level state |

RSC is the React/Next.js implementation of server-driven rendering — not a universal label for all hybrid rendering.

### 4.2 Async Mutation & Server Action State Model

Server-driven mutations MUST follow an explicit status wrapper:

```
[idle] ──> [submitting / pending] ──> [optimistic_render] ──┬──> [confirmed / revalidated]
                                                             │
                                                             └──> [failed] ──> [rollback + toast_retry]
```

* **Form pending states:** Forms executing server mutations MUST handle native pending states and supply immediate visual feedback (disabling submit triggers, displaying pending spinners) without waiting for server response round-trips.
* **Optimistic eligibility:** Optimistic rendering is allowed **only for low-consequence, reversible mutations** (toggles, likes, cart item counts). Destructive mutations MUST NOT use conventional optimistic confirmation (§2.4).

### 4.3 Data Freshness & Stale States

Dashboards and data-heavy views MUST handle explicit freshness states:

| State | UI behavior |
| --- | --- |
| **Fresh** | Display current data; no indicator needed |
| **Stale** | Show data with subtle staleness indicator; background refresh permitted |
| **Refreshing** | Show non-blocking refresh indicator; preserve existing data |
| **Failed refresh** | Retain stale data with error indicator and retry action |

### 4.4 Network & Error States

Applications MUST define UI behavior for:

| Failure type | Minimum UI |
| --- | --- |
| **Offline** | Degraded mode indicator; queue local mutations where supported |
| **Timeout** | Retry with backoff; preserve user input |
| **Server error (5xx)** | Error message with retry; do not lose form state |
| **Rate limited (429)** | Inform user; suggest wait/retry |
| **Authorization failure (401/403)** | Redirect or inline permission message |
| **Conflict (409)** | Present conflict resolution UI (see §4.5) |
| **Partial failure** | Show per-item error states; do not fail the entire view silently |

### 4.5 Concurrency, Conflict & Idempotency

**Conflict handling** (collaborative/operational applications):

```
User A updates ──> User B updates ──> Conflict detected ──> Resolve / merge / overwrite
```

**Idempotency:** Important mutations (payments, orders, deletes, publishes, invites) SHOULD use idempotency keys at the product/API layer to protect against double-clicks, retries, network failures, and mobile reconnection.

**Retry rules:**

| Mutation type | Retry policy |
| --- | --- |
| Idempotent reads | Safe to retry |
| Idempotent writes (with key) | Safe to retry |
| Non-idempotent mutations | MUST NOT blind-retry |
| Destructive actions | MUST NOT auto-retry |
| Payments | Idempotency key required; no blind retry |

### 4.6 Offline & Degraded Mode (Application/Dashboard)

```
online ──> degraded ──> offline ──> local pending mutation ──> sync ──> conflict ──> resolved
```

Applications that support offline operation MUST define sync, conflict resolution, and user-visible status for each stage.

---

## Layer 5: Accessibility (a11y) & Keyboard Navigation

> **Level 2 module:** [rules/accessibility.md](./rules/accessibility.md)

### 5.1 Standards Baseline

* **Conformance:** WCAG 2.2 Level AA conformance is mandatory across all public and internal interfaces. The HIG does not redefine individual success criteria — refer to the [official WCAG 2.2 specification](https://www.w3.org/TR/WCAG22/) and [Understanding documents](https://www.w3.org/WAI/WCAG22/Understanding/). AAA is targeted where practical (e.g. reduced motion per §1.3).
* **Text Contrast:** Standard text ≥4.5:1; large text (≥24px, or ≥18.66px bold) ≥3:1. Non-text UI (icons, borders, focus indicators, status fills) ≥3:1.
* **Zoom & reflow:** Content MUST remain usable at 200% text zoom. Where applicable, support 400% reflow without horizontal scrolling for standard content layouts. Text MUST be resizable without loss of content or functionality.

### 5.2 Native HTML Over ARIA

Native semantic HTML MUST be preferred over ARIA when equivalent native semantics exist. Example: use `<button>` instead of `<div role="button">`.

**Accessible name computation** — prefer in order:

1. Visible text content
2. Accessible name from content (e.g. `<img alt>`, `<input>` associated with `<label>`)
3. `aria-labelledby`
4. `aria-label` (when visible text is insufficient)

Avoid unnecessary ARIA.

### 5.3 Keyboard Focus & Interaction

* **Visible Focus Indicator:** All interactive controls MUST display an explicit, high-contrast indicator (`outline: 3px solid var(--focus-ring); outline-offset: 2px;`). The focus ring itself MUST have sufficient contrast against adjacent backgrounds and MUST NOT be obscured by adjacent elements. Never `outline: none` without a custom equivalent.
* **Focus Trapping:** Modal dialogs MUST implement actual focus containment:
  * Focus MUST move into the dialog when opened.
  * Focus MUST NOT escape the dialog while it is active (Tab/Shift+Tab cycle within).
  * Focus MUST return to the originating control when closed.
  * `aria-modal="true"` communicates modality to assistive technologies but does **not** itself create a focus trap.
* **Focus Restoration:** Closing a dialog/popover MUST return focus to the originating trigger.
* **Skip Links:** Provide a "Skip to main content" link as the first tabbable element.

**Keyboard interaction patterns** — implementations MUST follow platform conventions for:

| Widget | Expected behavior |
| --- | --- |
| Dialog | Escape closes; focus trap; initial focus on first focusable or title |
| Menu | Arrow keys navigate; Escape closes; typeahead |
| Tabs | Arrow keys switch tabs; Tab moves to panel |
| Combobox | Arrow keys + typeahead; Enter selects |
| Listbox | Arrow keys navigate; multi-select with modifier |
| Accordion / disclosure | Enter/Space toggles; arrow keys between headers |
| Sortable table | Keyboard-accessible sort controls |
| Drag/drop | Keyboard alternative MUST exist |

### 5.4 Target Sizes

* **Minimum interactive target:** 24×24 CSS px, except where a [WCAG-defined exception](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) applies.
* **Preferred touch target:** 44×44 CSS px for primary touch interactions (ergonomic recommendation, not a compliance floor).

### 5.5 Browser Permissions UX

When requesting browser capabilities, applications MUST:

| Permission | UX requirement |
| --- | --- |
| **Camera / microphone** | Explain why before prompt; show active indicator while in use; easy dismiss |
| **Clipboard** | Request only on explicit user action (copy/paste button); show success/failure feedback |
| **Geolocation** | Explain benefit; offer manual location entry as fallback |
| **Notifications** | Explain value; never request on first visit; respect OS-level denial |
| **File system** | Trigger only from explicit file picker or drag-drop zone |
| **Downloads** | Confirm large downloads; show progress; handle blocked popups gracefully |

Permission prompts MUST NOT appear without prior in-app explanation. Denied permissions MUST degrade gracefully with alternative workflows — never block core functionality silently.

---

## Layer 6: Performance & Web Vitals

> **Level 2 module:** [rules/performance.md](./rules/performance.md)

Performance requirements are split into **lab (CI)** and **field (RUM)** contexts. Synthetic lab tests measure interaction latency but are **not equivalent** to field Interaction to Next Paint (INP).

### 6.1 Core Web Vitals & Supporting Performance Metrics

#### Core Web Vitals (field RUM / SLO monitoring)

| Metric | HIG Target | HIG Acceptable | Gate type |
| --- | --- | --- | --- |
| Interaction to Next Paint (INP) | ≤ 100 ms | ≤ 200 ms | Field SLO |
| Largest Contentful Paint (LCP) | ≤ 1.2 s | ≤ 2.5 s | Lab + Field |
| Cumulative Layout Shift (CLS) | ≤ 0.02 | ≤ 0.10 | Lab + Field |

#### Supporting metrics

| Metric | HIG Target | HIG Acceptable | Gate type |
| --- | --- | --- | --- |
| Time to First Byte (TTFB) | ≤ 200 ms | ≤ 800 ms | Lab + Field |
| Synthetic interaction latency | ≤ 100 ms | ≤ 200 ms | Lab / CI |

TTFB is **not** a Core Web Vital. It is a supporting performance metric.

### 6.2 Lab Performance (CI)

Lab/CI gates SHOULD enforce:

* Synthetic interaction latency (not field INP)
* LCP, CLS, TTFB (synthetic)
* JS execution time
* Bundle size budgets

### 6.3 Field Performance (RUM)

Field monitoring/SLO gates SHOULD track:

* INP, LCP, CLS, TTFB (real user measurements)

Field INP MUST be treated as a monitoring/SLO gate — not as a deterministic build-failure result from synthetic tests.

### 6.4 Performance Budgets

Beyond Web Vitals, projects SHOULD define budgets for:

| Budget | Purpose |
| --- | --- |
| Initial JS | First-load JavaScript weight |
| Total JS | Aggregate JavaScript |
| CSS | Stylesheet weight |
| Image weight | Per-page image payload |
| Font weight | Font file payload |
| Third-party JS | External script weight |
| Hydration time | Client island hydration duration |
| Long tasks | Main-thread blocking |
| DOM size | Node count limits |

### 6.5 Regression-Based Gates

Absolute thresholds alone are insufficient. PRs that increase initial JS by >10% (or other project-defined regression thresholds) SHOULD fail unless explicitly approved — even when the application remains below the absolute limit.

---

## Layer 7: AI & Agent Enforcement Contract

> **Level 2 module:** [rules/ai-enforcement.md](./rules/ai-enforcement.md)

Deterministic, machine-readable rules for system prompts, AI coding workflows (Cursor, Claude Code, GitHub Copilot), and automated analysis.

**Product-repo adoption:** see [INTEGRATION.md](./INTEGRATION.md) for an efficient workflow (pin the contract → archetype map → **HIG-LITE default context** → **rules/*.md on topic match** → thin agent rules → PR checklist → CI). Copy-paste templates live in [examples/agent-rules/](./examples/agent-rules/). Agents should load [HIG-LITE.md](./HIG-LITE.md) by default, then [rules/manifest.yaml](./rules/manifest.yaml) modules — not the full HIG on every task.

### 7.1 Rule Schema

Every machine rule MUST include:

```yaml
rules:
  - id: HIG-UX-001
    rule: logical_properties
    severity: error          # error | warning | info
    requirement: "Use CSS logical properties (margin-inline, inset-inline-start)"
    archetypes: [content, commerce, application, auth]
    autofix:
      allowed: false
      requires_review: true
    exceptions:
      allowed: [external_vendor_code]
      requires_justification: true
```

**Severity levels:**

| Level | CI behavior |
| --- | --- |
| `error` | Blocking — fails build/PR |
| `warning` | Advisory — reported, does not block |
| `info` | Observation — logged for tracking |

### 7.2 AI Coding Agent Guardrails

```yaml
agent_enforcement_rules:
  scope:
    resolve_archetype_first: true
    apply_layer0_matrix: true
    prefer_simplest_compliant_implementation: true  # HIG-SIM-001

  styling_constraints:
    - id: HIG-TOK-001
      rule: disallow_raw_hex_colors_outside_token_files
      severity: error
    - id: HIG-TOK-002
      rule: require_semantic_or_component_tokens
      severity: error
    - id: HIG-MOT-001
      rule: prohibit_transition_all_application_css
      severity: error
      note: "Application-authored CSS only; vendor CSS excluded"
    - id: HIG-MOT-002
      rule: require_motion_duration_tokens
      severity: error
    - id: HIG-MOT-003
      rule: prohibit_decorative_micro_animations
      severity: error
    - id: HIG-MOT-004
      rule: micro_animation_max_ms
      value: 300
      scope: micro_feedback_only
      severity: error
    - id: HIG-MOT-005
      rule: micro_feedback_prefers_transform_opacity
      severity: warning
    - id: HIG-CQ-001
      rule: require_container_queries_for_component_layout
      severity: error
    - id: HIG-UX-001
      rule: require_logical_properties
      severity: error
    - id: HIG-A11Y-001
      rule: require_reduced_motion_media_query
      severity: error

  server_rendering_constraints:
    - id: HIG-SSR-001
      rule: default_to_server_rendering
      severity: error
      archetypes: [commerce, application, auth]
    - id: HIG-SSR-002
      rule: require_streaming_boundary_for_slow_async_regions
      severity: warning
      note: "Only for independently slow/progressively renderable regions"
    - id: HIG-SSR-003
      rule: require_form_pending_states_on_server_mutations
      severity: error
      archetypes: [commerce, application, auth]

  accessibility_constraints:
    - id: HIG-A11Y-002
      rule: target_standard
      value: "WCAG 2.2 AA"
      severity: error
    - id: HIG-A11Y-003
      rule: prefer_native_html_over_aria
      severity: error
    - id: HIG-A11Y-004
      rule: require_accessible_name_on_icon_buttons
      severity: error
    - id: HIG-A11Y-005
      rule: require_alt_text_on_images
      severity: error
    - id: HIG-A11Y-006
      rule: require_visible_focus_styles
      severity: error
    - id: HIG-A11Y-007
      rule: min_target_size_px
      value: 24
      severity: error
      note: "WCAG exceptions apply; preferred touch target 44px"
    - id: HIG-A11Y-008
      rule: modal_focus_containment
      severity: error

  mutation_constraints:
    - id: HIG-MUT-001
      rule: no_optimistic_destructive_confirmation
      severity: error
    - id: HIG-MUT-002
      rule: idempotency_for_critical_mutations
      severity: warning
      archetypes: [commerce, application]

  product_ux_constraints:
    - id: HIG-ERR-001
      rule: error_states_use_taxonomy
      severity: warning
      archetypes: [commerce, application, auth]
    - id: HIG-EMP-001
      rule: empty_states_use_taxonomy
      severity: warning
      archetypes: [commerce, application, auth]
    - id: HIG-LOD-001
      rule: loading_states_use_taxonomy
      severity: warning
    - id: HIG-FRM-001
      rule: forms_have_labels_and_error_summary
      severity: error
      archetypes: [commerce, application, auth]
    - id: HIG-I18N-001
      rule: use_logical_properties_for_layout
      severity: error
    - id: HIG-NTF-001
      rule: notifications_use_taxonomy
      severity: warning

  security_constraints:
    - id: HIG-SEC-001
      rule: no_secrets_in_client_code
      severity: error
    - id: HIG-SEC-002
      rule: csp_headers_configured
      severity: error
    - id: HIG-SEC-003
      rule: pii_masked_in_ui_and_logs
      severity: error
    - id: HIG-SEC-004
      rule: secure_cookie_attributes
      severity: error
      archetypes: [commerce, application, auth]
```

### 7.3 Programmatic Linter Specifications

**ESLint (`eslint-plugin-hig`):**

* `hig/enforce-container-queries` — flags viewport `@media` for component layout where `@container` should be used.
* `hig/streaming-boundary` — verifies slow async server regions have explicit loading/streaming boundaries with fallback skeletons.
* `hig/no-unlabeled-icon-buttons` — flags `<button>` containing only an icon without an accessible name.
* `hig/micro-animation-budget` — flags micro-feedback durations above 300 ms and non-`transform`/`opacity` properties without justification.
* `hig/no-optimistic-destructive` — errors when a delete/remove mutation uses optimistic confirmation without undo/soft-delete support.
* `hig/no-transition-all` — flags `transition: all` in application-authored CSS.

---

## Layer 8: Quality Assurance & CI/CD Gates

CI gates are classified by enforcement level:

| Level | Behavior | Examples |
| --- | --- | --- |
| **BLOCKING** | Fails build/PR | TypeScript errors, critical a11y violations, security violations, HIG MUST violations |
| **WARNING** | Reported, does not block | Performance regression, non-critical a11y, animation issues |
| **OBSERVATION** | Logged for tracking | Field INP, field LCP, field CLS |

```
[Developer Git Push / PR Created]
               │
               ▼
   [Automated CI/CD Pipeline]
               │
               ├── 0. Resolve archetype & load Layer 0 matrix
               │
               ├── 1. Static Analysis (ESLint + Stylelint + HIG Plugin) ── BLOCKING
               │      ├── Container Query Validation
               │      └── Server/Client Rendering Boundaries
               │
               ├── 2. Security Audit ── BLOCKING
               │      ├── Dependency vulnerability audit
               │      ├── Secret scanning
               │      ├── SAST
               │      └── CSP / security header checks
               │
               ├── 3. Accessibility Audit (Axe-core / Playwright a11y, WCAG 2.2 AA) ── BLOCKING
               │
               ├── 4. Visual Regression (Playwright screenshots) ── WARNING
               │      ├── Layout regression
               │      ├── Responsive breakpoint regression
               │      └── Dark-mode regression
               │
               ├── 5. Cross-Browser Testing ── WARNING
               │      ├── Chromium, Safari/WebKit, Firefox
               │      └── Mobile Safari, Mobile Chromium
               │
               ├── 6. Lab Performance Audit ── BLOCKING (absolute) / WARNING (regression)
               │      ├── Synthetic interaction latency > 200ms ──> ❌ FAIL BUILD
               │      ├── LCP  > 2.5s ──────────────────────────> ❌ FAIL BUILD
               │      ├── CLS  > 0.10 ──────────────────────────> ❌ FAIL BUILD
               │      ├── TTFB > 800ms ─────────────────────────> ❌ FAIL BUILD
               │      └── JS bundle regression > threshold ──────> ⚠️ WARNING
               │
               ├── 7. Field RUM Monitoring ── OBSERVATION
               │      ├── Field INP SLO
               │      ├── Field LCP SLO
               │      └── Field CLS SLO
               │
               └── 8. All Blocking Gates Passed ──────────────────> ✅ BUILD APPROVED
```

**Supported browser policy:** Projects MUST define a supported browser matrix. At minimum, test representative viewports: mobile, tablet, desktop, wide desktop. Do not turn viewport sizes into arbitrary fixed breakpoints for component logic — use container queries (§3.2).

---

## Layer 9: Security & Privacy

> **Level 2 module:** [rules/security.md](./rules/security.md)

Security and privacy requirements apply to all archetypes. Layer 9 complements Layer 8 security CI gates with product-level standards.

### 9.1 Content Security Policy (CSP)

Applications MUST deploy a Content Security Policy that:

* Restricts `script-src` to known origins; avoid `'unsafe-inline'` and `'unsafe-eval'` in production.
* Uses nonces or hashes for any required inline scripts.
* Restricts `frame-ancestors` to prevent clickjacking.
* Reports violations to a monitoring endpoint (CSP report-uri/report-to).

### 9.2 XSS & CSRF Mitigation

* **XSS:** All user-generated content MUST be sanitized before rendering. Use framework auto-escaping; never `dangerouslySetInnerHTML` / `v-html` / `{@html}` without sanitization.
* **CSRF:** State-changing requests MUST include CSRF protection (synchronizer token, SameSite cookies, or double-submit cookie pattern).
* **Output encoding:** Context-appropriate encoding for HTML, URL, JavaScript, and CSS contexts.

### 9.3 Secure Cookies & Storage

| Attribute | Requirement |
| --- | --- |
| `Secure` | MUST on all session/auth cookies in production |
| `HttpOnly` | MUST on session tokens (not accessible to JS) |
| `SameSite` | `Strict` or `Lax` for auth cookies; `Strict` for sensitive operations |
| `Max-Age` / `Expires` | Explicit expiry; session cookies MUST have server-side TTL |

Browser storage (`localStorage`, `IndexedDB`) MUST NOT store sensitive tokens, PII, or payment data. Draft form data in storage MUST be encrypted or scoped to non-sensitive fields.

### 9.4 PII & Sensitive Data Handling

* **Display masking** — show partial values for sensitive fields (e.g. `••••4242` for card numbers, truncated email).
* **Log sanitization** — PII MUST NOT appear in client-side logs, analytics events, or error reports sent to third parties.
* **Data minimization** — collect only fields required for the current operation.
* **Right to deletion** — provide UI path for account/data deletion where regulations require (Auth/Account archetype).

### 9.5 Authentication UX

* **Session expiry** — warn before timeout; offer extend-session action; redirect to login with return URL preserved.
* **Failed login** — generic error message (do not reveal account existence); rate-limit attempts.
* **Password requirements** — show requirements before submission; validate on blur and submit.
* **MFA** — support TOTP/WebAuthn where security policy requires; provide recovery codes.
* **Sign-out** — clear client state and invalidate server session; confirm on shared devices.

### 9.6 Third-Party Scripts & Analytics

* Third-party scripts MUST be inventory-tracked and loaded with `async`/`defer`.
* Analytics MUST be privacy-safe: no PII in event payloads; respect Do Not Track / consent preferences where applicable.
* Tag managers and ad scripts MUST NOT block core rendering (Layer 6 third-party JS budget).

### 9.7 Audit Logging (Application / Auth)

Operational applications SHOULD log security-relevant events:

* Authentication success/failure
* Authorization denials
* Destructive mutations (§2.4)
* Permission changes
* Data export/download

Logs MUST include timestamp, actor, action, and resource — but MUST NOT include secrets or full PII.

---

### 8.1 Version History

Expanded release notes for each version: **[RELEASE_NOTES.md](./RELEASE_NOTES.md)**.

* **v1.9.0 (2026-09-09):** Progressive loading Phase 3. Added archetype rule packs (`rules/archetypes/`), `rules/applicability.md`, `VERSION` file, `scripts/validate-hig.mjs`, and GitHub Actions validation workflow. Agents preload archetype-specific module sets after resolving page type.
* **v1.8.0 (2026-09-09):** Progressive loading Phase 2. Extracted 16 standalone Level 2 rule modules in `rules/` and 5 framework adapters in `framework/`. Updated manifest to point to module files. HIG.md remains the complete normative contract with module cross-links.
* **v1.7.0 (2026-09-09):** Progressive loading architecture (Phase 1). Added HIG-CORE.md (Level 0), HIG-LITE.md (Level 1), rules/INDEX.md and rules/manifest.yaml (Level 2). HIG-LITE is a compressed summary with canonical rule ID cross-links — not a divergent standard. Updated INTEGRATION.md and agent templates to default to Level 1 context.
* **v1.6.0 (2026-09-09):** P2 capability expansion. Added Layer 9 Security & Privacy. Added error, empty-state, loading-state, notification, and search taxonomies (§2.5–2.10). Added forms contract (§2.11), i18n/localization with logical layout properties (§2.8), data density standards (§3.3), and browser permissions UX (§5.5). Expanded Layer 0 matrix, Layer 7 rule IDs, and Layer 8 security CI alignment.
* **v1.5.1 (2026-09-09):** Corrections and clarifications to v1.5.0. Added normative vocabulary (MUST/SHOULD/MAY) and exception governance. Made Layer 4 framework-neutral with universal reference architecture and separate framework adapters. Split lab vs. field performance; corrected Core Web Vitals table (TTFB as supporting metric); field INP as SLO not CI gate. Fixed WCAG 2.3.3 AAA classification, focus trapping semantics, target size exceptions, accessible name computation, destructive action models, and metadata archetype awareness. Added stale data, network failure, conflict, idempotency, and offline state definitions. Expanded Layer 7 with rule IDs, severity, applicability, and autofix safety. Expanded Layer 8 with blocking/warning/observation gates, security CI, visual regression, and cross-browser testing.
* **v1.5.0 (2026-09-08):** Added Layer 1 functional micro-animations contract (allowlist, deny list, ≤300 ms cap, compositor-safe properties). Introduced motion duration/easing tokens in Layer 3 and matching Layer 7 agent enforcement rules.
* **v1.4.0 (2026-09-07):** Integrated Server-Driven UI & Partial Hydration standards (RSC, Streaming Suspense skeletons, Server Actions states). Replaced viewport media queries with CSS Container Queries (`@container`) for component tokens. Adopted native View Transitions API (`document.startViewTransition`) for page routes. Added ESLint rules for container queries and RSC Suspense boundaries.
* **v1.3.0 (2026-09-07):** Added Layer 0: Applicability & Scope page-archetype matrix. Fixed token contrast issues and status token split. Added WCAG 2.2 criteria, optimistic UI reversibility rule, logical properties, and field vs. lab metric definitions.
* **v1.2.0 (2026-09-07):** Re-architected into 8-Layer Framework. Adjusted WCAG targets to 2.2 AA mandatory, redefined 16ms rule to visual acknowledgment, added async state machines and Product IA standards.
* **v1.1.0 (2026-09-07):** Introduced 3-tier token architecture, motion, optimistic UI, mobile ergonomics, and AI enforcement guardrails.
* **v1.0.0 (2026-09-07):** Initial base HIG release.
