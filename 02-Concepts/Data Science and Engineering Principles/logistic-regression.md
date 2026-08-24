---
subject: Data Science and Engineering Principles
skill_name: Logistic Regression
score: 0
prerequisites:
- Classification and Regression
- Simple Linear Regression
source:
- Classification and Metrics.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from Classification and Metrics.pdf
---

# Logistic Regression

## Summary

A **parametric classifier** that fits **class probabilities using a sigmoid
function**, obtaining the model coefficients by **gradient descent**.

**The logistic (sigmoid) function** is an S-shaped curve that takes any real
value and converts it to a value between 0 and 1:

- output **> 0.5** → classified as **1**
- output **< 0.5** → classified as **0**

**Worked example — website clicks.** *If a new customer spends 3.5 minutes on a
website, will she click the "Buy" button?*

```
Probability of Click = f(Time on Site)   where f is a sigmoid function
```

## Key points

- Logistic regression is the method the course recommends **instead of** forcing
  linear regression onto a categorical target. Linear regression can be
  quantised with thresholds, but logistic regression is "generally more suitable
  for categorical classification because it is probability-based".
- It can use **categorical data as input**, but you must first transform it into a
  numerical representation with **one-hot encoding**.
- It is the method used with the **One-vs-Rest (OvR)** approach for multi-class
  problems.

## Watch out for

- Despite the name it solves a **classification** problem, not a regression one.
- The 0.5 cut-off is a **threshold you choose**, not a property of the model. The
  ROC curve exists precisely because that threshold can be moved.

## Prerequisites

[[classification-and-regression]] · [[simple-linear-regression]]
