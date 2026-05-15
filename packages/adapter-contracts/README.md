# @atlaskit/adapter-contracts

`@atlaskit/adapter-contracts` contains framework-agnostic AtlasKit adapter
types and helper utilities for resource references, state contracts,
authorization rendering, and theme/class-map schemas.

## Exports

- resource reference types and normalization helpers
- table/form/show/action state types
- component prop and slot-prop state contracts
- class-map and theme-token schemas
- authorization rendering helpers

## Usage

```ts
import {
  renderAuthorization,
  resolveResourceReference,
  type ResourceTableProps
} from "@atlaskit/adapter-contracts";

const renderState = renderAuthorization({
  executable: true,
  visible: true
});

const resolved = resolveResourceReference("products", {
  byUriKey(uriKey) {
    return class ProductResource {
      static uriKey = uriKey;
    };
  }
});
```

## Scope

- no framework components
- no framework hooks/composables
- no routing or page abstractions
