# Contract: Shared Adapter Behavior Tests

## Purpose

Define the reusable behavior expectations that all AtlasKit adapters must
satisfy, with `@atlaskit/vue` as the first implemented reference adapter.

## Required Shared Scenarios

### Resource Resolution

- A component resolves a `resource` prop from class, registered instance, or
  `uriKey`
- Invalid resource inputs fail with descriptive errors

### Table State

- Uncontrolled table state initializes from provided defaults
- Controlled table state emits consistent updates for search, filters, sort,
  page, and per-page changes
- Loading, empty, success, and error states render consistently

### Form State

- Form mode is explicit and preserved independently from record load timing
- Validation errors are surfaced through component output and slot props
- Async field dependency updates propagate into visible form state

### Authorization Rendering

- Hidden items do not render
- Visible-but-not-executable items render disabled
- Authorization results remain consistent across default rendering and slot
  overrides

### Styling and Customization

- Default classes render without requiring a global CSS file
- Class-map overrides replace or extend the intended component regions
- Theme tokens affect presentation without changing resource semantics
- Slots may fully override presentation while preserving behavior contracts
- Shared slot contracts expose row, cell, field, and action execution context

### Action Execution

- Record-level and bulk action contexts are supported
- Executable and disabled states are exposed consistently
- Action execution updates loading and result states predictably
- Slot-driven action rendering must still execute the same runtime semantics

## Reference Adapter Rule

- `@atlaskit/vue` is the first reference adapter
- Future `dom`, `react`, `angular`, `svelte`, and `solid` adapters must satisfy
  the same behavior scenarios unless an exception is explicitly documented and
  approved
- Future adapters must preserve the same top-level component and composable
  surface unless an approved exception is documented

## Package Boundary

Reusable behavior tests, fixtures, and assertions live in
`@atlaskit/adapter-testing`. Framework-specific mount/render setup remains in
the framework package test layer, which adapts shared scenarios to the local
test harness.
