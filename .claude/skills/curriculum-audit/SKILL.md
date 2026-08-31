---
name: curriculum-audit
description: Expertise for checking that exercises actually match their source material and that the prerequisite graph is structurally sound. Covers source-alignment testing, depth-overreach detection, prerequisite graph validation (cycles, reversed arrows, transitive clutter, orphans), sampling strategy, and the fix-directly-vs-report boundary. Load before auditing curriculum structure or writing a curriculum report.
---

# Curriculum Audit

Two questions, both structural:

1. **Alignment** — does each exercise test what the source actually taught, at a depth the source supports?
2. **Graph integrity** — is the prerequisite structure a correct dependency model, or has adjacency crept in?

You are checking the *curriculum*, never the learner. A learner failing an exercise is not a finding. An exercise that nobody could pass from the source material is.

## 1. Sampling

You cannot read everything, and exhaustive review would defeat the point. Sample deliberately:

- **Exercises**: this week's, plus any concept whose score moved by more than ±15 (a big swing often means a miscalibrated item, not a real understanding change).
- **Prerequisites**: every edge proposed since the last audit, plus a random re-check of 2–3 older edges. Old edges never get re-examined otherwise, and errors there are the most expensive kind — they gate everything downstream.
- **Always include** at least one exercise from each subject with recent activity. A subject that's never sampled drifts unobserved.

State the sample size and selection basis in the report. A finding rate means nothing without the denominator.

## 2. Source-alignment testing

For each sampled exercise, open the concept's `source` and ask, in order:

1. **Is the tested idea present in the source at all?** If not → **mismatch**, the sharpest kind. The exercise tests material the learner was never given.
2. **Is it present at the depth the exercise demands?** A source that *names* L1/L2 regularization does not support an exercise asking for the subgradient of the L1 penalty. This is **depth overreach** — the most common real finding, and the most damaging, because it produces failures that look like the learner's fault.
3. **Is the required inference reachable?** An exercise may legitimately demand a step beyond the source — applying a stated rule to a new case is exactly the point. It is *not* legitimate when the step requires knowledge from a different source the learner hasn't got.
4. **Does it test the named concept, or its neighbour?** An exercise filed under Gradient Descent that actually turns on Loss Function will mis-attribute the score. Both concepts' ledgers end up wrong.
5. **Is the retry framing accurate?** If the item is marked `retry`, the recorded prior error should actually be what it targets. A retry aimed at the wrong error wastes the loop's most valuable slot.

### Verdicts
- **OK** — tested idea present, depth supported, correctly attributed.
- **FLAGGED** — a specific defect, with the source location that proves it. Report to Vega; never rewrite the exercise.
- **UNVERIFIABLE** — source unextractable or missing. Say so plainly. "Unverifiable" is an honest verdict; assuming it's fine because you couldn't check is not.

Every flag must quote **both** sides: what the exercise asks, and what the source actually says. A flag without that pairing is an opinion.

## 3. Prerequisite graph validation

Evaluate each edge with the same test used when it was proposed:

> Could a learner who does not understand A form a correct understanding of B **from this source material**?

Then check the graph-level properties that no single edge review can catch:

### Cycles
A → B → A means either an arrow is reversed or the two are one concept. **Never break a cycle by guessing** which edge to cut — report it with both edges and the evidence for each direction. A wrongly-cut cycle silently unlocks a concept that should be gated.

### Reversed arrows
The prerequisite is the concept taught **first and more basically**. Check the source's teaching order and each concept's abstraction level. "Overfitting requires Regularization" is backwards — the problem precedes its remedy. Reversed arrows are direct-fixable when the direction is unambiguous.

### Transitive clutter
If A → B and B → C, an additional A → C edge adds nothing and makes the lock rules noisier. Direct-fixable: remove the redundant edge.

### Adjacency masquerading as dependency
The recurring pattern. Signals:
- both concepts sit under the same lecture heading,
- the "dependency" is shared vocabulary rather than shared mechanism,
- they're siblings (L1 / L2, batch / stochastic) — siblings almost never depend on each other,
- you cannot name the specific misunderstanding of B that not knowing A causes.

That last one is decisive. **If you can't name the failure, there is no edge.**

### Orphans and over-connection
- A concept with **no** prerequisites in a subject full of dependency chains: possibly a missed edge, possibly a genuine entry point. Check whether the source assumes anything.
- A concept with **more than three** prerequisites: usually not atomic. Report to Lyra as a split candidate rather than trimming edges yourself.
- A prerequisite pointing at a concept that doesn't exist: broken reference, direct-fixable only by removal if the target was never captured — otherwise report.

### Cross-subject edges
Real, but structural and expensive: they make one subject's progress gate another's. Never create one silently. Evaluate the proposal, then report it as a recommendation with the coupling cost stated.

## 4. Fix directly, or report?

The line is **ambiguity**, not size.

**Fix directly** — structural, unambiguous, one right answer:
- a clearly reversed arrow,
- a redundant transitive edge,
- a prerequisite referencing a deleted/nonexistent concept,
- a missing edge where the source explicitly states the dependency ("this assumes you know X").

**Report only** — any judgment call:
- "should Regularization require Overfitting, or just Loss Function?"
- a cycle,
- anything requiring an opinion about how the subject *ought* to be taught,
- everything about exercise content, without exception.

When you fix directly, the report must still record it: what changed, from what to what, and the source evidence. An unlogged fix is indistinguishable from corruption on the next audit.

## 5. Scope boundaries

- **Never rewrite exercise content.** Vega owns authorship. You describe the defect; the fix is theirs.
- **Never touch `score`, `last_reviewed`, or `technique_history`.** Atlas's exclusively, without exception. (`status` isn't touchable by anyone — it's a generated column derived from `score`.)
- **Never grade the learner's answers.** Not your object of study.
- **Don't audit process quality** — whether feedback is substantive, whether deltas are consistent over time. That's Corvus. Overlapping produces two reports that contradict each other.

## 6. Report structure

State, in order: what was sampled and why; what passed; what was flagged, with both sides quoted and the owning agent named; what was fixed directly, with before/after; what was unverifiable.

Findings ranked by blast radius, not by discovery order:
1. prerequisite errors gating multiple downstream concepts,
2. exercises testing absent material,
3. depth overreach,
4. misattribution,
5. graph clutter.

A clean audit is a real result — say so, with the sample size that backs it. Manufacturing a finding to look diligent corrupts the signal Corvus and Antares read next cycle.

## Failure modes to avoid

- Flagging an exercise as too hard when it's correctly hard — difficulty is the design; unsupported difficulty is the defect.
- Breaking a cycle by guessing.
- Treating "unverifiable" as "fine".
- Fixing a judgment call unilaterally because it seemed small.
- Reporting names without the quoted evidence pairing.
