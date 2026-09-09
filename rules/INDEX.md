# Web HIG — Rule Index (Level 2)

**Version:** v1.9.0 · **Machine-readable:** [manifest.yaml](./manifest.yaml) · **Daily summary:** [HIG-LITE.md](../HIG-LITE.md) · **Full spec:** [HIG.md](../HIG.md)

This index maps rule IDs to standalone Level 2 modules and tells agents **when** to load them. Each module is a self-contained extract; [HIG.md](../HIG.md) remains the complete normative contract (Level 3).

---

## How to use

1. Start with [HIG-LITE.md](../HIG-LITE.md) (Level 1) for every UI task.
2. Resolve archetype → load [archetype pack](./archetypes/) (Level 1.5).
3. Preload **default modules** from the archetype pack.
4. Match task keywords against the **Load when** column below (or [manifest.yaml](./manifest.yaml) triggers).
5. Open the **Module file** for normative detail on that topic.
6. Escalate to full [HIG.md](../HIG.md) only for edge cases or conflicts.

---

## Applicability

| Module | File | Purpose |
| --- | --- | --- |
| **applicability** | [applicability.md](./applicability.md) | Layer 0 matrix, archetype resolution |

## Archetype packs (Level 1.5)

| Archetype | Pack | Default module count |
| --- | --- | --- |
| Content / Marketing | [archetypes/content.md](./archetypes/content.md) | 7 |
| Commerce | [archetypes/commerce.md](./archetypes/commerce.md) | 13 |
| Application / Dashboard | [archetypes/application.md](./archetypes/application.md) | 15 |
| Auth / Account | [archetypes/auth.md](./archetypes/auth.md) | 12 |

---

## Topic modules

| Module | File | Load when task involves… | Key rule IDs |
| --- | --- | --- | --- |
| **accessibility** | [accessibility.md](./accessibility.md) | combobox, dialog, focus trap, aria, keyboard, tabs, menu, contrast | HIG-A11Y-001–008 |
| **ux** | [ux.md](./ux.md) | hierarchy, navigation, deep link, command palette, destructive action, SEO | HIG-MUT-001, HIG-SIM-001 |
| **states** | [states.md](./states.md) | loading, skeleton, empty, error, stale, offline, network failure | HIG-ERR-001, HIG-EMP-001, HIG-LOD-001 |
| **forms** | [forms.md](./forms.md) | form, label, validation, autocomplete, multi-step, checkout | HIG-FRM-001 |
| **tokens** | [tokens.md](./tokens.md) | color, typography, spacing, dark mode, design token | HIG-TOK-001, HIG-TOK-002 |
| **responsive** | [responsive.md](./responsive.md) | container query, breakpoint, layout adaptation, reflow | HIG-CQ-001 |
| **data-density** | [data-density.md](./data-density.md) | data table, grid, virtualization, bulk action, dashboard | — |
| **animation** | [animation.md](./animation.md) | transition, micro-animation, view transition, reduced motion | HIG-MOT-001–005, HIG-VT-001 |
| **architecture** | [architecture.md](./architecture.md) | SSR, RSC, server action, streaming, suspense, hydration | HIG-SSR-001–003 |
| **mutations** | [mutations.md](./mutations.md) | delete, optimistic UI, idempotency, conflict | HIG-MUT-001, HIG-MUT-002 |
| **performance** | [performance.md](./performance.md) | LCP, INP, CLS, TTFB, bundle budget, Core Web Vitals | — |
| **search** | [search.md](./search.md) | search, autocomplete, facets, filters, debounce | — |
| **notifications** | [notifications.md](./notifications.md) | toast, snackbar, banner, alert, inline status | HIG-NTF-001 |
| **i18n** | [i18n.md](./i18n.md) | locale, RTL, pluralization, translation | HIG-I18N-001, HIG-UX-001 |
| **security** | [security.md](./security.md) | CSP, XSS, CSRF, cookie, PII, auth UX, secrets | HIG-SEC-001–004 |
| **ai-enforcement** | [ai-enforcement.md](./ai-enforcement.md) | agent rules, linter, CI gate, rule ID | HIG-SIM-001 + Layer 7 |

---

## Framework adapters

