import { describe, expect, it } from "vitest";

import { BaseRegistry } from "../../../src/registries/BaseRegistry";

class ExampleRegistry extends BaseRegistry<string, { key: string }> {
  register(value: { key: string }) {
    this.registerEntry(value.key, value);
    return this;
  }
}

describe("BaseRegistry", () => {
  it("registers typed entries and resolves them by key", () => {
    const registry = new ExampleRegistry("example");

    registry.register({ key: "one" });

    expect(registry.get("one")).toEqual({ key: "one" });
  });

  it("returns immutable entry snapshots", () => {
    const registry = new ExampleRegistry("example");
    registry.register({ key: "one" });

    expect(() => {
      (registry.entries() as { key: string }[]).push({ key: "two" });
    }).toThrowError();
  });
});
