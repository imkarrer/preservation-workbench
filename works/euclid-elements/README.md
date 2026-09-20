# Euclid's Elements

Upstream: [brownnrl/euclid](https://github.com/brownnrl/euclid) (geomlib) ·
[brownnrl/euclids-elements-lektor](https://github.com/brownnrl/euclids-elements-lektor)
(narrative + decks; the canonical editing repo) ·
[brownnrl/euclids-elements.org](https://github.com/brownnrl/euclids-elements.org)
(gh-pages publish target). Our fork: `imkarrer/euclid`.

Prior art kept for reference: [ibrahimsag/canberead](https://github.com/ibrahimsag/canberead)
(CC-BY-4.0; coordinate-baked figures, Fitzpatrick prose — check the prose
license before reusing anything but layout data) and
[osolmaz/manim-euclid-elements](https://github.com/osolmaz/manim-euclid-elements)
(MIT; Manim video from canberead JSON).

## State

| Date | Event |
|---|---|
| 2026-09-20 | [euclid#183](https://github.com/brownnrl/euclid/pull/183) merged (fixes #155, numeric-looking element names). Intro posted on #155; Nelson replied with roadmap. |

Deck backlog upstream: lektor #21–#31, one per Book III–XIII (417 props).
Book I decks complete; Book II done; Book III under his review.

## Next

1. Reply on #155; offer Book IV decks (16 props) via `process.md` with planning tables for his review.
2. File the XI.11 plane-rotation bug from his comment (points slide along a rotated plane; F/G/H betweenness flips).
3. #70 label size, #156 archival fixtures.
4. Slideshow-presentation feedback issue on the lektor repo after time with Book I–II decks.

## Local quirks

Until the shared flox env exists, `npm test` in `../euclid` on this box needs
`LD_LIBRARY_PATH=<util-linux.lib>/lib` (prebuilt `canvas` wants `libuuid.so.1`)
and `NODE_OPTIONS=--no-experimental-strip-types` (Node 24 otherwise bypasses
`ts-node/register`).

`drafts/` holds text before it is posted upstream, dated.
