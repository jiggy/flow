---
title: Documentation for agents
description: Read FLOW's public specifications and guides as Markdown. Use the index to select pages or read the complete bundle.
---

# Read FLOW as Markdown

Agents and developers share the same public source of truth. Each page has a
plain-text Markdown version. The site generates an index and a complete bundle.
You need no account or API key to read them.

| Resource | Use it for |
| --- | --- |
| [Documentation index](https://flow.jig.md/llms.txt) | Discover the relevant guide or exact contract |
| [Full documentation](https://flow.jig.md/llms-full.txt) | Read the whole site when your context budget permits |
| [Task map as Markdown](https://flow.jig.md/guide/overview.md) | Select a path for authoring or implementation |
| [Specification map as Markdown](https://flow.jig.md/guide/index.md) | Find every normative boundary |

**Copy Markdown** copies the page content. **View Markdown** opens its
plain-text version. The HTML page `/spec/run-protocol` corresponds to
`/spec/run-protocol.md`.

## Install the FLOW authoring skill

The `flow` skill guides an Agent through creating, changing, adapting, and
reviewing Flows. It selects documentation for the current task.

1. Choose a successful [CI run](https://github.com/jiggy/flow/actions/workflows/ci.yml) for your selected revision.
2. Download its `flow-skills-…` artifact and extract it.
3. Install the complete `flow/` directory using your coding agent's skill installation instructions.

Keep `SKILL.md`, `references/`, provenance, and license files together.
Invoke `flow` by name, or let an agent supporting automatic skill discovery select it.
Executing the resulting Flows requires a compatible host.

### Build the skill from source

After [setting up the repository](https://github.com/jiggy/flow/blob/main/CONTRIBUTING.md), run:

```sh
just build-skills .tmp/flow-skills
```

Use a fresh output path. Install the generated `.tmp/flow-skills/flow/` directory.
Source skills link to repository documentation. Use the generated bundle when installing outside the checkout.

CI builds the same complete directory from the checked revision.
The [reference manifest](https://github.com/jiggy/flow/blob/main/skills/references.json) selects canonical documentation for each skill.
Edit those source documents to update bundled guidance. The build synchronizes references, adjusts links, and preserves their licenses.

## The architecture to preserve

Executable Flows give code, Agent judgment, and mixed methods one boundary for
input, outcome, and result. Compose through the method's contract.
Do not require a different calling model because its implementation uses an Agent.
FLOW owns the portable boundary. Jig owns local authority and execution lifecycle.
A shared interface does not establish equal judgment, cost, or required powers.

See [why FLOW exists](./understand.md) and the
[complete Jig example](https://jig.md/guide/contact-import).

## A focused starting instruction

```text title="Documentation context"
Read https://flow.jig.md/llms.txt.
Fetch the pages relevant to my task.
Use the exact public specification for package or protocol requirements.
Keep FLOW independent of host admission, providers, credentials, and policy.
Distinguish SDK availability from a host's supported implementations.
Do not infer permission to execute from a package's declared capabilities.
Validate against the public conformance material for the selected revision.
```

These instructions supply context, not execution authority. The consumer and
receiving host remain responsible for their powers.

## Choose only the context you need

- **Package author:** [authoring path](./start.mdx), [Package/0](../spec/package-format.md), and your SDK guide.
- **Host implementer:** [Run/0](../spec/run-protocol.md), [JSON/0](../spec/json-values.md), and the public conformance corpus.
- **SDK implementer:** [Run SDK/0](../spec/run-sdk.md) together with Run/0.
- **Interface author:** [invocation contracts](../spec/invocation-contracts.md) or [channel contracts](../spec/channel-contracts.md).

Jig's operator configuration belongs in [Jig's documentation](https://jig.md/guide/for-agents).
It is not a portable FLOW requirement.

## Check meaning before assuming support

The specifications are prerelease. A source SDK candidate may not yet be
published, and a host may support only a subset of implementations. Use a
qualified revision and report missing support directly.

The public Markdown includes explanatory pages and normative specifications.
The normative specifications define exact requirements. The site does not include internal
repository instructions or transfer a method author's authority to its reader.
