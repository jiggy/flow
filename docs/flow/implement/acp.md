---
title: Connect an ACP agent
description: Connect an authorized FLOW dependency to an ACP Agent session while preserving results and lifecycle ownership.
---

# Connect an ACP agent

The Agent Client Protocol connects clients, such as editors, to interactive coding agents.
FLOW connects hosts to callable method implementations.
An integration can use both boundaries while keeping their responsibilities distinct.

This guide explains an adapter design. It supplies an illustrative exchange, rather than a ready-made universal ACP adapter.
Use [ACP's protocol documentation](https://agentclientprotocol.com/protocol/v1/overview) for session behavior and the dependency's contract for its data.

## Choose where FLOW runs

| Placement | Your integration owns |
| --- | --- |
| Inside a coding agent | The agent hosts Flows, launches components, and consumes their results. |
| Inside an ACP client or platform | The application hosts Flows and can supply dependencies backed by ACP Agent sessions. |

Both placements implement the [same FLOW host boundary](./host.md).
ACP support alone leaves package invocation, dependency resolution, and FLOW lifecycle handling to the integration.

## Route an authorized dependency

**Illustrative example:** a caller declares a summarizer dependency in `FLOW.meta.json`:

```json
{"uses":{"summarizer":{}}}
```

Suppose the operator binds that slot to an ACP Agent through the host.
The caller requests it using the normal FLOW boundary:

```json
{"jsonrpc":"2.0","id":"c:1","method":"flow/call","params":{"slot":"summarizer","operationId":"sum:1","input":{"text":"..."}}}
```

The host validates the slot against its authorized route table.
The adapter translates the declared input into the Agent's prompt or session work.
It supplies the context and attachments authorized for that dependency.
Use separate Agent contexts when the method requires isolation.

The host controls available routes and grants.
A slot name or model response cannot establish a new route or additional authority.

## Separate updates from the result

ACP session updates can carry text, tool activity, and other observations.
The host may forward supported observations through a declared FLOW progress channel.
Otherwise, it can retain them as diagnostics.
These updates leave the `flow/call` pending.

When the ACP turn completes, extract and validate the answer against the dependency's result contract.
For this illustrative summarizer, the complete correlated reply could be:

```json
{"jsonrpc":"2.0","id":"c:1","result":{"outcome":"done","output":{"summary":"..."}}}
```

The adapter owns the translation from session completion to this result.
It must distinguish a valid answer from a turn that ended with malformed or unusable output.
The application still judges whether the summary serves its task.

## Own failure and cancellation

Keep the ACP session owned through completion, failure, and cancellation.
When a FLOW call is cancelled, propagate cancellation through the adapter to the corresponding ACP session.
Enforce the host's deadline and termination policy.

Map settled operational failures to the FLOW error envelope.
Keep uncertain dispatch or side effects visible. Apply the host's recovery policy before attempting more work.
Report Agent disconnects, malformed answers, and verified task refusals as distinct outcomes.

| Responsibility | Owner |
| --- | --- |
| ACP transport and session lifecycle | Platform integration and adapter |
| Run/0 framing, dependency grants, deadlines, and child responses | FLOW host |
| Procedure, reasoning, and dependency calls | Flow implementation |

Verify the [FLOW lifecycle](./verify.md), then test the adapter against its actual ACP implementation.
Protocol conformance alone leaves session isolation and host containment unproved.
