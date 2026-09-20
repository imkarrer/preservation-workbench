---
status: findings
date: 2026-09-20
sources: primary only — local checkouts of brownnrl/euclids-elements-lektor (main @ 8064616) and brownnrl/euclids-elements.org (main @ 504daa4, gh-pages @ 5518258), plus their GitHub issues via `gh api`. No web search. The brownnrl/euclid (geomlib) repo was NOT read; claims about geomlib internals are marked as unverified.
---

# The Lektor content pipeline for euclids-elements.org

Research to check ADR 0002 (`docs/adr/0002-deck-as-data-not-a-new-kernel.md`)
against what Nelson Brown has actually built and said he plans. Every claim
cites a file path (relative to the named checkout) or an issue URL.

Checkouts referenced below:

- `lektor/` = `/home/nixos/src/euclids-elements-lektor`
- `org/` = `/home/nixos/src/euclids-elements.org`

## TL;DR

1. **The "structured-field refactor" is already done, except for one word.**
   README's M4 bullet ("promote `proposition.model`'s markdown `body` into
   structured fields (statement / diagrams / proof / guide)") was written
   2026-06-02 (`git blame lektor/README.md:173-177` → commit 0bf8a471). Four
   days later, commit d76be03 (2026-06-06, "props: sections flow field
   replaces statement/proof/body — single source of truth") shipped
   `statement` / `proof` / `guide` as fields of a `prop_section` flow block.
   The README was never updated. The only word in that parenthetical that was
   never realised is **diagrams**: the `geomlib.init({...})` `<script>` still
   sits inside the `proof:` markdown field of the flow block.
2. **Nelson has never described a data format for decks.** The only sketches
   are a `[!slide elements="…"]` markdown shortcode (lektor#5, abandoned) and
   the JS `transition:{…}` literal (lektor#7 closing comment, which is what
   shipped). When he closed the roadmap (lektor#6, 2026-08-30) he wrote:
   "Remaining work is per-book deck authoring, now tracked one issue per book,
   rather than architecture."
3. **He does, however, already generate decks from data** for the two
   `/geomlib/` reference pages: `lektor/scripts/gen-reference/anims.py` holds
   slides as Python tuples with string animation names, and
   `build_animations.py` `json.dumps` them into an inline `geomlib.init`
   script, emitting `geomlib.A.<name>` for the enum. That is the closest
   existing precedent to ADR 0002, and it is his own tooling.
4. **Publishing:** `www.euclids-elements.org` is GitHub Pages serving the
   `gh-pages` branch of `org/` (confirmed via `gh api repos/…/pages`:
   `source.branch = "gh-pages"`, last build 2026-09-17 from 5518258 "Lektor
   Bot — Synchronized build"). `org/main` is the frozen hand-edited HTML tree
   (last commit 2026-05-28) and its README's "GitHub Pages serves the `main`
   branch" is stale.
5. **62 of 465 propositions have decks** (Book I: 48, Book II: 14; Books
   III–XIII: 0). 28 of those 62 build `visible` sets with `var` + `.concat()`;
   all 62 reference animations as `geomlib.A.*` enums (zero string names); all
   62 carry `//` comments inside the script.
6. **Every tool that touches decks is a regex over `contents.lr`** followed by
   `vm.runInContext` against the real bundle with node-canvas. A JSON deck
   would need changes to `check-decks.js`, `check-captions.py`, the
   `gen-reference` generators, `doc/process.md`, and (depending on placement)
   `lektor-eucrefs` and `templates/proposition.html`. `elem-ref-highlight.js`,
   `check-versions.js`, `publish.sh`, `deploy-preview.sh` and the
   `geomlib_default` pin would not change.

---

## 1. Content model

### Models (`lektor/models/*.ini`)

| Model | Markdown fields | Other fields | Notes |
|---|---|---|---|
| `proposition` | none directly | `title`, `short_label`, `geomlib_version` (per-page pin override), `red_highlight`, `order`, **`sections` (type = flow, `flow_blocks = prop_section`)** | `lektor/models/proposition.ini` |
| `prop_section` (flow block) | **`proof`** (markdown, "Construction & proof"), **`guide`** (markdown, "Guide / discussion") | `kind` (select: proposition/lemma/corollary/note/remark), `label`, `anchor`, `statement` (html), `toc_summary` (html), `red_highlight` | `lektor/flowblocks/prop_section.ini` |
| `definition`, `postulate`, `commonnotion` | `guide` | `title`, `short_label`, `statement` (html), `order`, `red_highlight`, `group` (definition/commonnotion only), `subsection` (definition only) | `lektor/models/definition.ini`, `postulate.ini`, `commonnotion.ini` |
| `definition_group`, `commonnotion_group` | `guide` | `title` | hidden bundle pages |
| `book` | `guide` | `title`, `order`, `short_description`, `subsections` (flow → `book_subsection`) | `lektor/models/book.ini` |
| `section_index`, `toc`, `prematter_index` | `body` is **html** | `child_model` (section_index) | |
| `prematter`, `other_work`, `page` | `body` (markdown) | `title`, `short_label`/`order` (other_work) | |
| `subject_index` | `body` (markdown, optional intro) | `title` | entries come from `lektor/databags/subject_index.json` via `bag('subject_index')` in `lektor/templates/subject_index.html:6` |

`prop_section.ini`'s own header comment states the design intent: "The
template handles ALL the box scaffolding (`<div class="theorem">`, `<h1>`,
`<div class="statement">`); author content is just markdown in `proof` and/or
`guide`. … future works can introduce scholia, porisms, etc. by extending the
choice list."

`proof`'s description in the same file: "Markdown body for proof-style
sections (proposition, lemma, corollary). Marginal justifications still use raw
`<div class="just">…</div>` inline." (In practice pages use the `[!just …]`
directive from lektor-eucrefs; see §3.)

**Stale doc:** `lektor/doc/content-model.md:56-61` still says "`proposition`
adds two markdown fields: `proof` … `body`" and lists "Two markdown body fields
on proposition (`proof` + `body`)" under "Things that diverge from vanilla"
(`:157`). That text is from 2026-05-30 (blame 9c5f2c4f), predates d76be03,
and was not corrected in the 2026-08-29 doc scrub (last commits touching the
file: 12706f7, 2ccfbbb, 394f606 — all subject-index edits).

### Where the geomlib script lives

**Inside the `proof:` markdown field of a `prop_section` flow block**, as a
raw-HTML `<figure class="diagram">` containing `<canvas>`, `<noscript><img>`
and `<script type="text/javascript">geomlib.init({...})</script>`. There is no
dedicated field, no Jinja block, no template helper. Mistune passes the raw
HTML block through untouched (`lektor/doc/content-model.md:99-101`, "Lektor's
Mistune does NOT process markdown inside raw HTML blocks").

Corpus counts (grep over `lektor/content/`, 2026-09-20):

- `geomlib.init` blocks in content: **726**
- `contents.lr` files with `_model: proposition`: **466** (465 real
  propositions + `lektor/content/geomlib/example/contents.lr`, a demo page
  that uses the proposition model)
- proposition pages containing `slides:`: **63** (48 bookI + 14 bookII + the
  example page)

The figure's *position inside the prose* is load-bearing. `doc/conventions.md:32`:
"Place the figure at the TOP of the subsection it belongs to … If you put it
after the prose, it floats down". And ref binding depends on DOM order
(§3, `elem-ref-highlight.js`): "The nearest canvas *preceding* the span —
latest-preceding first" (`doc/conventions.md:101-115`). So any refactor that
moves the script out of the markdown must still emit the `<figure>` at the
same point in the rendered HTML, or add explicit `:canvas_N` selectors to
every affected `{NAME}` ref.

The only thing the template contributes is the version pin:
`lektor/templates/layout.html:1-2`:

```jinja
{% set geomlib_default = "0.16.0" %}
{% set geomlib_version = (this.geomlib_version or geomlib_default) %}
```

which feeds `<script src="https://cdn.jsdelivr.net/npm/@brownnrl/geomlib@{{ geomlib_version }}/dist/bundle.js">`
(or `/geomlib-dev.js` when the `geomlib_local` Jinja global is set by
`lektor-eucrefs`'s `on_setup_env` from env var `EUCLIDS_GEOMLIB_LOCAL`) and
`<meta name="geomlib-version">`.

### `templates/proposition.html`

The whole page is driven by `this.sections.blocks`. Per block: `<div class="theorem">`,
`<h1 id="{{ anchor }}">`, optional `<div class="statement">`, then `{{ s.proof }}`
(rendered markdown, which is where the figure comes out), then `{{ s.guide }}`
for note/remark kinds. After all boxes, `<h2 id="guide">Guide</h2>` + the
proposition section's `guide`. Then `refs.ref_table(this)` (reverse citation
index from lektor-eucrefs). File: `lektor/templates/proposition.html`.

### A real page: `lektor/content/elements/books/bookI/propositions/propI5/contents.lr` (272 lines)

Headings and script skeleton only (line numbers from the file):

```
1   _model: proposition
3   title: Proposition 5
5   order: 5
7   short_label: I.5
9   sections:
11  #### prop_section ####
12  kind: proposition
14  statement: In isosceles triangles the angles at the base equal one another, …
16  proof:
      Let {ABC} be an isosceles triangle having the side {AB} equal to … [!just I.Def.20; I.Post.2]
      I say that the angle {ABC|angBint} equals the angle {ACB}, …
      [!just I.3; I.Post.1]
      Take an arbitrary point {F} on {BD}. …
26    <figure class="diagram">
27    <canvas id="canvas_0" width="300" height="350" tabindex="0"></canvas>
28    <noscript><img alt="I.5 diagram" src="propI5.gif"/></noscript>
29    <script type="text/javascript">
30    geomlib.init({
31        canvasid: "canvas_0",
32        background: "35,19,100",
33        title: "I.5",
34        pivot: "M",
35        elements: [ …52 "name;type;ctor;args;colours" strings, with // comments… ],
93        deferDraggables: ["F"],
100       aliases: { "ACB": "angCint", … "GB": "BG" },
116       slides: [
            { text: "Let {ABC} be …", visible: ["ABC"], highlighted: ["AB","AC"],
              justifications: [{ ref: "I.Def.20" }] },
            { text: "…", visible: […], transition: { animations: [
                  { elem: "BD", name: geomlib.A.Line.straightEdgeExtend }, … ] },
              justifications: [{ ref: "I.Post.2" }] },
            …18 slides…
222       ],
223       resolveJustification: function(ref) { return (window.eucrefs && window.eucrefs[ref]) || null; }
226   });
230   window.eucrefs = (window.eucrefs || {});
      Object.assign(window.eucrefs, { "I.Def.20": "/elements/books/bookI/definitions/defI20/", … });
239   </script>
240   </figure>
      Since {AF} equals {AG}, … (rest of the proof prose, with [!just …])
      <div class="qed">Q.E.D.</div>
255 ----
256 guide:
      There are two conclusions for this proposition, …
264 #### Pappus' proof
270 #### Use of Proposition 5
```

Note three things a JSON document cannot carry as-is: the `//` comments (all
62 decks have them), the `geomlib.A.*` enum references (all 62), and the
`resolveJustification` function plus `window.eucrefs` side-effect (all 62 —
the per-page citation URL map is hand-authored in every deck even though
lektor-eucrefs already resolves the same tokens at build time).

A no-deck page for contrast, `lektor/content/elements/books/bookIII/propositions/propIII1/contents.lr`:
same shape, `elements:` only (15 lines), no `slides`, no `aliases`, no
`eucrefs`; it also shows a second `prop_section` of `kind: corollary`.

---

## 2. What Nelson means by "the structured-field refactor of proposition.model"

Note first that euclids-elements.org#15, #16, #17 were **transferred** to the
lektor repo and are now lektor#4, #5, #6 (fetching
`repos/brownnrl/euclids-elements.org/issues/17` returns the body of
https://github.com/brownnrl/euclids-elements-lektor/issues/6, and lektor#4's
first comment says "Transferred from `brownnrl/euclids-elements.org#15`").

### Every place the phrase or idea appears

1. **lektor#1** (Milestone 2, 2026-05-30), "Out of scope (later milestones)":
   > "Refactoring `proposition.model` from raw HTML body into structured
   > fields — deferred until we have enough volume to see the patterns."
   https://github.com/brownnrl/euclids-elements-lektor/issues/1

   Closing comment (2026-06-07): "The model surface has converged on `book` /
   `section_index` / `definition` / `definition_group` / `postulate` /
   `commonnotion` / `commonnotion_group` / `proposition` (**with a `sections`
   flow field driving multi-box props**)."

2. **README.md** (`lektor/README.md:10-13`, `:173-177`, both from commit
   0bf8a471 on 2026-06-02):
   > "the next phase (cross-highlighting prose↔canvas, animated proof
   > step-throughs) needs the structured-field refactor of `proposition.model`
   > called out in the roadmap below."
   >
   > "**M4 — structured-field refactor** (next) — promote `proposition.model`'s
   > markdown `body` into structured fields (statement / diagrams / proof /
   > guide) so Phase 4a (cross-highlighting prose↔canvas) and Phase 4b
   > (animated step-throughs) can compose against the data model."

3. **Commit d76be03** (2026-06-06) did it:
   > "New data model for propositions: one `sections` flow field carries any
   > number of prop_section blocks (kind = proposition | lemma | corollary |
   > note | remark), each with its own statement, proof, guide, label, anchor,
   > red_highlight. … authors write markdown only — no embedded
   > `<div class="theorem">` wrappers. … `scripts/migrate_props.py` converted
   > all 448 simple props … This is the foundation for adopting structured
   > fields across other works (Apollonius, Archimedes) per the long-term
   > roadmap."

4. **org#13** (Phase 2 SSG goals), which is the origin of the idea:
   > "Joyce's narrative content lives as repo-only markdown / structured
   > content, not buried in HTML. **geomlib canvas embeds work via a template
   > helper rather than raw `<script>` blocks duplicated across hundreds of
   > files.** The data model and templates are shaped so Phase 4 work … is
   > additive, not invasive."
   https://github.com/brownnrl/euclids-elements.org/issues/13

   Closing comment (2026-06-07): "the data model is structured (proposition
   `sections` flow field, `definition_group` bundles, bookX subsection-restart
   numbering) and the geomlib canvas embed is a per-page template-friendly
   block."

   The "template helper" goal was **not** met — there are 726 raw
   `geomlib.init` `<script>` blocks in `lektor/content/`. The closing
   comment's "per-page template-friendly block" describes the `<figure
   class="diagram">` raw-HTML convention (`doc/conventions.md:9-23`), not a
   helper.

5. **lektor#6** roadmap closing comment (2026-08-30):
   > "All four phases are done … **4b** slideshow presentation mode — shipped;
   > Book I's 48 propositions each step through their proof. **4c** animated
   > transitions — #7, closed. … Remaining work is per-book deck authoring,
   > now tracked one issue per book, rather than architecture. Closing this as
   > a roadmap that has been travelled."
   https://github.com/brownnrl/euclids-elements-lektor/issues/6

**Reading:** Phase 4a/4b/4c were built *without* a "diagrams" field, directly
on the inline script inside `proof`. Nothing in any issue, commit or doc
after 2026-06-06 refers to a further refactor of `proposition.model`. The
README sentence you quoted is a stale pointer to work that shipped as
`sections`/`prop_section`. There is no open issue for a diagrams field.

### Does he describe any data format for decks?

No. Three sketches exist, and the one that shipped is JS:

- **lektor#5 (Phase 4b) body**, 2026-05-24: a markdown block shortcode
  > `[!slide elements="A,B,AB,BCD"]Describe the circle {BCD}…[!/slide]` …
  > "each `[!slide]` block emits a `<div class="slide" data-elements="…">`" …
  > "**Page-side controller** (`assets/js/presentation-mode.js`)"
  https://github.com/brownnrl/euclids-elements-lektor/issues/5

  Comment 2026-06-07: "The `[!step N]` markdown shortcode shape envisioned
  here would fit alongside the new `{NAME}` / `[!qed]` / `[!title]`
  shortcodes … The same plugin (`packages/lektor-eucrefs/lektor_eucrefs.py`)
  is the natural home when this comes up." — This was abandoned; no
  `[!slide]`/`[!step]` exists in `lektor_eucrefs.py` and no
  `presentation-mode.js` exists in `assets/js/`.

- **lektor#7 (Phase 4c) closing comment**, 2026-08-30 — the shipped shape:
  > "Rather than one global animated/instant toggle driving `Slate.animateTo`,
  > a slide declares its own transition:
  > ```javascript
  > transition: { mode: "cascade", animations: [
  >     { elem: "AB", name: geomlib.A.Line.straightEdgeConnect },
  >     { elem: "ABC", name: geomlib.A.Polygon.outlineAndFill } ] }
  > ```"
  https://github.com/brownnrl/euclids-elements-lektor/issues/7

- **Per-book issues** (lektor#20–#31, identical template, 2026-08-30) define
  the deck as: "a `slides` array where each slide carries `text` (the proof
  step, with `{NAME}` refs), `visible`, `highlighted`, a `transition` where a
  step is better shown than cut to, and `justifications` for the citations
  that step leans on. `initiallyHidden` for anything a later slide
  introduces." https://github.com/brownnrl/euclids-elements-lektor/issues/21

The deck "format" is therefore *the geomlib `init()` option object as
authored in JS*, documented by example in `doc/process.md` (planning table
columns: Slide text / Shown-hidden / Highlighted / Animation (mode) / Justs /
Not yet implemented).

### The one data-first precedent he did build: the subject index (lektor#3)

lektor#3 (2026-06-03) proposed moving the subject index out of a "~1500-line
HTML body" into JSON. His stated reasons are exactly ADR 0002's: "No
build-time validation", "Layout is template-driven", "A pass over the JSON
during the conversion catches typos cleanly", "Search / filter (future)
becomes trivial — ship the JSON to the client". It shipped as
`lektor/databags/subject_index.json` + `templates/subject_index.html` +
`scripts/check-subjindex.py` (gates `publish.sh`). `models/subject_index.ini`
records the rationale: "Held as HTML it was a 1500-line body that nothing could
validate and CSS could not see individual entries in."
https://github.com/brownnrl/euclids-elements-lektor/issues/3

He also explicitly scoped it: "This ticket is for the next-pass restructure
when a second subject index (or a need for search) makes the data-driven
version pay for itself." — i.e. he moves to data when a *second consumer*
appears. ADR 0002's exporters (SVG/Manim/GeoGebra) and second works
(Apollonius/Hilbert) are that second consumer.

### A second precedent: the `/geomlib/` reference pages are generated from data

`lektor/scripts/gen-reference/README.md`: "Two pages under `/geomlib/` are
generated rather than hand-written … Edit the spec files, never the generated
`contents.lr`." `anims.py` stores each deck as a tuple
`(elements, slides, target, args, duration, desc, note, (w,h))` where slides
are `(text, visible|'ALL', highlighted, [(elem, 'Point.appear', argsJS)])`
with **string** animation names. `build_animations.py:15-35` `json.dumps` the
text/visible/highlighted and emits `'{ elem: %s, name: geomlib.A.%s'` for the
enum. `emit_specs.py` writes a JSON file `[{id, w, h, elements, opts}]` that
`probe.js` reads. So a string↔enum mapping and a JSON figure spec already
exist in his tooling — for reference pages, not propositions.

---

## 3. Build-time tooling

### `lektor/scripts/check-decks.js` (198 lines)

- **What:** walks every `contents.lr` under `lektor/content/` containing
  `geomlib.init`; for each, extracts inline `<script>` bodies by regex
  (`scriptsOf`: `/<script[^>]*>([\s\S]*?)<\/script>/gi`, keeping those that
  include `geomlib.init`), builds a fresh `vm` sandbox with a fake `document`
  whose `getElementById` returns a node-canvas `createCanvas(400,300)`, runs
  the **real** `dist/bundle.js`, then runs each script, then calls
  `sandbox.geomlib.diagnostics()` and fails on any entry (exit 1). Pages
  under `geomlib/` without `slides:` are "reference pages": built, but deck
  diagnostics ignored.
- **Depends on:** `require("canvas")` (node-canvas, resolved via
  `NODE_PATH=../euclid/node_modules`), `EUCLID_REPO` env (default
  `../../euclid` relative to the script) for `dist/bundle.js`. Header comment:
  "decks compose `visible` sets from shared vars via `.concat()`, which a
  static scan cannot follow."
- **Where a JSON deck plugs in:** `scriptsOf(text)` is the seam. A sidecar or
  field-based deck would need a second loader that turns the data into an
  `init()` call (or a schema validation pass that runs *before* the vm step).
  The vm step should stay — it is what catches "a slide name that resolves to
  nothing" using the library's own `#154` diagnostics.

### `lektor/scripts/check-versions.js` (77 lines)

- **What:** reads `geomlib_default` from `templates/layout.html` and greps
  `content/ doc/ assets/ scripts/ README.md` for `@brownnrl/geomlib@X`; fails
  if any pin differs or the CDN host is not `cdn.jsdelivr.net`. Rationale in
  header: "A CDN snippet inside a markdown body can't be templated — Lektor
  doesn't run Jinja in content".
- **Depends on:** nothing but Node.
- **JSON deck impact:** none, unless the deck document carries a version
  field.

### `lektor/scripts/check-captions.py`

Not in the task list but it parses decks: `captions = re.findall(r'\{ text: "((?:[^"\\]|\\.)*)"', s)`
over the raw `contents.lr`, keyed on the `"slides:" in s` sentinel, and
checks each caption is an in-order word run of the proof/guide text
(threshold 0.92). Enforces the "captions carry Joyce's sentence" rule from
`doc/process.md`. Not wired into `publish.sh`; run by hand per book (PR #35
verification block: "0 paraphrased captions"). Its regex would need a JSON
reader.

### `lektor/scripts/publish.sh` (86 lines)

Order: `check-decks.js` (fails publish) → `check-versions.js` (fails) →
`check-subjindex.py` (fails) → `rm -rf build && lektor build` → verify
`index.html LICENSE COPYRIGHT.md elements/index.html geomlib/index.html`
exist → interactive `Type 'publish'` → `lektor deploy production`. Env:
`EUCLIDS_GEOMLIB_REPO` (default `../euclid`), `LEKTOR_BIN` (default
`~/venvs/lektor/bin/lektor`). The `production` target is
`ghpages+https://brownnrl/euclids-elements.org?cname=www.euclids-elements.org`
(`lektor/euclids-elements.lektorproject`). The project file says "Deploy
with scripts/publish.sh, NOT `lektor deploy` directly".

### `lektor/scripts/deploy-preview.sh` (116 lines)

Runs `check-subjindex.py` and `check-versions.js` as **warnings only**, then
`check-decks.js` (exit 1 blocks unless `SKIP_DECK_CHECK=1`; other exit codes
warn), builds, then in `$EUCLIDS_REPO` (default `../euclids-elements.org`)
creates an orphan branch, copies `build/` in, restores `wrangler.jsonc`,
`_worker.js`, `.assetsignore` from `origin/main` (needed or "CF Builds errors
with 'Missing entry-point'"), commits, and force-pushes `lektor/<branch>`.
Cloudflare Workers Builds then serves it at
`https://lektor-<branch>-euclids-elements-org.brownnrl.workers.dev/`.

### `lektor/packages/lektor-eucrefs/lektor_eucrefs.py` (571 lines)

- **`@TOKEN` citations** (`@I.5`, `@I.Def.10`, `@I.Post.3`, `@C.N.1`,
  `@X.Def.II.3`, `@I.15.Cor`) → `<a href="/elements/books/…">` via
  `resolve()`; unknown → `<a href="#unresolved-…">`.
- **`[!just …]`** block directive → `<div class="just">` hoisted before the
  `<p>` (`,` same line, `;` → `<br>`, parenthesised plain text allowed).
  `[!qed]`, `[!qef]`, `[!title …]` replace their paragraph.
- **`{NAME}` tokenization** — `ELEM_REF_RE`:
  `\{(?P<name>[A-Za-z][A-Za-z0-9'\-]*)(?:\|(?P<target>…))?(?::(?P<canvas>canvas_\d+(?:,canvas_\d+)*))?\}`.
  Renders `<span class="elem-ref" data-elem="{target or name}">{name}</span>`
  plus `data-canvas="canvas_1"` or `data-canvases="canvas_0,canvas_1"`.
  Underscores are excluded from names because Mistune's inline lexer stops at
  `_`. Implemented twice: as a custom inline rule `elem_ref` in
  `EucrefsInlineGrammar` (registered ahead of emphasis, with `{` added to the
  `text` stop set — lektor#19) and as a fallback in `EucrefsRendererMixin.text()`.
  Raw HTML blocks are not processed, so inside `<center>`/`<table>` authors
  write the `<span class="elem-ref">` by hand (`doc/process.md:106-109`).
- **`forward_refs()` / `referenced_by()`** Jinja globals: a memoised reverse
  index built by regexing `[!just]` tokens out of every `contents.lr`
  (`_build_reverse_index`), rendered by `templates/_macros_refs.html`.
- **`on_setup_env`** sets the `geomlib_local` Jinja global from
  `EUCLIDS_GEOMLIB_LOCAL`.
- Docstring closing note: "when adding Apollonius / Hilbert / Archimedes
  content later, register a second resolver under a different prefix scheme
  (e.g. `@Apol.II.4`) and dispatch on the prefix."
- **JSON deck impact:** none for tokenization. But this plugin is where Nelson
  said a slide/step shortcode would live (lektor#5 comment), so a
  `[!figure …]` directive that emits a `<figure>` from a data field/sidecar
  would go here.

### `lektor/packages/lektor-katex/lektor_katex.py` (96 lines) + `scripts/render-katex.js`

Renderer mixin intercepting `<div class="math display">…</div>` and
`<span class="math">…</span>` raw-HTML blocks, shelling out per block to
`node scripts/render-katex.js [--display]` (KaTeX 0.17.0, per-process
cache; prefers `~/.nvm/versions/node/v24.14.1/bin/node`). `render-katex.js`
grants `trust` only to `\htmlClass` and `\htmlData` so a formula can emit
`class="elem-ref" data-elem="AG"` and stay hoverable (used in II.10). No
deck impact.

### `lektor/packages/lektor-roman-slug-mimetypes/`

Registers `text/html` for `.I`…`.XIII` and `.1`…`.9` pseudo-extensions so
`defX.II.3/` serves as HTML on the dev server. No deck impact.

### `lektor/assets/js/elem-ref-highlight.js` (236 lines) — how refs bind to canvases

Runs on `DOMContentLoaded` + `setTimeout(0)` "so the inline
`<script>geomlib.init(...)</script>` tags inside each `<figure>` have actually
run". For every `span.elem-ref`:

1. `data-canvases="a,b"` → bind to each listed slate; hover calls
   `geomlib.highlightByName(name, on, {canvasids})` (geomlib ≥ 0.13, #130).
2. else `data-canvas="canvas_N"` → `findSlateByCanvasId` over
   `window.geomlib.slates` (matching `slate.canvas.id`, falling back to
   `slate._canvas`); `slate.lookupElement(name)`.
3. else **DOM order** — `rankSlatesByDomOrder`: slates whose canvas precedes
   the span, latest first; then following slates, earliest first; first slate
   with `lookupElement(name)` wins. (The header comment still describes the
   older "nearest enclosing div.theorem" rule; the code no longer does that.)

Hover sets `element.shouldHighlight` + `slate.update()`; `pointerdown`
toggles a sticky `.active`. The reverse direction listens per canvas for
geomlib's bubbling `geomlib:highlight` CustomEvent (`detail.highlighted:
[{name, aliases}]`) and toggles `.lit` on every bound span for that slate
(lektor#11).

Consequences for a deck document: this script cares only that (a) a
`<canvas id>` exists in the DOM where the prose expects it, and (b)
`geomlib.init` has run for it before `setTimeout(0)` fires. It does not read
the script text. A deck loaded from JSON would still satisfy it provided the
`init()` call is synchronous in an inline script (or the binding is deferred
until a fetch resolves — a behaviour change).

### `lektor/assets/js/ctor-source.js`

Reads `card.querySelector("figure script").textContent` to hand the figure to
CodePen on the `/geomlib/constructions/` page. Only reference pages; but it
is a third consumer that assumes the deck is literally the inline script
text.

---

## 4. Deck authoring state

### Numbers (`lektor/doc/deck-tracker.md:36-43`, verified against content)

| Scope | Props | Decks done |
|---|---|---|
| Book I | 48 | 48 (I.1–I.48) |
| Book II | 14 | 14 (II.1–II.14) |
| Books III–XIII | 403 | 0 |
| **Total** | **465** | **62** |

Per-book open issues for III–XIII: lektor#21–#31 (e.g. Book X: "115
propositions, 115 with a figure, 0 with a deck"). PR #15 (Book I) and PR #35
(Book II, "200 slides, 24 commits") are the two deck deliveries. Book II was
built with `ISlideJust.claim` (euclid#146, geomlib 0.14) and captions
tightened mid-way ("Captions carry Joyce's sentence, not a paraphrase of it").

Book I tracker rows are long; typical `Slides` values 6–22, several pages with
two decks (I.10, I.11, I.20, I.23, I.31, I.46, I.47: proposition canvas +
guide "construction steps" canvas). `deck-tracker.md:20-34` carries an
"Angle-markers column (the #91 coupling)" flagging every deck that "becomes
rework when [euclid]#91 lands" — a second, explicit statement that decks are
coupled to library releases.

### `lektor/doc/process.md` — workflow (summarised)

1. Read the proof and existing figure.
2. Split the proof into slides ("typically one clause or sentence per slide").
3. Fill in the **planning table** and "review it with the author **before
   implementing**".
4. Implement: figure additions, `slides:` array, prose **and guide** `{NAME}`
   refs, aliases, `window.eucrefs`.
5. Verify (checklist), commit.
6. "**Only if the Not yet implemented column has entries**: geomlib issue →
   feature branch → PR → test the deck against the dev bundle
   (`EUCLIDS_GEOMLIB_LOCAL=1`) → release → bump the `geomlib_default` pin in
   `templates/layout.html`. … it is the only pin to change."

Authoring rules that a data format must be able to express (each has a
"caught on I.xx" story): the fatigue rule (constructions shown in full once,
then assumed); only the proposition canvas gets slides except guide-canvases
that are themselves proofs; **prose is read-only** ("Don't add words to the
guide or proof prose … tokenizing words that are already there … is fine,
adding words is not"); captions are Joyce's sentences, tokenized, "split
rather than compress"; zero-colour invisible highlight targets; an omitted
`faceColor` is opaque near-white, so outlines need explicit `;0`; **slide
sets take canonical names only — aliases are inert there**; `deferDraggables`
for points introduced mid-walk vs derived points that must be listed
explicitly; angle markers via `angleMarker` (0.8.0+); `claim` on
justifications from Book II on; animation catalogue (`A.Line.straightEdgeConnect`,
`straightEdgeExtend`, `A.Circle.compass`, `A.Point.appear`,
`A.Polygon.outline/outlineAndFill/superpose`, `A.Sector.sweep`; `cascade`
default, `parallel` for twins).

Verification checklist (summarised): `node --check` each extracted script;
`lektor clean --yes && lektor build`; one serve instance only;
`EUCLIDS_GEOMLIB_LOCAL=1` when the deck needs unreleased geomlib; walk every
slide; hover every guide ref; check static figure + drag; **run
`check-decks.js`** ("replaces the manual greps that used to be steps 8–10 …
14 Book I decks build `visible` sets from shared `var`s via `.concat()`,
which no static scan can follow" — now 28 pages across I–II).

### What the "Not yet implemented" column implies

`process.md:56-58`: "**Not yet implemented** — anything the current geomlib
vocabulary can't do. Last column, ideally empty. A non-empty cell means a
geomlib release precedes the deck." Combined with step 6 and the single
`geomlib_default` pin, this is a **site-wide lockstep**: one deck needing a
new library feature forces (a) a geomlib release, (b) a pin bump that
re-evaluates all 724 canvases under the new bundle, and (c) any behaviour
change in the bundle to be absorbed by every existing deck at once. PR #37
is the worked example: bumping to 0.16.0 for two Book II fixes surfaced 70
`unknown-color` diagnostics on 21 pre-existing pages ("the bump was
unpublishable until they were rewritten") and reverted a 53-target workaround
across 12 pages. The tracker's "Deferred" table and "#91 rework" column exist
to manage precisely this coupling. Per-page `geomlib_version` overrides exist
in the model but the corpus does not use them (no `geomlib_version:` in any
proposition page).

PR #35 notes the happy case: "Nothing went into a 'Not yet implemented' column
for the whole book."

---

## 5. The publish pipeline and what is live

### Path from `lektor build` to `www.euclids-elements.org`

`publish.sh` → `lektor deploy production` → Lektor's `ghpages` publisher →
force-push of `build/` to `org/` branch **`gh-pages`** with `CNAME` written
from `?cname=www.euclids-elements.org` → GitHub Pages.

Confirmed from GitHub (`gh api repos/brownnrl/euclids-elements.org/pages`,
2026-09-20):

```
status: built   cname: www.euclids-elements.org
source: { branch: "gh-pages", path: "/" }   build_type: legacy
latest build: commit 5518258…, 2026-09-17T02:26:38Z
```

`git -C org log origin/gh-pages`: 5518258 (2026-09-16) "Lektor Bot —
Synchronized build", previous 2026-09-05, 08-29 ×2, 08-23. The gh-pages tree
is the Lektor URL scheme (`elements/books/bookI/propositions/propI5/index.html`
+ `propI5.gif`, `other-works/`, `geomlib/`, favicons, `LICENSE`,
`COPYRIGHT.md`; 1302 files).

Side observation: `gh-pages` also carries **`geomlib-dev.js`** (878 KB
bundle). `.gitignore` excludes `assets/geomlib-dev.js` from the *lektor*
repo, but Lektor copies whatever is in `assets/` into the build and the
publisher does `git add -f --all`, so the dev symlink's target was published.
Harmless (nothing references it when `geomlib_local` is off) but it is
evidence for the README's own warning that "anything not in the build is not
published" cuts both ways.

### Branches in `org/`

```
main                            2026-05-28  504daa4  bump pinned geomlib 0.2.0 → 0.3.0 (#20)
chore/geomlib-0.3.0             2026-05-28
gh-pages                        2026-09-17  5518258  Synchronized build   ← LIVE
lektor/main                     2026-05-31  preview build (dirty)
lektor/slideshows-and-guides    2026-08-23  preview build
```

`org/main` is the old hand-edited flat tree (`elements/bookI/propI47.html`
scheme, `js/header-footer.js`, `migrate.py`, 3626 files incl. ~41 MB of
snapshot PNGs). Nothing has been committed there since 2026-05-28. Its
`README.md` still says "GitHub Pages serves the `main` branch root directory"
and pins unpkg 0.3.0 — both stale. org#14's closing comment (2026-06-07):
"All content + template + plugin work happens in … euclids-elements-lektor;
**this repo is effectively frozen**. Site is currently hosted off the lektor
build." org#12 (migrate canonical hosting to Cloudflare) is still open; CF is
used only for `lektor/<branch>` previews via `wrangler.jsonc` + `_worker.js`
(the worker rewrites `…/` → `…/index.html` because `html_handling: "none"`).

So: **gh-pages is canonical; the hand-edited tree is dead but not deleted.**
The lektor README's "Note on URLs … deep links into the old scheme do not
resolve" is therefore already true in production.

---

## 6. Contributor / AI-authoring rules

There is **no `CLAUDE.md`, `AGENTS.md`, `.claude/`, `.github/` or
`.cursorrules`** in either repo (checked with `find`). All 360 commits are
authored `brownnrl <brownnrl@gmail.com>`.

AI assistance is nonetheless the working mode, evidenced by:

- `lektor/doc/process.md:5`: "Point a fresh session here before starting a
  new proposition." The whole document is written as instructions to a
  session, with "Caught on I.47…" post-mortems.
- `lektor/doc/deck-tracker.md`: "The library session is reworking angle
  markers" (:22); "the library session found it in those notes and filed
  euclid#146 themselves" (:213); "**three agents reached this
  independently** (II.2, II.3, II.8)" (:116); "The June 'revisit list' in the
  coordination log is superseded" (:197 — the coordination log is not in the
  repo; `doc/journal/` is gitignored); "(Nelson's call)" appears in I.31,
  I.46, I.47 rows to mark decisions reserved to him.
- PR #35's body ends with "🤖 Generated with [Claude Code]"; lektor#3 cites
  "the conversion agent's report in PR/commit `021cc83`".
- Commit messages "Prop II.14 reviewed.", "II.13 reviewed.", "Initial II.11
  looks good, but follow up with guide deck." (2026-09-05) show his review
  loop: an agent authors, he watches the deck, commits "reviewed".
- Tracker: "**All 48 Book I decks have been watched and confirmed** (Nelson,
  2026-08-23)".

The de-facto rules for contributors (human or agent), all from `doc/process.md`
and `doc/conventions.md`:

1. Plan first, "review it with the author **before implementing**".
2. Joyce's prose is read-only; only tokenize. Source typos are corrected via
   the dated, initialled editorial-footnote convention (`conventions.md`,
   "Editorial footnotes"), never silently.
3. Captions are Joyce's sentences; split, never summarise; bracketed asides
   only.
4. "Only build figures Joyce's page had"; the resting figure must match his
   static diagram (`initiallyHidden` for anything added).
5. `check-decks.js` must be clean; never silence a diagnostic by deleting a
   name.
6. Anything deferred goes in the tracker's Deferred table ("Anything deferred
   goes in this table"); library needs become euclid issues, never
   deck-side hacks left undocumented.
7. Update `deck-tracker.md` summary and row "at the end of each deck".

---

## Implications for ADR 0002

### Premise check

| ADR 0002 claim | Verified? | Evidence |
|---|---|---|
| deck lives as JS inside Lektor markdown | Yes | `proof:` field of `prop_section`; 726 inline `geomlib.init` blocks |
| enum animation names | Yes, universally | 62/62 deck pages use `geomlib.A.*`; 0 use `name: "…"` strings |
| `.concat()`-built visibility sets | Yes, 28/62 | grep; `process.md` says 14 (Book I count, now stale) |
| "can only be validated by executing them" | Yes | `check-decks.js` header: "No regex guessing … a static scan cannot follow" |
| "`init()` already takes an object" | Yes | every page |
| "string animation names sit beside the enums" | **Not verifiable here** (geomlib repo out of scope) | but `gen-reference/anims.py` stores names as strings and emits `geomlib.A.` + name, so *his* tooling already has the mapping |
| "must stay hand-editable in a text editor" | Strongly confirmed as a constraint | all 62 decks carry `//` comments explaining choices; `process.md` rules are written as prose-adjacent reasoning |

### (a) Where a deck data document would live in Lektor's model, with least disruption

Constraints from the evidence:

- The `<figure>` must render **at a specific point inside the proof prose**
  (float placement, `conventions.md:32`; DOM-order ref binding,
  `elem-ref-highlight.js`). So the deck cannot simply become a top-level field
  rendered by the template after the proof — 62 pages' `{NAME}` refs would
  rebind to the wrong canvas unless every ref gained an explicit `:canvas_N`.
- Lektor does not run Jinja in content bodies (`check-versions.js` header,
  `process.md:35`), so a placeholder in the markdown must be resolved by a
  Mistune-level plugin — which is exactly how `[!just]`, `[!qed]`, `{NAME}`
  already work, and where Nelson said a slide directive belongs (lektor#5
  comment).
- Every tool reads `contents.lr` as text; none reads Lektor attachments.
  No template uses `this.attachments`. The `.gif` sidecar is the only
  attachment precedent and it is published verbatim next to `index.html`
  (`org` gh-pages `propI5/propI5.gif`), which means a JSON sidecar would also
  be published — acceptable, possibly desirable for client fetch, but it
  changes the "what is in the build" surface.
- Databags are site-wide (`bag('subject_index')`), wrong granularity for 465
  pages.

Options, least disruptive first:

1. **Discipline the inline literal, no structural change.** Keep the
   `<script>` where it is but require the `init()` argument to be a pure
   literal: no `var`/`.concat()`, string animation names, no functions
   (`resolveJustification` and `window.eucrefs` replaced by a page-level
   helper or by letting geomlib resolve `I.Def.20` itself). `check-decks.js`
   can then `JSON.parse` the literal *before* the vm step and validate it
   against a schema; the vm step stays. Cost: 28 pages de-`concat`ed, 62
   pages' enums stringified, comments moved to `/* */` or dropped (or the
   schema tolerates JSON5/JSONC). This is the additive path ADR 0002 already
   describes and touches no model, template or plugin.
2. **`[!figure …]` block directive in `lektor-eucrefs` + a sidecar file.**
   Markdown gets `[!figure canvas_0]`; the plugin emits the `<figure>` +
   `<canvas>` + `<noscript>` + `<script>geomlib.init(<json>)</script>` from
   `content/…/propI5/canvas_0.json` (or `deck.json` keyed by canvas id).
   Keeps DOM order, keeps `elem-ref-highlight.js` untouched, keeps the
   `geomlib_default` pin, and gives the exporters a file to read without
   parsing markdown. Cost: plugin code, `check-decks.js`/`check-captions.py`
   read sidecars, `process.md` rewritten, a migration script (Nelson has done
   this shape twice: `scripts/migrate_props.py` for d76be03 and the
   subject-index converter).
3. **A `deck` field (type `text`, JSON body) on `prop_section`** rendered by
   the template. Fits Lektor's admin UI and the flow-block idiom, but the
   figure then renders at a template-fixed position, so it needs the
   `[!figure]` placeholder anyway (or a per-block "figure after paragraph N"
   convention). Not less disruptive than 2.

Recommendation for the proposal: lead with 1 as phase one (it is what the ADR
already says and it is reversible), name 2 as the destination, and do not
propose 3.

### (b) Is Nelson's planned refactor already a structured deck format?

**No — and there is no planned refactor left.** The "structured-field
refactor of `proposition.model`" shipped on 2026-06-06 as the `sections` /
`prop_section` flow (statement / proof / guide). The README sentence pointing
to it is stale by three months. The "diagrams" field it also named was never
built, Phase 4a–4c were delivered without it, and lektor#6 was closed with
"Remaining work is per-book deck authoring … rather than architecture."

So the proposal should **not** be phrased as "helping with his refactor" — he
would reasonably reply that it is done. Phrase it instead as:

- finishing the one word of M4 he skipped ("diagrams"), using the same move he
  made for the subject index in lektor#3 (HTML body → validated data → template
  renders it → checker gates publish), and
- generalising what `scripts/gen-reference/anims.py` + `build_animations.py`
  already do for the `/geomlib/animations/` decks (data in, `geomlib.init`
  script out) to proposition decks, and
- de-risking the lockstep his own `process.md` step 6 and the tracker's "#91
  rework" column describe: a deck document with string names and a schema
  lets a library release change rendering without re-authoring 62 (later
  465) pages.

His stated trigger for data-first is a second consumer ("when a second
subject index (or a need for search) makes the data-driven version pay for
itself", lektor#3). ADR 0002's exporters and Apollonius/Hilbert are the second
consumer; say so.

Two things he will push back on, based on the record: (i) hand-editability
with comments (every deck has `//` reasoning; JSON has no comments), and (ii)
anything that changes a resting figure or rewords a caption — the format must
be a pure re-encoding, verifiable by `check-decks.js` reporting the same 724
canvases / 0 issues before and after, plus a visual pass he does himself.

### (c) Tools that would need to change

Must change for any deck-as-data variant:

1. `lektor/scripts/check-decks.js` — `scriptsOf()` seam; add schema
   validation; load sidecars/fields if option 2/3.
2. `lektor/scripts/check-captions.py` — replace the `\{ text: "…"` regex and
   the `"slides:" in s` sentinel with a JSON reader.
3. `lektor/doc/process.md` (workflow steps 4, verification step 1 "extract
   each inline `<script>` and `node --check` it", and the planning-table
   columns) and `lektor/doc/deck-tracker.md` (status key wording
   "`slides[]` authored").
4. `lektor/scripts/gen-reference/build_animations.py` / `build_page.py` — if
   the reference pages should emit the same format (they are the natural
   first migration: already data-driven).
5. A one-off migration script for the 62 existing decks (precedent:
   `scripts/migrate_props.py` named in d76be03, since deleted).
6. `lektor/doc/content-model.md` — already stale about `proof`+`body`; fix in
   the same pass.

Change only for option 2 (sidecar + directive) or 3 (field):

7. `lektor/packages/lektor-eucrefs/lektor_eucrefs.py` — new `[!figure …]`
   block directive (Nelson's own suggested home for slide directives).
8. `lektor/flowblocks/prop_section.ini` and/or `templates/proposition.html`
   (option 3 only).
9. `lektor/scripts/gen-reference/probe-page.js` — "Render every figure on one
   content page, straight from its inline scripts".
10. `lektor/assets/js/ctor-source.js` — reads `figure script` textContent for
    CodePen; only affects `/geomlib/constructions/` if that page migrates.

Must **not** need to change (and the proposal should say so explicitly):

- `lektor/assets/js/elem-ref-highlight.js` — binds by DOM/canvas id after
  `init()` has run; format-agnostic as long as the emitted `<script>` still
  runs synchronously inline.
- `lektor/scripts/check-versions.js`, `publish.sh`, `deploy-preview.sh`,
  `check-subjindex.py`, `lektor-katex`, `lektor-roman-slug-mimetypes`.
- `templates/layout.html`'s `geomlib_default` pin mechanism and the
  `EUCLIDS_GEOMLIB_LOCAL` dev toggle.
- The publish target (`gh-pages` on `org/`) and the CF preview path.

Outside these two repos (not researched here, flagged for the design issue
on brownnrl/euclid): whether `geomlib.init()` accepts string animation names
and whether `resolveJustification` can be replaced by a declarative
`justificationBase`/URL-map option so the last function-valued field can leave
the document.
