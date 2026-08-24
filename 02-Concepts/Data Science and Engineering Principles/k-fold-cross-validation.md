---
subject: Data Science and Engineering Principles
skill_name: K-Fold Cross-Validation
score: 0
prerequisites:
- Training Validation and Test Sets
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

# K-Fold Cross-Validation

## Summary

A resampling scheme that generally results in a **less biased model** than a
plain split, because it ensures **every observation from the original dataset
has a chance of appearing in both the training and the validation set**.

**The mechanic:** set some hyperparameters, train on **K−1 folds**, validate on
the remaining **1 fold**, compute the **average accuracy over the K folds**, then
repeat the whole thing with another set of hyperparameters.

**The full 5-fold procedure from the lecture:**

1. Assume 5-fold cross-validation.
2. Split the dataset into **Train (80%)** and **Test (20%)**.
3. **Keep the Test set aside** for a final test.
4. Split the 80% into 5 folds. Set some hyperparameters, run the full 5-fold
   cross-validation, and record the average accuracy. Repeat for as many
   hyperparameter sets as needed.
5. Select the hyperparameters with the **highest average accuracy**.
6. Using those best hyperparameters, **train from scratch on the whole 80% Train
   set** one more time — that gives the final model.
7. No further validation is needed.
8. Run the final model against the **held-out 20% Test set**.
9. Obtain the accuracy of the final model.

## Key points

- **Choosing K:** preferably **5–10**, depending on data size.
  - **Higher K** → less biased model, but **large variance might lead to
    overfitting**.
  - **Lower K** → behaves like a plain train-test split.
- Step 6 is the step most often forgotten: after selecting hyperparameters you
  **retrain on the full training portion**, you do not keep one of the fold
  models.

## Watch out for

- Cross-validation is a way of choosing hyperparameters and reducing overfitting
  — it is **not** a substitute for the final held-out test set.

## Prerequisites

[[training-validation-and-test-sets]]
