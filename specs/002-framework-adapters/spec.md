# Feature Specification: Framework Adapter Packages

**Feature Branch**: `002-framework-adapters`

**Created**: 2026-05-15

**Status**: Draft

**Input**: User description: "Add framework adapter packages to AtlasKit. The
first implementation target is @atlaskit/vue. Future adapter packages are
@atlaskit/react, @atlaskit/dom, @atlaskit/angular, @atlaskit/svelte, and
@atlaskit/solid."

## Clarifications

### Session 2026-05-15

- Q: How should adapter components reference the target resource? → A: Accept
  one `resource` prop that may be a resource class, registered resource
  instance, or `uriKey`, and normalize through shared adapter utilities.
- Q: How should `AtlasResourceTable` preserve sorting, filtering, search, and
  pagination state? → A: Support both uncontrolled internal state with initial
  values and controlled external state with change events.
- Q: How should `AtlasResourceForm` represent create vs edit behavior? → A:
  Require an explicit `mode` prop with `create` or `edit`, with record data
  provided separately when needed.
- Q: What belongs in `@atlaskit/vue` versus shared adapter utilities? → A: Put
  resource normalization, resource input resolution, shared state/action
  contracts, class-map/theme-token schemas, and reusable adapter behavior
  tests in shared utilities; keep Vue components, composables, emits, and
  slots in `@atlaskit/vue`.
- Q: How should adapters render unauthorized resources, fields, and actions?
  → A: Use shared behavior rules: hide items when core marks them not visible,
  disable items when core marks them visible-but-not-executable, and expose
  both states through the adapter contract.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Render Core Resources in an App (Priority: P1)

As an application developer, I want to render AtlasKit resources inside my
existing application using reusable adapter components so that I can deliver
resource list, create, edit, show, and action experiences without rebuilding
core resource behavior in every page.

**Why this priority**: This is the first end-user value of adapter packages.
Without a working rendering adapter, AtlasKit remains a headless engine.

**Independent Test**: Register a resource in `@atlaskit/core`, mount the
adapter’s table, form, show, field, and action components inside an application
page, and confirm the application can complete common resource workflows
without custom rendering logic for the same behaviors.

**Acceptance Scenarios**:

1. **Given** an application has registered a resource in AtlasKit core,
   **When** the developer mounts `AtlasResourceTable`, **Then** the application
   sees the resource’s list view with loading, empty, error, sorting, search,
   filtering, pagination, field visibility, and row actions resolved from core
   semantics.
2. **Given** an application chooses either adapter-managed defaults or
   application-managed table state, **When** sorting, search, filtering, or
   pagination changes, **Then** the table preserves the selected ownership
   model and exposes the resulting state updates consistently.
3. **Given** an application mounts `AtlasResourceForm` for create or edit
   workflows, **When** a user changes field values, **Then** the form reflects
   defaults, validation errors, field dependencies, async dependency results,
   authorization visibility, and submission actions according to the core
   resource definition.
4. **Given** an application provides form workflow intent explicitly,
   **When** the form is mounted before or after record data loads, **Then** the
   adapter preserves the declared create or edit mode independently from record
   presence.
5. **Given** an application mounts `AtlasResourceShow`,
   `AtlasFieldRenderer`, or `AtlasActionRunner`, **When** the underlying
   resource metadata changes or the query state updates, **Then** the rendered
   output stays synchronized with the same core resource semantics used by the
   other adapter components.

---

### User Story 2 - Customize Rendering Without Forking Behavior (Priority: P2)

As an application developer, I want to customize field output, actions, and
styling through adapter-level extension points so that the rendered experience
matches my application design while preserving shared AtlasKit behavior.

**Why this priority**: Teams need flexibility to fit AtlasKit into real
applications, but customization loses value if it forces them to fork core
logic or adapter internals.

**Independent Test**: Mount the adapter components with custom class settings
and custom field or action presentation, then confirm the application can
change the visual output and selected subcontent without losing loading,
validation, authorization, or action behavior.

**Acceptance Scenarios**:

1. **Given** an application supplies custom field or action rendering,
   **When** the adapter renders the same resource workflow, **Then** the
   customized output preserves the same visibility, validation, and action
   semantics provided by AtlasKit core.
