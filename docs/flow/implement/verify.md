---
title: Verify an implementation
description: Exercise a caller and dependency, then qualify FLOW behavior with the public conformance corpus.
---

# Verify an implementation

Conformance checks whether an implementation follows FLOW's portable contracts.
The public [Run/0 corpus](https://github.com/jiggy/flow/tree/main/conformance/run-0) provides executable evidence for the current candidate.
Its README explains how to run it and where its evidence ends.

Use the exercise below to follow both directions of an invocation.
Then test the boundaries your implementation claims:

| Boundary | Cases to exercise |
| --- | --- |
| Invocation and results | Ordinary entry, declared outcomes, complete result validation, and response correlation. |
| Dependency calls | Declared slots, operation identity, authorized routes, and child context. |
| Protocol failures | Malformed frames, invalid values, ID reuse, error responses, and transport loss. |
| Completion | Cancellation, pending work, deadlines, process exits, and trailing stdout. |
| Channels | Transfer, delivery, ownership, and closure when claiming channel support. |

## Run a caller and dependency

This illustrative exercise runs a caller and greeter through a small host.
It uses Node 24, npm, and Python 3.11+ on Linux or macOS.
The public [Run/0 test peer](https://github.com/jiggy/flow/tree/main/conformance/run-0/python-peer) uses Python's standard library.
It checks framing and process completion.

Run trusted code with the clean environment shown below.
The peer inherits its launching process's environment and supplies no descendant containment.
Use it to test the protocol, rather than as a production host library.

Create an empty directory and install the published SDK:

```sh
npm init -y
npm pkg set type=module
npm install --save-exact @jigging/flow@alpha
mkdir greeter
```

Save this caller as `FLOW.mjs`:

```js
import { handle } from "@jigging/flow";

await handle(async (context) => context.call({
  operationId: "greet:1",
  slot: "greeter",
  input: context.input,
}));
```

Declare its dependency in `FLOW.meta.json`:

```json
{"uses":{"greeter":{}}}
```

Save this implementation as `greeter/FLOW.mjs`. Both packages use the installed
SDK in this local exercise:

```js
import { handle } from "@jigging/flow";

await handle(async (context) => ({
  outcome: "done",
  output: { message: `Hello, ${context.input}!` },
}));
```

Save the public peer's `run0_peer.py` in the exercise directory.
Save the following as `host.py`.
It serves one exact dependency call for these illustrative packages.
A general [host](./host.md) also owns validation, authority, concurrency, channels, and the complete execution lifecycle.

```python
import json
import tempfile
import time
from pathlib import Path
from run0_peer import HostPeer, flow_run_request, require_exact_object, success


def done_result(message, request_id):
    require_exact_object(message, {"jsonrpc", "id", "result"})
    if message["id"] != request_id:
        raise RuntimeError("Unexpected response ID")
    result = require_exact_object(message["result"], {"outcome", "output"})
    if result["outcome"] != "done":
        raise RuntimeError("These packages declare only the done outcome")
    return result


def remaining(deadline):
    seconds = (deadline - int(time.time() * 1000)) / 1000
    if seconds <= 0:
        raise TimeoutError("Invocation deadline expired")
    return seconds


with tempfile.TemporaryDirectory() as directory:
    scratch = Path(directory)
    (scratch / "caller").mkdir()
    (scratch / "greeter").mkdir()
    deadline = int(time.time() * 1000) + 5_000
    request = flow_run_request("host:1", "Ada")
    request["params"].update(scratch=str(scratch / "caller"), deadlineUnixMs=deadline)

    with HostPeer(["node", "FLOW.mjs"], timeout=1) as caller:
        caller.send(request)
        call = caller.validate_request(
            caller.receive(timeout=remaining(deadline)), "flow/call"
        )
        params = require_exact_object(call["params"], {"slot", "operationId", "input"})
        if params != {"slot": "greeter", "operationId": "greet:1", "input": "Ada"}:
            raise RuntimeError("The call does not match this exercise's granted route")

        child_request = flow_run_request("host:greeter:1", params["input"])
        child_request["params"].update(
            scratch=str(scratch / "greeter"), deadlineUnixMs=deadline
        )
        with HostPeer(["node", "greeter/FLOW.mjs"], timeout=1) as greeter:
            greeter.send(child_request)
            child_result = done_result(
                greeter.receive(timeout=remaining(deadline)), "host:greeter:1"
            )
            greeter.finish()

        caller.send(success(call["id"], child_result))
        result = done_result(caller.receive(timeout=remaining(deadline)), "host:1")
        caller.finish()

    if result != {"outcome": "done", "output": {"message": "Hello, Ada!"}}:
        raise RuntimeError("Unexpected greeting result")
    print(json.dumps(result))
```

Run the exercise without ambient credentials:

```sh
env -i PATH="$PATH" python3 host.py
```

The expected output is:

```json
{"outcome":"done","output":{"message":"Hello, Ada!"}}
```

## Modify the dependency

Change `Hello,` to `Welcome,` in the greeter.
Update the final expected message in `host.py`, then run the exercise again.
The caller receives the new result through the same interface.

## Check a failure

Remove `output` from the greeter's return value, then run again.
The SDK rejects the invalid result. The host exits unsuccessfully and prints no successful result.
A component also fails completion when it emits trailing stdout or exits nonzero after responding.


## Bound the claim

Protocol evidence establishes the tested exchange and lifecycle behavior.
A host's threat model also covers filesystem and network authority, resource limits, credentials, descendants, and cleanup.
Verify those controls separately against the intended environment.
Method declarations describe requirements. Host policy supplies their powers.

Use the corpus's [evidence matrix](https://github.com/jiggy/flow/blob/main/conformance/run-0/MATRIX.md) to describe the cases actually tested.
An SDK smoke test and a qualified host execution path establish different kinds of support.
Keep that distinction visible in your implementation's support documentation.

Return to [host implementation](./host.md), [SDK implementation](./sdk.md), or the [specification map](../reference/index.md).
