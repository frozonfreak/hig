# Modern Web HIG & Product Engine Contract — v1.3.0

## Executive Summary

The Modern Web Human Interface Guidelines (HIG) v1.3.0 define design principles, information architecture, state machines, interaction rules, accessibility standards, and programmatic execution constraints for modern web applications **and** content/marketing/commerce sites.

This release makes the contract genuinely *universal*: it introduces an explicit **scope model** so that app-only rules (state machines, optimistic UI, RBAC) are no longer wrongly imposed on marketing pages, adds the document-level fundamentals every web page needs, brings accessibility in line with the full WCAG 2.2 AA criteria set, corrects design tokens that failed their own contrast gate, and resolves the internal contradictions present in v1.2.0.

This contract is organized into a **9-Layer Governance Framework**:

- **Layer 0: Applicability & Scope** — Page archetypes and which layers are mandatory per archetype.
- **Layer 1: UX Principles** — Ergonomic, spatial, motion, and reduced-motion guidelines.
- **Layer 2: Information Architecture & Product Standards** — Hierarchy, document fundamentals, progressive disclosure, empty states, onboarding, i18n/RTL.
- **Layer 3: Visual & Design Token System** — Typography, contrast-verified color scales, responsive fluid layouts, and a true three-tier token system.
- **Layer 4: Interaction, State Architecture & Data Protection** — Formal state machines, optimistic UI (with a reversibility rule), data persistence, and friction models.
- **Layer 5: Accessibility (a11y) & Keyboard Navigation** — Full WCAG 2.2 AA criteria, focus management, target sizes, and touch targets.
- **Layer 6: Performance & Web Vitals** — Field vs. lab metrics, current Core Web Vitals, and budget thresholds.
- **Layer 7: AI & Agent Enforcement Contract** — Deterministic logic, linting rules, and system-prompt contracts for AI coding agents.
- **Layer 8: Quality Assurance & CI/CD Gates** — Automated build-failure standards and performance budgets.

---

## Layer 0: Applicability & Scope

Not every rule applies to every page. A blog post does not need an async mutation state machine; a dashboard does. This layer defines page archetypes and the mandatory/optional matrix so that both humans and AI agents apply the correct subset.

### 0.1 Page Archetypes

- **Content / Marketing** — Landing pages, blogs, docs, campaign pages. Read-mostly, SEO-critical, often server-rendered.
- **Commerce** — Product listings, PDPs, cart, checkout. Mixed read/write, conversion-critical, payment-sensitive.
- **Application / Dashboard** — Authenticated tools, admin panels, data workflows. Write-heavy, state-heavy, RBAC-governed.
- **Auth / Account** — Sign-in, sign-up, recovery, settings. Security- and privacy-sensitive.

### 0.2 Applicability Matrix

| Capability | Content/Marketing | Commerce | Application | Auth/Account |
|---|---|---|---|---|
| Layer 1 UX & motion | ✅ | ✅ | ✅ | ✅ |
| Layer 2 Document fundamentals (lang, landmarks, metadata) | ✅ | ✅ | ✅ | ✅ |
| Layer 2 SEO / structured data | ✅ | ✅ | ⚪ Optional | ⚪ |
| Layer 2 URL-as-state sync | ⚪ (filters if present) | ✅ (facets/pagination) | ✅ | ⚪ |
| Layer 2 Unsaved-changes protection | ⚪ | ✅ (checkout) | ✅ | ✅ (settings) |
| Layer 3 Tokens & typography | ✅ | ✅ | ✅ | ✅ |
| Layer 4 Global state machine | ⚪ | ✅ (dynamic views) | ✅ | ✅ |
| Layer 4 Optimistic mutation model | ❌ | ⚪ (cart only) | ✅ | ⚪ |
| Layer 4 RBAC visibility guardrails | ❌ | ⚪ | ✅ | ✅ |
| Layer 5 WCAG 2.2 AA | ✅ | ✅ | ✅ | ✅ |
| Layer 6 Core Web Vitals | ✅ | ✅ | ✅ | ✅ |

