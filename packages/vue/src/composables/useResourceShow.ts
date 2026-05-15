import type { QueryKey, QueryRecord } from "@atlaskit/core";
import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";

import type { ResourceShowProps } from "../contracts/componentProps";
import { useAtlasResource } from "./useAtlasResource";

export function useResourceShow(input: MaybeRefOrGetter<ResourceShowProps>) {
  const options = computed(() => toValue(input));
  const atlasResource = useAtlasResource(
    computed(() => options.value.resource)
  );

  const record = ref<Readonly<Record<string, unknown>> | undefined>(
    options.value.record ?? options.value.state?.record
  );
  const loading = ref(options.value.state?.loading ?? false);
  const error = ref(options.value.state?.error);
  const queryRecord = ref<QueryRecord<unknown> | undefined>(undefined);

  const queryKey = computed<QueryKey | undefined>(() => {
    if (options.value.resourceId == null) {
      return undefined;
    }

    return [
      "atlas",
      atlasResource.metadata.value.uriKey,
      "show",
      options.value.resourceId
    ] as const;
  });

  watch(
    options,
    (nextOptions) => {
      if (nextOptions.record) {
        record.value = nextOptions.record;
      }

      if (nextOptions.state?.record) {
        record.value = nextOptions.state.record;
      }

      loading.value = nextOptions.state?.loading ?? loading.value;
      error.value = nextOptions.state?.error;
    },
    {
      deep: true,
      immediate: true
    }
  );

  watch(
    queryKey,
    (nextQueryKey, _previousQueryKey, onCleanup) => {
      if (!nextQueryKey) {
        queryRecord.value = undefined;
        return;
      }

      const client = atlasResource.queryClient;
      const syncFromRecord = (nextRecord?: QueryRecord<unknown>) => {
        queryRecord.value = nextRecord;

        if (!nextRecord) {
          return;
        }

        loading.value =
          nextRecord.status === "loading" || nextRecord.status === "updating";
        error.value = nextRecord.error;

        if (
          nextRecord.status === "success" &&
          nextRecord.data &&
          typeof nextRecord.data === "object" &&
          !Array.isArray(nextRecord.data)
        ) {
          record.value = nextRecord.data as Readonly<Record<string, unknown>>;
        }
      };

      syncFromRecord(client.getRecord(nextQueryKey));
      const unsubscribe = client.subscribe(nextQueryKey, syncFromRecord);
      onCleanup(unsubscribe);
    },
    {
      immediate: true
    }
  );

  const state = computed(() => ({
    error: error.value,
    loading: loading.value,
    record: record.value
  }));

  return {
    ...atlasResource,
    error,
    loading,
    queryKey,
    queryRecord,
    record,
    state
  };
}
