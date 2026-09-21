# IV.11 — To inscribe an equilateral and equiangular pentagon in a given circle

Canvas: `canvas_0`. Existing: A, B free; ABCDE regularPolygon (outline); C, D, E vertices; circ circumcircle; dupABCDE (filled copy); AC, AD, BD, CE; G, H free; F similar; FGH.

**deferDraggables**: G, H (the triangle FGH is "set out" on slide 3).

**Figure additions**
- Sides: `AB;line;connect;A,B;0;0;0`, `BC;line;connect;B,C;0;0;0`, `CD;line;connect;C,D;0;0;0`, `DE;line;connect;D,E;0;0;0`, `EA;line;connect;E,A;0;0;0`.
- `ACD;polygon;triangle;A,C,D;0;0;0;0` target; `O;point;center;circ;0;0` (hidden) for the circumference wedges.
- Circumference targets: `arcAB;sector;sector;O,A,B;0;0;0;0`, `arcBC`, `arcCD`, `arcDE`, `arcEA` likewise; `arcABCD;sector;sector;O,A,D;0;0;0;0`, `arcEDCB;sector;sector;O,E,B;0;0;0;0` (see README on wedges).
- Angle markers: `angF;sector;angleMarker;F,G,H`, `angG;sector;angleMarker;G,F,H`, `angH;sector;angleMarker;H,F,G`, `angCAD;sector;angleMarker;A,C,D`, `angACE;sector;angleMarker;C,A,E`, `angECD;sector;angleMarker;C,E,D`, `angCDB;sector;angleMarker;D,C,B`, `angBDA;sector;angleMarker;D,B,A`, `angAED;sector;angleMarker;E,A,D`, `angBAE;sector;angleMarker;A,B,E`. (⚠ ACE/ECD share C; CDB/BDA share D.)
- aliases: `"DAC": "angCAD"`, `"ACD": ...` — prose uses *ACD* for the triangle and for the angle at C; the triangle is `{ACD|ACD}`, the angle `{ACD|angACD}` with `angACD;sector;angleMarker;C,A,D` added; `"CDA": "angCDA"` with `angCDA;sector;angleMarker;D,C,A`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCDE\|circ} be the given circle. | circ, A, B | circ | — | — | |
| 2 | It is required to inscribe an equilateral and equiangular pentagon in the circle {ABCDE\|circ}. | (inherit) | circ | — | — | |
| 3 | Set out the isosceles triangle {FGH} having each of the angles at {G} and {H} double the angle at {F}. | + FGH, F, G, H, angF, angG, angH | FGH, angG, angH, angF | FGH "Polygon.outline"; angF, angG, angH "Sector.sweep" | isosceles triangle with base angles double — IV.10 | |
| 4 | Inscribe in the circle {ABCDE\|circ} the triangle {ACD\|ACD} equiangular with the triangle {FGH}, so that the angles {CAD}, {ACD\|angACD}, and {CDA} equal the angles at {F}, {G}, and {H} respectively. Therefore each of the angles {ACD\|angACD} and {CDA} is also double the angle {CAD}. | + C, D, AC, AD, CD, ACD, angCAD, angACD, angCDA | ACD, angCAD, angACD, angCDA, angF, angG, angH | ACD "Polygon.outline"; angCAD, angACD, angCDA "Sector.sweep" | inscribe an equiangular triangle — IV.2 | |
| 5 | Now bisect the angles {ACD\|angACD} and {CDA} respectively by the straight lines {CE} and {DB}, and join {AB}, {BC}, {DE}, and {EA}. | + CE, E, BD, angACE, angECD, angCDB, angBDA, AB, BC, DE, EA; − angACD, angCDA, angF, angG, angH | CE, BD, AB, BC, DE, EA | CE "Line.straightEdgeConnect"; E "Point.appear"; BD "Line.straightEdgeConnect"; AB, BC, DE, EA "Line.straightEdgeConnect" | bisect an angle — I.9 | |
| 6 | Then, since each of the angles {ACD\|angACD} and {CDA} is double the angle {CAD}, and they are bisected by the straight lines {CE} and {DB}, therefore the five angles {DAC\|angCAD}, {ACE}, {ECD}, {CDB}, and {BDA} equal one another. | (inherit) | angCAD, angACE, angECD, angCDB, angBDA | angACE, angECD, angCDB, angBDA "Sector.sweep" (parallel) | — | |
| 7 | But equal angles stand on equal circumferences, therefore the five circumferences {AB\|arcAB}, {BC\|arcBC}, {CD\|arcCD}, {DE\|arcDE}, and {EA\|arcEA} equal one another. | + arcAB, arcBC, arcCD, arcDE, arcEA; − angle markers | arcAB, arcBC, arcCD, arcDE, arcEA | — | equal angles on equal circumferences — III.26 | wedge highlight, not arc-only (README) |
| 8 | But straight lines that cut off equal circumferences are equal, therefore the five straight lines {AB}, {BC}, {CD}, {DE}, and {EA} equal one another. Therefore the pentagon {ABCDE} is equilateral. | + ABCDE; − arcs | AB, BC, CD, DE, EA, ABCDE | ABCDE "Polygon.outline" | equal circumferences, equal chords — III.29 | |
| 9 | I say next that it is also equiangular. For, since the circumference {AB\|arcAB} equals the circumference {DE\|arcDE}, add {BCD\|arcBCD} to each, therefore the whole circumference {ABCD\|arcABCD} equals the whole circumference {EDCB\|arcEDCB}. | + arcAB, arcDE, arcBCD, arcABCD, arcEDCB | arcAB, arcDE, arcBCD, arcABCD, arcEDCB | — | — | wedge highlight; add `arcBCD;sector;sector;O,B,D;0;0;0;0` |
| 10 | And the angle {AED} stands on the circumference {ABCD\|arcABCD}, and the angle {BAE} on the circumference {EDCB\|arcEDCB}, therefore the angle {BAE} also equals the angle {AED}. | + angAED, angBAE; − arcAB, arcDE, arcBCD | angAED, arcABCD, angBAE, arcEDCB | angAED "Sector.sweep"; angBAE "Sector.sweep" | angles on equal circumferences — III.27 | |
| 11 | For the same reason each of the angles {ABC}, {BCD}, and {CDE} also equals each of the angles {BAE} and {AED}, therefore the pentagon {ABCDE} is equiangular. But it was also proved equilateral, therefore an equilateral and equiangular pentagon has been inscribed in the given circle. | + dupABCDE; − arcs, angle markers | ABCDE, circ | dupABCDE "Polygon.outlineAndFill" | Q.E.F. | |

Notes: the figure builds the pentagon first and derives the triangle FGH from it (`F;point;similar;G,H,C,D,A`), the reverse of the proof's order — fine for a static figure, but it means dragging G/H moves only the small triangle. Slide order follows the proof regardless.
