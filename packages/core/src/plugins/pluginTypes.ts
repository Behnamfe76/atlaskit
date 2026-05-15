import type { AuthorizationManager } from "../authorization/AuthorizationManager";
import type { QueryClient } from "../cache/QueryClient";
import type { EventBus } from "../events/EventBus";
import type { LocaleRegistry } from "../registries/LocaleRegistry";
import type { PluginRegistry } from "../registries/PluginRegistry";
import type { ValidationRegistry } from "../registries/ValidationRegistry";

export interface PluginContext {
  readonly authorizationManager: AuthorizationManager;
  readonly eventBus: EventBus;
  readonly localeRegistry: LocaleRegistry;
  readonly pluginRegistry: PluginRegistry;
  readonly queryClient: QueryClient;
  readonly validationRegistry: ValidationRegistry;
}

export interface PluginDefinition {
  readonly name: string;
  readonly version: string;
  register(context: PluginContext): void;
}
