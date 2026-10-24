# Implement FLOW

## Purpose

Help maintainers add portable FLOW execution to hosts, SDKs, runtimes, and coding agents.

## Ownership

- `index.md` routes implementers to their task.
- `host.md` explains host responsibilities and the invocation lifecycle.
- `sdk.md` explains language bindings and the wire exchange.
- `acp.md` explains an illustrative ACP integration.
- `verify.md` owns the runnable caller/dependency exercise and conformance entrypoints.

## Local Contracts

Keep exact requirements in `../spec/`. Preserve host neutrality and distinguish protocol evidence from host security guarantees.
Label example routes, adapters, and deployment choices as illustrative.
Keep the Python host block in `verify.md` executable by the conformance guide test.

## Verification

Run documentation checks, guide wire-schema tests, the Python guide-example tests, and a fresh FLOW site build.

## Child DOX Index

- None.
