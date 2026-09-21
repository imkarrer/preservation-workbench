# IV.8 — To inscribe a circle in a given square

Canvas: `canvas_0` (pivot G). Existing: A, B free; ABCD square; C, D vertices; E, F, H, K midpoints; EH, FK; G intersection; circle EFHK.

**deferDraggables**: none.

**Figure additions**
- Sides: `AD;line;connect;A,D;0;0;0`, `AB;line;connect;A,B;0;0;0`, `BC;line;connect;B,C;0;0;0`, `CD;line;connect;C,D;0;0;0`.
- Halves and radii: `AE;line;connect;A,E;0;0;0`, `AF;line;connect;A,F;0;0;0`, `FG;line;connect;F,G;0;0;0`, `GE;line;connect;G,E;0;0;0`, `GH;line;connect;G,H;0;0;0`, `GK;line;connect;G,K;0;0;0`.
- aliases: `"DA": "AD"`, `"EG": "GE"`, `"GF": "FG"`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCD} be the given square. | ABCD, A, B, C, D, AB, BC, CD, AD | ABCD | — | — | |
| 2 | It is required to inscribe a circle in the given square {ABCD}. | (inherit) | ABCD | — | — | |
| 3 | Bisect the straight lines {AD} and {AB} at the points {E} and {F} respectively. Draw {EH} through {E} parallel to either {AB} or {CD}, and draw {FK} through {F} parallel to either {AD} or {BC}. | + E, F, EH, H, FK, K, G | E, F, EH, FK | E "Point.appear"; F "Point.appear"; EH "Line.straightEdgeConnect"; FK "Line.straightEdgeConnect" | bisect a line — I.10; parallel through a point — I.31 | |
| 4 | Therefore each of the figures {AK}, {KB}, {AH}, {HD}, {AG}, {GC}, {BG}, and {GD} is a parallelogram, and their opposite sides are evidently equal. | (inherit) | EH, FK, ABCD | — | — I.34 | |
| 5 | Now, since {AD} equals {AB}, and {AE} is half of {AD}, and {AF} half of {AB}, therefore {AE} equals {AF}, so that the opposite sides are also equal, therefore {FG} equals {GE}. | + AE, AF, FG, GE | AD, AB, AE, AF, FG, GE | — | — | |
| 6 | Similarly we can prove that each of the straight lines {GH} and {GK} equals each of the straight lines {FG} and {GE}. Therefore the four straight lines {GE}, {GF\|FG}, {GH}, and {GK} equal one another. | + GH, GK; − AE, AF | GE, FG, GH, GK | — | — | |
| 7 | Therefore the circle described with center {G} and radius one of the straight lines {GE}, {GF\|FG}, {GH}, or {GK} also passes through the remaining points. | + EFHK | G, EFHK | EFHK "Circle.compass" | — | |
| 8 | And it touches the straight lines {AB}, {BC}, {CD}, and {DA\|AD}, because the angles at {E}, {F}, {H}, and {K} are right. | (inherit) | EFHK, AB, BC, CD, AD | — | — | |
| 9 | For, if the circle cuts {AB}, {BC}, {CD}, or {DA\|AD}, the straight line drawn at right angles to the diameter of the circle from its end will fall within the circle, which was proved absurd. Therefore the circle described with center {G} and radius one of the straight lines {GE}, {GF\|FG}, {GH}, or {GK} does not cut the straight lines {AB}, {BC}, {CD}, and {DA\|AD}. | (inherit) | EFHK | — | — III.16 | |
| 10 | Therefore it touches them, and has been inscribed in the square {ABCD}. Therefore a circle has been inscribed in the given square. | (inherit) | EFHK, ABCD | — | Q.E.F. | |

Notes: slide 4's eight two-letter parallelograms are left untokenized (same reasoning as IV.7 slide 9).
