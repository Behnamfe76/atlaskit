import { renderAuthorization } from "@atlaskit/adapter-contracts";
import type { Field } from "@atlaskit/core";
import { computed, toValue, type MaybeRefOrGetter } from "vue";

import type { FieldRendererProps } from "../contracts/componentProps";

type FieldMode = FieldRendererProps["mode"];

function fieldPage(mode: FieldMode): "index" | "detail" | "create" | "edit" {
  return mode === "show" ? "detail" : mode;
}

function extractRelationLabel(value: unknown): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    const candidate = value as Record<string, unknown>;

    for (const key of ["label", "name", "title", "id"]) {
      if (candidate[key] !== undefined) {
        return String(candidate[key]);
      }
    }
  }

  return "";
}

function formatFieldValue(field: Field, value: unknown): string {
  if (value == null) {
    return "";
  }

  if (field.type === "belongsTo") {
    return extractRelationLabel(value);
  }

  if (field.type === "belongsToMany") {
    return Array.isArray(value)
      ? value.map(extractRelationLabel).filter(Boolean).join(", ")
      : "";
  }

  if (field.type === "select") {
    const options = field.displayMeta.options as
      | Record<string, string>
      | undefined;
    if (options && (typeof value === "string" || typeof value === "number")) {
      return options[String(value)] ?? String(value);
    }
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => extractRelationLabel(item) || String(item))
      .join(", ");
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

function toCollection(value: unknown): readonly string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => extractRelationLabel(item) || String(item));
}

export function useFieldRenderer(input: MaybeRefOrGetter<FieldRendererProps>) {
  const options = computed(() => toValue(input));
  const field = computed(() => options.value.field);
  const mode = computed(() => options.value.mode);
  const attribute = computed(() => field.value.attribute);
  const page = computed(() => fieldPage(mode.value));

  const rawValue = computed(() => {
    if (options.value.value !== undefined) {
      return options.value.value;
    }

    return options.value.state?.values?.[attribute.value];
  });

  const dependencyVisible = computed(() => {
    return options.value.state?.dependencyVisibility?.[attribute.value];
  });

  const renderState = computed(() =>
    renderAuthorization({
      executable: field.value.displayMeta.disabled !== true,
      visible: dependencyVisible.value ?? field.value.isVisibleOn(page.value)
    })
  );

  const errors = computed(
    () =>
      options.value.errors ??
      options.value.state?.errors?.[attribute.value] ??
      []
  );
  const displayValue = computed(() =>
    formatFieldValue(field.value, rawValue.value)
  );
  const collectionValue = computed(() => toCollection(rawValue.value));
  const optionsMap = computed(
    () =>
      (field.value.displayMeta.options as Record<string, string> | undefined) ??
      {}
  );
  const disabled = computed(
    () =>
      renderState.value === "disabled" ||
      mode.value === "index" ||
      mode.value === "show"
  );
  const inputType = computed(() => {
    switch (field.value.type) {
      case "number":
      case "currency":
        return "number";
      case "date":
        return "date";
      default:
        return "text";
    }
  });

  return {
    attribute,
    collectionValue,
    disabled,
    displayValue,
    errors,
    field,
    fieldType: computed(() => field.value.type),
    helpText: computed(() => field.value.helpText),
    inputType,
    isFormMode: computed(
      () => mode.value === "create" || mode.value === "edit"
    ),
    label: computed(() => field.value.label),
    mode,
    options: optionsMap,
    placeholder: computed(() => field.value.placeholder),
    rawValue,
    renderState
  };
}
