---
subject: Data Science and Engineering Principles
skill_name: Elbow Method
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

# Elbow Method

## Summary

One of the most popular methods for determining the optimal value of **k** —
the hyperparameter K-means cannot learn for itself.

Plot the **Within Cluster Sum of Squares (WCSS)** against k, then select the
number of clusters at the point where **the change in WCSS begins to level off**.
That bend in the curve is the "elbow".

In the lecture's example plot, a good number of clusters is **3 at best, or 4 if
needed** — which is a fair picture of how the method actually behaves: it
narrows the choice to a small range rather than naming one number.

## Key points

- WCSS always decreases as k increases (at k = number of points, WCSS = 0), so
  "minimise WCSS" is not a usable rule on its own. The elbow is about the
  *rate* of decrease, not the value.
- The alternative named in the slides is the **Silhouette Score**.

## Watch out for

- The elbow is often ambiguous — real curves frequently bend gently rather than
  sharply. Being able to defend a choice between two candidate k values matters
  more than finding "the" answer.

## Prerequisites

[[k-means-clustering]]
