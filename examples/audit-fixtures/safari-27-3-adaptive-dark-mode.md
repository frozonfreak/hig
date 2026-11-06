# Safari 27.3 — Adaptive Dark Mode review

Source: [Introducing Adaptive Dark Mode](https://webkit.org/blog/18541/introducing-adaptive-dark-mode/), 3 November 2026. This is Safari 27.3 beta, not a statement that every supported browser repaints light pages. Computed styles stay the authored colors, so an automated contrast pass does not show what Safari displays. Safari’s 4.5:1 aim is not WCAG conformance.

Normative rule: [HIG.md §3.1](../../HIG.md#supported-color-schemes). Record the OS appearance, Safari build, whether Adaptive Dark Mode is offered and enabled, and a screenshot. Results start untested.

| Case | Fixture | Procedure | What to record |
| --- | --- | --- | --- |
| Declared `light dark` | [safari-27-3-adaptive-dark-mode.html](./safari-27-3-adaptive-dark-mode.html) | System appearance dark. Confirm the document declares `color-scheme` in the head and in initial CSS. Enable Adaptive Dark Mode if Safari offers it. | Whether Safari leaves the authored light and dark colors in place. Text, the button’s hover and focus, the SVG logo, the transparent bitmap, and the canvas chart should match the authored scheme, not a second browser repaint. |
| No scheme declared | [safari-27-3-adaptive-dark-mode-undeclared.html](./safari-27-3-adaptive-dark-mode-undeclared.html) | Same system appearance. Do not add `color-scheme` with script. Enable Adaptive Dark Mode. | A screenshot of text, focus, hover, the SVG logo, the transparent bitmap, and the canvas. Note masks or blend effects if Safari turns them off. Canvas pixels should stay as drawn. Computed styles will still report the authored light colors. |
| `light only` opt-out | Either page, only in a build that honors `only` | Do not use this as the product default. If the build supports it, set `color-scheme: light only` on a copy and reload. | Whether the page stays light. Safari 27.3 beta 1 did not support `only`. A failure there is a browser limit, not a reason to make `light only` the default. |

Compare the declared page with one other browser that does not implement Adaptive Dark Mode. Do not encode a beta repaint as an author failure on a page that already declares `light dark` and ships an authored dark appearance.
