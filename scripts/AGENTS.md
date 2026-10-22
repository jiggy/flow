# FLOW repository scripts

## Purpose

Own SDK candidate building, Python distribution checks, documentation verification, skill reference synchronization, and site assembly.

## Local Contracts

Use explicit inputs. Build artifacts into fresh destinations. Preserve exact archive bytes, hashes, and nonzero failures.
Build candidates from clean Git source. Never rebuild during publication.

Site assembly publishes FLOW pages, schemas, fonts, and indexed Markdown together.

Skill synchronization consumes `skills/references.json` and preserves reference provenance, links, and license notices.
Update only generated `skills/*/reference/` subtrees after validating every source and skill pointer.
The check mode reports drift without writing files.

## Verification

Run `just test-tooling`, `just test-release`, and a fresh FLOW site build.
Run `just sync-skills` and `just check-skills` for generated documentation references.

## Child DOX Index

- [ci/AGENTS.md](ci/AGENTS.md) — Test inventory and candidate verification.
