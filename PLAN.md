# Plan: preserving and modernizing classical mathematics works

_Living document. Last revised 2026-09-20 (evening, after research). Euclid's Elements is the first work; the pipeline is meant to be work-agnostic._

## 1. What exists
| Lineage | Geometry model | Text | Status |
|---|---|---|---|
| Joyce -> geomlib (brownnrl/euclid, MIT) | Constructive: dependency graph, drag propagates, 69 methods, 3D | Joyce's edition (Heath-derived; commentary (c) Joyce) | 465 props live; Book I decks done, II done, III in review |
| canberead (ibrahimsag, CC-BY-4.0) | Coordinate-baked points/shapes, no constructions | Fitzpatrick translation, {line AB} tokenized prose, sentence<->figure cursor | 22 stars, pushed Mar 2026 |
| manim-euclid-elements (osolmaz, MIT) | Consumes canberead JSON -> Manim video + AI voiceover | same | 228/465, dormant since 2022 |

geomlib is the only lineage with construction semantics. Don't build a new kernel; the scarce asset is the authored corpus of constructions + proof steps, currently locked as JS inside Lektor markdown.

## 2. Problem
Upstream closed its architecture roadmap on 2026-08-30 ("remaining work is per-book deck authoring, not architecture"). 62 of 465 propositions have decks (Book I 48, Book II 14); 403 remain. Each deck is a `<script>geomlib.init({...})</script>` inside the `proof` markdown field — the one word ("diagrams") of upstream's own structured-fields plan that never shipped. All 62 use enum animation names (`geomlib.A.*`), 28 compose `visible` with `var` + `.concat()`, all carry a `resolveJustification` function. Consequence, documented upstream: the geomlib 0.16 bump produced 70 diagnostics on 21 untouched pages; every deck is lockstepped to one library pin. check-decks.js must execute each script in a vm sandbox with node-canvas to validate it. No export path; other works would inherit all of it.

## 3. Thesis: author the 403 remaining decks as data
Not an architecture proposal — upstream has closed that. An authoring discipline for new decks: JSON-parseable literals (string animation names, which geomlib already accepts; no `.concat()`; no functions in `slides[]`), schema-checked before the existing vm step. Book IV is the pilot; the schema emerges from what its decks need. The renderer-independent document this yields is what later makes static SVG, Manim, GeoGebra, other works and any modern front-end into consumers. See ADR 0002 (revised).
Consumers: geomlib canvas (reference), static SVG (noscript/.gif replacement), GeoGebra command list via evalCommand (not hand-built XML), Manim scene (osolmaz pattern), JSXGraph via JessieCode (cheap secondary renderer), future modern front-end.
Placement (from research): the figure's position inside the proof prose is load-bearing (float rules, DOM-order ref binding) and Lektor does not run Jinja in bodies, so the inline literal stays where it is for now; a sidecar file behind a `[!figure canvas_0]` directive in lektor-eucrefs is the later destination, not a top-level field.

## 4. Phases (each independently accept/reject)
- P0 local workflow: sibling checkouts ~/src/euclid, ~/src/euclids-elements-lektor, ~/src/euclids-elements.org (scripts assume ../euclid, ../euclids-elements.org). flox env at ~/src/euclid (git info/exclude; versioned on fork branch env/flox): nodejs_24, util-linux (libuuid), python312+Lektor venv, hook exports LD_LIBRARY_PATH + NODE_OPTIONS=--no-experimental-strip-types. Bead-loop harness: bead = one issue or one deck.
- P1 earn merges 2 and 3: file XI.11 plane-rotation bug from Nelson's #155 comment (points slide along plane on rotation; F/G/H betweenness flips), fix if tractable; #70, #156; slideshow-feedback issue on lektor repo (he asked); offer Book IV decks (16 props) via process.md with planning tables reviewed by him before implementation.
- P2 deck discipline: (1) geomlib doc PR: string animation names are supported; (2) Book IV decks authored as JSON-parseable literals, planning tables reviewed first; (3) JSON Schema + a pre-vm check in check-decks.js, additive, legacy decks skip it; (4) later, geomlib exports a DOM-free validator + per-element construction diagnostics. Migration of the 62 existing decks only after the discipline has proven itself.
- P3 exporters: static SVG first; Manim generator; GeoGebra as an evalCommand command list (embedding is fine on a free, ad-free site under the non-commercial licence with attribution — any ad or fee revenue needs a commercial agreement); export button in SlateControls (his wishlist).
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
