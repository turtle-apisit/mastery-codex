---
subject: Data Science and Engineering Principles
skill_name: Transactional Data and Market Basket Analysis
score: 0
prerequisites: []
source:
- Association rules.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from Association rules.pdf
---

# Transactional Data and Market Basket Analysis

## Summary

**Transactional data** is information collected and recorded from individual
transactions or events. Its key characteristic is that it captures the details
of a **specific, single occurrence**.

**Market basket analysis (MBA)** is the data mining technique applied to it: it
identifies **relationships between items that are frequently purchased
together**, uncovering hidden patterns in transactional data and expressing them
as **association rules**.

An **itemset** is a collection of one or more items — in MBA, a group of items
appearing together in a single transaction.

## Key points

- Association mining is **descriptive**, not predictive. It describes
  co-occurrence in the transactions you already have.
- The business payoff is concrete and operational: if `{Bread, Eggs} → {Milk}` is
  a strong rule, the store owner might place milk near the bread and eggs
  sections to encourage impulse purchases.

## Watch out for

- The whole method rests on transactions being recorded at the right grain. A
  "transaction" that aggregates a week of purchases is no longer a single
  occurrence, and the rules it produces mean something different.

## Prerequisites

None — this is a root concept for the subject.
