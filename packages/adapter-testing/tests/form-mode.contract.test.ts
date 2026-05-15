import { describe, expect, it } from "vitest";

import { behaviorScenarios } from "../src";

describe("form mode contract", () => {
  it("keeps create and edit as explicit form modes", () => {
    expect(behaviorScenarios.formMode).toEqual(["create", "edit"]);

    const createMode = {
      mode: behaviorScenarios.formMode[0],
      recordLoaded: false
    };
    const editMode = {
      mode: behaviorScenarios.formMode[1],
      recordLoaded: true
    };

    expect(createMode).toMatchObject({
      mode: "create",
      recordLoaded: false
    });
    expect(editMode).toMatchObject({
      mode: "edit",
      recordLoaded: true
    });
  });
});
