# FLOW automation

## Purpose

Own independent source checks, artifact qualification, package publication, and FLOW Pages deployment.

## Local Contracts

Pin actions by full commit. Build jobs hold no publication authority.
Publication consumes exact qualified archives from one successful main-push CI run and attempt.
Refuse failed, skipped, stale, expired, or mismatched qualification. Never rebuild during publication.

Use protected environments and registry trusted publishing.
The existing publication environments are `npm` and `pypi`.
Pages uses `github-pages`. Keep workflow environment names aligned with registry trust configuration.
Jig host qualification belongs to the Jig repository.

First npm publication can use the `npm` environment's short-lived `NPM_TOKEN` secret through the existing qualified-artifact publisher.
Expose it only to the publish step. All publication, including bootstrap, occurs in GitHub Actions.
After package creation, configure its trusted publisher and remove the bootstrap secret.

Documentation checks compare PRs with their base and pushes with their previous commit.
For first pushes and manual runs, use the checked revision's parent instead of a missing or all-zero baseline.

## Verification

Run `just test-tooling`, `just test`, and the installed release gate.
Review workflow permissions and exact archive lineage after automation changes.

## Child DOX Index

None.
