# FLOW public site

## Purpose

Own this repository's Rspress configuration, assets, assembly, and direct GitHub Pages deployment.

## Ownership

- `../DESIGN.md` owns website presentation principles and the visual system.
- `../docs/flow/` owns public prose, specifications, and source diagrams.
- `flow/` owns product navigation, public roots, origins, and assets.
- `flow/social.ts` owns default share-image data. `flow/public/social/` holds committed banner sources and PNG exports.
- `theme/`, `landing.css`, and `home.css` own independently copied presentation.
- `package.json` and `bun.lock` pin site dependencies.
- `../scripts/build-site.sh` owns fresh assembly, schema inventory, and Markdown publication checks.

## Local Contracts

Never maintain copied prose or normative machine schemas here.
Exclude AGENTS.md work contracts from public routes.
Preserve human pages, exact machine resources, indexed Markdown, font notices, and complete local anchors.
Keep shared presentation changes coherent with the sibling product through deliberate review.
A neighboring checkout is never a build input.

Social defaults preserve native page titles, descriptions, and explicit frontmatter overrides.
Image generation is an optional authoring task. Normal builds copy committed exports without invoking the generator.

## Verification

Run `scripts/build-site.sh flow .tmp/flow-site` with a fresh destination.
Use `scripts/check-site.sh` for a deployed endpoint.
For share changes, inspect exported images and built HTML metadata, including absolute URLs and page-specific overrides.

## Child DOX Index

- [theme/AGENTS.md](theme/AGENTS.md) — Site presentation and accessibility.
