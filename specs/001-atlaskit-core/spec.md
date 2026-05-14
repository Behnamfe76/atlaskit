# Feature Specification: AtlasKit Core Engine

**Feature Branch**: `001-atlaskit-core`

**Created**: 2026-05-14

**Status**: Draft

**Input**: User description: "Build AtlasKit Core, a framework-agnostic
frontend resource engine for creating Nova-like admin systems powered by APIs."

## Clarifications

### Session 2026-05-14

- Q: How should AtlasKit Core handle duplicate resource `id` or `uriKey`
  values during startup registration? → A: Duplicate resource `id` or `uriKey`
  causes startup registration to fail with a descriptive error.
- Q: Where should field visibility and page eligibility be resolved? → A: Core
  fully resolves field visibility and page eligibility before adapters render.
- Q: How should AtlasKit Core combine frontend configuration and API-provided
  abilities for authorization? → A: Authorization can merge frontend
  configuration and API-provided abilities, with deny overriding allow on
  conflict.
- Q: How broad must API response normalization be in the first release? → A:
  Normalize REST and GraphQL responses in the first release into shared
  canonical result shapes.
- Q: What plugin boundaries apply in the first release? → A: Plugins in the
  first release may register only core engine capabilities; adapter-specific
  extension hooks are deferred with future adapter packages.
- Q: What query and cache behavior belongs in core in the first release? → A:
  First-release query and cache support includes reads, writes, invalidation,
  and optimistic updates as core behavior.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Define Admin Resources Once (Priority: P1)

As a frontend developer, I want to define an admin resource once and register it
during application setup so that list, detail, create, and edit experiences can
be generated consistently from the same source of truth.

**Why this priority**: A reusable resource definition is the foundation of the
product. Without it, the engine cannot reduce duplicated admin setup work.

**Independent Test**: Register a sample resource with identity, labels,
navigation metadata, searchable fields, page references, and endpoint settings,
then confirm the engine exposes the complete metadata needed to drive index,
show, create, and edit experiences without redefining the resource elsewhere.

**Acceptance Scenarios**:

1. **Given** a developer defines a resource with its identifiers, labels, page
   references, and searchable fields, **When** the resource is registered
   during startup, **Then** the engine makes that resource available through a
   central registry for downstream page generation.
2. **Given** a developer overrides the default endpoint path or pagination
   behavior for a resource, **When** the resource metadata is requested,
   **Then** the override is returned instead of the default derived value.

---

### User Story 2 - Configure Fields and Business Rules (Priority: P2)

As a frontend developer, I want fields, validation, localization, permissions,
and API response handling to be declared through the resource definition so that
admin behavior remains consistent across pages and locales.

**Why this priority**: Field behavior and cross-cutting rules determine whether
the engine can model real-world admin workflows without custom page logic.

**Independent Test**: Define a resource with multiple field types, visibility
rules, validation rules, locale content, and authorization settings, then
confirm the engine resolves the correct field configuration and normalized data
for different pages and contexts.

**Acceptance Scenarios**:

1. **Given** a developer configures fields with visibility, defaults, help
   text, placeholders, dependency rules, and validation rules, **When** the
   engine resolves a page definition, **Then** it returns only the fields and
   metadata relevant to that page and context.
2. **Given** an API returns resource data in paginated or non-paginated form,
   **When** the engine processes the response, **Then** it returns a consistent
   internal shape that preserves records, pagination state, and error details.
3. **Given** localization and authorization are configured, **When** the active
   locale or ability context changes, **Then** the engine updates labels,
   formatting metadata, and permission results without redefining the resource.

---

### User Story 3 - Extend and Scaffold the Engine (Priority: P3)

As a frontend developer, I want to extend the engine with plugins and scaffold
new resources from a command so that teams can standardize customization and
start new admin modules quickly.

**Why this priority**: Extensibility and scaffolding increase adoption across
teams, but they depend on the core resource and field model working first.

**Independent Test**: Install a plugin that registers at least one new engine
capability and use the command-line generator to create a starter resource, then
confirm both outputs are usable without manual restructuring.

**Acceptance Scenarios**:

