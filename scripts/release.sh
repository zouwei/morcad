#!/usr/bin/env bash
# Usage: ./scripts/release.sh <version>
# Example: ./scripts/release.sh 0.2.0
#
# This script:
#   1. Updates version in all relevant files
#   2. Builds core + moraya bundle
#   3. Commits, pushes, creates and pushes the tag

set -euo pipefail

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "Usage: $0 <version>  (e.g. 0.2.0)"
  exit 1
fi

TAG="v${VERSION}"
CDN_URL="https://cdn.jsdelivr.net/gh/zouwei/morcad@${TAG}/packages/moraya/dist/index.bundle.js"

echo "==> Bumping to ${TAG}"

# ── packages/core/package.json ──────────────────────────────────────────────
sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"${VERSION}\"/" \
  packages/core/package.json

# ── packages/moraya/package.json ────────────────────────────────────────────
sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"${VERSION}\"/" \
  packages/moraya/package.json

# ── plugin.json ─────────────────────────────────────────────────────────────
sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"${VERSION}\"/" \
  plugin.json
sed -i '' "s|\"cdnUrl\": \"[^\"]*\"|\"cdnUrl\": \"${CDN_URL}\"|" \
  plugin.json

# ── packages/moraya/src/index.ts  (cdnUrl field) ────────────────────────────
sed -i '' "s|cdnUrl: 'https://cdn.jsdelivr.net/[^']*'|cdnUrl: '${CDN_URL}'|" \
  packages/moraya/src/index.ts

echo "==> Building..."
pnpm build:core
pnpm build:moraya:bundle

echo "==> Staging and committing..."
git add \
  packages/core/package.json \
  packages/moraya/package.json \
  packages/moraya/src/index.ts \
  plugin.json \
  packages/moraya/dist/

git commit -m "chore: release ${TAG}"

echo "==> Pushing main..."
git pull --rebase origin main
git push origin main

echo "==> Tagging ${TAG}..."
git tag "${TAG}"
git push origin "${TAG}"

echo ""
echo "Done! Released ${TAG}"
echo "CDN URL: ${CDN_URL}"
