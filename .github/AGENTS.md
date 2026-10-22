# FLOW automation

## Purpose

Own independent source checks, skill reference synchronization, artifact qualification, package publication, and FLOW Pages deployment.

## Local Contracts

Pin actions by full commit. Build jobs hold no publication authority.
Publication consumes exact qualified archives from one successful main-push CI run and attempt.
Refuse failed, skipped, stale, expired, or mismatched qualification. Never rebuild during publication.

Use protected environments and registry trusted publishing.
The existing publication environments are `npm` and `pypi`.
Pages uses `github-pages`. Keep workflow environment names aligned with registry trust configuration.
Jig host qualification belongs to the Jig repository.

Publish npm packages through OIDC without a registry token secret.
Bootstrap a new package locally with an empty `0.0.0` version under the `bootstrap` tag.
Configure its trusted publisher before publishing qualified release archives through Actions.

Documentation checks compare PRs with their base and pushes with their previous commit.
For first pushes and manual runs, use the checked revision's parent instead of a missing or all-zero baseline.

Quick checks verify committed skill references against canonical sources with read-only permissions.
The skill sync workflow updates same-repository pull request branches with generated references and a signed-off commit.
Only that job receives contents and actions write permissions. It stages only `skills/*/reference/**` and uses a normal push.

After pushing, dispatch CI explicitly because token-created pushes do not start new push workflows.
Pass the original pull request base to preserve documentation checks across generated commits.
Keep default-branch and fork checks read-only. Fork contributors run `just sync-skills` before pushing.

## Verification

Run `just test-tooling`, `just test`, and the installed release gate.
Review workflow permissions and exact archive lineage after automation changes.

## Child DOX Index

None.
