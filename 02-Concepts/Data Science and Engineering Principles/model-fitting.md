---
subject: Data Science and Engineering Principles
skill_name: Model Fitting
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

# Model Fitting

## Summary

**Modelling** is creating a simplified representation of a system or process —
through mathematical equations, computer simulations, or physical models.
Model fitting is an **iterative** process, because there are usually several
applicable modelling approaches, and even a single approach has a list of
parameters you can set to get different configurations.

Three terms that sound alike and are not:

- **Data modelling** — the most general. Creating a *conceptual* representation
  of data, to understand it, communicate it, and build systems that use it.
  Examples: ERD (entities and relationships), DFD, UML.
- **Data fitting** — specifically finding **mathematical functions that best
  describe existing data**, used to interpolate/extrapolate. Examples: least
  squares regression, polynomial fitting, spline interpolation.
- **Model fitting** — emphasis on the **model itself**. Adjusting the parameters
  of a *pre-selected* model (which represents a theoretical relationship or
  hypothesis) so it best explains or predicts the observed data.

## Key points

- Model fitting's defining concern is **generalisation** — not just how well the
  model fits training data, but how it performs on new, unseen data. This is
  where underfitting (too simple) and overfitting (too complex, learns noise)
  live.
- Example techniques: gradient descent, maximum likelihood estimation, and other
  optimisation algorithms used to train ML models.
- Used across statistics, machine learning, and econometrics.

## Watch out for

- Data modelling is the broadest of the three and is *not* about numbers at all —
  an ERD is data modelling. Do not confuse it with data fitting.

## Prerequisites

[[exploratory-data-analysis]]
