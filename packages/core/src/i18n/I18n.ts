import type { LocaleRegistry } from "../registries/LocaleRegistry";

import type { I18nOptions, LocaleBundle, LocaleDirection } from "./localeTypes";

function interpolate(message: string, values: Record<string, unknown>): string {
  return message.replaceAll(/\{(\w+)\}/g, (_, key: string) =>
    String(values[key] ?? "")
  );
}

export class I18n {
  #locale: string;

  constructor(
    private readonly locales: LocaleRegistry,
    private readonly options: I18nOptions
  ) {
    this.#locale = options.locale;
  }

  direction(): LocaleDirection {
    return this.lookupLocale(this.#locale).direction;
  }

  formatCurrency(value: number, currency?: string): string {
    const locale = this.lookupLocale(this.#locale);
    return new Intl.NumberFormat(this.#locale, {
      currency: currency ?? locale.currency ?? "USD",
      style: "currency"
    }).format(value);
  }

  formatDate(value: Date, format = "default"): string {
    const locale = this.lookupLocale(this.#locale);
    const options = locale.dateFormats?.[format] ?? {
      dateStyle: "medium"
    };

    return new Intl.DateTimeFormat(this.#locale, options).format(value);
  }

  setLocale(locale: string): void {
    this.#locale = locale;
  }

  t(key: string, values: Record<string, unknown> = {}): string {
    const count = typeof values.count === "number" ? values.count : undefined;
    const candidates =
      count === undefined
        ? [key]
        : [count === 1 ? `${key}_one` : `${key}_other`, key];

    for (const localeCode of [this.#locale, this.options.fallbackLocale]) {
      const locale = this.lookupLocale(localeCode);
      for (const candidate of candidates) {
        const message = locale.messages[candidate];
        if (message) {
          return interpolate(message, values);
        }
      }
      if (locale.fallbackCode && locale.fallbackCode !== localeCode) {
        const fallback = this.lookupLocale(locale.fallbackCode);
        for (const candidate of candidates) {
          const message = fallback.messages[candidate];
          if (message) {
            return interpolate(message, values);
          }
        }
      }
    }

    return key;
  }

  private lookupLocale(code: string): LocaleBundle {
    return this.locales.get(code);
  }
}
