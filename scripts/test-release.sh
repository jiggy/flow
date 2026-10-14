#!/bin/sh
set -eu
: "${FLOW_NODE:?Set FLOW_NODE to the absolute Node executable}"
just build
just test
just flow::test-package
release_tmp=$(mktemp -d "${TMPDIR:-/tmp}/flow-release.XXXXXX")
trap 'rm -rf -- "$release_tmp"' EXIT HUP INT TERM
mkdir -p "$release_tmp/authoring"
bun pm pack --cwd packages/flow-authoring --ignore-scripts --destination "$release_tmp/authoring"
"$FLOW_NODE" scripts/test-authoring-package.mjs "$release_tmp/authoring/"*.tgz
just python::pack "$release_tmp/python"
