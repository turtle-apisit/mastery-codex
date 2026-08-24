---
subject: Data Science and Engineering Principles
skill_name: Measures of Central Tendency
score: 0
prerequisites:
- Types of Data and Variables
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

# Measures of Central Tendency

## Summary

Three different answers to "what is the typical value here", each with a
different failure mode.

**Mean** — the ordinary average. Takes every data point into account, which is
its strength and its weakness: it is **affected by outliers**. Good for exam
scores of a class, or average driving time home.

**Median** — the middle value once the data is sorted. Immune to outliers, but
tells you nothing about the rest of the distribution. This is why **household
income of a country** is reported as a median: a handful of billionaires would
drag the mean somewhere no household actually lives.

**Mode** — the most common value; the peak of a histogram. Also says little about
the rest of the data. Used for things like employees' income in a company.

## Key points

- There is **no single best measure** — but using only one is a bad idea. The
  three together describe the shape: mean ≈ median suggests symmetry, mean >
  median suggests a right skew.
- Mode is the only one of the three that works on **nominal** data. You cannot
  average blood types, but you can name the most common one.

## Watch out for

- "Average" in ordinary speech means mean, so a report saying "average salary"
  is usually hiding an outlier problem. Ask for the median.

## Prerequisites

[[types-of-data-and-variables]]
