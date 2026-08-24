---
subject: Data Science and Engineering Principles
skill_name: Feature Scaling
score: 0
prerequisites:
- Types of Data and Variables
source:
- K-means clustering basics.pdf
- Classification and Metrics.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from K-means clustering basics.pdf and Classification and Metrics.pdf
---

# Feature Scaling

## Summary

Putting numerical variables onto a comparable range, by **normalisation** or
**standardisation (Z-score)**, before running any algorithm that computes
distances.

The problem it solves: distance calculations use raw feature values. When one
feature's values are much larger than another's, **that feature dominates the
distance** and therefore dominates the outcome — regardless of whether it is
actually more important.

## Key points

- Required by **K-means** (its cost function is squared distance to a centroid)
  and by **K-nearest neighbours** (KNN is explicitly "not suitable for
  scalability because if the scale of features is very different then
  normalisation is required").
- Normalising gives **every attribute the same influence** when identifying
  neighbours under Euclidean distance.
- Normalise when the scales have no inherent meaning, **and** when scales are
  inconsistent — centimetres mixed with metres.
- In K-prototypes this is not optional: mixing an unscaled income (tens of
  thousands) with an age (tens) and a mismatch count (0 or 1) means income
  decides every cluster.

## Watch out for

- The two preprocessing steps KNN needs are (1) categorical variables
  transformed into dummy variables (factors/levels) and (2) numeric variables
  standardised/normalised. Forgetting the second is the more common error
  because the code still runs.

## Prerequisites

[[types-of-data-and-variables]]
