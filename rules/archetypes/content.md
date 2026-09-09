# Archetype Pack — Content / Marketing

**Version:** v1.9.0 · **Archetype:** `content` · **Matrix:** [applicability.md](../applicability.md)

Landing pages, blogs, docs, campaigns. Read-mostly, SEO-critical, server-rendered.

---

## Default modules (load after HIG-QUICK)

| Module | Why |
| --- | --- |
| [ux.md](../ux.md) | Document fundamentals, SEO metadata, landmarks |
| [tokens.md](../tokens.md) | Design tokens (universal) |
| [responsive.md](../responsive.md) | Container queries, responsive layout |
| [animation.md](../animation.md) | Motion — functional only; no decorative |
| [accessibility.md](../accessibility.md) | WCAG 2.2 AA (universal) |
| [performance.md](../performance.md) | Core Web Vitals, LCP-critical for SEO |
| [security.md](../security.md) | CSP, third-party scripts (universal) |

## Conditional modules (load when feature exists)

| Module | When |
| --- | --- |
| [states.md](../states.md) | Async content regions, error/empty states |
| [architecture.md](../architecture.md) | Dynamic views with streaming |
| [forms.md](../forms.md) | Newsletter signup, contact forms |
| [i18n.md](../i18n.md) | Multi-locale content sites |

## Skip unless explicitly needed

`data-density`, `mutations`, `search`, `notifications`, `ai-enforcement`

## Mandatory rule IDs

HIG-TOK-001, HIG-TOK-002, HIG-CQ-001, HIG-MOT-001, HIG-MOT-004, HIG-A11Y-001–008, HIG-SEC-001–004, HIG-SIM-001

## Typical tasks

| Task | Additional modules |
| --- | --- |
| Landing page hero + CTA | (defaults sufficient) |
| Blog post template | ux (SEO, structured data) |
| Docs with search | search (if site search exists) |
| Marketing form | forms |
