---
title: Call a Flow from your application
description: Invoke an approved method through Jig's public Node client and check its execution, outcome, and output.
---

# Call a Flow from your application

Let an application supply a customer request and consume the classifier's queue suggestion.
The application uses the host's public client.
The method keeps its own implementation behind the FLOW boundary.

This tutorial continues [Run your first Flow](./run.md).
Use its reviewed `support-demo` project, the globally installed `jig` command, and Node 24.
The classifier and its keyword rules remain illustrative.

## Install the application client

From the project directory, install the published Jig package for the application:

```sh
npm init -y
npm install --save-exact @jigging/jig@alpha
```

Keep the generated lockfile.
The application imports `@jigging/jig/client`.
Each Flow retains its own SDK declaration.
Review the project and any changed dependencies before invoking it:

```sh
jig review --allow-resolution-network
```

Inspect the proposal and approve the intended revision.
An operator reviews and approves the revision.
The application below invokes that already approved work.

## Make one application call

Save this as `app.mjs` in the project directory:

```js title="app.mjs"
import { createAttemptClient } from "@jigging/jig/client";

const input = JSON.parse(
  process.argv[2] ?? '{"message":"I was charged twice."}',
);
const client = createAttemptClient({ executable: "jig", cwd: process.cwd() });
const target = "flow:flows/classify-request";
const inspected = await client.inspect({ target });
if (
  inspected === null ||
  typeof inspected !== "object" ||
  Array.isArray(inspected) ||
  typeof inspected.approval !== "string"
) {
  throw new Error("Review the project and choose an approved target first.");
}

const attempt = await client.run({
  expectedApproval: inspected.approval,
  target,
  input,
  files: [],
  constraints: { durationMs: 30_000, resultBytes: 65_536, artifactBytes: 0 },
  outputIntent: { packet: false, receive: [] },
});
const result = await client.result({ ticket: attempt.prepared.ticket });
const terminal = result.observation.terminal;
if (terminal?.status !== "succeeded") {
  throw new Error(
    terminal?.status === "failed"
      ? `Execution failed: ${terminal.code}`
      : "Execution is unresolved. Inspect this attempt before starting more work.",
  );
}
if (result.observation.cleanup !== "confirmed") {
  throw new Error("Wait for confirmed cleanup before starting more work.");
}
if (terminal.outcome !== "done") {
  throw new Error(`Handle the method outcome: ${terminal.outcome}`);
}
const output = result.output;
if (
  output === null ||
  typeof output !== "object" ||
  Array.isArray(output) ||
  !["billing", "technical", "manual"].includes(output.queue)
) {
  throw new Error("Expected a known queue in the classifier output.");
}
console.log(`Suggested queue: ${output.queue}`);
```

The request allows 30 seconds and 64 KiB of result data.
This example supplies no files and requests no retained artifacts.
`inspect()` reads the target's approval.
`run()` coordinates preparation, submission, and completion.
`result()` reads retained output without running the method again.

Run the application:

```sh
node app.mjs
```

Expected output:

```text
Suggested queue: billing
```

The caller checks execution, cleanup, the method's outcome, and its output before using the suggestion.
Those checks remain useful if the implementation later uses Agent instructions or combines other methods.
Each host supplies its own application interface.
Jig provides this client.
The FLOW SDK serves method handlers.

## Supply another request

Change the input without changing the method:

```sh
node app.mjs '{"message":"My password reset fails."}'
```

The application prints `Suggested queue: technical`.
It can now present that suggestion for review or apply its own routing policy.
The example leaves that consequence with the application.

## Handle invalid input

Try the method's failure path:

```sh
node app.mjs '{"message":12}'
```

The method rejects this input, and the application reports `Execution failed: INVALID_INPUT`.
It receives no queue suggestion to use.
Correct the input before starting another invocation.

Other failures can leave execution or cleanup unresolved.
The client exposes `code`, `operation`, and `uncertain` on `AttemptClientError`.
Inspect the attempt's evidence before deciding what should happen next.

## Keep recovery with the application

This example makes one joined call.
Durable applications must save the prepared request before submission so they can recover its identity after interruption.
Use `client.run(request, { persist })` to await your application's transaction before launch.
The [Jig application contract](https://jig.md/spec/execution-client) explains tickets, cancellation, retained results, and recovery.

Next, [compose methods](../build/compose.md) or [adapt a Skill](../build/skills.md) without changing the caller's result boundary.
