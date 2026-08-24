---
subject: Data Science and Engineering Principles
skill_name: Model Parameters and Hyperparameters
score: 0
prerequisites:
- Model Fitting
source:
- EDA-Model Fitting.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from EDA-Model Fitting.pdf
---

# Model Parameters and Hyperparameters

## Summary

Two kinds of numbers inside a model, separated by **who sets them**.

**Model parameters** are **estimated from the data automatically by the
algorithm**. Example: the weights of a model — the intercept and slope of a
regression line.

**Model hyperparameters** are **set manually** and are used *in the process that
estimates the parameters*. Examples: k in KNN, the learning rate, the number of
layers in a neural network, the number of epochs, the choice of loss function.

## Key points

- Parameters are output of training; hyperparameters are input to training.
- This distinction is what the **validation set** exists for: you tune
  hyperparameters against the validation set, then the test set gives an unbiased
  final evaluation. See [[training-validation-and-test-sets]].
- K-fold cross-validation is a hyperparameter search loop: set some
  hyperparameters, train on K−1 folds, validate on the remaining fold, average
  the accuracy, then repeat with a different hyperparameter set.

## Watch out for

- k in K-means and k in KNN are both hyperparameters — you choose them. The
  Elbow Method and Silhouette Score exist precisely because there is no
  algorithmic way to learn k from the data.

## Prerequisites

[[model-fitting]]
