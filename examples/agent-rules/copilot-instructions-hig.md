# Modern Web HIG — Copilot instructions

Follow Modern Web HIG v1.7.0.

- **Default context:** `docs/hig/HIG-LITE.md` (Level 1) — do not load full HIG unless needed
- **Topic index:** `docs/hig/rules/manifest.yaml` (Level 2) — load matching HIG sections on topic match
- **Full spec:** `docs/hig/HIG.md` (Level 3) — edge cases only
- **Archetype map:** `docs/hig-scope.md`

## Workflow

1. Resolve page archetype first, then apply Layer 0 matrix.
2. Read HIG-LITE for essential rules; cite rule IDs on conflicts.
3. Match task keywords against manifest.yaml → open referenced sections.

## Essential rules (from HIG-LITE)

- Use design tokens only (no raw hex outside token files) — HIG-TOK-001
- Application-authored CSS MUST NOT use `transition: all`. Micro-feedback ≤300ms; prefer `transform`/`opacity`; functional not decorative — HIG-MOT-001, HIG-MOT-004
- Prefer CSS `@container` for component layout; `@media` for viewport, preferences, and page-level concerns — HIG-CQ-001
- Use logical properties (`margin-inline`, `inset-inline-start`, etc.) — HIG-UX-001
- Respect `prefers-reduced-motion` (mandatory HIG requirement) — HIG-A11Y-001
- Default to server rendering; add client interactivity only for state/effects/listeners — HIG-SSR-001
- Slow async server regions SHOULD have streaming boundaries with layout-matching skeletons — HIG-SSR-002
- Server mutation forms MUST expose pending UI — HIG-SSR-003
- WCAG 2.2 AA conformance (reference official spec, do not redefine criteria) — HIG-A11Y-002
- Prefer native HTML over ARIA; accessible names from visible text first — HIG-A11Y-003
- Icon buttons need accessible names; images need `alt`; visible focus; min 24×24px targets (44px preferred for touch) — HIG-A11Y-004–007
- Modals MUST implement actual focus containment (not just `aria-modal`) — HIG-A11Y-008
- Destructive mutations MUST NOT use optimistic confirmation without undo/soft-delete — HIG-MUT-001
- Prefer the simplest compliant implementation — HIG-SIM-001
