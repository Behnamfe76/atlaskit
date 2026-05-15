import { describe, expect, it } from "vitest";

import { createAdapterFixture, behaviorScenarios } from "../src";

describe("table state contract", () => {
  it("tracks controlled and uncontrolled table state modes", () => {
    const fixture = createAdapterFixture("table", behaviorScenarios.tableState);

    expect(fixture.states).toEqual(["controlled", "uncontrolled"]);
    expect(fixture.states).toContain("controlled");
    expect(fixture.states).toContain("uncontrolled");
  });
});
