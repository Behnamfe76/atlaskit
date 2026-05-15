import { createAdapterBlueprint } from "./adapterFixtures";

export const vueReferenceAdapter = createAdapterBlueprint(
  "@atlaskit/vue",
  "@atlaskit/vue",
  "shared-adapter-behavior"
);

export const futureAdapterBlueprints = [
  createAdapterBlueprint(
    "@atlaskit/dom",
    vueReferenceAdapter.referenceAdapter,
    vueReferenceAdapter.contract
  ),
  createAdapterBlueprint(
    "@atlaskit/react",
    vueReferenceAdapter.referenceAdapter,
    vueReferenceAdapter.contract
  ),
  createAdapterBlueprint(
    "@atlaskit/angular",
    vueReferenceAdapter.referenceAdapter,
    vueReferenceAdapter.contract
  ),
  createAdapterBlueprint(
    "@atlaskit/svelte",
    vueReferenceAdapter.referenceAdapter,
    vueReferenceAdapter.contract
  ),
  createAdapterBlueprint(
    "@atlaskit/solid",
    vueReferenceAdapter.referenceAdapter,
    vueReferenceAdapter.contract
  )
] as const;
