# FLOW maintainer guide

FLOW enables capability compounding through independently reusable methods.
Read the [product compass](product-compass.md) and [FLOW doctrine](doctrine/flow.md) before product decisions.

## Engineering boundaries

FLOW owns package meaning, values, invocation contracts, channels, and observable Run protocol behavior.
Hosts own execution policy, admission, permissions, credentials, providers, containment, and lifecycle enforcement.
Jig-specific methods and applications belong in the Jig repository.
SDKs and authoring tooling must build and test without Jig.

Use declared public package exports and ordinary versioned dependencies.
Preserve exact contracts, JSON bounds, cancellation, settlement, and language parity.
Keep conformance independent of SDK internals and host policy.
Keep source tests separate from installed artifact qualification.

## Working method

Read root and scoped AGENTS.md files before edits.
Keep transient reports in `.tmp/`.
Use Just for tasks and explicit builds. Never add package lifecycle scripts.

Run focused checks, then the release gate for cross-protocol or distribution changes.
Qualify immutable candidate archives before publication. Never rebuild during publication.
Preserve notices and earlier grants under [the licensing map](../LICENSES.md).

## Write clear technical English

Use active voice, precise actors, and one instruction per sentence.
Keep instructions within 20 words and descriptions within 25 words.
Keep each paragraph within six sentences. Avoid prose semicolons.
Preserve all requirements, uncertainty, and public identifiers.
Run `bun scripts/check-docs.ts` for links, metadata, anchors, and changed technical prose.

## Find authoritative sources

Use `jiggy/flow` and the existing `@jigging/*` package identities.
Specifications live in `docs/flow/spec/`.
[CONTRIBUTING.md](../CONTRIBUTING.md) owns setup and [RELEASING.md](../RELEASING.md) owns publication.

Rebase feature branches onto main. Stage exact paths and inspect the staged diff before committing.
Never rewrite Jig history. Original monorepo release records remain in Jig.
