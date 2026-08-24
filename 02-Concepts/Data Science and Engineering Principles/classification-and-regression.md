---
subject: Data Science and Engineering Principles
skill_name: Classification and Regression
score: 0
prerequisites:
- Supervised and Unsupervised Learning
source:
- Classification and Metrics.pdf
- Decision Trees.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from Classification and Metrics.pdf and Decision Trees.pdf
---

# Classification and Regression

## Summary

The two supervised prediction tasks, separated by **the type of the target
variable**:

- **Classification** — the target variable (called the **class label**) is
  **categorical**.
- **Regression** — the target variable is **numeric**.

A classification model is fitted to sort data points into multiple categories or
classes. Examples: spam email filtering, speech and handwriting recognition,
biometric authentication.

The five classifiers covered in this course, each in one line:

- **K-nearest neighbours (KNN)** — predicts from the training data points in the
  neighbourhood of the given test point.
- **Decision Trees (DT)** — splits the dataset at every node based on the value
  of a variable, and classifies points in a leaf node from the aggregate class
  labels there.
- **Naive Bayes (NB)** — classifies using data likelihood probabilities, assuming
  independence of features to simplify the model.
- **Logistic Regression (LR)** — fits class probabilities with a sigmoid
  function; coefficients obtained by gradient descent.
- **Support Vector Machine (SVM)** — learns the hyperplane separating two classes
  with the maximum margin (the closest distance between points of the two
  classes).

## Key points

- Like regression models, classification models come in **parametric and
  non-parametric** types. See [[parametric-and-non-parametric-models]].
- Several algorithms do both jobs: a decision tree can predict a house price
  (regression) as well as whether to play a sport (classification); KNN averages
  neighbour values for regression and takes a majority vote for classification.

## Watch out for

- "Logistic regression" has *regression* in its name but is a **classification**
  method. The name refers to the logistic function it fits, not the task.

## Prerequisites

[[supervised-and-unsupervised-learning]]
