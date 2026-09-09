# Responsive Layout & Container Queries — Level 2 Module

**Version:** v1.8.0 · **Canonical spec:** [HIG.md §3.2](../HIG.md#32-container-queries-engine) · **Rule ID:** HIG-CQ-001

> Standalone extract for progressive loading. The complete normative contract remains in [HIG.md](../HIG.md).

---

## 3.2 Container Queries Engine

Reusable UI components (cards, tables, form groups) MUST respond to their immediate parent container width rather than the screen viewport (**HIG-CQ-001**).

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

**Responsive query roles:**

| Query type | Purpose |
| --- | --- |
| `@container` | Component-size adaptation |
| `@media` (viewport) | Page layout, navigation structure |
| `@media` (preferences) | Accessibility (`prefers-reduced-motion`), user preferences (`prefers-color-scheme`), print |

`@media (prefers-reduced-motion: reduce)` and similar preference queries are legitimate inside component stylesheets. Component layout adaptation SHOULD use `@container`; viewport `@media` is for page-level concerns.

**Do not** turn viewport sizes into arbitrary fixed breakpoints for component logic — use container queries.

Content MUST remain usable at 200% text zoom with reflow support where applicable — see [accessibility.md](./accessibility.md) §5.1.
