---
name: concept-capture
description: Expertise for turning a lecture PDF or slide deck into atomic concept notes with a sound prerequisite graph. Covers atomicity tests, extraction heuristics for messy decks, content-type tagging, dependency-vs-adjacency judgment, and merge-vs-create decisions. Load before capturing any new source material into 02-Concepts.
---

# Concept Capture

The craft of decomposition. A capture is good when every note it produces can be tested by one focused exercise, and when the prerequisite edges it draws are real dependencies rather than topical neighbours.

## 1. The atomicity test

A candidate is one concept if it passes **all four**:

1. **One-sentence definition.** You can state what it is in a single sentence without "and also".
2. **One-exercise testable.** A single short-answer or hands-on task can establish whether the learner understands it.
3. **Independently wrong.** A learner can get *this* wrong while getting the neighbouring ideas right. If failing A always means failing B, they're the same note.
4. **Stable name.** It has a name the source itself uses, or an obvious canonical one. If you had to invent a label to hold the idea together, it's probably a section heading, not a concept.

Failing 1 or 2 → **split**. Failing 3 → **merge** into the neighbour. Failing 4 → it's structure, not content; drop it.

### Split bias
When genuinely torn, split. Two notes that later prove redundant cost one merge; one note holding two ideas silently hides which half the learner is failing, and that failure is invisible in the scorecard forever.

### Common false concepts
- **Slide titles** — "Optimization, Part 2" is navigation, not an idea.
- **Agendas / recaps / summary slides** — no new teachable content.
- **Worked examples** — an example is *evidence for* a concept, not a concept. Attach it to the concept it demonstrates.
- **Notation tables** — folded into the concept that uses the notation.
- **Umbrella terms** the lecture never actually explains ("Deep Learning" in a slide about backprop) — mention it in the summary as seen-but-under-explained.

### Common missed concepts
- An idea introduced only in a **worked example's reasoning** ("note we divide by n here because…") — often a real concept the slides never titled.
- A **distinction** taught in passing ("batch vs. stochastic") — distinctions are highly testable and belong as their own note when the source explains both sides.
- **Failure modes** ("this diverges when the learning rate is too high") — these carry most of the practical understanding and are frequently dropped.

## 2. Extraction from messy sources

### Getting the text out first

Never read a slide deck page by page through the Read tool when a text layer
exists — it is slow and you lose the ability to grep back across the deck.
Convert the whole file once, then work from the text.

```bash
# PDF -> text, preserving column layout (poppler; already on PATH here)
pdftotext -layout "input.pdf" "output.txt"

# PPTX -> text. There is no pptx reader; unzip the slide XML and strip tags.
unzip -q -o "input.pptx" "ppt/slides/*.xml" -d /tmp/pptx
for i in $(seq 1 200); do
  f="/tmp/pptx/ppt/slides/slide$i.xml"; [ -f "$f" ] || continue
  echo "=== Slide $i ==="
  grep -o '<a:t>[^<]*</a:t>' "$f" | sed -e 's|<a:t>||g' -e 's|</a:t>||g'
done > output.txt
```

`seq` is needed because `slide10.xml` sorts before `slide2.xml` — globbing the
directory gives you the deck out of order.

Then check `wc -w` on every output before reading any of it. Two signals:

- **A few dozen words from a multi-megabyte file** = image-only PDF with no text
  layer. This is the "unextractable source" case below — report it, do not guess.
- **Tens of thousands of words** = not a lecture deck. A textbook or industry
  report does not decompose the way a deck does; raise it before capturing.

Two files with near-identical word counts in one folder are usually one deck
exported twice (`slides.pdf` / `slides_full.pdf`). Diff them, keep one, and list
both in `source` only if they genuinely differ.

### Then decompose

Decks are rarely clean prose. Work in this order:

1. **Headings first** — build a skeleton of the lecture's own structure.
2. **Bullet depth** — a bullet with sub-bullets that explain *why* or *how* is usually a concept; a flat bullet list is usually one concept's properties.
3. **Formulas** — a formula with a derivation or an explained term list is a concept. A formula restated for reference is not.
4. **Figure captions and diagram labels** — often the only place a relationship is stated explicitly.
5. **Emphasis markers** — bold, boxed, "important", "exam" — the lecturer is telling you what carries weight. Never the sole reason to make a note, but a strong tiebreaker on split-vs-merge.

