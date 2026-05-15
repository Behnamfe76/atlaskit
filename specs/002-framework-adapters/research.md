# Research: Framework Adapter Packages

## Shared Package Strategy

**Decision**: Add two shared packages: `packages/adapter-contracts` for runtime
contracts/utilities and `packages/adapter-testing` for reusable adapter
behavior tests and fixtures.

**Rationale**: The clarified specification separates framework-agnostic runtime
contracts from framework-specific rendering code. A dedicated testing package
keeps behavior parity reusable across future adapters without coupling those
tests to Vue internals or the existing `packages/testing` fixtures.

**Alternatives considered**:

- Put all shared logic into `@atlaskit/vue`: rejected because future adapters
  would depend on Vue code or duplicate behavior.
- Use only one shared package: rejected because runtime contracts and reusable
  behavior tests have different consumers and dependency shapes.
- Reuse `packages/testing` only: rejected because adapter behavior contracts are
  not generic core fixtures and need their own versioned surface.

## Future Adapter Package Scope

**Decision**: Create minimal placeholder packages for `dom`, `react`,
`angular`, `svelte`, and `solid` in first delivery.

**Rationale**: Placeholder packages make the intended workspace topology
explicit and let planning, release configuration, and documentation reference
real package locations without implying implemented runtime behavior.

**Alternatives considered**:

- Documentation only: rejected because the plan explicitly extends the monorepo
  with package directories and names.
- Full source/test skeletons for every adapter: rejected because that would
  imply implementation choices before those adapters are researched.

## Resource Reference Contract

**Decision**: All adapter components accept one `resource` prop that may be a
resource class, a registered resource instance, or a `uriKey`, and that input
is normalized through shared adapter utilities.

**Rationale**: One normalized prop keeps the public API stable across
frameworks while preserving the ergonomic options expected by application
developers. Shared resolution also avoids each adapter inventing its own lookup
conventions.

**Alternatives considered**:

- Accept only `uriKey`: rejected because class and instance references are
  already first-class in core authoring workflows.
- Separate props for each reference form: rejected because it complicates
  public APIs and tests without adding capability.

## Table State Ownership

**Decision**: `AtlasResourceTable` supports controlled and uncontrolled state
for search, filters, sort, page, and per-page values.

**Rationale**: Applications need a simple default for local usage and an
explicit ownership mode for persistence or synchronization. This dual-mode
contract can be described and tested once, then reused in all adapters.

**Alternatives considered**:

- Internal-only state: rejected because applications could not preserve or
  synchronize table state.
- Controlled-only state: rejected because it would make basic usage heavier
  than necessary.

## Form Mode Contract

**Decision**: `AtlasResourceForm` requires an explicit `mode` value of
`create` or `edit`, and any existing record data is supplied separately.

**Rationale**: Explicit mode avoids inferring behavior from route state or
record-loading timing. It makes form behavior deterministic in tests and
consistent across frameworks.

**Alternatives considered**:

- Infer mode from presence of record data: rejected because initial load order
  becomes a hidden behavior dependency.
- Separate create/edit components: rejected because it duplicates component
  surface area without changing underlying workflow semantics.

## Vue-Specific Versus Shared Utility Boundary

**Decision**: Put resource normalization, resource input resolution, shared
state/action contracts, class-map/theme-token schemas, and reusable behavior
tests in shared packages; keep Vue components, composables, emits, and slot
behavior in `@atlaskit/vue`.

**Rationale**: This aligns with the constitution’s adapter boundary rules and
keeps Vue-specific rendering concerns isolated while preserving reusable
cross-framework contracts.

**Alternatives considered**:

- Put nearly everything in shared packages: rejected because framework-native
  binding semantics still belong in the framework package.
- Keep everything in Vue: rejected because future adapters would need to fork
  runtime logic and tests.

## Authorization Rendering Behavior

**Decision**: Use a shared authorization rendering contract: items marked not
visible by core are hidden; items marked visible but not executable are
rendered disabled.

**Rationale**: This preserves core’s semantic distinction and gives adapters a
single predictable behavior model for components, slot props, and tests.

**Alternatives considered**:

- Hide all unauthorized items: rejected because it loses disabled-state UX and
  test coverage.
- Let each adapter decide: rejected because it breaks parity.

## Tailwind Styling Contract

**Decision**: Use Tailwind utility classes as the default presentation layer,
with class maps and theme tokens defined in shared schemas and consumed by Vue
theme/composable helpers.

**Rationale**: Tailwind satisfies the constitution and provides a portable
default class vocabulary. Shared class-map and token schemas let future
adapters preserve styling customization semantics without sharing Vue code.

**Alternatives considered**:

- Global CSS bundle requirement: rejected because the spec requires basic usage
  without a mandatory global stylesheet.
- Slots-only customization: rejected because class maps and theme tokens are
  explicitly required.

## Query Subscription Binding

**Decision**: Bind Vue adapter state to `@atlaskit/core` through
`Atlas.runtime()`, registry/resource resolution, and `QueryClient.subscribe()`,
using `ref`, `computed`, and `watch` to bridge records into component and
composable state.

**Rationale**: Core already exposes the runtime, registries, and query
subscriptions needed by adapters. This keeps the first delivery narrow and
avoids inventing a parallel state engine inside Vue.

**Alternatives considered**:

- Introduce an adapter-specific query abstraction first: rejected because core
  already has a query subscription API.
- Poll query state from components: rejected because it would be less reactive
  and more error-prone than subscriptions.
