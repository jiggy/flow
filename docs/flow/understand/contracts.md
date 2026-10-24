---
title: When contracts help
description: Add validation and exact interface agreements where callers need them, while keeping simple methods easy to use.
---

# When contracts help

Every method needs an understandable promise: what it accepts, what it returns, and what it can change.
A formal descriptor adds machine-checkable declarations where that promise needs precision.
Choose the declarations that serve the method's consumers.

## Begin with the caller's needs

**Illustrative example: classify a support request.**
The caller needs a message classified into supported queues.
Its author can document the expected input and result before introducing an exact named interface.

| Consumer need | Useful declaration |
| --- | --- |
| Accept bounded JSON input and return `done` with bounded JSON output. | No invocation descriptor is required. |
| Validate input or the complete result. | An anonymous `FLOW.contract.json` with the relevant schemas. |
| Declare custom domain outcomes or caller-facing ports. | The same descriptor with those declarations. |
| Agree on an interface across independently maintained implementations. | An exact identified contract with its meaning and required behavior. |

The default result contains `outcome` and `output`, with `done` as its only normal outcome.
A custom domain outcome needs an explicit declaration.
Operational failure stays distinct from a method's declared domain result.
The [invocation specification](../spec/invocation-contracts.md) defines those rules.

## Validate values at the boundary

An input schema checks the actual invocation input.
A result schema checks the complete `{outcome, output}` value.
This lets validation express the output shapes permitted for each outcome.
It also keeps structural checks separate from the application's judgment of the answer.

For the classifier example, validation could require a message string and constrain the returned queue to the supported choices.
That would reject a misspelled queue.
It would not establish that `billing` is the correct choice for a particular message.
Behavioral tests and application checks still need to evaluate that decision.

Implementation settings have their own `settings.schema.json`.
They configure a selected implementation rather than changing the caller's input.
The [schema specification](../spec/schema-files.md) defines each validation point and the supported dialect.

## Name an agreement when collaborators need one

An identified invocation contract gives independently maintained participants an exact interface to implement and require.
Matching checks the contract's identity, version, and digest.
The agreement can include the method's input, complete result, outcomes, and declared ports.

Exact matching establishes declared compatibility.
It supplies neither execution authority nor proof that an implementation behaves honestly or produces a correct answer.
The host still grants powers, and consumers still evaluate relevant behavior.

The same distinction applies to live messages.
A named channel contract can distinguish append-a-fragment semantics from replace-a-snapshot semantics, even when both messages contain text.
[Channel Contract/0](../spec/channel-contracts.md) owns that message agreement.

## Keep implementation choices separate

Two methods can satisfy the same interface while using different runtimes, settings, dependencies, or providers.
Those choices remain with the implementation and receiving host.
An interface match does not transfer settings or grants from another invocation.

Add formal precision when it removes a real ambiguity for a caller or collaborator.
Use [design guidance](../build/design.md) to review the broader method boundary.
Use the [reference](../reference/index.md) to find exact descriptor fields and APIs.
