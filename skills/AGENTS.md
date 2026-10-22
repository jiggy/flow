# Distributable FLOW skills

## Purpose

Enable capability compounding through skills that help agents author and review FLOW packages.

## Ownership

- `flow/SKILL.md` owns the public FLOW authoring and review workflow.
- `references.json` selects canonical references for each skill bundle.
- [Canonical documentation](../docs/flow/) owns FLOW guidance, examples, and exact requirements.
- [Repository skills](../.agents/skills/) serve local repository work.
- [Build tooling](../scripts/AGENTS.md) owns reference generation and bundle verification.
- [CI](../.github/AGENTS.md) owns publication of complete skill bundles.

## Local Contracts

- Keep one model-invoked `flow` skill for authoring, adaptation, and review.
- Add another skill when its independent invocation justifies another always-loaded description.
- Keep reusable FLOW rules, examples, and syntax in canonical documentation.
- Link source skills directly to canonical relative documentation paths.
- Generate bundled references from the same revision as their skill.
- Publish complete bundles containing rewritten local pointers and generated references.
- Keep generated reference copies out of source control.
- Install portable skills from complete bundles. Source skill folders require the repository's documentation tree.
- Preserve source licenses, notices, and attribution in each bundle.

## Work Guidance

- Write ordered steps with observable completion criteria.
- Give each reference pointer a concrete task condition.
- Update the reference map when adding documentation pointers.
- Use model-facing descriptions for autonomous discovery.
- Set `disable-model-invocation: true` only for exclusively manual skills.
- Keep skill instructions independent of any particular host's policy.

## Verification

- Run `bun scripts/check-docs.ts` for documentation links and technical prose.
- Build into a fresh directory with `just build-skills OUTPUT`.
- Run `node --test scripts/ci/build-skills.test.mjs` after changing reference generation or bundle contents.
- Check the extracted skill without the source repository's documentation tree.

## Child DOX Index

- None.
