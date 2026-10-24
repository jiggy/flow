---
title: What FLOW adds
description: Give a useful procedure an input and result that applications, workflows, and agents can call.
---

# What FLOW adds

A Skill captures instructions and resources for useful work. FLOW packages a procedure as a method your software can call.
Your application supplies input and receives an outcome with output data.
The method can use code, Agent judgment, or both.

A **Flow** is the package containing that method.
A compatible **host** executes it with the required runtime and local powers.

## Start with the result your application needs

**Illustrative example: classify a support request.**
An application needs a queue suggestion before deciding how to handle a request.
It supplies this input:

```json
{"message":"I was charged twice for the same invoice."}
```

The classifier returns an outcome and useful data:

```json
{"outcome":"done","output":{"queue":"billing"}}
```

The application handles the result the same way whether the classifier uses instructions or code.
It still checks the suggestion before taking a consequential action.
Successful execution establishes that the method finished. Application checks establish whether its answer is suitable.

## Choose how the method does its work

For this example, three implementations could produce the same result shape:

| Implementation | Work inside the method |
| --- | --- |
| Code | Recognize explicit labels and suggest manual review for other messages. |
| Agent instructions | Ask an Agent to interpret the supplied message. |
| Code and Agent | Handle known labels in code and ask an Agent about the remaining messages. |

The caller supplies the same input and handles the same declared outcomes.
Implementation changes can still alter quality, latency, cost, effects, and required powers.
Evaluate those differences when choosing a method.

Skills can already bundle scripts, and software can invoke those scripts directly.
FLOW adds a common package and invocation boundary around the complete method.
Bringing a Skill into that boundary requires its resources, tools, and constraints to fit the receiving runtime.
The [Skill compatibility reference](../reference/skill-compatibility.md) describes the current differences.

## Build another capability from it

An intake method could combine the classifier with a policy check and a method that drafts a response.
Its caller receives one result without coordinating each child's internal steps.
These are illustrative choices for this application.

This is **capability compounding**: combine useful methods to accomplish more.
Evaluation establishes whether the combination helps.
A portable method can still carry unsuitable assumptions or produce a wrong answer.

## Keep the boundary small

FLOW specifies the package and finite invocation boundary.
The method owns its procedure. Its runtime advances the program or graph that performs the work.
The host supplies execution support and authorized powers.
The application decides what the result means for its users.

![A Flow package exposes readable meaning, input, and outcomes. Its runtime owns internal execution. The host supplies authorized capabilities.](./flow-boundary.svg)

This division lets callers use a method without adopting its internal framework.
It also keeps FLOW independent of Jig, Agent vendors, and any one language.
[Hosts and runtimes](./hosts-and-runtimes.md) explains how those responsibilities fit together.

## Try the boundary

[Run your first Flow](../start/index.md) to see input become a result on a supported host.
Then [build with Flows](../build/index.md) by adapting a Skill, writing a method, or composing existing methods.
Use the [reference](../reference/index.md) when you need an exact API or format.
