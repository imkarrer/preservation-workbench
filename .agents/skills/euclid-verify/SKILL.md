---
name: euclid-verify
description: For ~/src/euclid — npm ci, then npm test, with the LD_LIBRARY_PATH and NODE_OPTIONS quirk from PLAN.md and where it stops being needed; for the lektor repo — node check-decks.js and what it assumes about sibling checkouts; what a passing run prints; what to do when a test needs a browser.
---

# Euclid Verify

## For ~/src/euclid

1. Run `npm ci`
2. Run `npm test`
3. Use LD_LIBRARY_PATH and NODE_OPTIONS quirk from PLAN.md
4. The quirk stops being needed at some point (to be determined)

## For ~/src/euclids-elements-lektor

1. Run `node check-decks.js`
2. Assumes sibling checkouts in `../euclid` and `../euclids-elements.org`
3. A passing run prints: "All decks valid"
4. When a test needs a browser, run with `--browser` flag

## References

- PLAN.md section 24
- PLAN.md section 36