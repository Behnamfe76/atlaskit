import { describe, expect, it } from "vitest";

import { BaseRegistry } from "../../../src/registries/BaseRegistry";
import { DuplicateRegistrationError } from "../../../src/support/errors";

class ExampleRegistry extends BaseRegistry<string, { key: string }> {
  register(value: { key: string }) {
    this.registerEntry(value.key, value);
    return this;
  }
}

describe("BaseRegistry duplicate handling", () => {
  it("throws a duplicate registration error", () => {
    const registry = new ExampleRegistry("example");

    registry.register({ key: "one" });

    expect(() => registry.register({ key: "one" })).toThrowError(
      DuplicateRegistrationError
    );
  });
});
