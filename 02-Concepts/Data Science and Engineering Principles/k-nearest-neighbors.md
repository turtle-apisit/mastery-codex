---
subject: Data Science and Engineering Principles
skill_name: K-Nearest Neighbors
score: 0
prerequisites:
- Classification and Regression
- Distance Metrics
- Feature Scaling
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

# K-Nearest Neighbors

## Summary

One of the simplest **non-parametric** classifiers, first developed in **1951**.
It matches a point with its closest k neighbours in a multi-dimensional space,
then uses **the labels of those K neighbours**:

- **k-NN classification** — output is a **class membership**, by a plurality vote
  of the neighbours: the object is assigned the class most common among its k
  nearest neighbours (k a small positive integer).
- **k-NN regression** — output is the **average** of the values of the k nearest
  neighbours.

Because it uses the labels, it is a **supervised** algorithm.

**The steps:**

1. Determine parameter K = number of nearest neighbours.
2. Calculate the distance between the query instance and all training samples.
3. Sort the distances and determine nearest neighbours by the Kth minimum
   distance.
4. Gather the category of those nearest neighbours.
5. Take the simple majority of their categories as the prediction.

**k changes the answer.** In the lecture's figure: if k = 3 the green dot is
assigned to a red triangle; if k = 5 the same green dot is assigned to a blue
square.

## Key points

- **"Lazy" learning** — KNN does **no training at all** when supplied the training
  data; it simply stores it. It does not learn a discriminative function, it
  **memorises the training dataset**. Generalisation is delayed until a query is
  made.
- The consequence: **low or non-existent training time, high consultation
  (testing) time**. Eager learners are the reverse. This suits systems whose
  dataset is continuously updated with new entries — the lecture names online
  recommendation engines like Netflix.
- A common weighting scheme gives each neighbour weight **1/d**, where d is the
  distance to that neighbour.
- Works for continuous, discrete, ordinal and categorical data, which makes it
  particularly useful for handling missing data.

## Watch out for

- **Two preprocessing steps are mandatory**: categorical variables transformed to
  dummy variables (factors/levels), and numeric variables
  standardised/normalised. If one feature's values are large, it dominates the
  distance and therefore the outcome.
- **Not suitable for high-dimensional data** — as dimensions increase it becomes
  difficult to compute distance for each dimension.
- Slows down significantly as the data grows, because every query compares
  against every stored point.

## Prerequisites

[[classification-and-regression]] · [[distance-metrics]] · [[feature-scaling]]
