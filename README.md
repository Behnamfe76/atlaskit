# AtlasKit

AtlasKit is a `pnpm` monorepo for a framework-agnostic admin resource engine.
The first release centers on `@atlaskit/core`, a typed runtime for resources,
fields, validation, localization, transport normalization, authorization,
events, cache state, and plugins, plus `@atlaskit/cli` for resource stub
generation and `@atlaskit/testing` for shared test fixtures.

## Packages

- `@atlaskit/core`: core engine contracts and runtime services
- `@atlaskit/cli`: resource generator and CLI helpers
- `@atlaskit/testing`: shared fixtures for package and integration tests
- `@atlaskit/adapter-contracts`: framework-agnostic adapter state, resource,
  authorization, class-map, and theme-token contracts
- `@atlaskit/adapter-testing`: reusable adapter behavior fixtures and parity
  scenarios
- `@atlaskit/vue`: the first reference rendering adapter for AtlasKit
- `examples/playground`: manual verification app for local development

## Workspace Commands

```bash
pnpm install
pnpm lint
pnpm test
pnpm build
```

## Quick Start

```ts
import { Atlas, Resource, Text } from "@atlaskit/core";

class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";

  override fields() {
    return [Text.make("Name", "name")];
  }
}

Atlas.configure({
  resources: [ProductResource]
});
```

Mount the Vue adapter in a Vue 3 app:

```ts
import { createApp, h } from "vue";
import { AtlasResourceTable } from "@atlaskit/vue";

createApp({
  render: () => h(AtlasResourceTable, { resource: "products" })
}).mount("#app");
```

Generate a new resource stub with:

```bash
pnpm --filter @atlaskit/cli exec atlaskit generate resource Product
```

## Constraints

- `@atlaskit/core` stays UI-agnostic and does not render
- framework adapters depend on `@atlaskit/core` and must not duplicate core logic
- adapters are limited to reusable rendering surfaces, framework-native state binding,
  component APIs, slots/render props, class customization, and core service integration
- adapters do not include routing integrations or page abstractions
- adapter styling uses TailwindCSS utilities plus class maps and theme-token customization
- the playground is for manual verification only
