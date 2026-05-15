import type { QueryKey, QueryRecord } from "./cacheTypes";

function keyFor(queryKey: QueryKey): string {
  return JSON.stringify(queryKey);
}

function matchesPrefix(queryKey: QueryKey, prefix: QueryKey): boolean {
  if (prefix.length > queryKey.length) {
    return false;
  }

  return prefix.every((value, index) => queryKey[index] === value);
}

export class QueryClient {
  readonly #records = new Map<string, QueryRecord>();
  readonly #listeners = new Map<string, Set<(record: QueryRecord) => void>>();

  applyOptimisticUpdate<TData>(
    queryKey: QueryKey,
    updater: (current: TData | undefined) => TData
  ): QueryRecord<TData> {
    return this.setQueryData(
      queryKey,
      updater(this.getQueryData(queryKey))
    ) as QueryRecord<TData>;
  }

  async fetchQuery<TData>(
    queryKey: QueryKey,
    fetcher: () => Promise<TData>
  ): Promise<TData> {
    this.updateRecord(queryKey, {
      invalidated: false,
      queryKey,
      status: "loading",
      subscribers: this.getRecord(queryKey)?.subscribers ?? 0
    });

    try {
      const data = await fetcher();
      this.setQueryData(queryKey, data);
      return data;
    } catch (error) {
      this.updateRecord(queryKey, {
        error,
        invalidated: false,
        queryKey,
        status: "error",
        subscribers: this.getRecord(queryKey)?.subscribers ?? 0,
        updatedAt: Date.now()
      });
      throw error;
    }
  }

  getQueryData<TData>(queryKey: QueryKey): TData | undefined {
    return this.getRecord<TData>(queryKey)?.data;
  }

  getRecord<TData = unknown>(
    queryKey: QueryKey
  ): QueryRecord<TData> | undefined {
    return this.#records.get(keyFor(queryKey)) as
      | QueryRecord<TData>
      | undefined;
  }

  invalidateQueries(prefix: QueryKey): void {
    for (const record of this.#records.values()) {
      if (matchesPrefix(record.queryKey, prefix)) {
        this.updateRecord(record.queryKey, {
          ...record,
          invalidated: true
        });
      }
    }
  }

  setQueryData<TData>(queryKey: QueryKey, data: TData): QueryRecord<TData> {
    const nextRecord: QueryRecord<TData> = {
      data,
      invalidated: false,
      queryKey,
      status: "success",
      subscribers: this.getRecord(queryKey)?.subscribers ?? 0,
      updatedAt: Date.now()
    };
    this.updateRecord(queryKey, nextRecord);
    return nextRecord;
  }

  subscribe(
    queryKey: QueryKey,
    listener: (record: QueryRecord) => void
  ): () => void {
    const cacheKey = keyFor(queryKey);
    const listeners = this.#listeners.get(cacheKey) ?? new Set();
    listeners.add(listener);
    this.#listeners.set(cacheKey, listeners);

    this.updateRecord(queryKey, {
      ...(this.getRecord(queryKey) ?? {
        invalidated: false,
        queryKey,
        status: "idle",
        subscribers: 0
      }),
      subscribers: listeners.size
    });

    return () => {
      const current = this.#listeners.get(cacheKey);
      current?.delete(listener);
      this.updateRecord(queryKey, {
        ...(this.getRecord(queryKey) ?? {
          invalidated: false,
          queryKey,
          status: "idle",
          subscribers: 0
        }),
        subscribers: current?.size ?? 0
      });
    };
  }

  private notify(queryKey: QueryKey, record: QueryRecord): void {
    for (const listener of this.#listeners.get(keyFor(queryKey)) ?? []) {
      listener(record);
    }
  }

  private updateRecord(queryKey: QueryKey, record: QueryRecord): void {
    this.#records.set(keyFor(queryKey), record);
    this.notify(queryKey, record);
  }
}
