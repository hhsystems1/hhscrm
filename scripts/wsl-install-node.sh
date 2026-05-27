#!/bin/bash
set -x
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm install 24.5.0
nvm use 24.5.0
corepack enable
node -v
yarn -v
