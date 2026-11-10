---
title: Reference
description: Find SDK APIs, supported execution paths, package formats, and exact FLOW requirements.
---

# Find the detail you need

Use these references while building or implementing FLOW.
The guides explain current behavior. The specifications define portable requirements.

## Look up an interface

| I need to… | Open |
| --- | --- |
| Check whether my host can run a package | [Hosts, runtimes, and SDKs](./support.md) |
| Receive input, call a dependency, or handle an error | [SDK API](./sdk.md) |
| Look up a Markdown recipe or operand | [Markdown recipes](./markdown.md) |
| Check what transfers from a Skill | [Skill compatibility](./skill-compatibility.md) |
| Resolve a term | [Glossary](./glossary.md) |

For a complete task, start with [your first Flow](/start/) or [the build guides](/build/).

## Find an exact requirement

| Specification | Owns |
| --- | --- |
| [Package/0](../spec/package-format.md) | Package files, metadata, dependencies, and package identity. |
| [Run/0](../spec/run-protocol.md) | Finite invocation, dependency calls, channels, errors, cancellation, and completion. |
| [Run SDK/0](../spec/run-sdk.md) | TypeScript and Python author interfaces. Run/0 owns wire behavior. |
| [JSON/0](../spec/json-values.md) | Portable values and their bounds. |
| [Schema/0](../spec/schema-files.md) | Input, complete-result, channel, and settings validation. |
| [Invocation Contract/0](../spec/invocation-contracts.md) | Optional validation, outcomes, caller ports, and exact named interfaces. |
| [Markdown/0](../spec/markdown-runtime.md) | Bounded Agent interpretation and exact recipes in `FLOW.md`. |
| [Channel Contract/0](../spec/channel-contracts.md) | Channel declarations and named message meaning. |

Implementing a host or SDK? Follow [Implement FLOW](/implement/) to choose the relevant contracts and verification path.

## Machine resources and status

The site publishes exact machine companions alongside the specifications:

- [Schema dialect](https://flow.jig.md/schemas/schema-0.json)
- [Invocation contract schema](https://flow.jig.md/schemas/invocation-contract-0.schema.json)
- [Channel contract schema](https://flow.jig.md/schemas/channel-contract-0.schema.json)
- [Run protocol schema](https://flow.jig.md/schemas/run-0.json)
- [Run operational errors](https://flow.jig.md/schemas/run-0-errors.json)

**FLOW v0 is a public alpha.** Its specifications and APIs may change.
Qualify your chosen revision against the [conformance material](https://github.com/jiggy/flow/tree/main/conformance/run-0).

FLOW is openly implementable.
[Governance](https://github.com/jiggy/flow/blob/main/Governance.md) describes its stewardship and decision process.
