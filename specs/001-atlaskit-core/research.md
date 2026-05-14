# Research: AtlasKit Core Engine

## Build Tooling

### Decision

Use `tsup` as the package build tool for `@atlaskit/core`, `@atlaskit/cli`,
and `@atlaskit/testing`.

### Rationale

`tsup` keeps the monorepo bootstrap simple, supports fast TypeScript builds for
multiple packages, emits declaration files, and fits a library-plus-CLI setup
without extra abstraction overhead. It is a lower-friction choice for a green
field workspace than `unbuild`.

### Alternatives considered

- `unbuild`: stronger preset conventions for library packaging, but adds
  unnecessary build abstraction for the first release.
- Raw `tsc` only: simplest on paper, but weaker for dual-format packaging and
  ergonomic CLI builds.

## Monorepo Layout

### Decision

Use a `pnpm` workspace monorepo with `packages/core`, `packages/cli`,
`packages/testing`, and `examples/playground`.

### Rationale

This structure aligns with the package boundaries in the specification, keeps
published packages isolated, and allows the playground to validate real package
consumption without becoming a rendering adapter.

### Alternatives considered

- Single package repository: rejected because CLI, core, and testing utilities
  have different release and dependency surfaces.
- Separate repositories: rejected because early iteration benefits from shared
  versioning, shared lint/test tooling, and local package linking.

## Core Bootstrap Architecture

### Decision

Expose a static `Atlas.configure(config)` entrypoint backed by a lightweight
service container or static service locator that wires registries and shared
services exactly once during startup.

### Rationale

This preserves the OOP configuration style the product requires while avoiding
global mutable singletons for every subsystem. It also gives adapters a single
stable handoff contract later.

### Alternatives considered

- Pure functional factory API: rejected because it weakens the class-centric,
  Nova-like authoring model.
- Full dependency injection container framework: rejected as too heavy for the
  first release.

## Registry Design

### Decision

Model `ResourceRegistry`, `FieldRegistry`, `ValidationRegistry`,
`LocaleRegistry`, and `PluginRegistry` as typed registries with duplicate
protection, explicit extension methods, and immutable read APIs after
configuration.

### Rationale

The registries are central to the first release. Typed registration plus
duplicate failure semantics match the clarified specification and reduce runtime
ambiguity for adapters and plugins.

### Alternatives considered

- Plain mutable maps exposed publicly: rejected because they weaken safety and
  typing.
- Convention-based auto-discovery: rejected because startup registration is an
  explicit requirement.

## Validation Model

### Decision

Accept both string rules and typed `Rule.*` objects in author-facing APIs, then
normalize all rule input into typed internal rule objects before validation
execution.

### Rationale

This directly satisfies the constitution and specification while preserving a
familiar Laravel-inspired authoring style and enabling consistent validation
pipelines.

### Alternatives considered

- String rules only: rejected because it limits extensibility and type safety.
- Typed rules only: rejected because it removes the shorthand authoring mode
  explicitly required by the spec.

## Localization Model

### Decision

Provide English defaults in core and support additional locale bundles through a
`LocaleRegistry` plus an `I18n` service that owns fallback selection,
interpolation, pluralization, RTL metadata, date formatting, and currency
formatting.

### Rationale

A registry-plus-service split keeps locale storage distinct from translation and
formatting behavior, which improves plugin extension and testing.

### Alternatives considered

- Thin wrapper around consumer i18n libraries: rejected because core must own
  consistent behavior across future adapters.
- Translation strings only: rejected because formatting and directionality are
  first-class requirements.

## Transport and Normalization

### Decision

Define a shared `ApiClient` contract with REST and GraphQL client adapters and
ship first-release normalization for REST and GraphQL single, collection,
paginate, simple paginate, and cursor paginate resource workflows through a
dedicated `ResponseNormalizer`.

### Rationale

This keeps the transport abstraction and normalization behavior aligned with the
constitution by ensuring all first-release transports converge on the same
internal shapes.

### Alternatives considered

- REST-only transport layer: rejected because GraphQL support is in scope.
- GraphQL transport without normalization: rejected because it conflicts with
  the constitution and would fracture adapter-facing contracts.

## Authorization Conflict Handling

### Decision

Implement authorization as disabled-by-default and merge local configuration and
API-provided abilities with explicit deny taking precedence over allow.

### Rationale

This is the safest merge rule and matches the clarification that prevents
accidental privilege escalation.

### Alternatives considered

- API-only abilities: rejected because the spec requires both sources.
- Local override on conflict: rejected because it increases security risk.

## Query and Cache Engine

### Decision

Implement a framework-agnostic query/cache engine in core that supports reads,
writes, invalidation, optimistic updates, pagination state, query keys, and
adapter-friendly subscriptions in the first release.

### Rationale

If mutation orchestration lives outside core, future adapters would diverge on
cache semantics. The first release must establish one source of truth for data
state transitions.

### Alternatives considered

- Read-only cache in first release: rejected by clarification because it would
  defer too much engine behavior.
- Adapter-owned mutation orchestration: rejected because it breaks core
  consistency.

## Plugin Boundary

### Decision

Support only core-engine plugin extension points in the first release and defer
adapter-specific hooks until adapter packages exist.

### Rationale

This cleanly preserves the constitution’s core/adapter separation and prevents
accidental UI coupling through plugins.

### Alternatives considered

- Adapter-aware plugins immediately: rejected because no adapter contracts exist
  yet.
- No plugins in first release: rejected because plugin extensibility is a core
  requirement.

## Testing Strategy

### Decision

Use `vitest` across packages, with `@atlaskit/testing` reserved for shared
fixtures, registry builders, transport mocks, and reusable assertions.

### Rationale

This supports the constitution’s mandatory verification requirement while
avoiding test duplication across core and CLI.

### Alternatives considered

- Package-local helpers only: rejected because registry, transport, and resource
  fixtures will be shared heavily.
- End-to-end style browser testing first: rejected because no UI adapter exists
  yet.
