---
title: Implement FLOW
description: Add FLOW execution to a host, SDK, runtime, or coding agent.
---

# Add FLOW support to your tool

FLOW gives your tool a common way to invoke methods implemented with code, instructions, or both.
You choose which implementations to support and supply their execution environment.
The portable boundary lets method authors keep their internal procedure.

Choose the part you are building:

| Your goal | Start here | What you will establish |
| --- | --- | --- |
| Run Flows inside an application or coding agent | [Implement a host](./host.md) | Package inspection, authorized dependency calls, results, and execution lifecycle. |
| Support another language or execution runtime | [Implement an SDK](./sdk.md) | Invocation handling, portable values, calls, cancellation, and completion. |
| Connect a coding agent through ACP | [Connect an ACP agent](./acp.md) | A bounded adapter between an authorized dependency and an Agent session. |
| Check an implementation | [Verify an implementation](./verify.md) | A runnable caller/dependency exchange and public conformance material. |

For an implementation exercise, follow **host → SDK → verification**.
Use the [specification map](../reference/index.md) to find exact requirements.
The specifications define conformance. These guides explain how the boundaries fit together.

Want to use an existing host instead? Follow [Start here](../start/index.md) and check [current support](../reference/support.md).
