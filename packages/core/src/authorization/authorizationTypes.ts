export type AbilityMap = Record<string, boolean>;

export interface AuthorizationConfig {
  readonly enabled?: boolean;
  readonly localAbilities?: AbilityMap;
}
