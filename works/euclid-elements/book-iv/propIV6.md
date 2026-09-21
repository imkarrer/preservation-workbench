# IV.6 — To inscribe a square in a given circle

Canvas: `canvas_0` (pivot E). Existing: A, C free; E midpoint; circle ABCD; B, D perpendicular; square (quadrilateral A,B,C,D); AC, BD.

**deferDraggables**: none.

**Figure additions**
- `AB;line;connect;A,B;0;0;0`, `BC;line;connect;B,C;0;0;0`, `CD;line;connect;C,D;0;0;0`, `DA;line;connect;D,A;0;0;0` (sides named individually).
- `BE;line;connect;B,E;0;0;0`, `ED;line;connect;E,D;0;0;0`, `EA;line;connect;E,A;0;0;0`.
- `BAD;sector;sector;E,B,D;0;0;0;0` — the semicircle *BAD* as a highlight target (wedge; see README).
- Angle marker `angBAD;sector;angleMarker;A,B,D`; right-angle marker at E: `angAEB;sector;angleMarker;E,A,B`.
- aliases: `"AD": "DA"`, `"ABCD": "square"` where prose means the quadrilateral — the circle is `{ABCD|ABCD}` (circle element name is `ABCD`), so the *quadrilateral* uses `{ABCD|square}`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCD} be the given circle. | ABCD, A, C | ABCD | — | — | |
| 2 | It is required to inscribe a square in the circle {ABCD}. | (inherit) | ABCD | — | — | |
| 3 | Draw two diameters {AC} and {BD} of the circle {ABCD} at right angles to one another, and join {AB}, {BC}, {CD}, and {DA}. | + AC, E, BD, B, D, angAEB, AB, BC, CD, DA | AC, BD, AB, BC, CD, DA | AC "Line.straightEdgeConnect"; E "Point.appear"; BD "Line.straightEdgeConnect"; angAEB "Sector.sweep"; AB, BC, CD, DA "Line.straightEdgeConnect" | diameter through the centre — III.1; perpendicular at a point — I.11 | |
| 4 | Then, since {BE} equals {ED}, for {E} is the center, and {EA} is common and at right angles, therefore the base {AB} equals the base {AD\|DA}. | + BE, ED, EA | BE, ED, EA, angAEB, AB, DA | — | side–angle–side — I.4 | |
| 5 | For the same reason each of the straight lines {BC} and {CD} also equals each of the straight lines {AB} and {AD\|DA}. Therefore the quadrilateral {ABCD\|square} is equilateral. | + square; − BE, ED, EA, angAEB | AB, BC, CD, DA | square "Polygon.outline" | — | |
| 6 | I say next that it is also right-angled. | (inherit) | square | — | — | |
| 7 | For, since the straight line {BD} is a diameter of the circle {ABCD}, therefore {BAD} is a semicircle, therefore the angle {BAD\|angBAD} is right. | + BAD, angBAD | BD, BAD, angBAD | BAD "Sector.sweep"; angBAD "Sector.sweep" | angle in a semicircle — III.31 | |
| 8 | For the same reason each of the angles {ABC}, {BCD}, and {CDA} is also right. Therefore the quadrilateral {ABCD\|square} is right-angled. | − BAD, angBAD | square | — | — | |
| 9 | But it was also proved equilateral, therefore it is a square, and it has been inscribed in the circle {ABCD}. Therefore the square {ABCD\|square} has been inscribed in the given circle. | (inherit) | square, ABCD | square "Polygon.outlineAndFill" | Q.E.F. | |

Notes: slide 8 names three more angles; markers for all three would clutter a small figure, and Joyce's "for the same reason" carries them. `{ABC}` etc. on slide 8 have no element to bind to — leave those three untokenized (the process allows tokenizing only what is there).
