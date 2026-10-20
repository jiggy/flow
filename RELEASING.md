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

Bootstrap new npm packages locally with an empty `0.0.0` version under the `bootstrap` tag.
Use an interactive npm login. The placeholder creates the package without replacing the `latest` tag.
Then configure its trusted publisher for `jiggy/flow`, `npm-publish.yml`, environment `npm`, allowing direct publication.
Actions publishes qualified release archives through OIDC without a registry token secret.

GitHub Pages deploys this repository's FLOW site directly.
Enable Actions Pages and preserve the `flow.jig.md` custom domain.
