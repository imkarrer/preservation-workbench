# geomlib internals: what the seams actually are

Research note for ADR 0002 ("deck as data, not a new kernel").
Primary sources only: `/home/nixos/src/euclid` at commit `795ea3f`
(package version 0.16.0). Every claim cites `file:line` in that checkout.
No web sources. The node-canvas native module does not load in this
environment (`libuuid.so.1` missing), so nothing below was verified by
running the test suite; where a test is cited, it is cited as source code
that CI runs (`package.json` `test:unit`), not as something I executed.

Question being answered: ADR 0002 says the deck document "can be introduced
ADDITIVELY because `init()` already takes an object". Is that true, and
what are the real seams?

Short answer: **mostly true for the element list, true-with-one-caveat for
animations, and false for three fields.** `IInitialization` is 90% plain
data today. The 10% that is not (a callback, two numeric enums, and one
enum-or-string union) is exactly where a JSON deck needs an upstream
change. Geometry computation is already separable from drawing at the
`Slate` level (there is a test-only flag that proves it), but the drawing
methods live on the element classes, so a headless kernel is "Slate with
`inTest = true`", not a separate module. There is no serialization path at
all.

---

## 1. `init()` and the shape of `IInitialization`

`init(i: IInitialization)` is at `src/index.ts:474-497`; the body is
`initInner` at `src/index.ts:499-688`. The interface is
`src/index.ts:249-310`. Field by field, with JSON survivability:

