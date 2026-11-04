# FLOW automation

## Purpose

Own independent source checks, skill update notifications, artifact qualification, package publication, and FLOW Pages deployment.

## Local Contracts

Pin actions by full commit. Build jobs hold no publication authority.
Publication consumes exact qualified archives from one successful main-push CI run and attempt.
Refuse failed, skipped, stale, expired, or mismatched qualification. Never rebuild during publication.

Use protected environments and registry trusted publishing.
The existing publication environments are `npm` and `pypi`.
Pages uses `github-pages`. Keep workflow environment names aligned with registry trust configuration.
Jig host qualification belongs to the Jig repository.

Keep installed macOS checks on supported explicit runner labels.
Update release qualification names whenever CI matrix labels change.

Publish npm packages through OIDC without a registry token secret.
Bootstrap a new package locally with an empty `0.0.0` version under the `bootstrap` tag.
Configure its trusted publisher before publishing qualified release archives through Actions.

Documentation checks compare PRs with their base and pushes with their previous commit.
For first pushes and manual runs, use the checked revision's parent instead of a missing or all-zero baseline.

`jiggy/skills` owns installable skills, reference generation, and drift checks.
`notify-skills.yml` calls its pinned reusable workflow after canonical documentation or license changes reach `main`.
The notification workflow has no repository token permissions and never checks out source code.
It sends a `source-updated` event through the reusable workflow.

For immediate updates, configure the optional `SKILLS_DISPATCH_TOKEN` Actions secret here.
Use a fine-grained token restricted to `jiggy/skills` with Contents: write permission.
The reusable workflow receives it as `dispatch-token` and uses it only for the notification.
A missing secret produces a warning. Hourly reconciliation in `jiggy/skills` recovers missed notifications.
Run the notification workflow manually when retrying a failed delivery.

## Verification

Run `just test-tooling`, `just test`, and the installed release gate.
Review workflow permissions and exact archive lineage after automation changes.

## Child DOX Index

None.
