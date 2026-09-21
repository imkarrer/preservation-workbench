# Book IV — deck planning tables

Drafted 2026-09-21 per upstream `doc/process.md`, for Nelson's review
**before any implementation**. One file per proposition. Nothing here
touches the narrative; captions are Joyce's sentences with `{NAME}` tokens,
except the opening "Let / It is required" beats and closing summary, which
`process.md` says are ours.

Conventions used in every table:

- **Shown / hidden** is written as deltas against the previous slide
  (`+X` adds, `−X` drops, `(inherit)` unchanged). Draggables are
  auto-unioned unless listed under *deferDraggables* in the header.
- **Highlighted** uses canonical element names only (aliases are inert in
  slide sets). Where the prose spells a name differently, the caption uses
  the display override `{FC|CF}`.
- **Animation** names are the string form (`"Line.straightEdgeConnect"`),
  per the plain-data discipline proposed in the #155 thread. Cascade unless
  `(parallel)` is stated.
- **Justs** are `claim — ref` pairs (geomlib 0.14+). `Q.E.F.` closes.
- **Figure additions** lists zero-color highlight targets, angle markers,
  and aliases the deck needs. These are additive; the static figure is
  unchanged.
- **Not yet implemented** — empty unless the current geomlib vocabulary
  cannot do it. Two recurring items are noted once here:
  - *Circumference highlights* use a zero-color `sector;sector;Center,P,Q`
    (as Book III figures do); the wedge lights, radii included. An arc-only
    stroke would be nicer but is not a blocker.
  - *Same-vertex angle markers* overlap until geomlib auto-steps radii
    (tracker open question); hand-separated with the radius override.

Status: ⬜ all sixteen drafted, none reviewed.

| Prop | Slides | Angle markers | Open question |
|---|---|---|---|
| IV.1 | 8 | — | case slide "if BC equals D" |
| IV.2 | 8 | ⚠ 5 | — |
| IV.3 | 10 | ⚠ 6 | — |
| IV.4 | 9 | ~ 2 | — |
| IV.5 | 7 + 2 + 4 | ~ 2 | three case canvases → three decks? (see file) |
| IV.6 | 9 | ~ 1 | — |
| IV.7 | 12 | ~ 2 | — |
| IV.8 | 10 | — | — |
| IV.9 | 10 | ⚠ 4 | — |
| IV.10 | 15 | ⚠ 6 | II.11 cut shown as a bare point |
| IV.11 | 11 | ⚠ 5 | circumference targets |
| IV.12 | 18 | ⚠ 6 | — |
| IV.13 | 13 | ⚠ 4 | — |
| IV.14 | 8 | ⚠ 2 | — |
| IV.15 | 14 | ⚠ 6 | circumference targets |
| IV.16 | 6 | — | circumference targets; the fifteen-gon reveal |

## Questions for Nelson before implementation

1. **IV.5** — three case figures, three short decks (proposed), or one deck on `canvas_0` with the other cases as caption-only slides?
2. **IV.10** — the II.11 cut is shown as a bare point with the citation (fatigue rule). It is Book IV's first use of II.11; walk it once in full instead? The helpers are already in the figure, zero-colored.
3. **IV.12 / IV.3** — twelve angle markers each; several share a vertex. Wait for the radius-stepping library change, or hand-step now and re-author later?
4. **IV.13** — the source's "if it does not touch them. but cuts them" is a Heath/Joyce punctuation slip. Footnote in the prose per the convention? The caption carries it as printed either way.
5. **Circumferences** (IV.11, 12, 15, 16) — zero-color `sector;sector` wedges as Book III does, or is an arc-only stroke worth asking the library for first?
6. **IV.16** — "continually fit" the chord: one-stroke `Polygon.outline` of the fifteen-gon, or a vertex-by-vertex trace (library ask)?
