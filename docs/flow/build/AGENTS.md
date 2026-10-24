# Building with Flows

## Purpose

Help authors turn useful procedures into callable methods and compose them into applications.

## Ownership

- `index.md` routes authoring and application tasks.
- `skills.md` owns practical Skill adaptation.
- `markdown.md`, `typescript.md`, and `python.md` own format-specific authoring.
- `compose.md`, `outcomes.md`, `validation.md`, and `messages.md` own shared tasks.
- `design.md` owns naming, meaningful decomposition, composition, portability, and local reasoning.

## Local Contracts

- Lead with the task, its input, and its useful result.
- State execution prerequisites and use actual public host interfaces.
- Keep SDK exercises separate from installed-host qualification.
- Link exhaustive syntax and support tables to `../reference/`.
- Keep exact requirements owned by `../spec/`.
- Label examples and their domain assumptions explicitly.
- Preserve naming and decomposition principles without turning examples into universal rules.

## Verification

Check prose and links with `bun scripts/check-docs.ts`.
Build a fresh site with `scripts/build-site.sh flow .tmp/flow-site`.
Check runnable snippets against the declared SDK or supporting host.
Record the scope of evidence accurately.

## Child DOX Index

- None.
