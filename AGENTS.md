# Project Context

## Overview

This project is a high-performance, responsive flipbook application for menu images. The v1 goal is a single-page interface using static assets, where the 3D page-turning effect is handled entirely by the browser's CSS engine.

## Tech Stack

- SolidStart v2: Framework for routing, state, and build boundaries.
- PandaCSS: Build-time CSS-in-JS using recipes and slot recipes.
- [Park UI](https://raw.githubusercontent.com/chakra-ui/park-ui/refs/heads/main/components/solid/registry.json): Component library (built on Ark UI + PandaCSS) to construct the accessible UI shell (Drawer, Bottom Sheet, Buttons). The reference is a long json, combine `curl` to fetch and `jq` to read. Use `bunx @park-ui/cli add <component_name>` to add a component.
- ResponsiveImage: Component for optimized, responsive image delivery.
- Bun: Primary package manager.

## V1 Implementation

Implementation uses images 1.png through 4.png in `src/assets/`.

- Core Engine (CRITICAL): Do NOT use external JS physics/animation libraries (e.g., StPageFlip, turn.js) or Canvas/WebGL. The flip effect MUST be built using Pure CSS 3D transforms.
- Layout Rules: Desktop uses a centered stage with 2-page spreads for middle pages. Mobile strictly uses a single-page view.
- State: Logic handled via SolidJS signals. Keyboard handling implemented for Left/Right, Home/End.
- Styling & Shell: Navigation shell, drawers, and bottom sheets use Park UI components.

## Documentation Index

Markdown files in `docs/v1/` act as indices to external documentation URLs.

- ui_spec.md: The primary mandate for navigation, layout, and state. Follow strictly.
- pandacss_docs_index.md: Reference for slot recipes, cascade layers, and condition modifiers (e.g., `_motionReduce`).
- responsive_image.md: Details for local image asset optimization.
- solidjs_docs_index.md: Core SolidJS and SolidStart references.

## Implementation Constraints

- Minimalism: Focus strictly on the UI spec structure. No extra decorative CSS beyond the spec.
- Accessibility & Motion: Interactive targets must be minimum 44x44px. Must respect `prefers-reduced-motion` (fallback to CSS fade/opacity transition or instant swap).
- Separation of Concerns: SolidJS handles state/logic. ResponsiveImage handles asset markup. CSS 3D handles the flip visual. Park UI/PandaCSS handles the shell.
- Layout Stability: Desktop spreads must remain horizontally aligned under all conditions without vertical wrapping.
- Viewport Limits: The entire flipbook stage and images must be strictly constrained within the viewport height to prevent page scrolling.
- Coding Standards: Enforce strict TypeScript typing (no any). Avoid magic numbers or hardcoded styles; utilize PandaCSS tokens and theme variables exclusively.
