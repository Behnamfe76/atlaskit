import type { QueryKey, QueryRecord } from "@atlaskit/core";
import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";

import type { TableState } from "@atlaskit/adapter-contracts";

import type { ResourceTableProps } from "../contracts/componentProps";
import { useAtlasResource } from "./useAtlasResource";

function cloneFilters(
  value: Readonly<Record<string, unknown>> | undefined
): Record<string, unknown> {
  return value ? { ...value } : {};
}

function hasControlledState(state: ResourceTableProps["state"]): boolean {
  return state !== undefined;
}

export function useResourceTable(input: MaybeRefOrGetter<ResourceTableProps>) {
  const options = computed(() => toValue(input));
  const atlasResource = useAtlasResource(
    computed(() => options.value.resource)
  );

  const search = ref(options.value.state?.search ?? "");
  const filters = ref<Record<string, unknown>>(
    cloneFilters(options.value.state?.filters)
  );
  const sort = ref<string | null>(options.value.state?.sort ?? null);
  const page = ref(options.value.state?.page ?? 1);
  const perPage = ref(options.value.state?.perPage ?? 15);
  const selectedRows = ref<readonly unknown[]>(
    options.value.state?.selectedRows ?? []
  );
  const loading = ref(options.value.state?.loading ?? false);
  const error = ref<unknown>(options.value.state?.error);
  const queryRecord = ref<QueryRecord<unknown> | undefined>(undefined);

  watch(
    options,
    (nextOptions) => {
      if (!nextOptions.state) {
        return;
      }

      search.value = nextOptions.state.search ?? search.value;
      filters.value = cloneFilters(nextOptions.state.filters) ?? filters.value;
      sort.value = nextOptions.state.sort ?? sort.value;
      page.value = nextOptions.state.page ?? page.value;
      perPage.value = nextOptions.state.perPage ?? perPage.value;
      selectedRows.value = nextOptions.state.selectedRows ?? selectedRows.value;
      loading.value = nextOptions.state.loading ?? loading.value;
      error.value = nextOptions.state.error;
    },
    {
      deep: true,
      immediate: true
    }
  );

  const queryState = computed(() => ({
    filters: filters.value,
    page: page.value,
    perPage: perPage.value,
    search: search.value,
    sort: sort.value
  }));

  const queryKey = computed<QueryKey>(() => [
    "atlas",
    atlasResource.metadata.value.uriKey,
    "table",
    queryState.value,
    options.value.queryOptions ?? {}
  ]);

  watch(
    queryKey,
    (nextQueryKey, _previousQueryKey, onCleanup) => {
      const client = atlasResource.queryClient;
      const syncFromRecord = (nextRecord?: QueryRecord<unknown>) => {
        queryRecord.value = nextRecord;

        if (!nextRecord) {
          return;
        }

        loading.value =
          nextRecord.status === "loading" || nextRecord.status === "updating";
        error.value = nextRecord.error;
      };

      syncFromRecord(client.getRecord(nextQueryKey));
      const unsubscribe = client.subscribe(nextQueryKey, syncFromRecord);
      onCleanup(unsubscribe);
    },
    {
      immediate: true
    }
  );

  const rows = computed<readonly unknown[]>(() => {
    const data = queryRecord.value?.data;

    if (Array.isArray(data)) {
      return data;
    }

    if (
      data &&
      typeof data === "object" &&
      "data" in data &&
      Array.isArray((data as { data?: unknown[] }).data)
    ) {
      return (data as { data: unknown[] }).data;
    }

    return [];
  });

  function patchState(nextState: Partial<TableState>) {
    if (nextState.search !== undefined) {
      search.value = nextState.search;
    }

    if (nextState.filters !== undefined) {
      filters.value = cloneFilters(nextState.filters);
    }

    if (nextState.sort !== undefined) {
      sort.value = nextState.sort;
    }

    if (nextState.page !== undefined) {
      page.value = nextState.page;
    }

    if (nextState.perPage !== undefined) {
      perPage.value = nextState.perPage;
    }

    if (nextState.selectedRows !== undefined) {
      selectedRows.value = nextState.selectedRows;
    }
  }

  const state = computed<TableState>(() => ({
    error: error.value,
    filters: filters.value,
    loading: loading.value,
    mode: hasControlledState(options.value.state)
      ? "controlled"
      : "uncontrolled",
    page: page.value,
    perPage: perPage.value,
    search: search.value,
    selectedRows: selectedRows.value,
    sort: sort.value
  }));

  return {
    ...atlasResource,
    error,
    filters,
    loading,
    page,
    patchState,
    perPage,
    queryKey,
    queryRecord,
    rows,
    search,
    selectedRows,
    setFilters: (nextFilters: Record<string, unknown>) =>
      patchState({ filters: nextFilters }),
    setPage: (nextPage: number) => patchState({ page: nextPage }),
    setPerPage: (nextPerPage: number) => patchState({ perPage: nextPerPage }),
    setSearch: (nextSearch: string) => patchState({ search: nextSearch }),
    setSelectedRows: (nextSelectedRows: readonly unknown[]) =>
      patchState({ selectedRows: nextSelectedRows }),
    setSort: (nextSort: string | null) => patchState({ sort: nextSort }),
    sort,
    state
  };
}
