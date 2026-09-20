# Architecture

_Draft, 2026-09-20. Diagrams are Mermaid; GitHub renders them. "As is" is
verified against upstream code; "proposed" is ADR 0002 and is not agreed
with upstream yet._

## Repositories and who owns what

```mermaid
flowchart LR
    subgraph upstream["Upstream — Nelson Brown"]
        LIB["brownnrl/euclid<br/>geomlib (TypeScript, MIT)<br/>npm @brownnrl/geomlib"]
        LEK["brownnrl/euclids-elements-lektor<br/>narrative + decks (Lektor)<br/><b>canonical editing repo</b>"]
        SITE["brownnrl/euclids-elements.org<br/>gh-pages publish target<br/>Cloudflare branch previews"]
    end
    subgraph ours["Ours — imkarrer"]
        FORK["imkarrer/euclid<br/>fork, PR branches only"]
        WB["imkarrer/preservation-workbench<br/>plan · ADRs · glossary · drafts<br/>flox env · beads"]
    end
    LEK -- "lektor build + publish.sh" --> SITE
    LEK -. "pins version in<br/>templates/layout.html" .-> LIB
    FORK -- "PR" --> LIB
    WB -. "bootstrap.sh clones<br/>as siblings" .-> LIB & LEK & SITE
    WB -. "activate -d" .-> FORK
```

## As is: a proposition page today

```mermaid
flowchart TB
    subgraph LR["contents.lr  (one file per proposition)"]
        PROSE["Narrative — Joyce's prose<br/>read-only, {NAME} tokens"]
        SCRIPT["&lt;script&gt; geomlib.init({<br/>elements: [&quot;A;point;free;125,130&quot;, …],<br/>aliases: {…},<br/>slides: [{text, visible, highlighted,<br/>transition: {animations: [{elem, name: geomlib.A.Line.…}]},<br/>justifications}]<br/>})"]
    end
    PROSE --- SCRIPT
    LR --> BUILD["lektor build<br/>lektor-eucrefs tokenizes {NAME}<br/>lektor-katex renders math"]
    BUILD --> HTML["static HTML + inline script"]
    HTML --> BROWSER["browser: geomlib bundle from jsDelivr<br/>canvas render · drag · Present mode"]
    LR --> CHECK["scripts/check-decks.js<br/>vm sandbox + node-canvas + real bundle<br/><i>must execute the script to validate it</i>"]
    CHECK -- "gates" --> PUB["publish.sh → gh-pages"]
    classDef bad stroke:#c33,stroke-width:2px;
    class SCRIPT,CHECK bad;
```

The red boxes are the seam. The deck is JavaScript embedded in markdown,
so it can only be validated by execution, only consumed by geomlib, and every
library rename (see upstream's #91 angle-marker rework column in the deck
tracker) is a deck re-authoring pass.

## Proposed: the deck is data (ADR 0002)

```mermaid
flowchart TB
    subgraph sources["Narrative sources (read-only)"]
        J["Joyce / Heath — Elements"]
        A["Heath 1896 — Apollonius, Conics"]
        H["Townsend 1902 — Hilbert, Foundations"]
    end
    subgraph doc["Deck document  (JSON, schema-validated, hand-editable)"]
        EL["elements[] — construction DSL<br/>(unchanged geomlib vocabulary)"]
        AL["aliases"]
        SL["slides[] — {text, visible, highlighted,<br/>animations: [{elem, name: &quot;Line.straightEdgeConnect&quot;}],<br/>justifications}"]
    end
    sources -- "{NAME} refs bind by name" --> doc
    doc --> V["validator<br/>schema + name resolution<br/>no canvas, no execution"]
    doc --> R1["geomlib canvas<br/><b>reference renderer</b><br/>interactive · drag · Present"]
    doc --> R2["static SVG<br/>noscript · print · replaces 1996 .gif"]
    doc --> X1["GeoGebra export"]
    doc --> X2["Manim scene<br/>(osolmaz pattern)"]
    doc --> R3["future front-ends<br/>(modernization)"]
    V -- "gates" --> PUB["publish"]
```

Introduced additively: `init()` already takes an object; the deltas are string
animation names beside the enums, a construction-name lookup, a validator entry
point, and a Lektor field that stores the document and emits the script at
build time. Legacy inline-script pages keep working.

## Proposed, later: kernel and renderers (Phase 4)

```mermaid
flowchart LR
    DOC["deck document"] --> K
    subgraph K["geomlib kernel (headless)"]
        P["parse + construction dispatch"] --> G["dependency graph<br/>update() propagation"] --> POS["element positions"]
    end
    POS --> C["canvas renderer<br/>(today's code)"]
    POS --> S["SVG / DOM renderer<br/>accessible, themable"]
    POS --> N["node: snapshot tests,<br/>static export, CI"]
    style K stroke-dasharray: 5 5
```

Today elements draw themselves with a canvas context, so this split is a real
refactor of upstream code and waits until trust is established. It is what
unlocks the accessible surface, touch (#57), the affine/rotation gizmo, and an
explicit-transform fix for the XI.11 class of bug.

## Roadmap as a dependency graph

```mermaid
flowchart LR
    P0["P0 workflow<br/>flox · siblings · beads"] --> P1
    P1["P1 earn merges<br/>XI.11 · #70 · #156<br/>slideshow feedback<br/>Book IV decks"] --> G1{{"upstream trusts<br/>a second author"}}
    G1 --> P2["P2 deck document<br/>design issue → schema → Book I migration"]
    P2 --> P3["P3 exporters<br/>SVG → Manim → GeoGebra"]
    P2 --> P5["P5 other works<br/>Apollonius · Hilbert"]
    P2 --> G2{{"co-maintainer"}}
    G2 --> P4["P4 kernel / renderer split<br/>SVG surface · touch · gizmo"]
    P4 --> M["modern front-end<br/>(our app, consumer #5)"]
    P3 --> M
    style G1 fill:#fff3cd,stroke:#856404
    style G2 fill:#fff3cd,stroke:#856404
```

Every phase is independently acceptable or rejectable by upstream. P1 and P3
have value even if P2 and P4 never happen. The yellow gates are human
decisions, not milestones we control.

## Open questions the research notes must answer

Tracked in `docs/research/`:

- **geomlib internals** — is "additive" honest? What in `init()` is not
  JSON-serializable today? Can the kernel run headless?
- **Lektor pipeline** — does upstream's planned "structured-field refactor of
  proposition.model" already amount to a deck document? If so, ADR 0002 is
  help with his refactor, not a new proposal.
- **Interchange formats** — what should the document borrow from Intergeo,
  GeoGebra XML/commands, canberead, osolmaz's Manim JSON?
- **Source texts** — which editions are public domain in the US, and what does
  Joyce's permission actually cover?
