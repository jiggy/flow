---
title: Implement an SDK or runtime
description: Support another language through FLOW's invocation, dependency-call, result, and cancellation boundaries.
---

# Implement an SDK or runtime

Any suitable executable runtime can implement FLOW Run/0 over stdio.
An SDK makes that exchange convenient for authors through `handle(handler)` and `context.call(...)`.
It owns serialization, validation, cancellation, and accounting for outbound work.

This guide follows one invocation through the wire exchange.
[Run/0](../spec/run-protocol.md) defines wire behavior. [Run SDK/0](../spec/run-sdk.md) defines the authoring projection.
Check [current support](../reference/support.md) when choosing an existing implementation.

## Receive an invocation

The host selects a component and sends one `flow/run` request.
This entry request is the same for a directly invoked component and a launched dependency.

**Illustrative request:**

```json
{
  "jsonrpc": "2.0",
  "id": "host:1",
  "method": "flow/run",
  "params": {
    "protocol": "run/0",
    "input": "Ada",
    "settings": {},
    "attachments": {},
    "scratch": "/sandbox/scratch",
    "deadlineUnixMs": 4000000000000
  }
}
```

The host supplies an actual scratch path and finite deadline for the invocation.
The values above illustrate the request shape.
Validate the complete request before calling the handler.
Expose input, settings, attachments, channels, scratch, deadline, and cancellation through the context.

Run/0 IDs are bounded ASCII strings.
Frames are bounded, LF-terminated UTF-8 objects with [JSON/0](../spec/json-values.md) values.
Keep the reader active while waiting for replies. Serialize and flush writes.
Track request IDs and pending requests throughout the exchange.

## Call a dependency

The author selects a declared slot through `context.call(...)`.
The SDK sends `flow/call` with a fresh wire request ID and the author's operation identity.

**Illustrative request:**

```json
{
  "jsonrpc": "2.0",
  "id": "component:1",
  "method": "flow/call",
  "params": {
    "operationId": "greet:1",
    "slot": "greeter",
    "input": "Ada"
  }
}
```

The host resolves and authorizes the slot.
When it launches another component, it constructs that component's `flow/run` context.
A native implementation uses the same call-level input/result boundary.
The host owns package resolution, credentials, runtime settings, and grants.
Run/0 defines optional `intent` and `channels` fields.

## Preserve the complete result

Both operations return an outcome and output:

```json
{
  "jsonrpc": "2.0",
  "id": "component:1",
  "result": {
    "outcome": "done",
    "output": { "message": "Hello, Ada!" }
  }
}
```

Correlate and validate responses before exposing them to the author.
Preserve declared domain outcomes as result data.
Expose operational errors separately, as specified by Run SDK/0.
Return the complete result so callers can inspect its meaning before using the output.

## Propagate cancellation and settle work

Cancellation targets a pending request by its string ID:

```json
{"jsonrpc":"2.0","method":"request/cancel","params":{"requestId":"host:1"}}
```

Propagate root cancellation to the handler and pending outbound waits.
The host enforces termination. Cancellation leaves already dispatched external effects subject to their actual state.
Apply Run/0's distinctions between operational errors, fatal protocol errors, and transport loss.

Settle every owned outbound request and channel operation before emitting the root response.
Validate the handler result, flush the response, and exit with the required status.
The host also checks process exit, pending work, and trailing stdout.
Receiving a result alone leaves those completion checks outstanding.

## Keep protocol output separate

Capture the protocol writer before redirecting ordinary application logging to stderr.
Keep stdout for protocol frames.
Account for import-time logging, cached stdout references, raw descriptor writes, and child processes inheriting stdout.
Run SDK/0 defines the logging behavior expected by authors.

## Exercise an installed SDK

Use this local check after writing the [Python](../build/python.md) or [TypeScript](../build/typescript.md) classifier.
It runs trusted code through the independent protocol peer on Linux or macOS.
You need Python 3.11+, the installed SDK, and Node 24 when testing TypeScript.
Python is a test-peer dependency, rather than a TypeScript SDK dependency.

Save the public [peer's `run0_peer.py`](https://github.com/jiggy/flow/blob/main/conformance/run-0/python-peer/run0_peer.py) beside your implementation.
Then save this as `try_flow.py`:

```python
import json
import sys
import tempfile
import time
from run0_peer import HostPeer, flow_run_request


with tempfile.TemporaryDirectory() as scratch:
    request = flow_run_request("host:1", {"message": "I was charged twice."})
    request["params"]["scratch"] = scratch
    request["params"]["deadlineUnixMs"] = int(time.time() * 1000) + 10_000
    with HostPeer([sys.executable, "FLOW.py"]) as peer:
        peer.send(request)
        response = peer.receive()
        peer.finish()
    print(json.dumps(response))
```

For TypeScript, replace `[sys.executable, "FLOW.py"]` with `["node", "FLOW.ts"]`.
Run the exercise:

```sh
env -i PATH="$PATH" python3 try_flow.py
```

The response's `result` is:

```json
{"outcome":"done","output":{"queue":"billing"}}
```

Change the input message to `"I cannot login."`, then run again.
The result's `queue` changes to `technical`.
Next, use `{"message": 12}` as input.
The method returns an `INVALID_INPUT` operational error instead of a successful result.

The peer exercises your own component's exchange and process completion.
It supplies neither a production host nor descendant containment.
It also leaves dependency calls unconfigured.
Use the [caller/dependency exercise](./verify.md#run-a-caller-and-dependency) to service a declared slot.

## Qualify the implementation

Use [conformance material and the local exercise](./verify.md) to check both directions of the exchange.
Exercise malformed input, ID reuse, errors, cancellation, abandoned work, process exits, and trailing frames.
Qualify channels when your implementation claims that extension.

Your runtime owns the method's internal program or graph.
The [host](./host.md) owns launching it with supported dependencies and authorized powers.
SDK support and host support remain separate qualifications.
