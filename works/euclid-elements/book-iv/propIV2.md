# IV.2 — To inscribe in a given circle a triangle equiangular with a given triangle

Canvas: `canvas_0`. Existing: D, E, F free; DEF; A, B free; AB; C similar; circABC; triABC; O center (hidden); AG' perpendicular (hidden); G, H sliders on AG'; GH.

**deferDraggables**: G, H (the tangent is drawn on slide 3, not given).

**Figure additions**
- `AC;line;connect;A,C;0;0;0`, `BC;line;connect;B,C;0;0;0` as targets (prose joins *BC* and names *AC*; triABC is the filled result).
- `AH;line;connect;A,H;0;0;0`, `AG;line;connect;A,G;0;0;0` — halves of the tangent the prose names separately.
- Angle markers: `angHAC;sector;angleMarker;A,H,C`, `angGAB;sector;angleMarker;A,G,B`, `angDEF;sector;angleMarker;E,D,F`, `angDFE;sector;angleMarker;F,D,E`, `angABC;sector;angleMarker;B,A,C`, `angACB;sector;angleMarker;C,A,B`, `angBAC;sector;angleMarker;A,B,C`, `angEDF;sector;angleMarker;D,E,F`. (⚠ HAC / GAB / BAC share vertex A — separate radii.)
- aliases: `"ABC": "triABC"` for the triangle in prose where it is the triangle; the circle is `{ABC|circABC}`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABC\|circABC} be the given circle, and {DEF} the given triangle. | circABC, DEF, D, E, F, A, B | circABC, DEF | — | — | |
| 2 | It is required to inscribe a triangle equiangular with the triangle {DEF} in the circle {ABC\|circABC}. | (inherit) | DEF, circABC | — | — | |
| 3 | Draw {GH} touching the circle {ABC\|circABC} at {A}. | + GH, G, H, AH, AG | GH, A | GH "Line.straightEdgeConnect" | tangent at a point — III.16,Cor | |
| 4 | Construct the angle {HAC} equal to the angle {DEF} on the straight line {AH} and at the point {A} on it, and construct the angle {GAB} equal to the angle {DFE} on the straight line {AG} and at the point {A} on it. Join {BC}. | + C, AC, BC, angHAC, angDEF, angGAB, angDFE | angHAC, angDEF, angGAB, angDFE, BC | angDEF "Sector.sweep"; angHAC "Sector.sweep"; C "Point.appear"; AC "Line.straightEdgeConnect"; angDFE "Sector.sweep"; angGAB "Sector.sweep"; BC "Line.straightEdgeConnect" | angles constructed equal — I.23 | |
| 5 | Then, since a straight line {AH} touches the circle {ABC\|circABC}, and from the point of contact at {A} the straight line {AC} is drawn across in the circle, therefore the angle {HAC} equals the angle {ABC\|angABC} in the alternate segment of the circle. | + angABC | AH, AC, angHAC, angABC | angABC "Sector.sweep" | tangent–chord angle — III.32 | |
| 6 | But the angle {HAC} equals the angle {DEF}, therefore the angle {ABC\|angABC} also equals the angle {DEF}. | (inherit) | angHAC, angDEF, angABC | — | — | |
| 7 | For the same reason the angle {ACB} also equals the angle {DFE}, therefore the remaining angle {BAC} also equals the remaining angle {EDF}. | + angACB, angBAC, angEDF | angACB, angDFE, angBAC, angEDF | angACB "Sector.sweep"; angBAC "Sector.sweep"; angEDF "Sector.sweep" | remaining angles — I.32 | |
| 8 | Therefore a triangle equiangular with the given triangle has been inscribed in the given circle. | + triABC; − angle markers | triABC, DEF | triABC "Polygon.outlineAndFill" | inscribed — IV.Def.2; Q.E.F. | |
