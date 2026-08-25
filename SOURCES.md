# Source material

What is in `assets/raw-data/`, what it became, and what it deliberately did not.

The decks themselves are **not tracked in git** — around 150MB of binaries that
would bloat the repo permanently. Notes reference them by filename in their
`source:` field, so the vault stays meaningful without them. Keep the folder
backed up separately.

A note's `unit:` overrides the group name the star chart derives from the
filename. It is set only where the filename fails to name the lecture; the
column is blank wherever the filename already reads correctly.

---

## Data Science and Engineering Principles — 40 notes

| Notes | Deck | Group name |
|---:|---|---|
| 16 | `Classification and Metrics.pdf` | *from filename* |
| 14 | `EDA-Model Fitting.pdf` | *from filename* |
| 5 | `K-means clustering basics.pdf` | *from filename* |
| 3 | `Association rules.pdf` | *from filename* |
| 2 | `Decision Trees.pdf` | *from filename* |

## Modern Software Engineering Principles — 54 notes

| Notes | Deck | Group name |
|---:|---|---|
| 16 | `2026-SEA601-04-Requirements_Analysis_and_Design.pdf` | *from filename* |
| 12 | `2026-SEA601-05-Implementation_Testing_and_Maintenance.pdf` | *from filename* |
| 10 | `2026-SEA601-01-Introduction to Software Development.pdf` | *from filename* |
| 8 | `2026-SEA601-02-Waterfall Life-Cycle Model.pdf` | *from filename* |
| 8 | `2026-SEA601-03-Iterative and Incremental Development.pdf` | *from filename* |

## Software Architecture — 75 notes

| Notes | Deck | Group name |
|---:|---|---|
| 28 | `CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf` | Architecture Styles |
| 24 | `LLMArchi.pdf` | Generative AI and LLM Architecture |
| 9 | `CH01_2_13illity_10Style 1.pdf` | Quality Attributes and Classic Patterns |
| 7 | `CH03_2_SEA604Microservices.pptx` | *from filename* |
| 7 | `class02_slides.pdf` | Model-Driven Architecture |

`CH03_SEA604_SWArchStylePatterns_Rev02_2.pptx` is the same deck as the `.pdf`
of the same name. Only the PDF was captured.

`class02_slides.pdf` and `class02_slides_full.pdf` are one deck exported twice —
the extracted text differs only in line wrapping. Only one was captured.

---

## Captured but not decomposed

### `ai_index_report_2026.pdf` — 425 pages, ~135,000 words

**Stanford HAI Artificial Intelligence Index Report 2026** (ninth edition), from
the Institute for Human-Centered Artificial Intelligence, conceived within the
One Hundred Year Study on Artificial Intelligence (AI100).

**Deliberately not turned into concept notes.** A concept note holds one
teachable idea that one focused exercise can test, and it earns its place in the
graph by depending on other ideas. This report contains **measurements and
trends** — how benchmarks moved, what was funded, what policy passed. Those are
facts about the state of the field, not methods with prerequisites. Forcing them
into the prerequisite graph would add a hundred nodes that nothing depends on
and that depend on nothing, which is worse than leaving them out.

It is a **reference to consult**, and its chapter map is the useful index:

| Ch. | Title | Page |
|---:|---|---:|
| — | Introduction | 2 |
| — | Top Takeaways | 9 |
| 1 | Research and Development | 12 |
| 2 | Technical Performance | 68 |
| 3 | Responsible AI | 126 |
| 4 | Economy | 171 |
| 5 | Science | 231 |
| 6 | Medicine | 255 |
| 7 | Education | 288 |
| 8 | Policy and Governance | 323 |
| 9 | Public Opinion | 360 |
| — | Appendix | 385 |

If a specific chapter turns out to be assigned reading, say so — it can be
captured as its own unit rather than as loose notes across the vault.

---

## Extraction notes

Every deck was converted to text before being read. The commands live in the
`concept-capture` skill; the short version:

```bash
pdftotext -layout "deck.pdf" "deck.txt"          # PDFs with a text layer
unzip -q -o "deck.pptx" "ppt/slides/*.xml" -d /tmp/x   # then strip <a:t> tags
```

**`LLMArchi.pdf` needed a different route.** Its text is stored as vector
outlines rather than characters, so `pdftotext` recovered 7 words out of 35
slides and there was no text layer to work with. It also is not a scan — only 4
of its 59 embedded images are large enough to be page content. The pages had to
be **rasterised and read as images**, using `pdfjs-dist` with `@napi-rs/canvas`
in a scratch directory rather than adding a dependency to `web/`. The deck also
carries handwritten annotations in red, which are captured in the notes where
they mark emphasis.

A word count on the extracted text is the fastest check that a source is
usable: a few dozen words out of a multi-megabyte file means no text layer, and
tens of thousands of words means it is not a lecture deck.
