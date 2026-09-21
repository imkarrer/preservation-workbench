# IV.7 — To circumscribe a square about a given circle

Canvas: `canvas_0` (pivot E). Existing: A, C free; E midpoint; B, D perpendicular; F, G, H, K (parallelogram points); square (F,G,H,K); circle ABCD; AC, BD.

**deferDraggables**: none.

**Figure additions**
- Tangent sides as segments: `FG;line;connect;F,G;0;0;0`, `GH;line;connect;G,H;0;0;0`, `HK;line;connect;H,K;0;0;0`, `KF;line;connect;K,F;0;0;0`.
- Radii: `EA;line;connect;E,A;0;0;0`, `EB;line;connect;E,B;0;0;0`.
- Parallelograms named in prose: `GBEA;polygon;quadrilateral;G,B,E,A;0;0;0;0` (also the alias target for *GK, GC, AK, FB, BK* — see note).
- Angle markers: `angAEB;sector;angleMarker;E,A,B`, `angEBG;sector;angleMarker;B,E,G`, `angAGB;sector;angleMarker;G,A,B`.
- aliases: `"GF": "FG"`, `"FK": "KF"`, `"BED": "BD"`, `"FGHK": "square"`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCD} be the given circle. | ABCD, A, C | ABCD | — | — | |
| 2 | It is required to circumscribe a square about the circle {ABCD}. | (inherit) | ABCD | — | — | |
| 3 | Draw two diameters {AC} and {BD} of the circle {ABCD} at right angles to one another. | + AC, E, BD, B, D | AC, BD | AC "Line.straightEdgeConnect"; E "Point.appear"; BD "Line.straightEdgeConnect" | III.1; I.11 | |
| 4 | Draw {FG}, {GH}, {HK}, and {KF} through the points {A}, {B}, {C}, and {D} touching the circle {ABCD}. | + FG, GH, HK, KF, F, G, H, K | FG, GH, HK, KF | FG, GH, HK, KF "Line.straightEdgeConnect" | tangent at a point — III.16,Cor | |
| 5 | Then, since {FG} touches the circle {ABCD}, and {EA} has been joined from the center {E} to the point of contact at {A}, therefore the angles at A are right. For the same reason the angles at the points {B}, {C}, and {D} are also right. | + EA | FG, EA, A | — | radius ⟂ tangent — III.18 | |
| 6 | Now, since the angle {AEB} is right, and the angle {EBG} is also right, therefore {GH} is parallel to {AC}. | + angAEB, EB, angEBG | angAEB, angEBG, GH, AC | angAEB "Sector.sweep"; angEBG "Sector.sweep" | interior angles two right — I.28 | |
| 7 | For the same reason {AC} is also parallel to {FK\|KF}, so that {GH} is also parallel to {FK\|KF}. | − angAEB, angEBG | AC, KF, GH | — | parallel to the same line — I.30 | |
| 8 | Similarly we can prove that each of the straight lines {GF\|FG} and {HK} is parallel to {BED\|BD}. | (inherit) | FG, HK, BD | — | — | |
| 9 | Therefore {GK}, {GC}, {AK}, {FB}, and {BK} are parallelograms, therefore {GF\|FG} equals {HK}, and {GH} equals {FK\|KF}. | (inherit) | FG, HK, GH, KF | — | opposite sides of parallelograms — I.34 | |
| 10 | And, since {AC} equals {BD}, and {AC} also equals each of the straight lines {GH} and {FK\|KF}, and {BD} equals each of the straight lines {GF\|FG} and {HK}, therefore the quadrilateral {FGHK\|square} is equilateral. | + square | AC, BD, square | square "Polygon.outline" | — I.34 | |
| 11 | I say next that it is also right-angled. For, since {GBEA} is a parallelogram, and the angle {AEB} is right, therefore the angle {AGB} is also right. | + GBEA, angAEB, angAGB | GBEA, angAEB, angAGB | GBEA "Polygon.outline"; angAGB "Sector.sweep" | opposite angles of a parallelogram — I.34 | |
| 12 | Similarly we can prove that the angles at {H}, {K}, and {F} are also right. Therefore {FGHK\|square} is right-angled. But it was also proved equilateral, therefore it is a square, and it has been circumscribed about the circle {ABCD}. Therefore a square has been circumscribed about the given circle. | − GBEA, angAEB, angAGB | square, ABCD | square "Polygon.outlineAndFill" | Q.E.F. | |

Notes: slide 9 names five parallelograms by two letters (*GK, GC, AK, FB, BK*); drawing five zero-color quadrilaterals for one sentence is clutter — leave those five untokenized and let the four sides carry the highlight. Slide 12 merges three short sentences (the last two are the standard closing) — split if Nelson prefers one beat each.
