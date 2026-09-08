# Modern Web HIG & Product Engine Contract — v1.5.0

## Executive Summary

The Modern Web Human Interface Guidelines (HIG) v1.5.0 define design principles, information architecture, state machines, interaction rules, accessibility standards, and programmatic execution constraints for modern web applications, content, commerce, and server-driven web platforms.

This release upgrades the contract to v1.5.0 by incorporating modern architecture paradigms:

1. **Functional Micro-Animations (Layer 1):** Constrains micro-motion to user-triggered feedback with duration tokens, compositor-safe properties, and a decorative deny list — preserving INP and reduced-motion guarantees.
2. **Server-Driven UI & Partial Hydration Architecture (Layer 4):** Standardizes Server Components (RSC), streaming boundary skeletons, and Server Actions state handling.
3. **Container-First Responsive Systems (Layer 3):** Shifts component tokens and layout rules from viewport media queries (`@media`) to CSS Container Queries (`@container`).
4. **Native View Transitions API (Layer 1):** Defines standards for multi-page and client-side page route animations without heavy JS animation frameworks.

This contract is organized into a **9-Layer Governance Framework**:

* **Layer 0: Applicability & Scope** — Page archetypes and which layers are mandatory per archetype.


* **Layer 1: UX Principles** — Ergonomic, spatial, motion, functional micro-animations, reduced-motion, and View Transitions guidelines.


* **Layer 2: Information Architecture & Product Standards** — Hierarchy, document fundamentals, progressive disclosure, empty states, onboarding, i18n/RTL.


* **Layer 3: Visual, Design Token System & Container Engine** — Typography, contrast-verified color scales, container queries, fluid layouts, and three-tier token architecture.


* **Layer 4: Interaction, State Architecture, Server Actions & Data Protection** — Formal state machines, RSC/streaming boundaries, optimistic UI, data persistence, and friction models.


* **Layer 5: Accessibility (a11y) & Keyboard Navigation** — Full WCAG 2.2 AA criteria, focus management, target sizes, and touch targets.


* **Layer 6: Performance & Web Vitals** — Field vs. lab metrics, current Core Web Vitals, and budget thresholds.


* **Layer 7: AI & Agent Enforcement Contract** — Deterministic logic, linting rules, and system-prompt contracts for AI coding agents.


* **Layer 8: Quality Assurance & CI/CD Gates** — Automated build-failure standards and performance budgets.



---

## Layer 0: Applicability & Scope

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
| Layer 4 Global state machine & RSC Streaming | ⚪ | ✅ (dynamic views) | ✅ | ✅ |
| Layer 4 Optimistic mutation / Server Action model | ❌ | ⚪ (cart only) | ✅ | ⚪ |
| Layer 4 RBAC visibility guardrails | ❌ | ⚪ | ✅ | ✅ |
| Layer 5 WCAG 2.2 AA | ✅ | ✅ | ✅ | ✅ |
| Layer 6 Core Web Vitals | ✅ | ✅ | ✅ | ✅ |

Legend: ✅ Mandatory · ⚪ Conditional (apply where the feature exists) · ❌ Not applicable.

Accessibility (Layer 5), tokens/typography (Layer 3), and Web Vitals (Layer 6) are **universal** and never optional.

---

## Layer 1: Universal UX Principles

### 1.1 Direct Manipulation & Motion Ergonomics

* **Spatial Origin:** UI elements must originate from their logical trigger point (modals expand out from the clicked button; slide-overs anchor to the active edge).


* **Physics-Based Curves:** Use non-linear cubic-bezier momentum curves (`cubic-bezier(0.16, 1, 0.3, 1)`) rather than linear or basic `ease-in-out` transitions. Never animate `transition: all` — enumerate the specific properties being animated.


* **Input Feedback Threshold:** Every user interaction must produce an immediate local visual acknowledgement (hover, active press state, focus ring, or pending loader) without waiting for asynchronous network I/O. Prefer functional micro-animations (§1.4) over instant jumps when motion is allowed.



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

* **Rule:** Never apply `view-transition-name` dynamically to more than one visible element simultaneously to avoid layout engine animation collisions.

### 1.3 Reduced Motion (WCAG 2.3.3)

Motion is an enhancement, never a dependency. Respect `prefers-reduced-motion: reduce`:

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

Micro-animations are **functional feedback only** — never decorative flourish. They exist to acknowledge input, clarify state change, or communicate progress. Brand personality may live in timing tokens and easing, not in idle ornament.

#### Allowlist (required when the control exists)

