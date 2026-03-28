# UI Spec

## Navigation model

- Primary control: `Prev` and `Next` buttons, always visible.
- Secondary control: thumbnail/page picker for direct jump.
- Do not use a seek bar as the default nav.

## Desktop

- Layout: centered flipbook stage, wide enough for 2-page spreads.
- Header: document title, `Pages`, `Plain view`, `Close/Back`. `Plain view` is important because v1 uses full-image slides with text baked into images.
- Stage controls: left `Prev` button, right `Next` button. Controls must stay visible and not be hidden behind hover-only affordances.
- Bottom rail: 4 thumbnails or 4 labeled page chips. Recommended labels: `Cover`, `Menu Cover`, `Spread 1`, `Spread 2/Back` depending on your final page map.
- Optional `Pages` panel: opens as a drawer or popover, not a permanent sidebar in v1.

## Mobile

- Default mode: single-page view. Do not force 2-page spreads on small screens. Full-image slides already contain small text, so single-page mode is safer for readability.
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

## Tech-stack fit

- Park UI should own the shell: header, bottom rail, buttons, drawer/bottom sheet. This matches its strength in a11y-ready interaction patterns and zero-runtime styling.
- SolidJS state should drive a `spread index` or `page index`; CSS 3D handles the visual turn only. Keep JS limited to state, focus, and control events.