2. **Given** an application overrides component styling,
   **When** the adapter renders list, form, show, field, or action content,
   **Then** default styling remains available while class overrides and theme
   tokens can adjust presentation without changing business behavior.

---

### User Story 3 - Keep Adapters Consistent Across Frameworks (Priority: P3)

As an AtlasKit maintainer, I want adapter packages to follow one shared
behavior contract so that future framework adapters can deliver the same
resource semantics and developer expectations as the first shipped adapter.

**Why this priority**: Adapter sprawl becomes expensive if each framework
interprets AtlasKit semantics differently. A shared contract keeps the product
coherent as more adapters are added.

**Independent Test**: Define a shared behavior suite for the required adapter
surfaces, validate the first shipped adapter against it, and confirm future
adapter packages can be measured against the same expected outcomes.

**Acceptance Scenarios**:

1. **Given** AtlasKit defines required adapter components and supported
   resource states, **When** a new framework adapter is introduced, **Then** it
   is evaluated against the same shared behavior contract used by the first
   adapter.
2. **Given** an application owns its own pages and routing,
   **When** it adopts an AtlasKit adapter, **Then** the adapter integrates into
   those existing application surfaces without taking ownership of routing or
   page composition.

### Edge Cases

- What happens when an adapter component is asked to render a resource that is
  not registered in AtlasKit core?
- How does the adapter behave when the current user can see a resource but not
  specific fields or actions inside a view?
- What happens when field dependency resolution or async dependency loading
  fails during form interaction?
- How does a table, form, or show view recover when query state changes from
  success to loading or error while the component is mounted?
- What happens when an application provides partial styling overrides, missing
  class maps, or incomplete theme tokens?
- How does the adapter behave when a custom field or action presentation point
  is provided for one state but not another?
- How does the adapter distinguish unauthorized items that should be hidden
  entirely from items that should remain visible but disabled?
- How are relationship fields such as `BelongsTo` and `BelongsToMany` rendered
  when related records are partially loaded, empty, or unavailable in list,
  form, and show workflows?

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST introduce framework adapter packages that allow
  application developers to render AtlasKit resources from `@atlaskit/core`
  inside their chosen application framework.
- **FR-002**: The first delivered adapter package MUST be `@atlaskit/vue`.
- **FR-003**: The system MUST reserve a shared adapter package strategy for
  future `@atlaskit/react`, `@atlaskit/dom`, `@atlaskit/angular`,
  `@atlaskit/svelte`, and `@atlaskit/solid` packages under the same adapter
  behavior contract.
- **FR-004**: Every adapter package MUST provide reusable public surfaces for
  `AtlasResourceTable`, `AtlasResourceForm`, `AtlasResourceShow`,
  `AtlasFieldRenderer`, and `AtlasActionRunner`.
- **FR-004a**: Adapter component surfaces MUST accept one `resource` input that
  may be provided as a resource class, registered resource instance, or
  `uriKey`, and MUST normalize that input through shared adapter utilities
  before rendering begins.
- **FR-005**: Adapter packages MUST render AtlasKit resource metadata, fields,
  actions, validation state, authorization visibility, and query state using
  the semantics resolved by `@atlaskit/core`.
- **FR-006**: The application MUST remain responsible for pages and routing,
  and adapter packages MUST NOT take ownership of route integration, route
  configuration, or page-level orchestration.
- **FR-007**: The first delivered adapter MUST let applications look up
  resources, observe table state, observe form state, consume field rendering
  metadata, read validation errors, run actions, and subscribe to core
  query/cache updates through framework-native bindings.
- **FR-008**: The first delivered adapter MUST support resource list workflows
  including loading, empty, error, pagination, sorting, search, filtering, row
  actions, and authorization-aware field visibility.
- **FR-008a**: `AtlasResourceTable` MUST support both uncontrolled internal
  state with initial values and controlled external state with change events
  for sorting, search, filtering, and pagination.
- **FR-009**: The first delivered adapter MUST support create and edit
  workflows including defaults, field dependencies, async dependencies,
  validation feedback, authorization-aware field visibility, submission state,
  and action execution.
- **FR-009a**: `AtlasResourceForm` MUST require an explicit `mode` input with
  `create` or `edit`, and any existing record data used for edit workflows MUST
  be supplied independently from the mode declaration.