| Interaction | Duration token | Typical duration | Notes |
| --- | --- | --- | --- |
| Hover / focus affordance | `--duration-fast` | 100–150 ms | Must not block pointer travel across dense controls |
| Press / active acknowledgment | `--duration-fast` | 100–150 ms | Tied to Input Feedback Threshold (§1.1) |
| Toggle / checkbox / switch | `--duration-base` | 150–200 ms | Show the state transition clearly |
| Inline validation appear/dismiss | `--duration-base` | 150–200 ms | Prefer opacity; avoid layout shift |
| Pending / loading indicator | continuous only while pending | — | Must stop immediately when settled |
| Toast / snackbar enter | `--duration-slow` | 200–250 ms | Exit faster than enter (`--duration-base`) |
| Modal / overlay open | `--duration-slow` | 200–250 ms | Close at `--duration-base` (150–200 ms) |

#### Deny list

* Decorative loops, idle wiggles, continuous brand ornaments, and autoplay attention-grabbers.
* Parallax, scroll-jacking, and large-field oscillations.
* Micro-animations longer than **300 ms** (sluggish; harms perceived responsiveness and INP budgets).
* JS main-thread animation libraries for micro-feedback when CSS transitions/animations suffice.
* Animating layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`, `border-width`) for micro-feedback.

#### Implementation rules

* **Compositor-safe properties only:** animate `transform` and `opacity`. This keeps micro-motion off the layout/paint path and protects Layer 6 INP gates.
* **Tokenized timing:** reference Layer 3 motion tokens (`--duration-*`, `--ease-out-momentum`) — do not invent per-component millisecond values.
* **CSS-first:** prefer CSS transitions/animations over `requestAnimationFrame` or JS tween libraries for allowlisted micro-feedback.
* **Reduced motion:** §1.3 still applies — under `prefers-reduced-motion: reduce`, replace spatial micro-motion with instant state changes or a minimal opacity fade.
* **One job:** a micro-animation must communicate exactly one of: affordance, acknowledgment, state change, or progress. If removing it loses no information and no feedback, it belongs on the deny list.



---

## Layer 2: Information Architecture & Product Standards

### 2.1 Document Fundamentals (Universal)

Every page, regardless of archetype, must ship these:

* **Language:** `<html lang="…">` set correctly (and `dir` where relevant).


* **Landmarks:** Exactly one `<main>`, plus `<header>`, `<nav>`, `<footer>` as appropriate. Interactive elements use native semantics (`<button>`, `<a>`), never `<div onClick>`.


* **Title & metadata:** A unique, descriptive `<title>`; a meta description; a canonical URL where duplication is possible.


* **Social/structured data:** Open Graph/Twitter tags for shareable pages; JSON-LD structured data (`Article`, `Product`, `BreadcrumbList`, `Organization`) where the archetype warrants it (Content/Commerce).


* **Responsive images (CLS-safe):** Every `<img>` declares intrinsic `width`/`height` or an `aspect-ratio`; use `srcset`/`sizes` for resolution switching; `loading="lazy"` below the fold, eager for the LCP image; `fetchpriority="high"` on the LCP image.


* **Fonts:** `font-display: swap` (or `optional`), preloaded and subset to prevent invisible-text and layout shift.



### 2.2 Container-Aware Component Layouts

* **Primary Content Prominence:** Primary tasks and core operational data occupy the reading-order start — the **block-start / inline-start** region (top-left on LTR, top-right on RTL).


* **3-Click Navigation Depth:** Any core feature or document must be reachable within a maximum of 3 navigation clicks, or via the global command palette.


* **Progressive Disclosure:** Complex settings, deep parameters, and secondary metadata are deferred to expandable accordions, secondary tabs, or drill-down slide-over sheets.



### 2.3 Navigation Architecture, Command Palette & Deep-Linking

* **URL as Single Source of Truth:** Every distinct layout view, active tab, page filter, search query, and pagination offset must be bidirectionally synced with URL query parameters (e.g., `/orders?status=shipped&page=2&sort=date_desc`).


* **Command Palette:** A global command palette by the `Cmd/Ctrl+K` convention is permitted as a documented exception to Layer 5's conflict rule. It must activate only when the document has focus and no input is capturing text, must never be the sole path to a feature, and must provide a visible trigger button.


* **Unsaved Changes & Data-Loss Protection** (Commerce/App/Auth):
* Track form dirty state dynamically.


* Use SPA route guards or framework navigation blockers as primary interception.


* Use `beforeunload` as a secondary backstop for tab close / external reload.


* Implement `localStorage`/`IndexedDB` auto-save drafts for multi-step forms.





### 2.4 Destructive Actions & Permission Guardrails

* **Role-Based Visibility** (App/Auth): Hide or explicitly disable actions that exceed a user's RBAC permissions. If disabled due to permissions, explain required administrative privileges on focus/hover.


* **Destructive Flow Friction:** Irreversible operations require an intentional multi-step modal with explicit confirmation input (typing the resource name or `DELETE`).


* **Undo over optimism for destruction:** Destructive actions are **not** eligible for optimistic UI. Use an **optimistic-remove-with-undo** pattern: hide the row immediately, hold the commit for a 5–10s undo window surfaced in a toast, and only then finalize.



---

## Layer 3: Visual, Design Token System & Container Engine

### 3.1 Design Token Architecture

Tokens follow a **true three-tier structure**: **Global (Raw) → Semantic → Component**. Raw scale values live in Tier 1 as primitives; components consume Tier 3, which maps to Tier 2. All tokens are contrast-verified.

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

  --size-radius-sm: 6px;
  --size-radius-md: 10px;
  --size-radius-lg: 16px;
  --size-measure-max: 75ch;

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

@media (prefers-color-scheme: dark) {
  :root {
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

```

