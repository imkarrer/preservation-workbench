# IV.15 — To inscribe an equilateral and equiangular hexagon in a given circle

Canvas: `canvas_0` (pivot G). Existing: A, D free; AD; G midpoint; circle ABCDEF; circle EGCH; CE bichord (hidden); C first, E last; B, F extend; H extend (hidden label); BE, CF; hexagon.

**deferDraggables**: none.

**Figure additions**
- Segments: `EG;line;connect;E,G;0;0;0`, `CG;line;connect;C,G;0;0;0`, `GD;line;connect;G,D;0;0;0`, `DE;line;connect;D,E;0;0;0`, `GB;line;connect;G,B;0;0;0`, `AB;line;connect;A,B;0;0;0`, `BC;line;connect;B,C;0;0;0`, `CD;line;connect;C,D;0;0;0`, `EF;line;connect;E,F;0;0;0`, `FA;line;connect;F,A;0;0;0`.
- `EGD;polygon;triangle;E,G,D;0;0;0;0`.
- Circumference targets (centre G): `arcAB`, `arcBC`, `arcCD`, `arcDE`, `arcEF`, `arcFA` as `sector;sector;G,X,Y;0;0;0;0`; `arcFABCD;sector;sector;G,F,D`, `arcEDCBA;sector;sector;G,E,A`, `arcABCD;sector;sector;G,A,D`.
- Angle markers at G: `angEGD`, `angGDE`, `angDEG`, `angDGC`, `angCGB`, `angBGA`, `angAGF`, `angFGE` (all `sector;angleMarker;G,…` except GDE at D, DEG at E); `angFED;sector;angleMarker;E,F,D`, `angAFE;sector;angleMarker;F,A,E`. (⚠ six markers at G — they are adjacent, not overlapping, so radius stepping is not needed.)
- aliases: `"GCH": "EGCH"`, `"DG": "GD"`, `"GE": "EG"`, `"ED": "DE"`, `"EB": "BE"`, `"DEF": "angFED"`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCDEF} be the given circle. | ABCDEF, A, D | ABCDEF | — | — | |
| 2 | It is required to inscribe an equilateral and equiangular hexagon in the circle {ABCDEF}. | (inherit) | ABCDEF | — | — | |
| 3 | Draw the diameter {AD} of the circle {ABCDEF}. Take the center {G} of the circle. | + AD, G | AD, G | AD "Line.straightEdgeConnect"; G "Point.appear" | centre of a circle — III.1 | |
| 4 | Describe the circle {EGCH} with center {D} and radius {DG\|GD}. | + GD, EGCH, H | D, GD, EGCH | EGCH "Circle.compass" | — | |
| 5 | Join {EG} and {CG} and carry them through to the points {B} and {F}. | + E, C, EG, CG, BE, CF, B, F | EG, CG, BE, CF | E, C "Point.appear"; EG, CG "Line.straightEdgeConnect"; BE, CF "Line.straightEdgeExtend" | — | |
| 6 | Join {AB}, {BC}, {CD}, {DE}, {EF}, and {FA}. I say that the hexagon {ABCDEF\|hexagon} is equilateral and equiangular. | + AB, BC, CD, DE, EF, FA, hexagon | hexagon | AB, BC, CD, DE, EF, FA "Line.straightEdgeConnect"; hexagon "Polygon.outline" | — | |
| 7 | For, since the point {G} is the center of the circle {ABCDEF}, {GE\|EG} equals {GD}. Again, since the point {D} is the center of the circle {GCH\|EGCH}, {DE} equals {DG\|GD}. | (inherit) | G, EG, GD, D, DE, EGCH | — | radii — I.Def.15 | |
| 8 | But {GE\|EG} was proved equal to {GD}, therefore {GE\|EG} also equals {ED\|DE}. Therefore the triangle {EGD} is equilateral, and therefore its three angles {EGD}, {GDE}, and {DEG} equal one another, inasmuch as, in isosceles triangles, the angles at the base equal one another. | + EGD, angEGD, angGDE, angDEG | EGD, angEGD, angGDE, angDEG | EGD "Polygon.outline"; angEGD, angGDE, angDEG "Sector.sweep" | base angles — I.5 | |
| 9 | And the sum of the three angles of the triangle equals two right angles, therefore the angle {EGD} is one-third of two right angles. Similarly, the angle {DGC} can also be proved to be one third of two right angles. | + angDGC; − EGD, angGDE, angDEG | angEGD, angDGC | angDGC "Sector.sweep" | angle sum — I.32 | |
| 10 | And, since the straight line {CG} standing on {EB\|BE} makes the sum of the adjacent angles {EGC} and {CGB} equal to two right angles, therefore the remaining angle {CGB} is also one-third of two right angles. | + angCGB | CG, BE, angEGD, angDGC, angCGB | angCGB "Sector.sweep" | adjacent angles — I.13 | angle *EGC* is the sum EGD+DGC — no separate marker |
| 11 | Therefore the angles {EGD}, {DGC}, and {CGB} equal one another, so that the angles vertical to them, the angles {BGA}, {AGF}, and {FGE}, are equal. Therefore the six angles {EGD}, {DGC}, {CGB}, {BGA}, {AGF}, and {FGE} equal one another. | + angBGA, angAGF, angFGE | all six markers | angBGA, angAGF, angFGE "Sector.sweep" (parallel) | vertical angles — I.15 | |
| 12 | But equal angles stand on equal circumferences, therefore the six circumferences {AB\|arcAB}, {BC\|arcBC}, {CD\|arcCD}, {DE\|arcDE}, {EF\|arcEF}, and {FA\|arcFA} equal one another. And straight lines that cut off equal circumferences are equal, therefore the six straight lines equal one another. Therefore the hexagon {ABCDEF\|hexagon} is equilateral. | + six arcs; − markers | arcs, then AB…FA, hexagon | — | III.26; III.29 | wedge highlight (README) |
| 13 | I say next that it is also equiangular. For, since the circumference {FA\|arcFA} equals the circumference {ED\|arcDE}, add the circumference {ABCD\|arcABCD} to each, therefore the whole {FABCD\|arcFABCD} equals the whole {EDCBA\|arcEDCBA}. And the angle {FED} stands on the circumference {FABCD\|arcFABCD}, and the angle {AFE} on the circumference {EDCBA\|arcEDCBA}, therefore the angle {AFE} equals the angle {DEF\|angFED}. | + arcABCD, arcFABCD, arcEDCBA, angFED, angAFE; − six arcs | arcFA, arcDE, arcABCD, arcFABCD, arcEDCBA, angFED, angAFE | angFED, angAFE "Sector.sweep" | angles on equal circumferences — III.27 | |
| 14 | Similarly it can be proved that the remaining angles of the hexagon {ABCDEF\|hexagon} are also severally equal to each of the angles {AFE} and {FED}, therefore the hexagon {ABCDEF\|hexagon} is equiangular. But it was also proved equilateral, and it has been inscribed in the circle {ABCDEF}. Therefore an equilateral and equiangular hexagon has been inscribed in the given circle. | − arcs, markers | hexagon, ABCDEF | hexagon "Polygon.outlineAndFill" | Q.E.F. | |

Notes: Joyce's opening construction sentence is five constructions; split by verb into slides 3–6, words intact. The corollary ("the side of the hexagon equals the radius") is a separate section with no canvas; no deck. Slide 12 combines two short sentences and the conclusion — the arcs and then the sides are two highlight beats; split into 12a/12b if the double highlight change reads badly.
