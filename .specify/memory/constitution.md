<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. Core-Adapter Separation
  - Template Principle 2 -> II. TypeScript-First Public API
  - Template Principle 3 -> III. Domain Completeness in Core
  - Template Principle 4 -> IV. Normalized Extensibility Contracts
  - Template Principle 5 -> V. Mandatory Verification
- Added sections:
  - Technical Standards
  - Delivery Workflow
- Removed sections:
  - None
- Templates requiring updates:
  - ✅ updated: .specify/templates/plan-template.md
  - ✅ updated: .specify/templates/spec-template.md
  - ✅ updated: .specify/templates/tasks-template.md
  - ⚠ pending: .specify/templates/commands/*.md (directory not present in this repository)
- Follow-up TODOs:
  - None
-->

# AtlasKit Constitution

## Core Principles

### I. Core-Adapter Separation

`@atlaskit/core` MUST remain framework-agnostic and MUST NOT render UI or
contain framework-specific code. Rendering responsibilities belong exclusively
to framework adapters, which MUST consume core contracts without mutating their
semantics. Rationale: AtlasKit is intended to be a reusable frontend resource
engine rather than a coupled application framework.

### II. TypeScript-First Public API

All public APIs MUST be strongly typed, documented, and designed around
TypeScript-first ergonomics. Core abstractions MUST favor OOP and SOLID
principles, use static configuration APIs where configuration is part of the
public contract, and preserve Nova-like naming for top-level concepts such as
`Resource`, `Field`, `Action`, `Lens`, `Filter`, and `Metric`. Rationale:
consumer trust depends on predictable contracts, discoverable APIs, and stable
extension points.

### III. Domain Completeness in Core

Core owns the domain behaviors required to power resources across adapters:
resources, fields, validation, localization, API transport, authorization,
lifecycle hooks, events, state, caching, pagination normalization, plugins, and
registries. Validation MUST support both string rules and typed rule objects.
Localization MUST support multiple locales, runtime locale switching, fallback
locale, interpolation, pluralization, date and currency formatting, and RTL
metadata. Authorization MUST be optional and disabled by default. Transport
MUST support REST and GraphQL through adapters. Rationale: these concerns are
shared engine responsibilities and cannot be delegated to UI layers without
breaking consistency.

### IV. Normalized Extensibility Contracts

API responses MUST be normalized into standard internal shapes for paginated,
simple paginated, cursor paginated, and non-paginated responses before they are
consumed elsewhere in the system. Plugins MUST be type-safe and able to
register fields, rules, transports, localizers, authorization providers,
actions, lenses, filters, and metrics through explicit registries or equivalent
extensible contracts. Rationale: stable normalization and registration
mechanisms are required for adapter independence and third-party extensions.

### V. Mandatory Verification

Every public API and every engine subsystem introduced or changed by a feature
MUST be covered by automated tests. This includes registries, field behavior,
validation, transport normalization, localization, authorization, lifecycle
hooks, and plugin integration points when affected. A feature is incomplete if
its behavior cannot be verified independently at the public contract level.
Rationale: AtlasKit’s value is in predictable cross-adapter behavior, which
requires durable verification rather than ad hoc manual checks.

## Technical Standards

- The default implementation language is TypeScript, with strong typing applied
  to all exported symbols and extension contracts.
- `@atlaskit/core` MUST expose engine behavior through framework-neutral
  contracts and data structures.
- Adapter packages MUST translate core state and contracts into framework
  rendering concerns without moving engine logic out of core.
- New configuration or extension surfaces MUST include documentation for usage,
  typing expectations, and lifecycle semantics.
- Backward-incompatible changes to public contracts, normalization shapes, or
  registry semantics MUST be explicitly documented and versioned.

## Delivery Workflow

- Every plan MUST pass a constitution check covering core versus adapter
  boundaries, typed public API design, extensibility impact, normalization
  requirements, and required test coverage.
- Every specification MUST identify which core subsystem or adapter boundary is
  affected, what public contracts change, and how validation, localization,
  authorization, transport, and plugin behavior are impacted or unaffected.
- Every task list MUST include the tests needed to verify changed public APIs
  and changed engine subsystems before implementation is considered complete.
- Reviews MUST reject work that introduces framework-specific code into
  `@atlaskit/core`, weakens typing on public APIs, bypasses response
  normalization, or adds undocumented extension points.

## Governance

This constitution supersedes conflicting local conventions for AtlasKit. Changes
MUST be documented in the constitution itself, reviewed alongside any affected
templates, and classified with semantic versioning for governance:

- MAJOR: Removing a principle, redefining a non-negotiable rule, or changing
  governance in a backward-incompatible way.
- MINOR: Adding a new principle or materially expanding required guidance or
  delivery obligations.
- PATCH: Clarifying wording, correcting ambiguity, or making non-semantic
  editorial improvements.

Compliance MUST be checked during planning, specification review, task
generation, implementation review, and release preparation for any package that
changes public behavior. Any exception MUST be explicitly justified in the
relevant plan and approved before implementation proceeds.

**Version**: 1.0.0 | **Ratified**: 2026-05-14 | **Last Amended**: 2026-05-14
