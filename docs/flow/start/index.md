---
title: FLOW documentation
description: Run a Flow, call it from your application, and adapt the method to your task.
---

# Choose your next step

A **Flow** packages a method that software can call with input and receive an outcome and result.
The method can use code, Agent instructions, or both.
Start by running one, then build on it.

<div className="reader-grid reader-grid-primary">
<a className="reader-card" href="/start/run"><span className="tile-index">USE A FLOW</span><h3>Run a method.</h3><p>Try a supplied classifier, inspect its result, and call it from an application.</p><span className="card-link">Run your first Flow →</span></a>
<a className="reader-card" href="/build/skills"><span className="tile-index">BRING A SKILL</span><h3>Make instructions callable.</h3><p>Give a useful procedure explicit input and a result your software can consume.</p><span className="card-link">Adapt a Skill →</span></a>
<a className="reader-card" href="/build/"><span className="tile-index">WRITE A FLOW</span><h3>Package your method.</h3><p>Choose instructions or code, then compose methods through the same interface.</p><span className="card-link">Choose an authoring path →</span></a>
</div>

## Follow the first-use path

The tutorials follow an illustrative request classifier.
It suggests a review queue, and the application decides how to use that suggestion.

| Step | What you will accomplish |
| --- | --- |
| [Run your first Flow](./run.md) | Send a request and receive a queue suggestion on a supporting host. |
| [Call it from your application](./application.md) | Use the host's public client and check the execution and method result. |
| [Bring a Skill](../build/skills.md) | Adapt instructions into an alternative callable implementation. |
| [Compose methods](../build/compose.md) | Call a classifier from a method that prepares a review record. |

The first run uses Jig as a concrete supporting host.
FLOW remains independent of that host and its application client.
Check [hosts, runtimes, and SDKs](../reference/support.md) before choosing another execution path.

## Understand the boundary

Read [What FLOW adds](../understand/index.md) for the connection from Skills to callable methods.
Then explore [hosts and runtimes](../understand/hosts-and-runtimes.md), [calls and channels](../understand/calls-and-channels.md), or [optional contracts](../understand/contracts.md).
Each explanation develops the concepts used by the practical guides.

## Find a precise answer

Use [Reference](../reference/index.md) to look up an API, recipe, package format, or exact requirement.
[Implement FLOW](../implement/index.md) explains how to add support to a host, coding agent, or runtime.
[For agents](../for-agents.md) provides Markdown access and the FLOW authoring skill.

FLOW is a public alpha.
Specifications and APIs may change, so use the revision qualified by your selected host.
