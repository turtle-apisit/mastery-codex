---
subject: Data Science and Engineering Principles
skill_name: Precision Recall and F-Measure
score: 0
prerequisites:
- Confusion Matrix
source:
- Classification and Metrics.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from Classification and Metrics.pdf
---

# Precision Recall and F-Measure

## Summary

The metrics that exist because **accuracy assumes equal costs for both kinds of
error**.

**Precision** — of the examples labelled positive, how many really are positive.
**High precision indicates an example labelled as positive is indeed positive**
(a small number of **FP**).

**Recall** — the ratio of correctly classified positive examples to the total
number of positive examples. **High recall indicates the class is correctly
recognised** (a small number of **FN**). Also called **sensitivity** or **true
positive rate**.

**F-measure (F1 score)** — represents both recall and precision as a **weighted
average** of the two. It uses the **harmonic mean instead of the arithmetic
mean**, because the harmonic mean **punishes extreme values more**:

- The F-measure will always be **nearer to the smaller** of precision or recall.
- Highest possible value is **1**, meaning perfect precision and recall.
- A good choice when you need to **balance** precision and recall.

**The three commonly used F-measures:**

- **F1** — even weight on precision and recall.
- **F2** — **higher weight on recall** than precision.
- **F0.5** — **higher weight on precision** than recall.

## Key points

- Precision is about **FP**, recall is about **FN**. Fixing the two in mind by
  which error they suppress is more reliable than memorising formulas.
- The harmonic mean is the whole reason F1 is useful: a model with precision 1.0
  and recall 0.0 has an arithmetic mean of 0.5 but an **F1 of 0**.
- F was possibly named after **Ronald Fisher**, whose work was on the
  F-distribution and F-test.

## Watch out for

- The subscript is the weight on **recall**, so F2 favours recall and F0.5
  favours precision — the direction is easy to invert under exam pressure.

## Prerequisites

[[confusion-matrix]]
