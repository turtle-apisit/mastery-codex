---
subject: Modern Software Engineering Principles
skill_name: Modern Maintenance Definition
score: 0
prerequisites:
- Types of Maintenance
source:
- 2026-SEA601-02-Waterfall Life-Cycle Model.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 2
---

# Modern Maintenance Definition

## Summary

**Classical maintenance** follows the **development-then-maintenance model**.
This is a **temporal definition**: whether an activity counts as development or
maintenance depends on **when** it is performed. That definition has stopped
working, because **development (building software from scratch) is rare today** —
reuse is widespread, and development is continuous.

**Modern maintenance**, defined operationally by ISO and IEC in **1995**:

> The process that occurs when a software artifact is **modified** because of a
> **problem** or because of a **need for improvement or adaptation**.

> Maintenance occurs **whenever software is modified** — regardless of whether
> this takes place **before or after** installation of the software product.

**The terminology split:**

- **Postdelivery maintenance** — changes **after delivery and installation**
  [IEEE 1990].
- **Modern maintenance** (or just *maintenance*) — corrective, perfective, or
  adaptive maintenance performed **at any time** [ISO/IEC 1995, IEEE/EIA 1998].

## Key points

- The shift is from a **time-based** definition to a **cause-based** one. Modern
  maintenance asks *why was it modified*, not *when*.
- Why it matters commercially: **bad software is discarded, good software is
  maintained** — for 10, 20 years or more. **Software is a model of reality, which
  is constantly changing.**
- Between 1976–1981 and 1992–1998 the share of time (and therefore cost) spent on
  postdelivery maintenance grew — and **at least 67% of the total cost of a
  product accrues during postdelivery maintenance**.

## Watch out for

- "Postdelivery maintenance" and "maintenance" are **not** synonyms after 1995.
  Using them interchangeably loses the whole point of the redefinition.

## Prerequisites

[[types-of-maintenance]]
