import type { PluginContext, PluginDefinition } from "./pluginTypes";

export abstract class Plugin implements PluginDefinition {
  abstract readonly name: string;
  abstract readonly version: string;

  register(context: PluginContext): void {
    void context;
  }
}
