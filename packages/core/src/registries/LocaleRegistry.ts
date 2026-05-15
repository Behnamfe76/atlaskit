import { BaseRegistry } from "./BaseRegistry";

import type { LocaleBundle } from "../i18n/localeTypes";

export class LocaleRegistry extends BaseRegistry<string, LocaleBundle> {
  register(bundle: LocaleBundle): this {
    this.registerEntry(bundle.code, bundle);
    return this;
  }
}
