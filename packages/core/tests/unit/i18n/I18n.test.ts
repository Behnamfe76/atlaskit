import { describe, expect, it } from "vitest";

import { I18n, LocaleRegistry } from "../../../src";

describe("I18n", () => {
  it("supports fallback translation, interpolation, pluralization, rtl, and formatting", () => {
    const locales = new LocaleRegistry();
    locales.register({
      code: "en",
      currency: "USD",
      direction: "ltr",
      messages: {
        greeting: "Hello {name}",
        items_one: "{count} item",
        items_other: "{count} items"
      }
    });
    locales.register({
      code: "fa",
      currency: "IRR",
      direction: "rtl",
      fallbackCode: "en",
      messages: {
        greeting: "سلام {name}"
      }
    });

    const i18n = new I18n(locales, {
      fallbackLocale: "en",
      locale: "fa"
    });

    expect(i18n.t("greeting", { name: "Atlas" })).toBe("سلام Atlas");
    expect(i18n.t("items", { count: 2 })).toBe("2 items");
    expect(i18n.direction()).toBe("rtl");
    expect(i18n.formatDate(new Date("2024-01-02T00:00:00.000Z"))).toBeTypeOf(
      "string"
    );
    expect(i18n.formatCurrency(12)).toBeTypeOf("string");
  });
});
