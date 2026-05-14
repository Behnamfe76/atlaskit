import { describe, expect, it } from "vitest";

import { Atlas, Resource } from "../../../src";

class ContractResource extends Resource {
  static override id = "contracts";
  static override uriKey = "contracts";
}

describe("core public API contract", () => {
  it("exports Atlas and Resource and supports startup registration", () => {
    const runtime = Atlas.configure({
      resources: [ContractResource]
    });

    expect(Atlas).toBeTypeOf("function");
    expect(Resource).toBeTypeOf("function");
    expect(runtime.resourceRegistry.getByUriKey("contracts")).toBe(
      ContractResource
    );
  });
});
