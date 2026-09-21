# IV.3 — To circumscribe about a given circle a triangle equiangular with a given triangle

Canvas: `canvas_0`. Existing: B, K free; BK; circle ABC; D, E, F free; DEF; H, G sliders on EF; HF, EG; A', A (similar + cutoff); AK; C', C; CK; Atan/Btan/Ctan (hidden tangents); M, N, L intersections; LMN; ABCdup.

**deferDraggables**: H, G (produced on slide 3).

**Figure additions**
- `EF;line;connect;E,F;0;0;0` target (prose produces *EF*; HF and EG are the produced pieces).
- `LM;line;connect;L,M;0;0;0`, `MN;line;connect;M,N;0;0;0`, `NL;line;connect;N,L;0;0;0` — the tangents as named segments (LMN is the filled result).
- `AMBK;polygon;quadrilateral;A,M,B,K;0;0;0;0` target.
- Angle markers: `angBKA;sector;angleMarker;K,B,A`, `angDEG;sector;angleMarker;E,D,G`, `angBKC;sector;angleMarker;K,B,C`, `angDFH;sector;angleMarker;F,D,H`, `angKAM;sector;angleMarker;A,K,M`, `angKBM;sector;angleMarker;B,K,M`, `angAMB;sector;angleMarker;M,A,B`, `angDEF;sector;angleMarker;E,D,F`, `angLNB;sector;angleMarker;N,L,B`, `angDFE;sector;angleMarker;F,D,E`, `angMLN;sector;angleMarker;L,M,N`, `angEDF;sector;angleMarker;D,E,F`. (⚠ BKA/BKC share K; DEG/DEF share E; DFH/DFE share F.)
- aliases: `"LAM": "LM"`, `"MBN": "MN"`, `"NCL": "NL"`, `"KA": "AK"`, `"KB": "BK"`, `"KC": "CK"`, `"AKB": "angBKA"`.

| # | Slide text | Shown / hidden | Highlighted | Animation (mode) | Justs | Not yet implemented |
|---|---|---|---|---|---|---|
| 1 | Let {ABC} be the given circle, and {DEF} the given triangle. | ABC, DEF, D, E, F, B, K, EF | ABC, DEF | — | — | |
| 2 | It is required to circumscribe a triangle equiangular with the triangle {DEF} about the circle {ABC}. | (inherit) | DEF, ABC | — | — | |
| 3 | Produce {EF} in both directions to the points {G} and {H}. Take the center {K} of the circle {ABC}, and draw a radius {KB} at random. | + EG, HF, G, H, BK | EG, HF, K, BK | EG "Line.straightEdgeExtend"; HF "Line.straightEdgeExtend"; K "Point.appear"; BK "Line.straightEdgeConnect" | centre of a circle — III.1 | |
| 4 | On the straight line {KB} and at the point {K} on it, construct the angle {BKA} equal to the angle {DEG}, and the angle {BKC} equal to the angle {DFH}. | + angDEG, angBKA, A, AK, angDFH, angBKC, C, CK | angDEG, angBKA, angDFH, angBKC | angDEG "Sector.sweep"; angBKA "Sector.sweep"; A "Point.appear"; AK "Line.straightEdgeConnect"; angDFH "Sector.sweep"; angBKC "Sector.sweep"; C "Point.appear"; CK "Line.straightEdgeConnect" | angles constructed equal — I.23 | |
| 5 | Through the points {A}, {B}, and {C} draw {LAM}, {MBN}, and {NCL} touching the circle {ABC}. | + LM, MN, NL, L, M, N; − angle markers | LM, MN, NL | LM "Line.straightEdgeConnect"; MN "Line.straightEdgeConnect"; NL "Line.straightEdgeConnect" | tangents at A, B, C — III.16,Cor | |
| 6 | Now, since {LM}, {MN}, and {NL} touch the circle {ABC} at the points {A}, {B}, and {C}, and {KA}, {KB}, and {KC} have been joined from the center {K} to the points {A}, {B}, and {C}, therefore the angles at the points {A}, {B}, and {C} are right. | + angKAM, angKBM | AK, BK, CK, angKAM, angKBM | angKAM "Sector.sweep"; angKBM "Sector.sweep" | radius ⟂ tangent — III.18 | |
| 7 | And, since the four angles of the quadrilateral {AMBK} equal four right angles, inasmuch as {AMBK} is in fact divisible into two triangles, and the angles {KAM} and {KBM} are right, therefore the sum of the remaining angles {AKB} and {AMB} equals two right angles. | + AMBK, angBKA, angAMB | AMBK, angBKA, angAMB | AMBK "Polygon.outline"; angAMB "Sector.sweep" | — | |
| 8 | But the sum of the angles {DEG} and {DEF} also equals two right angles, therefore the sum of the angles {AKB} and {AMB} equals the sum of the angles {DEG} and {DEF}, of which the angle {AKB} equals the angle {DEG}, therefore the remaining angle {AMB} equals the remaining angle {DEF}. | + angDEG, angDEF; − AMBK | angDEG, angDEF, angBKA, angAMB | angDEF "Sector.sweep" | adjacent angles on a line — I.13 | |
| 9 | Similarly it can be proved that the angle {LNB} also equals the angle {DFE}, therefore the remaining angle {MLN} equals the angle {EDF}. | + angLNB, angDFE, angMLN, angEDF; − angKAM, angKBM, angBKA, angAMB, angDEG, angDEF | angLNB, angDFE, angMLN, angEDF | angLNB "Sector.sweep"; angDFE "Sector.sweep"; angMLN "Sector.sweep"; angEDF "Sector.sweep" | remaining angles — I.32 | |
| 10 | Therefore the triangle {LMN} is equiangular with the triangle {DEF}, and it has been circumscribed about the circle {ABC}. Therefore a triangle equiangular with the given triangle has been circumscribed about a given circle. | + LMN; − angle markers | LMN, DEF, ABC | LMN "Polygon.outlineAndFill" | circumscribed — IV.Def.4; Q.E.F. | |

Notes: `ABCdup` (a second, face-filled copy of the circle) exists so the circle's fill paints above the triangle; keep it in every slide's visible set alongside ABC. Twelve angle markers is a lot; slides 9 drops the earlier ones so at most four are lit at once.
