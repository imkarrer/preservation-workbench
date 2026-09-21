# IV.1 — To fit into a given circle a straight line equal to a given straight line which is not greater than the diameter of the circle

Canvas: `canvas_0` (300×240). Existing elements: B, C free; BC; O midpoint; circle ABC; D0/D3 hidden anchors; D1, D2 sliders; line D; E cutoff; circle AEF; bichord A'A; A last; AC; F perpendicular (hidden).

**deferDraggables**: none (B, C, D1, D2 are all givens on slide 1).

**Figure additions**
- alias `"EAF": "AEF"` (prose says circle *EAF*), `"CE": "CEseg"` — add `CEseg;line;connect;C,E;0;0;0` as an invisible target so `{CE}` can light the radius.
- alias `"CA": "AC"`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABC} be the given circle, and {D} the given straight line not greater than the diameter of the circle. | ABC, D, D1, D2, B, C | ABC, D | — | — | |
| 2 | It is required to fit a straight line into the circle {ABC} equal to the straight line {D}. | (inherit) | ABC, D | — | — | |
| 3 | Draw a diameter {BC} of the circle {ABC}. | + BC, O | BC | BC "Line.straightEdgeConnect" | diameter through the centre — III.1 | |
| 4 | If {BC} equals {D}, then that which was proposed is done, for {BC} has been fitted into the circle {ABC} equal to the straight line {D}. | (inherit) | BC, D | — | — | |
| 5 | But, if {BC} is greater than {D}, make {CE} equal to {D}, describe the circle {EAF} with center {C} and radius {CE}, and join {CA}. | + E, CEseg, AEF, A, AC | E, AEF, AC | E "Point.appear"; AEF "Circle.compass"; A "Point.appear"; AC "Line.straightEdgeConnect" | CE cut off equal to D — I.3 | |
| 6 | Then, since the point {C} is the center of the circle {EAF}, {CA} equals {CE}. | (inherit) | C, AEF, AC, CEseg | — | radii of one circle — I.Def.15 | |
| 7 | But {CE} equals {D}, therefore {D} also equals {CA}. | (inherit) | CEseg, D, AC | — | — | |
| 8 | Therefore {CA} has been fitted into the given circle {ABC} equal to the given straight line {D}. | (inherit) | AC, ABC, D | — | fitted into the circle — IV.Def.7; Q.E.F. | |

Notes: slide 4 is a case with no construction — it stays on the same visible set; the highlight alone carries it. The hidden helper `F` (perpendicular) is Joyce's original placement aid and stays hidden throughout.
