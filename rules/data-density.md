# Data Density — Level 2 Module

**Version:** v1.8.0 · **Canonical spec:** [HIG.md §3.3](../HIG.md#33-data-density-standards-application--dashboard) · **Archetypes:** Application / Dashboard

> Standalone extract for progressive loading. The complete normative contract remains in [HIG.md](../HIG.md).

---

## 3.3 Data Density Standards

Data-heavy interfaces MUST use tokenized density levels:

| Token | Row height | Use case |
| --- | --- | --- |
| `--density-compact` | 32–36 px | Dense dashboards, admin tables |
| `--density-default` | 40–48 px | Standard application tables |
| `--density-comfortable` | 52–56 px | Primary workflows, touch-friendly |

Additional requirements:

* **Numeric alignment** — numbers MUST be right-aligned (`text-align: end`); text left-aligned (`start`).
* **Truncation** — long text truncates with ellipsis; full value available on hover/focus or expand action.
* **Overflow** — horizontal scroll ONLY as last resort; prefer column hiding/reordering at container breakpoints.
* **Sticky headers** — table headers SHOULD stick on scroll for datasets >10 rows.
* **Bulk actions** — multi-select with visible selection count and batch action bar.
* **Pagination** — preferred over infinite scroll for operational data requiring URL state; infinite scroll permitted for feed/browse patterns.
* **Virtualization** — datasets >100 rows SHOULD use virtual scrolling — see [performance.md](./performance.md).

Sortable tables MUST have keyboard-accessible sort controls — see [accessibility.md](./accessibility.md) §5.3.
