# Releasing FLOW

FLOW owns `@jigging/flow`, `@jigging/flow-authoring`, and `jiggy-flow`.
Jig owns its packages and release records independently.

CI builds immutable archives and qualifies source, protocol, installed artifacts, and the public site.
Protected publishers consume those exact archives from a successful main-push CI run.
They verify hashes and refuse changed bytes for an existing package version.
Never rebuild packages during publication.

Configure npm and PyPI trusted publishers for `jiggy/flow` and their owning workflows and environments.
The environments are `npm` and `pypi`.
Retain original monorepo releases in Jig. Filtered historical tags identify extracted source, not new package releases.
Changed package metadata requires a new prerelease identifier.

The first independent authoring release must precede the Jig cutover.
Jig pins that public version and bundles its compiler through ordinary package installation.

Bootstrap new npm packages through the same GitHub Actions publisher.
Store a short-lived granular token as `NPM_TOKEN` in the `npm` environment for the first publication.
It needs publish access to the package's scope and bypass 2FA enabled for noninteractive publishing.
The publish step consumes exact qualified CI archives with provenance and performs no rebuild.

Then configure the package's trusted publisher for `jiggy/flow`, `npm-publish.yml`, environment `npm`, allowing direct publication.
Remove the bootstrap secret and revoke the token after setup. Later releases use OIDC.

GitHub Pages deploys this repository's FLOW site directly.
Enable Actions Pages and preserve the `flow.jig.md` custom domain.
