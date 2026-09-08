# Modern Web HIG — Copilot instructions

Follow the pinned Modern Web HIG (`docs/hig/HIG.md`) and archetype map (`docs/hig-scope.md`).

- Resolve page archetype first, then apply Layer 0.
- Use design tokens only (no raw hex outside token files).
- Ban `transition: all`. Micro-animations ≤300ms, `transform`/`opacity` only, functional not decorative.
- Prefer CSS `@container` over component-level viewport `@media`.
- Use logical properties (`margin-inline`, `inset-inline-start`, etc.).
- Respect `prefers-reduced-motion`.
- Default to Server Components; add client directives only for state/effects/listeners.
- Wrap async RSC in Suspense with layout-matching skeletons.
- Server Action forms must expose pending UI.
- WCAG 2.2 AA: labels on icon buttons, image `alt`, visible focus, ≥24px targets.
