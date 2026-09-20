# Preservation workbench

The vocabulary for preserving classical mathematics works as interactive
web editions. Terms come from Joyce's edition and Nelson Brown's tooling
where they exist; we do not invent a second name for something upstream
already names.

## Language

**Work**:
A classical text being preserved as a whole — Euclid's *Elements*,
Apollonius' *Conics*, Hilbert's *Foundations*.
_Avoid_: book (that is a division within a work), project

**Edition**:
A specific published presentation of a work, e.g. Joyce's online edition
of the *Elements* built on Heath's translation.
_Avoid_: version, site

**Narrative**:
The prose of an edition — statements, proofs, guides, definitions.
Republished faithfully and never edited; corrections are footnotes.
_Avoid_: content, copy, text (too broad — captions are also text)

**Figure**:
One interactive diagram on a page: a canvas plus the constructions that
draw it. A page may carry several.
_Avoid_: canvas (the HTML element, not the concept), diagram (the static
image fallback)

**Construction**:
A single element in a figure, declared by how it is built from earlier
elements (e.g. *the circle with centre A through B*). Dragging a free
point recomputes every construction that depends on it.
_Avoid_: shape, object, primitive

**Deck**:
The slideshow layer on a proposition's figure: an ordered set of slides,
each carrying one caption of the narrative, the elements shown and
highlighted, any transition animation, and the marginal justifications.
_Avoid_: slideshow (the presentation mode, not the authored data),
walkthrough

**Caption**:
The sentence a slide displays — the narrative's own sentence for that
step, with element names tokenized. Which sentences a deck carries is
ours to choose; their wording is not.
_Avoid_: slide text, narration

**Justification**:
A marginal citation on a slide naming the definition, postulate, common
notion or earlier proposition a step relies on (e.g. `I.Post.3`).
_Avoid_: reference (overloaded with element references), cite

**Deck document** *(proposed)*:
A renderer-independent, schema-validated file holding a figure's
constructions and its deck, from which the interactive figure, static
images and exports are all generated.
_Avoid_: deck JSON, spec, manifest

**Renderer**:
Anything that draws a figure from its constructions — today only
geomlib's canvas.
_Avoid_: engine, backend

**Exporter**:
Anything that turns a deck document into another tool's format —
GeoGebra, Manim, static SVG.
_Avoid_: converter, plugin

**Upstream**:
Nelson Brown's three repositories: `euclid` (geomlib), the Lektor
content repo, and the published site repo.
_Avoid_: Nelson's repos, the main repo

**Sibling checkout**:
A clone of an upstream repo placed next to this one, at the relative
path upstream's scripts expect.
