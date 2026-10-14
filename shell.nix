{
  # This revision supplies the Bun 1.3.3 used for FLOW builds.
  pkgs ? import (builtins.fetchTarball {
    url = "https://github.com/NixOS/nixpkgs/archive/2f5cde3125a022b349324aae7e15a35622723cb8.tar.gz";
  }) { },
}:
let
  python = pkgs.python3.withPackages (p: [ p.build p.setuptools p.wheel ]);
in
assert pkgs.bun.version == "1.3.3";
pkgs.mkShellNoCC {
  packages = [
    pkgs.bun
    pkgs.just
    pkgs.nodejs_24
    python
    pkgs.git
    pkgs.curl
    pkgs.jq
    pkgs.ripgrep
    pkgs.coreutils
  ];

  FLOW_NODE = "${pkgs.nodejs_24}/bin/node";
  FLOW_NPM = "${pkgs.nodejs_24}/bin/npm";
  PYTHON = "${python}/bin/python3";

}
