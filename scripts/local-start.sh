#!/bin/bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

export NVM_DIR="${HOME}/.nvm"
# shellcheck source=/dev/null
. "${NVM_DIR}/nvm.sh"
nvm use 24.5.0

yarn start
