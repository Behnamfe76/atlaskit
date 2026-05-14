import { MissingServiceError } from "../support/errors";

import type { ServiceToken } from "./serviceTokens";

export class ServiceContainer {
  readonly #services = new Map<symbol, unknown>();

  has<T>(token: ServiceToken<T> | symbol): boolean {
    return this.#services.has(token);
  }

  register<T>(token: ServiceToken<T> | symbol, service: T): this {
    this.#services.set(token, service);
    return this;
  }

  resolve<T>(token: ServiceToken<T> | symbol): T {
    const service = this.#services.get(token);

    if (service === undefined) {
      throw new MissingServiceError(String(token.description ?? token));
    }

    return service as T;
  }
}