### 3.2 Container Queries Engine

Reusable UI components (cards, tables, form groups) must respond to their immediate parent container width rather than the screen viewport.

```css
/* Container declaration */
.component-container {
  container-type: inline-size;
  container-name: card-grid;
}

/* Container-aware component layouts */
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

* **Rule:** Do not use `@media` queries for internal component styling. Media queries are restricted to root layout grids, navigation bars, and page-level structural wrappers.

---

## Layer 4: Interaction, State Architecture, Server Actions & Data Protection

### 4.1 Server-Driven UI & Hydration Boundaries (RSC Architecture)

In modern hybrid web applications (Next.js App Router, Remix, Nuxt, Astro), data fetching and rendering must strictly separate Server Components from Client Components.

```
[Incoming Request]
        │
        ▼
[Server Component (RSC)] ──(Stream HTML + Skeleton)──> [Client Viewport]
        │                                                     │
        ├── Fetch async data on server                         │ (Hydrate Interactive Islands)
        └── Render static HTML & UI boundaries                 ▼
                                                   [Client Island Hydrated]

```

**RSC Standards:**

1. **Server First:** Components are React Server Components (or server-rendered framework equivalents) by default. Add `'use client'` only when attaching state, browser event listeners (`onClick`), or lifecycle effects.
2. **Streaming Suspense Boundaries:** Every async Server Component fetching data must be wrapped in a `<Suspense>` boundary displaying an explicit layout-matching skeleton state to eliminate TTFB bottlenecks and avoid CLS.

### 4.2 Async Mutation & Server Action State Model

Server Action and Server-driven mutations must follow an explicit status wrapper:

```
[idle] ──> [submitting / pending] ──> [optimistic_render] ──┬──> [confirmed / revalidated]
                                                             │
                                                             └──> [failed] ──> [rollback + toast_retry]

```

* **Server Action Form States:** Forms executing Server Actions must handle native pending states (`useActionState` / `useFormStatus`) and supply immediate visual feedback (disabling submit triggers, displaying pending spinners) without waiting for server response round-trips.
* **Optimistic Eligibility:** Optimistic rendering via Server Action hooks (`useOptimistic`) is allowed **only for low-consequence, reversible mutations** (toggles, likes, cart item counts).

---

## Layer 5: Accessibility (a11y) & Keyboard Navigation

### 5.1 Standards Baseline

* **Conformance:** WCAG 2.2 Level AA is the mandatory minimum across all public and internal interfaces. AAA is targeted where practical.


* **Text Contrast:** Standard text ≥4.5:1; large text (≥24px, or ≥18.66px bold) ≥3:1. Non-text UI (icons, borders, focus indicators, status fills) ≥3:1.



### 5.2 Keyboard Focus & Shortcuts

* **Visible Focus Indicator:** All interactive controls display an explicit, high-contrast indicator (`outline: 3px solid var(--focus-ring); outline-offset: 2px;`). Never `outline: none` without a custom equivalent.


* **Focus Trapping:** Active modals and slide-overs trap Tab within the overlay (`aria-modal="true"`).


* **Focus Restoration:** Closing a dialog/popover returns focus to the originating trigger.


* **Skip Links:** Provide a "Skip to main content" link as the first tabbable element.



---

## Layer 6: Performance & Web Vitals

| Core Web Vital | Excellent | Good | CI Gate Failure |
| --- | --- | --- | --- |
| Interaction to Next Paint (INP) | ≤ 100 ms | ≤ 200 ms | > 200 ms |
| Largest Contentful Paint (LCP) | ≤ 1.2 s | ≤ 2.5 s | > 2.5 s |
| Cumulative Layout Shift (CLS) | ≤ 0.02 | ≤ 0.10 | > 0.10 |
| Time to First Byte (TTFB) | ≤ 200 ms | ≤ 800 ms | > 800 ms |

---

## Layer 7: AI & Agent Enforcement Contract

Deterministic, machine-readable rules for system prompts, AI coding workflows (Cursor, Claude Code, GitHub Copilot), and automated analysis.

**Product-repo adoption:** see [INTEGRATION.md](./INTEGRATION.md) for an efficient workflow (pin the contract → archetype map → thin agent rules → PR checklist → CI). Copy-paste templates live in [examples/agent-rules/](./examples/agent-rules/).

### 7.1 AI Coding Agent Guardrails

```yaml
agent_enforcement_rules:
  scope:
    resolve_archetype_first: true            # content | commerce | application | auth
    apply_layer0_matrix: true

  styling_constraints:
    disallow_raw_hex_colors_outside_token_files: true
    require_semantic_or_component_tokens: true
    prohibit_transition_all: true            # ban `transition: all`
    require_cubic_bezier_curves: true
    require_motion_duration_tokens: true     # use --duration-* / --motion-duration-*
    prohibit_decorative_micro_animations: true
    micro_animation_max_ms: 300
    animate_compositor_properties_only: true # transform + opacity for micro-feedback
    require_container_queries_for_components: true # enforce @container over @media inside components
    require_logical_properties: true         # margin-inline, inset-inline-start
    require_reduced_motion_media_query: true

  rsc_and_server_action_constraints:
    default_to_server_components: true      # do not add 'use client' unless state/effects required
    require_suspense_skeletons_for_async_rsc: true
    require_form_pending_states_on_server_actions: true

  accessibility_constraints:
    target_standard: "WCAG 2.2 AA"
    require_aria_labels_on_icon_buttons: true
    require_alt_text_on_images: true
    enforce_semantic_html: true
    require_visible_focus_styles: true
    min_target_size_px: 24

