---
subject: Data Science and Engineering Principles
skill_name: Support Vector Machine
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

# Support Vector Machine

## Summary

A **parametric classifier** that learns the **hyperplane separating the data
points of two classes with the maximum margin** — where the margin is the
closest distance between the data points of the two classes.

**The kernel trick.** If the data is **not linearly separable**, SVM uses kernel
tricks to make it so: the kernel **projects the data points into a
higher-dimensional space**, in which they become relatively easier to separate.
The lecture illustrates a nonlinear SVM classifier with a **Gaussian kernel
function**.

## Key points

- "Maximum margin" is the whole idea — among the infinitely many separating
  hyperplanes, SVM chooses the one furthest from both classes.
- SVM is the algorithm the course pairs with the **One-vs-One (OvO)** approach
  for multi-class problems.
- Parametric, alongside Naive Bayes and Logistic Regression.

## Watch out for

- The kernel does not literally compute coordinates in the higher-dimensional
  space — that is why it is called a *trick*. For this course, the point to hold
  is *why* it is applied: non-linearly-separable data.

## Prerequisites

[[classification-and-regression]]
