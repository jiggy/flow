# Releasing FLOW

FLOW owns `@jigging/flow`, `@jigging/flow-authoring`, and `jiggy-flow`.
Jig owns its packages and release records independently.

CI builds immutable archives and qualifies source, protocol, installed artifacts, and the public site.
Protected publishers consume those exact archives from a successful main-push CI run.
They verify hashes and refuse changed bytes for an existing package version.
Never rebuild packages during publication.

Configure npm and PyPI trusted publishers for `jiggy/flow` and their owning workflows and environments.
Retain original monorepo releases in Jig. Filtered historical tags identify extracted source, not new package releases.
Changed package metadata requires a new prerelease identifier.

The first independent authoring release must precede the Jig cutover.
Jig pins that public version and bundles its compiler through ordinary package installation.

GitHub Pages deploys this repository's FLOW site directly.
Enable Actions Pages and preserve the `flow.jig.md` custom domain.