1. **Given** a third-party plugin registers additional engine capabilities,
   **When** the application starts, **Then** those capabilities become
   available through the same registries and contracts as built-in features.
2. **Given** a developer runs the resource generator with a resource name,
   **When** the command completes, **Then** a starter resource definition is
   created from a maintained template and is ready for project-specific edits.

### Edge Cases

- What happens when two resources attempt to register the same unique resource
  identifier or URI key?
- How does the system handle field dependencies that reference missing fields,
  circular dependencies, or asynchronous dependency failures?
- What happens when a resource mixes local ability rules with abilities returned
  from an API and the results conflict?
- How does localization behave when a translation key, plural form, or locale
  file is missing for the active language?
- What happens when an API response does not match any supported collection or
  pagination shape?
- How does the generator behave when a requested resource name would overwrite
  an existing file?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST allow developers to define admin resources as
  reusable class-based definitions that can be registered during application
  startup.
- **FR-002**: The system MUST support resource metadata for identifiers, names,
  URI keys, singular and plural labels, page or route references, searchable
  fields, pagination mode, authorization settings, and endpoint overrides.
- **FR-003**: The system MUST expose resource methods for fields, actions,
  lenses, filters, metrics, and lifecycle hooks.
- **FR-004**: The system MUST include a startup-only resource registry that
  stores registered resources, resolves them by unique identity, and fails
  startup registration with a descriptive error when duplicate resource `id` or
  `uriKey` values are encountered.
- **FR-005**: The system MUST provide fluent field configuration so developers
  can declare sorting, searching, filtering, validation, visibility rules,
  dependencies, help text, placeholders, defaults, display metadata,
  serialization metadata, and custom attributes.
- **FR-006**: The system MUST support base field types for identifiers, text,
  long text, numeric values, money values, dates, single-choice values,
  multi-choice values, one-to-one relationships, many-to-many relationships,
  media uploads, key-value structures, repeatable groups, headings, and field
  wrappers.
- **FR-007**: The system MUST evaluate field visibility separately for list,
  detail, creation, and editing contexts, and MUST provide adapters with the
  final resolved field set and page eligibility results for those contexts.
- **FR-008**: The system MUST support field dependencies, including asynchronous
  dependency resolution, without requiring page-specific rewrites.
- **FR-009**: The system MUST include a validation registry with built-in
  frontend validation rules and allow developers to define rules using both
  string syntax and typed rule objects.
- **FR-010**: The system MUST allow developers to register custom validation
  rules through the same validation registry used by built-in rules.
- **FR-011**: The system MUST provide localization with a default English
  experience and support additional locale definitions, locale switching,
  fallback behavior, interpolation, pluralization, formatting metadata, and RTL
  metadata.
- **FR-012**: The system MUST provide a configurable API client abstraction that
  can resolve resource data from multiple transport styles and use derived or
  overridden resource paths.
- **FR-013**: The system MUST normalize single-record, collection, paginated,
  simple paginated, and cursor paginated REST responses into consistent
  internal result shapes for the first release. The system MUST also normalize
  GraphQL resource query and mutation responses into equivalent internal result
  shapes for the same resource workflows in the first release.
- **FR-014**: The system MUST support optional authorization that is disabled by
  default and can evaluate permissions from local configuration, API-provided
  abilities, or both together. When both sources are used, the merged result
  MUST treat any explicit deny as overriding an allow.
- **FR-015**: The system MUST emit lifecycle hooks and events for resource
  resolution, field resolution, actions, API operations, validation, and field
  dependency changes.
- **FR-016**: The system MUST provide a type-safe plugin model that allows
  third parties to register additional fields, validation rules, transports,
  authorization providers, localization providers, actions, lenses, filters,
  and metrics. First-release plugins MUST extend only core engine capabilities
  and MUST NOT depend on adapter-specific rendering hooks.
- **FR-017**: The system MUST provide framework-agnostic query and state
  management for resource data, including cache, invalidation, loading state,
  error state, pagination state, optimistic updates, query keys, subscription
  support for adapters, and write workflows as first-release core behavior.
