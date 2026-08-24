---
subject: Data Science and Engineering Principles
skill_name: Box Plot
score: 0
prerequisites:
- Exploratory Data Analysis
- Measures of Central Tendency
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

# Box Plot

## Summary

Also called a box-and-whisker plot. A single compact chart that shows five
things at once:

- **Dispersion** (also called variability, scatter, or spread)
- **Skewness**, if any
- **Quartiles**
- **Outliers**, if any
- **Comparison** between different groups when several are plotted side by side

The **fences** are at `Q1 − 1.5 × IQR` and `Q3 + 1.5 × IQR`, where IQR is the
interquartile range `Q3 − Q1`. Points outside the fences are drawn as outliers.

## Key points

- The whiskers do **not** extend to the fences. They extend to the **smallest and
  largest observed data point that still falls within** the fence range. Because
  a whisker must end at a real observed value, the two whisker lengths are
  usually **unequal**.
- Values of x must fall between the fences to be inside the whiskers — outlier
  values are excluded and drawn separately.

## Watch out for

- The classic exam mistake is drawing the whisker exactly at `Q1 − 1.5 × IQR`.
  That point is the *fence*, not the whisker end.
- Unequal whisker lengths are normal and are themselves a signal of skew — not a
  drawing error.

## Prerequisites

[[exploratory-data-analysis]] · [[measures-of-central-tendency]]
