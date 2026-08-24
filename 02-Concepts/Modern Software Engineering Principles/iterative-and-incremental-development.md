---
subject: Modern Software Engineering Principles
skill_name: Iterative and Incremental Development
score: 0
prerequisites:
- Miller's Law and Stepwise Refinement
- Problems with the Waterfall Model
source:
- 2026-SEA601-03-Iterative and Incremental Development.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 3
---

# Iterative and Incremental Development

## Summary

**Iteration** is *the repetition of a process* — in one task, in one activity, or
across many activities. **PDCA** (plan-do-check-act) is the canonical shape.

> The basic software development process **is** iterative. **Each successive
> version is intended to be closer to its target than its predecessor.**

**Incrementation** comes from stepwise refinement: handle the most important
aspects first, postpone the rest, and every aspect eventually gets handled.

**Strengths of IID:**

- **Feedback**
- **Learning**
- **Improvement** — of both process and product
- Handles **'unknown' and 'changes'** better than waterfall
- **We have a working version of the software product from the start**
  - The client and users can **experiment with this version** to determine what
    changes are needed
  - **Return on Investment (ROI)** arrives earlier (Rubin, *Essential Scrum*)

**Example**: the **Unified Process**.

## Key points

- Iterative and incremental are **two different properties**. Iterative = repeat
  the process to get closer each time. Incremental = deliver in pieces, most
  important first. Waterfall is arguably slightly iterative (feedback loops) and
  **not** incremental.
- The single biggest practical difference from waterfall: **a working version
  exists from the start**, which is what makes feedback and early ROI possible.

## Watch out for

- **AI touchpoint:** *an experiment is an iteration*, and **ML work is inherently
  iterative**. But Class 5 adds the warning: **watch for iteration with no
  increments — a hundred experiments and nothing shipped.** Iterating without
  incrementing is the specific failure mode of ML projects.

## Prerequisites

[[millers-law-and-stepwise-refinement]] · [[problems-with-the-waterfall-model]]
