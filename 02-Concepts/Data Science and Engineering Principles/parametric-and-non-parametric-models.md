---
subject: Data Science and Engineering Principles
skill_name: Parametric and Non-Parametric Models
score: 0
prerequisites:
- Classification and Regression
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

# Parametric and Non-Parametric Models

## Summary

Statistical models are of two types, separated by **whether you assume a
functional relationship in advance**:

- **Parametric** — you **assume a functional relationship** between the predictor
  and target variables. Naive Bayes, Logistic Regression, Support Vector Machine.
- **Non-parametric** — you assume **no such relationship**; the model structure is
  determined from the dataset itself. K-nearest neighbours, decision tree-based
  models.

## Key points

- Non-parametric does **not** mean "has no parameters". It means no assumed
  distribution or functional form.
- The power of nearest-neighbour classifiers comes precisely from this: the
  classifier relies **entirely on the geometry of the training data** without
  assuming any specific distribution, which makes it sensitive to the local
  structure of the data.
- EDA is described the same way — a **non-parametric approach** to data analysis.
  The word means the same thing in both places.

## Watch out for

- Memorise the two lists as lists. The split does not follow any intuition about
  which methods are "simple": SVM is parametric, a decision tree is not.

## Prerequisites

[[classification-and-regression]]
