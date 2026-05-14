# Data Model: AtlasKit Core Engine

## ResourceDefinition

### Purpose

Represents a Nova-like admin resource class registered during application
startup and used as the canonical source of metadata for list, detail, create,
and edit experiences.

### Fields

- `id`: unique resource identifier; must be globally unique within the
  `ResourceRegistry`
- `name`: canonical resource class or display name
- `uriKey`: resource path key; must be globally unique within the
  `ResourceRegistry`
- `labels`: singular and plural labels plus optional localized overrides
- `pages`: route or page references for index, show, create, edit
- `searchable`: searchable field identifiers
- `pagination`: selected pagination mode (`paginate`, `simplePaginate`,
  `cursorPaginate`, `collection`)
- `authorization`: optional authorization configuration
- `endpoints`: derived or explicit transport paths for collection and item
  operations
- `fields()`: returns field definitions
- `actions()`: returns action definitions
- `lenses()`: returns lens definitions
- `filters()`: returns filter definitions
- `metrics()`: returns metric definitions
- `hooks()`: returns lifecycle hook registrations

### Relationships

- One `ResourceDefinition` has many `FieldDefinition` instances
- One `ResourceDefinition` has many `ActionDefinition`, `LensDefinition`,
  `FilterDefinition`, and `MetricDefinition` instances
- One `ResourceDefinition` is registered by exactly one `ResourceRegistry`
  entry

## FieldDefinition

### Purpose

Represents a configurable field unit resolved by core before adapter rendering.

### Fields

- `type`: field type key registered with `FieldRegistry`
- `attribute`: backing resource attribute name
- `label`: human-readable field label
- `sortable`: boolean
- `searchable`: boolean
- `filterable`: boolean
- `rules`: normalized typed validation rules
- `visibility`: page visibility rules for index, detail, create, edit
- `dependencies`: sync and async dependency descriptors
- `defaultValue`: optional default value or resolver
- `placeholder`: optional placeholder content
- `helpText`: optional explanatory content
- `attributes`: arbitrary serializable metadata
- `displayMeta`: formatting metadata for adapters
- `serializationMeta`: API serialization hints

### Relationships

- Many `FieldDefinition` instances belong to one `ResourceDefinition`
- Many `FieldDefinition` instances may reference one another via
  `FieldDependency`
- Each `FieldDefinition` is resolved through a `FieldTypeDefinition`

## FieldTypeDefinition

### Purpose

Describes a field class or factory registered with the `FieldRegistry`.

### Fields

- `key`: unique field type key
- `className`: exported field class name
- `capabilities`: supported fluent features and metadata
- `factory`: constructor or static `make` contract
- `pluginSource`: built-in or plugin origin

## ValidationRuleDefinition

### Purpose

Represents a typed validation rule after author input normalization.

### Fields

- `name`: canonical rule name
- `parameters`: normalized rule arguments
- `messageKey`: localization key for failures
- `validator`: execution strategy
- `source`: built-in or custom rule source

### Relationships

- Many `ValidationRuleDefinition` instances can be attached to one
  `FieldDefinition`
- One `ValidationRuleDefinition` may be registered in the `ValidationRegistry`

## LocaleBundle

### Purpose

Stores locale-specific strings and formatting metadata.

### Fields

- `code`: locale code such as `en`, `fa`, `ar`
- `messages`: translation map
- `fallbackCode`: fallback locale code
- `direction`: `ltr` or `rtl`
- `pluralRules`: pluralization configuration
- `dateFormats`: named date formatting presets
- `currencyFormats`: named currency formatting presets

## AuthorizationPolicySet

### Purpose

Captures merged authorization signals for resources and actions.

### Fields

- `enabled`: boolean
- `localAbilities`: optional locally configured ability map
- `remoteAbilities`: optional API-provided ability map
- `resolvedAbilities`: merged map with deny precedence
- `sourceMode`: local, remote, merged, disabled

## NormalizedResourceResult

### Purpose

Provides the internal canonical shape for first-release REST and GraphQL
resource results.

### Fields

- `kind`: `single`, `collection`, `paginate`, `simplePaginate`,
  `cursorPaginate`
- `data`: normalized records
- `meta`: shared metadata bag
- `pagination`: optional pagination payload
- `errors`: optional normalized error payload
- `sourceMeta`: preserved source-specific metadata
- `transport`: `rest` or `graphql`

## QueryRecord

### Purpose

Tracks framework-agnostic resource data state for reads and writes.

### Fields

- `queryKey`: canonical query identifier
- `status`: idle, loading, success, error, updating
- `data`: current resolved value
- `error`: last error
- `paginationState`: current pagination cursor/page state
- `optimisticState`: pending optimistic patch information
- `subscribers`: subscription set or count
- `updatedAt`: timestamp
- `invalidated`: boolean

## PluginDefinition

### Purpose

Defines a type-safe plugin that extends core engine capabilities only.

### Fields

- `name`: plugin identifier
- `version`: plugin version
- `register()`: extension entrypoint
- `capabilities`: declared registry contributions
- `dependencies`: optional plugin dependency list
- `origin`: package source metadata

### Relationships

- One `PluginDefinition` may contribute multiple entries to `FieldRegistry`,
  `ValidationRegistry`, `LocaleRegistry`, `PluginRegistry`, transport
  providers, authorization providers, and other extensible core registries

## GeneratedResourceStub

### Purpose

Represents the CLI output artifact created from templates.

### Fields

- `resourceName`: developer-provided resource name
- `className`: generated class name
- `targetPath`: output filesystem path
- `templateVersion`: stub version metadata
- `overwriteMode`: replace, fail, or custom handling policy

## State Transitions

### Resource Registration

- `unregistered` → `registered`
- `registered` → `registration_failed_duplicate`

### Query Lifecycle

- `idle` → `loading`
- `loading` → `success`
- `loading` → `error`
- `success` → `updating`
- `updating` → `success`
- `updating` → `error`
- `success` → `invalidated`
- `invalidated` → `loading`

### Authorization Mode

- `disabled` → `local`
- `disabled` → `remote`
- `disabled` → `merged`

## Validation Rules Derived From Requirements

- Resource `id` and `uriKey` uniqueness is mandatory
- Field visibility must resolve deterministically for index, detail, create,
  and edit contexts
- Validation strings must normalize into typed rule definitions before
  execution
- REST and GraphQL normalization must support single, collection, paginate,
  simplePaginate, and cursorPaginate shapes
- Authorization merge must apply deny precedence when local and remote
  abilities conflict
