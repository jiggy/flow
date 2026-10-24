---
title: Glossary
description: Find FLOW's core terms and the specifications or explanations that define them.
---

# Glossary

Use this glossary to resolve a term while reading or building.
Each link leads to the defining specification or a fuller explanation.

| Term | Meaning | Read more |
| --- | --- | --- |
| FLOW | The independent standard for packaging and invoking reusable methods. | [What FLOW adds](/understand/) |
| Flow | A package containing one reusable method implementation. | [Package/0](../spec/package-format.md) |
| Method | A bounded procedure invoked with input and returning an outcome with output data. | [Run/0](../spec/run-protocol.md) |
| `FLOW.<ext>` | The package's single implementation entrypoint. | [Package/0](../spec/package-format.md#3-implementation-entrypoint) |
| Host | The consumer that supplies invocation, supported execution, and local policy. | [Run/0](../spec/run-protocol.md) |
| Runtime | The program or library that advances a method's internal execution. | [Hosts and runtimes](/understand/) |
| Input | The bounded JSON value supplied for one invocation. | [JSON/0](../spec/json-values.md) |
| Outcome | The method-declared meaning returned alongside output data. | [Run/0](../spec/run-protocol.md#2-shared-names-and-values) |
| Slot | A package-local dependency name whose implementation the host binds. | [Package/0 dependencies](../spec/package-format.md#dependencies) |
| `FLOW.meta.json` | Optional metadata and dependency declarations for a code implementation. Markdown keeps metadata in its frontmatter. | [Package/0 metadata](../spec/package-format.md#2-metadata0) |
| Invocation contract | An optional declaration of input, complete results, outcomes, and caller ports. It can identify an independently agreed interface. | [Invocation Contract/0](../spec/invocation-contracts.md) |
| Schema | A bounded shape used to validate values. | [Schema/0](../spec/schema-files.md) |
| Channel | An endpoint-based path for live messages alongside a finite invocation. | [Run/0 channels](../spec/run-protocol.md#5-channels) |
| Channel contract | A declaration of a channel's exact message meaning. | [Channel Contract/0](../spec/channel-contracts.md) |
| Artifact | An opaque, participant-held reference to an immutable tree, carried separately from domain JSON. | [Artifact handoff](../spec/run-sdk.md#immutable-artifact-handoff) |
| Capability compounding | Useful methods becoming the means to accomplish more through reuse, adaptation, and composition. Evaluation establishes the gain. | [Understand FLOW](/understand/) |
| ACP | Agent Client Protocol, which connects clients such as editors with interactive coding agents. | [ACP integration](/implement/acp) |

For support questions, use [Hosts, runtimes, and SDKs](./support.md).
For a first task, follow [Start here](/start/).