Legend: ✅ Mandatory · ⚪ Conditional (apply where the feature exists) · ❌ Not applicable.

Accessibility (Layer 5), tokens/typography (Layer 3), and Web Vitals (Layer 6) are **universal** and never optional.

---

## Layer 1: Universal UX Principles

### 1.1 Direct Manipulation & Motion Ergonomics

- **Spatial Origin:** UI elements must originate from their logical trigger point (modals expand out from the clicked button; slide-overs anchor to the active edge).
- **Physics-Based Curves:** Use non-linear cubic-bezier momentum curves (`cubic-bezier(0.16, 1, 0.3, 1)`) rather than linear or basic `ease-in-out` transitions. Never animate `transition: all` — enumerate the specific properties being animated (see Layer 7).
- **Input Feedback Threshold:** Every user interaction must produce an immediate local visual acknowledgement (hover, active press state, focus ring, or pending loader) without waiting for asynchronous network I/O.

### 1.2 Reduced Motion (WCAG 2.3.3)

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
}
```

- Replace transform/momentum animations with instant state changes or a minimal opacity fade.
- Disable parallax, auto-playing carousels, and decorative looping motion.
- Retain essential, non-decorative feedback (e.g., a spinner) but remove the flourish.

### 1.3 Purposeful Density & Hierarchy

- **Fluid Grid Engine:** Viewports from 320px to 3840px+ must render cleanly without unintended horizontal scrollbars, using CSS Grid and Flexbox with **logical properties** (see 2.6).
- **Density Scaling:** Support **Comfortable** density (min 44×44px touch targets) for touch devices and **Compact** density (min 32×32px cursor targets, never below the 24×24px WCAG 2.5.8 floor) for data-dense desktop workflows.
- **Friction-Matched Intention:** Low-consequence actions remain frictionless. Irreversible or high-consequence operations require intentional physical friction (see 2.4).

---

## Layer 2: Information Architecture & Product Standards

### 2.1 Document Fundamentals (Universal)

Every page, regardless of archetype, must ship these:

- **Language:** `<html lang="…">` set correctly (and `dir` where relevant, see 2.6).
- **Landmarks:** Exactly one `<main>`, plus `<header>`, `<nav>`, `<footer>` as appropriate. Interactive elements use native semantics (`<button>`, `<a>`), never `<div onClick>`.
- **Title & metadata:** A unique, descriptive `<title>`; a meta description; a canonical URL where duplication is possible.
- **Social/structured data:** Open Graph/Twitter tags for shareable pages; JSON-LD structured data (`Article`, `Product`, `BreadcrumbList`, `Organization`) where the archetype warrants it (Content/Commerce).
- **Responsive images (CLS-safe):** Every `<img>` declares intrinsic `width`/`height` or an `aspect-ratio`; use `srcset`/`sizes` for resolution switching; `loading="lazy"` below the fold, eager for the LCP image; `fetchpriority="high"` on the LCP image.
- **Fonts:** `font-display: swap` (or `optional`), preloaded and subset to prevent invisible-text and layout shift.

### 2.2 Information Hierarchy & Progressive Disclosure

- **Primary Content Prominence:** Primary tasks and core operational data occupy the reading-order start — the **block-start / inline-start** region (top-left on LTR, top-right on RTL). Secondary controls stay contextual or hidden until requested.
- **3-Click Navigation Depth:** Any core feature or document must be reachable within a maximum of 3 navigation clicks, or via the global command palette (see 2.3).
- **Progressive Disclosure:** Complex settings, deep parameters, and secondary metadata are deferred to expandable accordions, secondary tabs, or drill-down slide-over sheets.

### 2.3 Navigation Architecture, Command Palette & Deep-Linking

- **URL as Single Source of Truth:** Every distinct layout view, active tab, page filter, search query, and pagination offset must be bidirectionally synced with URL query parameters (e.g., `/orders?status=shipped&page=2&sort=date_desc`). Applies wherever such controls exist.
- **Command Palette (documented shortcut exception):** A global command palette by the `Cmd/Ctrl+K` convention is permitted **as a documented exception** to 5.5's conflict rule. Because `Cmd+K` shadows a native browser binding, it must:
  1. Activate **only when the app has document focus** and no text input is capturing the keystroke.
  2. **Never be the sole path** to a feature — provide a visible trigger button and the 3-click route.
  3. Offer a non-shadowing fallback (e.g., `/`) where feasible.
- **Unsaved Changes & Data-Loss Protection** (Commerce/App/Auth):
  - Track form dirty state dynamically.
  - Use SPA **route guards** as the *primary* interception for client-side navigation, presenting a clear confirmation dialog ("You have unsaved changes. Are you sure you want to leave?").
  - Use `beforeunload` only as a **backstop** for tab close / external reload. Note: modern browsers show a fixed, non-customizable string and mobile Safari fires it unreliably — do not depend on it.
  - Implement `localStorage`/`IndexedDB` auto-save drafts as the real safety net (see 2.5 for privacy constraints).

### 2.4 Destructive Actions & Permission Guardrails

- **Role-Based Visibility** (App/Auth): Hide or explicitly disable actions that exceed a user's RBAC permissions. If disabled due to permissions, explain the required administrative privileges on focus/hover.
- **Destructive Flow Friction:** Irreversible operations (deleting a database, deleting an account) require an intentional multi-step modal with explicit confirmation input (typing the resource name or the keyword `DELETE`).
- **Undo over optimism for destruction:** Destructive actions are **not** eligible for optimistic UI (see 4.2). Where a list deletion should feel instant, use an **optimistic-remove-with-undo** pattern: hide the row immediately, hold the commit for a 5–10s undo window surfaced in a toast, and only then finalize.

### 2.5 Onboarding, First-Run & Empty States

- **First-Run Experience:** New users or fresh workspaces must never display a blank canvas. Provide interactive sample data, setup checklists, or guided template cards.
- **Actionable Zero-States:** Search filters, empty tables, and blank lists must display an explicit statement of *why* the view is empty **and** a single-click remediation action (e.g., "Clear all search filters", "Create your first document", "Import sample data").
- **Draft privacy:** Auto-saved drafts must not persist secrets (passwords, payment data, tokens) or unnecessary PII in `localStorage`/`IndexedDB`. Scope drafts per authenticated user, and clear them on submit and on logout.

### 2.6 Internationalization & RTL

- **Logical properties everywhere:** Use `margin-inline`, `padding-block`, `inset-inline-start`, `text-align: start`, etc., instead of physical `left`/`right`. This is what makes the "inline-start primacy" rule in 2.2 hold under RTL.
- **Direction:** Support `dir="rtl"`; mirror directional icons and flows.
- **Locale formatting:** Format dates, numbers, and currency via `Intl` APIs, never string concatenation.
- **Text expansion:** Allow ~30% string-length expansion without truncation or overlap; avoid concatenated/interpolated sentence fragments that break translation.

---

## Layer 3: Visual & Design Token System

### 3.1 Design Token Architecture

Tokens follow a **true three-tier structure**: **Global (Raw) → Semantic → Component**. Raw scale values (radius, measure, spacing) live in Tier 1 as primitives; components consume Tier 3, which maps to Tier 2.

All color tokens below are **contrast-verified** against their intended surface. Text tokens meet ≥4.5:1; non-text UI (focus rings, borders, status fills) meet ≥3:1.

```css
:root {
  /* ── Tier 1: Global Primitive Tokens (raw values; hex allowed here only) ── */
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

  /* Raw scale primitives */
  --size-radius-sm: 6px;
  --size-radius-md: 10px;
  --size-radius-lg: 16px;
  --size-measure-max: 75ch; /* optimum reading measure */

  /* ── Tier 2: Semantic Tokens (Light Baseline) ── */
  --surface-base: #ffffff;
  --surface-raised: var(--pr-slate-100);
  --surface-overlay: rgba(255, 255, 255, 0.90);

  --text-primary: var(--pr-slate-900);   /* ~16:1 on base */
  --text-secondary: var(--pr-slate-600); /* ~7.5:1 on base */
  --text-muted: var(--pr-slate-500);     /* ~4.8:1 on base — was slate-400 (2.6:1, FAIL) */

  --brand-primary: var(--pr-blue-500);
  --brand-hover: var(--pr-blue-600);
  --focus-ring: var(--pr-blue-600);      /* ~5.2:1 on base — was blue-400 (2.5:1, FAIL <3:1) */

  /* Status: fill/icon variants (≥3:1) */
  --status-success: var(--pr-emerald-500);
  --status-warning: var(--pr-amber-500);
  --status-danger:  var(--pr-red-600);

  /* Status: text variants for use as body text (≥4.5:1 on base) */
  --status-success-text: var(--pr-emerald-700);
  --status-warning-text: var(--pr-amber-700);
  --status-danger-text:  var(--pr-red-700);

  /* Semantic scale aliases */
  --radius-sm: var(--size-radius-sm);
  --radius-md: var(--size-radius-md);
  --radius-lg: var(--size-radius-lg);
  --line-measure-max: var(--size-measure-max);

  /* ── Tier 3: Component Tokens (map to semantic) ── */
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
    --text-muted: var(--pr-slate-400);   /* ~6.4:1 on dark base — slate-500 would be 3.8:1 (FAIL) */

    --brand-primary: #3b82f6;
    --brand-hover: #60a5fa;
    --focus-ring: #60a5fa;                /* high contrast on dark base */

    --status-success: #34d399;
    --status-warning: #fbbf24;
    --status-danger:  #f87171;

    --status-success-text: #34d399;
    --status-warning-text: #fbbf24;
    --status-danger-text:  #f87171;
  }
}
```

> **Contrast corrections from v1.2.0.** `--text-muted` swapped per theme (slate-500 light / slate-400 dark) so muted text passes 4.5:1 on both surfaces. `--focus-ring` moved to blue-600 (light) to clear the 3:1 non-text minimum. Status colors split into fill (≥3:1) and text (≥4.5:1) variants so they can never be used as failing body text.

### 3.2 Responsive Typography System

| Role | Weight | Line Height | Tracking | Measure / Constraints |
|---|---|---|---|---|
| Display L1 | 700 | 1.1 | -0.025em | Max 2 lines; fluid `clamp(2.25rem, 5vw, 3.5rem)` |
| Heading L2 | 600 | 1.25 | -0.015em | Fluid `clamp(1.5rem, 3vw, 2.25rem)` |
| Heading L3 | 600 | 1.3 | -0.010em | Fluid `clamp(1.25rem, 2vw, 1.5rem)` |
| Body (Default) | 400 | 1.5 | 0 | Max line length 45–75ch (`max-width: 75ch`) |
| Body (Medium) | 500 | 1.5 | 0 | Form labels, table headers |
| Caption / Small | 400 | 1.4 | +0.010em | Helper text, metadata captions |
| **Form inputs (mobile)** | 400 | 1.4 | 0 | **`font-size: 16px` minimum** to prevent iOS auto-zoom on focus |

---

## Layer 4: Interaction, State Architecture & Data Protection

### 4.1 Global Application State Machine

Applies to dynamic, data-driven views (Commerce/App/Auth). Applications must explicitly model view states to avoid ambiguous transitions.

```
                   ┌────────────────────────────────────────┐
                   │                                        │
                   ▼                                        │
