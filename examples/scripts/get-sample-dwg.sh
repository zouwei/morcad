#!/usr/bin/env bash
# Download minimal DWG sample files from the LibreDWG test suite.
# Requires internet access. Run from the project root:
#   bash examples/scripts/get-sample-dwg.sh

set -e

DEST="$(dirname "$0")/../sample-files"
BASE="https://raw.githubusercontent.com/LibreDWG/libredwg/master/test/test-data"

FILES=(
  "example_2000.dwg"
  "example_2007.dwg"
)

echo "Downloading DWG sample files from LibreDWG test suite..."
for FILE in "${FILES[@]}"; do
  OUT="$DEST/$FILE"
  if [ -f "$OUT" ]; then
    echo "  $FILE already exists, skipping."
  else
    echo "  Downloading $FILE..."
    curl -sL "$BASE/$FILE" -o "$OUT"
    echo "  Saved to $OUT"
  fi
done

echo ""
echo "Done. DWG sample files are in: $DEST"
echo ""
echo "To test rendering:"
echo "  1. Run: pnpm dev:demo"
echo "  2. Use the file picker to upload one of the downloaded .dwg files"
