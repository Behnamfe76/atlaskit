<!--
Sync Impact Report
- Version change: 1.0.0 -> 1.1.0
- Modified principles:
  - I. Core-Adapter Separation -> I. Core-Adapter Architecture
  - V. Mandatory Verification -> V. Shared Verification and Adapter Contract Parity
- Added sections:
  - None
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ✅ not applicable: .specify/templates/commands/*.md (directory not present in this repository)
- Follow-up TODOs:
  - None
-->

# AtlasKit Constitution

## Core Principles

### I. Core-Adapter Architecture

`@atlaskit/core` MUST remain framework-agnostic and MUST NOT render UI or
contain framework-specific code. Every framework adapter MUST depend on
`@atlaskit/core` through workspace dependencies and MUST treat core as the
single source of truth for resource, field, action, query, and state behavior.
Adapters MUST NOT duplicate or fork core logic; they may only translate core
contracts into framework-native rendering and interaction surfaces. Rationale:
AtlasKit is a reusable admin engine whose behavior must stay stable across
frameworks.

### II. TypeScript-First Public API

All public APIs MUST be strongly typed, documented, and designed around
TypeScript-first ergonomics. Core abstractions MUST favor OOP and SOLID
principles, use static configuration APIs where configuration is part of the
public contract, and preserve Nova-like naming for top-level concepts such as
`Resource`, `Field`, `Action`, `Lens`, `Filter`, and `Metric`. Adapters MUST
publish typed component, composable, and integration contracts with framework-
native typing for props, events, slots, render props, and mount APIs as
applicable. Rationale: consumer trust depends on predictable contracts,
discoverable APIs, and stable extension points.

### III. Domain Completeness in Core

Core owns the domain behaviors required to power resources across adapters:
resources, fields, validation, localization, API transport, authorization,
lifecycle hooks, events, state, caching, pagination normalization, plugins, and
registries. Validation MUST support both string rules and typed rule objects.
Localization MUST support multiple locales, runtime locale switching, fallback
locale, interpolation, pluralization, date and currency formatting, and RTL
metadata. Authorization MUST be optional and disabled by default. Transport
MUST support REST and GraphQL through adapters. Adapters may integrate with
core state and query services, but MUST NOT reimplement them. Rationale: these
concerns are shared engine responsibilities and cannot be delegated to UI
layers without breaking consistency.

### IV. Normalized Extensibility Contracts

API responses MUST be normalized into standard internal shapes for paginated,
simple paginated, cursor paginated, and non-paginated responses before they are
consumed elsewhere in the system. Plugins MUST be type-safe and able to
register fields, rules, transports, localizers, authorization providers,
actions, lenses, filters, and metrics through explicit registries or equivalent
extensible contracts. Adapter packages MUST expose reusable dynamic components
named `AtlasResourceTable`, `AtlasResourceForm`, `AtlasResourceShow`,
`AtlasFieldRenderer`, and `AtlasActionRunner`, and those components MUST be
built from smaller primitives where reasonable so extensions can target stable
sub-surfaces. Rationale: stable normalization, registration mechanisms, and
reusable adapter surfaces are required for adapter independence and third-party
extensions.

### V. Shared Verification and Adapter Contract Parity

Every public API and every engine subsystem introduced or changed by a feature
MUST be covered by automated tests. Adapter packages MUST be tested against
shared behavior contracts that are anchored by the Vue adapter as the first
reference implementation; React, DOM, Svelte, Solid, and Angular adapters MUST
match the Vue adapter behavior contract unless a framework-specific exception is
explicitly documented and approved. Rationale: AtlasKit’s value is in
predictable cross-adapter behavior, which requires durable verification rather
than ad hoc manual checks.

## Technical Standards

- The default implementation language is TypeScript, with strong typing applied
  to all exported symbols and extension contracts.
- `@atlaskit/core` MUST expose engine behavior through framework-neutral
  contracts and data structures.
- Adapter packages are responsible only for rendering, framework-native state
  binding, component APIs, slots or render props, class customization, and
  integration with core state and query services.
- Routing is not part of any adapter. Pages are not part of any adapter.
  Adapter packages MUST NOT ship router bindings or page-level abstractions for
  Vue Router, React Router, Angular Router, SvelteKit routing, Solid Router, or
  equivalent systems.
- All adapters MUST use TailwindCSS utility classes.
- Adapter styling MUST support default classes, class maps, theme tokens, and
  framework-native customization patterns without mutating core behavior.
- The Vue adapter is the first reference adapter and MUST use Vue 3,
  Composition API, composables, and strongly typed props, emits, and slots.
- The DOM adapter means pure JavaScript and HTML rendering without a framework.
  It MUST expose functions that mount AtlasKit components into DOM elements.
- New configuration or extension surfaces MUST include documentation for usage,
  typing expectations, lifecycle semantics, and adapter behavior obligations
  when relevant.
- Backward-incompatible changes to public contracts, normalization shapes,
  registry semantics, or shared adapter behavior contracts MUST be explicitly
  documented and versioned.

## Delivery Workflow

- Every plan MUST pass a constitution check covering core versus adapter
  boundaries, typed public API design, extensibility impact, normalization
  requirements, adapter rendering scope, styling customization, and required
  test coverage.
- Every specification MUST identify whether work changes `@atlaskit/core`,
  adapter packages, or both; which shared behavior contracts apply; and how
  validation, localization, authorization, transport, plugin behavior, and
  reusable adapter components are impacted or unaffected.
- Every adapter task list MUST include the tests needed to verify changed
  public APIs, changed engine subsystems, shared behavior contracts, reusable
  component coverage, and styling customization paths before implementation is
  considered complete.
- Reviews MUST reject work that introduces framework-specific code into
  `@atlaskit/core`, weakens typing on public APIs, bypasses response
  normalization, duplicates core logic in adapters, introduces routing or pages
  into adapters, or adds undocumented extension points.

## Governance

This constitution supersedes conflicting local conventions for AtlasKit. Changes
MUST be documented in the constitution itself, reviewed alongside any affected
templates and runtime guidance, and classified with semantic versioning for
governance:

- MAJOR: Removing a principle, redefining a non-negotiable rule, or changing
  governance in a backward-incompatible way.
- MINOR: Adding a new principle or materially expanding required guidance or
  delivery obligations.
- PATCH: Clarifying wording, correcting ambiguity, or making non-semantic
  editorial improvements.

Compliance MUST be checked during planning, specification review, task
generation, implementation review, adapter contract review, and release
preparation for any package that changes public behavior. Any exception MUST be
explicitly justified in the relevant plan and approved before implementation
proceeds.

**Version**: 1.1.0 | **Ratified**: 2026-05-14 | **Last Amended**: 2026-05-15
