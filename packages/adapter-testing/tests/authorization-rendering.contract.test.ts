import { describe, expect, it } from "vitest";

import { renderAuthorization } from "../../adapter-contracts/src";
import { behaviorScenarios } from "../src";

describe("authorization rendering contract", () => {
  it("maps visible and executable states to active, disabled, and hidden", () => {
    expect(behaviorScenarios.authorization).toEqual([
      "hidden",
      "disabled",
      "active"
    ]);

    expect(renderAuthorization({ executable: true, visible: true })).toBe(
      "active"
    );
    expect(renderAuthorization({ executable: false, visible: true })).toBe(
      "disabled"
    );
    expect(renderAuthorization({ executable: false, visible: false })).toBe(
      "hidden"
    );
  });
});
