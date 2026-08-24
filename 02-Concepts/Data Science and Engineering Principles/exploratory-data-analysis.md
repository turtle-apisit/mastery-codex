---
subject: Data Science and Engineering Principles
skill_name: Exploratory Data Analysis
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

# Exploratory Data Analysis

## Summary

EDA is a technique for **understanding your data by summarising its main
characteristics**, usually through statistical graphics and visualisation. It is
a **non-parametric** approach: it makes no assumptions about the underlying
distribution of the data.

Its purpose is understanding, not prediction. EDA covers data visualisation,
statistical summaries, and hypothesis testing.

The sharpest way to hold the boundary:

- A **box plot is EDA**.
- **Linear regression is not EDA** — it is data modelling.
- But EDA feeds modelling: the patterns and trends you find during EDA are what
  you then build a linear regression model on.

## Key points

- Non-parametric = no assumed distribution. You are looking at what the data
  actually is, not fitting it to a shape you assumed in advance.
- Sits at the start of the workflow, before any model is chosen.
- Historically it is the descendant of OLAP-style data exploration in the
  evolution: relational databases (1970) → OLTP → OLAP → pattern recognition
  and recommendation → big data with DS/ML/DL.

## Watch out for

- One of the most important aspects of data science is finding *and recognising*
  patterns — where "recognising" specifically means patterns that were **not
  expected in advance**. EDA that only confirms what you already believed has
  not done its job.

## Prerequisites

[[types-of-data-and-variables]]
