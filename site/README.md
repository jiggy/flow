# FLOW public site

This repository owns https://flow.jig.md.
`docs/flow/` owns the content. `site/flow/` owns publication configuration and assets.

Read [DESIGN.md](../DESIGN.md) for the website's visual language and presentation guidance.
It covers the homepage and documentation surfaces, components, typography, colour, motion, and accessibility.

The landing page's semantic content lives in `docs/flow/index.md`.
`theme/home.tsx` supplies its tab navigation and reduced-motion-aware hero
transition; `home.css` scopes its presentation to the homepage. Guides keep the
Rspress documentation layout, navigation, search, and appearance controls.
All story tabs remain in the generated homepage Markdown.

Documentation starts at `/start/` and follows five areas with focused sidebars:
first use, building, understanding, implementation, and reference.
The same navigation orders `llms.txt`. Every public page remains in the Markdown bundle.
Normative specifications keep their `/spec/` routes and exact machine resources.
`/for-agents` provides Markdown and authoring-skill access.

## Share previews and banners

The website's default social image is `/social/flow-social.png` at 1200 × 630 pixels.
The repository README uses `flow/public/social/flow-readme.png` at 1600 × 600 pixels.
Self-contained SVG versions sit beside both PNG exports.

`flow/social.ts` owns the image URL, dimensions, media type, and alternative text.
`theme/social-head.ts` adds Open Graph and Twitter image defaults plus each page's absolute public URL.
Native Rspress retains page titles and descriptions. Frontmatter `head` tags can override individual defaults.

Regenerate the artwork with [uv](https://docs.astral.sh/uv/) installed:

```sh
just site::social-assets
```

The exporter uses pinned inline Python dependencies, bundled fonts, the official FLOW lockup, and the existing homepage cloudscape.
Review both sizes and commit the SVG and PNG exports together.
Normal site builds copy these files without requiring Python or uv.

## Build and asset provenance

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
