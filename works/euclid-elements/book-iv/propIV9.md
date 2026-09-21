# IV.9 — To circumscribe a circle about a given square

Canvas: `canvas_0` (pivot E). Existing: A, C free; E midpoint; circle ABCD; B, D perpendicular; square (A,B,C,D); AC, BD.

**deferDraggables**: none.

**Figure additions**
- Sides: `DA;line;connect;D,A;0;0;0`, `AB;line;connect;A,B;0;0;0`, `DC;line;connect;D,C;0;0;0`, `BC;line;connect;B,C;0;0;0`.
- Radii: `EA;line;connect;E,A;0;0;0`, `EB;line;connect;E,B;0;0;0`, `EC;line;connect;E,C;0;0;0`, `ED;line;connect;E,D;0;0;0`.
- Angle markers: `angDAC;sector;angleMarker;A,D,C`, `angBAC;sector;angleMarker;A,B,C`, `angEAB;sector;angleMarker;A,E,B`, `angEBA;sector;angleMarker;B,E,A`. (⚠ DAC/BAC/EAB share A — EAB is BAC by the same rays; alias it rather than draw twice.)
- aliases: `"AD": "DA"`, `"BA": "AB"`, `"CD": "DC"`, `"DB": "BD"`, `"EAB": "angBAC"`, `"ABCD": "square"` (the circle is only named on the last two slides — use `{ABCD|ABCD}` there).

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCD\|square} be the given square. | square, A, B, C, D, DA, AB, BC, DC | square | — | — | |
| 2 | It is required to circumscribe a circle about the square {ABCD\|square}. | (inherit) | square | — | — | |
| 3 | Join {AC} and {BD}, and let them cut one another at {E}. | + AC, BD, E | AC, BD, E | AC "Line.straightEdgeConnect"; BD "Line.straightEdgeConnect"; E "Point.appear" | — | |
| 4 | Then, since {DA} equals {AB}, and {AC} is common, therefore the two sides {DA} and {AC} equal the two sides {BA\|AB} and {AC}, and the base {DC} equals the base {BC}, therefore the angle {DAC} equals the angle {BAC}. | + angDAC, angBAC | DA, AB, AC, DC, BC, angDAC, angBAC | angDAC "Sector.sweep"; angBAC "Sector.sweep" | side–side–side — I.8 | |
| 5 | Therefore the angle {DAB} is bisected by {AC}. | (inherit) | angDAC, angBAC, AC | — | — | |
| 6 | Similarly we can prove that each of the angles {ABC}, {BCD}, and {CDA} is bisected by the straight lines {AC} and {DB\|BD}. | − angDAC, angBAC | AC, BD | — | — | |
| 7 | Now, since the angle {DAB} equals the angle {ABC}, and the angle {EAB\|angBAC} is half of the angle {DAB}, and the angle {EBA} half of the angle {ABC}, therefore the angle {EAB\|angBAC} also equals the angle {EBA}, so that the side {EA} also equals {EB}. | + angBAC, angEBA, EA, EB | angBAC, angEBA, EA, EB | angBAC "Sector.sweep"; angEBA "Sector.sweep" | equal angles, equal sides — I.6 | |
| 8 | Similarly we can prove that each of the straight lines {EA} and {EB} equals each of the straight lines {EC} and {ED}. Therefore the four straight lines {EA}, {EB}, {EC}, and {ED} equal one another. | + EC, ED; − angle markers | EA, EB, EC, ED | — | — | |
| 9 | Therefore the circle described with center {E} and radius one of the straight lines {EA}, {EB}, {EC}, or {ED} also passes through the remaining points, and it is circumscribed about the square {ABCD\|square}. | + ABCD | E, ABCD | ABCD "Circle.compass" | — | |
| 10 | Let it be circumscribed, as {ABCD\|ABCD}. Therefore a circle has been circumscribed about the given square. | (inherit) | ABCD, square | — | Q.E.F. | |

Notes: `{DAB}` and `{ABC}` (whole angles) on slides 5–7 have no marker; the two half-markers together are the whole angle, so the caption tokens for the wholes are left untokenized rather than bound to a misleading element.
