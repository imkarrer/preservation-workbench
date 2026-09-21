# IV.10 — To construct an isosceles triangle having each of the angles at the base double the remaining one

Canvas: `canvas_0`. Existing: A, B free; AB; circle BDE; G, K, F (hidden II.11 helpers); C cutoff; Bcirc (hidden); DD' bichord (hidden); D first; BD, CD, AD; ACDE circumcircle; ABD triangle; DE bichord (hidden); E last.

**deferDraggables**: none.

**Figure additions**
- `BC;line;connect;B,C;0;0;0`, `CA;line;connect;C,A;0;0;0` targets (rectangle *AB by BC*, square on *CA*).
- `ACD;polygon;triangle;A,C,D;0;0;0;0` target.
- Angle markers: `angBDC;sector;angleMarker;D,B,C`, `angDAC;sector;angleMarker;A,D,C`, `angCDA;sector;angleMarker;D,C,A`, `angBCD;sector;angleMarker;C,B,D`, `angCBD;sector;angleMarker;B,C,D`, `angBDA;sector;angleMarker;D,B,A`. (⚠ BDC/CDA/BDA share D — BDA is the sum; give it the larger radius.)
- aliases: `"BA": "AB"`, `"DC": "CD"`, `"DBA": "angCBD"`, `"DBC": "angCBD"`, `"CAD": "angDAC"`, `"DAB": "angDAC"`, `"ACD": "ACDE"` where it means the circle — prose uses *ACD* for both the circle and the triangle; the triangle gets `{ACD|ACD}` (the added polygon) and the circle `{ACD|ACDE}`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Set out any straight line {AB}, and cut it at the point {C} so that the rectangle {AB} by {BC} equals the square on {CA}. | AB, A, B, C, BC, CA | AB, C, BC, CA | AB "Line.straightEdgeConnect"; C "Point.appear" | cut so that rectangle = square — II.11 | II.11's construction is not walked — C appears with the citation (the fatigue rule; the helpers G, K, F stay hidden as in Joyce's figure) |
| 2 | Describe the circle {BDE} with center {A} and radius {AB}. | + BDE | BDE, A, AB | BDE "Circle.compass" | — | |
| 3 | Fit in the circle {BDE} the straight line {BD} equal to the straight line {AC\|CA} which is not greater than the diameter of the circle {BDE}. | + D, BD | BD, CA | D "Point.appear"; BD "Line.straightEdgeConnect" | fit a line into a circle — IV.1 | |
| 4 | Join {AD} and {DC}, and circumscribe the circle {ACD\|ACDE} about the triangle {ACD\|ACD}. | + AD, CD, ACD, ACDE, E | AD, CD, ACDE | AD "Line.straightEdgeConnect"; CD "Line.straightEdgeConnect"; ACDE "Circle.compass" | circumscribe about a triangle — IV.5 | |
| 5 | Then, since the rectangle {AB} by {BC} equals the square on {AC\|CA}, and {AC\|CA} equals {BD}, therefore the rectangle {AB} by {BC} equals the square on {BD}. | (inherit) | AB, BC, CA, BD | — | — | |
| 6 | And, since a point {B} was taken outside the circle {ACD\|ACDE}, and from {B} the two straight lines {BA\|AB} and {BD} fall on the circle {ACD\|ACDE}, and one of them cuts it while the other falls on it, and the rectangle {AB} by {BC} equals the square on {BD}, therefore {BD} touches the circle {ACD\|ACDE}. | (inherit) | B, ACDE, AB, BD | — | tangent–secant — III.37 | |
| 7 | Since, then, {BD} touches it, and {DC} is drawn across from the point of contact at {D}, therefore the angle {BDC} equals the angle {DAC} in the alternate segment of the circle. | + angBDC, angDAC | BD, CD, angBDC, angDAC | angBDC "Sector.sweep"; angDAC "Sector.sweep" | tangent–chord angle — III.32 | |
| 8 | Since, then, the angle {BDC} equals the angle {DAC}, add the angle {CDA} to each, therefore the whole angle {BDA} equals the sum of the two angles {CDA} and {DAC}. | + angCDA, angBDA | angBDC, angDAC, angCDA, angBDA | angCDA "Sector.sweep"; angBDA "Sector.sweep" | — | |
| 9 | But the exterior angle {BCD} equals the sum of the angles {CDA} and {DAC}, therefore the angle {BDA} also equals the angle {BCD}. | + angBCD; − angBDC | angBCD, angCDA, angDAC, angBDA | angBCD "Sector.sweep" | exterior angle — I.32 | |
| 10 | But the angle {BDA} equals the angle {CBD}, since the side {AD} also equals {AB}, so that the angle {DBA\|angCBD} also equals the angle {BCD}. | + angCBD; − angCDA, angDAC | angBDA, angCBD, AD, AB, angBCD | angCBD "Sector.sweep" | base angles of an isosceles triangle — I.5 | |
| 11 | Therefore the three angles {BDA}, {DBA\|angCBD}, and {BCD} equal one another. | (inherit) | angBDA, angCBD, angBCD | — | — | |
| 12 | And, since the angle {DBC\|angCBD} equals the angle {BCD}, the side {BD} also equals the side {DC\|CD}. | (inherit) | angCBD, angBCD, BD, CD | — | equal angles, equal sides — I.6 | |
| 13 | But {BD} equals {CA} by hypothesis, therefore {CA} also equals {CD}, so that the angle {CDA} also equals the angle {DAC}. Therefore the sum of the angles {CDA} and {DAC} is double the angle {DAC}. | + angCDA, angDAC; − angBDA, angCBD | BD, CA, CD, angCDA, angDAC | — | — I.5 | |
| 14 | And the angle {BCD} equals the sum of the angles {CDA} and {DAC}, therefore the angle {BCD} is also double the angle {CAD\|angDAC}. But the angle {BCD} equals each of the angles {BDA} and {DBA\|angCBD}, therefore each of the angles {BDA} and {DBA\|angCBD} is also double the angle {DAB\|angDAC}. | + angBDA, angCBD | angBCD, angDAC, angBDA, angCBD | — | — | |
| 15 | Therefore the isosceles triangle {ABD} has been constructed having each of the angles at the base {DB\|BD} double the remaining one. | + ABD; − angle markers except angBDA, angCBD, angDAC | ABD, angBDA, angCBD, angDAC | ABD "Polygon.outlineAndFill" | Q.E.F. | |

Notes: Joyce's first sentence is three constructions in one; split into slides 1–3 by verb ("Set out … cut", "Describe", "Fit"), each keeping his words. The II.11 cut is the one place a full construction is skipped; IV.10 is the first use of II.11 in Book IV, so Nelson may prefer the walk shown once (the hidden helpers G, K, F are already in the figure, zero-colored).
