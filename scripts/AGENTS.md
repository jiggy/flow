# FLOW repository scripts

## Purpose

Own SDK candidate building, Python distribution checks, documentation verification, and site assembly.

## Local Contracts

Use explicit inputs. Build artifacts into fresh destinations. Preserve exact archive bytes, hashes, and nonzero failures.
Build candidates from clean Git source. Never rebuild during publication.

Site assembly publishes FLOW pages, schemas, fonts, and indexed Markdown together.
`generate-social-assets.py` exports branded SVG and PNG banners from repository assets using pinned inline dependencies.
Keep its exports deterministic and committed. Site builds consume them without running the optional exporter.

## Verification

Run `just test-tooling`, `just test-release`, and a fresh FLOW site build.
For social artwork changes, run `just site::social-assets`, inspect both sizes, and verify matching exports in a fresh site build.

## Child DOX Index

- [ci/AGENTS.md](ci/AGENTS.md) — Test inventory and candidate verification.
