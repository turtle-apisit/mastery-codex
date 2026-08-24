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
- True/false, or multiple choice with an obviously silly distractor. Both grade above their real difficulty.
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

## Failure modes to avoid

- Grading a keyword match as understanding.
- Writing the retry item from the concept name rather than the recorded error.
- Bundling two questions in one item.
- Ending essay feedback with only praise.
- Adjusting a delta to be encouraging. The scorecard is a measurement instrument; bending it breaks every downstream decision Polaris and Antares make.
