# Plan: preserving and modernizing classical mathematics works

_Living document. Last revised 2026-09-20. Euclid's Elements is the first work; the pipeline is meant to be work-agnostic._

## 1. What exists
| Lineage | Geometry model | Text | Status |
|---|---|---|---|
| Joyce -> geomlib (brownnrl/euclid, MIT) | Constructive: dependency graph, drag propagates, 69 methods, 3D | Joyce's edition (Heath-derived; commentary (c) Joyce) | 465 props live; Book I decks done, II done, III in review |
| canberead (ibrahimsag, CC-BY-4.0) | Coordinate-baked points/shapes, no constructions | Fitzpatrick translation, {line AB} tokenized prose, sentence<->figure cursor | 22 stars, pushed Mar 2026 |
| manim-euclid-elements (osolmaz, MIT) | Consumes canberead JSON -> Manim video + AI voiceover | same | 228/465, dormant since 2022 |

geomlib is the only lineage with construction semantics. Don't build a new kernel; the scarce asset is the authored corpus of constructions + proof steps, currently locked as JS inside Lektor markdown.

## 2. Problem
Decks = `<script>geomlib.init({...})</script>` in `.lr` prose: enum refs (`geomlib.A.*`), `.concat()`-composed visible sets. check-decks.js must execute them in a vm sandbox with node-canvas. No export path; every library change (e.g. euclid#91) forces deck re-authoring; a modern front-end can't consume the corpus; Apollonius/Hilbert would inherit all of it.

## 3. Thesis: the deck is data
Renderer-independent DECK DOCUMENT (JSON, schema-validated): elements[] (construction DSL), aliases, slides[] {text, visible, highlighted, animations (string names), justifications}.
Consumers: geomlib canvas (reference), static SVG (noscript/.gif replacement), GeoGebra .ggb, Manim scene (osolmaz pattern), future modern front-end.
Additive + default-off: init() already takes an object; add JSON schema, string animation names, Lektor `deck` field + template emitting the script. Legacy inline pages keep working.

## 4. Phases (each independently accept/reject)
- P0 local workflow: sibling checkouts ~/src/euclid, ~/src/euclids-elements-lektor, ~/src/euclids-elements.org (scripts assume ../euclid, ../euclids-elements.org). flox env at ~/src/euclid (git info/exclude; versioned on fork branch env/flox): nodejs_24, util-linux (libuuid), python312+Lektor venv, hook exports LD_LIBRARY_PATH + NODE_OPTIONS=--no-experimental-strip-types. Bead-loop harness: bead = one issue or one deck.
- P1 earn merges 2 and 3: file XI.11 plane-rotation bug from Nelson's #155 comment (points slide along plane on rotation; F/G/H betweenness flips), fix if tractable; #70, #156; slideshow-feedback issue on lektor repo (he asked); offer Book IV decks (16 props) via process.md with planning tables reviewed by him before implementation.
- P2 deck document: design issue on euclid first; schema + validator + string animation names; lektor `deck` field; migrate Book I decks as proof; check-decks gains schema pass.
- P3 exporters: static SVG, Manim generator, GeoGebra XML; export button in SlateControls (his wishlist).
- P4 renderer independence: extract kernel from canvas (elements draw with ctx today); Renderer interface, canvas then SVG; unlocks accessibility, touch (#57), 3D/affine gizmo, explicit transforms (XI.11 class). Wait until co-maintainer.
- P5 other works: Apollonius Conics (Heath 1896, PD), Hilbert Foundations (Townsend 1902, PD, Gutenberg). Same Lektor models + deck pipeline. Nelson's "biggest thing I would love to see".

## 5. Risks
Single maintainer -> phases independent. Fidelity rule -> nothing touches prose. canberead prose is Fitzpatrick's translation -> reference data only, check license. Keep deck doc hand-authorable JSON. Own app deferred; becomes consumer #5.

## 6. Next actions
1. Post #155 reply (+ offer Book IV decks). 2. P0 setup. 3. File XI.11 issue. 4. Hour with Book I-II decks -> feedback issue.

## Facts gathered
- lektor repo: brownnrl/euclids-elements-lektor (Python, Lektor 3.3.13+), publishes to gh-pages of euclids-elements.org via scripts/publish.sh gated by check-decks.js; branch previews via Cloudflare Workers (scripts/deploy-preview.sh).
- Roadmap: euclids-elements.org#17 (phases 1-3 done; 4a cross-highlight active; 4b/4c slideshow + animation).
- Deck backlog issues: lektor #21-#31, one per Book III-XIII (417 props).
- geomlib pin lives in templates/layout.html (`geomlib_default`); EUCLIDS_GEOMLIB_LOCAL=1 tests decks against dev bundle.
- Merged: brownnrl/euclid#183 (fix #155), squash 169da87, 2026-09-20.
