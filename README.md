# Preservation workbench

Planning, decisions, drafts and tooling for preserving classical
mathematics works as faithful, interactive web editions — and, later,
modernizing how they are read.

The first work is Euclid's *Elements*, pursued by contributing to
[Nelson Brown's](https://github.com/brownnrl) geomlib / euclids-elements.org
project rather than starting a parallel one (see
[ADR 0001](docs/adr/0001-join-geomlib-rather-than-build.md)). Apollonius'
*Conics* and Hilbert's *Foundations of Geometry* are the next candidates.

This repo holds nothing that belongs upstream. Code goes to the upstream
repos via fork + PR; this is the umbrella that keeps the plan, the
reasoning and the working environment from being orphaned across them.

## Layout

```
PLAN.md                  living plan: pipeline, phases, principles
CONTEXT.md               glossary — the words we use and the ones we avoid
docs/adr/                decisions that were hard to reverse or would look odd without context
works/<work>/            per-work state: upstream links, next actions, drafts before posting
scripts/bootstrap.sh     clone / sync the upstream repos as siblings of this one
.flox/                   one dev environment shared by every sibling checkout (see Working here)
.beads/                  one backlog spanning library issues, decks and drafts (bd ready)
```

## Principles inherited from upstream

- **The narrative never changes.** Original text is republished faithfully;
  an editorial gray area gets a footnote, never a rewrite.
- **Only slideshow captions are ours to write**, and even those carry the
  author's sentence, tokenized — not a paraphrase.
- **Additive and default-off.** Library changes must leave every existing
  render path bit-for-bit unchanged.

## Working here

One flox environment serves this repo and all three sibling checkouts — Node 24
(matches upstream CI), Python 3.12 + Lektor 3.3.13 in a gitignored `.venv/`,
and `libuuid` for the prebuilt node-canvas binary. Activate it from anywhere:

```bash
flox activate -d ~/src/preservation-workbench
```

The hook exports `EUCLID_REPO`, `LEKTOR_REPO`, `EUCLIDS_REPO` and `NODE_PATH` at
the sibling paths, so upstream's scripts (`check-decks.js`, `publish.sh`,
`deploy-preview.sh`) run unmodified. Verified 2026-09-21: `npm run test:unit`
in euclid, `lektor build`, and `check-decks.js` all pass through it.

Sibling checkouts are expected at `../euclid`, `../euclids-elements-lektor`
and `../euclids-elements.org` — upstream's own scripts assume those paths.
`scripts/bootstrap.sh` sets them up.

Commits go straight to `main`.
