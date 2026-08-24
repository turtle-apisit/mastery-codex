---
subject: Data Science and Engineering Principles
skill_name: Distance Metrics
score: 0
prerequisites:
- Types of Data and Variables
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

# Distance Metrics

## Summary

How "close" two data points are — the foundation under KNN, K-means, and
K-modes.

**For numeric values:**

- **Euclidean distance** (also called **L2 distance**) — the most popular metric.
  Use it when the input variables are **similar in type/unit** (e.g. all measured
  widths and heights).
- **Manhattan distance** (also called **city block** or **L1 distance**) — the
  distance travelled **along a grid** to get from one point to the next. Use it
  when the input variables are **not similar in type/unit** (age, height, …).
- **Minkowski distance** — the generalisation of both. Setting **p = 2** gives
  Euclidean; setting **p = 1** gives Manhattan.

**For categorical values:**

- **Hamming distance** — takes all the categorical attributes and, for each,
  counts one if the value is **not the same** between two points. The Hamming
  distance is the **number of attributes whose values differed**. A weighted
  Hamming distance variant also exists.

## Key points

- The Minkowski p parameter is the compact way to remember the family: p = 1
  Manhattan, p = 2 Euclidean.
- Hamming distance is what makes K-modes work — "dissimilarity by number of
  mismatches" is Hamming distance by another name.

## Watch out for

- **Normalise before computing Euclidean distance** when scales have no meaning
  or are inconsistent. Normalising gives every attribute the same influence in
  identifying neighbours. See [[feature-scaling]].

## Prerequisites

[[types-of-data-and-variables]]
