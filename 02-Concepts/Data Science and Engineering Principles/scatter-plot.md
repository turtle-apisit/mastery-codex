---
subject: Data Science and Engineering Principles
skill_name: Scatter Plot
score: 0
prerequisites:
- Exploratory Data Analysis
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

# Scatter Plot

## Summary

A chart that plots each observation as a point against two variables. Unlike a
box plot, which summarises, a scatter plot **shows every data point**.

What it reveals:

- Every individual data point, with nothing aggregated away
- How **dense or sparse** the data is; the spread
- **Correlations and trends**, if any

## Key points

- Scatter plot and box plot are complementary EDA tools: the box plot compresses
  a distribution into five numbers, the scatter plot refuses to compress at all.
- It is the natural chart to look at *before* fitting a linear regression,
  because it shows whether a straight line is even a plausible shape for the
  relationship.

## Watch out for

- A visible trend in a scatter plot is a *correlation*, not a cause. See
  [[correlation]] for why this matters.

## Prerequisites

[[exploratory-data-analysis]]
