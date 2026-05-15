# Contract: Shared Adapter Runtime Contracts

## Purpose

Define the framework-agnostic runtime contracts shared by AtlasKit adapter
packages.

## Resource Input Contract

- All adapter component surfaces accept one `resource` input
- `resource` may be:
  - a resource class
  - a registered resource instance
  - a `uriKey`
- Shared adapter utilities normalize the input into a canonical resource
  reference before framework rendering begins

## Table State Contract

- Supports controlled and uncontrolled ownership modes
- State includes:
  - search
  - filters
  - sort
  - page
  - per-page
  - selected rows
  - loading
  - error
- Controlled mode exposes typed change notifications
- Uncontrolled mode accepts initial values

## Form Mode Contract

- Forms always accept an explicit `mode` value of `create` or `edit`
- Edit mode may additionally accept an id or record payload
- Mode is not inferred from route context or record presence

## Authorization Rendering Contract

- Items marked not visible by core are hidden
- Items marked visible but not executable are rendered disabled
- The runtime contract exposes both states to framework components and slots

## Styling Contract

- Default presentation uses Tailwind utility classes
- Shared schemas define:
  - default class surfaces
  - class-map overrides
  - theme-token overrides
- Basic usage must not require a global CSS file

## Shared Utility Boundary

The runtime shared layer may own:

- resource input normalization
- resource resolution helpers
- state and action contracts
- class-map and theme-token schemas
- framework-agnostic helper utilities

The runtime shared layer must not own:

- framework components
- framework composables/hooks
- framework slot/render implementation
- routing or page abstractions
