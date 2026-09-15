---
name: exercise-design
description: Expertise for writing exercises that actually measure understanding, and for grading essays and answers with specific, substantive feedback. Covers cognitive-level targeting, item construction per content type, retrieval-practice design, time estimation, diagnostic retry design, and essay rubrics. Load before authoring any exercise file or grading any learner artifact.
---

# Exercise Design & Grading

Two crafts. Writing an item that can only be answered by someone who understands, and reading an answer closely enough to say precisely what's missing.

## 1. Cognitive level — pick it before picking a format

Every item targets one level. Choose the level from the concept's current status, then choose a format that can only be satisfied at that level.

| Status | Target level | The item asks for |
|---|---|---|
| `untrained` (0–39) | Recall + Explain | state it, define it, say why it exists |
| `training` (40–79) | Apply + Analyze | use it on a new case, compare it to its nearest neighbour, predict a failure |
| `mastered` (80+) | Evaluate + Transfer | choose between it and an alternative under a constraint, critique a wrong use |

The most common design failure is **format/level mismatch**: a "compare X and Y" prompt given to an `untrained` concept produces a fluent answer assembled from the slide, which grades as understanding and isn't.

### The paraphrase trap
If the source's own sentence answers the item, the item measures reading, not understanding. Before finalizing any prompt, search the source for its answer. If it's there verbatim, change the item — most cheaply by moving it to a **new case**: same concept, an example the source never used.

## 2. Item construction by content type

### Theoretical concepts
- **Explain-in-own-words** — add a constraint that blocks recitation: "without using the word *gradient*", "to someone who knows calculus but not ML", "in three sentences".
- **Compare-two-concepts** — must name the *dimension* of comparison, otherwise you get two definitions side by side. "Compare batch and stochastic gradient descent **in terms of variance of the update**."
- **Predict-the-failure** — "the learning rate is set to 10. Describe what happens and why." The strongest theoretical item type; wrong models produce visibly wrong predictions.
- **Justify-or-refute** — give a plausible-sounding false claim and ask for a verdict with reasoning. Guessing gets 50%; the reasoning is the graded part.

### Practical concepts
- **Fix the broken artifact** — supply code/config/a diagram with one deliberate defect tied to the concept. Best signal-per-minute of any format.
- **Write from spec** — small, bounded, one concept. "Implement the update step" not "implement the trainer".
- **Trace the execution** — give inputs, ask for intermediate state. Catches memorized-shape-of-the-code understanding.
- **Decision walk** — a scenario with a constraint, ask which option and why. The "why" carries the whole grade.

### Never
- True/false, or multiple choice with an obviously silly distractor. Both grade above their real difficulty. Simulation rounds are the one place multiple choice is used deliberately, and they are allowed it only by satisfying this rule rather than by being exempt from it — see §8.
- Items with two questions bolted together — you can't tell which half failed, which destroys the diagnostic value for the next retry.

## 3. Retrieval practice and desirable difficulty

The exercise is not a check of learning — it *is* the learning event. Design accordingly:

- **Closed-book by default.** State it in the prompt. Retrieval from memory is what strengthens the trace; looking it up doesn't.
- **Generate before checking.** Ask for the answer first, then permit source-checking afterwards. Even a wrong attempt improves later retention.
- **Aim at ~70% success.** Too easy teaches nothing; consistently failing destroys the loop. If a concept's last two attempts were both fully correct, raise the level before raising the volume.
- **Vary surface, keep structure.** Reuse the same underlying question with a different scenario across weeks. Same-wording repeats train the wording.
- **Interleave when possible.** On a deep-dive day covering three concepts, mixing them beats three blocks — it forces the learner to first identify *which* idea applies.

## 4. Retry items must be diagnostic

On a deep-dive day, the retry item is built from the **specific recorded error**, not the concept name.

Read the `result_note` on the last attempt. Then:

| Recorded error | Retry design |
|---|---|
| Wrong mechanism / wrong model | Predict-the-failure on that exact mechanism |
| Right idea, wrong boundary ("missed the tradeoff") | A case that sits exactly on the boundary they missed |
| Vague, no specifics | Same question, hard constraint: name three specifics, no adjectives |
| Confused with a neighbour concept | Compare-two-concepts, dimension = whatever they conflated |

Always label it in the file (`retry: true` plus the one-line reason). The learner should see *why* it came back — that framing is half the corrective value.

If no wrong answers exist for a deep-dive day, fall back to the lowest-scoring unlocked concept. Never invent a weakness to target.

## 5. Time estimation

Estimate from work, not word count. Rough anchors:

