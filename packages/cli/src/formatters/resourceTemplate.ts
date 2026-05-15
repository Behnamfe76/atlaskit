import { renderResourceStub } from "../stubs/resource";

function toKebabCase(value: string): string {
  return value
    .trim()
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}

function toPascalCase(value: string): string {
  return value
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
    .join("");
}

export interface FormattedResourceTemplate {
  readonly className: string;
  readonly contents: string;
  readonly fileName: string;
  readonly id: string;
  readonly uriKey: string;
}

export function formatResourceTemplate(
  name: string
): FormattedResourceTemplate {
  const normalized = toPascalCase(name);

  if (!normalized || !/^[A-Z][A-Za-z0-9]*$/.test(normalized)) {
    throw new Error(`Invalid resource name "${name}".`);
  }

  const className = normalized.endsWith("Resource")
    ? normalized
    : `${normalized}Resource`;
  const id = toKebabCase(normalized.replace(/Resource$/, ""));
  const uriKey = `${id}s`;

  return {
    className,
    contents: renderResourceStub({
      className,
      id,
      resourceName: normalized,
      uriKey
    }),
    fileName: `${className}.ts`,
    id,
    uriKey
  };
}
