---
name: exam-design
description: Expertise for building and grading the 5-week cycle exam — coverage blueprints, weighting toward weak concepts without abandoning mastered ones, miscalibration detection against scorecard predictions, and turning results into a ranked plan for the next cycle. Load in week 5 before building, grading, or reporting on an exam.
---

# Exam Design

The exam is the cycle's only **independent** measurement. Every other number in the vault comes from the same daily loop that produced the learning, so the loop cannot detect its own errors. The exam can — and that second job matters as much as the score.

Two outputs: what the learner knows, and where the system's beliefs about the learner were wrong.

## 1. Blueprint before questions

Build the coverage table first, then write items to fill it. Writing items first always produces an exam shaped like whatever was easiest to ask about.

For every subject, list every **unlocked** concept with its current score, status, `last_reviewed`, and Polaris's weakness rank. Then assign question weight.

### Weighting

| Concept state | Share of that subject's items |
|---|---|
| rusty / recent misconception | heaviest |
| untrained (unlocked) | heavy |
| training, low score | moderate |
| training, high score | light |
| mastered | **at least one**, always |

Two rules the weighting must not break:

- **No unlocked concept gets zero questions.** A skipped concept produces no evidence, and no evidence means its stale scorecard number survives another full cycle unchallenged.
- **No subject's mastered concepts get zero questions.** This is the exam's only look at silent decay — the daily loop deliberately never revisits mastered concepts, so if the exam skips them too, nothing in the system ever checks them. One light retrieval item is enough.

**Locked concepts are excluded.** Testing something the learner was structurally prevented from studying measures nothing and produces a false negative in the ledger.

**Thin-history concepts** — captured mid-cycle with almost no review — go in, but weighted **light**. Heavy weighting punishes recency of capture rather than lack of understanding, and their result should be read as a baseline, not a verdict.

### Sizing
Cover breadth over depth. It's better to have one well-targeted item per concept across everything than three items on four concepts and silence elsewhere. Coverage is the exam's comparative advantage over the daily loop.

## 2. Writing exam items

Exam items differ from daily exercises in two ways:

- **Closed-book, no retry.** So the item must be unambiguous — a daily exercise can be clarified in conversation; an exam item can't. Ambiguity here is indistinguishable from ignorance in the results.
- **They must discriminate.** An item everyone passes and an item nobody passes both carry zero information about where the learner actually stands.

Prefer formats where a wrong mental model produces a visibly wrong answer: **predict-the-failure**, **fix-the-broken-artifact**, **justify-or-refute**, **decision-walk-with-constraint**. Avoid pure recall except as the light mastery check — recall items can be passed by residue.

For mastered concepts, the light check should still require *retrieval*, not recognition. "State the tradeoff X makes" beats "which of these is X".

**Vary the surface from the daily exercises.** If an exam item repeats a week-2 exercise verbatim, it tests memory of that exercise. Same underlying idea, new scenario.

## 3. Grading

Grade with the same rigor and the same delta bands as daily essay feedback — specificity is not optional because it's an exam. Every graded answer needs a `result_note` concrete enough that next cycle's week-1 exercises can be built from it alone.

Grade **against the source material**, not against the scorecard's expectation. Knowing a concept "should" be mastered is exactly the bias the exam exists to defeat. Where practical, grade an answer before looking up the concept's current score.

Confidently wrong answers take a **negative** delta, same as any other grading event. On an exam this is common and important — it's usually the first hard evidence that an inflated score was inflated.

## 4. Miscalibration detection — the second job

For every concept, compare the exam result against what the scorecard predicted.

```
predicted = current score band
observed  = exam performance expressed on the same 0–100 scale
gap       = observed − predicted
```

| Gap | Reading |
|---|---|
| within ±15 | calibrated, no flag |
| observed much **lower** | **MISCALIBRATION FLAG** |
| observed much **higher** | flag too — under-crediting is drift in the other direction |

A `mastered` concept answered clearly wrong is the loudest signal the system can produce. Do not write it off as "the learner forgot" — decay is *supposed* to be caught by Polaris's rust detection, so a large downward gap means one of these failed:

- grading drifted generous (→ Corvus),
- rust detection missed a stale concept (→ Polaris's thresholds),
- the daily exercises tested the concept more shallowly than the exam did (→ Vega / Rigel),
- the concept isn't atomic — passing on one half, failing on the other (→ Lyra, via Rigel).

Name which you suspect and why. A flag that says only "gap detected" gives the next cycle nothing to act on.

Upward gaps matter too: they usually mean daily items were harder than the source supported, or negative deltas were applied where they shouldn't have been.

## 5. Handing off results

Exam results go through the ledger like everything else — one graded-result object per concept, handed to Atlas. Never write scores directly. The exam is a grading event with unusual coverage, not a special authority over the ledger.

Same format as any daily handoff: `concept`, `subject`, `activity: exam`, `delta`, `result_note`.

## 6. Recommendations report

The exam's value is realized next cycle, not this one. The report must be directly actionable on week 1, day 1.

Include:

1. **Weakest concepts ranked**, across all subjects, with the specific recorded error each one should be re-attacked through — not just the name.
2. **Miscalibration flags**, each naming the suspected cause and the agent who should look at it.
3. **Subjects needing structural attention** — one where most concepts scored low usually means a capture or prerequisite problem, not a study problem.
4. **What the exam couldn't measure** — locked concepts, thin-history concepts, anything unverifiable. Explicit gaps stop the next cycle from assuming coverage it doesn't have.

Rank by what should be attacked first, not by score ascending. A blocking prerequisite at 45 often outranks an isolated concept at 20, because fixing it unlocks downstream work.

## 7. Timing

**Week 5 only.** Running early collapses the spaced-recall interval the whole cycle is built around — the retention signal is precisely what the 5-week gap produces, and an early exam measures short-term recall instead. If asked to run early, say why not and offer a light rust-check sweep instead.

## Failure modes to avoid

- Writing items before the coverage blueprint.
- Skipping mastered concepts to concentrate on weak ones — that's exactly where silent decay hides.
- Testing locked concepts.
- Grading an answer against its scorecard expectation instead of the source.
- Explaining every downward gap as forgetting, and flagging none for the process.
- Writing scores directly instead of handing them to Atlas.
- Producing a recommendations list of bare concept names with no error detail attached.
