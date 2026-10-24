---
title: Run your first Flow
description: Run a supplied request classifier, inspect its result, and change one rule.
---

# Run your first Flow

Run a method that reads a customer request and suggests a support queue.
You will supply input, inspect the result, and change one rule.
The classifier is an illustrative example, not a recommended support policy.

For this input:

```json
{"message":"I was charged twice."}
```

the method returns:

```json
{"outcome":"done","output":{"queue":"billing"}}
```

## What you need

This tutorial uses [Jig](https://jig.md/), one host that implements FLOW.
Use a [qualified Jig host](https://jig.md/guide/#supported-host) and an npm installation.
Jig currently qualifies selected Linux x86_64 and native Mac environments.
Its installation includes the Bun runtime needed by this TypeScript example.
The method needs no Agent, account, or model API key.

Other hosts supply their own installation and invocation interface.
The [support reference](../reference/support.md) separates a host's supported runtimes from SDK availability.

## Prepare the example

Install the published developer alpha:

```sh
npm install --global @jigging/jig@alpha
```

Create a project and a package for the supplied classifier:

```sh
jig init support-demo
cd support-demo
jig new classify-request
```

Jig writes the project configuration and editable Flow packages.
Keep `flows/classify-request/package.json`.
It names the exact FLOW SDK revision qualified by that Jig build.
Initialization and scaffolding prepare source files without approving or running them.

Give the package a readable purpose in `flows/classify-request/FLOW.meta.json`:

```json title="flows/classify-request/FLOW.meta.json"
{"name":"classify-request","description":"Suggest a support queue from supplied request text."}
```

Replace `flows/classify-request/FLOW.ts` with this implementation:

```ts title="flows/classify-request/FLOW.ts"
import { handle, OperationError } from "@jigging/flow";

await handle(async (run) => {
  const input = run.input;
  if (
    input === null ||
    typeof input !== "object" ||
    Array.isArray(input) ||
    typeof input.message !== "string"
  ) {
    throw new OperationError(
      "INVALID_INPUT",
      "Expected an object with a message string.",
    );
  }

  const message = input.message.toLowerCase();
  const queue = /charged|invoice|payment/.test(message)
    ? "billing"
    : /password|login|error/.test(message)
      ? "technical"
      : "manual";

  return { outcome: "done", output: { queue } };
});
```

The handler checks its input, applies the example rules, and returns an outcome with data.
Jig supplies the invocation and runs the method in its supported execution environment.

## Review and run

Review the project:

```sh
jig review --allow-resolution-network
```

Inspect the source, dependencies, and displayed policy before approving the revision.
Enter `y` when the proposal matches the work you intend to allow.
The network flag permits dependency resolution before approval.
Runs keep their separate network permissions.

Run the approved method:

```sh
jig run flow:flows/classify-request --input '{"message":"I was charged twice."}' --json
```

The response includes:

```json
{"status":"succeeded","outcome":"done","output":{"queue":"billing"}}
```

Jig also reports diagnostics.
`status` describes execution, `outcome` describes the method's result, and `output` contains its data.
The application decides whether to use the suggested queue.
Successful execution alone establishes neither correct classification nor permission to assign the request.

## Change one rule

Run the same method with a refund request:

```sh
jig run flow:flows/classify-request --input '{"message":"Please refund my order."}' --json
```

The current rules suggest `manual`.
Add `refund` to the billing expression:

```ts
const queue = /charged|invoice|payment|refund/.test(message)
```

Keep the rest of the conditional expression unchanged.
Review the source change and run the refund input again:

```sh
jig review --allow-resolution-network
jig run flow:flows/classify-request --input '{"message":"Please refund my order."}' --json
```

Approve the intended change during review.
The output now contains `{"queue":"billing"}`.
Representative messages will show whether this rule helps your application.

## Check a failure

Supply a number where the method expects a message string:

```sh
jig run flow:flows/classify-request --input '{"message":12}' --json
```

The method raises `INVALID_INPUT`, and Jig reports failed execution instead of a suggested queue.
Correct the input before starting another invocation.
The [outcomes guide](../build/outcomes.md) explains domain outcomes and operational failures.

Next, [call it from an application](./application.md), or [bring a Skill](../build/skills.md) behind the same boundary.
