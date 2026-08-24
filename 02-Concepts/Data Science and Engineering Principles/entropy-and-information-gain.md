---
subject: Data Science and Engineering Principles
skill_name: Entropy and Information Gain
score: 0
prerequisites:
- Decision Tree
source:
- Decision Trees.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from Decision Trees.pdf
---

# Entropy and Information Gain

## Summary

The impurity measure and split criterion behind the **ID3 algorithm (R. Quinlan,
1986)**.

**Entropy measures how messy or impure a group is.**

- **Entropy = 0 (perfectly pure)** — everyone in the group belongs to the exact
  same category. Reach into a bag of 10 apples, all Red Delicious: zero
  uncertainty.
- **Entropy = 1 (maximum mess)** — the group is perfectly split 50/50. A bag of
  10 fruits, 5 apples and 5 oranges: you have no idea what you will pull out.

**Information Gain measures how much a question reduces that messiness.**

```
Information Gain = Entropy(Parent Node) - Weighted Average Entropy(Child Nodes)
```

It is the **reduction in entropy after you split the data on a specific feature**.

**The procedure:**

1. Calculate entropy of the whole dataset (before any split).
2. For each feature: split the data by each unique value, calculate each branch's
   entropy, then the **weighted average** entropy across branches.
3. Compute IG = parent entropy − weighted branch entropy.
4. Choose the feature with the **highest Information Gain** as the split.
5. Recurse on the children until a stopping condition.

## Key points

- The weighting is by **branch size**. A branch holding 1 of 14 samples cannot
  drag the average the way a branch holding 8 can.
- Entropy = 1 as "maximum" holds for the **two-class** case. With more classes
  the maximum is higher.

## Watch out for

- The subtraction order is fixed: **parent minus children**. Getting it backwards
  produces negative gains and a tree built on the worst splits.
- IG is computed **fresh at every node**, on that node's subset only — not once
  on the full dataset.

## Prerequisites

[[decision-tree]]
