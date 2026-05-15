---
description: "Task list for Framework Adapter Packages implementation"
---

# Tasks: Framework Adapter Packages

**Input**: Design documents from `/specs/002-framework-adapters/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Tests are REQUIRED for every changed public API and every affected
engine subsystem under the project constitution. This task list includes Vue
package-local tests plus shared adapter behavior tests for resource resolution,
table state, form mode, authorization rendering, styling customization, query
subscription binding, field dependencies, and action execution.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story while honoring the requested delivery
phases. The first milestone implements only `@atlaskit/vue`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- Monorepo packages live under `packages/`
- Vue implementation files live under `packages/vue/src/` and `packages/vue/tests/`
- Shared runtime contracts live under `packages/adapter-contracts/`
- Shared behavior tests live under `packages/adapter-testing/`
- Example app updates live under `examples/playground/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish the workspace/package structure for adapters and reserve
future package locations.

- [ ] T001 Create `packages/vue`, `packages/adapter-contracts`, `packages/adapter-testing`, `packages/dom`, `packages/react`, `packages/angular`, `packages/svelte`, and `packages/solid` directories per `specs/002-framework-adapters/plan.md`
- [ ] T002 Configure `packages/vue/package.json`, `packages/vue/tsconfig.json`, and `packages/vue/README.md` for `@atlaskit/vue` with `@atlaskit/core` workspace dependency, Vue peer dependency, TailwindCSS peer/dev dependency notes, build scripts, test scripts, and exports
- [ ] T003 [P] Configure `packages/adapter-contracts/package.json`, `packages/adapter-contracts/tsconfig.json`, and `packages/adapter-contracts/README.md` for shared runtime contracts in `packages/adapter-contracts/`
- [ ] T004 [P] Configure `packages/adapter-testing/package.json`, `packages/adapter-testing/tsconfig.json`, and `packages/adapter-testing/README.md` for shared adapter behavior tests in `packages/adapter-testing/`
- [ ] T005 [P] Add placeholder `package.json`, `tsconfig.json`, `README.md`, and `src/index.ts` files for `packages/dom`, `packages/react`, `packages/angular`, `packages/svelte`, and `packages/solid`
- [ ] T006 Configure `packages/vue/src/index.ts`, `packages/adapter-contracts/src/index.ts`, and `packages/adapter-testing/src/index.ts` as initial public entrypoints
- [ ] T007 [P] Add Vue package test setup files in `packages/vue/vitest.config.ts` and `packages/vue/tests/setup.ts`
- [ ] T008 [P] Add shared adapter testing harness setup in `packages/adapter-testing/vitest.config.ts` and `packages/adapter-testing/tests/setup.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Define the shared contracts and theme/state foundations that block
all Vue adapter behavior.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Define resource reference types and normalization helpers in `packages/adapter-contracts/src/resources/resourceReference.ts` and `packages/adapter-contracts/src/resources/resolveResourceReference.ts`
- [ ] T010 [P] Define shared component prop types, slot prop types, and execution-context types in `packages/adapter-contracts/src/state/componentProps.ts` and `packages/adapter-contracts/src/state/slotProps.ts`
- [ ] T011 [P] Define shared class-map and theme-token schemas in `packages/adapter-contracts/src/theme/classMap.ts` and `packages/adapter-contracts/src/theme/themeTokens.ts`
- [ ] T012 [P] Define shared table/form/show/action state contracts in `packages/adapter-contracts/src/state/tableState.ts`, `packages/adapter-contracts/src/state/formState.ts`, `packages/adapter-contracts/src/state/showState.ts`, and `packages/adapter-contracts/src/state/actionState.ts`
- [ ] T013 [P] Define shared authorization rendering helpers for hidden versus disabled states in `packages/adapter-contracts/src/authorization/renderAuthorization.ts`
- [ ] T014 Implement default Tailwind class maps, theme-token merging, and class-map override helpers in `packages/vue/src/theme/defaultClasses.ts`, `packages/vue/src/theme/themeTokens.ts`, `packages/vue/src/theme/createClassMap.ts`, and `packages/vue/src/composables/useAtlasTheme.ts`
- [ ] T015 [P] Add shared adapter behavior fixtures and scenario helpers in `packages/adapter-testing/src/fixtures/adapterFixtures.ts` and `packages/adapter-testing/src/scenarios/behaviorScenarios.ts`
- [ ] T016 [P] Add foundational tests for resource normalization, state contracts, authorization rendering, and class merging in `packages/adapter-contracts/tests/contracts.test.ts`, `packages/vue/tests/theme/useAtlasTheme.test.ts`, and `packages/adapter-testing/tests/behavior-fixtures.test.ts`

**Checkpoint**: Shared adapter contract and theme/state foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Render Core Resources in an App (Priority: P1) 🎯 MVP

**Goal**: Ship the first usable `@atlaskit/vue` rendering surfaces for resource
table, form, show, field, and action workflows on top of `@atlaskit/core`.

**Independent Test**: In a Vue 3 app, mount `AtlasResourceTable`,
`AtlasResourceForm`, `AtlasResourceShow`, `AtlasFieldRenderer`, and
`AtlasActionRunner` for a registered resource and verify loading, success,
query updates, field rendering, action execution, and no custom core logic
duplication.

### Tests for User Story 1 (REQUIRED when public behavior changes) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T017 [P] [US1] Add shared behavior contract tests for resource resolution, controlled/uncontrolled table state, explicit form mode, and authorization rendering in `packages/adapter-testing/tests/resource-resolution.contract.test.ts`, `packages/adapter-testing/tests/table-state.contract.test.ts`, `packages/adapter-testing/tests/form-mode.contract.test.ts`, and `packages/adapter-testing/tests/authorization-rendering.contract.test.ts`
- [ ] T018 [P] [US1] Add Vue composable tests for `useAtlasResource`, `useResourceTable`, `useResourceForm`, `useResourceShow`, `useFieldRenderer`, and `useActionRunner` in `packages/vue/tests/composables/useAtlasResource.test.ts`, `packages/vue/tests/composables/useResourceTable.test.ts`, `packages/vue/tests/composables/useResourceForm.test.ts`, `packages/vue/tests/composables/useResourceShow.test.ts`, `packages/vue/tests/composables/useFieldRenderer.test.ts`, and `packages/vue/tests/composables/useActionRunner.test.ts`
- [ ] T019 [P] [US1] Add Vue component tests for `AtlasResourceTable`, `AtlasResourceForm`, `AtlasResourceShow`, `AtlasFieldRenderer`, and `AtlasActionRunner`, including `BelongsTo` and `BelongsToMany` behavior, in `packages/vue/tests/components/AtlasResourceTable.test.ts`, `packages/vue/tests/components/AtlasResourceForm.test.ts`, `packages/vue/tests/components/AtlasResourceShow.test.ts`, `packages/vue/tests/components/AtlasFieldRenderer.test.ts`, and `packages/vue/tests/components/AtlasActionRunner.test.ts`

### Implementation for User Story 1

- [ ] T020 [P] [US1] Implement `useAtlasResource` and `useResourceShow` in `packages/vue/src/composables/useAtlasResource.ts` and `packages/vue/src/composables/useResourceShow.ts`
- [ ] T021 [P] [US1] Implement `useResourceTable` with controlled/uncontrolled state and `QueryClient.subscribe()` binding in `packages/vue/src/composables/useResourceTable.ts`
- [ ] T022 [P] [US1] Implement `useResourceForm` with explicit `create`/`edit` mode, validation state, submission state, and dependency recalculation in `packages/vue/src/composables/useResourceForm.ts`
- [ ] T023 [P] [US1] Implement `useFieldRenderer` and `useActionRunner` in `packages/vue/src/composables/useFieldRenderer.ts` and `packages/vue/src/composables/useActionRunner.ts`
- [ ] T024 [US1] Implement `AtlasFieldRenderer.vue` with index/show/create/edit modes, visibility handling, validation error display, sync/async dependency support, typed slots, and explicit `BelongsTo`/`BelongsToMany` handling in `packages/vue/src/components/AtlasFieldRenderer.vue`
- [ ] T025 [US1] Implement `AtlasActionRunner.vue` with resource and row action contexts, loading/error/success states, class maps, and slots in `packages/vue/src/components/AtlasActionRunner.vue`
- [ ] T026 [US1] Implement `AtlasResourceTable.vue` with loading/error/empty states, search, sorting, filtering, pagination, selected rows, index field visibility, actions, slots, class maps, and relation-field display behavior in `packages/vue/src/components/AtlasResourceTable.vue`
- [ ] T027 [US1] Implement `AtlasResourceForm.vue` with create/edit modes, form field visibility, validation, submission, field dependencies, async option loading, slots, class maps, and relation-field input behavior in `packages/vue/src/components/AtlasResourceForm.vue`
- [ ] T028 [US1] Implement `AtlasResourceShow.vue` with show field visibility, relation display metadata, actions, slots, class maps, and explicit `BelongsTo`/`BelongsToMany` output behavior in `packages/vue/src/components/AtlasResourceShow.vue`
- [ ] T029 [US1] Export all public Vue adapter APIs and contracts from `packages/vue/src/index.ts` and `packages/vue/src/contracts/index.ts`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Customize Rendering Without Forking Behavior (Priority: P2)

**Goal**: Let applications customize fields, actions, and styling through
class maps, theme tokens, and slots while preserving AtlasKit core semantics.

**Independent Test**: Mount Vue adapter components with custom class maps,
theme tokens, and slots, then verify customized output preserves validation,
authorization, dependency, and action behavior.

### Tests for User Story 2 (REQUIRED when public behavior changes) ⚠️

- [ ] T030 [P] [US2] Add Vue tests for class-map merges, theme-token overrides, and slot-based field/action customization in `packages/vue/tests/theme/classMapOverrides.test.ts`, `packages/vue/tests/theme/themeTokenOverrides.test.ts`, and `packages/vue/tests/components/slot-customization.test.ts`
- [ ] T031 [P] [US2] Add shared behavior tests for styling/customization invariants in `packages/adapter-testing/tests/styling-customization.contract.test.ts`

### Implementation for User Story 2

- [ ] T032 [P] [US2] Refine component prop and slot prop exports for customization surfaces in `packages/vue/src/contracts/componentProps.ts`, `packages/vue/src/contracts/slotProps.ts`, and `packages/vue/src/contracts/classMapTypes.ts`
- [ ] T033 [US2] Integrate class-map and theme-token overrides across `AtlasResourceTable.vue`, `AtlasResourceForm.vue`, `AtlasResourceShow.vue`, `AtlasFieldRenderer.vue`, and `AtlasActionRunner.vue` in `packages/vue/src/components/`
- [ ] T034 [US2] Implement full field and action slot override paths backed by typed slot props in `packages/vue/src/components/AtlasFieldRenderer.vue`, `packages/vue/src/components/AtlasActionRunner.vue`, `packages/vue/src/components/AtlasResourceTable.vue`, `packages/vue/src/components/AtlasResourceForm.vue`, and `packages/vue/src/components/AtlasResourceShow.vue`
- [ ] T035 [US2] Document customization-focused public exports in `packages/vue/README.md` and `specs/002-framework-adapters/contracts/atlas-vue-components.md`

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Keep Adapters Consistent Across Frameworks (Priority: P3)

**Goal**: Encode the shared behavior contract and future adapter blueprint so
later framework adapters can follow Vue parity without re-deciding runtime
semantics.

**Independent Test**: Run shared adapter behavior suites against the Vue
reference adapter and verify future adapter docs and placeholder packages point
to the same contract.

### Tests for User Story 3 (REQUIRED when public behavior changes) ⚠️

- [ ] T036 [P] [US3] Add shared behavior tests for action execution, async dependencies, and future-adapter parity expectations in `packages/adapter-testing/tests/action-execution.contract.test.ts`, `packages/adapter-testing/tests/async-dependencies.contract.test.ts`, and `packages/adapter-testing/tests/future-adapter-parity.contract.test.ts`
- [ ] T037 [P] [US3] Add shared behavior tests for `BelongsTo` and `BelongsToMany` parity across field, table, form, and show surfaces in `packages/adapter-testing/tests/relationship-fields.contract.test.ts` and `packages/vue/tests/components/relationship-fields.test.ts`

### Implementation for User Story 3

- [ ] T038 [P] [US3] Expand shared adapter behavior fixtures and scenarios for Vue parity reuse in `packages/adapter-testing/src/fixtures/vueAdapterFixtures.ts` and `packages/adapter-testing/src/scenarios/vueReferenceScenarios.ts`
- [ ] T039 [US3] Add future adapter blueprint documentation to `packages/dom/README.md`, `packages/react/README.md`, `packages/angular/README.md`, `packages/svelte/README.md`, `packages/solid/README.md`, and `specs/002-framework-adapters/contracts/adapter-behavior-contracts.md`
- [ ] T040 [US3] Align placeholder package entrypoints and metadata with the Vue behavior contract in `packages/dom/src/index.ts`, `packages/react/src/index.ts`, `packages/angular/src/index.ts`, `packages/svelte/src/index.ts`, and `packages/solid/src/index.ts`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Finalize examples, docs, and integration validation that span
multiple user stories

- [ ] T041 [P] Add Vue playground/example wiring in `examples/playground/src/bootstrap.ts`, `examples/playground/src/app.ts`, and `examples/playground/src/main.ts`
- [ ] T042 Add usage documentation for `@atlaskit/vue`, `@atlaskit/adapter-contracts`, and `@atlaskit/adapter-testing` in `README.md`, `packages/vue/README.md`, `packages/adapter-contracts/README.md`, and `packages/adapter-testing/README.md`
- [ ] T043 [P] Add additional unit tests required by changed behavior in `packages/vue/tests/` and `packages/adapter-contracts/tests/`
- [ ] T044 Run quickstart validation against `specs/002-framework-adapters/quickstart.md` and align any drift in `examples/playground/` or package README files

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 1 delivers the first milestone (`@atlaskit/vue`)
  - User Story 2 depends on User Story 1 component surfaces existing
  - User Story 3 depends on User Story 1 behavior and may reuse User Story 2 customization coverage
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after User Story 1 component/composable surfaces exist - Should remain independently testable as customization work
- **User Story 3 (P3)**: Can start after User Story 1 shared behavior tests exist - Uses Vue as the reference adapter for future parity

### Within Each User Story

- Tests for changed public contracts and affected subsystems MUST be written and
  FAIL before implementation
- Adapter work MUST keep routing and pages out of scope and MUST avoid
  duplicating core logic
- Shared runtime contracts before Vue component integration
- Composables before components
- Components before example wiring and public docs
- Story complete before moving to next priority

### Parallel Opportunities

- `T003`, `T004`, `T005`, `T007`, and `T008` can run in parallel during Setup
- `T009` through `T016` can be split between shared runtime and theme/testing work in Foundational
- User Story 1 composable tasks `T020` through `T023` can run in parallel
- User Story 1 component tests `T019` can be split by component file
- User Story 2 customization tests `T030` and `T031` can run in parallel
- User Story 3 contract tests `T036` and `T037` can run in parallel
- Final documentation/example tasks `T041` through `T043` can run in parallel once implementation stabilizes

---

## Parallel Example: User Story 1

```bash
# Launch shared/public contract tests together:
Task: "Add shared behavior contract tests in packages/adapter-testing/tests/resource-resolution.contract.test.ts"
Task: "Add Vue composable tests in packages/vue/tests/composables/useResourceTable.test.ts and related files"
Task: "Add Vue component tests in packages/vue/tests/components/AtlasResourceTable.test.ts and related files"

