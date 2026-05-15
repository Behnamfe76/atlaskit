import { describe, expect, it } from "vitest";

import { DependencyResolver, Text } from "../../../src";

describe("dependency resolution", () => {
  it("applies field visibility changes from dependency callbacks", () => {
    const fields = [
      Text.make("Role", "role"),
      Text.make("Secret", "secret").dependsOn("role", (field, values) => {
        if (values.role !== "admin") {
          field.hideOnDetail();
        }
      })
    ];

    const hidden = DependencyResolver.resolve(fields, {
      role: "viewer"
    });
    const shown = DependencyResolver.resolve(fields, {
      role: "admin"
    });

    expect(hidden[1]?.isVisibleOn("detail")).toBe(false);
    expect(shown[1]?.isVisibleOn("detail")).toBe(true);
  });
});