- **FR-010**: The first delivered adapter MUST support read-only resource
  detail workflows and single-field rendering workflows using the same core
  field semantics used by list and form views.
- **FR-010b**: Adapter packages MUST define explicit rendering and interaction
  behavior for the current core relationship field families, including
  `BelongsTo` and `BelongsToMany`, across table, form, show, and
  field-renderer surfaces. Future relationship field families such as
  `HasMany`, if introduced later in core, are outside this delivery unless
  separately specified.
- **FR-010a**: Adapter packages MUST apply one shared authorization rendering
  contract: items marked not visible by core are hidden, and items marked
  visible-but-not-executable remain rendered in a disabled state that is
  exposed consistently through the adapter contract.
- **FR-011**: Adapter packages MUST allow application developers to customize
  field presentation, action presentation, and component styling without
  duplicating or redefining core behavior.
- **FR-012**: Adapter styling MUST preserve a default presentation model while
  supporting class-map overrides and theme-token based customization.
- **FR-013**: Adapter packages MUST be composed from smaller reusable
  primitives where that decomposition improves customization, testing, or
  contract reuse.
- **FR-013a**: Shared adapter utilities MUST own resource normalization,
  resource input resolution, shared state and action contracts, class-map and
  theme-token schemas, and reusable adapter behavior tests. `@atlaskit/vue`
  MUST own Vue-specific components, composables, emits, and slot surfaces.
- **FR-014**: The system MUST define one shared adapter behavior contract that
  describes how required adapter components represent resource tables, forms,
  show views, fields, actions, state transitions, and authorization outcomes.
- **FR-015**: The first delivered adapter MUST be validated against the shared
  adapter behavior contract before it is considered complete.
- **FR-016**: Future adapter packages MUST be able to adopt the same shared
  adapter behavior contract without changing AtlasKit core semantics.
- **FR-017**: The DOM adapter strategy MUST support pure JavaScript and HTML
  rendering through mount-style public surfaces without depending on a frontend
  framework when that package is later implemented.
- **FR-018**: Adapter packages MUST depend on `@atlaskit/core` rather than
  duplicating resource, validation, query, authorization, or action logic in
  framework-specific layers.

### Constitution Alignment _(mandatory)_

- **Core Boundary**: This feature adds adapter packages while preserving
  `@atlaskit/core` as the sole owner of rendering-independent behavior. Core
  does not render UI, and adapters consume resolved resource, field,
  authorization, validation, and query semantics without reimplementing them.
- **Public API Impact**: This feature introduces public adapter package
  surfaces for `@atlaskit/vue`, the required reusable rendering components,
  framework-native bindings for resource and state consumption, customization
  entry points for fields/actions/styling, a normalized `resource` input
  contract, and the shared adapter behavior contract that future adapters must
  satisfy.
- **Domain Coverage**: The feature affects adapter rendering, state/query
  consumption, field presentation, validation display, authorization
  visibility, action execution, relationship-field presentation, and
  adapter-level customization while relying on existing core capabilities for
  validation, localization, transport, events, caching, and registries.
- **Normalization/Plugin Impact**: No new response normalization model is
  introduced. Adapters consume the normalized results already produced by core.
  Plugin and registry work is limited to the extent required to let adapter
  surfaces render existing core capabilities without adding adapter-owned
  business logic.
- **Adapter Rendering Scope**: Adapter work is limited to rendering,
  framework-native state binding, component APIs, customization surfaces, and
  integration with core state/query services. Routing and pages remain owned by
  the host application and are excluded from adapter scope.
- **Shared Utility Boundary**: Shared adapter utilities own resource
  normalization, resource input resolution, shared state and action contracts,
  class-map and theme-token schemas, and reusable adapter behavior tests.
  `@atlaskit/vue` owns Vue components, composables, emits, and slot behavior
  built on top of those shared contracts.
