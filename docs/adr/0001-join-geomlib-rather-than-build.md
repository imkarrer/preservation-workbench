---
status: accepted
date: 2026-09-20
---
# Join brownnrl/euclid rather than build or fork an engine

We want a modern interactive Euclid's *Elements*. Research (2026-09-19) found
that Nelson Brown had already shipped a faithful TypeScript port of Joyce's
Geometry Applet (geomlib) with all 465 propositions rendering, a slideshow
layer, 469 unit + 705 snapshot tests, and Joyce's explicit permission — four
months old, zero stars, single author. We contribute to that project via fork
+ PR instead of building on JSXGraph or Manim, and we do not start our own
application repo until several upstream PRs have landed.

## Considered options

- **Manim** — offline video renderer, no browser runtime or input model;
  rejected as the engine, kept as a future export target.
- **JSXGraph** — mature, LGPL, SVG; would mean re-encoding every proposition
  by hand. Remains the fallback if the collaboration stalls.
- **Fork geomlib** — MIT permits it, but forks a corpus we would then have to
  keep in sync with a maintainer moving faster than us. Only if upstream goes
  dark.

## Consequences

Our pace is bounded by one maintainer's review bandwidth, so work is sequenced
one PR at a time with design issues before anything larger than a bug. Joyce's
narrative permission is not transitive; any work of ours that carries his
commentary needs its own permission from him.
