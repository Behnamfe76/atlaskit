export interface AdapterFixture {
  readonly name: string;
  readonly states: readonly string[];
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
