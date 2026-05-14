# Contract: Atlas Core Public API

## Purpose

Define the public authoring and bootstrap contracts exposed by `@atlaskit/core`
in the first release.

## Configuration Contract

### `Atlas.configure(config)`

- Accepts a single startup configuration object
- May be called once during application bootstrap
- Registers resources, field types, locales, plugins, validation rules, and
  transport/authorization providers
- Returns an immutable runtime handle or singleton access point for later
  resolution
- MUST fail with a descriptive error when duplicate resource `id` or `uriKey`
  values are registered

### Required Configuration Areas

- Resource registration
- Transport configuration
- Localization defaults
- Optional authorization configuration
- Optional plugin registration
- Query/cache configuration

## Resource Authoring Contract

### `Resource`

- Exposes static identity and metadata for `id`, `name`, `uriKey`, `labels`,
  page references, pagination mode, endpoint overrides, and authorization
  options
- Exposes instance or static methods for:
  - `fields()`
  - `actions()`
  - `lenses()`
  - `filters()`
  - `metrics()`
  - lifecycle hooks

## Field Authoring Contract

### Base field behavior

- All fields expose a fluent authoring API beginning with `make()`
- All fields may declare sortable, searchable, filterable, validation,
  visibility, dependency, default, help, placeholder, attribute, display, and
  serialization metadata when applicable
- Core resolves final visibility and page eligibility before adapters consume
  field results

### Required built-in field families

- `ID`
- `Text`
- `Textarea`
- `Number`
- `Currency`
- `Date`
- `Select`
- `MultiSelect`
- `BelongsTo`
- `BelongsToMany`
- `Image`
- `File`
- `Video`
- `KeyValue`
- `Repeater`
- `Heading`
- `FieldWrapper`

## Registry Contracts

### ResourceRegistry

- Registers resource classes at startup only
- Provides typed lookup by resource `id`, `uriKey`, and class reference
- Rejects duplicate registrations

### FieldRegistry

- Registers built-in and plugin-provided field types
- Resolves type keys to constructors/factories and capability metadata

### ValidationRegistry

- Accepts string and typed rule authoring input
- Normalizes all rules to typed rule objects internally
- Allows custom rule registration

### LocaleRegistry

- Stores locale bundles and locale metadata
- Supports fallback locale resolution and RTL metadata lookup

### PluginRegistry

- Registers core-only plugin capabilities
- Rejects adapter-specific hooks in the first release

## Transport Contracts

### ApiClient

- Supports shared request semantics independent of transport strategy
- May be backed by REST or GraphQL client implementations
- Uses resource-derived default paths unless explicitly overridden

### ResponseNormalizer

- Must normalize first-release REST responses for:
  - single resource
  - collection
  - paginate
  - simple paginate
  - cursor paginate
- Must normalize first-release GraphQL resource query and mutation payloads
  into equivalent canonical shapes for:
  - single resource
  - collection
  - paginate-like connections
  - cursor-based connections
- Must preserve source-specific metadata separately from canonical fields

## Authorization Contract

### AuthorizationManager

- Disabled by default
- Can consume local abilities, remote abilities, or both
- Applies deny-over-allow precedence when both sources contribute

## State Contract

### Query/Cache Engine

- Must support query keys, cache storage, invalidation, loading/error states,
  pagination state, writes, optimistic updates, and adapter-friendly
  subscriptions

## Event Contract

### EventBus

- Publishes lifecycle and domain events for:
  - resource resolution
  - field resolution
  - actions
  - transport operations
  - validation
  - dependency resolution
