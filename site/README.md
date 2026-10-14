# FLOW public site

This repository owns https://flow.jig.md.
`docs/flow/` owns the content. `site/flow/` owns publication configuration and assets.

```sh
bun install --cwd site --frozen-lockfile --ignore-scripts
scripts/build-site.sh flow .tmp/flow-site
```

The repository's Pages workflow builds and deploys the exact pushed revision.
Site theme and fonts have independent copies in the Jig repository.
Changes to shared presentation should be reviewed for both products.
