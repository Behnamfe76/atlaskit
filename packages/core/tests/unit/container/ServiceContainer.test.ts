import { describe, expect, it } from "vitest";

import { ServiceContainer } from "../../../src/container/ServiceContainer";

describe("ServiceContainer", () => {
  it("registers and resolves singleton services", () => {
    const container = new ServiceContainer();
    const token = Symbol("service");
    const service = { name: "atlas" };

    container.register(token, service);

    expect(container.resolve<typeof service>(token)).toBe(service);
  });

  it("throws for missing services", () => {
    const container = new ServiceContainer();

    expect(() => container.resolve(Symbol("missing"))).toThrowError(
      /No service registered/
    );
  });
});
