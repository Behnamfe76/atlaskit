import type { ResourcePages } from "./resourceTypes";

export function normalizeResourcePages(
  uriKey: string,
  pages?: ResourcePages
): ResourcePages {
  return {
    create: pages?.create ?? `/${uriKey}/create`,
    detail: pages?.detail ?? `/${uriKey}/:id`,
    edit: pages?.edit ?? `/${uriKey}/:id/edit`,
    index: pages?.index ?? `/${uriKey}`
  };
}
