# @atlaskit/testing

`@atlaskit/testing` contains shared AtlasKit fixtures used by package and
integration tests.

## Install

```bash
pnpm add -D @atlaskit/testing
```

## Usage

```ts
import { createFixtureResource, createRegistryLabel } from "@atlaskit/testing";

const ProductResource = createFixtureResource("Product");
const registryLabel = createRegistryLabel("resource");
```

## Exports

- `createFixtureResource`
- `createFixtureRegistry`
- `createRegistryLabel`
