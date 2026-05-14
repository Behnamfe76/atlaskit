import { Resource } from "../../../core/src/resources/Resource";

function toId(name: string): string {
  return name.trim().toLowerCase();
}

export function createFixtureResource(name: string) {
  const id = toId(name);

  return class FixtureResource extends Resource {
    static override id = id;
    static override labels = {
      plural: `${name}s`,
      singular: name
    };
    static override uriKey = `${id}s`;
  };
}

export function createFixtureRegistry(label: string) {
  return {
    entries: [] as string[],
    label
  };
}
