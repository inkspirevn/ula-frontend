# UI Spec

## Navigation model

- Primary control: `Prev` and `Next` buttons, always visible.
- Secondary control: thumbnail/page picker for direct jump.
- Do not use a seek bar as the default nav.

## Desktop

- Layout: centered flipbook stage for 2-page horizontal spreads. Pages must never wrap vertically. Entire stage must fit strictly within viewport height with no scrolling.
- Header: document title, `Pages`, `Plain view`, `Close/Back`. `Plain view` is important because v1 uses full-image slides with text baked into images.
- Stage controls: left `Prev` button, right `Next` button. Controls must stay visible and not be hidden behind hover-only affordances.
- Bottom rail: 4 thumbnails or 4 labeled page chips. Recommended labels: `Cover`, `Menu Cover`, `Spread 1`, `Spread 2/Back` depending on your final page map.
- Optional `Pages` panel: opens as a drawer or popover, not a permanent sidebar in v1.

## Mobile

- Default mode: single-page view. Image must scale to fit remaining viewport height without scrolling.
- Sticky bottom bar: `Prev` | `1 / N` | `Next` | `Pages`.
- `Pages` opens a bottom sheet with thumbnails. No fixed sidebar.
- Swipe can exist as an enhancement, but buttons remain mandatory.

## State rules

- First page: single-page cover mode.
- Middle pages: 2-page spread mode on desktop, single-page mode on mobile.
- Last page: single-page end mode.

## Accessibility and motion

- Keyboard: `Left Arrow` = previous, `Right Arrow` = next, `Home` = first page, `End` = last page, `Tab` cycles through controls.
- Reduced motion: if `prefers-reduced-motion: reduce`, replace 3D turn with fade or instant update.
- Control targets: aim for about 44×44 CSS px on touch devices.
- Contrast: if controls sit on top of images, add a semi-opaque background or scrim so controls stay readable on all pages.

## Implementation fit

- SolidStart v2 should own routing, view state, keyboard handling, focus management, and build boundaries. Keep the flipbook logic as lightweight UI state, not as a rendering pipeline.
- ResponsiveImage should own slide asset delivery. Import each slide as image data and let the build plugin generate responsive sources and formats at build time; let the Solid component output the final `<picture>/<img>` markup.
- Panda CSS should own the shell styling: layout, nav rail, bottom bar, drawer/sheet, overlays, focus ring, motion tokens, and visual states. Keep styling static and token-driven.
- Use ResponsiveImage only for page surfaces. Keep navigation controls, layout wrappers, and interaction states as normal Solid components styled with Panda CSS.
- Keep responsibilities separate: SolidStart for app behavior, ResponsiveImage for image generation and responsive markup, Panda CSS for design system and static CSS output. This matches the performance goal of a static, low-runtime flipbook UI.
