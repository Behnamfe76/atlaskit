import { describe, expect, it } from "vitest";

import { AuthorizationManager } from "../../../src";

describe("AuthorizationManager", () => {
  it("merges local and remote abilities with deny precedence", () => {
    const manager = new AuthorizationManager({
      enabled: true,
      localAbilities: {
        update: true,
        view: true
      }
    });

    const resolved = manager.resolve({
      update: false,
      view: true
    });

    expect(resolved.update).toBe(false);
    expect(resolved.view).toBe(true);
  });
});
