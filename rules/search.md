# Search — Level 2 Module

**Version:** v1.8.0 · **Canonical spec:** [HIG.md §2.9](../HIG.md#29-search-standard-commerce--application) · **Archetypes:** Commerce, Application

> Standalone extract for progressive loading. The complete normative contract remains in [HIG.md](../HIG.md).

---

## 2.9 Search Standard

Search flows MUST follow this state machine:

```
[input] ──debounce──> [pending] ──┬──> [results]
                                  ├──> [no results]
                                  └──> [error]
```

Requirements:

* Debounce input (typically 200–400 ms); show pending indicator after debounce threshold.
* Results MUST support keyboard navigation (arrow keys, Enter to select) — see [accessibility.md](./accessibility.md) §5.3.
* Search query MUST sync to URL where search is a primary navigation pattern — see [ux.md](./ux.md) §2.3.
* No-results and error states MUST follow [states.md](./states.md) taxonomies.
* Recent searches MAY be persisted locally; MUST respect privacy settings — see [security.md](./security.md).
