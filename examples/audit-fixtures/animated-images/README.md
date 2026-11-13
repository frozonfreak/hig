# Animated-image review

Manual review for GIF, animated PNG, animated WebP, and SVG loaded as an image, and for video, canvas, and inline SVG. The outcome is the same for each technology.

Normative text: [HIG.md §1.3](../../../HIG.md#animated-images-informative) (**HIG-A11Y-001**). [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) applies when its own conditions are met. This fixture does not restate that criterion as a new rule.

`image-animation` and `:animated-image` come from the [CSS Image Animation Level 1 Working Draft](https://www.w3.org/TR/css-image-animation-1/) (7 November 2026). They are supporting evidence. They are not a pass. The property does not control video, canvas, or an `svg` element inlined in HTML.

| Check | Procedure | Expected evidence |
| --- | --- | --- |
| User control | If motion starts automatically, runs long enough that 2.2.2 applies, and is not essential, find the pause or stop control. | The control is visible, named, and keyboard-operable. `image-animation: paused` or `stopped` without that control does not clear this row. |
| Duration | Time the motion. | Record the duration. Do not infer it from a CSS property. |
| Essential | Decide whether the movement is the information. | Record the decision and who made it. A stylesheet cannot make it. |
| Reduced motion | Emulate `prefers-reduced-motion: reduce`, then reload. | Non-essential motion stops, or a static equivalent stays usable. The global duration override does not by itself pause a declarative image. |
| Property present | Where `image-animation` is implemented, operate the control and compare it with `paused` and `stopped`. | The control still works. An engine that ignores the property still has a static image, video controls, or a script path. |
| Other technologies | Repeat the control, duration, and reduced-motion rows for video, canvas, and inline SVG. | The same outcome. Do not treat `image-animation` as covering them. |

Record the browser, version, input method, and reduced-motion state. Execution pending. Do not treat support in one engine as Baseline or as permission to drop the fallback.
