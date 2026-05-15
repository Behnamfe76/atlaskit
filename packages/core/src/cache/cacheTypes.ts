import type { PaginationPayload } from "../transport/ResponseNormalizer";

export type QueryKey = readonly unknown[];

export type QueryStatus = "idle" | "loading" | "success" | "error" | "updating";

export interface QueryRecord<TData = unknown> {
  data?: TData;
  error?: unknown;
  invalidated: boolean;
  optimisticState?: TData;
  paginationState?: PaginationPayload;
  queryKey: QueryKey;
  status: QueryStatus;
  subscribers: number;
  updatedAt?: number;
}
