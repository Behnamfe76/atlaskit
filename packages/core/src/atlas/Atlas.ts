import { ServiceContainer } from "../container/ServiceContainer";
import { createServiceToken } from "../container/serviceTokens";
import type { ResourceRegistry } from "../registries/ResourceRegistry";
import { configureResources } from "./configureResources";

import type { AtlasConfig, AtlasRuntime } from "./AtlasConfig";

const resourceRegistryToken =
  createServiceToken<ResourceRegistry>("resourceRegistry");

export class Atlas {
  static #runtime?: AtlasRuntime;

  static configure(config: AtlasConfig): AtlasRuntime {
    const container = new ServiceContainer();
    const resourceRegistry = configureResources(config.resources ?? []);

    container.register(resourceRegistryToken, resourceRegistry);

    const runtime: AtlasRuntime = {
      config,
      container,
      resourceRegistry
    };

    this.#runtime = runtime;

    return runtime;
  }

  static reset(): void {
    this.#runtime = undefined;
  }

  static runtime(): AtlasRuntime {
    if (!this.#runtime) {
      throw new Error("Atlas has not been configured.");
    }

    return this.#runtime;
  }
}
