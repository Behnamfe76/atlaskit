# @atlaskit/vue

`@atlaskit/vue` is the first AtlasKit rendering adapter. It depends on
`@atlaskit/core` via `workspace:*` and exposes Vue-oriented contracts, theme
helpers, and, in later phases, reusable rendering components.

## Install

```bash
pnpm add @atlaskit/core @atlaskit/vue vue
```

## Scope

- no Vue Router integration
- no page generation helpers
- Tailwind utility classes as default presentation
- class maps and theme tokens for styling customization

## Early Exports

- `defaultClasses`
- `defaultThemeTokens`
- `createClassMap`
- `mergeClassMaps`
- `mergeThemeTokens`
- `useAtlasTheme`
- `AtlasResourceTable`
- `AtlasResourceForm`
- `AtlasResourceShow`
- `AtlasFieldRenderer`
- `AtlasActionRunner`
- Vue adapter contract types

## Customization

`@atlaskit/vue` keeps runtime behavior in `@atlaskit/core` and lets
applications customize presentation through:

- `classMap` overrides merged with `defaultClasses`
- `theme` token overrides merged with `defaultThemeTokens`
- typed slots for table cells and rows, form fields, show rendering, field
  rendering, and action rendering

The public type exports include component props, slot props, and
`VueClassMap` so presentation can change without forking validation,
dependencies, authorization, or action execution semantics.
