---
subject: Data Science and Engineering Principles
skill_name: Decision Tree
score: 0
prerequisites:
- Classification and Regression
source:
- Decision Trees.pdf
- Classification and Metrics.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from Decision Trees.pdf and Classification and Metrics.pdf
---

# Decision Tree

## Summary

A decision tree **splits the dataset at every node based on the value of a
variable**, and classifies the data points in a leaf node from the aggregate
values of the class labels there.

It works for both tasks:

- **Classification** — the canonical example is "play an outdoor sport?", deciding
  under what conditions to play and under what conditions not to.
- **Regression** — predicting a house price.

**Building the tree** is a recursive procedure:

1. Measure the impurity of the whole dataset (the root node).
2. Try **each feature** as the split, and measure the resulting impurity.
3. Choose the feature that improves impurity the most — highest Information Gain,
   or lowest weighted Gini impurity.
4. **Recurse on each branch** with the remaining features.
5. Stop when a **stopping condition** is met: a pure node, max depth, or minimum
   samples.

The famous worked example (Quinlan, 1986) has 14 records — 9 "Yes" (play tennis)
and 5 "No" — and features Outlook, Temperature, Humidity, Windy. **Outlook wins
the root with IG = 0.247.** Then:

- *Overcast* (4 samples): all Yes → **pure node → leaf: Yes**, no further split.
- *Sunny* (5 samples, 2 Yes + 3 No): recompute IG over Humidity, Temperature,
  Windy → only **Humidity** gives a good split (High → 0 Yes / 3 No,
  Normal → 2 Yes / 0 No).
- *Rain* (5 samples, 3 Yes + 2 No): **Windy** gives the best split.

## Key points

- Two impurity measures are used in this course:
  [[entropy-and-information-gain]] (the ID3 algorithm) and [[gini-impurity]].
- A **pure node** ends the recursion on that branch immediately.
- The tree only ever considers the **remaining features** on a branch — the
  feature already used above it is spent.

## Watch out for

- The algorithm is **greedy**: it picks the locally best split at each node and
  never revisits it. The resulting tree is not guaranteed to be globally optimal.

## Prerequisites

[[classification-and-regression]]
