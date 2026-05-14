import type { ServiceContainer } from "../container/ServiceContainer";
import type { ResourceRegistry } from "../registries/ResourceRegistry";
import type { ResourceClass } from "../resources/resourceTypes";

export interface AtlasConfig {
  readonly resources?: readonly ResourceClass[];
}

export interface AtlasRuntime {
  readonly config: AtlasConfig;
  readonly container: ServiceContainer;
  readonly resourceRegistry: ResourceRegistry;
}