| Item | Realistic minutes |
|---|---|
| Short-answer, one concept, 3–5 sentences | 8–12 |
| Compare two concepts with a named dimension | 12–18 |
| Trace execution / small derivation | 10–15 |
| Fix a broken artifact (one defect, <40 lines) | 15–25 |
| Write from spec (single function/component) | 20–30 |
| Decision walk with justification | 15–20 |
| Essay | 45+ — never bundled with other items |

Then check the **set** against the day's budget. Over budget: cut items, don't shrink estimates. A padded estimate corrupts Corvus's calibration audit and the learner's trust in the number.

Under-filling is a real option. Three sharp items beat six shallow ones at the same total minutes.

## 6. Essay feedback

The contract is specificity. A grade with no quoted evidence is not feedback.

**Read twice.** First pass: does the argument hold end to end? Second pass: line-level claims.

For **every** claim that is wrong, vague, or unsupported:
1. Quote the sentence.
2. Name the defect: *factually wrong* / *right but unsupported* / *too vague to evaluate* / *conflated with X*.
3. Give the correct version, or the specific thing that would make it supportable.
4. Cite the source location the learner should re-read.

Then, always, name **the one or two sharpest points** that showed real understanding — quoted, with why they're sharp. This applies to strong and weak essays alike. Generic praise ("well explained") is the single most-flagged defect in process audits; it is worse than silence because it reads as evaluated when it isn't.

### Reading past fluency
Confident prose hides gaps. Watch for:
- **Vocabulary without mechanism** — correct terms, no causal chain between them.
- **Restated premise as conclusion** — the essay's "therefore" adds nothing to its "because".
- **Unfalsifiable hedging** — "it depends on the situation" with no situation named.
- **Correct-by-recitation** — verbatim source phrasing around an otherwise empty argument.

Each of these is a *wrong* answer wearing a right answer's clothes. Grade the mechanism, never the prose.

## 7. Grading calibration

Deltas must mean the same thing this week as last week. Grade the artifact against the concept's source and current level, never against the learner's other answers that day.

| Answer quality | Delta band |
|---|---|
| Complete, correct mechanism, handles the boundary case | +15 to +20 |
| Correct core, one meaningful omission | +10 to +14 |
| Right direction, mechanism shaky or partly wrong | +4 to +9 |
| Recognizably on-topic, understanding not demonstrated | 0 to +3 |
| Confidently wrong mechanism | −5 to −10 |

A confidently wrong answer is worth a **negative** delta: it's evidence the concept's score was overstated. Silently awarding 0 lets a wrong model sit at a `training` score indefinitely.

Every `result_note` must state what was right and what was missing, concretely enough that next week's retry item can be built from it alone. "Partially correct" is a useless note; "derived the update rule, missed that the learning rate trades stability for speed" is a next exercise.

## 8. Simulation rounds

A Simulation round is twelve items on one subject — 10 `choice` + 2 `written`,
about fifteen minutes, every day. `SIMULATION.md` carries the objective and the
nine-point conformance checklist a set is audited against; this section is the
craft of building one.

### Multiple choice, and why it is allowed here

§2 says never to write multiple choice with an obviously silly distractor,
because it grades above its real difficulty. That still stands, and it is the
reason ten of the twelve items can be multiple choice at all: **a Simulation
distractor is not a wrong option, it is a hypothesis about how someone
misunderstands this Technique.**

Each of the three wrong options names a specific, nameable error — a reversed
direction, a confused neighbour concept, a right mechanism applied outside its
boundary. Which one the learner picks is the item's entire diagnostic output,
and it is the only material Atlas has to write that item's history note with
(`xp-ledger` §7). A filler option produces no note, and one round later that
Technique cannot be targeted.

The practical test before an option ships: **finish the sentence "picking this
means they think ___".** If you cannot, the option is filler and the item is
not ready. Four plausible-looking options where only one is diagnostic is the
same failure as one silly option, dressed better.

### Targeting the twelve

A round is targeted, never sampled. Read the subject's Techniques with their
`score` and recent `technique_history`, then fill in this order:

1. **Weak and unlocked** — lowest scores first. This is most of the round.
2. **Going stale** — `mastered` or high `training` with an old `last_reviewed`.
3. **A short confirming tail** — one or two strong ones, to catch a score that
   is no longer true.

Never twelve at random. Random sampling answers *how are you doing*; the
feature exists to answer *what is weak*. Write the reasoning into
`exam_sets.targeting_note` so a later audit can ask why these twelve.

`locked` Techniques are out, per shared-contract item 3 — a locked Technique
in a round means the targeting step ignored the lock, and Atlas will bounce
the item anyway.

### Before writing an item: the repeat search

The learner's rule is that questions never repeat but topics are meant to. So
for every Technique the round touches, read what has already been asked of it:

