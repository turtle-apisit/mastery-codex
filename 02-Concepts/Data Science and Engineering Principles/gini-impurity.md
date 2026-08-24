---
subject: Data Science and Engineering Principles
skill_name: Gini Impurity
score: 0
prerequisites:
- Decision Tree
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

# Gini Impurity

## Summary

The second way to measure how **"mixed up" or impure** a group of data is, and
the alternative to entropy when choosing a decision tree's split.

**Range:** 0 to 0.5 for a two-class problem (higher for more classes).
A value of **0 means the group is perfectly pure** — you cannot make a better
split than that.

**How it is used:** the goal is *not* to calculate the Gini impurity of a single
group. The decision tree algorithm calculates the **weighted average Gini
impurity of the resulting branches after a potential split**, then chooses the
split producing the **lowest** weighted Gini impurity.

The lecture's worked problem: predicting whether a house's price is "High" or
"Low", trying **Neighborhood** as the root node.

## Key points

- **Direction is opposite to Information Gain.** With entropy you *maximise* the
  gain; with Gini you *minimise* the weighted impurity. Both pick the same kind
  of split — the cleanest separation.
- Both measures are weighted by branch size, for the same reason.
- Entropy and Gini usually agree on which split is best; Gini is cheaper to
  compute because there is no logarithm.

## Watch out for

- The maximum is **0.5**, not 1, for two classes — unlike entropy, whose two-class
  maximum is 1. Mixing up the two scales makes an answer look wrong even when the
  chosen split is right.

## Prerequisites

[[decision-tree]]
