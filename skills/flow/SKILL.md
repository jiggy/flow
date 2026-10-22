---
name: flow
description: FLOW authoring. Use when creating or changing a Flow package, adapting a Skill into a Flow, or reviewing a Flow.
---

# Create and review Flows

## 1. Establish the method

Read the [agent guide](../../docs/flow/guide/for-agents.md) and
[Package/0](../../docs/flow/spec/package-format.md) before designing or reviewing a package.
For an existing package, inspect its entrypoint, declarations, resources, and dependency calls.
Identify the requested input, expected result, required effects, and failure cases.

When choosing an implementation, check [runtime support](../../docs/flow/guide/runtimes.md) for the intended host.
Confirm support in the chosen host and any SDK the method uses.
Complete this step when the expected result, implementation format, and any unsupported requirements are explicit.

## 2. Read the relevant references

Read each relevant branch before editing or judging its behavior.

| Task | Reference |
| --- | --- |
| Markdown instructions or recipes | [Markdown guide](../../docs/flow/guide/markdown.md) and [Markdown/0](../../docs/flow/spec/markdown-runtime.md) |
| TypeScript or JavaScript implementation | [TypeScript guide](../../docs/flow/guide/typescript.md) |
| Python implementation | [Python guide](../../docs/flow/guide/python.md) |
| Existing Skill adaptation | [Skill compatibility](../../docs/flow/guide/skills.md) |
| Code dependencies, cancellation, or artifact handling | [Run SDK/0](../../docs/flow/spec/run-sdk.md) |
| Input/result validation, custom outcomes, caller ports, or shared interfaces | [Invocation Contract/0](../../docs/flow/spec/invocation-contracts.md) |
| Schema declarations or configurable implementation settings | [Schema/0](../../docs/flow/spec/schema-files.md) |
| Message channels | [Channel Contract/0](../../docs/flow/spec/channel-contracts.md) |

For Skill adaptation, account for every required tool, input, output, and restriction before proceeding.
Complete this step when the selected references cover the implementation and every required declaration.

## 3. Implement or review

For authoring, implement the method and declarations using the selected guides.
For review, compare every entrypoint, declaration, dependency, and claimed capability with its owning specification.
Report each discrepancy with its file, governing requirement, and consequence.
Complete this step when the requested method is implemented or every review finding has supporting evidence.

## 4. Verify the result

Use the target project's checks and the selected guide's execution path.
Exercise representative input and the failure cases affected by the change.
For review, run checks needed to substantiate findings.
Inspect the returned outcome, output, and task evidence.
Complete this step when those checks pass and required constraints hold.
If execution is unavailable, report the missing support and distinguish inspection from execution.
