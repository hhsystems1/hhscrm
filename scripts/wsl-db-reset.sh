#!/bin/bash
set -e
REPO="/mnt/c/Users/BRENDO~1/Downloads/twenty-main"
cd "$REPO"
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24.5.0
corepack enable >/dev/null 2>&1 || true
corepack prepare yarn@4.13.0 --activate >/dev/null 2>&1 || true
yarn nx database:reset twenty-server
echo "DB_RESET_DONE"
