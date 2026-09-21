# IV.16 — To inscribe an equilateral and equiangular fifteen-angled figure in a given circle

Canvas: `canvas_0`. Existing: F, G (hidden free); pentagon (outline, hidden labels); A, B vertices; circ; duppent (filled copy); O center (hidden); Acirc (hidden); PQ bichord (hidden); P, Q (hidden); C, D extend; ACD triangle; OE' bisector (hidden); E' (hidden); E cutoff; fifteen (regularPolygon B,E,15, outline).

**deferDraggables**: F, G are hidden (`;0`) and drive the figure; they are not prose points. Leave as is.

**Figure additions**
- `AC;line;connect;A,C;0;0;0`, `AB;line;connect;A,B;0;0;0`, `BE;line;connect;B,E;0;0;0`, `EC;line;connect;E,C;0;0;0`.
- Circumference targets (centre O): `arcABC;sector;sector;O,A,C;0;0;0;0`, `arcAB;sector;sector;O,A,B;0;0;0;0`, `arcBC;sector;sector;O,B,C;0;0;0;0`, `arcBE;sector;sector;O,B,E;0;0;0;0`, `arcEC;sector;sector;O,E,C;0;0;0;0`.
- aliases: `"ABCD": "circ"`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABCD\|circ} be the given circle. | circ | circ | — | — | |
| 2 | It is required to inscribe in the circle {ABCD\|circ} a fifteen-angled figure which shall be both equilateral and equiangular. | (inherit) | circ | — | — | |
| 3 | Inscribe a side {AC} of an equilateral triangle and a side {AB} of an equilateral pentagon in the circle {ABCD\|circ}. | + A, C, AC, ACD, D, B, AB, pentagon | AC, ACD, AB, pentagon | A, C "Point.appear"; AC "Line.straightEdgeConnect"; ACD "Polygon.outline"; B "Point.appear"; AB "Line.straightEdgeConnect"; pentagon "Polygon.outline" | equilateral triangle — IV.2; pentagon — IV.11 | the triangle and pentagon appear whole (fatigue rule); they are the *context* for the sides, and Joyce's figure draws both |
| 4 | Therefore, of the equal segments of which there are fifteen in the circle {ABCD\|circ}, there will be five in the circumference {ABC\|arcABC} which is one-third of the circle, and there will be three in the circumference {AB\|arcAB} which is one-fifth of the circle. Therefore in the remainder {BC\|arcBC} there will be two of the equal segments. | + arcABC, arcAB, arcBC; − ACD, pentagon | arcABC, arcAB, arcBC | — | — | wedge highlight (README); the "fifteen equal segments" have no element until the figure is drawn |
| 5 | Bisect {BC\|arcBC} at {E}. Therefore each of the circumferences {BE\|arcBE} and {EC\|arcEC} is a fifteenth of the circle {ABCD\|circ}. | + E, arcBE, arcEC; − arcABC, arcAB | E, arcBE, arcEC | E "Point.appear" | bisect a circumference — III.30 | |
| 6 | If therefore we join {BE} and {EC} and continually fit into the circle {ABCD\|circ} straight lines equal to them, a fifteen-angled figure which is both equilateral and equiangular will be inscribed in it. | + BE, EC, fifteen; − arcs | BE, EC, fifteen | BE, EC "Line.straightEdgeConnect"; fifteen "Polygon.outline" | fit a line into a circle — IV.1; Q.E.F. | "continually fit" — a repeated-chord animation does not exist; the fifteen-gon outlines in one stroke. Acceptable, or a `Polygon.outline` that traces vertex by vertex from B would say it better (possible geomlib ask, low priority) |

Notes: the shortest deck in the book, and the one where the figure does the least of the proof's work. The corollary section (tangents → circumscribed fifteen-gon; inscribed/circumscribed circles) has no canvas; no deck.
