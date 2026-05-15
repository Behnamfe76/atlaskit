import { registerPlugin } from "../plugins/registerPlugin";
import type { PluginDefinition } from "../plugins/pluginTypes";
import type { PluginContext } from "../plugins/pluginTypes";

export function configurePlugins(
  plugins: readonly PluginDefinition[],
  context: PluginContext
): void {
  for (const plugin of plugins) {
    registerPlugin(plugin, context);
  }
}
