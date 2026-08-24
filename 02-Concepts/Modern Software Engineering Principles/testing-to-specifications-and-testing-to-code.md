---
subject: Modern Software Engineering Principles
skill_name: Testing to Specifications and Testing to Code
score: 0
prerequisites:
- Fault Failure and Defect Terminology
source:
- 2026-SEA601-05-Implementation_Testing_and_Maintenance.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 5
---

# Testing to Specifications and Testing to Code

## Summary

**Unit testing** comes in two forms: **informal unit testing by the programmer**,
and **methodical unit testing by the SQA group** — the latter split into
**execution-based** and **non-execution-based** testing.

**Test case selection:** the **worst way is random testing**. A systematic way to
construct test cases is needed. There are **two extremes**:

**Test to specifications** — also called **black-box**, **data-driven**,
**functional**, or **input/output driven** testing.
> **Ignore the code — use the specifications to select test cases.**

**Test to code** — also called **glass-box**, **logic-driven**, **structured**, or
**path-oriented** testing.
> **Ignore the specifications — use the code to select test cases.**

**Two limits of testing to code:**

1. **Infeasible code.** It may not be possible to test a specific statement — you
   may have an **infeasible path ("dead code")** in the artifact. **Frequently
   this is evidence of a fault.**
2. **A path can be tested only if it is present.** A programmer who **omits the
   test for `d == 0`** in the code probably is **unaware of the possible danger**
   — and no code-derived test case will ever look for a path that was never
   written.

> **Testing to code is not reliable. We can exercise every path without detecting
> every fault.**

## Key points

- Learn all four aliases for each side; exam questions swap them freely.
- Point 2 is the fundamental limitation: coverage measures what the code does,
  and can say nothing about what the code **fails to do**.

## Watch out for

**AI touchpoint — this is one of the three practices that *break*.**

- Testing to specification is **strained**: **the oracle is statistical** —
  performance on a held-out set, and **on the slices that matter** (first-year
  students, staff, each faculty).
- **Unit testing breaks as a correctness argument**: *"There is **no expected
  output for a single input**. You test **properties over a population**, not
  cases."*
- The replacement: **evaluation on slices** — not *"does it work?"* but **"for
  whom does it work?"** Overall accuracy hides that it fails for first-year
  students with no attendance history — the Class 2 case, **found by measurement
  instead of by a newspaper.**

## Prerequisites

[[fault-failure-and-defect-terminology]]
