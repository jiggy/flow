# Contributing to FLOW

Contributions use the destination license in [LICENSES.md](LICENSES.md).
Sign off each commit with the Developer Certificate of Origin 1.1 below.
Specification contributions also accept the Community Specification License 1.0 and its patent terms.
Jig's contributor agreement governs Jig separately.

## Development

Install Bun 1.3.3, Node 22 or newer, Just 1.43.1, and Python 3.11 or newer.
The pinned Nix shell supplies the development runtimes.

```sh
bun install --ignore-scripts
bun install --cwd conformance/run-0 --frozen-lockfile --ignore-scripts
python3 -m pip install build==1.3.0 twine==6.2.0 mypy==1.18.2
just build
just test
just test-tooling
just test-release
scripts/build-site.sh flow .tmp/flow-site
```

No Jig checkout is required. [RELEASING.md](RELEASING.md) owns publication.

## Developer Certificate of Origin 1.1

Copyright (C) 2004, 2006 The Linux Foundation and its contributors.

Everyone is permitted to copy and distribute verbatim copies of this license
document, but changing it is not allowed.

Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I have the
    right to submit it under the open source license indicated in the file; or

(b) The contribution is based upon previous work that, to the best of my
    knowledge, is covered under an appropriate open source license and I have
    the right under that license to submit that work with modifications,
    whether created in whole or in part by me, under the same open source
    license (unless I am permitted to submit under a different license), as
    indicated in the file; or

(c) The contribution was provided directly to me by some other person who
    certified (a), (b) or (c) and I have not modified it.

(d) I understand and agree that this project and the contribution are public
    and that a record of the contribution (including all personal information
    I submit with it, including my sign-off) is maintained indefinitely and
    may be redistributed consistent with this project or the open source
    license(s) involved.
