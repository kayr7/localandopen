#!/bin/sh

set -euo pipefail

# source a .env file if it exists
if [ -r .env ]; then
	. .env
fi

POSTGRES_URL=${POSTGRES_URL:?"Set POSTGRES_URL environment variable."}
ls sql/*.sql | sort -n | xargs cat | psql ${POSTGRES_URL}
