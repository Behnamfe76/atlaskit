import { describe, expect, it } from "vitest";

import { useActionRunner } from "../../src/composables/useActionRunner";

describe("useActionRunner", () => {
  it("executes action callbacks and exposes result state", async () => {
    const runner = useActionRunner({
      actions: [
        {
          async execute(context: Record<string, unknown>) {
            return {
              count: (context.selection as unknown[]).length
            };
          }
        }
      ],
      context: {
        resource: "products"
      },
      resource: "products",
      selection: [{ id: 1 }, { id: 2 }]
    });

    const result = await runner.execute(runner.actions.value[0]);

    expect(result).toEqual({ count: 2 });
    expect(runner.state.value.result).toEqual({ count: 2 });
    expect(runner.executing.value).toBe(false);
  });
});