[idle] ──> [loading] ──┬──> [success] ──> [stale] ──────────┼──> [retrying]
                       │                                    │
                       ├──> [empty]                         │
                       │                                    │
                       └──> [error] ──> [offline_degraded] ─┘
```

**State Behavior Standards:**

- `idle`: Neutral baseline ready for user input.
- `loading`: Fetch in progress. Render skeletons matching expected content dimensions (protects CLS).
- `success`: Data present and rendered.
- `empty`: Zero items returned. Display zero-state remediation UI (2.5).
- `error`: Action failed. Provide a clear human-readable error, preserve form inputs, and supply an actionable retry without a full page reload.
- `stale`: Showing cached data while background revalidation occurs.
- `offline_degraded`: Connection lost. Retain local cached state; mark write actions as queued.

### 4.2 Async Mutation State Model

```
[idle] ──> [submitting] ──> [optimistic_render] ──┬──> [confirmed]
                                                  │
                                                  └──> [failed] ──> [rollback + toast_retry]
```

- **Eligibility rule (new):** Optimistic UI is permitted **only for low-consequence, reversible mutations** — toggles, bookmarks, reordering, inline edits, cart quantity. **Irreversible/destructive mutations are ineligible** and follow 2.4 (explicit confirmation, or optimistic-remove-with-undo grace window).
- **Optimistic UI:** For eligible mutations, reflect state changes instantly before network resolution.
- **Rollback Guarantee:** On failure, revert to pre-mutation state using standard micro-motion, and spawn an alert/toast with an explicit **Retry** action.

### 4.3 Notification & Toast Life-cycle

- **Desktop placement:** Bottom-right overlay (`inset-block-end: 24px; inset-inline-end: 24px;`).
- **Mobile placement:** Top-center banner.
- **Accessibility:** Informational/success toasts announce via `aria-live="polite"`; errors and actionable toasts use `role="alert"` (assertive). Never rely on color alone to convey status.
- **Duration:** Success/informational auto-dismiss after 4,000ms; warning/error/actionable require manual dismissal or direct action.
- **Queue cap:** Max 3 visible toasts; extras collapse into a counter.

### 4.4 Form Ergonomics & Action Buttons

- **Action Dominance:** Each context features one clearly dominant primary action, unless the task inherently requires equivalent actions (Cancel vs. Save, Back vs. Continue).
- **Disabled Actions:** Avoid generic disabled buttons with hidden tooltips. Keep actions interactive and surface inline field-level validation on click/submit. Use disabled states only when an action is structurally invalid or unavailable for the current role.
- **Inline Validation Timing:** Validate on blur or submit. Never apply error styling while a user is actively typing in a fresh, unvisited input.
- **Redundant Entry (WCAG 3.3.7):** Do not re-ask for information already provided earlier in a multi-step process — carry it forward or offer it for reuse.

---

## Layer 5: Accessibility (a11y) & Keyboard Navigation

### 5.1 Standards Baseline

- **Conformance:** WCAG 2.2 Level AA is the mandatory minimum across all public and internal interfaces. AAA is targeted where practical.
- **Text Contrast:** Standard text ≥4.5:1; large text (≥24px, or ≥18.66px bold) ≥3:1. Non-text UI (icons, borders, focus indicators, status fills) ≥3:1 (1.4.11).

### 5.2 Keyboard Focus & Shortcuts

- **Visible Focus Indicator:** All interactive controls display an explicit, high-contrast indicator (`outline: 3px solid var(--focus-ring); outline-offset: 2px;`). Never `outline: none` without a custom equivalent.
- **Focus Trapping:** Active modals and slide-overs trap Tab within the overlay (`aria-modal="true"`).
- **Focus Restoration:** Closing a dialog/popover returns focus to the originating trigger.
- **Skip Links:** Provide a "Skip to main content" link as the first tabbable element.
- **Conflict-Free Shortcuts:** Custom shortcuts must not override native browser or screen-reader bindings (`Cmd+R`, `Tab`, `Space`, `Enter`, arrow keys), **except** documented, discoverable conventions like the command palette (see 2.3).

### 5.3 WCAG 2.2 New Success Criteria (explicit)

- **2.4.11 Focus Not Obscured (Minimum):** Sticky headers/footers must not fully hide the focused element. Reserve space with `scroll-margin`/`scroll-padding` so focus scrolls into view.
- **2.5.7 Dragging Movements:** Any drag interaction (reorder, sliders, kanban) must offer a single-pointer alternative (buttons, menu, keyboard).
- **2.5.8 Target Size (Minimum):** Interactive targets ≥24×24px, with adequate spacing; Comfortable density (44×44px) preferred for touch.
- **3.3.7 Redundant Entry:** See 4.4.
- **3.3.8 Accessible Authentication (Minimum):** No cognitive-function test (puzzles, transcription, memorized-then-retyped codes) without an alternative. Allow paste and password managers in credential fields; never block them.

---

## Layer 6: Performance & Web Vitals

Metrics are categorized into **Excellent**, **Good**, and **CI Gate** thresholds. Distinguish **field data** (real users — CrUX/RUM, the source of truth) from **lab data** (Lighthouse/synthetic, used for regression gating). Gate on lab in CI; monitor field in production.

| Core Web Vital | Excellent | Good | CI Gate Failure |
|---|---|---|---|
| Interaction to Next Paint (INP) | ≤ 100 ms | ≤ 200 ms | > 200 ms |
| Largest Contentful Paint (LCP) | ≤ 1.2 s | ≤ 2.5 s | > 2.5 s |
| Cumulative Layout Shift (CLS) | ≤ 0.02 | ≤ 0.10 | > 0.10 |
| Time to First Byte (TTFB) | ≤ 200 ms | ≤ 800 ms | > 800 ms |

> **Removed:** First Input Delay (FID) — retired from Core Web Vitals in March 2024 and superseded by INP. Do not gate on it.

---

## Layer 7: AI & Agent Enforcement Contract

Deterministic, machine-readable rules for system prompts, AI coding workflows (Cursor, Claude Code, GitHub Copilot), and automated analysis. Agents must consult Layer 0 first and apply only the archetype-appropriate rules.

### 7.1 AI Coding Agent Guardrails

```yaml
agent_enforcement_rules:
  scope:
    resolve_archetype_first: true            # content | commerce | application | auth
    apply_layer0_matrix: true

  styling_constraints:
    disallow_raw_hex_colors_outside_token_files: true
    require_semantic_or_component_tokens: true
    prohibit_transition_all: true            # ban `transition: all` / `transition-property: all`
    require_cubic_bezier_curves: true
    require_logical_properties: true         # margin-inline, inset-inline-start, etc.
    require_reduced_motion_media_query: true

  accessibility_constraints:
    target_standard: "WCAG 2.2 AA"
    require_aria_labels_on_icon_buttons: true
    require_alt_text_on_images: true
    enforce_semantic_html: true              # <button>, <nav>, <main>; reject <div onClick>
    require_visible_focus_styles: true
    require_html_lang_attribute: true
    require_image_dimensions: true           # width/height or aspect-ratio (CLS)
    min_target_size_px: 24
    allow_paste_in_auth_fields: true         # 3.3.8

  state_and_async_constraints:
    require_explicit_state_machine: ["idle", "loading", "success", "empty", "error"]
    require_optimistic_rollback_handlers: true
    restrict_optimistic_to_reversible_mutations: true   # destructive => confirm/undo, not optimism
    sync_filters_and_search_to_url_query_params: true
    require_unsaved_changes_protection: true            # route guards primary; beforeunload backstop

  error_handling_constraints:
    require_human_readable_messages: true
    preserve_user_input_on_failure: true
    provide_non_reloading_retry_actions: true
