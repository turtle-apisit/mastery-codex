---
subject: Data Science and Engineering Principles
skill_name: K-Means Clustering
score: 0
prerequisites:
- Supervised and Unsupervised Learning
- Feature Scaling
source:
- K-means clustering basics.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from K-means clustering basics.pdf
---

# K-Means Clustering

## Summary

One of the most popular unsupervised ML algorithms. It groups similar data points
into clusters **without prior knowledge of the group labels**.

K-means divides data into **k** clusters by minimising the sum of squared
distances from each data point to the mean of its assigned cluster — the
**within-cluster sum of squares (WCSS)**.

**The algorithm:**

1. Select k centroids (k rows of the dataset chosen at random)
2. Assign each data point to its closest centroid
3. Recalculate the centroids as the average of all data points in a cluster
4. Reassign data points to their closest centroids again
5. Repeat steps 3 and 4 until no observations are reassigned, or the maximum
   number of iterations is reached

R uses the efficient **Hartigan and Wong (1979)** algorithm, which partitions
observations into k groups so that WCSS to the assigned centroid is minimised —
in steps 2 and 4 each observation goes to the cluster with the smallest WCSS
value.

## Key points

- The "K" is the **number of clusters you want to find, chosen in advance**. Use
  the [[elbow-method]] or Silhouette Score to pick it.
- K-means is **non-deterministic**: running it several times on the same data can
  give different results, because the initial centroids are selected at random.
  It is therefore **sensitive to initial centroid placement** and can converge to
  poor solutions.
- It does **not** ensure clusters have the same size — it finds the clusters that
  are **best separated**.

## Watch out for

- **Not suitable for non-numerical (categorical) data.** Even if you encode
  categories numerically (one-hot), Euclidean distance becomes misleading. Use
  [[k-modes-and-k-prototypes]] instead.
- Scale your numerical variables first, or the largest-magnitude feature decides
  the clusters. See [[feature-scaling]].

## Prerequisites

[[supervised-and-unsupervised-learning]] · [[feature-scaling]]
