---
subject: Data Science and Engineering Principles
skill_name: One-vs-Rest and One-vs-One
score: 0
prerequisites:
- Binary Multi-Class and Multi-Label Classification
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

# One-vs-Rest and One-vs-One

## Summary

Two ways to use a **binary** classification algorithm on a **multi-class**
problem, by splitting the multi-class dataset into several binary datasets and
fitting a binary model on each.

**One-vs-Rest (OvR)** — used for example with logistic regression. For classes
{red, green, blue, yellow} you get **4 problems**, one per class:

```
1. red    vs [green, blue, yellow]
2. green  vs [red, blue, yellow]
3. blue   vs [red, green, yellow]
4. yellow vs [red, green, blue]
```

Predictions are made using **the model that is the most confident** (e.g. by
probability).

**One-vs-One (OvO)** — used for example with SVM. The same 4 classes give **6
problems**, one per pair:

```
red vs blue, red vs green, red vs yellow,
blue vs green, blue vs yellow, green vs yellow
```

Each binary model predicts one class label, and **the class with the most
predictions or votes wins**.

## Key points

- Counting is the exam skill: OvR gives **N** models for N classes; OvO gives
  **N(N−1)/2** models. For N = 4: 4 versus 6.
- OvR decides by **confidence**; OvO decides by **votes**.
- The pairing to remember: **OvR ↔ logistic regression**, **OvO ↔ SVM**.

## Watch out for

- Neither approach changes the underlying algorithm — it is a wrapper strategy
  around a binary classifier, not a new classifier.

## Prerequisites

[[binary-multi-class-and-multi-label-classification]]
