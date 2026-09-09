# Modern Web HIG — Rule Index (Level 2)

**Version:** v1.7.0 · **Machine-readable:** [manifest.yaml](./manifest.yaml) · **Daily summary:** [HIG-LITE.md](../HIG-LITE.md) · **Full spec:** [HIG.md](../HIG.md)

This index maps rule IDs to canonical sections and tells agents **when** to load deeper detail. In v1.7.0, Level 2 modules point to sections in [HIG.md](../HIG.md). Phase 2 will extract these into standalone `rules/<topic>.md` files.

---

## How to use

1. Start with [HIG-LITE.md](../HIG-LITE.md) (Level 1) for every UI task.
2. Match task keywords against the **Load when** column below.
3. Open the referenced HIG section(s) for normative detail.
4. Escalate to full [HIG.md](../HIG.md) only for edge cases or conflicts.

---

## Topics (Level 2 modules)

| Module | Load when task involves… | Primary HIG sections | Key rule IDs |
| --- | --- | --- | --- |
| **accessibility** | combobox, dialog, modal, focus trap, aria, keyboard, tabs, menu, listbox, accordion, skip link, contrast, screen reader | §5.1–5.5 | HIG-A11Y-001–008 |
| **ux** | hierarchy, primary action, dead ends, navigation, deep link, command palette, destructive action, undo | §1.1, §2.1–2.4 | HIG-MUT-001, HIG-SIM-001 |
| **states** | loading, skeleton, empty, error, stale, offline, network failure, optimistic UI | §2.5–2.7, §4.3–4.6 | HIG-ERR-001, HIG-EMP-001, HIG-LOD-001 |
| **forms** | form, label, validation, autocomplete, multi-step, error summary, checkout fields | §2.11 | HIG-FRM-001 |
| **tokens** | color, typography, spacing, dark mode, semantic token, primitive token | §3.1 | HIG-TOK-001, HIG-TOK-002 |
| **responsive** | container query, breakpoint, layout adaptation, reflow, zoom | §3.2 | HIG-CQ-001 |
| **data-density** | data table, grid, virtualization, bulk action, truncation, dashboard density | §3.3 | — |
| **animation** | transition, micro-animation, view transition, motion token, reduced motion | §1.1–1.4 | HIG-MOT-001–005, HIG-VT-001, HIG-A11Y-001 |
| **architecture** | SSR, RSC, server action, streaming, suspense, hydration, client component | §4.1–4.2 | HIG-SSR-001–003 |
| **mutations** | delete, optimistic UI, idempotency, conflict, concurrency | §2.4, §4.5 | HIG-MUT-001, HIG-MUT-002 |
| **performance** | LCP, INP, CLS, TTFB, bundle budget, lazy load, Core Web Vitals | §6.1–6.5 | — |
| **search** | search, autocomplete, facets, filters, debounce, no results | §2.9 | — |
| **notifications** | toast, snackbar, banner, alert, inline status | §2.10 | HIG-NTF-001 |
| **i18n** | locale, RTL, pluralization, translation, logical properties | §2.8 | HIG-I18N-001, HIG-UX-001 |
| **security** | CSP, XSS, CSRF, cookie, PII, auth UX, session, secrets | §9.1–9.7 | HIG-SEC-001–004 |
| **ai-enforcement** | agent rules, linter, CI gate, rule ID, severity | §7.1–7.3, §8 | HIG-SIM-001 + all Layer 7 IDs |
| **framework** | React, Vue, Next, Nuxt, Astro adapter | §4.1 (adapters) | HIG-SSR-001–003 |

---

## Complete rule ID registry

| Rule ID | Summary | HIG section | Severity |
| --- | --- | --- | --- |
| HIG-SIM-001 | Prefer simplest compliant implementation | Exception System, §7.2 | — |
| HIG-UX-001 | Logical CSS properties | §2.8 | error |
| HIG-TOK-001 | No raw hex outside token files | §3.1 | error |
| HIG-TOK-002 | Semantic/component tokens | §3.1 | error |
| HIG-CQ-001 | Container queries for component layout | §3.2 | error |
| HIG-MOT-001 | No `transition: all` in app CSS | §1.1 | error |
| HIG-MOT-002 | Motion duration tokens | §3.1 | error |
| HIG-MOT-003 | No decorative micro-animations | §1.4 | error |
| HIG-MOT-004 | Micro-feedback ≤300 ms | §1.4 | error |
| HIG-MOT-005 | Prefer transform/opacity | §1.4 | warning |
| HIG-VT-001 | Unique view-transition-name | §1.2 | error |
| HIG-SSR-001 | Default to server rendering | §4.1 | error |
| HIG-SSR-002 | Streaming boundary for slow async | §4.1 | warning |
| HIG-SSR-003 | Pending UI on server mutations | §4.2 | error |
| HIG-A11Y-001 | Reduced motion media query | §1.3 | error |
| HIG-A11Y-002 | WCAG 2.2 AA | §5.1 | error |
| HIG-A11Y-003 | Native HTML over ARIA | §5.2 | error |
| HIG-A11Y-004 | Accessible name on icon buttons | §5.2 | error |
| HIG-A11Y-005 | Alt text on images | §5.2 | error |
| HIG-A11Y-006 | Visible focus styles | §5.3 | error |
| HIG-A11Y-007 | Min 24×24 px targets | §5.4 | error |
| HIG-A11Y-008 | Modal focus containment | §5.3 | error |
| HIG-MUT-001 | No optimistic destructive confirmation | §2.4 | error |
| HIG-MUT-002 | Idempotency for critical mutations | §4.5 | warning |
| HIG-ERR-001 | Error states use taxonomy | §2.5 | warning |
| HIG-EMP-001 | Empty states use taxonomy | §2.6 | warning |
| HIG-LOD-001 | Loading states use taxonomy | §2.7 | warning |
| HIG-FRM-001 | Forms have labels and error summary | §2.11 | error |
| HIG-I18N-001 | Logical properties for layout | §2.8 | error |
| HIG-NTF-001 | Notifications use taxonomy | §2.10 | warning |
| HIG-SEC-001 | No secrets in client code | §9.4 | error |
| HIG-SEC-002 | CSP headers configured | §9.1 | error |
| HIG-SEC-003 | PII masked in UI and logs | §9.4 | error |
| HIG-SEC-004 | Secure cookie attributes | §9.3 | error |

---

## Archetype applicability

Not every rule applies to every page. Always resolve archetype first ([§0.2](../HIG.md#02-applicability-matrix)).

| Rule prefix | Universal | Archetype-conditional |
| --- | --- | --- |
| HIG-A11Y-*, HIG-TOK-*, HIG-MOT-*, HIG-CQ-*, HIG-UX-*, HIG-SEC-* | ✅ | — |
| HIG-SSR-* | — | commerce, application, auth |
| HIG-ERR/EMP/LOD/FRM/NTF-* | — | commerce, application, auth (where feature exists) |
| HIG-MUT-002 | — | commerce, application |
