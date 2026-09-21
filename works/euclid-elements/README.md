# Euclid's Elements

Upstream: [brownnrl/euclid](https://github.com/brownnrl/euclid) (geomlib) ·
[brownnrl/euclids-elements-lektor](https://github.com/brownnrl/euclids-elements-lektor)
(narrative + decks; the canonical editing repo) ·
[brownnrl/euclids-elements.org](https://github.com/brownnrl/euclids-elements.org)
(gh-pages publish target). Our fork: `imkarrer/euclid`.

Prior art kept for reference: [ibrahimsag/canberead](https://github.com/ibrahimsag/canberead) (now `ibrahimsag/read`)
(code CC-BY-4.0; coordinate-baked figures; the prose is Fitzpatrick's 2007 translation, which carries **no licence** — silence means all rights reserved, so use canberead for layout data only, never its prose) and

[osolmaz/manim-euclid-elements](https://github.com/osolmaz/manim-euclid-elements)
(MIT; Manim video from canberead JSON).

## State

| Date | Event |
|---|---|
| 2026-09-20 | [euclid#183](https://github.com/brownnrl/euclid/pull/183) merged (fixes #155, numeric-looking element names). Intro posted on #155; Nelson replied with roadmap. |
| 2026-09-21 | Reply posted on [#155](https://github.com/brownnrl/euclid/issues/155#issuecomment-5754106719): offered XI.11 issue, slideshow feedback, Book IV decks as plain-data pilot; linked ADRs. Awaiting reply. |
| 2026-09-21 | Docs PRs [#185](https://github.com/brownnrl/euclid/pull/185) (string animation names) and [#186](https://github.com/brownnrl/euclid/pull/186) (api/architecture accuracy) opened. Book IV planning tables drafted (`book-iv/`). Slideshow feedback drafted (`drafts/`), awaiting a hands-on pass before posting. |

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

## Text rights (verified 2026-09-20)

- Heath 1908 and 1926 *Elements*: public domain in the US; usable verbatim
  including Heath's commentary. Scans on IA / HathiTrust; Perseus has a TEI of
  the text with **empty** figure elements.
- Joyce's edition: all rights reserved; Brown's May 2026 permission is
  "specific; not transitive". Our work inside Brown's repos is covered.
  Anything of our own carrying Joyce's prose needs Joyce's permission to us.
- Green Lion Press 2002: new typesetting, redrawn diagrams, corrections —
  not usable for anything.
