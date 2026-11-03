#!/usr/bin/env bash
set -euo pipefail

QUARTZ_VERSION="v4.5.2"
SITE_DIR="$(cd "$(dirname "$0")" && pwd)"
QUARTZ_DIR="$SITE_DIR/quartz"

if [ ! -d "$QUARTZ_DIR" ]; then
  git clone --quiet --depth 1 --branch "$QUARTZ_VERSION" https://github.com/jackyzha0/quartz.git "$QUARTZ_DIR"
  (cd "$QUARTZ_DIR" && npm ci --no-audit --no-fund)
fi

cp "$SITE_DIR/quartz.config.ts" "$QUARTZ_DIR/quartz.config.ts"
cp -r "$SITE_DIR/overrides/." "$QUARTZ_DIR/"
for name in Labs StudyTools WikiViews; do
  grep -q "as $name " "$QUARTZ_DIR/quartz/components/index.ts" || echo "export { default as $name } from \"./$name\"" >> "$QUARTZ_DIR/quartz/components/index.ts"
done
if [ -n "${SITE_BASE_URL:-}" ]; then
  sed -i "s|baseUrl: \"localhost\"|baseUrl: \"$SITE_BASE_URL\"|" "$QUARTZ_DIR/quartz.config.ts"
fi
rm -rf "$QUARTZ_DIR/content"
cp -r "$SITE_DIR/content" "$QUARTZ_DIR/content"
(cd "$QUARTZ_DIR" && npx quartz build --output "$SITE_DIR/public")
echo "site built at $SITE_DIR/public"
