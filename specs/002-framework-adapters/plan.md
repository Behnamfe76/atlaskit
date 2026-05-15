# Implementation Plan: Framework Adapter Packages

**Branch**: `002-framework-adapters` | **Date**: 2026-05-15 | **Spec**:
[spec.md](/Users/fereydooni/Documents/GITHUB/npm-packages/atlaskit/specs/002-framework-adapters/spec.md)

**Input**: Feature specification from `/specs/002-framework-adapters/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See
`.specify/templates/plan-template.md` for the execution workflow.

## Summary

Extend the existing `pnpm` monorepo with framework adapter packages centered on
an implemented `@atlaskit/vue` package, while reserving explicit placeholder
packages for `@atlaskit/dom`, `@atlaskit/react`, `@atlaskit/angular`,
`@atlaskit/svelte`, and `@atlaskit/solid`. The technical approach is to keep
all rendering-independent behavior in `@atlaskit/core`, introduce shared
adapter runtime and behavior-test packages, and build the Vue adapter from
typed components, composables, theme contracts, and slot-based customization on
top of `Atlas.runtime()`, registry/resource resolution, and
`QueryClient.subscribe()`.

## Technical Context

**Language/Version**: TypeScript 5.x, Vue 3.x (latest stable), strict mode

**Primary Dependencies**: `pnpm` workspaces, `tsup`, `vitest`, `vue`, Vue Test
Utils, `tailwindcss`, `eslint`, `prettier`

**Storage**: N/A

**Testing**: `vitest` for unit/integration coverage, Vue Test Utils for Vue
component/composable tests, reusable behavior suites in
`packages/adapter-testing`

**Target Platform**: Node.js LTS for package builds/tests and browser-capable
consumer applications embedding the Vue adapter

**Project Type**: Monorepo containing reusable libraries, a CLI package, shared
testing packages, future adapter placeholders, and a manual playground

**Performance Goals**: Vue adapter state binding should keep list/form/show
updates responsive for representative resources with at least 25 fields; query
subscription updates and field dependency recalculations must not introduce
perceptible UI lag during standard CRUD workflows

**Constraints**: `@atlaskit/core` MUST remain rendering-free; adapters MUST
depend on `@atlaskit/core` through workspace dependencies; only `@atlaskit/vue`
is implemented in first delivery; no Vue Router, Nuxt, VitePress, or page
generation may be introduced; all public adapter contracts MUST be strongly
typed; Tailwind utility classes MUST provide default styling without requiring a
global CSS file; table state MUST support controlled and uncontrolled modes;
forms MUST use explicit `create`/`edit` mode; authorization MUST preserve
shared hidden-versus-disabled semantics

**Scale/Scope**: First delivery adds `packages/vue`,
`packages/adapter-contracts`, `packages/adapter-testing`, and placeholder
packages for `dom`, `react`, `angular`, `svelte`, and `solid`; future adapter
implementations are planned but not delivered in this phase

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- `@atlaskit/core` boundary: PASS. Core remains the only owner of resource,
  validation, authorization, query/cache, dependency, and action semantics.
  Vue and shared adapter packages consume runtime services without introducing
  rendering code into core.
- Adapter package boundary: PASS. `@atlaskit/vue` depends on `@atlaskit/core`
  through `workspace:*` and remains limited to rendering, Vue-native state
  binding, props/emits/slots, class customization, and query/cache integration.
  Shared adapter packages remain framework-agnostic support layers only.
- Public API typing: PASS. All components, composables, slot props, class-map
  schemas, theme-token contracts, and resource normalization helpers are
  planned as strong TypeScript exports with package-level documentation.
- Domain ownership: PASS. The plan consumes core-owned validation,
  localization, transport, authorization, hooks, events, state, caching,
  pagination normalization, plugins, and registries without moving any of
  those behaviors into adapters.
- Extensibility and normalization: PASS. Shared adapter utilities centralize
  resource input normalization, table/form/show contracts, class maps, theme
  tokens, and authorization rendering rules so future adapters reuse the same
  behavior.
- Adapter behavior contract: PASS. The plan delivers `AtlasResourceTable`,
  `AtlasResourceForm`, `AtlasResourceShow`, `AtlasFieldRenderer`, and
  `AtlasActionRunner` with smaller supporting composables, controlled and
  uncontrolled table state, explicit form mode, slot customization, and DOM
  adapter parity defined as future contract coverage.
- Routing and pages: PASS. No adapter package imports router libraries or
  provides page abstractions; host applications remain responsible for routing
  and page composition.
- Verification: PASS. The plan requires package-local tests for Vue rendering,
  composables, class maps, slots, validation, authorization, dependencies,
  actions, and query/cache subscriptions, plus shared reusable behavior tests
  in `packages/adapter-testing`.

## Project Structure

### Documentation (this feature)

```text
specs/002-framework-adapters/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── adapter-behavior-contracts.md
│   ├── adapter-runtime-contracts.md
│   └── atlas-vue-components.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
packages/
├── core/
├── cli/
├── testing/
├── adapter-contracts/
│   ├── src/
│   │   ├── authorization/
│   │   ├── resources/
│   │   ├── state/
│   │   ├── theme/
│   │   └── index.ts
│   └── tests/
├── adapter-testing/
│   ├── src/
│   │   ├── fixtures/
│   │   ├── scenarios/
│   │   └── index.ts
│   └── tests/
├── vue/
│   ├── src/
│   │   ├── components/
│   │   ├── composables/
│   │   ├── contracts/
│   │   ├── theme/
│   │   └── index.ts
│   └── tests/
├── dom/
├── react/
├── angular/
├── svelte/
└── solid/
examples/
└── playground/
```

**Structure Decision**: Keep the existing monorepo shape and add dedicated
adapter packages rather than folding adapter support into `packages/testing` or
`packages/core`. Use `adapter-contracts` for runtime shared code and
`adapter-testing` for reusable behavior suites so Vue-specific implementation
details stay isolated in `packages/vue`, and future adapters can adopt the same
contracts without reusing Vue code.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
| --------- | ---------- | ------------------------------------ |
| None | N/A | N/A |
