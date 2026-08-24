---
subject: Data Science and Engineering Principles
skill_name: Naive Bayes
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

# Naive Bayes

## Summary

A **parametric** classifier that classifies data points using **data likelihood
probabilities**. Its defining move — and the source of the word *naive* — is that
it **assumes independence of the features** in order to simplify the model.

The two worked examples in the course:

- **Spam filtering** — classifying emails as "spam" or "not spam (ham)".
- **Play golf?** — building a **frequency table** from the training data, turning
  it into a **likelihood table**, then computing the probability of each class
  given the conditions and **normalising** the two results to compare them. In
  the lecture's question, the answer comes out **No**.

## Key points

- The workflow to reproduce in an exam: frequency table → likelihood table →
  compute per-class probability → normalise → pick the larger.
- The independence assumption is almost always false in real data (words in an
  email are not independent), yet the classifier often performs well anyway.
  That gap is the interesting part of the method.
- It is **parametric**, alongside logistic regression and SVM.

## Watch out for

- "Naive" is a technical label for the independence assumption, not a judgement
  on the method's quality.

## Prerequisites

[[classification-and-regression]]
