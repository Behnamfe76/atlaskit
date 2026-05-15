import type { AbilityMap, AuthorizationConfig } from "./authorizationTypes";

export class AuthorizationManager {
  constructor(private readonly config: AuthorizationConfig = {}) {}

  resolve(remoteAbilities: AbilityMap = {}): AbilityMap {
    if (!this.config.enabled) {
      return {};
    }

    const abilities = {
      ...(this.config.localAbilities ?? {}),
      ...remoteAbilities
    };

    for (const [ability, value] of Object.entries(
      this.config.localAbilities ?? {}
    )) {
      if (remoteAbilities[ability] === false || value === false) {
        abilities[ability] = false;
      }
    }

    return abilities;
  }
}
