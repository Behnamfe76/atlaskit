import type { Constructor } from "../support/types";

import type { LifecycleHooks } from "./Hooks";

export type PaginationMode =
  | "collection"
  | "cursorPaginate"
  | "paginate"
  | "simplePaginate";

export interface ResourceLabels {
  readonly plural: string;
  readonly singular: string;
}

export interface ResourcePages {
  readonly create: string;
  readonly detail: string;
  readonly edit: string;
  readonly index: string;
}

export interface ResourceEndpoints {
  readonly collection: string;
  readonly item: string;
}

export interface ResourceMetadata {
  readonly endpoints: ResourceEndpoints;
  readonly id: string;
  readonly labels: ResourceLabels;
  readonly name: string;
  readonly pages: ResourcePages;
  readonly pagination: PaginationMode;
  readonly searchable: readonly string[];
  readonly uriKey: string;
}

export interface ResourceStaticProperties {
  readonly endpoints?: ResourceEndpoints;
  readonly id?: string;
  readonly labels?: ResourceLabels;
  readonly pages?: ResourcePages;
  readonly pagination?: PaginationMode;
  readonly searchable?: readonly string[];
  readonly uriKey?: string;
}

export type ResourceClass = Constructor<Resource> &
  typeof Resource &
  ResourceStaticProperties;

export interface ResourceInstanceContract {
  actions(): readonly unknown[];
  fields(): readonly unknown[];
  filters(): readonly unknown[];
  hooks(): LifecycleHooks;
  lenses(): readonly unknown[];
  metrics(): readonly unknown[];
}
