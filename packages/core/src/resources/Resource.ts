import type { AuthorizationConfig } from "../authorization/authorizationTypes";

import type { LifecycleHooks } from "./Hooks";
import type {
  PaginationMode,
  ResourceEndpoints,
  ResourceLabels,
  ResourcePages
} from "./resourceTypes";

export abstract class Resource {
  static id?: string;
  static labels?: ResourceLabels;
  static pages?: ResourcePages;
  static pagination?: PaginationMode;
  static searchable?: readonly string[];
  static uriKey?: string;
  static endpoints?: ResourceEndpoints;
  static authorization?: AuthorizationConfig;

  actions(): readonly unknown[] {
    return [];
  }

  fields(): readonly unknown[] {
    return [];
  }

  filters(): readonly unknown[] {
    return [];
  }

  hooks(): LifecycleHooks {
    return {};
  }

  lenses(): readonly unknown[] {
    return [];
  }

  metrics(): readonly unknown[] {
    return [];
  }
}
