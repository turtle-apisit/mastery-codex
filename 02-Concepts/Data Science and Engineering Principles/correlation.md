---
subject: Data Science and Engineering Principles
skill_name: Correlation
score: 0
prerequisites:
- Scatter Plot
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

# Correlation

## Summary

Correlation (r) measures how strongly two variables move together. It is bounded:

```
-1 <= r <= 1
```

Two coefficients, chosen by the data type and by the shape of the relationship:

- **Pearson correlation** — for **numerical** data, and **only for linear**
  relationships.
- **Spearman correlation** — for **ordinal** scale data (ranked order), and works
  for **monotonic** relationships, not just linear ones.

## Key points

- r = 0 does not mean "no relationship". It means no *linear* relationship (for
  Pearson). A perfect U-shaped relationship has a Pearson r near zero.
- Sign carries direction, magnitude carries strength: −0.9 is a *stronger*
  relationship than +0.3.

## Watch out for

- **"Correlation does not mean causation."** The slides call this an old saying
  statisticians consider very important to remember — and it is the setup for
  linear modelling, which asks "does x influence y?" while only being able to
  measure whether x and y move together.
- Choosing Pearson for ordinal data (star ratings, satisfaction levels) is a
  common error — Spearman is the correct choice there.

## Prerequisites

[[scatter-plot]]
