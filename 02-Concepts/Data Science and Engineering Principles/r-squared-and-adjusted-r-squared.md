---
subject: Data Science and Engineering Principles
skill_name: R-Squared and Adjusted R-Squared
score: 0
prerequisites:
- Multivariate Linear Regression
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

# R-Squared and Adjusted R-Squared

## Summary

**R²** shows how well the terms (data points) fit a curve or line — the share of
variance in the target that the model accounts for.

**Adjusted R²** is R² corrected for the number of predictors in the model, and
the correction is what makes it useful:

- Add **useless** variables → adjusted R² **decreases**.
- Add **useful** variables → adjusted R² **increases**.
- Adjusted R² is **always less than or equal to R²**.

## Key points

- Plain R² can only go up when you add a variable, however worthless that
  variable is. That is exactly why it cannot be used to compare models with
  different numbers of predictors — and why adjusted R² exists.
- For model selection in multiple regression, read adjusted R²; for "how much
  variance is explained", read R².

## Watch out for

- A high R² is not proof of a good model. It says nothing about whether the
  relationship is causal, whether the model generalises, or whether a linear
  shape was appropriate in the first place.

## Prerequisites

[[multivariate-linear-regression]]
