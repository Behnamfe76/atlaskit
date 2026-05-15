import { describe, expect, it } from "vitest";

import { createAdapterFixture, behaviorScenarios } from "../src";

describe("adapter testing fixtures", () => {
  it("creates reusable adapter fixtures", () => {
    expect(createAdapterFixture("table", behaviorScenarios.tableState)).toEqual({
      name: "table",
      states: ["controlled", "uncontrolled"]
    });
  });
});
