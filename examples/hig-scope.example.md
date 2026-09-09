# HIG scope for this product (example)

Pinned contract: Modern Web HIG v1.9.0

| File | Purpose |
| --- | --- |
| `docs/hig/VERSION` | Version pin (currently 1.9.0) |
| `docs/hig/HIG-LITE.md` | Default agent context (Level 1) |
| `docs/hig/rules/archetypes/*.md` | Archetype packs (Level 1.5) |
| `docs/hig/rules/*.md` | Topic modules (Level 2) |
| `docs/hig/framework/*.md` | Framework adapters |
| `docs/hig/rules/manifest.yaml` | Topic-triggered loading index |
| `docs/hig/HIG.md` | Full specification (Level 3) |

| Route / area | Archetype | Notes |
| --- | --- | --- |
| `/`, `/pricing`, `/blog/*` | Content / Marketing | SEO + structured data mandatory |
| `/products/*`, `/cart`, `/checkout` | Commerce | Facets/URL state; checkout unsaved-changes protection |
| `/app/*`, `/admin/*` | Application | Server rendering defaults, mutation state machines, RBAC |
| `/login`, `/signup`, `/settings` | Auth / Account | Security-sensitive; no decorative motion |

**Default for new UI:** Application unless this table says otherwise.
