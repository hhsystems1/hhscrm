#!/bin/bash
set -e
REPO="/mnt/c/Users/BRENDO~1/Downloads/twenty-main"
cd "$REPO"
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24.5.0
corepack enable
corepack prepare yarn@4.13.0 --activate
echo "Yarn version: $(yarn -v)"
yarn
echo "YARN_INSTALL_DONE"
