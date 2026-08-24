---
subject: Modern Software Engineering Principles
skill_name: Cost of Correcting Faults
score: 0
prerequisites:
- Fault Failure and Defect Terminology
- Classical Waterfall Phases
source:
- 2026-SEA601-02-Waterfall Life-Cycle Model.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 2
---

# Cost of Correcting Faults

## Summary

The cost of detecting and correcting a fault **rises steeply with the phase in
which it is found**.

**Early in the life cycle** — usually **just a document needs to be changed**.

**Late in the life cycle** — you must:

- Change the **code** and the **documentation**
- **Test the change** itself
- Perform **regression testing**
- **Reinstall the product** on the client's computer(s)

And the statistic that makes this urgent:

> **Between 60 and 70% of all faults in large-scale products are requirements,
> analysis, and design faults.**

So the faults that cost the most to fix are also the ones most likely to exist.

**The conclusion:** it is vital to improve requirements, analysis, and design
techniques — to find faults **as early as possible**, and to **reduce the overall
number of faults** and hence the overall cost.

## Key points

- The three questions the slide asks — *shall we be meticulous? shall we be
  vigilant? shall we test early and often?* — all answer yes, and together they
  are the argument for reviews, inspections, and precise specifications.
- This is the economic argument behind **non-execution-based testing**
  (walkthroughs and inspections): they can catch a requirements fault before any
  code exists.

## Watch out for

- For AI-enabled software the curve is **steeper**, not merely the same: **a
  label-definition fault propagates into the training data, into the model, and
  into every decision it has made since.** Fixing it does not just mean changing
  a line — it means retraining and potentially revisiting past decisions.

## Prerequisites

[[fault-failure-and-defect-terminology]] · [[classical-waterfall-phases]]
