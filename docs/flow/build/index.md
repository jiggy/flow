---
title: Build with Flows
description: Adapt a Skill, write a method, and combine callable capabilities in your application.
---

# Build with Flows

Start with a procedure whose input and useful result you can explain.
Package it once, then let an application or another method call it.
Choose the implementation that fits the work and your host.

## Choose a starting point

| You have… | Start here |
| --- | --- |
| Useful instructions in a Skill | [Bring a Skill](./skills.md). |
| A procedure best expressed in prompts | [Write a Flow in Markdown](./markdown.md). |
| TypeScript or JavaScript code | [Write a Flow in TypeScript or JavaScript](./typescript.md). |
| Python code | [Write a Flow in Python](./python.md). |
| A method ready to use | [Call it from your application](../start/application.md). |

Check [host and runtime support](../reference/support.md) before choosing a format.
Every package has one `FLOW.<ext>` implementation.
The host supplies the runtime and local powers needed to execute it.

## Build further

| Task | What it adds |
| --- | --- |
| [Compose methods](./compose.md) | Give another method a defined job through a declared dependency. |
| [Handle outcomes and failures](./outcomes.md) | Distinguish a useful answer, a request for review, and an execution error. |
| [Validate inputs and results](./validation.md) | Check the values crossing the method boundary. |
| [Exchange messages](./messages.md) | Observe progress or exchange structured values while work runs. |
| [Design reusable Flows](./design.md) | Choose clear names and the smallest meaningful capabilities. |

The tutorials use a request classifier as an illustrative example.
Its queues and review policy belong to that example.
Apply the same boundary to the task your application needs.
