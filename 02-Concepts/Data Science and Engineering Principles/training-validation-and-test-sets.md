---
subject: Data Science and Engineering Principles
skill_name: Training Validation and Test Sets
score: 0
prerequisites:
- Model Fitting
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

# Training Validation and Test Sets

## Summary

You split the dataset and **use the training data to fit the model and the test
data to evaluate it**. Evaluating a model on the same data it was trained on is
generally a bad idea because of possible **biases** — a model that fits training
data with very high accuracy has also fitted the biases in that dataset. The goal
is a model that can predict **new** data points.

The three splits and their roles:

- **Training dataset** (~70%) — the sample used to **fit** the model. The model
  sees and learns from this data.
- **Validation dataset** (~10%) — provides an **unbiased evaluation of a model fit
  on the training set while tuning hyperparameters**. The model **occasionally
  sees this data, but does not learn from it**. Also called the **Dev set** or
  development set.
- **Test dataset** (~20%) — provides an unbiased evaluation of the **final** model.
  Used **only once**, after training and validation are complete.

Two approaches:

1. **Train-Validate-Test split** (e.g. 70:20:10). Acceptable if the data is huge
   and the test and train samples have the same distribution.
2. **[[k-fold-cross-validation]]** — generally produces a less biased model.

## Key points

- If the test set has **never** been used in training (e.g. in cross-validation),
  it is also called a **holdout dataset**.
- The subtle trap the slides name: even while optimising a model to minimise
  classification error **on test data**, you can end up fitting the biases in
  that dataset. Cross-validation with a separate validation set is designed to
  solve exactly this.

## Watch out for

- The validation set is for **hyperparameters**; the test set is for the **final
  score**. Tuning against the test set silently converts it into a validation set
  and destroys the unbiased estimate.

## Prerequisites

[[model-fitting]]
