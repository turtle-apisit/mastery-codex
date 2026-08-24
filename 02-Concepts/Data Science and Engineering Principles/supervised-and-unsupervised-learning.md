---
subject: Data Science and Engineering Principles
skill_name: Supervised and Unsupervised Learning
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

# Supervised and Unsupervised Learning

## Summary

The top-level map of ML methods used in data science, organised by whether the
training data carries labels.

**Supervised learning** — labels exist; the methods are **predictive**.

- *Classification* (categorical target): Naive Bayes, K-nearest neighbours,
  Support Vector Machine, Decision Trees, Random Forest, Logistic Regression
- *Regression* (numeric target): Linear Regression

**Unsupervised learning** — no labels; the methods are **descriptive**.

- *Clustering*: K-means, DBSCAN (density-based spatial clustering of
  applications with noise), BIRCH (balanced iterative reducing and clustering
  using hierarchies)
- *Association rules*: Apriori (e.g. market basket analysis)
- *Anomaly detection* (outlier detection)

**Visualisation** sits alongside both as descriptive analytics — box plots,
scatter plots.

A third branch, **reinforcement learning**, exists outside this split.

## Key points

- The supervised/unsupervised line is about **labels in the training data**, not
  about difficulty or sophistication.
- The predictive/descriptive line runs almost parallel to it: supervised methods
  predict a value, unsupervised methods describe structure.
- Clustering (K-means) and classification (KNN, decision tree) both put things
  into groups — the difference is that classification is *told* the groups in
  advance and clustering has to find them.

## Watch out for

- K-nearest neighbours is **supervised** even though it does no training, because
  it uses the labels of the K neighbours to vote. Do not group it with K-means
  just because both names start with K.

## Prerequisites

None — this is a root concept for the subject.
