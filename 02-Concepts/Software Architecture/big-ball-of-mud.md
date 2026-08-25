---
subject: Software Architecture
unit: Architecture Styles
skill_name: Big Ball of Mud
score: 0
prerequisites: []
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03
---

# Big Ball of Mud

## Summary

From Mark Richards, *Fundamentals of Software Architecture*:

> *"A big ball of mud" might describe a simple scripting application with **event
> handlers wired directly to database calls, with no real internal structure**.
> Many trivial applications **start like this then become unwieldy as they
> continue to grow**.*

## Key points

- The defining property is **no real internal structure** — not size, not age,
  not language.
- The two-stage story matters: it is **fine at first**, and the problem is
  **growth**. Nothing is wrong with the scripting application on day one.
- In the comparison matrix, Big Ball of Mud is listed as the **primary risk /
  anti-pattern of the Monolithic architecture** — the thing a monolith degrades
  into when nobody maintains its internal boundaries.

## Watch out for

- A monolith is **not** a big ball of mud by default. A monolith with clear
  internal module boundaries (a *modular monolith*) is a legitimate design; the
  mud is what happens when those boundaries are never drawn or never enforced.

## Prerequisites

None — this is a root concept for the subject.
