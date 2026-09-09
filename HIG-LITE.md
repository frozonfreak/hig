# Modern Web HIG — Essential Rules (Level 1)

**Version:** v1.7.0 · **Core:** [HIG-CORE.md](./HIG-CORE.md) · **Full spec:** [HIG.md](./HIG.md) · **Topic index:** [rules/INDEX.md](./rules/INDEX.md)

Default agent context. Each rule links to a canonical rule ID and section in [HIG.md](./HIG.md). Load [rules/manifest.yaml](./rules/manifest.yaml) Level 2 modules when the task requires detail beyond this summary.

---

## 0. Before you start

1. Resolve page archetype: `content` | `commerce` | `application` | `auth` ([§0.1](./HIG.md#01-page-archetypes))
2. Apply Layer 0 mandatory/optional matrix ([§0.2](./HIG.md#02-applicability-matrix))
3. Prefer simplest compliant implementation (**HIG-SIM-001** → [Exception System](./HIG.md#exception-system))

---

## 1. UX

- Mobile-first and responsive; clear visual hierarchy ([§1.1](./HIG.md#11-direct-manipulation--motion-ergonomics))
- One primary action per screen; never create dead ends ([§2.1](./HIG.md#21-document-fundamentals))
- Preserve user state; URL represents navigable state where applicable ([§2.3](./HIG.md#23-navigation-architecture-command-palette--deep-linking))
- Immediate local feedback on every interaction ([§1.1](./HIG.md#11-direct-manipulation--motion-ergonomics))
- Functional micro-animations only; ≤300 ms for micro-feedback (**HIG-MOT-004** → [§1.4](./HIG.md#14-functional-micro-animations))
- Respect reduced motion — mandatory, not optional (**HIG-A11Y-001** → [§1.3](./HIG.md#13-reduced-motion--animation-safety))

## 2. Accessibility

- WCAG 2.2 AA target — refer to official spec, do not redefine criteria (**HIG-A11Y-002** → [§5.1](./HIG.md#51-standards-baseline))
- Semantic HTML first; native elements over ARIA (**HIG-A11Y-003** → [§5.2](./HIG.md#52-native-html-over-aria))
- Keyboard accessible; follow platform widget patterns ([§5.3](./HIG.md#53-keyboard-focus--interaction))
- Visible focus indicator with sufficient contrast (**HIG-A11Y-006** → [§5.3](./HIG.md#53-keyboard-focus--interaction))
- Accessible names on all controls; icon buttons and images included (**HIG-A11Y-004**, **HIG-A11Y-005** → [§5.2](./HIG.md#52-native-html-over-aria))
- Minimum 24×24 px targets; 44×44 px preferred for touch (**HIG-A11Y-007** → [§5.4](./HIG.md#54-target-sizes))
- Modal focus containment, not just `aria-modal` (**HIG-A11Y-008** → [§5.3](./HIG.md#53-keyboard-focus--interaction))

## 3. UI & tokens

- Use design tokens; no raw hex outside token files (**HIG-TOK-001** → [§3.1](./HIG.md#31-design-token-architecture))
- Semantic or component tokens for UI surfaces (**HIG-TOK-002** → [§3.1](./HIG.md#31-design-token-architecture))
- Consistent spacing and typography from token system ([§3.1](./HIG.md#31-design-token-architecture))
- Avoid unnecessary decoration; use existing components before creating new ones
- Logical CSS properties for layout (**HIG-UX-001**, **HIG-I18N-001** → [§2.8](./HIG.md#28-internationalization--localization))

## 4. States

Every interactive feature MUST handle applicable states:

| State | Rule ID | Reference |
| --- | --- | --- |
| Loading | **HIG-LOD-001** | [§2.7](./HIG.md#27-loading-state-taxonomy) |
| Empty | **HIG-EMP-001** | [§2.6](./HIG.md#26-empty-state-taxonomy) |
| Success | — | [§2.5](./HIG.md#25-error-ux-taxonomy) (inverse) |
| Error | **HIG-ERR-001** | [§2.5](./HIG.md#25-error-ux-taxonomy) |
| Disabled | — | Native `disabled` / `aria-disabled` |
| Offline / network failure | — | [§4.4](./HIG.md#44-network--error-states), [§4.6](./HIG.md#46-offline--degraded-mode-applicationdashboard) |

Server mutations MUST show pending UI (**HIG-SSR-003** → [§4.2](./HIG.md#42-async-mutation--server-action-state-model)).

## 5. Interaction & motion

- Application CSS MUST NOT use `transition: all` — enumerate properties (**HIG-MOT-001** → [§1.1](./HIG.md#11-direct-manipulation--motion-ergonomics))
- Use motion duration tokens (**HIG-MOT-002** → [§3.1](./HIG.md#31-design-token-architecture))
- No decorative micro-animations (**HIG-MOT-003** → [§1.4](./HIG.md#14-functional-micro-animations))
- Prefer `transform` / `opacity` for micro-feedback (**HIG-MOT-005** → [§1.4](./HIG.md#14-functional-micro-animations))
- Destructive actions reversible where practical; no optimistic destructive confirmation without undo (**HIG-MUT-001** → [§2.4](./HIG.md#24-destructive-actions--permission-guardrails))

## 6. Performance

- Avoid unnecessary JavaScript; default to server rendering (**HIG-SSR-001** → [§4.1](./HIG.md#41-server-driven--progressive-rendering-architecture))
- Lazy-load appropriate resources; optimize images ([§6.4](./HIG.md#64-performance-budgets))
- Avoid blocking critical rendering path ([§6.1](./HIG.md#61-core-web-vitals--supporting-performance-metrics))
- Protect Core Web Vitals: LCP, INP (field SLO), CLS ([§6.1](./HIG.md#61-core-web-vitals--supporting-performance-metrics))
- Slow async server regions need streaming boundaries + skeleton (**HIG-SSR-002** → [§4.1](./HIG.md#41-server-driven--progressive-rendering-architecture))

## 7. Responsive layout

- Components adapt to available space via container queries (**HIG-CQ-001** → [§3.2](./HIG.md#32-container-queries-engine))
- Use `@media` for viewport, user preferences, and page-level concerns only ([§3.2](./HIG.md#32-container-queries-engine))
- Content usable at 200% zoom; support reflow where applicable ([§5.1](./HIG.md#51-standards-baseline))

## 8. Engineering

- Keep implementation simple (**HIG-SIM-001**)
- Don't duplicate existing functionality
- Don't introduce dependencies without justification
- Don't over-engineer to satisfy the HIG
- Critical mutations SHOULD be idempotent (**HIG-MUT-002** → [§4.5](./HIG.md#45-concurrency-conflict--idempotency))

## 9. Security (universal)

- No secrets in client code (**HIG-SEC-001** → [§9.4](./HIG.md#94-pii--sensitive-data-handling))
- CSP configured in production (**HIG-SEC-002** → [§9.1](./HIG.md#91-content-security-policy-csp))
- PII masked in UI and logs (**HIG-SEC-003** → [§9.4](./HIG.md#94-pii--sensitive-data-handling))
- Secure cookie attributes for auth (**HIG-SEC-004** → [§9.3](./HIG.md#93-secure-cookies--storage))

## 10. Before completion

Check applicable items:

- [ ] Archetype resolved; Layer 0 matrix applied
- [ ] Responsive (container queries for components)
- [ ] Keyboard accessible; visible focus
- [ ] WCAG 2.2 AA (semantic HTML, names, contrast, targets)
- [ ] Loading, empty, error states (taxonomies where applicable)
- [ ] Design tokens (no raw hex)
- [ ] Reduced motion path
- [ ] Mobile / touch targets
- [ ] Performance (server-first, no unnecessary JS)
- [ ] Visual consistency with existing components

---

## When to load more

| Task signal | Load |
| --- | --- |
| Combobox, dialog, tabs, keyboard widget | [rules/INDEX.md](./rules/INDEX.md) → `accessibility` |
| Form, validation, checkout | `forms` |
| Data table, dashboard density | `data-density` |
| SSR, RSC, streaming, mutations | `architecture` |
| Toast, banner, notification | `notifications` |
| Search, facets, filters | `search` |
| i18n, RTL, locale | `i18n` |
| CSP, auth, PII, cookies | `security` |
| Animation, view transitions | `animation` |
| Edge case or spec conflict | [HIG.md](./HIG.md) (Level 3) |

See [rules/manifest.yaml](./rules/manifest.yaml) for machine-readable triggers and rule ID mappings.