- **FR-018**: The system MUST include a command-line generator that creates a
  starter resource definition from a maintained template.
- **FR-019**: The first release MUST focus on the shared engine and generator
  only, and MUST exclude adapter implementations for specific UI frameworks.

### Constitution Alignment *(mandatory)*

- **Core Boundary**: This feature defines the shared engine and generator only.
  The shared engine remains free of rendering responsibilities, and framework
  adapter packages are explicitly out of scope for this release. Core owns
  visibility and page eligibility resolution; adapters consume resolved results
  and do not reinterpret those rules. Plugin extension hooks are limited to
  core engine contracts until adapter packages exist.
- **Public API Impact**: This feature introduces public contracts for resource
  definitions, field definitions, registries, validation rules, localization,
  authorization, transport, events, state queries, plugins, and generator
  outputs.
- **Domain Coverage**: The feature covers resource metadata, field behavior,
  validation, localization, authorization, transport, normalization, lifecycle
  hooks, events, state and cache management, plugins, and registries.
- **Normalization/Plugin Impact**: The feature establishes the standard shapes
  used for REST and GraphQL resource responses in the first release and the
  registration model used for first-party and third-party extensions.
- **Verification Scope**: Validation must cover the public contracts for
  resources, fields, registries, validation rules, localization behavior,
  authorization behavior, response normalization, plugin registration, lifecycle
  hooks, state transitions, and generator output.

### Key Entities *(include if feature involves data)*

- **Resource Definition**: A reusable admin resource that describes identity,
  labels, page references, searchable attributes, transport behavior, and the
  methods that expose fields and related capabilities.
- **Field Definition**: A configurable unit of resource input or display
  behavior that includes visibility, validation, defaults, formatting, and
  dependencies.
- **Resource Registry Entry**: A startup-registered record that links a unique
  resource identity to its definition and lookup metadata.
- **Validation Rule**: A reusable rule definition that can be referenced by
  shorthand text or a typed rule object and evaluated against field input.
- **Locale Bundle**: A named language package containing translations, fallback
  behavior, formatting metadata, and text direction metadata.
- **Normalized Resource Result**: A consistent data shape representing records,
  metadata, pagination state, and errors for supported first-release REST and
  GraphQL response formats.
- **Ability Context**: A set of permission signals from local configuration,
  remote abilities, or both that determine which operations are allowed, with
  deny results taking precedence during conflict resolution.
- **Plugin Registration**: A packaged extension that adds new engine
  capabilities through typed registries and shared contracts, without using
  adapter-specific rendering hooks in the first release.
- **Query State Record**: A cacheable unit of resource retrieval state that
  tracks loading, data, errors, pagination, optimistic changes, invalidation,
  write operations, and subscription listeners.
- **Generator Template Output**: A starter resource definition created from a
  command and intended for further project-specific customization.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In usability testing, at least 90% of target developers can
  define, register, and inspect a basic admin resource for list, detail,
  creation, and editing workflows in under 30 minutes using only project
  documentation and the generator.
- **SC-002**: A developer can configure a resource containing at least 25 fields
  with mixed visibility, validation, dependency, and formatting rules without
  needing duplicate definitions for each page flow.
- **SC-003**: Teams can connect standard single-record and collection-based
  admin workflows to supported API response shapes without writing page-specific
  response mapping logic in at least 90% of common CRUD scenarios.
- **SC-004**: Teams can switch among at least three locales, including one
  right-to-left locale, and keep labels, formatting, and page behavior
  consistent without redefining resources.
- **SC-005**: A team can add at least one plugin-provided capability and
  generate a new starter resource in under 5 minutes during a documented setup
  exercise.

## Assumptions

- Frontend developers are the primary users and are comfortable working with
  reusable class-based configuration in their projects.
- The first release targets API-driven admin use cases and does not include
  built-in rendering packages for specific UI frameworks.
- Applications will register resources during startup and do not need end users
  to create or modify resources at runtime.
- Resource operations are backed by external APIs that can provide single-item,
  collection, or paginated REST results in the first release.
- Teams expect optional authorization and may choose local rules, remote
  abilities, or a combination depending on their application.
