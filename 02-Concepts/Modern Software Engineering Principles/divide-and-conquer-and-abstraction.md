---
subject: Modern Software Engineering Principles
skill_name: Divide-and-Conquer and Abstraction
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

# Divide-and-Conquer and Abstraction

## Summary

Two special cases of separation of concerns, cutting in perpendicular directions.

**Divide-and-conquer** — divide and conquer **"horizontally"**; the **"brick"
effect**.

> Solve a large, hard problem by **breaking it up into smaller subproblems** that
> hopefully will be easier to solve.

Used in the **Unified Process** to handle a large, complex system:

- *Analysis workflow* — partition the software product into **analysis packages**
- *Design workflow* — break up the upcoming implementation workflow into
  manageable pieces, termed **subsystems**

**Abstraction** — divide and conquer **"vertically"**; the **"iceberg" effect**.

> **Separation into individual, logical parts** — relevant versus irrelevant
> details. **Use relevant details to solve the task at hand; ignore irrelevant
> details.**

Examples:

- The **user interface of a watch** (its buttons) abstracts away the watch's
  internals for the purpose of setting the time.
- **Abstraction yields models** — when requirements are analyzed we produce a
  model of the proposed application.

## Key points

- **Horizontal (brick) = divide-and-conquer**: many pieces at the same level of
  detail.
  **Vertical (iceberg) = abstraction**: one thing at several levels of detail,
  with the lower levels hidden.
- Modularity is *separation into individual **physical** parts*; abstraction is
  *separation into individual **logical** parts*. That single word is the
  distinction.

## Watch out for

- The two are easy to state and easy to confuse under exam pressure. Anchor on
  the images: bricks lie **side by side**; an iceberg is mostly **below**.

## Prerequisites

[[separation-of-concerns]]
