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

Generate a new resource stub with:

```bash
pnpm --filter @atlaskit/cli exec atlaskit generate resource Product
```

## Constraints

- `@atlaskit/core` stays UI-agnostic and does not render
- framework adapters are intentionally out of scope for this release
- the playground is for manual verification only
