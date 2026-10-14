# FLOW packages

## Purpose

Own the independent FLOW SDKs and contract authoring tools.

## Ownership

- `flow-sdk/` owns the TypeScript Run SDK.
- `jiggy-flow/` owns the Python Run SDK.
- `flow-authoring/` owns the optional independent TypeSpec compiler.
- `docs/flow/spec/` owns normative semantics.

## Local Contracts

Use public dependency exports. No Jig checkout or host implementation is a build input.
Bun generates the ignored workspace lock from package manifests.
Just owns explicit builds and packing. Manifests contain no task scripts.
Preserve language parity, exact wire semantics, licenses, and distribution inventories.

## Verification

Run `just build`, `just test`, and `just test-release`.

## Child DOX Index

- [flow-sdk/AGENTS.md](flow-sdk/AGENTS.md) — TypeScript SDK.
- [jiggy-flow/AGENTS.md](jiggy-flow/AGENTS.md) — Python SDK.
- [flow-authoring/AGENTS.md](flow-authoring/AGENTS.md) — Independent authoring.
