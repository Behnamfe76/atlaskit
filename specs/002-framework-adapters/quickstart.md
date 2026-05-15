# Quickstart: Framework Adapter Packages

## Goal

Verify the first delivery of AtlasKit framework adapters can expose
`@atlaskit/vue` as a reusable rendering package on top of `@atlaskit/core`,
with placeholder packages reserved for future adapters.

## Prerequisites

- Node.js LTS installed
- `pnpm` installed
- AtlasKit workspace dependencies installed

## Workspace Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Build the current workspace packages:

   ```bash
   pnpm build
   ```

3. Run package tests:

   ```bash
   pnpm test
   ```

## Consumer Install

Install the core runtime and Vue adapter in a Vue 3 application:

```bash
pnpm add @atlaskit/core @atlaskit/vue vue
```

TailwindCSS may be installed by the consumer for customization or alignment
with existing application styling, but the adapter does not require a global
CSS file for basic default rendering.

## Configure Atlas

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

## Mount the Vue Adapter

```vue
<script setup lang="ts">
import {
  AtlasResourceForm,
  AtlasResourceShow,
  AtlasResourceTable
} from "@atlaskit/vue";

const productResource = "products";
</script>

<template>
  <AtlasResourceTable :resource="productResource" />

  <AtlasResourceForm
    :resource="productResource"
    mode="create"
  />

  <AtlasResourceShow
    :resource="productResource"
    :resource-id="1"
  />
</template>
```

## Customize Classes and Theme Tokens

```vue
<script setup lang="ts">
import { AtlasResourceTable, createClassMap } from "@atlaskit/vue";

const classMap = createClassMap({
  table: {
    root: "rounded-lg border border-slate-200",
    headerCell: "text-xs uppercase tracking-wide text-slate-500"
  }
});

const theme = {
  colors: {
    accent: "text-sky-600",
    danger: "text-rose-600"
  }
};
</script>

<template>
  <AtlasResourceTable
    resource="products"
    :class-map="classMap"
    :theme="theme"
  />
</template>
```

## Override Rendering with Slots

```vue
<template>
  <AtlasResourceTable resource="products">
    <template #cell.name="{ value }">
      <strong class="font-semibold text-slate-900">{{ value }}</strong>
    </template>
  </AtlasResourceTable>
</template>
```

Slots may override presentation, but the adapter continues to own resource
resolution, validation semantics, authorization states, action execution, and
query/cache subscriptions.

## Scope Reminder

- `@atlaskit/vue` does not import Vue Router
- AtlasKit adapters do not generate pages
- No Nuxt, VitePress, or app-framework conventions are assumed
- Future `dom`, `react`, `angular`, `svelte`, and `solid` packages are planned
  but not implemented in first delivery
