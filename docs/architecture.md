# Architecture

_Draft, 2026-09-20. Diagrams are Mermaid; GitHub renders them. "As is" is
verified against upstream code; "proposed" is ADR 0002 and is not agreed
with upstream yet._

## Repositories and who owns what

```mermaid
flowchart LR
    subgraph upstream[Upstream - Nelson Brown]
        LIB[brownnrl/euclid<br/>geomlib, TypeScript, MIT<br/>npm @brownnrl/geomlib]
        LEK[brownnrl/euclids-elements-lektor<br/>narrative + decks, Lektor<br/>canonical editing repo]
        SITE[brownnrl/euclids-elements.org<br/>gh-pages publish target<br/>Cloudflare branch previews]
    end
    subgraph ours[Ours - imkarrer]
        FORK[imkarrer/euclid<br/>fork, PR branches only]
        WB[imkarrer/preservation-workbench<br/>plan, ADRs, glossary, drafts<br/>flox env, beads]
    end
    LEK -->|lektor build + publish.sh| SITE
    LEK -.->|pins version in templates/layout.html| LIB
    FORK -->|PR| LIB
    WB -.->|bootstrap.sh clones as siblings| LIB
    WB -.-> LEK
    WB -.-> SITE
```

## As is: a proposition page today

```mermaid
flowchart TB
    subgraph PAGE[contents.lr - prop_section flow block]
        ST[statement - html field]
        subgraph PROOF[proof - markdown field]
            PROSE[Narrative: Joyce's prose<br/>read-only, NAME tokens]
            SCRIPT[figure: script tag geomlib.init<br/>elements: construction strings<br/>aliases<br/>slides: text, visible, highlighted,<br/>animations by enum geomlib.A.Line.x,<br/>justifications<br/>resolveJustification function]
        end
        GU[guide - markdown field]
    end
    PROSE --- SCRIPT
    PAGE --> BUILD[lektor build<br/>lektor-eucrefs tokenizes NAME refs<br/>lektor-katex renders math]
    BUILD --> HTML[static HTML + inline script]
    HTML --> BROWSER[browser: geomlib bundle from jsDelivr<br/>canvas render, drag, Present mode]
    PAGE --> CHECK[scripts/check-decks.js<br/>vm sandbox + node-canvas + real bundle<br/>must execute the script to validate it]
    CHECK -->|gates| PUB[publish.sh to gh-pages]
    style SCRIPT stroke:#c33,stroke-width:2px
    style CHECK stroke:#c33,stroke-width:2px
```

The red boxes are the seam. Upstream's structured-fields plan named four
fields - statement, diagrams, proof, guide - and shipped three; the diagram
script still lives inside the proof markdown. It can only be validated by
execution and only consumed by geomlib; the 0.16 library bump produced 70
diagnostics on 21 untouched pages because every deck is lockstepped to one
pin.

## Proposed: new decks authored as data (ADR 0002)

```mermaid
flowchart TB
    subgraph SRC[Narrative sources - read-only]
        J[Joyce / Heath: Elements]
        A[Heath 1896: Apollonius, Conics]
        H[Townsend 1902: Hilbert, Foundations]
    end
    subgraph DOC[Deck document - JSON, schema-validated, hand-editable]
        EL[elements: construction DSL<br/>unchanged geomlib vocabulary]
        AL[aliases]
        SL[slides: text, visible, highlighted,<br/>animations by string name,<br/>justifications]
    end
    SRC -->|NAME refs bind by name| DOC
    DOC --> V[validator<br/>schema + name resolution<br/>no canvas, no execution]
    DOC --> R1[geomlib canvas<br/>reference renderer<br/>interactive, drag, Present]
    DOC --> R2[static SVG<br/>noscript, print<br/>replaces 1996 gif]
    DOC --> X1[GeoGebra export]
    DOC --> X2[Manim scene<br/>osolmaz pattern]
    DOC --> R3[future front-ends<br/>modernization]
    V -->|gates| PUB[publish]
```

Not a migration. The 403 remaining decks are written as JSON-parseable
literals - string animation names (geomlib accepts them today), no
`.concat()`, no functions in `slides[]` - and schema-checked before the
existing vm step. Book IV pilots it; the 62 existing decks are untouched
until the discipline has proven itself. `resolveJustification` stays a
function supplied at `init()`.

## Proposed, later: kernel and renderers (Phase 4)

```mermaid
flowchart LR
    DOC[deck document] --> P
    subgraph K[geomlib kernel - headless]
        P[parse + construction dispatch] --> G[dependency graph<br/>update propagation] --> POS[element positions]
    end
    POS --> C[canvas renderer<br/>today's code]
    POS --> S[SVG / DOM renderer<br/>accessible, themable]
    POS --> N[node: snapshot tests,<br/>static export, CI]
```

Today elements draw themselves with a canvas context, so this split is a real
refactor of upstream code and waits until trust is established. It is what
unlocks the accessible surface, touch (#57), the affine/rotation gizmo, and an
explicit-transform fix for the XI.11 class of bug.

## Roadmap as a dependency graph

```mermaid
flowchart LR
    P0[P0 workflow<br/>flox, siblings, beads] --> P1
    P1[P1 earn merges<br/>XI.11, #70, #156<br/>slideshow feedback<br/>Book IV decks] --> G1{{upstream trusts<br/>a second author}}
    G1 --> P2[P2 deck discipline<br/>string-names doc PR, Book IV as JSON,<br/>schema check before vm step]
    P2 --> P3[P3 exporters<br/>SVG, Manim, GeoGebra]
    P2 --> P5[P5 other works<br/>Apollonius, Hilbert]
    P2 --> G2{{co-maintainer}}
    G2 --> P4[P4 kernel / renderer split<br/>SVG surface, touch, gizmo]
    P4 --> M[modern front-end<br/>our app, consumer 5]
    P3 --> M
    style G1 fill:#fff3cd,stroke:#856404
    style G2 fill:#fff3cd,stroke:#856404
```

Every phase is independently acceptable or rejectable by upstream. P1 and P3
have value even if P2 and P4 never happen. The yellow gates are human
decisions, not milestones we control.

## Open questions the research notes must answer

Tracked in `docs/research/`:

- **geomlib internals** - is "additive" honest? What in `init()` is not
  JSON-serializable today? Can the kernel run headless?
- **Lektor pipeline** - does upstream's planned "structured-field refactor of
  proposition.model" already amount to a deck document? If so, ADR 0002 is
  help with his refactor, not a new proposal.
- **Interchange formats** - what should the document borrow from Intergeo,
  GeoGebra XML/commands, canberead, osolmaz's Manim JSON?
- **Source texts** - which editions are public domain in the US, and what does
  Joyce's permission actually cover?
