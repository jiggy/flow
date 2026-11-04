mod flow "packages/flow-sdk/justfile"
mod authoring "packages/flow-authoring/justfile"
mod python "packages/jiggy-flow/justfile"
mod site "site/justfile"

@default:
    just --list --list-submodules

build: flow::build authoring::build

[positional-arguments]
@test *args:
    bun test packages/flow-sdk conformance/run-0 "$@"
    just authoring::test
    just python::test
    PYTHONDONTWRITEBYTECODE=1 python3 -m unittest discover -s conformance/run-0/python-peer -p 'test_*.py' -v

@test-run-0:
    bun test conformance/run-0

@test-tooling:
    node --test scripts/ci/*.test.mjs
    bun test scripts/check-docs.test.ts
    python3 -m unittest discover -s scripts -p test_pypi_release.py -v

@test-release:
    sh scripts/test-release.sh

@preflight: build test-tooling test
    bun scripts/check-docs.ts

[positional-arguments]
@format *paths:
    bun x --no-install biome format --write --files-ignore-unknown=true --no-errors-on-unmatched "$@"
