[![FLOW — Turn a Skill into a method your app can call.](site/flow/public/social/flow-readme.png)](https://flow.jig.md/)

# FLOW

Package a useful procedure as a method your application can call.
A Flow receives input and returns an outcome with data, whether its implementation uses code, Agent instructions, or both.
FLOW defines that shared boundary. A compatible host supplies execution and local powers.

- [Run a Flow](https://flow.jig.md/start/run) and [call it from your application](https://flow.jig.md/start/application)
- [Bring a Skill](https://flow.jig.md/build/skills) or [write a method](https://flow.jig.md/build/)
- [Compose methods](https://flow.jig.md/build/compose) and [design reusable Flows](https://flow.jig.md/build/design)
- [TypeScript SDK](packages/flow-sdk/README.md) and [Python SDK](packages/jiggy-flow/README.md)
- [Implement FLOW](https://flow.jig.md/implement/), [find an exact contract](https://flow.jig.md/reference/), or inspect [conformance evidence](conformance/run-0/README.md)
- [Independent contract authoring](packages/flow-authoring/README.md)
- [Governance](Governance.md), [working-group scope](Scope.md), and [licenses](LICENSES.md)

[Jig](https://github.com/jiggy/jig) is one FLOW host.
Check [host and runtime support](https://flow.jig.md/reference/support) before choosing an execution path.
FLOW is a public alpha, and its specifications and APIs may change.

## Development

Use Bun 1.3.3, Node 22 or newer, Just 1.43.1, and Python 3.11 or newer.

```sh
bun install --ignore-scripts
bun install --cwd conformance/run-0 --frozen-lockfile --ignore-scripts
just build
just test
```

[Contributing](CONTRIBUTING.md) documents the complete checks.
