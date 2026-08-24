---
subject: Data Science and Engineering Principles
skill_name: Predictive and Descriptive Models
score: 0
prerequisites:
- Supervised and Unsupervised Learning
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

# Predictive and Descriptive Models

## Summary

The models produced by a data mining step fall into exactly two types.

**Predictive model** — the goal is to **predict the value of one variable given
the remainder of the variables**. The variable being predicted is the
**dependent** or **target** variable; the variables used to predict it are the
**independent** or **predictor** variables.

**Descriptive model** — the goal is to **identify relationships between
variables** in order to learn more about the structure of the data. Nothing is
being predicted.

## Key points

- Vocabulary pairs that mean the same thing: dependent = target = the thing you
  predict; independent = predictor = the things you predict from.
- Classification and regression are predictive. Clustering, association rules,
  anomaly detection, and visualisation are descriptive.
- The distinction decides how you evaluate: a predictive model is judged by
  error on unseen data, a descriptive model by whether the structure it exposes
  is interesting and usable.

## Watch out for

- Association rules feel predictive ("if bread then milk") but are descriptive —
  they describe co-occurrence in past transactions, they do not predict a target
  variable for a new record.

## Prerequisites

[[supervised-and-unsupervised-learning]]
