---
subject: Data Science and Engineering Principles
skill_name: Types of Data and Variables
score: 0
prerequisites: []
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

# Types of Data and Variables

## Summary

Every variable in a dataset falls into one of two families, and which family it
belongs to decides what you are allowed to do with it — which chart, which
distance metric, which model.

**Numerical (quantitative)** data splits into:

- **Discrete** — distinct values with a step size. Population count, number of
  coins in a pocket. You cannot have 2.5 coins.
- **Continuous** — not limited by a step size or by decimal places, though in
  practice values get rounded. Amount of water in a cup, weight, height, any
  real value in a range.

**Categorical (qualitative)** data splits into:

- **Nominal** — describes a characteristic with no order. You *can* assign
  numbers to the categories but you cannot meaningfully compare them.
  `gender = {male, female, unspecified}`, `race = {white, black, Asian, Hispanic}`.
- **Ordinal** — a mixed nature between numerical and categorical. The values
  *can* be compared, but not straightforwardly, and you need many data points
  before the comparison means much. Hotel star ratings `{*, **, ***, ****, *****}`.

## Key points

- The four-way split is Nominal / Ordinal / Discrete / Continuous, grouped under
  Categorical and Numerical.
- Assigning a number to a nominal category does not make it numerical. Encoding
  `male = 1, female = 2` does not mean female is "twice" male.
- Ordinal data has order but no guaranteed equal spacing between levels — the
  gap between 1-star and 2-star is not necessarily the gap between 4-star and
  5-star.

## Watch out for

- This is the concept that quietly breaks other algorithms later. Euclidean
  distance on one-hot encoded nominal data is misleading — that is exactly why
  [[k-modes-and-k-prototypes]] exists.

## Prerequisites

None — this is a root concept for the subject.
