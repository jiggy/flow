---
title: Compose methods
description: Call a classifier from another Flow and return a review record through the same method boundary.
---

# Compose methods

Call another Flow when it supplies a useful capability your method can build on.
The caller provides input and consumes the child's outcome and result.
The host selects and authorizes the implementation behind the declared dependency.

This tutorial builds on the [first-run classifier](../start/run.md).
It creates an illustrative `prepare-review` method that combines the request and classification into a review record.
The review flag is this example's application policy.

## Declare the dependency

From the first-run project, scaffold the caller:

```sh
jig new prepare-review
```

Save this as `flows/prepare-review/FLOW.meta.json`:

```json
{
  "name": "prepare-review",
  "description": "Prepare a request and queue suggestion for review.",
  "uses": { "classifier": {} }
}
```

`classifier` is a local dependency name, called a slot.
It describes a capability the caller needs.
The host binds that slot to an implementation before invocation.

## Call the method

Replace `flows/prepare-review/FLOW.ts` with:

```ts
import { handle, OperationError } from "@jigging/flow";

await handle(async (run) => {
  const classification = await run.call({
    operationId: "classify:1",
    slot: "classifier",
    input: run.input,
  });
  if (classification.outcome !== "done") {
    throw new OperationError("INVALID_RESULT", "Expected a completed classification.");
  }
  return {
    outcome: "done",
    output: {
      request: run.input,
      classification: classification.output,
      reviewRequired: true,
    },
  };
});
```

The SDK returns the complete child result, including `outcome` and `output`.
This caller accepts the original classifier's `done` outcome and returns a larger review record.
[Handle additional domain outcomes](./outcomes.md) when the selected classifier declares them.

`operationId` identifies this operation within the invocation.
Await the call before returning so the caller accounts for the work it started.
[Run/0](../spec/run-protocol.md#6-operation-identity) defines exact identity and replay rules.

## Bind and run on Jig

Create `bindings/prepare-review.ts`:

```ts
import { defineBinding } from "@jigging/jig";

export default defineBinding({
  package: "./flows/prepare-review",
  slots: { classifier: "flow:flows/classify-request" },
});
```

This Binding is Jig's configuration, separate from the portable Flow package.
Another host supplies its own way to select the dependency.

Review the change, approve the intended source and grants, then run the Binding:

```sh
jig review --allow-resolution-network
jig run binding:prepare-review --input '{"message":"I was charged twice."}' --json
```

The method result is:

```json
{
  "outcome": "done",
  "output": {
    "request": { "message": "I was charged twice." },
    "classification": { "queue": "billing" },
    "reviewRequired": true
  }
}
```

Supply `{"message":12}` to exercise the classifier's invalid-input path.
The invocation fails instead of preparing a successful review record.

## Change the implementation

After [adapting a Skill](./skills.md), point the Binding's `classifier` slot to its Markdown package.
That host must also provide the Markdown interpreter's Agent dependency.
Keep the calling code unchanged and compare the suggestions against representative messages.

A common interface permits composition while implementations retain different costs, powers, and judgment.
Use [design guidance](./design.md) to decide which capabilities deserve their own boundaries.