# Launch composable implementation together:
Task: "Implement useAtlasResource and useResourceShow in packages/vue/src/composables/"
Task: "Implement useResourceTable in packages/vue/src/composables/useResourceTable.ts"
Task: "Implement useResourceForm in packages/vue/src/composables/useResourceForm.ts"
Task: "Implement useFieldRenderer and useActionRunner in packages/vue/src/composables/"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Workspace/package setup
2. Complete Phase 2: Foundational shared contracts/theme/test harness
3. Complete Phase 3: User Story 1 (`@atlaskit/vue` runtime surfaces)
4. **STOP and VALIDATE**: Run Vue and shared adapter behavior tests independently
5. Demo the Vue adapter in the playground if ready

### Incremental Delivery

1. Complete Setup + Foundational → Adapter package foundation ready
2. Add User Story 1 → Test independently → Deliver first Vue milestone
3. Add User Story 2 → Test independently → Deliver customization-ready Vue package
4. Add User Story 3 → Test independently → Deliver future-adapter blueprint and parity contract
5. Finish Polish → Validate docs, playground, and quickstart

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: Vue composables and table/form/show components
   - Developer B: Shared adapter-testing behavior suites and authorization/dependency scenarios
   - Developer C: Theme/class system and customization slots
3. After User Story 1 stabilizes:
   - Developer A: Playground and docs
   - Developer B: Future adapter blueprint docs and placeholder package alignment
   - Developer C: Additional customization and parity validation

---

## Notes

- All tasks follow the required checklist format with IDs, story labels, and file paths
- The first milestone is intentionally limited to `@atlaskit/vue`
- Placeholder future adapter packages are planned/documented but not implemented for runtime behavior in this task list
- Shared behavior tests in `packages/adapter-testing` are part of the public delivery, not optional cleanup
