---
subject: Data Science and Engineering Principles
skill_name: Multivariate Linear Regression
score: 0
prerequisites:
- Simple Linear Regression
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

# Multivariate Linear Regression

## Summary

Also called **multiple linear regression**. Extends simple linear regression to
look at how **multiple input variables** affect the target variable at once.

The target is treated as a function of the different predictor variables, which
lets you **observe the effect of changing one predictor while controlling the
values of the others**.

Worked example from the automobile dataset:

```
Price = 58.35*Horsepower + 110.13*Length + 101.45*EngineSize - 24,836.65
```

**Categorical variables** enter through one-hot style dummy coding. Use only one
brand in a prediction at a time by multiplying 1.0 to the chosen brand's
coefficient and 0.0 to all the others:

```
Price(BMW) = 64.38*Horsepower + 57.07*EngineSize + 1.0*8,062.71 - 408.06
```

## Key points

- **t-test** tells you whether a **single variable** is statistically significant.
- **F-test** tells you whether a **group of variables is jointly significant** —
  the larger the better.
- The **p-value** is what you read for the overall picture.

## Watch out for

- The whole point of controlling for other predictors is that a coefficient in a
  multivariate model means "the effect of this variable *holding the others
  fixed*" — which is not the same number you would get from a simple regression
  on that variable alone.

## Prerequisites

[[simple-linear-regression]]
