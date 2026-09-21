# IV.4 — To inscribe a circle in a given triangle

Canvas: `canvas_0` (pivot D). Existing: A, B, C free; ABC; BB', CC' (hidden bisector lines); D intersection; F, E, G feet; EFG; BD, CD, ED, FD, GD. (The page has further guide canvases; no decks on those.)

**deferDraggables**: none.

**Figure additions**
- `EBD;polygon;triangle;E,B,D;0;0;0;0`, `FBD;polygon;triangle;F,B,D;0;0;0;0` targets.
- Angle markers: `angABD;sector;angleMarker;B,A,D`, `angCBD;sector;angleMarker;B,C,D`, `angBED;sector;angleMarker;E,B,D`, `angBFD;sector;angleMarker;F,B,D`. (~ ABD/CBD share B.)
- aliases: `"DE": "ED"`, `"DF": "FD"`, `"DG": "GD"`, `"FGE": "EFG"`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABC} be the given triangle. | ABC, A, B, C | ABC | — | — | |
| 2 | It is required to inscribe a circle in the triangle {ABC}. | (inherit) | ABC | — | — | |
| 3 | Bisect the angles {ABC\|angABD} and {ACB\|CD} by the straight lines {BD} and {CD}, and let these meet one another at the point {D}. | + BD, CD, D, angABD, angCBD | BD, CD, D | angABD "Sector.sweep"; BD "Line.straightEdgeConnect"; CD "Line.straightEdgeConnect"; D "Point.appear" | bisect an angle — I.9 | |
| 4 | Draw {DE}, {DF}, and {DG} from {D} perpendicular to the straight lines {AB}, {BC}, and {CA}. | + ED, FD, GD, E, F, G | ED, FD, GD | ED "Line.straightEdgeConnect"; FD "Line.straightEdgeConnect"; GD "Line.straightEdgeConnect" (parallel) | perpendiculars from a point — I.12 | |
| 5 | Now, since the angle {ABD} equals the angle {CBD}, and the right angle {BED} also equals the right angle {BFD}, {EBD} and {FBD} are two triangles having two angles equal to two angles and one side equal to one side, namely that opposite one of the equal angles, which is {BD} common to the triangles, therefore they will also have the remaining sides equal to the remaining sides, therefore {DE} equals {DF}. | + angBED, angBFD, EBD, FBD | angABD, angCBD, angBED, angBFD, EBD, FBD, BD | angBED "Sector.sweep"; angBFD "Sector.sweep" | two angles and a side — I.26 | |
| 6 | For the same reason {DG} also equals {DF}. | − angle markers, EBD, FBD | GD, FD | — | — | |
| 7 | Therefore the three straight lines {DE}, {DF}, and {DG} equal one another. Therefore the circle described with center {D} and radius one of the straight lines {DE}, {DF}, or {DG} also passes through the remaining points and touches the straight lines {AB}, {BC}, and {CA}, because the angles at the points {E}, {F}, and {G} are right. | + EFG | ED, FD, GD, EFG | EFG "Circle.compass" | — | |
| 8 | For, if it cuts them, the straight line drawn at right angles to the diameter of the circle from its end will be found to fall within the circle, which was proved absurd, therefore the circle described with center {D} and radius one of the straight lines {DE}, {DF}, or {DG} does not cut the straight lines {AB}, {BC}, and {CA}. Therefore it touches them, and is the circle inscribed in the triangle {ABC}. | (inherit) | EFG, ABC | — | perpendicular at the end of a diameter falls outside — III.16; inscribed — IV.Def.5 | |
| 9 | Let it be inscribed as {FGE}. Therefore the circle {EFG} has been inscribed in the given triangle {ABC}. | (inherit) | EFG, ABC | — | Q.E.F. | |

Notes: the prose names angle ACB on slide 3 but the argument never uses it again, so no marker; `{ACB|CD}` binds the hover to the bisector instead. Slide 8 is long but is one sentence of the proof; per the split rule it stays whole.
