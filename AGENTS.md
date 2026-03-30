# Repository Context

High-performance menu flipbook application. Single-page UI. 3D page-turning must be handled entirely by pure CSS 3D transforms.

## Tech Stack & Commands

- Framework: SolidStart v1, Bun.
- Styling: PandaCSS. Use tokens and theme variables exclusively. No magic numbers.
- UI Component Library: Park UI (built on Ark UI + PandaCSS). Add components: `bunx @park-ui/cli add <component_name>`. View Park UI registry: `curl --silent https://raw.githubusercontent.com/chakra-ui/park-ui/refs/heads/main/components/solid/registry.json | jq .items[].name`

## Architecture Rules

- Engine: NO external JS physics/animation libraries or Canvas/WebGL.
- Separation of Concerns: SolidStart v1 for app behavior and routing. ResponsiveImage strictly for page surfaces. PandaCSS for static shell styling.
- Spec Adherence: Read `docs/v1/ui_spec.md` for layout, state, accessibility, and motion rules. Implement them exactly as written.
- Styling Enforcement: Enforce UI spec dimensions (like touch targets) globally by extending PandaCSS `sizes` tokens and applying them to the `base` of Park UI slot recipes. Do not hardcode pixel values in component files.
- Conditional Styling: Enforce UI spec motion and contrast rules (like prefers-reduced-motion and scrims) strictly via PandaCSS conditional styles.
- Coding Conventions: Strict TypeScript only. No `any` types.

## Documentation Index

Always read the relevant index before modifying architecture:

- `docs/v1/ui_spec.md`: Navigation, layout, and state rules.
- `docs/v1/pandacss_docs_index.md`: Slot recipes, cascade layers, condition modifiers.
- `docs/v1/responsive_image.md`: Local image asset optimization.
- `docs/v1/solidjs_docs_index.md`: Core SolidJS and SolidStart references.
