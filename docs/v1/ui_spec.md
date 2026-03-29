# UI Spec

## Navigation model

- Primary control: `Prev` and `Next` buttons for sequential reading, always visible.
- Secondary control: Table of Contents (ToC) approach using named labels and thumbnails for direct category jumps.
- Do not use a simple seek bar. Menu readers rely on category names, not raw page numbers.

## Desktop

- Layout: centered flipbook stage for 2-page horizontal spreads. Pages must never wrap vertically. Entire stage must fit strictly within viewport height with no scrolling.
- Header: document title, `Pages`, `Plain view`, `Close/Back`.
- Stage controls: left `Prev` button, right `Next` button. Controls must stay visible and not be hidden behind hover-only affordances.
- Bottom rail: Use labeled chips (with optional thumbnails) for quick category jumps. Required naming convention uses sections like `Cover`, `Starters`, `Mains`, `Drinks` rather than page numbers.
- `Pages` panel: Functions as a full Table of Contents. Opens as a drawer containing named thumbnails.

## Mobile

- Default mode: single-page view. Image must scale to fit remaining viewport height without scrolling.
- Header: Minimalist and transparent. Use floating icon buttons (e.g., `Close/Back`) overlaid on the top edge to maximize vertical space for the menu image. Do not use a solid, space-consuming app bar.
- Sticky bottom bar: `Prev` | `1 / N` | `Next` | `Pages`.
- `Pages` opens a bottom sheet functioning as a Table of Contents with named thumbnails for direct category jumps.

## Accessibility and motion

- Keyboard: `Left Arrow` = previous, `Right Arrow` = next, `Home` = first page, `End` = last page, `Tab` cycles through controls.
- Reduced motion: if `prefers-reduced-motion: reduce`, replace 3D turn with fade or instant update.
- Control targets: aim for about 44×44 CSS px on touch devices.
- Contrast: if controls sit on top of images, add a semi-opaque background or scrim so controls stay readable on all pages.

## State rules

- First page: single-page cover mode.
- Middle pages: 2-page spread mode on desktop, single-page mode on mobile.
- Last page: single-page end mode.

## Implementation fit

- SolidStart v2 should own routing, view state, keyboard handling, focus management, and build boundaries. Keep the flipbook logic as lightweight UI state, not as a rendering pipeline.
- ResponsiveImage should own slide asset delivery. Import each slide as image data and let the build plugin generate responsive sources and formats at build time; let the Solid component output the final `<picture>/<img>` markup.
- Panda CSS should own the shell styling: layout, nav rail, bottom bar, drawer/sheet, overlays, focus ring, motion tokens, and visual states. Keep styling static and token-driven.
- Use ResponsiveImage only for page surfaces. Keep navigation controls, layout wrappers, and interaction states as normal Solid components styled with Panda CSS.
- Keep responsibilities separate: SolidStart for app behavior, ResponsiveImage for image generation and responsive markup, Panda CSS for design system and static CSS output. This matches the performance goal of a static, low-runtime flipbook UI.
