---
status: proposed
date: 2026-09-20
---
# Extract the deck into a renderer-independent document; do not build a lower-level geometry library

A proposition's constructions and deck today live as JavaScript inside Lektor
markdown (`geomlib.init({...})` with enum animation names and `.concat()`-built
visibility sets), so they can only be validated by executing them and can only
be consumed by geomlib. The scarce asset is that authored corpus, not another
geometry kernel — JSXGraph, euclid.js and geomlib all exist. We propose a
schema-validated **deck document** with geomlib as its reference renderer and
static SVG, Manim and GeoGebra as exporters, introduced additively (`init()`
already takes an object; string animation names sit beside the enums; legacy
inline pages keep working).

## Considered options

- **New low-level geometry library shared across works** — duplicates working
  code, and the sharing problem is in the data format, not the kernel.
- **Split geomlib into kernel + renderers first** — the right long-term move
  (elements draw themselves with a canvas context today) but a large refactor
  of someone else's repo; sequenced after the deck document proves itself.

## Consequences

Not decided until upstream agrees; a design issue on `brownnrl/euclid` precedes
any code. If accepted, Apollonius and Hilbert become authoring projects on the
same pipeline rather than engineering projects. The document must stay
hand-editable in a text editor or the maintainer will not use it.
