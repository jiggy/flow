# FLOW

**Capability compounding through independently reusable methods.**

FLOW is the independent standard for packaging and invoking reusable procedures.
A Flow can use code, Agent judgment, or both behind one invocation contract.
Hosts supply execution policy and powers.

- [Start building](https://flow.jig.md/guide/start)
- [TypeScript SDK](packages/flow-sdk/README.md) and [Python SDK](packages/jiggy-flow/README.md)
- [Specifications](docs/flow/spec/run-protocol.md) and [conformance evidence](conformance/AGENTS.md)
- [Independent contract authoring](packages/flow-authoring/README.md)
- [Governance](Governance.md), [working-group scope](Scope.md), and [licenses](LICENSES.md)

[Jig](https://github.com/jiggy/jig) is one FLOW host.
Jig owns its host policy, flavored Flows, reporting profiles, and applications.

## Development

Use Bun 1.3.3, Node 22 or newer, Just 1.43.1, and Python 3.11 or newer.

```sh
bun install --ignore-scripts
bun install --cwd conformance/run-0 --frozen-lockfile --ignore-scripts
just build
just test
```

[Contributing](CONTRIBUTING.md) documents the complete checks.
