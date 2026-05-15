import type { PluginDefinition } from "./pluginTypes";
import type { PluginContext } from "./pluginTypes";

export function registerPlugin(
  plugin: PluginDefinition,
  context: PluginContext
): PluginDefinition {
  plugin.register(context);
  context.pluginRegistry.register(plugin);
  return plugin;
}
