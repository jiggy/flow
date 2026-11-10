# First-use documentation

## Purpose

Help a reader run a useful method and call it from an application.

## Ownership

- `index.md` routes readers to use, adaptation, authoring, and implementation paths.
- `run.md` owns the first complete supported execution example.
- `application.md` owns consumption through a host's public application interface.

## Local Contracts

- State prerequisites, expected results, one useful modification, and a failure case.
- Keep the example connected across first use and application consumption.
- Label domain choices as illustrative.
- Verify host commands and public exports against an available release.
- Keep host-specific setup distinct from portable FLOW requirements.
- SDK availability alone never establishes host support.

## Verification

Check prose and links with `bun scripts/check-docs.ts`.
Build a fresh site with `scripts/build-site.sh flow .tmp/flow-site`.
State the scope of snippet verification and installed-host evidence separately.

## Child DOX Index

- None.