Load alongside **architecture** when the task is framework-specific:

| Framework | File | Triggers |
| --- | --- | --- |
| React | [../framework/react.md](../framework/react.md) | react, jsx, tsx, use client |
| Next.js | [../framework/next.md](../framework/next.md) | next.js, app router, server action |
| Vue | [../framework/vue.md](../framework/vue.md) | vue, .vue |
| Nuxt | [../framework/nuxt.md](../framework/nuxt.md) | nuxt |
| Astro | [../framework/astro.md](../framework/astro.md) | astro, .astro, client:* |

---

## Complete rule ID registry

| Rule ID | Summary | Module | HIG section |
| --- | --- | --- | --- |
| HIG-SIM-001 | Prefer simplest compliant implementation | ai-enforcement | Exception System, §7.2 |
| HIG-UX-001 | Logical CSS properties | i18n | §2.8 |
| HIG-TOK-001 | No raw hex outside token files | tokens | §3.1 |
| HIG-TOK-002 | Semantic/component tokens | tokens | §3.1 |
| HIG-CQ-001 | Container queries for component layout | responsive | §3.2 |
| HIG-MOT-001 | No `transition: all` in app CSS | animation | §1.1 |
| HIG-MOT-002 | Motion duration tokens | animation | §3.1 |
| HIG-MOT-003 | No decorative micro-animations | animation | §1.4 |
| HIG-MOT-004 | Micro-feedback ≤300 ms | animation | §1.4 |
| HIG-MOT-005 | Prefer transform/opacity | animation | §1.4 |
| HIG-VT-001 | Unique view-transition-name | animation | §1.2 |
| HIG-SSR-001 | Default to server rendering | architecture | §4.1 |
| HIG-SSR-002 | Streaming boundary for slow async | architecture | §4.1 |
| HIG-SSR-003 | Pending UI on server mutations | architecture | §4.2 |
| HIG-A11Y-001 | Reduced motion media query | animation | §1.3 |
| HIG-A11Y-002 | WCAG 2.2 AA | accessibility | §5.1 |
| HIG-A11Y-003 | Native HTML over ARIA | accessibility | §5.2 |
| HIG-A11Y-004 | Accessible name on icon buttons | accessibility | §5.2 |
| HIG-A11Y-005 | Alt text on images | accessibility | §5.2 |
| HIG-A11Y-006 | Visible focus styles | accessibility | §5.3 |
| HIG-A11Y-007 | Min 24×24 px targets | accessibility | §5.4 |
| HIG-A11Y-008 | Modal focus containment | accessibility | §5.3 |
| HIG-MUT-001 | No optimistic destructive confirmation | mutations | §2.4 |
| HIG-MUT-002 | Idempotency for critical mutations | mutations | §4.5 |
| HIG-ERR-001 | Error states use taxonomy | states | §2.5 |
| HIG-EMP-001 | Empty states use taxonomy | states | §2.6 |
| HIG-LOD-001 | Loading states use taxonomy | states | §2.7 |
| HIG-FRM-001 | Forms have labels and error summary | forms | §2.11 |
| HIG-I18N-001 | Logical properties for layout | i18n | §2.8 |
| HIG-NTF-001 | Notifications use taxonomy | notifications | §2.10 |
| HIG-SEC-001 | No secrets in client code | security | §9.4 |
| HIG-SEC-002 | CSP headers configured | security | §9.1 |
| HIG-SEC-003 | PII masked in UI and logs | security | §9.4 |
| HIG-SEC-004 | Secure cookie attributes | security | §9.3 |

---

## Archetype applicability

Not every rule applies to every page. Always resolve archetype first ([§0.2](../HIG.md#02-applicability-matrix)).

| Rule prefix | Universal | Archetype-conditional |
| --- | --- | --- |
| HIG-A11Y-*, HIG-TOK-*, HIG-MOT-*, HIG-CQ-*, HIG-UX-*, HIG-SEC-* | ✅ | — |
| HIG-SSR-* | — | commerce, application, auth |
| HIG-ERR/EMP/LOD/FRM/NTF-* | — | commerce, application, auth (where feature exists) |
| HIG-MUT-002 | — | commerce, application |
