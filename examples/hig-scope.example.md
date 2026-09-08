# HIG scope for this product (example)

Pinned contract: Modern Web HIG v1.5.0 (`docs/hig/HIG.md`)

| Route / area | Archetype | Notes |
| --- | --- | --- |
| `/`, `/pricing`, `/blog/*` | Content / Marketing | SEO + structured data mandatory |
| `/products/*`, `/cart`, `/checkout` | Commerce | Facets/URL state; checkout unsaved-changes protection |
| `/app/*`, `/admin/*` | Application | RSC defaults, mutation state machines, RBAC |
| `/login`, `/signup`, `/settings` | Auth / Account | Security-sensitive; no decorative motion |

**Default for new UI:** Application unless this table says otherwise.
