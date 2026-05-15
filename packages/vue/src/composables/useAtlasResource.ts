import { Atlas, type Resource, type ResourceClass } from "@atlaskit/core";
import {
  isResourceInstanceLike,
  resolveResourceReference,
  type ResourceReference
} from "@atlaskit/adapter-contracts";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

export interface UseAtlasResourceOptions {
  readonly resource: ResourceReference;
}

export function useAtlasResource(
  input: MaybeRefOrGetter<ResourceReference | UseAtlasResourceOptions>
) {
  const runtime = Atlas.runtime();
  const resource = computed<ResourceReference>(() => {
    const value = toValue(input);
    return typeof value === "object" && value !== null && "resource" in value
      ? value.resource
      : value;
  });

  const resolved = computed(() =>
    resolveResourceReference(resource.value, {
      byUriKey: (uriKey) => runtime.resourceRegistry.getByUriKey(uriKey)
    })
  );

  const resourceClass = computed(
    () => resolved.value.resourceClass as ResourceClass
  );

  const resourceInstance = computed<Resource>(() => {
    if (isResourceInstanceLike(resource.value)) {
      return resource.value as Resource;
    }

    return new resourceClass.value();
  });

  const metadata = computed(() =>
    runtime.resourceRegistry.metadataFor(
      resourceClass.value.id ?? resolved.value.identifier
    )
  );

  const fields = computed(() => resourceInstance.value.fields());
  const actions = computed(() => resourceInstance.value.actions());

  return {
    actions,
    fields,
    metadata,
    queryClient: runtime.queryClient,
    resolved,
    resourceClass,
    resourceInstance,
    runtime
  };
}
