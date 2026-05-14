# Implementation Plan: AtlasKit Core Engine

**Branch**: `001-atlaskit-core` | **Date**: 2026-05-14 | **Spec**:
[spec.md](/Users/fereydooni/Documents/GITHUB/npm-packages/atlaskit/specs/001-atlaskit-core/spec.md)

**Input**: Feature specification from `/specs/001-atlaskit-core/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build AtlasKit as a `pnpm` monorepo centered on `@atlaskit/core` and
`@atlaskit/cli`, with optional shared testing utilities and a Vite playground
for manual verification. The technical approach is to keep all admin engine
behavior in `@atlaskit/core` behind strongly typed OOP contracts, expose a
static `Atlas.configure()` bootstrap API backed by registries and lightweight
service location, and use the CLI to generate typed resource stubs without
introducing any framework adapter or rendering code in the first release.

## Technical Context

**Language/Version**: TypeScript (latest stable, strict mode)

**Primary Dependencies**: `pnpm` workspaces, `tsup`, `vitest`, `eslint`,
`prettier`, `@changesets/cli`, `vite`

**Storage**: N/A

**Testing**: `vitest` for unit and integration tests, plus optional shared
test helpers in `packages/testing`

**Target Platform**: Node.js LTS for library and CLI execution; browser-capable
consumer apps via framework adapters built later; Vite playground for manual
verification only

**Project Type**: Monorepo containing reusable libraries, a CLI package, and a
manual verification playground

**Performance Goals**: Registry lookup and field resolution remain fast enough
to support resources with at least 25 fields without perceptible authoring lag;
query/cache operations and response normalization add no blocking overhead to
standard CRUD admin flows

**Constraints**: `@atlaskit/core` MUST not import Vue, React, Svelte, DOM
rendering APIs, or browser-specific rendering logic; all public APIs MUST be
strongly typed; all registries MUST be safely extensible; validation strings
MUST normalize into typed rule objects internally; first release normalizes
REST and GraphQL payloads into shared internal shapes for single, collection,
paginate, simple paginate, and cursor paginate resource workflows;
localization MUST support English defaults, sample custom locale bundles,
fallback locale, interpolation, pluralization, RTL, date formatting, and
currency formatting

**Scale/Scope**: Initial release covers `@atlaskit/core`, `@atlaskit/cli`,
optional `@atlaskit/testing`, and `examples/playground`; future framework
adapter packages are explicitly out of scope

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- `@atlaskit/core` boundary: PASS. Core is limited to registries, models,
  validation, i18n, transport, normalization, authorization, events, state,
  dependencies, and plugin contracts. Rendering remains deferred to future
  adapter packages, and the playground is non-authoritative manual verification.
- Public API typing: PASS. All exported contracts are planned as strongly typed
  TypeScript interfaces, abstract classes, or value objects with documentation
  obligations carried into implementation. Public exports include `Atlas`,
  `Resource`, field classes, registries, `Rule`, transport contracts,
  normalizers, authorization contracts, query/cache types, and plugin types.
- Domain ownership: PASS. The plan covers `Resource`/`Field`/`Action`/`Lens`/
  `Filter`/`Metric`, validation, localization, transport, authorization, hooks,
  events, state, caching, pagination normalization, plugins, and registries.
  Future adapters are the only adjacent area intentionally untouched.
- Extensibility and normalization: PASS. Registries are first-class design
  artifacts. REST and GraphQL response normalization are both specified for the
  first release, with shared canonical shapes enforced through the transport
  layer.
- Verification: PASS. The plan requires automated coverage for registries,
  fields, validation parsing and execution, i18n behavior, authorization merge
  rules, REST and GraphQL normalization, dependency resolution, events, plugin
  extension points, query/cache operations, and CLI stub generation.

## Project Structure

### Documentation (this feature)

```text
specs/001-atlaskit-core/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── atlas-core-api.md
│   ├── atlas-cli-generate-resource.md
│   └── normalized-response-shapes.md
└── tasks.md
```

### Source Code (repository root)

```text
packages/
├── core/
│   ├── src/
│   │   ├── atlas/
│   │   ├── authorization/
│   │   ├── cache/
│   │   ├── events/
│   │   ├── fields/
│   │   ├── i18n/
│   │   ├── plugins/
│   │   ├── registries/
│   │   ├── resources/
│   │   ├── transport/
│   │   ├── validation/
│   │   └── index.ts
│   └── tests/
│       ├── integration/
│       └── unit/
├── cli/
│   ├── src/
│   │   ├── commands/
│   │   ├── stubs/
│   │   └── index.ts
│   └── tests/
├── testing/
│   ├── src/
│   └── tests/
examples/
└── playground/
    ├── src/
    ├── public/
    └── tests/
tooling/
└── eslint/
```

**Structure Decision**: Use a `pnpm` workspace monorepo so `@atlaskit/core`
and `@atlaskit/cli` can evolve independently while sharing TypeScript, test,
lint, release, and optional test-helper infrastructure. The playground remains
outside published packages and is explicitly not a framework adapter.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
