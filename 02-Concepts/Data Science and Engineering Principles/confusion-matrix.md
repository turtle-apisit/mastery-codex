---
subject: Data Science and Engineering Principles
skill_name: Confusion Matrix
score: 0
prerequisites:
- Classification and Regression
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

# Confusion Matrix

## Summary

Also called an **error matrix**. It determines the performance of a classifier by
summarising the number of correct and incorrect predictions as **count values
broken down by each class**, which makes it easy to identify **confusion between
classes** — where one class is commonly mislabelled as another.

**The four cells:**

- **True Positive (TP)** — observation is positive, and is predicted positive.
- **False Negative (FN)** — observation is positive, but is predicted negative.
- **True Negative (TN)** — observation is negative, and is predicted negative.
- **False Positive (FP)** — observation is negative, but is predicted positive.

**Metrics read off it:**

```
Accuracy = (TP + TN) / (TP + TN + FP + FN)
Recall   = Sensitivity = True positive rate (TPR) = Hit rate
Specificity = Selectivity = True negative rate (TNR)

False negative rate (FNR) = 1 - TPR = Miss rate
False positive rate (FPR) = 1 - TNR = Fall out
```

**Multi-class**: build the matrix **class by class**. On the Iris example:

- **Micro accuracy** — combine all classes:
  `(16+17+11) / (16+17+11+1+0+0+0+0) = 44/45 = 0.9778`
- **Macro accuracy** — average each class equally:
  `16/16 + 17/18 + 11/11 = 1 + 0.94 + 1 = 2.94`, then `2.94 / 3 = 0.9815`

## Key points

- The many aliases are exam material: recall = sensitivity = TPR = hit rate;
  specificity = selectivity = TNR.
- Micro pools the raw counts; macro averages the per-class rates. They differ
  whenever classes have different sizes.

## Watch out for

- **Accuracy assumes equal costs for both kinds of error**, and that assumption is
  usually false. This is exactly why precision, recall and the F-measure exist —
  see [[precision-recall-and-f-measure]].

## Prerequisites

[[classification-and-regression]]
