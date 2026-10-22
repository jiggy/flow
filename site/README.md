# FLOW public site

This repository owns https://flow.jig.md.
`docs/flow/` owns the content. `site/flow/` owns publication configuration and assets.

The landing page's semantic content lives in `docs/flow/index.md`.
`theme/home.tsx` supplies its tab navigation and reduced-motion-aware hero
transition; `home.css` scopes its presentation to the homepage. Guides keep the
Rspress documentation layout, navigation, search, and appearance controls.
All story tabs remain in the generated homepage Markdown.

Homepage images and product logos are served from `flow/public/home/`.
Their sources and adaptations are recorded in
[`ASSET-NOTICES.md`](flow/public/home/ASSET-NOTICES.md). Self-hosted fonts and
their notices live in `theme/fonts/`; assembly publishes those notices at
`/font-licenses/`. No sibling checkout or hosted prototype is a build input.

```sh
bun install --cwd site --frozen-lockfile --ignore-scripts
scripts/build-site.sh flow .tmp/flow-site
```

Use a fresh output directory. Assembly checks that human pages retain indexed
Markdown resources and that machine resources match their canonical sources.

The repository's Pages workflow builds and deploys the exact pushed revision.
Site theme and fonts have independent copies in the Jig repository.
Changes to shared presentation should be reviewed for both products.
