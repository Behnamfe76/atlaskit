import type { QueryClient } from "./QueryClient";
import type { QueryKey } from "./cacheTypes";

export function invalidateQuery(client: QueryClient, prefix: QueryKey): void {
  client.invalidateQueries(prefix);
}

export function optimisticWrite<TData>(
  client: QueryClient,
  queryKey: QueryKey,
  updater: (current: TData | undefined) => TData
): void {
  client.applyOptimisticUpdate(queryKey, updater);
}
