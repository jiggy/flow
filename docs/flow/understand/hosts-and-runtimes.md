---
title: Hosts and runtimes
description: Choose how a method runs while keeping its caller-facing interface independent of language and host policy.
---

# Hosts and runtimes

A Flow's implementation determines how it performs its work.
Its host determines where it can run and which powers it receives.
The caller uses the method's input and result boundary across those choices.

## Choose an implementation

Each package has one `FLOW.<ext>` implementation entrypoint.
The extension identifies its implementation format, including Markdown as `FLOW.md`.
Hosts can support additional formats without changing the common invocation boundary.

These are examples of implementation choices, rather than an exhaustive list of runtimes:

| Example entrypoint | What executes the method |
| --- | --- |
| `FLOW.md` | A compatible Markdown interpreter and its configured Agent. |
| `FLOW.ts` | A TypeScript-capable runtime, such as Bun or a suitable Node setup. |
| `FLOW.py` | A Python runtime with the package's required dependencies. |
| `FLOW.<ext>` | Another runtime supported by the receiving host. |

Each runtime can advance a plain program, a graph, or another suitable internal model.
The receiving host must support that implementation and its required public interfaces.

## Separate runtime support from SDK availability

An SDK helps an implementation receive invocations, call dependencies, and return results.
The host still owns launching the runtime and preparing its execution context.
Running a Python package requires a Python-capable host, even when a Python SDK is available.

Check the [support reference](../reference/support.md) before selecting a host or following a language tutorial.
It separates SDK availability from qualified host support.
Each host documents the runtimes, platforms, and guarantees of its own release.

## Keep responsibilities with their owners

| Owner | Responsibility |
| --- | --- |
| Flow method | Procedure, prompts, selected Skills, validation, and internal control. |
| Runtime | Advance that implementation's program, interpreter, or internal graph. |
| FLOW standard | Portable package meaning, values, invocation, outcomes, and optional interoperability contracts. |
| Host | Execution support, dependency resolution, providers, credentials, permissions, limits, and lifecycle policy. |
| Application | Purpose, domain checks, user experience, and consequences of the result. |

A package describes the dependency roles it needs.
The receiving host binds those roles to authorized implementations.
A declaration grants neither credentials nor permission to choose a provider.
Changing a method still requires the host's applicable review and authorization.

FLOW remains independent of Jig's host policies.
Jig implements the standard as one host, and other hosts can implement the same portable boundary with their own policies.
The [host implementation guide](../implement/host.md) describes that work.

## Choose where reasoning belongs

Markdown/0 uses Agent interpretation to carry out instructions within its supported profile.
Code can perform known steps directly and request Agent judgment where the method needs interpretation.
Either approach can call other methods through declared dependencies.

**Illustrative example: request classification.**
A code classifier might recognize explicit labels, while an Agent classifier interprets the message's meaning.
A mixed implementation could use both.
The application still receives the classifier's declared outcome and output.

The shared interface lets callers compose these implementations consistently.
Evaluate each implementation's behavior, required powers, and quality.
See [calls and channels](./calls-and-channels.md) for the relationships between methods.
