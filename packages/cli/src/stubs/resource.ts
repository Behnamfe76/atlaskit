export interface ResourceStubContext {
  readonly className: string;
  readonly id: string;
  readonly resourceName: string;
  readonly uriKey: string;
}

export function renderResourceStub(context: ResourceStubContext): string {
  return `import { Resource, Text } from "@atlaskit/core";

export class ${context.className} extends Resource {
  static override id = "${context.id}";
  static override uriKey = "${context.uriKey}";

  override fields() {
    return [Text.make("Name", "name")];
  }
}
`;
}
