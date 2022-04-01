#!/bin/sh

set -e

echo "Building app"

docker-compose run node sh -c "yarn --pure-lockfile && yarn export"
docker-compose run aws s3 sync /app/out/ s3://website.nwo.ai --cache-control="max-age=3600" --delete
docker-compose run aws cloudfront create-invalidation --distribution-id E1TVAAAWVOCKUU --paths "/*"
