---
subject: Data Science and Engineering Principles
skill_name: Simple Linear Regression
score: 0
prerequisites:
- Model Fitting
- Correlation
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

# Simple Linear Regression

## Summary

Linear modelling (also called linear regression) exists to answer questions of
the form **"does x influence y?"** — do incomes influence house prices, does
changing the oil more often save money in the long run.

The idea: for many kinds of data it is possible to **fit a line to a set of data
points**, representing the connection between an independent variable and a
dependent variable.

```
y = f(x, w) + ε
```

where `x` are the independent variables, `y` is the target, `f()` is a linear
function, `w` is the parameter set, and `ε` is the **error or residual**. In the
simple case there is one input variable and one target, so `w` is just the
**intercept and slope**.

The work happens in two steps:

1. **Model fitting** — given a dataset with variables x₁…xₘ and y, calculate the
   model parameters `w` that best meet some criterion.
2. **Model prediction** — given predictor variables and the fitted `w`, calculate
   the target y.

The criterion is the **loss function**, and for regression the most popular one
is the **least squares** method. You minimise it by taking the derivative of the
loss function, setting it to zero, and solving.

## Key points

- The target variable is **numerical** (e.g. inches of rain for the day); the
  predictor variables may be numerical, categorical, or ordinal.
- `arg min` returns the *argument* that produces the minimum value of the target
  function — not the minimum value itself.
- If the target variable is categorical you can still force it by quantising with
  threshold values, but **logistic regression is generally more suitable** for
  categorical classification because it is probability-based.

## Watch out for

- "Correlation does not mean causation" applies directly here. A fitted line with
  a good R² does not establish that x *causes* y.

## Prerequisites

[[model-fitting]] · [[correlation]]
