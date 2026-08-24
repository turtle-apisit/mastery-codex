---
subject: Modern Software Engineering Principles
skill_name: Software Deterioration
score: 0
prerequisites:
- Software Complexity and Intangibility
source:
- 2026-SEA601-01-Introduction to Software Development.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 1
---

# Software Deterioration

## Summary

**Software doesn't "wear out" and there are no spare parts. However, it
deteriorates with changes.**

Contrast with hardware, which follows the **bathtub curve**: high early failure
rate (infant mortality), a long flat useful life, then a rising failure rate as
parts physically wear out.

Software's curve is different. The **idealized curve** falls as faults are fixed
and then stays flat forever — nothing physical degrades. The **actual curve**
does not: every change introduces **side effects**, so each change event spikes
the failure rate, and the level never returns fully to where it was. The result
is a curve that **steps upward over time**, with each step triggered by a
**change**.

## Key points

- Deterioration is caused by **modification**, not by time or use. Untouched
  software does not decay — which is exactly what makes the AI case interesting.
- This is why **maintainability** is treated as a design-time concern rather than
  a maintenance-time one, and why regression testing exists.

## Watch out for

- Do not describe software as "wearing out". The whole point of the distinction
  is that the mechanism is different, even though the failure-rate curve looks
  superficially similar.
- The exception the course raises immediately afterwards is a trained model —
  see [[data-drift-in-trained-models]], where the failure rate rises with **no
  change events on the curve at all**.

## Prerequisites

[[software-complexity-and-intangibility]]
