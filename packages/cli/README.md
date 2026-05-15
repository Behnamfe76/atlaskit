# @atlaskit/cli

`@atlaskit/cli` scaffolds typed AtlasKit resource stubs that align with the
public `@atlaskit/core` authoring API.

## Install

```bash
pnpm add -D @atlaskit/cli
```

## Usage

```bash
atlaskit generate resource Product
atlaskit generate resource Order --force
```

By default the generator writes to `./resources/<Name>Resource.ts`.

## Programmatic API

```ts
import { generateResource } from "@atlaskit/cli";

await generateResource("Product", {
  cwd: process.cwd(),
  force: false
});
```

## Notes

- generated files are minimal, typed starting points
- overwrite is opt-in with `--force`
- unrelated files are never modified
