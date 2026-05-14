---
description: "Task list for AtlasKit Core Engine implementation"
---

# Tasks: AtlasKit Core Engine

**Input**: Design documents from `/specs/001-atlaskit-core/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are REQUIRED for every changed public API and affected engine subsystem. Write the listed tests first, confirm they fail, then implement the corresponding functionality.

**Organization**: Tasks are grouped by user story to preserve independently testable increments. The user-provided technical phases map into Setup, Foundational, User Story phases, and a final Polish phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`)
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Monorepo and package bootstrap for the first release

- [x] T001 Create the workspace manifests in `package.json`, `pnpm-workspace.yaml`, and `tsconfig.base.json`
- [x] T002 [P] Configure root TypeScript, build, and test defaults in `tsconfig.json`, `vitest.workspace.ts`, and `tsup.config.ts`
- [x] T003 [P] Configure linting and formatting in `eslint.config.js`, `.prettierrc`, and `.prettierignore`
- [x] T004 [P] Configure release management in `.changeset/config.json` and `.gitignore`
- [x] T005 [P] Scaffold package manifests for `packages/core/package.json`, `packages/cli/package.json`, `packages/testing/package.json`, and `examples/playground/package.json`
- [x] T006 [P] Scaffold package TypeScript configs in `packages/core/tsconfig.json`, `packages/cli/tsconfig.json`, `packages/testing/tsconfig.json`, and `examples/playground/tsconfig.json`
- [x] T007 [P] Scaffold the initial workspace entry files and Vite playground bootstrap in `packages/core/src/index.ts`, `packages/cli/src/index.ts`, `packages/testing/src/index.ts`, `examples/playground/src/main.ts`, `examples/playground/index.html`, and `examples/playground/vite.config.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core contracts, static configuration, registries, and shared infrastructure that block all user stories

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T008 [P] Create failing unit tests for static bootstrap and service resolution in `packages/core/tests/unit/atlas/Atlas.test.ts` and `packages/core/tests/unit/container/ServiceContainer.test.ts`
- [x] T009 [P] Create failing unit tests for registry duplicate protection and typed extension in `packages/core/tests/unit/registries/BaseRegistry.test.ts` and `packages/core/tests/unit/registries/RegistryErrors.test.ts`
- [x] T010 [P] Create failing shared fixture tests for workspace helpers in `packages/testing/tests/fixtures.test.ts`
- [x] T011 Implement the static bootstrap API in `packages/core/src/atlas/Atlas.ts`, `packages/core/src/atlas/AtlasConfig.ts`, and `packages/core/src/atlas/index.ts`
- [x] T012 Implement the lightweight service container in `packages/core/src/container/ServiceContainer.ts` and `packages/core/src/container/serviceTokens.ts`
- [x] T013 [P] Implement shared typed error and utility primitives in `packages/core/src/support/errors.ts`, `packages/core/src/support/invariant.ts`, and `packages/core/src/support/types.ts`
- [x] T014 [P] Implement base domain contracts for actions, lenses, filters, metrics, and hooks in `packages/core/src/resources/Action.ts`, `packages/core/src/resources/Lens.ts`, `packages/core/src/resources/Filter.ts`, `packages/core/src/resources/Metric.ts`, and `packages/core/src/resources/Hooks.ts`
- [x] T015 Implement the typed registry base classes in `packages/core/src/registries/BaseRegistry.ts`, `packages/core/src/registries/registryTypes.ts`, and `packages/core/src/registries/index.ts`
- [x] T016 Implement shared test fixtures and builders in `packages/testing/src/fixtures/resourceFixtures.ts`, `packages/testing/src/fixtures/registryFixtures.ts`, and `packages/testing/src/index.ts`

**Checkpoint**: Workspace and foundational core bootstrap are ready; user story implementation can proceed

---

## Phase 3: User Story 1 - Define Admin Resources Once (Priority: P1) 🎯 MVP

**Goal**: Deliver typed resource authoring, startup registration, and metadata resolution for index, show, create, and edit workflows

**Independent Test**: Register a sample resource with identity, labels, searchable fields, page references, endpoint metadata, and pagination settings, then confirm the runtime resolves it through the central registry and rejects duplicate `id` or `uriKey` values.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T017 [P] [US1] Create contract tests for the core public API in `packages/core/tests/integration/contracts/atlas-core-api.contract.test.ts`
- [x] T018 [P] [US1] Create integration tests for resource registration and duplicate failures in `packages/core/tests/integration/resources/resource-registration.test.ts`
- [x] T019 [P] [US1] Create integration tests for resource metadata resolution in `packages/core/tests/integration/resources/resource-metadata.test.ts`

### Implementation for User Story 1

- [x] T020 [P] [US1] Implement the base resource contracts in `packages/core/src/resources/Resource.ts` and `packages/core/src/resources/resourceTypes.ts`
- [x] T021 [P] [US1] Implement resource metadata helpers in `packages/core/src/resources/resourceMeta.ts` and `packages/core/src/resources/resourcePages.ts`
- [x] T022 [P] [US1] Implement the resource registry in `packages/core/src/registries/ResourceRegistry.ts`
- [x] T023 [P] [US1] Implement resource collection exports in `packages/core/src/resources/index.ts`
- [x] T024 [US1] Wire resource registration into startup configuration in `packages/core/src/atlas/configureResources.ts` and `packages/core/src/atlas/Atlas.ts`
- [x] T025 [US1] Export the stable public resource authoring surface in `packages/core/src/index.ts`

**Checkpoint**: User Story 1 provides a complete, independently testable resource definition and registration workflow

---

## Phase 4: User Story 2 - Configure Fields and Business Rules (Priority: P2)

**Goal**: Deliver field behavior, validation, localization, transport, normalization, query/cache, authorization, and lifecycle support through the resource engine

**Independent Test**: Define a resource with mixed field types, visibility rules, dependencies, validation, locale bundles, transport configuration, and authorization, then confirm the core resolves final fields, normalizes REST data, updates localized output, merges abilities correctly, and maintains query/cache state during reads and writes.

### Tests for User Story 2

- [ ] T026 [P] [US2] Create integration tests for field visibility and dependency resolution in `packages/core/tests/integration/fields/field-resolution.test.ts` and `packages/core/tests/integration/fields/dependency-resolution.test.ts`
- [ ] T027 [P] [US2] Create unit tests for rule parsing and validation registry behavior in `packages/core/tests/unit/validation/RuleParser.test.ts` and `packages/core/tests/unit/validation/ValidationRegistry.test.ts`
- [ ] T028 [P] [US2] Create unit tests for localization and locale registry behavior with default `en` and sample `fa`/`ar` bundles in `packages/core/tests/unit/i18n/I18n.test.ts` and `packages/core/tests/unit/i18n/LocaleRegistry.test.ts`
- [ ] T029 [P] [US2] Create integration tests for REST and GraphQL normalization in `packages/core/tests/integration/transport/ResponseNormalizer.test.ts` and `packages/core/tests/integration/transport/GraphQLNormalizer.test.ts`
- [ ] T030 [P] [US2] Create integration tests for query/cache state and optimistic writes in `packages/core/tests/integration/cache/QueryClient.test.ts`
- [ ] T031 [P] [US2] Create unit and integration tests for authorization and lifecycle events in `packages/core/tests/unit/authorization/AuthorizationManager.test.ts` and `packages/core/tests/integration/events/lifecycle-events.test.ts`

### Implementation for User Story 2

- [ ] T032 [P] [US2] Implement the fluent field base class in `packages/core/src/fields/Field.ts` and `packages/core/src/fields/fieldTypes.ts`
- [ ] T033 [P] [US2] Implement scalar field classes in `packages/core/src/fields/scalar/ID.ts`, `packages/core/src/fields/scalar/Text.ts`, `packages/core/src/fields/scalar/Textarea.ts`, `packages/core/src/fields/scalar/Number.ts`, `packages/core/src/fields/scalar/Currency.ts`, `packages/core/src/fields/scalar/Date.ts`, `packages/core/src/fields/scalar/Select.ts`, and `packages/core/src/fields/scalar/MultiSelect.ts`
- [ ] T034 [P] [US2] Implement relationship and structural field classes in `packages/core/src/fields/relations/BelongsTo.ts`, `packages/core/src/fields/relations/BelongsToMany.ts`, `packages/core/src/fields/media/Image.ts`, `packages/core/src/fields/media/File.ts`, `packages/core/src/fields/media/Video.ts`, `packages/core/src/fields/compound/KeyValue.ts`, `packages/core/src/fields/compound/Repeater.ts`, `packages/core/src/fields/layout/Heading.ts`, and `packages/core/src/fields/layout/FieldWrapper.ts`
- [ ] T035 [US2] Implement field registry and field capability resolution in `packages/core/src/registries/FieldRegistry.ts` and `packages/core/src/fields/fieldRegistryTypes.ts`
- [ ] T036 [US2] Implement visibility and dependency resolution in `packages/core/src/fields/visibility.ts` and `packages/core/src/fields/DependencyResolver.ts`
- [ ] T037 [P] [US2] Implement typed rule builders in `packages/core/src/validation/Rule.ts` and `packages/core/src/validation/ruleTypes.ts`
- [ ] T038 [US2] Implement string rule parsing and validation registry registration in `packages/core/src/validation/ruleParser.ts` and `packages/core/src/registries/ValidationRegistry.ts`
- [ ] T039 [US2] Implement validation execution and built-in rules in `packages/core/src/validation/Validator.ts` and `packages/core/src/validation/builtin/index.ts`
- [ ] T040 [P] [US2] Implement locale bundle types, default English messages, and sample `fa`/`ar` bundles in `packages/core/src/i18n/localeTypes.ts`, `packages/core/src/i18n/locales/en.ts`, `packages/core/src/i18n/locales/fa.ts`, `packages/core/src/i18n/locales/ar.ts`, and `packages/core/src/registries/LocaleRegistry.ts`
- [ ] T041 [US2] Implement the i18n service with RTL, date formatting, and currency formatting support in `packages/core/src/i18n/I18n.ts`
- [ ] T042 [P] [US2] Implement transport contracts and clients in `packages/core/src/transport/ApiClient.ts`, `packages/core/src/transport/rest/RestClient.ts`, and `packages/core/src/transport/graphql/GraphQLClient.ts`
- [ ] T043 [US2] Implement REST and GraphQL response normalization in `packages/core/src/transport/ResponseNormalizer.ts`, `packages/core/src/transport/normalizers/rest.ts`, and `packages/core/src/transport/normalizers/graphql.ts`
- [ ] T044 [P] [US2] Implement query/cache state models and subscriptions in `packages/core/src/cache/QueryClient.ts` and `packages/core/src/cache/cacheTypes.ts`
- [ ] T045 [US2] Implement invalidation, writes, optimistic updates, and pagination state in `packages/core/src/cache/queryMutations.ts` and `packages/core/src/cache/pagination.ts`
- [ ] T046 [P] [US2] Implement authorization contracts and manager in `packages/core/src/authorization/authorizationTypes.ts` and `packages/core/src/authorization/AuthorizationManager.ts`
- [ ] T047 [P] [US2] Implement the event bus and event contracts in `packages/core/src/events/EventBus.ts` and `packages/core/src/events/eventTypes.ts`
- [ ] T048 [US2] Integrate lifecycle hooks and shared services into runtime configuration in `packages/core/src/atlas/defaultServices.ts`, `packages/core/src/atlas/runtimeHooks.ts`, and `packages/core/src/index.ts`

**Checkpoint**: User Story 2 provides a complete, independently testable engine for fields and cross-cutting business rules

---

## Phase 5: User Story 3 - Extend and Scaffold the Engine (Priority: P3)

**Goal**: Deliver core-only plugin extensibility and a CLI resource generator aligned with the public authoring contracts

**Independent Test**: Register a plugin that contributes at least one new core capability, run the CLI resource generator for a sample resource, and confirm the plugin is accepted through typed registries while the generated stub is immediately usable with the core authoring API.

### Tests for User Story 3

- [ ] T049 [P] [US3] Create integration tests for plugin registration boundaries in `packages/core/tests/integration/plugins/PluginRegistry.test.ts`
- [ ] T050 [P] [US3] Create CLI generator contract tests in `packages/cli/tests/generate-resource.test.ts`
- [ ] T051 [P] [US3] Create manual smoke coverage for generated resource bootstrap in `examples/playground/tests/resource-generator-smoke.test.ts`

### Implementation for User Story 3

- [ ] T052 [P] [US3] Implement plugin contracts in `packages/core/src/plugins/pluginTypes.ts` and `packages/core/src/plugins/Plugin.ts`
- [ ] T053 [US3] Implement the plugin registry in `packages/core/src/registries/PluginRegistry.ts` and `packages/core/src/plugins/registerPlugin.ts`
- [ ] T054 [US3] Wire plugin registration into startup configuration in `packages/core/src/atlas/configurePlugins.ts` and `packages/core/src/atlas/Atlas.ts`
- [ ] T055 [P] [US3] Create typed resource stub templates in `packages/cli/src/stubs/resource.ts` and `packages/cli/src/stubs/templates/resource.hbs`
- [ ] T056 [US3] Implement the `generate resource` command in `packages/cli/src/commands/generateResource.ts` and `packages/cli/src/index.ts`
- [ ] T057 [US3] Implement CLI file output and overwrite handling in `packages/cli/src/io/writeGeneratedFile.ts` and `packages/cli/src/formatters/resourceTemplate.ts`
- [ ] T058 [US3] Add plugin and generated resource smoke bootstrap in `examples/playground/src/bootstrap.ts`, `examples/playground/src/main.ts`, and `examples/playground/src/app.ts`

**Checkpoint**: User Story 3 provides a complete, independently testable extension and scaffolding workflow

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final documentation, verification, and release-readiness work spanning all stories

- [ ] T059 [P] Add root product documentation in `README.md`
- [ ] T060 [P] Add package usage documentation in `packages/core/README.md`, `packages/cli/README.md`, and `packages/testing/README.md`
- [ ] T061 [P] Add an initial release changeset in `.changeset/atlaskit-core-engine.md`
- [ ] T062 Harmonize public exports and package entrypoints in `packages/core/src/index.ts`, `packages/cli/src/index.ts`, and `packages/testing/src/index.ts`
- [ ] T063 Validate and update manual verification steps in `specs/001-atlaskit-core/quickstart.md`
- [ ] T064 Run full workspace verification and record any required follow-up in `specs/001-atlaskit-core/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; starts immediately
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational; establishes the MVP resource system
- **User Story 2 (Phase 4)**: Depends on User Story 1 because fields and engine subsystems build on the resource authoring model
- **User Story 3 (Phase 5)**: Depends on User Stories 1 and 2 because plugins and generated stubs must target the completed public core contracts
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on later stories; can be shipped as the MVP core resource-definition workflow
- **User Story 2 (P2)**: Depends on User Story 1 registry/bootstrap contracts, but remains independently testable once those are present
- **User Story 3 (P3)**: Depends on stable core authoring and extension contracts from User Stories 1 and 2

