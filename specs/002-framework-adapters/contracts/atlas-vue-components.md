# Contract: Atlas Vue Components

## Purpose

Define the public component and composable contract exposed by `@atlaskit/vue`
in first delivery.

## Required Components

### `AtlasResourceTable`

- Accepts a `resource` prop that may be a resource class, registered resource
  instance, or `uriKey`
- Accepts query options and table-state inputs
- Supports controlled and uncontrolled state for search, filters, sort, page,
  and per-page
- Renders current core relationship fields, including `BelongsTo` and
  `BelongsToMany`, using index-appropriate metadata without inventing new core
  semantics
- Accepts class-map and theme-token overrides
- Exposes slots for table regions, rows, cells, empty state, loading state, and
  actions

### `AtlasResourceForm`

- Accepts a `resource` prop that may be a resource class, registered resource
  instance, or `uriKey`
- Requires an explicit `mode` prop of `create` or `edit`
- Accepts initial values and edit identifiers or records
- Exposes form state, validation errors, dependency visibility, and submit
  state through slot props and composables
- Supports current core relationship fields, including `BelongsTo` and
  `BelongsToMany`, using core-driven visibility, values, and async option data
- Accepts class-map and theme-token overrides

### `AtlasResourceShow`

- Accepts a `resource` prop that may be a resource class, registered resource
  instance, or `uriKey`
- Accepts a resource id or a preloaded record
- Renders read-only resource detail state
- Renders current core relationship fields, including `BelongsTo` and
  `BelongsToMany`, using show/detail metadata
- Accepts class-map and theme-token overrides

### `AtlasFieldRenderer`

- Accepts resolved field metadata, value, mode, form state, and errors
- Supports default rendering and field-specific slot overrides
- Supports current core relationship field metadata, including `BelongsTo` and
  `BelongsToMany`, across index, show, create, and edit modes
- Preserves hidden-versus-disabled authorization behavior from core semantics

### `AtlasActionRunner`

- Accepts one or more actions plus execution context
- Accepts selected rows or a single record context
- Exposes loading, executable, disabled, and result states
- Supports action-specific slots

## Required Composables

- `useAtlasResource`
- `useResourceTable`
- `useResourceForm`
- `useResourceShow`
- `useFieldRenderer`
- `useActionRunner`
- `useAtlasTheme`

Each composable returns strongly typed refs/computed state derived from
`Atlas.runtime()`, registry/resource resolution, and `QueryClient.subscribe()`.

## Public Typing Contract

- Component props are exported as public types
- Slot props are exported as public types
- Class-map and theme-token types are exported as public types
- Emits, where present, are typed and documented

## Exclusions

- No Vue Router integration
- No Nuxt conventions
- No page-generation helpers
- No duplicated core query, validation, authorization, or action logic
