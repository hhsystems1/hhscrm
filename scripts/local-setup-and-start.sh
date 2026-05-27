#!/bin/bash
set -eo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

export NVM_DIR="${HOME}/.nvm"
if [ ! -s "${NVM_DIR}/nvm.sh" ]; then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
fi
# shellcheck source=/dev/null
. "${NVM_DIR}/nvm.sh"

nvm install 24.5.0
nvm use 24.5.0
corepack enable

echo "Node: $(node -v)"
echo "Yarn: $(yarn -v)"

COMPOSE_FILE="${REPO_ROOT}/packages/twenty-docker/docker-compose.dev.yml"
docker compose -f "$COMPOSE_FILE" up -d

sleep 5

docker compose -f "$COMPOSE_FILE" exec -T db psql -U postgres -d postgres -c 'CREATE DATABASE "default";' 2>/dev/null || true
docker compose -f "$COMPOSE_FILE" exec -T db psql -U postgres -d postgres -c 'CREATE DATABASE test;' 2>/dev/null || true

if [ ! -f packages/twenty-front/.env ]; then
  cp packages/twenty-front/.env.example packages/twenty-front/.env
fi
if [ ! -f packages/twenty-server/.env ]; then
  cp packages/twenty-server/.env.example packages/twenty-server/.env
fi

echo "Installing dependencies (this may take several minutes)..."
yarn

echo "Resetting database (this may take several minutes)..."
npx nx database:reset twenty-serve

echo "SETUP_COMPLETE"