| Field | Type (src/index.ts) | JSON-safe? | Notes |
|---|---|---|---|
| `background` | `string` (250) | yes | Parsed by `parseColor` at 523; H,S,B triples like `"35,19,100"` accepted. |
| `title` | `string` (251) | yes | **Required by the type but never read.** No `i.title` reference anywhere in `src/`; `SlateControls` copies the config into `_config` (SlateControls.ts:204) and never touches `.title`. api.md:114 says "Stored on the Slate" — it is not. |
| `align?` | `Align` enum (252, enum at `src/elements/GeomElement.ts:21-27`) | **number only** | Numeric enum `CENTRAL=0 … BELOW=4`. No string→`Align` lookup exists (`grep 'Align\['` over `src/` is empty). A JSON deck would have to carry `0..4` or the consumer must map names itself. |
| `canvasid?` | `string` (253) | yes | Defaults to `"canvasid"` (475). |
| `pivot?` | `string` (254) | yes | `"P"` or `"P,plane"` — a mini-DSL parsed in `Slate.setPivot` (Slate.ts:1103-1121). |
| `centerOn?` | `string` (257) | yes | |
| `font?`, `fontsize?` | `string`, `number` (258-259) | yes | Set **globally** via static `GeomElement.setFont` (520; GeomElement.ts:72-75) — the last `init()` on a page wins for every slate. |
| `width?`, `height?` | `number` (263-264) | yes | **Undocumented in api.md** (api.md:83-108 omits them). Logical coordinate size (#71). |
| `elements` | `(IConstructionInfo \| string)[]` (265) | **partly** | See §1.2. The string form is JSON-safe; the object form carries a numeric enum. |
| `aliases?` | `{[from: string]: string}` (271) | yes | |
| `deferDraggables?` | `string[]` (278) | yes | |
| `initiallyHidden?` | `string[]` (283) | yes | |
| `showAngles?` | `boolean` (288) | yes | |
| `highlightOnTop?` | `boolean` (294) | yes | |
| `slides?` | `ISlide[]` (299) | **partly** | See §1.1 and §2. Only `transition.animations[].name` is non-JSON when authored with `A.*`. |
| `resolveJustification?` | `(ref: string) => string \| null \| undefined` (304) | **no — a function** | Consumed only at render time in `SlateControls.showSlide` (SlateControls.ts:800, 829). |
| `animationConfig?` | `IAnimationConfig` (309; interface 234-247) | yes | All primitives and string-keyed maps. But see §1.3: `rates` is dead code. |

So the non-JSON fields are exactly three: `align` (numeric enum),
`resolveJustification` (function), and `IConstructionInfo.construction`
(numeric enum) — plus `ISlideAnimation.name` when authored as an enum.

### 1.1 Animation names: enum or string?

`ISlideAnimation` is `src/index.ts:210-215`:

```ts
export interface ISlideAnimation {
    elem: string;
    name: AllAnimations | string;
    args?: any;
    durationMs?: number;
}
```

`AllAnimations` is a numeric enum (`src/elements/Animations.ts:23-41`); `A`
is a constants object over it (Animations.ts:45-75). **But the registry is
keyed both ways.** `registerAnimation` (Animations.ts:167-170) inserts every
animation into `animationsByEnum` *and* `animationsByName`, and
`findAnimation(ref: AllAnimations | string)` (Animations.ts:180-188)
branches on `typeof ref === "string"`. Both consumers of a slide's
animation name go through `findAnimation`:

- runtime: `SlateAnimator.run` at `src/SlateAnimator.ts:128`
- load-time validation: `validateSlides` at `src/index.ts:81`

The registered string names (each class's `public name`) are:

| String | File:line |
|---|---|
| `"instant"` | Animations.ts:146 |
| `"Point.appear"`, `"Point.slide"`, `"Point.followPath"` | point/PointAnimations.ts:16, 57, 179 |
| `"Line.straightEdgeConnect"`, `"Line.straightEdgeExtend"` | line/LineAnimations.ts:41, 57 |
| `"Circle.compass"`, `"Circle.compassTransfer"` | circle/CircleAnimations.ts:32, 114 |
| `"Polygon.outline"`, `"Polygon.outlineAndFill"`, `"Polygon.superpose"`, `"Polygon.equilateralBuild"` | polygon/PolygonAnimations.ts:40, 72, 138, 293 |
| `"Sector.sweep"` | sector/SectorAnimations.ts:29 |
| `"Group.cloneAside"` | group/GroupAnimations.ts:198 |

Note the bare `"instant"` — it does NOT follow the `Type.method` shape
(no namespace), unlike `A.instant`.

The string form is exercised by tests: `tests/DiagnosticsTest.ts:317`
passes `name: "Line.straightEdgeConnect"` through a real `init()` and
asserts zero diagnostics; `tests/SlateAnimatorTest.ts:135` passes an
unknown string and asserts the instant fallback. **String animation names
are a working, tested code path today**, even though the docs only ever
show `A.*` (api.md:868-877, animations-reference.md:5-10).

Enum entries marked `// future` (`POINT_INTERSECT`, `LINE_COMPASS_TRANSFER`,
`CIRCLE_COMPASS_EXPLICIT`, Animations.ts:26, 31, 33) have no registered
class, so `findAnimation` returns null for them and the animator reports
`unknown-animation` (SlateAnimator.ts:129-140). Same behaviour as a typo.

Animation `args` are all plain data. The only fields any animation reads
are `to`, `toElement`, `via`, `along`, `arc`, `settle` (PointAnimations),
`startAngle`, `side`, `keepCircles` (CircleAnimations), `onto`
(PolygonAnimations), `reverse` (SectorAnimations), `include`, `autoPlace`,
`dx`, `dy`, `vary`, `variants` (GroupAnimations.ts:195-222). `vary` is
`{ elem, to: number }` (GroupAnimations.ts:130-131). Nothing takes a
function.

### 1.2 Constructions: enum or string?

`IConstructionInfo` is `src/index.ts:169-177`; `construction:
IndexAllConstructions` is the union of eight numeric enums
(`src/elements/Constructions.ts:31-126, 161-169`). `E` is just the eight
enums in an object (Constructions.ts:150-159).

There are two string paths and neither is a bare name→enum function:

1. **Whole-element param string.** `elements` accepts
   `"A;point;free;125,130"` and `initInner` calls `parseParam` on any
   string entry (`src/index.ts:544`). `parseParam` (322-367) maps the
   lowercase Java type through a **module-private** `typeMap`
   (313-317: `"polyhedron" → "Polyhedra"`, etc.), then does
   `(e as any)[typeKey][enumKey]` with one special case
   (`"3points" → "threePoints"`, 340). This is the only name→enum lookup in
   the codebase, and it is not exposed separately from the
   semicolon-delimited grammar.
2. **Enum reverse mapping.** Because the enums are numeric TypeScript
   enums, `E.Point["free"] === 1` and `E.Point[1] === "free"` at runtime
   for free; `getConstructionName(cm)` (Constructions.ts:128-148) uses the
   reverse direction to render `"Point.free"` for error messages. It is
   not exported from `index.ts` (the export list is index.ts:22-25, 30,
   32, 45, 142, 322, 408, 438, 453, 474).

A JSON deck could therefore ship elements as **param strings** today with
zero upstream change, at the cost of the deck being a string-in-a-string
DSL. A structured object form (`{type: "point", construction: "free"}`)
needs a small upstream addition: either widen `construction` to
`AllConstructions | string` and resolve with the `typeMap` logic already
inside `parseParam`, or export a `constructionFromName("Point.free")`.

`params` (`any[]`, 172) are strings (element names) and numbers only;
`convertParams` throws on anything else (`Slate.ts:805-806`). Note the
#155 subtlety at Slate.ts:780-790: a string that names nothing but
parses as a number is coerced to an integer arg, and name lookup wins
over numeric coercion. A schema must allow `"50"` as a param.

Colours (`nameColor` … `faceColor`, `string | number`) are JSON-safe;
numeric `0` means transparent (api.md:176).

### 1.3 `IAnimationConfig` — one dead field and one doc/code mismatch

`rates` is declared (index.ts:240) and documented as step 3 of the
duration chain (architecture.md:487, api.md:889, api.md:905-907,
animations-reference.md:34). **No code reads it.** `grep -rn rates src`
finds only comments (SlateAnimator.ts:161, CircleAnimations.ts:15,
LineAnimations.ts:12). `resolveDuration` (SlateAnimator.ts:491-495) checks
only the slide override and `config.durations[animation.name]`
(SlateAnimator.ts:169).

Further, `durations` is looked up by the animation's **string** name
(`animation.name`, SlateAnimator.ts:169) but api.md:901 shows the map keyed
by the enum value: `{ rates: { [A.Circle.compass]: 0.0021 } }`. That key
is `"8"`, which never matches `"Circle.compass"`. So in the published docs
the example is doubly inert. For a JSON deck this is good news: the
*working* key is already the string name.

`reducedMotion`'s comment says the default "reads prefers-reduced-motion
CSS media query at init()" (index.ts:245). Nothing does: the only reads are
the interface (index.ts:246) and `config.reducedMotion === true`
(SlateAnimator.ts:110). architecture.md:434-436 repeats the claim.

---

## 2. The slide surface

### 2.1 Schema

`ISlide` (`src/index.ts:222-228`) is exactly five fields; nothing else is
read anywhere:

```ts
export interface ISlide {
    text: string;
    visible?: string[];
    highlighted?: string[];
    justifications?: ISlideJust[];
    transition?: ISlideTransition;
}
```

- `ISlideJust` = `{ ref: string; claim?: string }` (183-192).
- `ISlideTransition` = `{ mode?: "cascade" | "parallel"; animations?: ISlideAnimation[] }` (217-220). Anything other than `"parallel"` becomes cascade (SlateControls.ts:768-769).
- `ISlideAnimation` as in §1.1.

The consumer of a slide is `SlateControls.showSlide` (SlateControls.ts:743-847),
which reads `slide.transition`, `slide.text`, `slide.justifications`, and
calls `computeSlideState` for `visible`/`highlighted`. There is no
`id`, `notes`, `duration`, or per-slide camera field.

### 2.2 `visible` inheritance and the auto-unions

`computeSlideState(slate, slides, index)` in `src/slideshow.ts:72-106` is a
pure function of (slate elements, slide array, index):

1. Walk backwards from `index` to the nearest slide whose `visible != null`
   and take that array (slideshow.ts:80-86). If none, the base is `[]`
   (78) — i.e. the walk starts with everything hidden.
2. Resolve each name through `canonicaliseSlideNames` (33-54), which
   follows one alias hop via `slate.lookupElement` and keeps unmatched
   names in the set (so they still match nothing) while reporting them
   as `unknown-slide-name` diagnostics (110-128).
3. `highlighted` is **not** inherited: it is `slide.highlighted || []`
   (93).
4. Every element with `draggable === true` is unioned into `visible`
   unless its name is in `slate.deferredDraggables` (97-102).
5. Every highlighted name is unioned into `visible` (103).

Consequence for a static exporter: the effective visible set of slide *n*
is not derivable from slide *n* alone; it needs the slide array up to *n*
**and** the slate's draggable/deferred sets and alias table. The
dependency is on the constructed figure, not just the deck text. Any
"deck document" validator that wants to reproduce geomlib's visible set
must replicate steps 1-5 or call into geomlib.

### 2.3 `{NAME}` caption tokens

Grammar is `CAPTION_RE` (SlateControls.ts:109-113): `{element}` or
`{display|element}` where the element half is `[A-Za-z][A-Za-z0-9'\-]*`
and the display half is anything without `{`, `}` or `|`.
`parseCaptionTokens` (115-135) is a pure, exported tokenizer.
Resolution is at render time in `renderCaptionText` (861-877): each
token's target goes through `slate.lookupElement` (alias-aware); a hit
becomes a `<span>` whose hover/pointerdown toggles `elem.emphasized`
(879-908); a miss renders the display text with braces stripped (874) and
is **not** reported as a diagnostic — unlike `visible`/`highlighted`/`elem`
names, caption typos are silent. `validateSlides` (index.ts:73-123) does
not scan `text`.

`claim` on a justification takes no `{NAME}` tokens (api.md:509); it is
emitted via `textContent` (SlateControls.ts:821).

---

## 3. Renderer coupling

### 3.1 Where the canvas is touched

`GeomElement` (`src/elements/GeomElement.ts`) declares four abstract draw
methods that take the canvas — `drawName`, `drawFace`, `drawEdge`,
`drawVertex` (206-209) — plus `drawString` (129-189), which calls
`c.getContext("2d")`, `measureText`, `fillText`, and reads `c.width` /
`c.height` for CENTRAL label placement (160-161). The geometry contract is
separate: `update()` (199, abstract), `reset()` (200), `defined()` (201),
`drag()` (202), `translate()` / `rotate()` (204-205).

Every element subclass gets its context the same way, inside its own draw
methods. The full list of `getContext("2d")` call sites in
`src/elements/` is:

- GeomElement.ts:130 (`drawString`)
- point/PointElement.ts:392 (`drawVertex`)
- line/LineElement.ts:55 (`drawEdge`)
- line/PolylineElement.ts:44, 91
- circle/CircleElement.ts:150, 179, 195
- polygon/PolygonElement.ts:74, 122, 162
- polygon/CurvedTriangleElement.ts:130, 143
- sector/SectorElement.ts:99, 220
- plane/PlaneElement.ts:73, 91, 120
- sphere/SphereElement.ts:59, 80
- polyhedron/PolyhedronElement.ts:71

All are inside `draw*` methods. **No `update()`, `construct()`, `drag()`,
`translate()` or `rotate()` touches the context**: grepping
`src/elements/` for `width|height` outside `lineWidth`, text metrics and
`c.width/c.height` returns nothing. There is no separate hit-test method on
elements; picking is `Slate.closestVisiblePoint` (Slate.ts:1062-1087),
pure 2-D distance over `PointElement.x/y` filtered by `vertexColor != null`.

Type-level note: `LineElement.drawEdge` and `PolygonElement.drawEdge` are
typed `c: HTMLCanvasElement` (LineElement.ts:43, PolygonElement.ts:61)
while the base declares `SlateCanvas = HTMLCanvasElement | Canvas`
(Slate.ts:15). It compiles because `strictNullChecks` is off and the tests
cast; a stricter refactor would trip here.

### 3.2 Can geometry run headless?

Yes, and the mechanism is already in the tree — it is just marked as a
test hook:

- `Slate.update()` is `for each element: element.update(); this.drawElements()`
  (Slate.ts:861-864).
- `drawElements()` begins `if (this.inTest) return;` (Slate.ts:867).
  `inTest` is a public field (Slate.ts:150) defaulting to false.
- `Slate.createElement` → `convertParams` → `findConstruction` →
  `construct(screen, P, E, N)` (Slate.ts:821-852) never touches the
  canvas.

So a slate with `inTest = true` computes every position and draws nothing.
Nine test files rely on this (e.g. `tests/SlateAnimatorTest.ts:20`,
`tests/SlideTest.ts:368`, `tests/DiagnosticsTest.ts:23`). Even the
animator runs headless: `SlateAnimator` falls back to `setTimeout` when
`requestAnimationFrame` is absent (SlateAnimator.ts:49, 343-352), and every
frame's `drawElements()` call is a no-op under `inTest`.

What the `Slate` constructor still needs from its canvas argument
(Slate.ts:154-244):

- non-null, or it throws (159-160);
- `.width` / `.height` for `logicalWidth`/`logicalHeight` fallbacks
  (418-419) and `displayWidth`/`displayHeight` (428-435);
- `.addEventListener` is optional — the constructor returns early before
  wiring pointer events if it is null (195). node-canvas has none, so this
  is the headless branch.
- `dispatchEvent` / `CustomEvent` are capability-checked before use
  (929-930, 1030-1031).

A `{ width, height }` literal would satisfy the constructor for a
compute-only pass. Tests use `createCanvas(w, h) as any` (node-canvas).

### 3.3 What `init()` needs that `Slate` does not

`init()` itself is not headless: it calls `document.getElementById`
unconditionally (index.ts:476) and `syncBitmapToDisplaySize`
(index.ts:511 → CanvasSizing.ts:37-53), which reads `clientWidth`. The
diagnostics suite proves `init()` can be driven under Node by stubbing
`global.document = { getElementById }` and handing it a node-canvas
(`tests/DiagnosticsTest.ts:261-283`), but that path assigns
`canvas.width = Math.round(undefined * 1)` = `NaN` on a node-canvas
(CanvasSizing.ts:38-43). It works for diagnostics because nothing after
that reads the bitmap for correctness; it is not a supported headless
render.

`createControls` is skipped when `canvas.parentElement` is falsy
(index.ts:685, SlateControls.ts:153), so all DOM overlay code is already
behind a guard.

### 3.4 What is NOT exported

`Slate`, `computeSlideState`, `findAnimation`, `getConstructionName`, and
`canonicaliseSlideNames` are not re-exported from `src/index.ts`
(export list at index.ts:22-25, 30, 32, 45, 142, 322, 408, 438, 453, 474).
The webpack bundle exposes only that entry as global `geomlib`
(webpack.config.js:57-61, `libraryTarget: 'var'`), and the npm package
ships only `dist/bundle.js` + map (package.json `files`; no `types`
field). A downstream Node tool therefore **cannot** build a headless Slate
from the published artifact today. It can only do so from a source
checkout — which is how every test does it.

### 3.5 Snapshot rendering bypasses `drawElements`

`tests/SnapshotHelper.ts:buildScene` (29-104) constructs a slate from
param strings, and `renderScene` (109-128) re-implements the four-pass
draw loop (face → edge → vertex → name, with `promotedDrawOrder`) directly
against a node-canvas rather than calling `slate.drawElements()`. The
architecture doc acknowledges this duplication (architecture.md:460-463).
It means there are two hand-kept copies of the draw order, which is
exactly the kind of thing a kernel/renderer split would remove.

---

## 4. Serialization, export, diagnostics

**There is no serialization path.** `grep -rn 'toJSON\|JSON\.\|serializ\|toDataURL' src` returns nothing. No method on `Slate` or
`GeomElement` returns positions in bulk; a consumer would read
`slate.elements[i].x/y/z` (PointElement.ts:46-50) per element. Parent
references are private per subclass (`_A`, `_B` on Midpoint.ts:20-21;
`_A`/`_B` with getters on LineElement.ts:29-34) with no uniform
`parents()` accessor, so even the dependency edges are not enumerable
without per-class knowledge.

The one bulk read of scene geometry is `Slate.figureBounds()` /
`visibleBounds()` (Slate.ts:463-486), used for centring.

**Diagnostics (#154)** are the closest thing to a structural validator:

- `IDiagnostic` (`src/Diagnostics.ts:23-38`) is plain data
  (`severity`, `code`, `message`, `detail?`, `at`, `count`).
  `Diagnostics.ts` has no DOM or Slate import (Diagnostics.ts:12-14).
- `validateSlides(slate, slides)` (index.ts:73-123) runs at `init()`
  time and resolves every `visible`, `highlighted`, and `elem` name plus
  every animation name, honouring `declaredNames()` for names a macro
  creates later (#159, index.ts:75-85; Animations.ts:137).
- `geomlib.diagnostics(opts?)` (index.ts:142-167) aggregates per-slate
  entries plus `initDiagnostics` (438) page-wide.
- Codes emitted from source: `unknown-slide-name`, `unknown-element`
  (index.ts:95, 112; slideshow.ts:120; SlateAnimator.ts:118),
  `unknown-animation`, `animation-type-mismatch` (SlateAnimator.ts:133,
  145), `unknown-color` (index.ts:533), `bad-animation-args`
  (PointAnimations.ts:252, 281, 299, 319, 330), `init-failed` (index.ts:486), and
  test-side `unparseable-element`, `construction-failed`
  (SnapshotHelper.ts:54, 69).

Two gaps for a "validate without rendering" use:

1. `validateSlides` is **module-private** (not exported) and only runs
   inside `init()`, which needs `document`. There is no
   `validate(IInitialization): IDiagnostic[]` entry point.
2. Construction failures (`convertParams` throwing `Element with name X
   not found`, Slate.ts:790; `Construction not found`, Slate.ts:832) are
   **thrown, not reported**, in `initInner` — the whole `init()` aborts
   at the first bad element (index.ts:477-496 catches and records a single
   `init-failed`). Only the snapshot test helper turns them into
   per-element diagnostics (SnapshotHelper.ts:63-76). So a deck with two
   bad elements gets one error naming neither.

---

## 5. `update()` and the dependency graph

The documented contract (architecture.md:600-614) — idempotent, read
only stored parent refs, write only own coordinates — matches what the
elements do (e.g. Midpoint.ts:33-36).

**Ordering is implicit in `_elements` order.** `Slate.update()` iterates
`this._elements` in insertion order (Slate.ts:862). Insertion happens in
`createElement` (Slate.ts:845-850): first the construction's
`elementsForUpdate` list (`gs`), then the primary element `g` if not
already present, both deduped by identity. Constructions return
intermediates before the primary — e.g. `[[ad, g], g]`,
`[[lo, g], g]` in LineConstructions.ts:67, 215 — so intermediates update
first. Correctness rests entirely on "parents were declared earlier",
which is guaranteed because `convertParams` can only resolve names
already in `_elements` (Slate.ts:778).

`updateCoordinates(i)` (Slate.ts:1042-1049) is the drag-time fast path:
it updates only elements at index `> i` (the picked point's index,
Slate.ts:1125). This is a **prefix-skip, not a topological cut** — an
element after `i` that does not depend on the pick is still recomputed,
and an element before `i` is assumed unaffected. Java parity
(Slate.java 808-814 per the comment).

`rotateCoordinates` (1158-1196) and `translateCoordinates` (1051-1060)
walk `_elements` and skip `preexists` entries, then call `update()` — the
`preexists` heuristic (Slate.ts:840-842, architecture.md:229-247) is the
port's known footgun and is not something a declarative graph would
carry.

**Is the DAG exportable?** Not without new code. The edges exist only as
private fields set in each subclass constructor
(architecture.md:604 says "stored parent element references (set in the
constructor)"), with no reflection hook. The *declaration-level* graph —
element name → the names in its `params` — is fully recoverable from the
`IConstructionInfo[]` alone (params are element names or numbers,
Slate.ts:771-810) and is what a deck document would carry anyway. Line
auto-expansion (a `LineElement` param becomes its two endpoint points,
Slate.ts:794-797) means the runtime graph has more edges than the
declared one.

---

## 6. Doc vs. code discrepancies

| Doc claim | Code | Status |
|---|---|---|
| architecture.md:163-168, 608: elements for update go on `slate._elementsForUpdate`; `update()` iterates it | No such field: `grep _elementsForUpdate src` is empty. Everything goes into `_elements` (Slate.ts:845-850) and `update()` iterates `_elements` (862). | **Stale.** The doc describes an earlier design; the "key invariants" at 229-232 that distinguish the two lists are moot. |
| architecture.md:487, api.md:889/905-907, animations-reference.md:34: `rates[name] × geometry` is step 3 of duration resolution | `rates` never read (§1.3). | **Dead field documented as live.** |
| api.md:901: `animationConfig: { rates: { [A.Circle.compass]: 0.0021 } }` | `durations` (the live map) is keyed by string `animation.name` (SlateAnimator.ts:169). Enum-keyed maps never match. | **Example would silently do nothing** even if `rates` were read. |
| index.ts:245 comment, architecture.md:434-436: `reducedMotion` defaults from `prefers-reduced-motion` | No media-query read anywhere in `src/`. | **Not implemented.** |
| api.md:114: `title` "Stored on the Slate" | Never read after `init()`; `Slate` has no title field. | **Inert required field.** |
| api.md:83-108 `IInitialization` listing | Omits `width?`/`height?` (index.ts:263-264). | **Doc incomplete.** |
| api.md:77 "Defined at src/index.ts:97" | `init` is at index.ts:474. | Stale line ref. |
| api.md:403 `interface ISlideJust { ref: string; }` | Has `claim?` too (index.ts:183-192); api.md:475-478 later shows it. | Internally inconsistent. |
| architecture.md:368-373 animation table lists 6 classes | 14 registered (§1.1). | Stale; animations-reference.md is the fuller list. |
| architecture.md:415 "small (~150 line)" SlateAnimator | 495 lines. | Stale. |
| api.md:868-877 and animations-reference.md show only `A.*` enum names | `findAnimation` accepts strings, tested (§1.1). | **Undocumented but real** — the seam ADR 0002 needs. |
| Animations.ts:15-16 comment: string name "used for the string-form fallback (param strings)" | `parseParam` has no animation support; there is no param-string form for slides. | Aspirational comment. |

Nothing in the docs contradicts the *separability* reading above; the
docs simply do not discuss headless use at all beyond the snapshot note
(architecture.md:460-463).

---

## Implications for ADR 0002

**Is "additive" honest?** For the geometry half, yes with no caveats: a
JSON `elements` array of param strings is accepted by `init()` today
(index.ts:544), and the object form is JSON-safe except for the numeric
`construction` value. For the deck half, yes with one small caveat: string
animation names already work and are tested, but they are undocumented,
so relying on them is relying on an internal that upstream has not
promised. For the three remaining fields, no — a JSON document cannot
express `resolveJustification` (a function), and can express `align` and
`construction` only as opaque integers.

The ADR's sentence "string animation names sit beside the enums" is
correct as a description of the code (Animations.ts:164-188); it should
cite that it is an undocumented path.

**Minimal upstream changes for a JSON deck** (in dependency order, each
small enough for a single PR):

1. **Document string animation names** as a supported form of
   `ISlideAnimation.name`, with the name table from §1.1. Zero code; makes
   the existing seam a contract. Fix api.md:901 to key `durations` by
   string while there, and either implement or delete `rates`.
2. **Accept a string for `IConstructionInfo.construction`** — e.g.
   `"Point.free"` — by hoisting the lookup that `parseParam` already does
   (index.ts:334-344, using `typeMap` and the `3points` alias) into an
   exported `constructionFromName()` and calling it in `initInner` when
   `typeof param.construction === "string"`. About 15 lines. Alternative
   with zero code: the deck carries `"A;point;free;125,130"` strings —
   works today but the document is then two nested grammars.
3. **Accept a string for `align`** (`"CENTRAL"` … `"BELOW"`), via the
   enum's reverse mapping. Trivial; or the schema carries `0..4`.
4. **Replace `resolveJustification` with data** in the deck: the deck
   keeps `ref` strings (already the case, index.ts:183-192); the *page*
   supplies the resolver at `init()` time. No upstream change needed —
   this is a consumer-side split, and the deck stays pure data. Worth
   stating explicitly in the ADR so nobody tries to serialize it.
5. **A validator entry point that does not need `document`**: export
   `validateSlides` (or a new `validate(config)`) so a build step can run
   the #154 checks on a headless `Slate`. Requires `Slate` to be
   constructible from the package, which today means either exporting it
   from `index.ts` or shipping the `.d.ts`/ESM source (package.json
   `files` currently excludes both). Also change `initInner` to report
   per-element `construction-failed` diagnostics instead of throwing on
   the first (mirror SnapshotHelper.ts:63-76), or a validator will only
   ever surface one error per deck.

Items 1-3 make the document *expressible*; item 5 makes it *checkable*.
A schema can be written and validated externally (JSON Schema over the
shape in §1-2) before any of these land, but it cannot reproduce
geomlib's name-resolution semantics (aliases, deferred names,
draggable auto-union) without calling geomlib — which is item 5.

**What is NOT separable today:**

- Drawing is on the element classes, not in a renderer module
  (§3.1). "Headless" means `Slate.inTest = true`, a test flag with no
  API contract, not a kernel. The ADR's "elements draw themselves with a
  canvas context today" is accurate.
- The effective visible set per slide depends on the constructed figure
  (draggables, deferred draggables, aliases — §2.2), so an exporter for
  static SVG/Manim must either construct the figure with geomlib or
  re-implement `computeSlideState`.
- Element positions after `update()` are readable only by walking
  `slate.elements` and reading per-class getters; there is no
  `toJSON`/snapshot (§4). An exporter will have to write that walker,
  and it needs to handle the `preexists`/line-expansion quirks (§5).
- The font is process-global (`GeomElement.setFont`, index.ts:520), so
  two decks with different fonts on one page — or one headless process
  validating many decks — share state. Minor, but a schema field that
  looks per-deck is not.
- `parseParam`'s numeric coercion rule (#155: `"1 "` with whitespace is a
  name, `"1"` is a number, and name lookup wins over numeric — index.ts:
  354-357, Slate.ts:780-790) is a semantic a schema cannot express as a
  type; it has to be documented as a rule.

Recommendation for the ADR text: keep "additive", but replace "because
`init()` already takes an object" with the specific list — string param
elements and string animation names are accepted now; string
construction names, string align, and a headless validator are the
upstream asks; `resolveJustification` stays outside the document by
design.