```

### 7.2 Programmatic Linter Specifications

**ESLint (`eslint-plugin-hig`):**

* `hig/enforce-container-queries` *(new in v1.4)* — flags `@media` usage inside component CSS files/styled-components where parent width checks should use `@container`.
* `hig/rsc-suspense-boundary` *(new in v1.4)* — verifies that async Server Components are wrapped in a framework `<Suspense>` boundary with a fallback skeleton.
* `hig/no-unlabeled-icon-buttons` — flags any `<button>` containing only an icon without an `aria-label`.
* `hig/micro-animation-budget` *(new in v1.5)* — flags transition/animation durations above 300 ms on allowlisted micro-feedback selectors, and flags non-`transform`/`opacity` properties in micro-animation declarations.


* `hig/no-optimistic-destructive` — errors when a delete/remove mutation is wrapped in optimistic rendering without an undo window.



---

## Layer 8: Quality Assurance & CI/CD Gates

```
[Developer Git Push / PR Created]
               │
               ▼
   [Automated CI/CD Pipeline]
               │
               ├── 0. Resolve archetype & load Layer 0 matrix
               │
               ├── 1. Static Analysis (ESLint + Stylelint + HIG Plugin)
               │      ├── Container Query Validation
               │      └── RSC / Client Component Boundaries
               │
               ├── 2. Accessibility Audit (Axe-core / Playwright a11y, WCAG 2.2 AA)
               │
               ├── 3. Synthetic Core Web Vitals Audit (lab)
               │      ├── INP  > 200ms ───> ❌ FAIL BUILD
               │      ├── LCP  > 2.5s ────> ❌ FAIL BUILD
               │      ├── CLS  > 0.10 ────> ❌ FAIL BUILD
               │      └── TTFB > 800ms ───> ❌ FAIL BUILD
               │
               └── 4. All Gates Passed ─────────────────────────────────> ✅ BUILD APPROVED

```

---

### 8.1 Version History

Expanded release notes for each version: **[RELEASE_NOTES.md](./RELEASE_NOTES.md)**.

* **v1.5.0 (2026-09-08):** Added Layer 1 functional micro-animations contract (allowlist, deny list, ≤300 ms cap, compositor-safe properties). Introduced motion duration/easing tokens in Layer 3 and matching Layer 7 agent enforcement rules.
* **v1.4.0 (2026-09-07):** Integrated Server-Driven UI & Partial Hydration standards (RSC, Streaming Suspense skeletons, Server Actions states). Replaced viewport media queries with CSS Container Queries (`@container`) for component tokens. Adopted native View Transitions API (`document.startViewTransition`) for page routes. Added ESLint rules for container queries and RSC Suspense boundaries.
* **v1.3.0 (2026-09-07):** Added Layer 0: Applicability & Scope page-archetype matrix. Fixed token contrast issues and status token split. Added WCAG 2.2 criteria, optimistic UI reversibility rule, logical properties, and field vs. lab metric definitions.


* **v1.2.0 (2026-09-07):** Re-architected into 8-Layer Framework. Adjusted WCAG targets to 2.2 AA mandatory, redefined 16ms rule to visual acknowledgment, added async state machines and Product IA standards.


* **v1.1.0 (2026-09-07):** Introduced 3-tier token architecture, motion, optimistic UI, mobile ergonomics, and AI enforcement guardrails.


* **v1.0.0 (2026-09-07):** Initial base HIG release.