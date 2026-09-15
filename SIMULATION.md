# SIMULATION.md

What the Simulation feature is for, what it deliberately is not, the journey a
learner actually walks through it, and the checklist an exam set is audited
against before it is written.

Read this before building anything under `web/app/simulation`, and before
generating a single exam item.

## 1. Objective

> **Turn the vague feeling "I'm not solid on this subject" into a ranked list
> of weak Techniques, backed by evidence, and close them one round at a time.**

The success test is deliberately narrow and falsifiable:

**After three rounds on a subject, the system must be able to name which
Techniques improved and which did not.** If it cannot answer that from stored
data — not from a summary, not from a vibe — the feature has failed, however
good the questions were.

Everything below exists to serve that one sentence. Every design decision in
this file can be traced back to it, and anything that cannot be traced back to
it does not go in.

## 2. Anti-objective

Three things it is explicitly not, because each one is a plausible drift that
would quietly kill the objective:

- **Not a grade generator.** The number at the end of a round is not the
  product. The per-Technique delta is. A round that produces 18/20 and no
  usable signal about which Technique is weak has produced nothing.
- **Not a second Final Approach.** Final Approach is closed-book revision
  before a real exam: a fixed bank, a whole subject, run rarely. Simulation is
  a short daily drill during active learning, generated fresh each time,
  targeted at what is currently weak. They share a vocabulary and nothing else.
- **Not a time-filler.** ~15 minutes a day, every day, is the whole budget. A
  format that grows past that stops being daily, and a drill that is not daily
  produces a history too sparse to compare rounds against.

## 3. Format

**10 multiple choice + 2 written = 20 points, roughly 15 minutes, daily.**

| Item type | Count | Points each | Subtotal | Breakdown |
|---|---|---|---|---|
| `choice` | 10 | 1 | 10 | correct / incorrect, nothing in between |
| `written` | 2 | 5 | 10 | 3 content + 1 clarity + 1 precision |

The written item's five points split **3 content + 2 writing**, and the split is
load-bearing rather than cosmetic — see *Scoring* below for why only the content
half is allowed to move a Technique's score. The database already carries the
ranges: `content_score` is constrained to `0–3`, and `writing_clarity` and
`writing_precision` to `0–1` each.

The schema needs no change to support this. Nothing in `exam_sets` /
`exam_items` / `exam_attempts` hardcodes a count or a split: `item_type` and
`position` carry the shape, and a set is whatever its items say it is.

## 4. Questions never repeat. Topics are supposed to.

The learner's rule, verbatim:

> ข้อสอบไม่ควรซ้ำแต่หัวข้อซ้ำได้ เพื่อจะได้ทบทวนเรื่องเดิมซ้ำ แต่วิธีคิดเปลี่ยนตามโจทย์
> เพราะถ้าทำโจทย์เดิมซ้ำก็จะเหมือน copy paste ไม่ได้ช่วยให้คิดได้ดีขึ้น

Re-serving a question the learner has already seen measures recall of the
answer, not understanding of the Technique. Since the whole objective rests on
comparing round 3 against round 1, a repeated question does not just waste an
item — it *corrupts the comparison*, because the score went up for the wrong
reason.

**This settles the `exam_attempts` 1:1 constraint.** `exam_attempts.exam_item_id`
is unique (`isOneToOne: true`), meaning an item can be answered exactly once,
ever. That looked like a limitation to design around. Under this rule it is
the correct constraint, enforced by the database, and no schema change is
needed.

It creates one hard obligation on whoever generates a set:

> **Before writing a new item, read every existing `exam_items` row for that
> `technique_id` — across all sets, all time — and confirm the new question is
> not one of them.**

Not a similar question. Not a paraphrase. A genuinely different way in.

### The two axes a repeat topic must vary along

A Technique will be examined many times. Each time, at least one of these
changes:

**Cognitive level** — recall → apply → compare → diagnose.
*What is ACID?* / *This transaction interleaving violates which property?* /
*ACID vs BASE, when would you pick each?* / *This system loses writes under
load — which property is not actually holding, and why?* Four questions, one
Technique, four different things being measured.

**`source_basis`** — `lecture` / `outside` / `mixed`. The same Technique asked
from the lecture's own framing, from a situation the lecture never covered, or
from a case that needs both. An `outside` item must never contradict the
lecture; it extends it.

Varying neither axis produces a paraphrase, and a paraphrase is a repeat.

## 5. The journey — six moments

The feature is six moments. Moment 6 is the one the whole thing is built for;
the first five exist to make it possible.

**1 — The learner names a subject.**
Not the system. The learner says "Software Architecture today". Subjects are
never mixed inside one set: one set, one subject, enforced downstream.

**2 — The set is targeted, not sampled.**
The generator reads that subject's Techniques with their current `score` and
`technique_history`, and picks what to examine: weak Techniques first, then
ones going stale, then a small tail of strong ones to confirm they have held.
Never twelve items drawn at random — random sampling answers "how are you
doing" and the objective needs "what is weak".
The reasoning goes in `exam_sets.targeting_note`, so a later audit can ask why
these twelve.

**3 — The learner sits the round.**
10 choice + 2 written, ~15 minutes, one sitting. Answers land in
`exam_attempts`.

**4 — Choice grades itself. Written does not.**
The 10 choice items are scored the instant they are submitted — the answer is
in `exam_items.correct_option`, there is nothing to judge. The 2 written items
go to Vega against the item's stored `rubric`, producing `content_score`,
`writing_clarity`, `writing_precision` and real `feedback`. The learner sees
their choice result immediately and the written result once grading lands;
those are two different moments and the UI should not pretend otherwise.

