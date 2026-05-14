import { ResourceRegistry } from "../registries/ResourceRegistry";
import type { ResourceClass } from "../resources/resourceTypes";

export function configureResources(
  resources: readonly ResourceClass[] = []
): ResourceRegistry {
  const registry = new ResourceRegistry();

  for (const resourceClass of resources) {
    registry.register(resourceClass);
  }

  return registry;
}
