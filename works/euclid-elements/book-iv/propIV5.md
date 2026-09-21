# IV.5 — To circumscribe a circle about a given triangle

**Three canvases, three cases.** The page carries three figures — `canvas_0` (centre inside), `canvas_1` (centre on BC), `canvas_2` (centre outside) — and the proof walks each case with its own figure. `process.md` says only the proposition canvas gets slides *except* when a canvas is itself a proof; here each case figure is. **Proposal for Nelson: three decks**, the first full, the second and third short, each carrying only its case's sentences. The corollary (`kind: corollary` section) gets no deck.

Existing (canvas_0, pivot F): A, B, C free; circABC; triABC; D, E midpoints; F center; AF, BF, CF, DF, EF. canvas_1: B, C free; BC; F midpoint; circABC; A slider on circle; triABC; D, E; AF, DF, EF. canvas_2: as canvas_0 with B, C placed so F falls outside.

**deferDraggables**: none.

**Figure additions (canvas_0 and canvas_2)**
- `AD;line;connect;A,D;0;0;0`, `DB;line;connect;D,B;0;0;0`, `AE;line;connect;A,E;0;0;0`, `EC;line;connect;E,C;0;0;0` targets for the halves.
- aliases: `"AB": ...` — the triangle sides are edges of triABC, not elements; add `AB;line;connect;A,B;0;0;0`, `AC;line;connect;A,C;0;0;0`, `BC;line;connect;B,C;0;0;0`. `"FB": "BF"`, `"FC": "CF"`, `"FA": "AF"`.
- Right-angle markers at D and E: `angADF;sector;angleMarker;D,A,F`, `angAEF;sector;angleMarker;E,A,F`.

## canvas_0 (centre within)

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABC\|triABC} be the given triangle. | triABC, A, B, C, AB, AC, BC | triABC | — | — | |
| 2 | It is required to circumscribe a circle about the given triangle {ABC\|triABC}. | (inherit) | triABC | — | — | |
| 3 | Bisect the straight lines {AB} and {AC} at the points {D} and {E}. Draw {DF} and {EF} from the points {D} and {E} at right angles to {AB} and {AC}. They will then meet within the triangle {ABC\|triABC}, or on the straight line {BC}, or outside {BC}. | + D, E, DF, EF, F, angADF, angAEF | D, E, DF, EF | D "Point.appear"; E "Point.appear"; DF "Line.straightEdgeConnect"; EF "Line.straightEdgeConnect"; F "Point.appear" | bisect a line — I.10; perpendicular at a point — I.11 | |
| 4 | First let them meet within at {F}. Join {FB}, {FC}, and {FA}. | + BF, CF, AF | F, BF, CF, AF | BF "Line.straightEdgeConnect"; CF "Line.straightEdgeConnect"; AF "Line.straightEdgeConnect" | — | |
| 5 | Then, since {AD} equals {DB}, and {DF} is common and at right angles, therefore the base {AF} equals the base {FB}. | + AD, DB | AD, DB, DF, angADF, AF, BF | — | side–angle–side — I.4 | |
| 6 | Similarly we can prove that {CF} also equals {AF}, so that {FB} also equals {FC}, therefore the three straight lines {FA} and {FB} and {FC} equal one another. | + AE, EC; − AD, DB | AE, EC, EF, CF, AF, BF | — | — | |
| 7 | Therefore the circle described with center {F} and radius one of the straight lines {FA}, {FB}, or {FC} also passes through the remaining points, and the circle is circumscribed about the triangle {ABC\|triABC}. Let it be circumscribed as {ABC\|circABC}. | + circABC; − angle markers, AE, EC | circABC, triABC | circABC "Circle.compass" | circumscribed — IV.Def.6 | |

## canvas_1 (centre on BC)

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Next, let {DF} and {EF} meet on the straight line {BC} at {F}, as is the case in the second figure. Join {AF}. | triABC, A, B, C, BC, D, E, DF, EF, F, AF | DF, EF, F, AF | AF "Line.straightEdgeConnect" | — | |
| 2 | Then, similarly, we can prove that the point {F} is the center of the circle circumscribed about the triangle {ABC\|triABC}. | + circABC | F, circABC | circABC "Circle.compass" | — | |

## canvas_2 (centre outside)

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Next, let {DF} and {EF} meet outside the triangle {ABC\|triABC} at {F}, as is the case in the third figure. Join {AF}, {BF}, and {CF}. | triABC, A, B, C, AB, AC, BC, D, E, DF, EF, F, AF, BF, CF | DF, EF, F, AF, BF, CF | AF "Line.straightEdgeConnect"; BF "Line.straightEdgeConnect"; CF "Line.straightEdgeConnect" | — | |
| 2 | Then again, since {AD} equals {DB}, and {DF} is common and at right angles, therefore the base {AF} equals the base {BF}. | + AD, DB, angADF | AD, DB, DF, angADF, AF, BF | — | — I.4 | |
| 3 | Similarly we can prove that {CF} also equals {AF}, so that {BF} also equals {FC}. Therefore the circle described with center {F} and radius one of the straight lines {FA}, {FB}, or {FC} also passes through the remaining points, and is circumscribed about the triangle {ABC\|triABC}. | + circABC; − AD, DB, angADF | AF, BF, CF, circABC | circABC "Circle.compass" | circumscribed — IV.Def.6 | |
| 4 | Therefore a circle has been circumscribed about the given triangle. | (inherit) | circABC, triABC | — | Q.E.F. | |

Notes: canvas_1's figure already has F as the midpoint of BC and A sliding on the circle, so the "meet on BC" case is true by construction — the deck only needs to show it. If Nelson prefers a single deck, the canvas_1/canvas_2 sentences can go on canvas_0 as caption-only slides with no highlight, but that loses the point of the three figures.
