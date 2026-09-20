# Source texts: copyright status and best digital sources

_Research note, 2026-09-20. Every claim carries the URL it was read from.
Where a site could not be reached from this box, the claim is marked
**unverified** and the URL to check is given._

## Method and what could not be reached

Sources were read directly: Project Gutenberg, the Internet Archive metadata
API (`archive.org/metadata/<id>`), the HathiTrust Bibliographic API
(`catalog.hathitrust.org/api/volumes/...`), Wikisource, Perseus, publisher
pages, the LICENSE / NOTICE / COPYRIGHT files in the GitHub repos, and the
Cornell public-domain chart.

Blocked from this environment (Cloudflare challenge or 403), so quoted only
via search-engine snippets and flagged as such:

- HathiTrust's HTML site (catalog search, record pages, policy pages). The
  JSON Bib API did answer, so rights codes below are first-hand.
- `c82.net` (Rougeux's Byrne reproduction) — all pages 403.
- Stanford Copyright Renewal Database — CAPTCHA.
- `taschen.com` product pages — 404.
- `opencourtbooks.com` — no HTTPS.
- `web.archive.org` — not fetchable by the tooling.

## Legal framework used

**US term.** The Cornell chart "Copyright Term and the Public Domain in the
United States" (https://copyright.cornell.edu/publicdomain, which redirects to
https://guides.library.cornell.edu/copyright/publicdomain; "This version is
current as of 1 January 2026") gives:

- Works first published in the US **"Before 1931"** — "None. In the public
  domain due to copyright expiration".
- Works first published outside the US "Before 1931" — "In the public domain
  (But see first special case below)". The special case is the Ninth-Circuit
  *Twin Books* rule, which applies only to works "Published in a language
  other than English" — irrelevant to every English text here.
- US works 1931–1963: PD if "Published with notice but copyright was not
  renewed"; "95 years after publication date" if renewed.
- Foreign works 1931–1977 not in the public domain in their home country on
  1 January 1996: "95 years after publication date" (URAA restoration).

Note the cutoff is now **1931**, not 1930 as the task brief assumed; every
text below is comfortably on the safe side of either.

**Non-US term.** UK Copyright, Designs and Patents Act 1988 s.12(2): copyright
"expires at the end of the period of 70 years from the end of the calendar
year in which the author dies"
(https://www.legislation.gov.uk/ukpga/1988/48/section/12). The same life+70
rule applies across the EU.

**Project Gutenberg texts.** PG "follow[s] the United States laws for
copyright" and "makes no representations concerning the copyright status of
any work in any country outside the United States"
(https://www.gutenberg.org/policy/permission.html,
https://www.gutenberg.org/policy/license.html). "If you strip the Project
Gutenberg license and all references to Project Gutenberg from the text, you
are left with a text unrestricted by U.S. intellectual property law." If the
trademark is kept, "you may only distribute verbatim copies" and commercial
copies owe royalties (license.html). PG "claims no copyright for markup,
formatting, spelling modernization, etc." (permission.html).

**Internet Archive scans.** IA "does not make guarantees as to the copyright
status of items on archive.org"; users "make use of the Internet Archive's
Collections at their own risk and ensure that such use is non-infringing"
(https://help.archive.org/help/rights/). Library-contributed scans of
pre-1931 books carry `possible-copyright-status: NOT_IN_COPYRIGHT` in their
metadata (see each item below); a scan of a public-domain page adds no new
copyright in the US.

**HathiTrust.** Its Access & Use Policy
(https://www.hathitrust.org/the-collection/search-access/access-use-policy/)
— **unverified**, site blocked; per the search-engine snippet — says that for
Google-digitized public-domain volumes "Google requests that the images and
OCR not be re-hosted, redistributed or used commercially" while "there are
no restrictions on use of text transcribed from the images". Practical
consequence: prefer non-Google scans (university scanning centres) when
taking page images; retyped/re-OCR'd text is unrestricted either way.

---

## 1. Euclid, *Elements* — T. L. Heath translation

### (a) Bibliography

- 1st ed.: *The Thirteen Books of Euclid's Elements, translated from the
  text of Heiberg with introduction and commentary*, 3 vols, Cambridge:
  University Press, 1908. Confirmed by IA metadata on the Google scans
  (`"publisher":"Cambridge, The University Press"`, `"date":"1908"`,
  `"lccn":"09021988"`, `"oclc-id":"1147517"`;
  https://archive.org/metadata/thirteenbookseu02heibgoog) and by Perseus's
  TEI header (https://raw.githubusercontent.com/PerseusDL/canonical-greekLit/master/data/tlg1799/tlg001/tlg1799.tlg001.perseus-eng2.xml).
- 2nd ed. "Revised with additions", Cambridge, 1926. Heath's "Preface to
  the Second Edition" is dated "December 1925", which is why Joyce's
  aboutText page gives 1925 (https://mathcs.clarku.edu/~djoyce/java/elements/aboutText.html);
  MacTutor says "brought out in 1926"
  (https://mathshistory.st-andrews.ac.uk/Biographies/Heath/).
- Dover reprint, New York, 1956. Copyright page: "This Dover edition, first
  published in 1956, is an unabridged and unaltered republication of the
  second edition. It is published through special arrangement with
  Cambridge University Press." (OCR of the Dover copyright page,
  https://archive.org/download/euclid_heath_2nd_ed/1_euclid_heath_2nd_ed_djvu.txt).
  Library MARC on the IA Dover items: "An unabridged and unaltered
  republication of the second edition [published in 1926]"
  (https://archive.org/metadata/thirteenbooksofe00eucl). Dover's own store
  page says only "unabridged republication of the original enlarged
  edition" and "Reprint of a standard edition" — no new material claimed
  (https://store.doverpublications.com/products/9780486600888.json).
- Translator: Sir Thomas Little Heath, 1861–1940; "Died 16 March 1940
  Ashtead, Surrey" (https://mathshistory.st-andrews.ac.uk/Biographies/Heath/).

### (b) Public-domain status

- **1908 1st ed.: PD in the US** — published abroad before 1931 (Cornell
  chart). HathiTrust codes all nine 1908 volumes `pdus` / "Full view"
  (https://catalog.hathitrust.org/api/volumes/brief/oclc/1147517.json).
- **1926 2nd ed.: PD in the US** — also published abroad before 1931
  (Cornell chart: "Before 1931 … In the public domain"). The 1926
  additions are themselves pre-1931 matter.
- **Dover 1956: adds nothing copyrightable** — by its own statement it is an
  "unabridged and unaltered republication". Caveat: HathiTrust codes the
  Dover volumes `ic` / "Limited (search-only)"
  (https://catalog.hathitrust.org/api/volumes/brief/oclc/355237.json) and IA
  has removed its Dover scans from open access
  (`"access-restricted-item":"true"`, `"source":"removed"`,
  https://archive.org/metadata/thirteenbooksofe00eucl). That is the
  libraries' date-based default for a 1956 imprint, not a determination
  that Dover holds anything; but it means you cannot point at a library
  Dover scan as evidence. Take the 2nd-edition text from the Dover copyright
  page's own admission plus the 1926 date.
- **Non-US:** Heath died 1940, so UK/EU copyright expired 1 January 2011
  (CDPA s.12(2)). No caveat.

### (c) Best sources

| Need | Source | Quality |
|---|---|---|
| Machine-readable text (translation only, no commentary) | Perseus TEI XML `tlg1799.tlg001.perseus-eng2.xml`, https://raw.githubusercontent.com/PerseusDL/canonical-greekLit/master/data/tlg1799/tlg001/tlg1799.tlg001.perseus-eng2.xml | 1.8 MB TEI, structured `book / def_N / prop_N`. Source cited as Cambridge 1908 vols 1–3 with HathiTrust page links. **493 `<figure>` elements are empty placeholders — no diagrams.** Perseus's markup is CC BY-SA 4.0 (`<licence>` in header); the hopper page for the same text cites "Dover. 1956" and CC BY-SA 3.0 (https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0086) — the two Perseus records disagree on which printing was keyed, so spot-check readings against the 1908 scan before treating it as one edition or the other. |
| 1908 page images + OCR, vol. 1 (Intro, Books I–II) | `thirteenbookseu02heibgoog` (Google scan) or its re-upload `bub_gb_UhgPAAAAIAAJ` with hOCR; https://archive.org/metadata/thirteenbookseu02heibgoog | djvu.txt, djvu.xml, jp2; `NOT_IN_COPYRIGHT`. Figures are in the page images. |
| vol. 2 (Books III–IX) | `thirteenbookseu00heibgoog` / `bub_gb_lxkPAAAAIAAJ` | djvu.txt + hOCR |
| vol. 3 (Books X–XIII) | `thirteenbookseu01heibgoog` (also `thirteenbookseu03heibgoog`, Harvard copy) | djvu.txt + hOCR |
| 1908 HathiTrust | record 000540437: v.1 `uva.x001426155`, v.2 `uva.x001671689`, v.3 `uva.x001866313` (all `pdus`, Full view) — the volumes Perseus links | Google-digitized; see HathiTrust reuse note above |
| 1926/Dover text (OCR only) | `euclid_heath_2nd_ed` (user upload of the Dover set, folkscanomy, CC-PDM), https://archive.org/metadata/euclid_heath_2nd_ed | Open djvu.txt for all three vols; reviews say scan quality is poor; edition confirmed from the copyright page OCR. No library-grade scan of the 1926 Cambridge printing was located. |
| Project Gutenberg | none — search "euclid heath" returns "No records found" (https://www.gutenberg.org/ebooks/search/?query=euclid+heath); Euclid's author page lists only #21076 (Casey) and #38640 (https://www.gutenberg.org/ebooks/author/9719) | — |
| Wikisource | Heath 1908 is a red link on https://en.wikisource.org/wiki/Elements_(Euclid); no transcription exists | — |

All of these IA scans are Google-digitized ("unknown library" / Harvard);
no non-Google 1908 scan surfaced (the `thirteenbookseuc0Xheat` identifiers
exist but are dark: `"is_dark":true`).

### (d) Editions NOT to use

- **Green Lion Press, 2002** (*Euclid's Elements: All Thirteen Books Complete
  in One Volume*, ed. Dana Densmore; ISBN 978-1-888009-19-4 / -18-7;
  https://www.greenlion.com/books/EuclidsElements.html). What is new and
  therefore Green Lion's: "The typesetting is entirely new"; "Drawings have
  been newly lettered and largely redrawn. In some few cases … they have
  been redrawn differently from Heath's diagrams"; a new index "includ[ing]
  the Greek"; a "section on Euclidean terminology"; the Green Lion and
  Editor's prefaces; a short biography of Heath
  (https://www.greenlion.com/PDFs/GLPreface.pdf). Its title-page verso
  admits "minor corrections to text and translation"
  (https://archive.org/metadata/euclidselementsa0000eucl) — so even the
  prose is not guaranteed identical to Heath. Heath's commentary was
  "excised". Do not take text, diagrams, index or glossary from it.
- **Great Books of the Western World vol. 11** (Britannica, 1952/1955) —
  reprints Heath's translation but is a 1952 US publication; IA holds it
  lending-only (https://archive.org/metadata/thirteenbooksofe0011eucl).
  Nothing in it that is not in the 1908/1926 editions; use those instead.

---

## 2. Euclid, *Elements* — David E. Joyce's online edition

### (a) Provenance

Clark University, 1996–2020, https://aleph0.clarku.edu/~djoyce/java/elements/
(same server also answers at `mathcs.clarku.edu`; the `aleph0` certificate
is invalid). Joyce on the text: "This text of this version of Euclid's
Elements is similar to Heath's edition which he translated from Heiberg's
definitive edition in Greek, but it is slightly less literal to make it more
readable." He also drew on Peyrard (1814) and Todhunter's edition of
Simson (https://mathcs.clarku.edu/~djoyce/java/elements/aboutText.html).
So Joyce's narrative is a **derivative reworking** of Heath, plus his own
"Guide" commentary on each proposition.

### (b) Joyce's own copyright notice

https://mathcs.clarku.edu/~djoyce/java/elements/copyright.html — years
"1996, 1997, 2002, 2013"; scope "all of Euclid's Elements, documents, and
files served by the web servers in the clarku.edu domain within the folder
~djoyce/java/elements or its subfolders"; permissions: **"Currently, all
rights are reserved."** The only grant is that "Web links … may be freely
made".

Not PD: Joyce is living; his modifications to Heath's wording, his Guides,
his GIF/applet figures and page structure are his. Heath's underlying
sentences that survive unchanged are PD, but separating them from Joyce's
edits is not a mechanical job.

### (c) Nelson Brown's recorded permission — exact scope

`NOTICE.md` in https://github.com/brownnrl/euclid
(https://raw.githubusercontent.com/brownnrl/euclid/main/NOTICE.md; local
copy `~/src/euclid/NOTICE.md`, commit 3378cf8, 2026-05-21) records a Quora
answer by Joyce dated **May 3, 2026**, in reply to Brown's question about a
TypeScript port. The screenshot `doc/license/joyce_permission.png` in that
repo gives the full text (NOTICE.md elides one parenthetical):

> Very nice. I haven't had access to my files at Clark since I retired. (I
> was on the Steering Committee at Clark when the Provost proposed removing
> support from retired faculty. I objected, but you can't win them all.
> When I retired a couple years later, my access ceased.)
>
> Feel free to continue doing as much as you like. You have my permission
> to port as much of the Elements and Geometry Applet as you want, and
> distribute it however you like.
>
> Thank you very much.
>
> David Joyce
> Professor Emeritus, Clark University

What that is: a second-person grant to the questioner (Brown) to "port … the
Elements and Geometry Applet" and "distribute it however you like". No
mention of sublicensing, modification of the narrative, or commercial use.
Brown's own reading, in `COPYRIGHT.md` of both content repos
(https://raw.githubusercontent.com/brownnrl/euclids-elements.org/main/COPYRIGHT.md,
https://raw.githubusercontent.com/brownnrl/euclids-elements-lektor/main/COPYRIGHT.md):

> The textual narrative, diagrams, proposition layout, page structure, and
> accompanying images … are **© David E. Joyce**, used by his permission.
> … His permission to republish this content on `euclids-elements.org` (and
> to port the underlying applet to TypeScript as `geomlib`) was granted to
> Nelson Brown in May 2026. … **Third parties wishing to redistribute Dr.
> Joyce's narrative content should obtain separate permission from him.**
> The permission granted to Nelson Brown was specific; it is not transitive.

The published site repeats "All rights are reserved with respect to the
narrative content republished on this site"
(https://euclids-elements.org/elements/prematter/copyright/).

Licensing split in Brown's repos:

| Repo | MIT covers | Not MIT |
|---|---|---|
| `brownnrl/euclid` (geomlib) | TypeScript source, "Copyright (c) 1996–2020 David E. Joyce, 2019–2026 Nelson Brown" (https://raw.githubusercontent.com/brownnrl/euclid/main/LICENSE) | `geom_applet/` Java sources and `Geometry.zip`: "© David E. Joyce, included by permission" (NOTICE.md) |
| `brownnrl/euclids-elements.org` | `index.html`, `geomlib/index.html`, `migrate.py`, README, CNAME, COPYRIGHT.md (https://raw.githubusercontent.com/brownnrl/euclids-elements.org/main/README.md) | everything under `elements/`, `geomlib/compass/`, `geomlib/round/`, `geomlib/eulerline.html` — © Joyce |
| `brownnrl/euclids-elements-lektor` | LICENSE is MIT "Copyright (c) 2026 Nelson Brown" and states it "applies ONLY to the Lektor scaffolding" and "does NOT apply to … the Joyce-authored content republished under content/elements/" (https://raw.githubusercontent.com/brownnrl/euclids-elements-lektor/main/LICENSE) | `content/elements/` — © Joyce |

**Consequence for this project.** Contributing decks, fixes and templates
*into* Brown's repos is within Brown's grant (he is the permitted
publisher; our captions carry his republished sentences). Copying Joyce's
narrative into any site or repo of our own — including a "modern
front-end" that ships the prose — needs a fresh permission from Joyce
addressed to us.

---

## 3. Euclid, *Elements* — Richard Fitzpatrick translation

### (a) Bibliography

*Euclid's Elements of Geometry: The Greek text of J.L. Heiberg (1883–1885)
… edited, and provided with a modern English translation, by Richard
Fitzpatrick*. "First edition - 2007 / Revised and corrected - 2008 / ISBN
978-0-6151-7984-1" (front matter of
https://farside.ph.utexas.edu/Books/Euclid/Elements.pdf, 545 pp., PDF
created 2009-01-08 by "LaTeX with hyperref … dvips + ps2pdf"). Greek on the
left, English on the right, with vector diagrams. Sold as "a
professionally-bound paperback print-on-demand book" via Amazon
(https://farside.ph.utexas.edu/Books/Euclid/Euclid.html).

### (b) License stated

**None.** The whole PDF text was searched: no "copyright", "all rights
reserved", "Creative Commons" or "license" string occurs anywhere in it
(the only hits are OCR-noise in the Greek lexicon). The book page, his home
page (https://farside.ph.utexas.edu/) and books list
(https://farside.ph.utexas.edu/books/books.html) carry no license either.
An IA community upload of the PDF (`elements_202407`,
https://archive.org/metadata/elements_202407) has no `licenseurl` or
`rights` field and is a third-party upload.

A 2007 work by a living author with no license is **all rights reserved by
default** — silence is not permission. It is **not free for reuse or
modification** without asking Fitzpatrick. (The Greek text is Heiberg's
1883–85 Teubner edition and is PD; the English is not.)

### (c) canberead

- `github.com/ibrahimsag/canberead` now redirects to `ibrahimsag/read`
  ("An experiment in presenting geometry", site read.ratherthanpaper.com).
- Root `LICENSE` is the stock, unmodified Creative Commons "Attribution 4.0
  International" text — no licensor name, no year, no scope statement
  (https://raw.githubusercontent.com/ibrahimsag/canberead/master/LICENSE).
- `readme.md` says only "a translation of the 2300-year-old Elements"; no
  translator named, no license discussion
  (https://raw.githubusercontent.com/ibrahimsag/read/master/readme.md).
- The only attribution is a cover-page footer in `src/html.js`: `Based on
  <a href="http://farside.ph.utexas.edu/books/Euclid/Euclid.html">this
  translation</a>.`
  (https://raw.githubusercontent.com/ibrahimsag/read/master/src/html.js).
- Prose files (`src/en/<book>/<prop>`) carry no header or attribution;
  `src/en/1/1` matches Fitzpatrick's Prop. I.1 wording verbatim with `{AB
  line}` markup added.
- **No separation** of code license from prose license, and no claim of
  permission from Fitzpatrick. GitHub therefore displays the entire repo,
  Fitzpatrick's sentences included, as "CC-BY-4.0". A licensor cannot grant
  CC BY over text he does not own, so that badge is void for the prose.
- `osolmaz/manim-euclid-elements` is MIT ("Copyright (c) 2022 Onur Solmaz")
  and attributes only Sagiroglu, not Fitzpatrick
  (https://raw.githubusercontent.com/osolmaz/manim-euclid-elements/master/LICENSE,
  https://raw.githubusercontent.com/osolmaz/manim-euclid-elements/master/README.md).

**Consequence.** canberead's *layout data* (point coordinates, figure JSON,
sentence↔figure cursors) is Sagiroglu's and is usable under CC BY 4.0 with
attribution. Its *prose* is Fitzpatrick's and must not be republished or
tokenized into our decks. PLAN.md's "reference data only" stance is right.

---

## 4. Apollonius of Perga, *Conics* — T. L. Heath (1896)

### (a) Bibliography

*Apollonius of Perga: Treatise on Conic Sections, edited in modern notation,
with introductions including an essay on the earlier history of the
subject*, by T. L. Heath, Cambridge: at the University Press, 1896, "[All
Rights reserved.]"; preface signed "T. L. HEATH. March, 1896" (title-page
OCR, https://archive.org/download/treatiseonconics00apolrich/treatiseonconics00apolrich_djvu.txt).

Important for the narrative rule: this is **not a translation**. Heath's
preface: the work is "so entirely remodelled by the aid of accepted modern
notation as to be thoroughly readable by any competent mathematician";
"re-writing the book, involving … the substitution of a new and uniform
notation, the condensation of some propositions, the combination of two or
more into one, some slight re-arrangements of order"; the bulk was reduced
"by considerably more than one-half" (same OCR file). Figures: the preface
praises Balsam's and Halley's diagrams which Heath kept "before me"; it does
not say explicitly that he drew his own.

### (b) Public-domain status

UK, 1896 → **PD in the US** (before 1931, Cornell chart). IA:
`"possible-copyright-status":"NOT_IN_COPYRIGHT"`, evidence "no visible
notice of copyright; stated date is 1896"
(https://archive.org/metadata/treatiseonconics00apolrich). HathiTrust record
000471950, both items `pd` / "Full view"
(https://catalog.hathitrust.org/api/volumes/brief/oclc/2021267.json). Heath
d. 1940 → PD in UK/EU since 2011. No caveat.

### (c) Best sources

| Source | Quality |
|---|---|
| IA `treatiseonconics00apolrich` — University of California Libraries scan, scanningcenter "rich", 500 ppi, 444 images; https://archive.org/metadata/treatiseonconics00apolrich | Full derivative set: djvu.txt (686 kB), djvu.xml, hOCR, ABBYY, Text PDF, jp2. OCR confidence is poor on math-heavy pages — expect to retype the notation. Figures are in the page images. **Non-Google scan** — no Google reuse request attaches. Also the only scan Wikisource links (https://en.wikisource.org/wiki/Author:Apollonius_of_Perga). |
| HathiTrust `uc2.ark:/13960/t4bp08b2n` (UC), `hvd.32044025682550` (Harvard) | `pd`, Full view |
| IA `treatiseonconic00heatgoog` — Google/Harvard scan of the 1961 Barnes & Noble reissue | Fine as a second OCR pass but it is a 1961 imprint; prefer the 1896 scan for provenance |
| Project Gutenberg | none (https://www.gutenberg.org/ebooks/search/?query=apollonius) |
| Wikisource | external-scan link only, no transcription |

### (d) Other English versions — all in copyright, do not use

- **R. Catesby Taliaferro**, *Conics* Books I–III, in *Great Books of the
  Western World* vol. 11, Encyclopædia Britannica, **1952** (the brief's
  "1939" could not be confirmed from any source; Wikipedia's GBWW article
  gives 1952 for the series, https://en.wikipedia.org/wiki/Great_Books_of_the_Western_World).
  1952 US publication; renewal not checked (Stanford DB blocked). IA holds
  it lending-only (`"access-restricted-item":"true"`,
  https://archive.org/metadata/greatbooksofwest11hutc). Treat as in
  copyright until at least 2048.
- **Green Lion Press**: Books I–III (revised Taliaferro, 1998 "and
  subsequent editions"), Book IV (Michael N. Fried, 2002), combined *Conics
  Books I–IV*, July 2013, ISBN 978-1-888009-41-5 / -40-8
  (https://www.greenlion.com/books/ApolloniusConics.html). New matter: "the
  editors have occasionally reworked Taliaferro's English", diagrams
  "redrawn when necessary" by William H. Donahue, Eutocius excerpts as
  footnotes, introductions by Flaumenhaft and Fried. All in copyright.
- **G. J. Toomer**, Books V–VII from the Arabic, Springer 1990 — in
  copyright (mentioned on the Green Lion page).

---

## 5. David Hilbert, *The Foundations of Geometry* — E. J. Townsend (1902)

### (a) Bibliography

*The Foundations of Geometry*, by David Hilbert, "authorized translation by
E. J. Townsend, Ph.D., University of Illinois", Chicago: The Open Court
Publishing Company, 1902 (also issued London: Kegan Paul, Trench, Trübner).
Michigan MARC: "vii, 143 p. : diagr. ; 20 cm."; note: "with the additions
made by the author in the French translation, Paris, 1901, incorporated"
(https://archive.org/metadata/abr1237.0180.001.umich.edu). Townsend's
preface confirms the base is the June 1899 Festschrift plus "some additions
… in the French edition … incorporated in the following translation"
(https://www.gutenberg.org/files/17384/17384-t/17384-t.tex). Reprinted by
Open Court 1910, 1938, 1950. Hilbert 1862–1943
(https://mathshistory.st-andrews.ac.uk/Biographies/Hilbert/); Townsend
1864–1955 per library authority data (Gutenberg record and Michigan MARC;
no primary obituary located).

### (b) Public-domain status

US publication 1902 → **PD in the US**. Gutenberg: "Public domain in the
USA." (https://www.gutenberg.org/ebooks/17384). HathiTrust record 000383241:
all five 1902 items `pd` / "Full view", reason "US bib date1 < 1931"
(https://catalog.hathitrust.org/api/volumes/full/oclc/996838.json). The 1950
reprint's copyright page reads only "TRANSLATION COPYRIGHTED BY The Open
Court Publishing Co. 1902." (transcribed in the Gutenberg TeX) — no new
notice, so the reprint adds nothing.

Non-US: Hilbert d. 1943 → German original PD since 2014; Townsend d. 1955 →
translation PD in life+70 countries from **1 January 2026**. No caveat as
of this year.

### (c) Best sources

- **Project Gutenberg #17384 — confirmed.** Title "The Foundations of
  Geometry", author "Hilbert, David, 1862-1943", translator "Townsend, E. J.
  (Edgar Jerome), 1864-1955", released Dec 23 2005, last update Jul 14 2025,
  credits "Joshua Hutchinson, Roger Frank, David Starner and the Online
  Distributed Proofreading Team … Revised by Richard Tonsing"
  (https://www.gutenberg.org/ebooks/17384).
  - Formats: **PDF and LaTeX source only** — the HTML paths
    (`/files/17384/17384-h/17384-h.htm`, `/cache/epub/17384/pg17384-images.html`)
    return 404. Files: `17384-pdf.pdf` (1.0 MB), `17384-t/17384-t.tex`
    (266 kB), `17384-t/images/f001.png … f052.png`
    (https://www.gutenberg.org/files/17384/17384-t/,
    https://www.gutenberg.org/files/17384/17384-t/images/).
  - **Figures: yes, all 52**, as PNG files referenced by 52
    `\includegraphics` calls in the TeX. Small raster (1–34 kB each) — fine
    as reference, will need redrawing as constructions anyway.
  - Source printing: the transcribed title page reads "REPRINT EDITION / THE
    OPEN COURT PUBLISHING COMPANY / LA SALLE ILLINOIS / 1950", so the text
    was keyed from the **1950 reprint**, not the 1902 first printing. Diff
    against a 1902 scan if fidelity to the first printing matters.
- **1902 scan with OCR:** IA `abr1237.0180.001.umich.edu` (University of
  Michigan, 188 images, djvu.txt 230 kB;
  https://archive.org/metadata/abr1237.0180.001.umich.edu) = HathiTrust
  `miun.abr1237.0180.001` (non-Google, DLPS scan). Google copies:
  `hvd.32044000238840`, `mdp.39015039367498`, `wu.89062907480`,
  `uiug.30112049852400`; IA `foundationsgeom00hilbgoog` (London issue,
  `NOT_IN_COPYRIGHT`).
- 1910 printing: IA `foundationsofgeo00hilb` (Wellesley scan, djvu.txt).

### (d) Editions NOT to use

- **Open Court 1971**, *Foundations of Geometry*, "Translated by Leo Unger",
  "2d ed.", "Translation of Grundlagen der Geometrie. 10th ed., rev. and
  enl. by Paul Bernays", 226 pp.; HathiTrust `mdp.39015014352945` coded
  `ic` / "Limited (search-only)"
  (https://catalog.hathitrust.org/api/volumes/full/recordnumber/000005701.json);
  ISBN 0-87548-164-7 / 0-87548-163-9, "June 1971"
  (https://openlibrary.org/books/OL8088694M.json). In copyright: different
  translator, different (10th) German edition with Bernays's supplements.
  Its text must not be mixed into Townsend's.
- Open Court's 1965 printing of Townsend is lending-only on IA
  (https://archive.org/metadata/bwb_T2-DTS-930); unnecessary anyway.

---

## 6. Oliver Byrne, *The First Six Books of the Elements of Euclid* (1847)

### (a) Bibliography

*The first six books of the Elements of Euclid, in which coloured diagrams
and symbols are used instead of letters for the greater ease of learners*,
by Oliver Byrne, London: William Pickering, 1847; "Chiswick: Printed by C.
Whittingham" (https://archive.org/metadata/firstsixbooksofe00byrn). Byrne
1810–1880, "Died 9 December 1880 Maidstone, Kent"
(https://mathshistory.st-andrews.ac.uk/Biographies/Byrne/).

### (b) Public-domain status

UK 1847 → **PD everywhere**: pre-1931 for the US (Cornell chart); author
dead 145 years for life+70 countries. HathiTrust record 100234874, Getty
copy `gri.ark:/13960/t9766b543`, `pd` / "Full view"
(https://catalog.hathitrust.org/api/volumes/brief/oclc/1354061.json).

### (c) Best sources

| Source | Quality |
|---|---|
| IA `firstsixbooksofe00byrn` — Getty Research Institute, Canon 5D Mk II, 300 ppi, 308 images; https://archive.org/metadata/firstsixbooksofe00byrn | **Colour** jp2 + colour "Text PDF" (11.4 MB) + separate grayscale PDF; djvu.txt (231 kB), hOCR, ABBYY. Non-Google. This is the scan behind the Wikimedia Commons DjVu and the Wikisource transcription project (https://commons.wikimedia.org/wiki/File:First_six_books_of_the_elements_of_Euclid_1847_Byrne.djvu). |
| IA `firstsixbooksofe00eucl` — Fisher Library, University of Toronto, 300 ppi; https://archive.org/metadata/firstsixbooksofe00eucl | Colour; same derivative set; second copy for collation |
| IA `firstsixbooksofe0000oliv` — IA's own 2026 rescan, 360 ppi | Tesseract OCR; PDF flagged `pdf_degraded` |
| UBC, Bill Casselman, https://personal.math.ubc.ca/~cass/Euclid/byrne.html | Photographs of the Colbeck-collection copy, all six books mounted; page states no license or use terms at all |
| Wikisource transcription: Index:First six books of the elements of Euclid 1847 Byrne.djvu (linked from https://en.wikisource.org/wiki/Author:Oliver_Byrne) | Text only; Byrne's coloured symbols cannot be represented in plain transcription — check completeness before relying on it |
| Project Gutenberg | **none.** #21076 is *John Casey's* "First Six Books of the Elements of Euclid" (letter-labelled, TeX source, from Cornell scans), not Byrne (https://www.gutenberg.org/ebooks/21076); "byrne euclid" search returns no records |

OCR of any Byrne scan is text-only; the coloured diagrams and in-line
coloured symbols exist only in the page images and would have to be
re-drawn as constructions.

### (d) Modern reproductions — not the original

- **Nicholas Rougeux, *Byrne's Euclid*, https://www.c82.net/euclid/
  (launched December 2018).** A complete reset: text re-typeset, every
  diagram redrawn as SVG in Illustrator, with interactivity and posters
  (making-of: https://www.c82.net/blog/?id=79). License statement on
  https://www.c82.net/euclid/about/ — **unverified, site returned 403 to
  every fetch; per the search-engine snippet of that page:** "Posters and
  website design are copyright Nicholas Rougeux. All other content and
  diagrams are under the Creative Commons Attribution-ShareAlike 4.0
  International license (CC BY-SA 4.0)." Confirm in a browser before
  relying on it. Even if accurate, CC BY-SA is a share-alike obligation —
  anything derived from Rougeux's SVGs must itself be CC BY-SA — whereas the
  1847 scans carry no obligation. Do not confuse the two: Rougeux's
  diagrams are 2018 vector redrawings, not Byrne's woodblocks.
- **Taschen facsimile** (Werner Oechslin, 2010; Bibliotheca Universalis
  reissue 2017, ISBN 978-3-8365-5938-6): "Reproduction en fac-similé de
  l'éd. de: London: William Pickering, 1847", with a new essay by Oechslin
  in English, German and French (SUDOC MARC via
  https://archive.org/metadata/elementsofeuclid0000wern). The essay is in
  copyright; IA holds the scan lending-only. Use the Getty/Toronto scans,
  not Taschen's photographs.
- **Kronecker Wallis, *Euclid's Elements: Completing Oliver Byrne's work*
  (2017 Kickstarter)** — a new design that extends Byrne's style to Books
  VII–XIII; "©2026 Kronecker Wallis. All rights reserved."
  (https://kroneckerwallis.com/product/euclids-elements-completing-oliver-byrnes-work/).
  Entirely modern; nothing in it is PD except what it copies from 1847.
- **jemmybutton/byrne-euclid** (MetaPost/TeX rendition; TeX under CC BY-SA
  4.0, `.mp` library GPL-3.0; README: "not intended to create the exact copy
  of the original", https://github.com/jemmybutton/byrne-euclid) — a
  reinterpretation, not a source.

---

## Summary table

| Text | PD in US? | Best source | Figures present? | Caveats |
|---|---|---|---|---|
| Heath, *Elements* 1st ed. 1908 | Yes (pre-1931) | IA `thirteenbookseu02/00/01heibgoog` (Google scans, OCR + hOCR); HathiTrust `uva.x001426155` / `uva.x001671689` / `uva.x001866313` (`pdus`); Perseus TEI for text only | Scans: yes. Perseus XML: **no** (empty `<figure>`) | Google-digitized (HathiTrust asks images/OCR not be re-hosted; retyped text unrestricted). Perseus records disagree on 1908 vs Dover 1956 as keyed printing. |
| Heath, *Elements* 2nd ed. 1926 | Yes (pre-1931, foreign) | IA `euclid_heath_2nd_ed` (user upload of Dover 1956 = "unabridged and unaltered republication of the second edition") | Yes, poor scan | No library-grade scan of the 1926 printing found; library Dover copies coded `ic` by date default. |
| Joyce, online *Elements* (1996–2020) | **No** — living author, "Currently, all rights are reserved." | Brown's `euclids-elements-lektor` `content/elements/`, by Joyce's May 2026 permission to Brown | Joyce's GIF/applet figures, © Joyce | Permission is to Brown, "specific; it is not transitive". Our contributions go into Brown's repos; any republication of our own needs Joyce's permission to us. |
| Fitzpatrick, *Elements* 2007/08 | **No** — 2007, no license anywhere | farside.ph.utexas.edu PDF | Yes (vector) | canberead's CC BY 4.0 badge does not cover this prose; use canberead only for Sagiroglu's layout data, with attribution. |
| Heath, *Conics* 1896 | Yes (pre-1931) | IA `treatiseonconics00apolrich` (UC Libraries, non-Google, OCR + hOCR); HathiTrust `uc2.ark:/13960/t4bp08b2n`, `hvd.32044025682550` (`pd`) | Yes, in page images | Heath's text is a condensed paraphrase in modern notation, not Apollonius's sentences — the narrative rule applies to *Heath*. OCR of notation is poor. |
| Hilbert/Townsend, *Foundations* 1902 | Yes (US, pre-1931) | Gutenberg #17384 — PDF + LaTeX source + 52 PNG figures; IA `abr1237.0180.001.umich.edu` for the 1902 scan | Yes, 52 | Gutenberg text keyed from the 1950 Open Court reprint. No HTML/EPUB format exists. 1971 Unger/Bernays edition is a different, copyrighted translation. |
| Byrne, *Elements* 1847 | Yes (everywhere) | IA `firstsixbooksofe00byrn` (Getty, colour, non-Google) or `firstsixbooksofe00eucl` (Toronto); HathiTrust `gri.ark:/13960/t9766b543` | Colour page images only; OCR loses the coloured symbols | Rougeux (c82.net, 2018) is a CC BY-SA redrawing (unverified), Taschen 2010/2017 and Kronecker Wallis 2017 are copyrighted modern editions. Gutenberg #21076 is Casey, not Byrne. |

## Rules

**May republish verbatim, no permission needed**

- Heath, *Thirteen Books of Euclid's Elements*, 1908 **or** 1926 text,
  including Heath's introduction and commentary (both pre-1931; author
  d. 1940). Take the text from the 1908 IA/HathiTrust scans or Perseus, or
  the 2nd-edition text via the Dover-reprint OCR; cite the edition used.
- Heath, *Apollonius of Perga: Treatise on Conic Sections*, 1896.
- Hilbert, *The Foundations of Geometry*, Townsend translation, 1902
  (Gutenberg #17384; strip the PG license and trademark if we modify or
  sell — https://www.gutenberg.org/policy/license.html).
- Byrne, *First Six Books*, 1847 — text and the original coloured page
  images from the Getty or Toronto scans.
- Attribution to Gutenberg, Perseus (CC BY-SA on *their markup* only) and
  the scanning library is courtesy, not obligation, for the PD text itself;
  if we reuse Perseus's TEI structure rather than just the words, honour
  CC BY-SA 4.0.

**Needs permission before any use outside Brown's repos**

- Joyce's narrative, Guides, figures and page structure. Inside
  `brownnrl/euclids-elements-lektor` we work under Brown's May 2026 grant;
  anywhere else, ask Joyce directly (his Quora account is the channel Brown
  used).
- Fitzpatrick's English translation — silent means all rights reserved.
  Ask him, or do not use. The facing Greek (Heiberg 1883–85) is PD.
- Rougeux's SVG diagrams — only under CC BY-SA 4.0 terms, and only after
  the license statement on c82.net/euclid/about/ has been read first-hand.

**Must not be touched**

- Green Lion Press *Euclid's Elements* (2002): its typesetting, redrawn
  diagrams, index, glossary, prefaces and "minor corrections".
- Green Lion Press *Conics* (1998/2002/2013) and Taliaferro's GBWW
  translation (1952); Toomer (1990).
- Open Court 1971 Unger/Bernays *Foundations of Geometry*.
- Taschen's facsimile photographs and Oechslin essay; Kronecker Wallis's
  Books VII–XIII designs.
- Any Dover reprint *front matter* added after 1930 (none was found in the
  1956 Heath, but check each printing's copyright page).

**Working practice**

- Record, per work, the exact scan identifier the narrative was taken from
  (IA id or HathiTrust htid) so a reader can verify fidelity page by page.
- Prefer non-Google scans (UC "rich", Michigan DLPS, Getty, Toronto) for
  page images we re-host; Google-digitized images carry HathiTrust's
  "please don't re-host" request even though the pages are PD.
- Diagrams in every PD source are page images only; the interactive
  figures we author are new works and get our own license.
- Re-verify the two **unverified** items (HathiTrust policy wording,
  Rougeux's license) in a browser before either is relied on.
