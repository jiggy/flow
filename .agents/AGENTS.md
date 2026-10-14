# FLOW project guidance

## Purpose

Own FLOW's product compass, doctrine, audience, communication, brand, engineering guidance, and coordination.
Shared doctrine preserves the sibling relationship with Jig. Each repository owns its implementation decisions.

## Local Contracts

Read the compass and relevant doctrine before product decisions.
Keep public contracts in `docs/flow/spec/`. Keep transient reports in `.tmp/`.
Skills describe public interfaces and cannot extend product authority.
Shared tools and presentation have independent copies in Jig and FLOW.
Coordinate shared changes deliberately through their public owners.

## Verification

Check local links and changed technical prose with `bun scripts/check-docs.ts`.

## Child DOX Index

- [doctrine/AGENTS.md](doctrine/AGENTS.md) — Purpose and product boundaries.
- [coordination/AGENTS.md](coordination/AGENTS.md) — FLOW roadmap and deferred work.
