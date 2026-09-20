---
status: proposed
date: 2026-09-20
revised: 2026-09-20 (after research; see docs/research/)
---
# Author new decks as data; do not build a lower-level geometry library

Upstream considers the site's architecture finished: the lektor roadmap was
closed on 2026-08-30 as "a roadmap that has been travelled — remaining work is
per-book deck authoring, not architecture", and 403 of 465 propositions still
need a deck. We therefore do not propose an architecture change. We propose an
**authoring discipline for the 403 decks that remain**: each new deck is
written as a JSON-parseable literal — string animation names, no `.concat()`
composition, no functions inside `slides[]` — and checked against a schema
before the existing execute-in-a-sandbox step. Book IV (16 propositions) is
the pilot; the schema is derived from what those decks need, not designed up
front.

The renderer-independent document that this discipline produces is what
later makes static SVG, Manim and GeoGebra exporters, other works, and any
modern front-end into consumers rather than projects. But those are
consequences, not the pitch.

## Why this is the wedge, in upstream's own terms

- Upstream's M4 bullet planned to "promote the markdown body into structured
  fields (statement / diagrams / proof / guide)". Three of the four shipped
  (`statement`, `proof`, `guide` on the `prop_section` flow block). **Diagrams
  did not**: the `geomlib.init({...})` script still sits inside the `proof`
  markdown field. We are finishing the fourth word.
- The cost of the current form is documented, not asserted: the geomlib 0.16
  bump produced 70 diagnostics on 21 pages nobody had touched, making the bump
  "unpublishable until rewritten". Every deck is lockstepped to a single
  library pin in `templates/layout.html`.
- The pieces already exist upstream. geomlib's animation registry accepts
  string names today (undocumented). Upstream's own reference-page generator
  stores decks as tuples with string animation names and `json.dumps` them
  into the page. The subject index already went HTML → JSON → template → a
  publish-gating checker (lektor#3). Nothing here is a new idea to upstream.

## Considered options

- **New low-level geometry library shared across works** — duplicates working
  code; the sharing problem is in the authored data, not the kernel. JSXGraph,
  euclid.js and geomlib all exist. Rejected.
- **Propose a deck format and migrate the 62 existing decks** — reopens
  architecture upstream has closed, and puts a migration ahead of the 403
  decks that are the actual backlog. Rejected as the opener; may follow once
  the discipline has proven itself on new decks.
- **Split geomlib into kernel + renderers first** — the right long-term move
  (elements draw themselves with a canvas context; the dependency graph is
  implicit in insertion order), but a large refactor of someone else's repo.
  Sequenced after the deck document exists and only as a co-maintainer.

## What upstream would need to accept, smallest first

1. A documentation PR on geomlib: string animation names are supported.
2. Book IV decks authored in the disciplined form, planning tables reviewed by
   upstream first, per `process.md`.
3. A schema (JSON Schema) and a check in `check-decks.js` that runs before the
   vm step — additive; legacy decks skip it.
4. Later: geomlib exports a DOM-free validator (today `init()` requires
   `document`, `Slate` is not exported, and construction failures throw on
   the first bad element instead of reporting per element).

## Consequences

The document must stay hand-editable in a text editor or upstream will not
use it. `resolveJustification` is a function and stays outside the document,
supplied at `init()`. The site-wide library pin remains a coupling until the
schema carries a version; that is a later conversation. If accepted, other
works become authoring projects on the same pipeline.
