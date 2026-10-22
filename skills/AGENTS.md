# Installable FLOW skills

## Purpose

Enable capability compounding through skills that help agents author and review FLOW packages.

## Ownership

- `flow/SKILL.md` owns the public FLOW authoring and review workflow.
- `references.json` selects canonical references for each skill.
- [Canonical documentation](../docs/flow/) owns FLOW guidance, examples, and exact requirements.
- [Repository skills](../.agents/skills/) serve local repository work.
- [Build tooling](../scripts/AGENTS.md) owns reference synchronization and verification.
- [CI](../.github/AGENTS.md) keeps committed skill references synchronized with their canonical sources.

## Local Contracts

- Keep one model-invoked `flow` skill for authoring, adaptation, and review.
- Add another skill when its independent invocation justifies another always-loaded description.
- Keep reusable FLOW rules, examples, and syntax in canonical documentation.
- Use package-local `reference/` links from `SKILL.md`.
- Keep required resources inside the installable skill directory.
- Commit generated references and their required license files with each skill.
- Generate references from the checked-out canonical sources.
- Edit canonical sources to change generated content.
- Keep each skill complete and directly installable from the repository.
- Preserve source licenses, notices, and attribution in the installed skill.

## Work Guidance

- Write ordered steps with observable completion criteria.
- Give each reference pointer a concrete task condition.
- Update the reference map when adding documentation pointers.
- Use model-facing descriptions for autonomous discovery.
- Set `disable-model-invocation: true` only for exclusively manual skills.
- Keep skill instructions independent of any particular host's policy.

## Verification

- Run `bun scripts/check-docs.ts` for documentation links and technical prose.
- Run `just sync-skills` after changing canonical sources or the reference map.
- Run `just check-skills` to detect missing or stale references.
- Check the installed skill without the repository's documentation tree.

## Child DOX Index

- None.
