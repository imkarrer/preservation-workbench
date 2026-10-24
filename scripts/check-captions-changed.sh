#!/usr/bin/env bash
# Run the lektor caption lint over only the books a change touches.
#
# scripts/check-captions.py defaults to Book II alone, so running it bare in a
# gate checks nothing relevant to a Book IV bead. Pointing it at every book is
# no good either: Books I and III carry 45 pre-existing flags from decks written
# before the caption rule was settled, which are an editorial matter for the
# maintainer, not something a bead should be blocked on. So: check exactly the
# books this branch changed.
set -euo pipefail
repo="${1:-.}"
base="${2:-upstream/main}"

books=$(git -C "$repo" diff --name-only "$base" -- 'content/elements/books/*' \
        | sed -n 's|^content/elements/books/\(book[IVX]*\)/.*|\1|p' | sort -u)

if [ -z "$books" ]; then
    echo "check-captions: no book content changed against $base — nothing to check"
    exit 0
fi

echo "check-captions: $(echo "$books" | tr '\n' ' ')"
cd "$repo" && exec python3 scripts/check-captions.py $books
