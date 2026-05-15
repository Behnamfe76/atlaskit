import type { AuthorizationConfig } from "../authorization/authorizationTypes";
import type { EventBus } from "../events/EventBus";
import type { I18n } from "../i18n/I18n";
import type { LocaleBundle } from "../i18n/localeTypes";
import type { FieldRegistry } from "../registries/FieldRegistry";
import type { LocaleRegistry } from "../registries/LocaleRegistry";
import type { PluginRegistry } from "../registries/PluginRegistry";
import type { ValidationRegistry } from "../registries/ValidationRegistry";
import type { ServiceContainer } from "../container/ServiceContainer";
import type { AuthorizationManager } from "../authorization/AuthorizationManager";
import type { QueryClient } from "../cache/QueryClient";
import type { EventBus as EventBusType } from "../events/EventBus";
import type { PluginDefinition } from "../plugins/pluginTypes";
import type { ResourceRegistry } from "../registries/ResourceRegistry";
import type { ResourceClass } from "../resources/resourceTypes";

export interface AtlasConfig {
  readonly authorization?: AuthorizationConfig;
  readonly eventBus?: EventBus;
  readonly locales?: readonly LocaleBundle[];
  readonly plugins?: readonly PluginDefinition[];
  readonly resources?: readonly ResourceClass[];
}

export interface AtlasRuntime {
  readonly authorizationManager: AuthorizationManager;
  readonly config: AtlasConfig;
  readonly container: ServiceContainer;
  readonly eventBus: EventBusType;
  readonly fieldRegistry: FieldRegistry;
  readonly i18n: I18n;
  readonly localeRegistry: LocaleRegistry;
  readonly pluginRegistry: PluginRegistry;
  readonly queryClient: QueryClient;
  readonly resourceRegistry: ResourceRegistry;
  readonly validationRegistry: ValidationRegistry;
  resolveResource(identifier: string): ResourceClass;
}