```

### 7.2 Programmatic ESLint / Stylelint Specifications

**Stylelint (`.stylelintrc.json`).** `color-no-hex` is scoped so raw hex is permitted **only** in token definition files, and the transition rule bans `all` and enforces cubic-bezier instead of banning the property outright.

```json
{
  "rules": {
    "declaration-property-value-disallowed-list": {
      "transition": ["/\\ball\\b/"],
      "transition-property": ["/\\ball\\b/"]
    },
    "declaration-property-value-allowed-list": {
      "transition-timing-function": ["/cubic-bezier/", "steps"]
    }
  },
  "overrides": [
    {
      "files": ["**/tokens.css", "**/*.tokens.css"],
      "rules": { "color-no-hex": null }
    },
    {
      "files": ["**/*.css", "!**/tokens.css", "!**/*.tokens.css"],
      "rules": { "color-no-hex": true }
    }
  ]
}
```

> **v1.2.0 fixes:** the old config banned the entire `transition` shorthand (contradicting the YAML, which only wants to prohibit `all`) and applied `color-no-hex: true` globally (which would flag the token file's own primitives). Both are now consistent.

**ESLint (`eslint-plugin-hig`):**

- `hig/no-unlabeled-icon-buttons` — flags any `<button>` containing only an SVG/icon without an `aria-label` or visually-hidden label.
- `hig/enforce-optimistic-rollback` — errors if an optimistic mutation hook lacks an error boundary or rollback callback.
- `hig/use-query-params-state` — warns when a top-level search input stores state solely in `useState` without linking to router query params.
- `hig/no-optimistic-destructive` *(new)* — errors when a delete/remove/irreversible mutation is wrapped in optimistic rendering without a confirm step or undo window.
- `hig/require-logical-properties` *(new)* — warns on physical `left`/`right`/`margin-left` etc. in favor of logical properties.

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
               │      └── Any violations ───────────────────────────────> ❌ FAIL BUILD
               │
               ├── 2. Accessibility Audit (Axe-core / Playwright a11y, WCAG 2.2 AA)
               │      └── Non-conformance ──────────────────────────────> ❌ FAIL BUILD
               │
               ├── 3. Synthetic Core Web Vitals Audit (lab)
               │      ├── INP  > 200ms ──────────────────────────────────> ❌ FAIL BUILD
               │      ├── LCP  > 2.5s ───────────────────────────────────> ❌ FAIL BUILD
               │      ├── CLS  > 0.10 ───────────────────────────────────> ❌ FAIL BUILD
               │      └── TTFB > 800ms ─────────────────────────────────> ❌ FAIL BUILD
               │
               └── 4. All Gates Passed ─────────────────────────────────> ✅ BUILD APPROVED
```

