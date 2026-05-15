# @atlaskit/core

`@atlaskit/core` provides the framework-neutral AtlasKit engine. It owns
resource registration, field authoring, validation, localization, transport
normalization, authorization, eventing, cache state, and plugin extension
points.

## Install

```bash
pnpm add @atlaskit/core
```

## Usage

```ts
import { Atlas, Resource, Rule, Text } from "@atlaskit/core";

class ProductResource extends Resource {
  static override id = "products";
  static override uriKey = "products";

  override fields() {
    return [
      Text.make("Name", "name").rulesFor([Rule.required(), Rule.max(255)])
    ];
  }
}

const runtime = Atlas.configure({
  resources: [ProductResource]
});

runtime.resolveResource("products");
```

## Includes

- `Atlas.configure(...)` runtime bootstrap
- `Resource` and built-in field classes
- registries for resources, fields, locales, validation, and plugins
- `I18n`, `ResponseNormalizer`, `QueryClient`, `AuthorizationManager`, and `EventBus`

## Scope

This package does not include rendering adapters. UI packages should consume
its contracts instead of moving engine logic out of core.
