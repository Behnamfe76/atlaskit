# @atlaskit/adapter-testing

`@atlaskit/adapter-testing` contains reusable fixtures and behavior scenarios
for adapter parity checks across AtlasKit framework packages.

## Early Exports

- fixture creators for adapter behavior tests
- shared scenario labels for table, form, authorization, and styling behavior
- Vue reference adapter blueprint fixtures
- Vue parity scenario labels for action execution, async dependencies, and
  relationship fields

## Usage

```ts
import {
  futureAdapterBlueprints,
  vueReferenceAdapter,
  vueReferenceScenarios
} from "@atlaskit/adapter-testing";

futureAdapterBlueprints.forEach((blueprint) => {
  expect(blueprint.requiredComponents).toEqual(
    vueReferenceAdapter.requiredComponents
  );
});

expect(vueReferenceScenarios.relationshipFields).toContain("belongsToMany");
```

## Scope

- no framework rendering code
- no router/page abstractions