```sql
select i.question, i.item_type, i.source_basis, s.set_number
from exam_items i
join exam_sets s on s.id = i.exam_set_id
where i.technique_id = '<technique id>'
order by s.set_number;
```

Every prior set, not just the last one. `exam_attempts` allows exactly one
attempt per item, so a repeat cannot even be answered twice — but the real
damage is subtler: a re-served question measures recall of the answer, and the
score it produces goes into the same curve that round 3 is compared against.
The comparison is the deliverable, so a repeat corrupts the deliverable.

This is §3's "vary surface, keep structure" made strict. Same underlying
structure is fine and good; the same question is not.

### The two axes a repeated topic varies along

At least one must change, or it is a paraphrase:

**Cognitive level.** §1's table already maps status to level, and that is the
first axis — an `untrained` Technique gets recall and explain, a `training` one
gets apply and analyze, a `mastered` one gets evaluate and transfer. As a score
climbs, its questions must climb with it, which is what stops round 5 from
re-asking round 1 in new words.

**`source_basis`.** `lecture` asks it in the source's own framing; `outside`
asks it from a situation the lecture never covered; `mixed` needs both. An
`outside` item must never contradict the lecture — it extends it, and
shared-contract item 6 still applies: an item you cannot ground in a source
does not ship.

### Choice item mechanics

- Four options, and the correct answers **spread across all four letters over
  the round**. Options render in the order written and are never shuffled, so a
  set whose answer is usually A can be passed without reading it.
- One question per item. §2's ban on two-questions-bolted-together matters more
  here, not less — a choice item gives you one bit, and if that bit is about two
  things it is worth nothing.
- No "all of the above" / "none of the above". Neither can be turned into a
  sentence about what the learner thinks.

**Where the diagnosis is stored.** Writing a diagnostic distractor is pointless
if the diagnosis only lives in the draft: at grading time the choice items score
themselves, and Atlas has to write each item's history note months later. So
`exam_items.options` is a JSON array of objects, not of strings, and it carries
the diagnosis with the option:

```json
[
  { "text": "It guarantees every replica sees the write before the commit returns",
    "diagnosis": null },
  { "text": "It guarantees the write survives a crash once the commit returns",
    "diagnosis": "confuses durability with replication — reads D as a statement about copies rather than about persistence" },
  { "text": "…", "diagnosis": "…" },
  { "text": "…", "diagnosis": "…" }
]
```

`correct_option` is the **0-based index** into that array, so `0` is option A,
and the correct option's `diagnosis` is `null`. Every other option's is a
sentence, in the learner's terms, naming what picking it would mean. Nothing in
the schema enforces this shape — `options` is an unconstrained `json` column —
which is exactly why it is written down here.

### Written item mechanics

Two per round, and they carry half the points because they cannot be guessed.
Each needs a `model_answer` and a `rubric` — the database will not accept a
written item without both.

The rubric has to produce a defensible `content_score` of 0–3, so write it to
these bands rather than as free advice:

| `content_score` | The answer |
|---|---|
| 3 | gets the mechanism right and complete for what was asked |
| 2 | gets the mechanism right, missing or blurring one required element |
| 1 | is on topic but the mechanism is wrong, or it only restates the term |
| 0 | is off topic, empty, or confidently wrong in a way that would mislead |

Name, in the rubric, the specific elements a 3 requires. "Demonstrates
understanding" is not a rubric — it cannot be disagreed with, which means it
cannot be audited either.

### Grading a round

The ten choice items grade themselves against `correct_option`
(`graded_by: 'auto'`). The two written ones are Vega's judgment
(`graded_by: 'vega'`), producing:

- `content_score` 0–3, from the rubric bands above.
- `writing_clarity` 0 or 1 — could a reader follow the argument in one pass.
- `writing_precision` 0 or 1 — are the technical terms used exactly, rather
  than gestured at ("some kind of", "it sort of").
- `feedback` — §6's rules unchanged. Quote the sentence, say what is wrong,
  give the correct version.

The two writing sub-scores are recorded and **never** move a Technique's score;
only `content_score` does (`xp-ledger` §7). Grading them honestly still matters
— they are the only record of whether the learner's writing is improving — but
they are not evidence about the Technique.

The handoff to Atlas is then just the `exam_set_id`. The twelve results are
already in `exam_attempts`, and retyping them into a YAML block is only an
opportunity to mistype one.

## Failure modes to avoid

- Grading a keyword match as understanding.
- Writing the retry item from the concept name rather than the recorded error.
- Bundling two questions in one item.
- Ending essay feedback with only praise.
- Adjusting a delta to be encouraging. The scorecard is a measurement instrument; bending it breaks every downstream decision Polaris and Antares make.
