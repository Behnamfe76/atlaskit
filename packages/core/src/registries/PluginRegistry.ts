import { BaseRegistry } from "./BaseRegistry";

import type { PluginDefinition } from "../plugins/pluginTypes";

export class PluginRegistry extends BaseRegistry<string, PluginDefinition> {
  constructor() {
    super("PluginRegistry");
  }

  register(plugin: PluginDefinition): this {
    this.registerEntry(plugin.name, plugin);
    return this;
  }
}
