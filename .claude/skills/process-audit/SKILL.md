---
name: process-audit
description: Expertise for auditing the teaching process itself — grading consistency and drift across weeks, feedback substance, time-estimate calibration, and ledger integrity. Covers sampling for comparability, drift detection, the pattern-vs-incident threshold, and the small-fixable boundary. Load before running a process audit or writing an audit report.
---

# Process Audit

You audit the *instrument*, not the measurement it produced. The learner's answers are out of scope entirely. The question is whether the system that grades them is behaving consistently, honestly, and within its own contracts.

The failure this exists to catch is **drift**: grading standards loosening or tightening over weeks, so that a score in week 4 no longer means what it meant in week 1. Drift is invisible from inside the daily loop — every individual grade looks reasonable — and it silently invalidates every trend Polaris and Antares depend on.

## 1. Sampling for comparability

Consistency claims require *comparable* pairs. Random sampling won't produce them.

Sample **matched pairs across time**: two graded results from different weeks whose `result_note` describes similar answer quality on similar-level concepts. Then compare the deltas. That comparison is the entire audit; everything else is supporting evidence.

- Reach back **at least three weeks**. Drift under three weeks is usually noise.
- Match on described quality, not on score — matching on score assumes the answer you're trying to test.
- Include both directions: strong answers and weak answers. Drift is often asymmetric — generosity creeps into the low end while the high end stays strict.
- **Note when you can't find matched pairs.** Early in a cycle you often can't. Say so and stop; a consistency verdict from three data points is worse than no verdict.

Always state sample size and the matching basis in the report.

## 2. Grading drift

For each matched pair, the finding is: *same described quality, different delta*.

```
08-05 | Cross-Validation | "correct core, missed the stratification case"  | +9
08-22 | Regularization   | "correct core, missed the sparsity tradeoff"    | +16
```

Same described shape, +7 apart. One pair is an incident. Three pairs pointing the same direction is **drift** — escalate it.

Check separately for:

- **Ceiling generosity** — large positive deltas on concepts already near 100, repeatedly clamped. Clamping notes in the scorecard make this cheap to spot, and it means grading has stopped discriminating at the top.
- **Missing negatives** — a confidently-wrong answer graded 0 instead of negative. Look for `result_note` text describing a wrong mechanism paired with a non-negative delta. This is the most consequential single defect available: it lets a wrong mental model sit at a `training` score indefinitely.
- **Note/delta mismatch** — a glowing note with a small delta, or a critical note with a large one. Either the note or the number is wrong, and both feed downstream decisions.
- **Round-number clustering** — deltas that are all +15 / +10 / +5 suggest grading by feel and rounding, not against the bands.

## 3. Feedback substance

Sample recent essay feedback and graded results against the standard the teaching contract sets: every wrong/vague/unsupported claim quoted, defect named, correction given, source cited — plus one or two specific strengths named even when the work is strong.

Flag as **generic** when feedback:
- praises without quoting ("well explained", "good grasp of the material"),
- states a verdict with no correction ("partially correct"),
- names no source location,
- would read identically if pasted onto a different essay. That last test is the fastest and most reliable one you have.

Also flag `result_note` strings too thin to build a retry from. `"partial"` is a contract violation, not a style preference: the next deep-dive item is supposed to be constructed from that string alone, and it can't be.

Generic feedback is worse than none — it reads as evaluated when nothing was evaluated, so the gap it should have caught never surfaces.

## 4. Time-estimate calibration

Compare each sampled exercise's stated `minutes` against what the task actually demands. Typical honest anchors: short-answer 8–12, compare-with-dimension 12–18, fix-a-broken-artifact 15–25, write-from-spec 20–30, essay 45+.

Flag:
- **Underestimates** — an essay-scale prompt labelled 12 minutes. Systematic underestimation quietly blows the daily budget and makes the plan unusable.
- **Set overrun** — individual estimates fine, the day's total exceeds its budget.
- **Suspiciously uniform** estimates across very different item types — the number is decorative, not derived.

## 5. Ledger integrity spot-check

Verify the invariants on a few sampled concepts:

1. `score` = clamp(0,100, sum of history deltas)
2. `status` matches the score band (0–39 / 40–79 / 80+)
3. every history entry has a scorecard row
4. `last_reviewed` = date of the most recent non-`capture`, non-`rust-check` entry
5. no rust-check advanced `last_reviewed`
6. same-day results logged as separate entries, not merged

Violations of 1 or 2 usually mean a **missing** entry rather than bad arithmetic — say that, and never "correct" the total to match. Overwriting the score destroys the evidence needed to find the missing entry.

## 6. Pattern vs. incident

**One occurrence is never a pattern.** Escalate to *needs-human-attention* only when the same kind of issue appears **at least twice** in the sample, ideally in different weeks.

| Recurrence | Classification |
|---|---|
| once | note it, low priority, no escalation |
| twice+ across weeks | pattern → needs-human-attention |
| twice+ same day | likely one bad session, not systemic — say which |

This threshold is what keeps the audit trustworthy. An auditor who escalates every rough exercise gets ignored, and then the real drift finding gets ignored with it.

## 7. Small-fixable boundary

**Fix directly** — mechanical, unambiguous, one right answer:
- a missing history entry that the scorecard proves should exist (append retroactively, note that it was retroactive),
- a missing scorecard row for an existing history entry,
- a status that doesn't match its own score band,
- an obviously wrong time estimate (essay marked 12 min).

**Report only** — anything requiring judgment:
- any delta value (that's a grading call — never re-grade),
- feedback quality (Vega rewrites, not you),
- exercise content,
- drift itself — you diagnose it, you don't retro-adjust scores to compensate.

Retroactively adjusting scores to "correct" drift is the one action that would destroy the ledger's meaning entirely. Report and let the process change forward.

## 8. Report structure

State sample sizes and matching basis. Then findings, each with: the specific file/entry, what "good" would have looked like concretely, recurrence count, and classification (small-fixed / recommendation / needs-human-attention). Then what was fixed directly, before and after. Then explicitly what you could **not** assess for lack of data.

Order by consequence: drift first, missing negatives second, feedback substance third, calibration fourth, hygiene last.

A clean audit is a real finding. Report it with the sample size, and don't manufacture a flag to look useful.

## Failure modes to avoid

- Grading the learner. Never your object.
- Declaring drift from unmatched pairs, or from one pair.
- Re-grading an answer to prove a delta was wrong.
- Forcing a consistency verdict when there isn't enough history — "insufficient data" is the correct answer early in a cycle.
- Escalating a single incident.
- Auditing whether an exercise matches its source — that's Rigel's; two overlapping reports contradict each other.
