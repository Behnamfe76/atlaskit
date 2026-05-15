import { describe, expect, it } from "vitest";

import { bootstrapPlayground } from "../src/bootstrap";

describe("resource generator smoke", () => {
  it("bootstraps a generated resource and plugin into Atlas", () => {
    const runtime = bootstrapPlayground();

    expect(runtime.resourceRegistry.getById("products")).toBeDefined();
    expect(runtime.pluginRegistry.all()).toHaveLength(1);
  });
});
