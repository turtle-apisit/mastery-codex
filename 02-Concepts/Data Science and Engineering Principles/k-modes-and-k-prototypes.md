---
subject: Data Science and Engineering Principles
skill_name: K-Modes and K-Prototypes
score: 0
prerequisites:
- K-Means Clustering
source:
- K-means clustering basics.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from K-means clustering basics.pdf
---

# K-Modes and K-Prototypes

## Summary

The two answers to K-means' inability to handle categorical data.

**K-modes** — similar to K-means in principle, but uses **modes instead of
means**. It defines clusters based on the **number of matching categories**
between data points, measuring dissimilarity by the **number of mismatches**
(like Hamming distance). This is the simple way to cluster nominal/categorical
data.

**K-prototypes** — combines K-means (for numerical attributes) and K-modes (for
categorical attributes), for datasets that have both. Each cluster centre is
called a **prototype** because it represents the "typical" or most representative
point of that cluster.

The combined cost is a sum of the two kinds of distance:

```
cost = (age1 - age2)^2 + (income1 - income2)^2 + (number of mismatches)
```

## Key points

- The reason this family exists: Euclidean distance on numerically encoded
  categories is misleading, even with one-hot encoding.
- "Prototype" is the K-prototypes name for what K-means calls a centroid and
  K-modes calls a mode.

## Watch out for

- Look at that cost formula. The numerical terms are squared raw differences
  (income differences run into the millions) while the categorical term is a
  small integer count. **Without normalising or standardising (Z-score) the
  numerical values first, the categorical part contributes essentially nothing.**
  This is the "Now, any problem?" slide, and its answer.

## Prerequisites

[[k-means-clustering]]
