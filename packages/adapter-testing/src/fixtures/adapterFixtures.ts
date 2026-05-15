export interface AdapterFixture {
  readonly name: string;
  readonly states: readonly string[];
}

export interface AdapterBlueprint {
  readonly contract: string;
  readonly packageName: string;
  readonly referenceAdapter: string;
  readonly requiredComponents: readonly string[];
  readonly requiredComposables: readonly string[];
}

export function createAdapterFixture(
  name: string,
  states: readonly string[]
): AdapterFixture {
  return {
    name,
    states
  };
}

export function createAdapterBlueprint(
  packageName: string,
  referenceAdapter: string,
  contract: string
): AdapterBlueprint {
  return {
    contract,
    packageName,
    referenceAdapter,
    requiredComponents: [
      "AtlasResourceTable",
      "AtlasResourceForm",
      "AtlasResourceShow",
      "AtlasFieldRenderer",
      "AtlasActionRunner"
    ],
    requiredComposables: [
      "useAtlasResource",
      "useResourceTable",
      "useResourceForm",
      "useResourceShow",
      "useFieldRenderer",
      "useActionRunner",
      "useAtlasTheme"
    ]
  };
}
