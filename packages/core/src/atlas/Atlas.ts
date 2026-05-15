import { AuthorizationManager } from "../authorization/AuthorizationManager";
import type { QueryClient } from "../cache/QueryClient";
import { ServiceContainer } from "../container/ServiceContainer";
import { createServiceToken } from "../container/serviceTokens";
import type { EventBus } from "../events/EventBus";
import { I18n } from "../i18n/I18n";
import type { FieldRegistry } from "../registries/FieldRegistry";
import type { LocaleRegistry } from "../registries/LocaleRegistry";
import type { PluginRegistry } from "../registries/PluginRegistry";
import type { ResourceRegistry } from "../registries/ResourceRegistry";
import type { ValidationRegistry } from "../registries/ValidationRegistry";
import { createDefaultServices } from "./defaultServices";
import { emitResourceResolved } from "./runtimeHooks";
import { configurePlugins } from "./configurePlugins";
import { configureResources } from "./configureResources";

import type { AtlasConfig, AtlasRuntime } from "./AtlasConfig";

const resourceRegistryToken =
  createServiceToken<ResourceRegistry>("resourceRegistry");
const fieldRegistryToken = createServiceToken<FieldRegistry>("fieldRegistry");
const validationRegistryToken =
  createServiceToken<ValidationRegistry>("validationRegistry");
const localeRegistryToken =
  createServiceToken<LocaleRegistry>("localeRegistry");
const pluginRegistryToken =
  createServiceToken<PluginRegistry>("pluginRegistry");
const eventBusToken = createServiceToken<EventBus>("eventBus");
const queryClientToken = createServiceToken<QueryClient>("queryClient");
const authorizationToken = createServiceToken<AuthorizationManager>(
  "authorizationManager"
);
const i18nToken = createServiceToken<I18n>("i18n");

export class Atlas {
  static #runtime: AtlasRuntime | undefined = undefined;

  static configure(config: AtlasConfig): AtlasRuntime {
    const container = new ServiceContainer();
    const defaults = createDefaultServices();
    const resourceRegistry = configureResources(config.resources ?? []);
    const fieldRegistry = defaults.fieldRegistry;
    const validationRegistry = defaults.validationRegistry;
    const localeRegistry = defaults.localeRegistry;
    const pluginRegistry = defaults.pluginRegistry;
    const eventBus = config.eventBus ?? defaults.eventBus;
    const queryClient = defaults.queryClient;
    const authorizationManager = new AuthorizationManager(config.authorization);

    for (const locale of config.locales ?? []) {
      localeRegistry.register(locale);
    }

    container.register(resourceRegistryToken, resourceRegistry);
    container.register(fieldRegistryToken, fieldRegistry);
    container.register(validationRegistryToken, validationRegistry);
    container.register(localeRegistryToken, localeRegistry);
    container.register(pluginRegistryToken, pluginRegistry);
    container.register(eventBusToken, eventBus);
    container.register(queryClientToken, queryClient);
    container.register(authorizationToken, authorizationManager);
    container.register(
      i18nToken,
      new I18n(localeRegistry, {
        fallbackLocale: "en",
        locale: "en"
      })
    );

    configurePlugins(config.plugins ?? [], {
      authorizationManager,
      eventBus,
      localeRegistry,
      pluginRegistry,
      queryClient,
      validationRegistry
    });

    const runtime: AtlasRuntime = {
      authorizationManager,
      config,
      container,
      eventBus,
      fieldRegistry,
      i18n: container.resolve(i18nToken),
      localeRegistry,
      pluginRegistry,
      queryClient,
      resourceRegistry,
      resolveResource(identifier: string) {
        const resource = identifier.includes("/")
          ? resourceRegistry.getByUriKey(identifier)
          : resourceRegistry.getById(identifier);
        emitResourceResolved(eventBus, resource.id ?? identifier);
        return resource;
      },
      validationRegistry
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