Field Core Web Vitals (CrUX/RUM) are monitored post-deploy and trigger alerts, not build failures, since they reflect real-user conditions outside CI's control.

### 8.1 Version History

- **v1.3.0 (2026-09-07):** Added **Layer 0: Applicability & Scope** with a page-archetype matrix (making the contract genuinely universal). Corrected design tokens that failed their own contrast gate (`--text-muted`, `--focus-ring`, status colors split into fill vs. text variants). Fixed the token tier model to a true Global → Semantic → **Component** structure. Resolved the Stylelint/YAML contradiction (ban `transition: all`, not the shorthand; scope `color-no-hex` to token files). Added the optimistic-UI reversibility rule and `optimistic-remove-with-undo`. Documented the `Cmd+K` command-palette exception against the shortcut-conflict rule. Removed retired FID; added TTFB and field-vs-lab distinction. Added `prefers-reduced-motion`, document-level fundamentals (lang, landmarks, metadata, structured data, CLS-safe responsive images), i18n/RTL with logical properties, `aria-live` toasts, 16px mobile input floor, `beforeunload` and draft-privacy caveats, and the full WCAG 2.2 new criteria (2.4.11, 2.5.7, 2.5.8, 3.3.7, 3.3.8).
- **v1.2.0 (2026-09-07):** Re-architected into an 8-Layer Governance Framework. WCAG 2.2 AA mandatory, redefined the 16ms rule to visual input acknowledgment, INP CI gate ≤200ms, formal async state machines, Product IA standards, unsaved-change guardrails, responsive typography scales, refined action dominance.
- **v1.1.0 (2026-09-07):** Introduced 3-tier token architecture, motion, optimistic UI, mobile ergonomics, and AI enforcement guardrails.
- **v1.0.0 (2026-09-07):** Initial base HIG release.
