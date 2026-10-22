# FLOW repository scripts

## Purpose

Own SDK candidate building, Python distribution checks, documentation verification, skill reference synchronization, and site assembly.

## Local Contracts

Use explicit inputs. Build artifacts into fresh destinations. Preserve exact archive bytes, hashes, and nonzero failures.
Build candidates from clean Git source. Never rebuild during publication.

Site assembly publishes FLOW pages, schemas, fonts, and indexed Markdown together.
`generate-social-assets.py` exports branded SVG and PNG banners from repository assets using pinned inline dependencies.
Keep its exports deterministic and committed. Site builds consume them without running the optional exporter.

Skill synchronization consumes `skills/references.json` and preserves reference provenance, links, and license notices.
Update only generated `skills/*/reference/` subtrees after validating every source and skill pointer.
The check mode reports drift without writing files.

## Verification

Run `just test-tooling`, `just test-release`, and a fresh FLOW site build.
Run `just sync-skills` and `just check-skills` for generated documentation references.
For social artwork changes, run `just site::social-assets`, inspect both sizes, and verify matching exports in a fresh site build.

## Child DOX Index

- [ci/AGENTS.md](ci/AGENTS.md) — Test inventory and candidate verification.
