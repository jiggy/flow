---
title: Skill interpretation experiment
description: Bounded maintainer observations from running four unchanged Skill bodies through a Markdown interpreter and live Agents.
---

# Skill interpretation experiment

**Evidence record:** This page reports one bounded maintainer experiment.
Its findings concern the tested interpreter, models, Skills, and tasks.
Use [Skill compatibility](../reference/skill-compatibility.md) for current execution requirements.

## What the experiment tested

The experiment used four Apache-2.0 Skills from [Anthropic's pinned repository](https://github.com/anthropics/skills/tree/33375500bcea98d610eb30ce10ac4e59b89c390d/skills).
It renamed each entrypoint to `FLOW.md` and retained the body and resources unchanged.
It ran the actual Markdown interpreter and HTTP Agent method with live Ministral 8B and Mistral Small responses.

The exercise tested interpretation rather than installed-host containment or independent usability.
Its tasks were deliberately bounded. They supplied no evidence of general unchanged-Skill compatibility.

## Observed results

| Skill and bounded task | Package / execution qualification | Observed task result |
| --- | --- | --- |
| `brand-guidelines`: return a text style specification | Accepted | Both models returned the requested colors and fonts. The experiment tested no rendered artifact. |
| `internal-comms`: draft a 3P update from supplied facts | Accepted | Both read the required guideline. Small produced the expected update. 8B selected a nonexistent recipe and stopped. |
| `slack-gif-creator`: generate and validate a GIF | Accepted | Neither produced a GIF. Small returned `done` with null output. 8B selected a nonexistent recipe. |
| `webapp-testing`: run a browser test and save a screenshot | Accepted | Neither executed a test. 8B read a script despite its run-before-read instruction. Both ultimately returned invalid decisions. |

## What the results establish

Package validity, execution qualification, task achievement, and constraint preservation are separate questions.
A `done` outcome alone proved neither task achievement nor compliance with required prose instructions.
The browser task showed that the presence of a procedural restriction did not establish its enforcement.

Result schemas can reject unsuitable shapes, such as null where an artifact is required.
Actual artifact validation or execution evidence is still needed to establish task completion.
Applications need checks appropriate to their own outcomes and consequences.

## Open questions

The current Markdown interpreter supplies no general script-execution action.
FLOW leaves room for another runtime to expose host-authorized tools.
Such an implementation would need evidence that tool mappings and required restrictions preserve the method's meaning.
Pre-approval hints and mandatory restrictions would need distinct treatment.

Workspace access, script execution, binary output, and session context remain specific gaps to test.
These questions establish no availability claim or commitment to a particular extension.
Composition with an authorized code specialist is an adaptation of the method, rather than unchanged-Skill execution.
