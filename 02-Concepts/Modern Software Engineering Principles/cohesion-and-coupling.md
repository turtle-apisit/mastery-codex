---
subject: Modern Software Engineering Principles
skill_name: Cohesion and Coupling
score: 0
prerequisites:
- Modularity
source:
- 2026-SEA601-04-Requirements_Analysis_and_Design.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 4
---

# Cohesion and Coupling

## Summary

The rule modules must follow:

> **Maximal relationships within modules, and minimal relationships between
> modules.**

And the two measurements of that rule:

- **Module cohesion** — the **degree of interaction *within* a module**.
  You want it **high**.
- **Module coupling** — the **degree of interaction *between* modules**.
  You want it **low**.

## Key points

- Within / between is the whole distinction, and the words encode it: **co**hesion
  holds a module together, **coup**ling ties modules to each other.
- These are the measurable form of modularity. Modularity says "break it into
  components with minimal overlap"; cohesion and coupling say how to tell whether
  you succeeded.

## Watch out for

**AI touchpoint — cohesion and coupling become *harder to achieve*, not
irrelevant:**

> **A model couples to every feature it consumes: change any upstream field and
> its behaviour changes.**

A model has no narrow interface to the data it was trained on. Every input
column is a coupling, and none of them is declared anywhere a reader can see —
which is precisely the opposite of the "minimal relationships between modules"
rule.

## Prerequisites

[[modularity]]
