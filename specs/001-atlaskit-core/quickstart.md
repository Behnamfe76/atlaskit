# Quickstart: AtlasKit Core Engine

## Goal

Verify the first-release workspace can bootstrap `@atlaskit/core`,
`@atlaskit/cli`, optional shared testing utilities, and the manual playground
inside one `pnpm` monorepo.

## Prerequisites

- Node.js LTS installed
- `pnpm` installed

## Workspace Setup

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Confirm workspace packages exist:

   ```bash
   pnpm --filter @atlaskit/core exec pwd
   pnpm --filter @atlaskit/cli exec pwd
   ```

3. Run static quality checks:

   ```bash
   pnpm lint
   pnpm test
   pnpm build
   ```

## Manual Verification

1. Start the playground:

   ```bash
   pnpm --filter playground dev
   ```

2. Create a sample resource stub:

   ```bash
   pnpm --filter @atlaskit/cli exec atlaskit generate resource Product
   ```

3. Register the generated resource in the playground bootstrap using
   `Atlas.configure(...)`.

4. Confirm manual scenarios:
   - duplicate resource registration fails with a descriptive error
   - resolved page fields differ across index/detail/create/edit contexts
   - validation strings and typed rules normalize consistently
   - REST and GraphQL sample payloads normalize into canonical result shapes
   - English defaults plus sample `fa` and `ar` locale bundles change
     labels/formatting and respect RTL metadata
   - authorization deny precedence is reflected in resolved abilities
   - optimistic query updates invalidate and reconcile correctly

## Packaging Verification

1. Build published packages:

   ```bash
   pnpm --filter @atlaskit/core build
   pnpm --filter @atlaskit/cli build
   pnpm --filter @atlaskit/testing build
   ```

2. Verify changeset readiness:

   ```bash
   pnpm changeset status
   ```

## Scope Reminder

- The playground is for manual verification only
- No framework adapter implementation is part of this feature
- `@atlaskit/core` must remain UI-agnostic and free of rendering logic
