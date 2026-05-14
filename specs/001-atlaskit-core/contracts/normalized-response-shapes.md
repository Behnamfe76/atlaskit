# Contract: Normalized REST Response Shapes

## Purpose

Define the canonical internal response shapes that `ResponseNormalizer` must
produce for first-release REST and GraphQL data sources.

## Common Shape

All normalized results share:

- `kind`
- `transport`
- `data`
- `meta`
- `errors`
- `sourceMeta`

## Single Resource

### Required fields

- `kind: single`
- `transport: rest | graphql`
- `data`: one normalized resource record
- `meta`: optional shared metadata
- `errors`: optional normalized errors
- `sourceMeta`: original source-specific metadata not promoted to canonical
  fields

## Collection

### Required fields

- `kind: collection`
- `transport: rest | graphql`
- `data`: ordered list of normalized resource records
- `meta`: optional shared metadata
- `errors`
- `sourceMeta`

## Paginate

### Required fields

- `kind: paginate`
- `transport: rest | graphql`
- `data`
- `meta`
- `pagination` including current page, last page, per-page, total
- `errors`
- `sourceMeta`

## Simple Paginate

### Required fields

- `kind: simplePaginate`
- `transport: rest | graphql`
- `data`
- `meta`
- `pagination` including current page, per-page, next/previous availability
- `errors`
- `sourceMeta`

## Cursor Paginate

### Required fields

- `kind: cursorPaginate`
- `transport: rest | graphql`
- `data`
- `meta`
- `pagination` including current cursor, next cursor, previous cursor, and
  availability signals
- `errors`
- `sourceMeta`

## GraphQL Mapping Notes

- GraphQL single-resource queries must normalize to `kind: single`
- GraphQL list queries must normalize to `kind: collection`
- GraphQL connection payloads with cursors must normalize to
  `kind: cursorPaginate`
- GraphQL payloads exposing explicit page counts or totals must normalize to
  `kind: paginate` or `kind: simplePaginate` according to available metadata

## Error Handling

- Unsupported REST or GraphQL payload shapes must produce a descriptive
  normalization failure
