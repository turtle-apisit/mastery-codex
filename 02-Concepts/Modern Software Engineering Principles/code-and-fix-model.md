---
subject: Modern Software Engineering Principles
skill_name: Code and Fix Model
score: 0
prerequisites:
- Software Life-Cycle
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

# Code and Fix Model

## Summary

The degenerate lifecycle model:

- **No design**
- **No specifications**
- → a **maintenance nightmare**

And the pair of statements that defines it:

> It is **the easiest way** to develop software.
> It is **the most expensive way**.

## Key points

- The two claims are not in tension — cheapest to start, most expensive over the
  life-cycle. This is the cost-of-correcting-faults curve stated as a process.
- The slide's open question, *"What is it suitable for?"*, has a real answer:
  genuinely throwaway code. A **1-shot project** with no maintenance stage — a
  script you run once, a spike to answer one question.

## Watch out for

- The failure mode is not writing code without a design. It is writing code
  without a design **and then keeping it**. The nightmare is in maintenance, which
  is where at least 67% of a product's cost lives.

## Prerequisites

[[software-life-cycle]]
