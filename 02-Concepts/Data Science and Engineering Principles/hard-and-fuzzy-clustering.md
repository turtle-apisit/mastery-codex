---
subject: Data Science and Engineering Principles
skill_name: Hard and Fuzzy Clustering
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

# Hard and Fuzzy Clustering

## Summary

Two different procedures for assigning a point to clusters.

1. **Hard clustering** — a sample is allocated to **just one** cluster.
   Example: K-means.
2. **Fuzzy clustering** (also called soft clustering or soft K-means) — a sample
   is **distributed among several clusters**, belonging to each to a certain
   degree according to an assigned weighted value.
   Example: fuzzy C-means (FCM).

The lecture's analogy: an apple can be red **or** green (hard clustering), but an
apple can also be red **and** green (fuzzy clustering) — red to a certain degree
and green to a certain degree at the same time.

## Key points

- The difference is in the **membership**, not in the algorithm's goal. Both are
  still unsupervised clustering.
- Hard clustering produces a label per point; fuzzy clustering produces a vector
  of membership weights per point.

## Watch out for

- "Soft K-means" is another name for fuzzy clustering, not a separate method —
  worth recognising both names in a question.

## Prerequisites

[[k-means-clustering]]
