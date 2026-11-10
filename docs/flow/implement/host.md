---
title: Implement a FLOW host
description: Launch methods, resolve authorized dependencies, and account for their results and execution lifecycle.
---

# Implement a FLOW host

A host lets an application invoke a Flow with input and receive an outcome with data.
It selects the implementation, supplies local powers, and accounts for execution through completion.
The method owns its procedure, including any code, Agent work, and child calls.

This guide maps those duties to [Package/0](../spec/package-format.md) and [Run/0](../spec/run-protocol.md).
Try the [caller/dependency exercise](./verify.md#run-a-caller-and-dependency) after reading the lifecycle.

## Enter a component and service its calls

Run/0 distinguishes component entry from dependency invocation:

| Request | Sender → receiver | Purpose |
| --- | --- | --- |
| `flow/run` | Host → component | Enter the selected component with its complete invocation context. |
| `flow/call` | Component → host | Request a declared dependency using input and an operation identity. |

The host resolves the dependency slot and checks its grants.
It supplies the selected implementation's settings, attachments, scratch directory, and deadline.
A child inherits the remaining deadline. Its other powers come from its own host-supplied context.

**Illustrative exchange:** a caller invokes a greeter dependency.

| Step | Message |
| --- | --- |
| Enter the caller | The host sends `flow/run` to the caller. |
| Request the dependency | The caller sends `flow/call` for its `greeter` slot. |
| Enter the child | The host sends `flow/run` to the selected greeter. |
| Receive the child result | The greeter returns its outcome and output to the host. |
| Complete the call | The host returns that result to the caller. |
| Complete the invocation | The caller returns its own result. |

Every launched component receives `flow/run`, including a child.
A slot can select a native host implementation instead of another component process.
Its input, result, authority, and owned-work obligations still apply.

Authors use `handle(handler)` and `context.call(...)` through an SDK.
They use the same authoring API whether their method is entered directly or called by another Flow.
See [Run SDK/0](../spec/run-sdk.md) for the exact projection.

## Prepare the invocation

Inspect the package before execution:

1. Find its single root `FLOW.<ext>` implementation.
2. Read its metadata, dependency declarations, and optional invocation contract.
3. Check support for its runtime and required interfaces, including channels.
4. Prepare the execution environment and authorized dependency routes.
5. Supply selected settings, attachments, scratch space, and a finite deadline.

Code metadata lives in optional `FLOW.meta.json`. Markdown metadata lives in frontmatter.
Keep credentials with the host implementation responsible for them.
Package declarations describe requirements. The host supplies execution authority.

## Own the exchange

Send one complete `flow/run` request with a string request ID.
Run/0 uses bounded, LF-terminated UTF-8 JSON objects over full-duplex stdio.
Keep the reader active while awaiting responses, and serialize writes.
Stderr carries diagnostics.

Service `flow/call` while its invocation owner remains pending.
Validate the declared slot, operation identity, input, and any explicit channel transfer.
Resolve an authorized implementation and supply its context.

Validate complete `{ outcome, output }` results.
Declared domain refusals remain normal results. Operational failures use the JSON-RPC error envelope.
Progress and channel EOF describe observation, rather than establishing successful execution.

## Cancel and complete owned work

Send cancellation using the pending request's string ID:

```json
{"jsonrpc":"2.0","method":"request/cancel","params":{"requestId":"host:1"}}
```

This notification carries no `id` and receives no response.
Enforce deadlines and bounded termination even when a component ignores cancellation.
Settle the owned subtree and resources. Keep uncertain effects visible instead of retrying them automatically.

After a terminal response, drain stdout and await process exit.
Successful completion requires a valid correlated result, settled owned work, successful cleanup, and a zero exit status.
Trailing bytes or frames fail completion. A shutdown kill after a result is an execution failure.

Run/0 defines the exact validation, identity, error, cancellation, and completion rules.
Your host owns admission, credentials, containment, and persistence policy.
Protocol conformance and those host guarantees need separate evidence.

Next, [implement the SDK exchange](./sdk.md) or [verify the caller/dependency lifecycle](./verify.md).
