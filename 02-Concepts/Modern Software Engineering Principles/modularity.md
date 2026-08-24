---
subject: Modern Software Engineering Principles
skill_name: Modularity
score: 0
prerequisites:
- Separation of Concerns
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

# Modularity

## Summary

> **The process of breaking a software product into components with minimal
> overlap of functionality.**

Benefits:

- **Minimizes regression faults**
- **Promotes reuse**

**Separation into individual, *physical* parts**, with three properties:

- **Decomposability** — divide and conquer
- **Composability** — component assembly; reuse
- **Understanding** — localization

**What is a module?**

> **A lexically contiguous sequence of program statements, bounded by boundary
> elements, with an aggregate identifier.**

## Key points

- Note the word **physical**. Abstraction separates into *logical* parts; this
  separates into *physical* ones.
- The three properties answer three different questions: can I take it apart
  (decomposability), can I put pieces together (composability), can I find the
  thing I need to change (understanding/localization).

## Watch out for

- The **design of a computer** example: an incompetent architect builds an ALU,
  shifter, and 16 registers out of AND, OR and NOT gates rather than NAND or NOR
  gates, then redesigns with **one gate type per chip**. The two designs are
  **functionally equivalent**, but the second is:
  - Hard to understand
  - Hard to locate faults in
  - Difficult to extend or enhance
  - **Cannot be reused** in another product

  Functional equivalence is not design equivalence. The rule that follows is
  **maximal relationships within modules, and minimal relationships between
  modules** — which is [[cohesion-and-coupling]].

## Prerequisites

[[separation-of-concerns]]
