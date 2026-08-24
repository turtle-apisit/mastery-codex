---
subject: Data Science and Engineering Principles
skill_name: Overfitting and Underfitting
score: 0
prerequisites:
- Model Fitting
- Training Validation and Test Sets
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

# Overfitting and Underfitting

## Summary

Diagnosed by **comparing training error against test error** — not by looking at
either one alone.

- **Underfitting** — **both** the training error **and** the test error are
  sufficiently **high**. The model is too simple.
- **Overfitting** — there is a **large gap** between training and test error, with
  **test error significantly higher** than training error. The model is too
  complex and has learned the noise.

Mapped onto the bias/variance vocabulary:

- An **underfitting** model tends to have **high bias**.
- An **overfitting** model tends to have **high variance**.

The definitions of those two terms:

- A model is **biased (high bias)** if the model **accuracy is low**.
- A model has **high variance** if multiple models trained on training sets drawn
  from the **same population** make **significantly different predictions** given
  the same input dataset.

## Key points

- The diagnostic is a **pair** of numbers. Low training error on its own tells
  you nothing — it is consistent with both a great model and a badly overfitted
  one.
- The course's named remedy for overfitting is **K-fold cross-validation**.

## Watch out for

- High training error **and** high test error is underfitting, not overfitting.
  The instinct to call any bad model "overfitted" is the common error.

## Prerequisites

[[model-fitting]] · [[training-validation-and-test-sets]]
