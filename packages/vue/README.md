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
- `useAtlasTheme`
- Vue adapter contract types
