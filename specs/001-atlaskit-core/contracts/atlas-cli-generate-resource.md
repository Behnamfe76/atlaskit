# Contract: Atlas CLI Resource Generator

## Purpose

Define the first-release CLI contract for generating resource stubs in
`@atlaskit/cli`.

## Command

### `atlaskit generate resource <name>`

- Generates a resource class from a maintained stub template
- Produces output suitable for immediate project customization
- Uses naming conventions consistent with Nova-like resource terminology

## Inputs

- Resource name argument
- Optional target path override
- Optional dry-run mode
- Optional force/overwrite mode

## Outputs

- A generated resource file with:
  - class declaration
  - static identity placeholders
  - stubbed `fields()`, `actions()`, `lenses()`, `filters()`, `metrics()`, and
    lifecycle hook sections
- Terminal output describing created path and overwrite behavior

## Failure Contract

- Must fail with a descriptive message when the target file already exists and
  overwrite mode is not enabled
- Must fail with a descriptive message when the provided resource name cannot be
  converted into a valid class/file name
- Must not mutate unrelated files

## Documentation Contract

- Generator output must align with the public `@atlaskit/core` authoring API
- Stub placeholders must remain minimal and typed so generated code is a valid
  starting point rather than pseudo-code