- **Adapter Contract Surface**: The feature delivers
  `AtlasResourceTable`, `AtlasResourceForm`, `AtlasResourceShow`,
  `AtlasFieldRenderer`, and `AtlasActionRunner` as reusable dynamic components.
  The first shipped adapter is `@atlaskit/vue`; future React, DOM, Angular,
  Svelte, and Solid adapters must match the same behavior contract. The DOM
  adapter is defined as a future mount-style renderer for plain JavaScript and
  HTML. `AtlasResourceTable` specifically supports both controlled and
  uncontrolled state ownership models, and `AtlasResourceForm` uses an explicit
  create or edit mode contract.
- **Styling/Customization**: Adapter styling uses utility-class based defaults
  with class-map overrides, theme tokens, and framework-native customization
  patterns. The first shipped adapter also supports field and action
  customization through framework-native content insertion points.
- **Verification Scope**: Validation must cover shared adapter behavior
  contracts, reusable component rendering, list/form/show workflows, field
  rendering, action execution, customization surfaces, and parity between the
  first shipped adapter and future adapter expectations, including hidden
  versus disabled authorization outcomes.

### Key Entities _(include if feature involves data)_

- **Adapter Package**: A framework-specific rendering layer that consumes
  AtlasKit core semantics and exposes reusable components and bindings to host
  applications.
- **Adapter Behavior Contract**: The shared set of expected outcomes for
  resource table, form, show, field, and action rendering across all adapter
  packages.
- **Adapter Component Surface**: One of the required reusable dynamic
  components that renders a distinct AtlasKit resource workflow inside an
  application.
- **Table State Contract**: The shared adapter model for sorting, search,
  filtering, and pagination, supporting either adapter-managed internal state
  with initial values or application-managed controlled state with change
  events.
- **Adapter Binding Surface**: The framework-native mechanism used by an
  application to look up resources, observe state, receive validation data, and
  execute actions from the adapter.
- **Shared Adapter Utility**: A framework-agnostic support layer that resolves
  resource inputs, defines common state and action contracts, defines styling
  schemas, and hosts reusable adapter behavior tests for all framework
  packages.
- **Resource Input Contract**: The shared adapter input shape that accepts a
  resource class, registered resource instance, or `uriKey` and resolves it
  into a canonical resource reference before component logic runs.
- **Styling Theme Contract**: The set of default classes, class maps, and
  theme tokens that controls adapter presentation without changing core logic.
- **Customization Slot**: An application-owned presentation override for a
  field, action, or component region that preserves the same core behavior.
- **Form Mode Contract**: The explicit adapter input that declares whether a
  form is operating in `create` or `edit` mode independent of whether a record
  payload has already been loaded.
- **Authorization Rendering Contract**: The shared adapter rule that hides
  resources, fields, or actions when core marks them not visible and renders
  them disabled when core marks them visible but not executable.
- **Relationship Field Contract**: The shared adapter behavior for the current
  core relationship field families, including `BelongsTo` and `BelongsToMany`,
  across table, form, show, and single-field rendering surfaces.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: In validation scenarios, developers can mount list, form, show,
  field, and action rendering for an existing AtlasKit resource inside an
  application page in under 45 minutes without rewriting resource behavior.
- **SC-002**: The first shipped adapter supports the full required set of list,
  form, show, field, and action states for at least one representative resource
  without requiring application-owned reimplementation of validation,
  authorization, field dependencies, or query-state behavior.
- **SC-003**: Applications can change presentation through supported
  customization paths while preserving the same resource semantics across
  default and customized rendering for at least 90% of core workflow scenarios
  covered by the shared contract suite.
- **SC-004**: Future adapter implementations can be evaluated against one
  shared behavior contract, allowing maintainers to determine parity or drift
  without redefining expected resource semantics per framework.

## Assumptions

- The initial delivery includes a full `@atlaskit/vue` adapter and the shared
  behavior contract needed for later adapter packages.
- Future `@atlaskit/react`, `@atlaskit/dom`, `@atlaskit/angular`,
  `@atlaskit/svelte`, and `@atlaskit/solid` packages are defined by this
  feature’s contract but are not all required to ship in the first
  implementation pass.
- Host applications already own their route structure, page composition, and
  application shell, and they embed adapter components into those existing
  surfaces.
- `@atlaskit/core` already remains the single source of truth for resource,
  field, validation, authorization, action, and query behavior.
- Adapter verification will use a shared behavior suite so later adapters can
  be measured against the same expected outcomes established by the first
  shipped adapter.
