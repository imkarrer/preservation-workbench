#!/usr/bin/env bash
# Clone (or fetch) the upstream repos as siblings of this workbench, at the
# relative paths upstream's own scripts expect (../euclid, ../euclids-elements.org).
set -euo pipefail
here=$(cd "$(dirname "$0")/.." && pwd)
parent=$(dirname "$here")

sync() { # sync <dir> <upstream owner/repo> [fork owner/repo]
    local dir="$parent/$1" up="$2" fork="${3:-}"
    if [ -d "$dir/.git" ]; then
        echo "== $1: fetching"; git -C "$dir" fetch --all --prune -q
    elif [ -n "$fork" ]; then
        echo "== $1: cloning fork $fork with upstream $up"
        git clone -q "git@github.com:$fork.git" "$dir"
        git -C "$dir" remote add upstream "git@github.com:$up.git"
        git -C "$dir" fetch -q upstream
    else
        echo "== $1: cloning $up"; git clone -q "git@github.com:$up.git" "$dir"
    fi
}

sync euclid                  brownnrl/euclid                  imkarrer/euclid
sync euclids-elements-lektor brownnrl/euclids-elements-lektor
sync euclids-elements.org    brownnrl/euclids-elements.org