**Repeated content across weeks** is the norm, not duplication. Week 5 restating gradient descent means the note gains a source, not a second note.

**Unextractable source** (scanned images, OCR garbage, empty text layer): stop and report it. A capture invented from the filename's topic is worse than no capture — it seeds the whole downstream loop with fiction that the learner will be graded against.

## 3. Content-type tagging

Every note carries a content type, because it decides how the concept can be tested at all.

| Type | Signals in the source | Consequence downstream |
|---|---|---|
| `theoretical` | definitions, comparisons, motivations, "why", proofs of intent | short-answer, compare-two-concepts, explain-in-own-words |
| `practical` | code, pseudocode, step-by-step procedures, parameter choices, architecture diagrams, "how to" | write/fix code, design a diagram, walk a decision |
| `mixed` | a theory with a mandatory mechanical step (e.g. backprop: intuition + the actual chain of derivatives) | tested both ways on different days |

Tag `mixed` sparingly — it doubles the concept's testing surface. If one side dominates the source's treatment, tag the dominant side.

## 4. Prerequisite edges: dependency, not adjacency

The question is never "are these related?" It's:

> **Could a learner who does not understand A form a correct understanding of B from this source material?**

If no → `B.prerequisites` includes A. If they could — even clumsily — there is no edge.

### Three tests before drawing an edge
- **Substitution test.** Rewrite B's definition without ever invoking A. If the definition survives intact, drop the edge.
- **Ordering test.** Did the source teach A before B? A source that teaches B first is strong evidence there's no hard dependency. (Not proof — lecturers do forward-reference.)
- **Failure test.** Name the specific misunderstanding of B that not knowing A causes. If you can't name one, the edge is adjacency.

### Edges that look right and aren't
- **Sibling concepts** under the same heading — L1 and L2 regularization don't require each other.
- **Chronological ordering** — taught-on-Tuesday doesn't depend on taught-on-Monday.
- **Shared vocabulary** — both mention "gradient" is not a dependency.
- **Application → theory backwards** — "Regularization requires Overfitting" is right; "Overfitting requires Regularization" is the arrow reversed. Always sanity-check direction: the prerequisite is the thing taught *first and more basically*.

### Graph hygiene
- **No cycles.** If A requires B and B requires A, one of them is wrong or the two are actually one concept. Report it, don't guess.
- **Prefer direct edges only.** If A→B and B→C, don't also write A→C. Transitive edges make the lock rules noisier without adding information.
- **Cap it.** More than three prerequisites on one note usually means the note isn't atomic — re-run the atomicity test before proposing the edges.
- **Never cross subjects silently.** Cross-subject dependencies are real but structural; propose them in the summary and let Rigel decide.

## 5. New vs. update

Search `02-Concepts/<subject>/` before creating anything. Match on meaning, not filename:

- Exact or near-exact `skill_name` → **update**: append the new source, leave everything else untouched.
- Same idea under a different name (the deck renamed it) → **update** the existing note, and note the alias in the summary. Do not create a synonym note.
- Same name, genuinely different idea (rare, usually cross-subject) → **create**, and flag the collision in the summary.
- Broader/narrower overlap ("Regularization" exists, deck teaches "L2 Regularization" in depth) → **create** the narrower note with the broader one as prerequisite, and say so in the summary.

An update never touches `score`, `status`, `history`, or `last_reviewed`. A new source does not mean new evidence of understanding.

## 6. Capture summary quality

The summary is what Rigel audits and what the learner reads. It must state:

- counts (new / updated / skipped),
- every proposed prerequisite edge, with the one-line reason it passed the failure test,
- every seen-but-under-explained idea, so a later lecture can pick it up,
- every judgment call made (alias merges, split decisions, suspected cross-subject links),
- anything unextractable.

A summary that only lists names is not reviewable. The reasons are the reviewable part.

## Failure modes to avoid

- Capturing the whole lecture as one "overview" note.
- Inventing a score or status for new material.
- Drawing prerequisite edges from the deck's table of contents.
- Silently resolving an ambiguity instead of reporting it — every silent call is a call nobody can audit later.
