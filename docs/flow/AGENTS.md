# FLOW documentation

## Purpose

Help readers use, adapt, compose, and implement independently reusable methods.
Keep exact portable meaning owned by the specifications.

## Ownership

- `index.md` owns the website's landing-page narrative and semantic content.
  Presentation and interactions belong to `site/home.css` and `site/theme/home.tsx`.
- `start/` owns task discovery, the first supported run, and application consumption.
- `build/` owns authoring, Skill adaptation, composition, outcomes, validation, channels, and design guidance.
- `understand/` explains the shared calling boundary, hosts, runtimes, channels, and optional contracts.
- `implement/` owns host, SDK, runtime, and ACP integration guides and conformance exercises.
- `reference/` owns API lookup, recipes, support, compatibility, glossary, and the specification navigator.
- `evidence/` owns bounded experiment reports and their limits.
- `spec/` owns normative package, value, protocol, SDK, and interoperability semantics and machine companions.
- `for-agents.md` owns Markdown entrypoints and FLOW skill installation.
- Guide diagrams remain beside their owning prose and retain source JSON and exported SVG together.

## Local Contracts

- Keep FLOW host-neutral. A host tutorial illustrates its own execution and authority model.
- State actual supporting hosts and qualified implementations separately from SDK availability.
- Exact requirements stay in `spec/`. Guides and examples never become a second conformance source.
- FLOW Run/0 owns wire behavior. Run SDK/0 defers to it when they differ.
- Explain `flow/run` as component entry and `flow/call` as dependency invocation.
  Every launched component receives `flow/run`, including a launched dependency.
- Authors use `handle()` and context `call()` through the same SDK.
- Hosts own admission, containment, permissions, persistence, providers, Agent policy, execution support, and routing.
- The public origin is `https://flow.jig.md`.
  Route changes reconcile navigation, homepage links, assembly inventories, Markdown publication, and skill references.
- Preserve exact machine-resource URLs and bytes when reorganizing explanatory pages.
- Installable skills reuse canonical sources through [reference synchronization](../../skills/AGENTS.md).

## Work Guidance

- Lead the learning path from running a method to calling, adapting, and composing it.
- Keep the first-use example connected and explicitly illustrative.
- Separate routine authoring from implementing the standard and looking up exact requirements.
- State public-alpha status concisely and link prerequisites where a task needs them.
- Distinguish parsing, execution qualification, task achievement, and constraint preservation.
- Label synthetic tests, live interpreter experiments, and installed-host evidence separately.
  A `done` outcome alone establishes neither a correct answer nor compliance with instructions.
- Keep Python installation prose independent of the current alpha number.
  Link to PyPI and use `--pre`. Exact versions belong in manifests and release records.

## Verification

- Run `bun scripts/check-docs.ts` for metadata, links, anchors, and technical prose.
- Build a fresh site with `scripts/build-site.sh flow .tmp/flow-site`.
- Run guide wire-schema checks and the exact-host-snippet Python regression tests after moving implementer examples.
- Synchronize installed skill references after changing their canonical sources.

## Child DOX Index

- [start/AGENTS.md](start/AGENTS.md) — First use and application consumption.
- [build/AGENTS.md](build/AGENTS.md) — Authoring, composition, and design.
- [understand/AGENTS.md](understand/AGENTS.md) — Explanations and mental models.
- [implement/AGENTS.md](implement/AGENTS.md) — Host, SDK, runtime, and agent integration.
- [reference/AGENTS.md](reference/AGENTS.md) — APIs, recipes, support, and exact-contract navigation.
- [evidence/AGENTS.md](evidence/AGENTS.md) — Bounded experiments and their limits.
- [spec/AGENTS.md](spec/AGENTS.md) — Normative specifications and machine companions.
