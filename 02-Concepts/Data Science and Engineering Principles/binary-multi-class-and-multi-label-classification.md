---
subject: Data Science and Engineering Principles
skill_name: Binary Multi-Class and Multi-Label Classification
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

# Binary Multi-Class and Multi-Label Classification

## Summary

Three classification shapes, distinguished by **how many labels each sample gets
and from how many classes**.

- **Binary classification** — each data sample is assigned **one and only one**
  label from **two mutually exclusive** classes.
- **Multi-class classification** — each data sample is assigned **one and only
  one** label from **more than two** classes.
- **Multi-label classification** — a supervised algorithm that assigns **zero or
  more** labels to each data sample. Example: classifying an image containing a
  dog, a fowl, a donkey and a cat all at once. Often used in **image recognition**.

## Key points

- The line between binary and multi-class is **how many classes**; the line
  between those two and multi-label is **how many labels per sample**.
- Multi-label allows **zero** labels — a sample may match nothing.
- A model with more than two class values is multi-class; the presence of many
  classes alone does not make it multi-label.

## Watch out for

- The confusion matrix for multi-class problems is built **class by class**, and
  it is where micro vs macro accuracy comes in — see [[confusion-matrix]].

## Prerequisites

[[classification-and-regression]]
