# IV.14 — To circumscribe a circle about a given equilateral and equiangular pentagon

Canvas: `canvas_0` (pivot F). Existing: C, D free; CDEAB; E, A, B vertices; circ circumcircle; F center; AF, BF, CF, DF, EF.

**deferDraggables**: none.

**Figure additions**
- Angle markers: `angFCD;sector;angleMarker;C,F,D`, `angCDF;sector;angleMarker;D,C,F`.
- aliases: `"FB": "BF"`, `"FA": "AF"`, `"FE": "EF"`, `"FC": "CF"`, `"FD": "DF"`, `"ABCDE": "CDEAB"` for the pentagon; the circle at the end is `{ABCDE|circ}`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCDE\|CDEAB} be the given pentagon, which is equilateral and equiangular. | CDEAB, A, B, C, D, E | CDEAB | — | — | |
| 2 | It is required to circumscribe a circle about the pentagon {ABCDE\|CDEAB}. | (inherit) | CDEAB | — | — | |
| 3 | Bisect the angles {BCD} and {CDE} by the straight lines {CF} and {DF} respectively. Join the straight lines {FB\|BF}, {FA\|AF}, and {FE\|EF} from the point {F} at which the straight lines meet to the points {B}, {A}, and {E}. | + angFCD, CF, angCDF, DF, F, BF, AF, EF | CF, DF, F, BF, AF, EF | angFCD "Sector.sweep"; CF "Line.straightEdgeConnect"; angCDF "Sector.sweep"; DF "Line.straightEdgeConnect"; F "Point.appear"; BF, AF, EF "Line.straightEdgeConnect" | bisect an angle — I.9 | |
| 4 | Then in manner similar to the preceding it can be proved that the angles {CBA}, {BAE}, and {AED} are also bisected by the straight lines {FB\|BF}, {FA\|AF}, and {FE\|EF} respectively. | (inherit) | BF, AF, EF | — | as in IV.13 | |
| 5 | Now, since the angle {BCD} equals the angle {CDE}, and the angle {FCD} is half of the angle {BCD}, and the angle {CDF} half of the angle {CDE}, therefore the angle {FCD} also equals the angle {CDF}, so that the side {FC\|CF} also equals the side {FD\|DF}. | (inherit) | angFCD, angCDF, CF, DF | — | equal angles, equal sides — I.6 | |
| 6 | Similarly it can be proved that each of the straight lines {FB\|BF}, {FA\|AF}, and {FE\|EF} also equals each of the straight lines {FC\|CF} and {FD\|DF}. Therefore the five straight lines {FA\|AF}, {FB\|BF}, {FC\|CF}, {FD\|DF}, and {FE\|EF} equal one another. | − angle markers | AF, BF, CF, DF, EF | — | — | |
| 7 | Therefore the circle described with center {F} and radius one of the straight lines {FA\|AF}, {FB\|BF}, {FC\|CF}, {FD\|DF}, or {FE\|EF} also passes through the remaining points, and is circumscribed. | + circ | F, circ | circ "Circle.compass" | — | |
| 8 | Let it be circumscribed, and let it be {ABCDE\|circ}. Therefore a circle has been circumscribed about the given equilateral and equiangular pentagon. | (inherit) | circ, CDEAB | — | Q.E.F. | |

Notes: `F;point;center;circ;;black;green` in the source has an empty colour field (`;;`) — worth checking it parses as intended (`nameColor` empty string) at implementation; not a deck matter.
