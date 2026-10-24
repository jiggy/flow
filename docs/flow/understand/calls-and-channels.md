---
title: Calls and channels
description: Use calls for finite work and channels for declared live messages while that work runs.
---

# Calls and channels

A call asks a method to perform finite work and return a result.
A channel carries live messages while work runs.
These two relationships let a Flow participate in a larger application while keeping its task clear.

## Call a method for its result

**Illustrative example: classify a support request.**
An intake method passes a message to a classifier and waits for its queue suggestion.
It checks the outcome before using the output in a later policy decision.

| Exchange | Meaning in this example |
| --- | --- |
| Input | The request message to classify. |
| Outcome | Whether classification completed or produced a declared alternative. |
| Output | The queue suggestion and any evidence promised by the method. |

A Flow declares dependency roles as `uses` slots.
The host binds each slot to an authorized implementation.
The SDK's context `call()` method invokes the selected dependency with supplied input.
Each launched child receives its own execution context.

Code, Agent instructions, and mixed implementations can fill the same dependency role when they satisfy its requirements.
The host supplies their settings and grants.
The parent supplies the input and any caller-held resources it explicitly transfers.

In code, authors use `handle()` to receive an invocation and context `call()` to invoke a dependency.
Markdown methods express dependency calls through the interpreter's recipes.
Underneath, `flow/run` enters a selected component, while `flow/call` requests a dependency invocation from the host.
Every launched component receives `flow/run`, including a child.
The [host guide](../implement/host.md) explains that exchange for implementers.

## Send messages while the method runs

The classifier might publish progress while it examines supplied material.
A user interface could display those updates while it waits for the classification result.
This is an illustrative observation channel, separate from the method's result.

A method declares each caller-facing channel port and whether it sends or receives messages.
The host supplies the corresponding rights and enforces the declared message constraints.
Channel names are local port names.
They describe neither a global address nor an automatically discovered message bus.

Some methods need a stream to perform their task.
Such a required port must be connected before invocation.
An optional progress port can be absent when the method permits that absence.
The [channel reference](../spec/channel-contracts.md) defines these declarations.

## Keep progress and completion distinct

A successful send means the host accepted a message.
It does not establish durable processing or completion of the method.
A clean channel end likewise says nothing about whether the method's final answer is useful or its execution succeeded.
Handle the execution result separately.

For optional observation, removing the observer should preserve the method's promised domain result.
Keep required ordering and domain actions in the method that owns them.
An optional progress listener should observe the work rather than secretly perform a required step.

## Agree on message meaning

Two messages can have the same shape and different meanings.
For example, `{ "text": "Checking records" }` could append a fragment or replace the displayed status.
Participants need to agree on that meaning as well as the data shape.

Generic channels can carry bounded JSON values without a named agreement.
A schema can constrain those values.
An exact named channel contract helps independently maintained participants agree on message meaning.
[Contracts](./contracts.md) explains when that additional precision earns its cost.

Use [Run SDK/0](../spec/run-sdk.md#9-channel-projection) for the channel API and lifecycle rules.
Use [Run/0](../spec/run-protocol.md#5-channels) for the underlying exchange.
