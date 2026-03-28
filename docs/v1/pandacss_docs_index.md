# PandaCSS related documents

## Must read

- <https://panda-css.com/llms.txt/concepts/cascade-layers>: Control override order between reset, base, recipes, tokens, and utilities. This matters for Park UI shell styles vs your flipbook stage/nav overrides.
- <https://panda-css.com/llms.txt/concepts/writing-styles>: The core `css()` object-syntax workflow and explains atomic utilities, shorthands, and token safety. You will use this everywhere.
- <https://panda-css.com/llms.txt/concepts/global-styles>: For app-wide defaults such as body/html setup, focus ring variables, border/selection globals, and reset/preflight behavior.
- <https://panda-css.com/llms.txt/concepts/conditional-styles>: For `_hover`, `_focusVisible`, `_disabled`, `data-state`, `aria-*`, `@media`, and container-query-driven states. This is directly relevant to nav buttons, page chips, drawers, and reduced-motion handling.
- <https://panda-css.com/llms.txt/concepts/responsive-design>: For desktop vs mobile nav, bottom rail vs bottom sheet, and breakpoint-specific single-page vs spread layout. Panda is mobile-first and supports range/single-breakpoint targeting.
- <https://panda-css.com/llms.txt/concepts/patterns>: Very useful for fast layout primitives like `Container`, `Stack`, `HStack`, `VStack`, and `Wrap` for header, bottom rail, and sheets/drawers.
- <https://panda-css.com/llms.txt/concepts/recipes>: For reusable variants such as nav buttons, page chips, icon buttons, header actions, and stage states. Recipes give you typed base + variants + defaultVariants.
- <https://panda-css.com/llms.txt/concepts/slot-recipes>: For custom components that have multiple visual parts, for example `FlipbookShell`, `NavRail`, `PagesSheet`, `Header`, `Stage`, `Control`, `Thumb`. This fits multipart UI much better than a single recipe.
- <https://panda-css.com/llms.txt/concepts/jsx-style-context>: Important if you wrap Ark UI / Park UI compound components and want slot-recipe styles distributed across child parts ergonomically. Panda explicitly positions this for headless UI libraries like Ark UI.
- <https://panda-css.com/llms.txt/concepts/style-props>: Worth reading if you want fast Solid authoring with `styled.*` and statically extracted props. Panda supports Solid here, but you must enable `jsxFramework` and run codegen.
- <https://panda-css.com/llms.txt/concepts/styled-system>: Understand what Panda generates, how `styled-system` works in your app, and why it stays lightweight even without a bundler plugin.
- <https://panda-css.com/llms.txt/concepts/extend>: Add theme tokens, custom utilities, conditions, patterns, or tweak defaults without replacing Panda’s base presets.

## Useful, but later

- <https://panda-css.com/llms.txt/concepts/merging-styles>: Useful when composing recipe output with local overrides, or combining rail/button/base styles cleanly across files. Good, but not blocking for first implementation.
- <https://panda-css.com/llms.txt/concepts/color-opacity-modifier>: Useful for image-overlaid controls, scrims, hover states, and contrast-safe surfaces such as `bg: 'black/60'`-style effects over menu images. Nice for your UI spec, but not a first-read blocker.
- <https://panda-css.com/llms.txt/concepts/virtual-color>: Useful if you want themeable accent palettes for nav, chips, or brand skins without rewriting component recipes. Helpful for design-system maturity, not required for v1.

## Optional / probably skip for now

- <https://panda-css.com/llms.txt/concepts/template-literals>, <https://panda-css.com/llms.txt/concepts/writing-styles>: Useful only if your team prefers template-literal syntax over object syntax. For a Solid + Panda + Park UI setup, object syntax is the more straightforward default.
- <https://panda-css.com/llms.txt/concepts/hooks>: Mostly compiler-lifecycle customization, parser/codegen tweaks, or advanced integration work. Overkill for v1 unless you need custom extraction behavior or plugin-level control.
