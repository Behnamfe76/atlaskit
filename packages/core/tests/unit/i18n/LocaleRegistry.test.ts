import { describe, expect, it } from "vitest";

import { DuplicateRegistrationError, LocaleRegistry } from "../../../src";

describe("LocaleRegistry", () => {
  it("stores locale bundles and rejects duplicates", () => {
    const registry = new LocaleRegistry();
    registry.register({
      code: "en",
      currency: "USD",
      direction: "ltr",
      messages: {}
    });

    expect(registry.get("en").direction).toBe("ltr");
    expect(() =>
      registry.register({
        code: "en",
        currency: "USD",
        direction: "ltr",
        messages: {}
      })
    ).toThrowError(DuplicateRegistrationError);
  });
});
