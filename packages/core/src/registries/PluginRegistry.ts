import { BaseRegistry } from "./BaseRegistry";

import type { PluginDefinition } from "../plugins/pluginTypes";

export class PluginRegistry extends BaseRegistry<string, PluginDefinition> {
  register(plugin: PluginDefinition): this {
    this.registerEntry(plugin.name, plugin);
    return this;
  }
}
