# Modern Web HIG — Copilot instructions

Follow the pinned Modern Web HIG (`docs/hig/HIG.md`) and archetype map (`docs/hig-scope.md`).

- Resolve page archetype first, then apply Layer 0.
- Use design tokens only (no raw hex outside token files).
- Application-authored CSS MUST NOT use `transition: all`. Micro-feedback ≤300ms; prefer `transform`/`opacity`; functional not decorative.
- Prefer CSS `@container` for component layout; `@media` for viewport, preferences, and page-level concerns.
- Use logical properties (`margin-inline`, `inset-inline-start`, etc.).
- Respect `prefers-reduced-motion` (mandatory HIG requirement; WCAG 2.3.3 is AAA).
- Default to server rendering; add client interactivity only for state/effects/listeners.
- Slow async server regions SHOULD have streaming boundaries with layout-matching skeletons.
- Server mutation forms MUST expose pending UI.
- WCAG 2.2 AA conformance (reference official spec, do not redefine criteria).
- Prefer native HTML over ARIA; accessible names from visible text first.
- Icon buttons need accessible names; images need `alt`; visible focus; min 24×24px targets (44px preferred for touch).
- Modals MUST implement actual focus containment (not just `aria-modal`).
- Destructive mutations MUST NOT use optimistic confirmation without undo/soft-delete.
- Prefer the simplest compliant implementation (HIG-SIM-001).