### Within Each User Story

- Tests MUST be written and fail before implementation
- Base contracts before registry wiring
- Registries before runtime integration
- Runtime integration before export cleanup or manual verification

### Parallel Opportunities

- Setup tasks `T002` through `T007` can run in parallel after `T001`
- Foundational tests `T008` through `T010` can run in parallel
- User Story 1 tests `T017` through `T019` can run in parallel
- User Story 2 tests `T026` through `T031` can run in parallel
- User Story 2 implementation tasks `T032`, `T033`, `T034`, `T037`, `T040`, `T042`, `T044`, `T046`, and `T047` can run in parallel once the foundational layer is complete
- User Story 3 tests `T049` through `T051` can run in parallel
- User Story 3 implementation tasks `T052` and `T055` can run in parallel before integration tasks

---

## Parallel Example: User Story 2

```bash
# Launch failing subsystem tests together:
Task: "Create integration tests for field visibility and dependency resolution in packages/core/tests/integration/fields/field-resolution.test.ts and packages/core/tests/integration/fields/dependency-resolution.test.ts"
Task: "Create unit tests for rule parsing and validation registry behavior in packages/core/tests/unit/validation/RuleParser.test.ts and packages/core/tests/unit/validation/ValidationRegistry.test.ts"
Task: "Create unit tests for localization and locale registry behavior in packages/core/tests/unit/i18n/I18n.test.ts and packages/core/tests/unit/i18n/LocaleRegistry.test.ts"
Task: "Create integration tests for REST and GraphQL normalization in packages/core/tests/integration/transport/ResponseNormalizer.test.ts and packages/core/tests/integration/transport/GraphQLNormalizer.test.ts"
Task: "Create integration tests for query/cache state and optimistic writes in packages/core/tests/integration/cache/QueryClient.test.ts"
Task: "Create unit and integration tests for authorization and lifecycle events in packages/core/tests/unit/authorization/AuthorizationManager.test.ts and packages/core/tests/integration/events/lifecycle-events.test.ts"

# Launch implementation slices that do not overlap:
Task: "Implement scalar field classes in packages/core/src/fields/scalar/ID.ts, packages/core/src/fields/scalar/Text.ts, packages/core/src/fields/scalar/Textarea.ts, packages/core/src/fields/scalar/Number.ts, packages/core/src/fields/scalar/Currency.ts, packages/core/src/fields/scalar/Date.ts, packages/core/src/fields/scalar/Select.ts, and packages/core/src/fields/scalar/MultiSelect.ts"
Task: "Implement relationship and structural field classes in packages/core/src/fields/relations/BelongsTo.ts, packages/core/src/fields/relations/BelongsToMany.ts, packages/core/src/fields/media/Image.ts, packages/core/src/fields/media/File.ts, packages/core/src/fields/media/Video.ts, packages/core/src/fields/compound/KeyValue.ts, packages/core/src/fields/compound/Repeater.ts, packages/core/src/fields/layout/Heading.ts, and packages/core/src/fields/layout/FieldWrapper.ts"
Task: "Implement typed rule builders in packages/core/src/validation/Rule.ts and packages/core/src/validation/ruleTypes.ts"
Task: "Implement locale bundle types and locale registry in packages/core/src/i18n/localeTypes.ts and packages/core/src/registries/LocaleRegistry.ts"
Task: "Implement transport contracts and clients in packages/core/src/transport/ApiClient.ts, packages/core/src/transport/rest/RestClient.ts, and packages/core/src/transport/graphql/GraphQLClient.ts"
Task: "Implement query/cache state models and subscriptions in packages/core/src/cache/QueryClient.ts and packages/core/src/cache/cacheTypes.ts"
Task: "Implement authorization contracts and manager in packages/core/src/authorization/authorizationTypes.ts and packages/core/src/authorization/AuthorizationManager.ts"
Task: "Implement the event bus and event contracts in packages/core/src/events/EventBus.ts and packages/core/src/events/eventTypes.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate resource registration, metadata resolution, and duplicate failure behavior
5. Stop if only the MVP core resource system is needed

### Incremental Delivery

1. Finish workspace and foundational bootstrap
2. Deliver User Story 1 as the baseline resource authoring API
3. Deliver User Story 2 as the engine behavior layer for fields and business rules
4. Deliver User Story 3 as the extension and scaffolding layer
5. Finish with cross-cutting docs, release metadata, and quickstart verification

### Parallel Team Strategy

1. One engineer handles workspace/tooling while another drafts foundational tests
2. After Foundational completes, User Story 1 remains the single critical path
3. During User Story 2, split work by subsystem: fields, validation/i18n, transport/cache/auth, and events
4. During User Story 3, split work between plugin infrastructure and CLI generation

---

## Notes

- The user-provided technical phases are preserved through task ordering: monorepo setup in Phases 1-2, resource system in User Story 1, engine subsystems in User Story 2, plugin/CLI work in User Story 3, and tests/docs in the final phase
- Every user story phase includes failing tests before implementation
- All tasks follow the required checklist format with IDs, story labels where required, and file paths
- The suggested MVP scope is **User Story 1 only**
