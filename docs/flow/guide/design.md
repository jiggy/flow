---
title: Design modular Flows
description: Build small, understandable capabilities that compose, hide complexity, and move between applications.
---

# Design Flows that fit in your head

Build applications from small Flows that each provide a recognizable capability.
Combine those capabilities into larger Flows with equally clear boundaries.
Each level should let a reader understand one capability without understanding every component underneath it.

A good Flow makes its purpose, inputs, results, effects, and failure behavior easy to explain.
Its caller can use that promise while the implementation changes behind it.
These opinionated authoring defaults complement the normative specifications linked below.

## In this guide

- [Start with the caller's promise](#start-with-the-callers-promise)
- [Choose meaningful small pieces](#choose-meaningful-small-pieces)
- [Make composition hide complexity](#make-composition-hide-complexity)
- [Keep independent choices independent](#keep-independent-choices-independent)
- [Choose calls and channels deliberately](#choose-calls-and-channels-deliberately)
- [Make components easy to move](#make-components-easy-to-move)
- [Own effects and failure](#own-effects-and-failure)
- [Review the design with concrete changes](#review-the-design-with-concrete-changes)

## Start with the caller's promise

Before implementation, describe the component using its public boundary.
Use a short design note or the existing package documentation.
This exercise needs no additional manifest or required file.

| Question | What the caller should understand |
| --- | --- |
| What does it do? | One coherent capability, named with a domain verb and object |
| What does it need? | Relevant input values, settings, dependency roles, and any live message ports |
| What does it return? | A useful result, expected alternatives, and the meaning of completion |
| What can it change? | External effects, state ownership, and any consequences that might survive failure |
| What happens when it cannot finish? | Domain refusals, operational failures, cancellation, and recovery responsibility |

For example, `classify-request` suggests a support queue from supplied message content.
It might return `billing`, `technical`, or `manual`, with the evidence needed to judge that suggestion.
Its caller should understand this promise without reading prompts, parser helpers, or provider response objects.
The [FLOW introduction](./understand.md) shows code, Agent, and mixed implementations behind this boundary.

Keep inputs and results specific to the task.
Pass the needed values explicitly instead of sharing a mutable object containing the whole application.
Keep child implementation details, provider formats, and intermediate planning state private.
Document the important assumptions that remain visible to the caller.

Use schemas to validate meaningful boundaries.
Introduce a named invocation contract when independently maintained consumers need an exact shared interface.
[Invocation Contract/0](../spec/invocation-contracts.md) also supports anonymous local constraints.
A clear interface promise does not require every component to publish a named contract.

## Choose meaningful small pieces

Prefer components with high cohesion: their parts contribute to the same understandable capability.
Keep coupling low: using one component should require little knowledge of another component's internals.
Split responsibilities where decisions can change independently.
A sequence of steps can remain private within one capability.
A pipeline stage earns a public boundary when it hides a meaningful choice or supports an independent consumer.

Extract a Flow when it enables independent reuse, replacement, testing, or ownership of a meaningful effect.
Keep an implementation helper private when exposing it would only add wiring.
Measure size by the concepts a caller must retain.
An extra package should remove knowledge or coordination from its consumers.

| Useful boundary | Detail that can usually stay private |
| --- | --- |
| Classify a request for several callers | Trim whitespace before classification |
| Assign a request through a replaceable ticket system | Format one provider's request body |
| Apply a routing policy shared by intake and batch processing | Evaluate one condition used by that policy |
| Route a request through a complete method | Translate a child's result into that method's public result |

Start with the boundaries needed by the current task.
Extract a private helper when a concrete caller or replacement need gives it an independent purpose.
Avoid generic components whose many mode flags select unrelated jobs.
Unrelated callers changing together often reveal a missing boundary.

## Make composition hide complexity

A composed Flow should provide one useful capability through the same calling model as its children.
Let it own internal ordering, result translation, and the recovery decisions needed for its promise.
Expose the choices its caller actually needs.
Keep internal steps and child wiring behind the boundary.

Consider routing a support request.
This is an illustrative decomposition, not a supplied application or a new FLOW interface.

| Component | Input | Result and responsibility |
| --- | --- | --- |
| `classify-request` | Message content and supported queues | Suggest a queue, with relevant evidence or uncertainty |
| `assign-request` | Request identifier and selected queue | Perform assignment through a configured dependency and return a confirmed receipt |
| `route-request` | Request identifier, content, and the routing choices its caller controls | Compose classification, domain policy, and assignment into an assigned or manual-review result |

`route-request` calls the classifier and checks the suggestion against its routing policy.
It calls assignment only when that policy permits assignment.
It returns an assigned result only after the required assignment succeeds.
An uncertain suggestion can produce a manual-review result without requesting the assignment effect.

Keep a policy used only by this method inside the composite.
Extract `apply-routing-policy` when intake and batch processing need the same independently maintained decision.
Then both callers can compose that smaller capability without duplicating the rule.

The outside caller should only need to invoke `route-request` and interpret its documented result and effects.
It should not coordinate the classifier's prompts, the ticket vendor's request format, or the children's cleanup.
This is how several small pieces become one larger piece that still fits in your head.
Apply the same rule again when composing that piece into a larger application.

Keep reusable children independent of the application that composes them.
Put coordination in the parent when siblings would otherwise need each other's internals.
A child should remain usable when the original parent is removed.

A thin wrapper that forces every caller to understand all its children has not hidden useful complexity.
Improve its public promise or keep those children directly visible where callers genuinely need their individual controls.

## Keep independent choices independent

Orthogonal design lets you change one concern without rewriting unrelated concerns.
Separate domain decisions, external-system adaptation, state access, and observation when they have different reasons to change.
Keep the relationship between them explicit in the composition.

For the routing example:

- Changing the ticket vendor should affect the assignment integration.
- Changing a routing rule should affect the policy that owns it.
- Improving classification should affect the classifier and its behavioral evidence.
- Changing the progress display should affect the observer.

Prefer deterministic code for known transformations and rules.
Isolate Agent judgment in a component whose uncertainty and required evidence are explicit.
Validate its result before using it to cause an external effect.
An Agent implementation can preserve the calling interface while changing quality, cost, latency, or required powers.

Pass snapshots and explicit values to decision logic where practical.
Put external reads and writes behind dependencies with clear purposes.
Give persistent state an identifiable owner instead of allowing siblings to mutate shared private state.
The host supplies execution policy, bindings, credentials, and grants.
Flows and applications own their domain methods and decisions.

Every additional dependency, flag, or callback increases what someone must understand.
Add flexibility for an identified consumer need.
Remove configuration that merely exposes an internal implementation choice.

## Choose calls and channels deliberately

Use calls and their outcomes to express finite work whose result the caller needs.
Use channels for declared live messages while work runs.
Keep optional observation independent from required control.

| Relationship | Design default |
| --- | --- |
| A required classification before assignment | Call the classifier and handle its outcome before assigning |
| Optional progress for a display | Expose an optional observation port with a documented failure policy |
| A stream required by the method | Declare the required port, message meaning, direction, and failure behavior |

Do not make a progress listener secretly perform assignment.
That would make an apparently optional observer part of the required method.
For optional observation, removing the observer should preserve the promised domain result.
Specify whether a slow observer may delay the method.
Choose delivery and backpressure behavior that matches this policy.
Handle permitted observer loss without suppressing root cancellation, fatal transport failures, or failed cleanup.

Channels can be essential domain dependencies.
[Channel Contract/0](../spec/channel-contracts.md) makes ports required by default.
Declare optional ports with `required: false` when their absence is permitted.
A required grant does not prove that its peer will later complete successfully.

A successful send establishes acceptance by the host.
A clean channel end does not establish execution success or durable processing.
Handle the separate execution result even after its messages end.
See [Run SDK/0](../spec/run-sdk.md) for ownership and completion mechanics.

## Make components easy to move

Keep package resources inside the component and declare dependency roles through `uses` slots.
Let the receiving host bind those roles to authorized implementations.
Slots do not provide automatic discovery or select providers by themselves.
See [Package/0](../spec/package-format.md) for package trees, resources, and dependencies.

Avoid absolute developer paths, sibling source imports, ambient credentials, and assumptions about the caller's working directory.
Pass each child its input and any required attachment or channel references explicitly.
The host configures each selected dependency's settings and grants.
Children do not automatically inherit their parent's settings, attachments, or authority.
Keep provider-specific formats within the integration that owns them.

Move the complete package and its declared dependency requirements into a separate consumer project.
Check that it can be configured and invoked without the author's application or checkout.
Keep runtime and capability requirements explicit.
Portability depends on [compatible host support](./runtimes.md), not merely on a valid package.

Replace a dependency with another suitable implementation when replacement is part of the design.
Check relevant behavior, outcomes, effects, and required powers as well as the interface shape.
Matching schemas alone cannot establish substitutability.

## Own effects and failure

Give each external effect one clear owner.
Keep decisions independently testable with supplied data where practical.
Make state reads and writes visible in the component's promise.
Each call is a fresh finite invocation, so a package name or session identifier does not create persistent shared state.

Handle a child's outcome before using its output.
Preserve or deliberately translate domain refusals and uncertainty into the composite's own declared behavior.
Report operational failures accurately.
Do not turn a failed required child into an apparently successful result.

Finish or settle owned child work and live resources before reporting completion.
Cancellation can stop further work while an earlier external effect remains.
Place retry decisions with the component that understands that effect.
Define whether repeated attempts are safe and what evidence confirms the effect occurred.
The protocol does not make arbitrary external writes safe to repeat across invocations.

Keep these obligations visible without leaking cleanup machinery into every caller.
The exact result, error, cancellation, and artifact rules belong to [Run SDK/0](../spec/run-sdk.md).

## Review the design with concrete changes

Review architecture and protocol conformance separately.
A valid package can still expose too much knowledge, hide required effects, or couple unrelated decisions.
Use the relevant probes below when authoring, refactoring, or reviewing a Flow.

| Probe | Evidence of a useful boundary | Design problem to investigate |
| --- | --- | --- |
| Explain it | A reader can explain the public promise without opening child implementations | Understanding one component requires reading the whole application |
| Compose it | One composite call replaces repeated consumer wiring and result handling | Every caller reconstructs the same internal sequence |
| Change it | A vendor, policy, or display change stays with its intended owner | Unrelated Flows need coordinated edits |
| Replace it | A suitable alternative passes the same relevant behavior checks | Matching shapes conceal different effects or assumptions |
| Move it | A separate consumer uses the package with declared resources and supported dependencies | The component needs private sibling files or ambient application state |
| Observe it | Missing, slow, or disconnected optional observation follows the documented policy | A listener secretly performs required business work |
| Fail or cancel it | Child refusal, operational failure, partial effects, and cancellation remain distinguishable | A partial result is reported as success or cancellation is treated as rollback |

Exercise the probes that match the change's risks.
Use explicit fixtures for domain decisions and controlled substitutes for external effects.
Evaluate Agent-dependent quality with representative cases and the task's acceptance criteria.
Successful execution alone does not establish a useful or correct answer.

For each finding, name the leaking assumption, affected caller, consequence, and smallest useful correction.
Record justified exceptions with their concrete tradeoff and evidence.
Distinguish inspected design from executed checks when a compatible host is unavailable.

## Further reading

These sources inform the design heuristics. They do not define FLOW conformance.

- David Parnas, [On the Criteria To Be Used in Decomposing Systems into Modules](https://dl.acm.org/doi/10.1145/361598.361623): hide decisions that should change independently.
- Rich Hickey, [Simple Made Easy](https://www.infoq.com/presentations/Simple-Made-Easy/): examine the concerns a design entangles.
- Mark Seemann, [Referential transparency fits in your head](https://blog.ploeh.dk/2021/07/28/referential-transparency-fits-in-your-head/): keep decision logic understandable by making effects explicit.