**5 — Atlas commits it to the ledger.**
Every graded item becomes one `technique_history` row and moves the
Technique's `score`. This is the moment that makes moment 6 possible, and it
is the moment that has to exist *first* — see *Build order* below.

**6 — The next round shows the learner what moved.**
Not a score. A list: this Technique went 34 → 51 over three rounds, this one
has sat at 28 through all three, this one you got right twice and wrong today.
This is the deliverable. Moments 1–5 are plumbing for it.

Which is exactly why moment 6 cannot be built first. A results screen is a
*view over `technique_history`*. With no history rows, it renders an empty
list — and history rows can only be produced going forward, never backfilled
(`technique_history` is append-only and enforced as such by a database
trigger). Every day the drill runs without Atlas wired is a day of comparison
data that does not exist and cannot be recovered.

## 6. Scoring: what may move a Technique's score, and what may not

Atlas is the only writer of scores; the `xp-ledger` skill governs the
arithmetic and is loaded before any write. Two rules specific to Simulation:

**Only `content_score` moves a score.** `writing_clarity` and
`writing_precision` are recorded on the attempt and are never converted into a
delta. A learner who understands the Technique and writes it awkwardly has not
understood it less. Letting prose quality move the score would put noise into
the exact number moment 6 compares, and the objective's success test would stop
meaning anything.

**One `technique_history` row per graded item, never one per set.** A set of 12
items touching 7 Techniques produces 12 rows, not 1 and not 7. The per-item row
is what makes "which Technique improved" answerable; a per-set row answers only
"how did today go", which is the anti-objective.

**Every row carries a substantive note, and that constrains the distractors.**
The `xp-ledger` skill bounces a handoff whose note reads "correct" or "partial",
because next round's targeting is built from that string. For a written item the
note is easy — Vega's feedback already says something. For a choice item the
only material available is *which wrong option was picked*, so each distractor
has to be written to diagnose a specific, nameable misunderstanding. A
throwaway wrong option produces an unwritable note and, one round later, an
untargetable Technique.

Proposed activity mapping — daily drills are not the five-week exam and should
not be indistinguishable from it in the ledger:

| Simulation item | `technique_history.activity` |
|---|---|
| choice | `quiz` |
| written | `essay` |

`exam` stays reserved for Antares's five-week cycle, so Corvus can still tell
daily-drill evidence apart from real exam evidence when auditing.

## 7. Chain of command

The learner names the subject. Nova directs. Nobody writes alone.

```
learner  →  names the subject
Nova     →  directs Vega (NPC, exercise-design) to generate the set
Vega     →  drafts 12 items
Rigel    →  audits them (Vega's paired Central agent)
Nova     →  cross-checks the same source material independently, with Rigel
             ├─ both agree      → write the set + one exam_set_reviews row
             └─ they disagree   → write nothing; report both readings and the
                                  source passage each rests on to the learner
```

This is the pre-write gate from `CLAUDE.md`, instantiated for exam sets. The
`exam_set_reviews` row (`central_agent: 'vega'`'s pair — `rigel` — plus both
verdicts and a note) is the evidence the gate ran. **A set with no
`exam_set_reviews` row has not cleared the gate**, no matter what a generation
summary says.

Grading is the same shape: Vega grades the written items, Rigel audits the
grades against the rubric, Nova cross-checks, and only then does Atlas commit.

## 8. Conformance checklist

Distinct from content quality. Rigel already judges whether a question is
*good*; this checks whether the set is *the thing that was designed*. Every
point is mechanically checkable, and all nine must pass before the write:

1. **Exactly 10 `choice` + 2 `written`.** Not 11 and 1.
2. **Every item is bound to a `technique_id`**, and every one of those
   Techniques belongs to the set's subject. No cross-subject items, ever.
3. **No question duplicates an existing `exam_items` row** for that
   `technique_id`, across all sets and all time.
4. **Where a topic repeats, the angle genuinely changed** — a different
   cognitive level or a different `source_basis`, not a paraphrase.
5. **Every choice item has a `correct_option`**, and the correct answers are
   spread across all four letters. A bank whose answer is always A can be
   passed without reading it.
6. **Every distractor names a specific misunderstanding.** Not filler, not an
   obviously absurd option — picking it has to mean something a note can state
   (see *Scoring* above for why this is structural and not a style preference).
7. **Every written item has both a `model_answer` and a `rubric`.** Without a
   rubric there is no defensible `content_score`, and without that there is no
   delta.
8. **`source_basis` is accurate on every item**, and no `outside` item
   contradicts the lecture material.
9. **`exam_set_reviews` is written only after Rigel and Nova have both agreed** —
   never as part of the same write that inserts the items.

Points 5 and 7 are partly enforced by `check` constraints already — a `choice`
row cannot exist without `options` and `correct_option`, a `written` row cannot
exist without `rubric` and `model_answer` — so what is actually left to judge
there is the spread of correct letters and the quality of the rubric. Points 1,
2, 3, 4 and 6 have no database backstop at all and are the ones a set will
silently fail.

## 9. Build order

The learner chose to wire the ledger before the screen, for the reason in
moment 6: the drill is daily, so history accumulates fast, and a week run
without Atlas is a week of comparison data lost permanently.

**Phase 3 — Atlas wiring (first).** Graded `exam_attempts` become
`technique_history` rows and `techniques.score` updates, per the rules in
*Scoring* above. Nothing renders yet; the ledger simply starts recording.

**Phase 2 — The Simulation UI (second).** The six moments as real screens,
with moment 6 reading a `technique_history` that already has something in it.

Numbered this way because the phases were named before the order was decided.
The order is what counts.
