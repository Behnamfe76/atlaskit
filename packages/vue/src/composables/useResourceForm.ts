import {
  resolveFieldsForPage,
  validateFieldValue,
  type Field,
  type QueryKey,
  type QueryRecord
} from "@atlaskit/core";
import { computed, ref, toValue, watch, type MaybeRefOrGetter } from "vue";

import type { FormState } from "@atlaskit/adapter-contracts";

import type { ResourceFormProps } from "../contracts/componentProps";
import { useAtlasResource } from "./useAtlasResource";

export interface UseResourceFormOptions extends ResourceFormProps {
  readonly onSubmit?: (
    values: Readonly<Record<string, unknown>>
  ) => unknown | Promise<unknown>;
}

function toPage(mode: "create" | "edit"): "create" | "edit" {
  return mode;
}

function cloneField<TField extends Field>(field: TField): TField {
  return field.clone();
}

function collectDefaults(fields: readonly Field[]): Record<string, unknown> {
  return Object.fromEntries(
    fields
      .filter((field) => field.defaultValue !== undefined)
      .map((field) => [field.attribute, field.defaultValue])
  );
}

function cloneRecord(
  record: Readonly<Record<string, unknown>> | undefined
): Record<string, unknown> {
  return record ? { ...record } : {};
}

export function useResourceForm(
  input: MaybeRefOrGetter<UseResourceFormOptions>
) {
  const options = computed(() => toValue(input));
  const atlasResource = useAtlasResource(
    computed(() => options.value.resource)
  );

  const mode = computed(() => options.value.mode);
  const page = computed(() => toPage(mode.value));
  const fields = ref<readonly Field[]>([]);
  const dependencyVisibility = ref<Record<string, boolean>>({});
  const pendingDependencies = ref<readonly string[]>([]);
  const errors = ref<Record<string, readonly string[]>>({});
  const dirty = ref(false);
  const submitting = ref(false);
  const submitResult = ref<unknown>(undefined);
  const queryRecord = ref<QueryRecord<unknown> | undefined>(undefined);
  const values = ref<Record<string, unknown>>({});

  const recordValue = computed(() =>
    options.value.record ? cloneRecord(options.value.record) : undefined
  );

  const queryKey = computed<QueryKey | undefined>(() => {
    if (mode.value !== "edit" || options.value.recordId == null) {
      return undefined;
    }

    return [
      "atlas",
      atlasResource.metadata.value.uriKey,
      "show",
      options.value.recordId
    ] as const;
  });

  watch(
    [
      computed(() => atlasResource.resourceInstance.value),
      computed(() => options.value.initialValues),
      recordValue,
      mode
    ],
    ([resourceInstance, initialValues, record]) => {
      const pageFields = resolveFieldsForPage(
        resourceInstance.fields().map((field) => cloneField(field as Field)),
        page.value
      ) as readonly Field[];

      values.value = {
        ...collectDefaults(pageFields),
        ...cloneRecord(record),
        ...(initialValues ?? {})
      };
      dirty.value = false;
    },
    {
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

        if (
          nextRecord?.status === "success" &&
          nextRecord.data &&
          typeof nextRecord.data === "object" &&
          !Array.isArray(nextRecord.data)
        ) {
          values.value = {
            ...values.value,
            ...(nextRecord.data as Record<string, unknown>)
          };
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

  let dependencyRunId = 0;

  watch(
    [computed(() => atlasResource.resourceInstance.value), values, mode],
    async ([resourceInstance, nextValues, nextMode]) => {
      const currentRunId = ++dependencyRunId;
      const pageFields = resolveFieldsForPage(
        resourceInstance.fields().map((field) => cloneField(field as Field)),
        toPage(nextMode)
      ) as readonly Field[];

      fields.value = pageFields;
      dependencyVisibility.value = Object.fromEntries(
        pageFields.map((field) => [
          field.attribute,
          field.isVisibleOn(nextMode)
        ])
      );

      const pending = new Set<string>();

      for (const field of pageFields) {
        for (const dependency of field.dependencies) {
          const result = dependency.callback(field, nextValues);

          if (result instanceof Promise) {
            pending.add(field.attribute);
            await result;
          }
        }
      }

      if (currentRunId !== dependencyRunId) {
        return;
      }

      fields.value = pageFields;
      dependencyVisibility.value = Object.fromEntries(
        pageFields.map((field) => [
          field.attribute,
          field.isVisibleOn(nextMode)
        ])
      );
      pendingDependencies.value = [...pending];
    },
    {
      deep: true,
      immediate: true
    }
  );

  function validateField(attribute: string): readonly string[] {
    const field = fields.value.find(
      (candidate) => candidate.attribute === attribute
    );

    if (!field || dependencyVisibility.value[attribute] === false) {
      return [];
    }

    const nextErrors = validateFieldValue(
      values.value[attribute],
      field.rules,
      atlasResource.runtime.validationRegistry
    );

    errors.value = {
      ...errors.value,
      [attribute]: nextErrors
    };

    return nextErrors;
  }

  function validate(): boolean {
    let valid = true;

    for (const field of fields.value) {
      if (dependencyVisibility.value[field.attribute] === false) {
        continue;
      }

      if (validateField(field.attribute).length > 0) {
        valid = false;
      }
    }

    return valid;
  }

  async function submit(): Promise<unknown> {
    if (!validate()) {
      return undefined;
    }

    submitting.value = true;

    try {
      const result = options.value.onSubmit
        ? await options.value.onSubmit(values.value)
        : values.value;
      submitResult.value = result;
      return result;
    } finally {
      submitting.value = false;
    }
  }

  function setValue(attribute: string, value: unknown): void {
    values.value = {
      ...values.value,
      [attribute]: value
    };
    dirty.value = true;
  }

  const visibleFields = computed(() =>
    fields.value.filter(
      (field) => dependencyVisibility.value[field.attribute] !== false
    )
  );

  const state = computed<FormState>(() => ({
    dependencyVisibility: dependencyVisibility.value,
    dirty: dirty.value,
    errors: errors.value,
    mode: mode.value,
    submitResult: submitResult.value,
    submitting: submitting.value,
    values: values.value
  }));

  return {
    ...atlasResource,
    dirty,
    errors,
    fields,
    mode,
    pendingDependencies,
    queryKey,
    queryRecord,
    setValue,
    state,
    submit,
    submitResult,
    submitting,
    validate,
    validateField,
    values,
    visibleFields
  };
}
