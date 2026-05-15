# Data Model: Framework Adapter Packages

## Adapter Package

Represents a published framework-specific package within the AtlasKit monorepo.

### Fields

- `name`: package name such as `@atlaskit/vue`
- `framework`: `vue`, `dom`, `react`, `angular`, `svelte`, or `solid`
- `status`: `implemented` or `placeholder`
- `dependsOnCore`: boolean, always `true`
- `ownsRendering`: boolean, always `true`
- `ownsRouting`: boolean, always `false`
- `publicSurfaces`: required component/composable exports

### Invariants

- Every adapter package depends on `@atlaskit/core` via workspace dependency.
- Every adapter package excludes routing and page abstractions.
- Only `@atlaskit/vue` is `implemented` in first delivery.

### Relationships

- Uses one `Resource Input Contract`
- Conforms to one `Adapter Behavior Contract`
- May consume one `Shared Adapter Utility` layer

## Shared Adapter Utility

Represents framework-agnostic runtime contracts and helpers shared by adapter
packages.

### Fields

- `packageName`: `@atlaskit/adapter-contracts`
- `resourceResolution`: canonical resource normalization helpers
- `stateContracts`: table/form/show/action state interfaces
- `themeSchemas`: class-map and theme-token types
- `authorizationContract`: hidden versus disabled semantics

### Invariants

- Contains no framework-specific imports.
- May depend on `@atlaskit/core`.
- Owns no rendering behavior.

### Relationships

- Supports many `Adapter Package` instances
- Defines one `Resource Input Contract`
- Defines one `Table State Contract`
- Defines one `Form Mode Contract`
- Defines one `Authorization Rendering Contract`
- Defines one `Styling Theme Contract`

## Adapter Behavior Contract

Represents the reusable expected behavior shared by all adapter implementations.

### Fields

- `requiredComponents`:
  - `AtlasResourceTable`
  - `AtlasResourceForm`
  - `AtlasResourceShow`
  - `AtlasFieldRenderer`
  - `AtlasActionRunner`
- `supportedStates`: loading, empty, error, success, disabled, hidden
- `customizationModes`: slots, class maps, theme tokens
- `ownershipModes`: controlled and uncontrolled table state

### Invariants

- Applies equally to current and future adapters.
- Encodes explicit form mode and authorization rendering semantics.
- Must be testable independent of framework-specific rendering syntax.

### Relationships

- Verified by `adapter-testing`
- Adopted by many `Adapter Package` instances

## Resource Input Contract

Represents the canonical adapter input used to identify a resource.

### Fields

- `acceptedValues`:
  - resource class
  - registered resource instance
  - `uriKey`
- `normalizedOutput`: canonical resource reference resolved against
  `Atlas.runtime()`

### Invariants

- All adapter components use one `resource` input name.
- Normalization happens before rendering-specific logic.
- Invalid resource inputs fail with descriptive errors.

### State Transitions

- `unresolved` -> `resolved`
- `unresolved` -> `error`

## Table State Contract

Represents list-view state owned by the adapter or the host application.

### Fields

- `search`
- `filters`
- `sort`
- `page`
- `perPage`
- `selectedRows`
- `loading`
- `error`
- `ownershipMode`: `controlled` or `uncontrolled`
- `initialValues`
- `changeEvents`

### Invariants

- Supports both controlled and uncontrolled ownership modes.
- Query/cache updates synchronize loading and error state.
- State transitions do not require routing integration.

### State Transitions

- `idle` -> `loading`
- `loading` -> `success`
- `loading` -> `error`
- `success` -> `loading` on refresh or filter/sort/page changes

## Form Mode Contract

Represents the explicit workflow intent of a resource form.

### Fields

- `mode`: `create` or `edit`
- `recordId`: optional
- `record`: optional
- `initialValues`
- `values`
- `dirty`
- `validationErrors`
- `submitting`
- `submitResult`

### Invariants

- `mode` is explicit and never inferred from record presence.
- Edit workflows may load by id or consume an existing record.
- Validation errors and dependency visibility are part of form state.

### State Transitions

- `create` or `edit` -> `loading` record/dependencies when needed
- `ready` -> `submitting`
- `submitting` -> `success`
- `submitting` -> `error`

## Authorization Rendering Contract

Represents the shared rendering outcome for authorization decisions.

### Fields

- `visible`: boolean
- `executable`: boolean
- `renderState`: `hidden`, `disabled`, or `active`

### Invariants

- `visible = false` implies `renderState = hidden`
- `visible = true` and `executable = false` implies `renderState = disabled`
- Adapters do not invent additional authorization semantics beyond core
  resolution

### Relationships

- Consumed by all required adapter component surfaces
- Verified by shared behavior tests

## Styling Theme Contract

Represents styling customization inputs shared across adapter components.

### Fields

- `defaultClasses`: Tailwind utility class defaults
- `classMap`: partial override object keyed by component region/state
- `themeTokens`: semantic tokens mapped to concrete class values
- `overrideMode`: merge or replace behavior per surface

### Invariants

- Basic usage works with default classes alone.
- Class maps and theme tokens do not require a global CSS file.
- Styling customization never changes core resource semantics.

### Relationships

- Consumed by all visual component surfaces
- Implemented in Vue via `useAtlasTheme`

## Customization Slot

Represents application-owned rendering overrides exposed by the adapter.

### Fields

- `surface`: component region being customized
- `slotProps`: typed state/value/action context
- `fallbackBehavior`: default adapter rendering when slot is not provided

### Invariants

- Slot props expose resource semantics without requiring consumers to reimplement
  core behavior.
- Missing slots fall back to default rendering.
- Slots may fully override presentation while preserving behavior contracts.

### Relationships

- Attached to `AtlasResourceTable`, `AtlasResourceForm`, `AtlasResourceShow`,
  `AtlasFieldRenderer`, and `AtlasActionRunner`
