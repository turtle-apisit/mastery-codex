---
subject: Modern Software Engineering Principles
skill_name: Moving Target Problem
score: 0
prerequisites:
- Requirement Definition
- Iterative and Incremental Development
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

# Moving Target Problem

## Summary

> **"A change in the requirements while the software product is being
> developed."**

The valuable part of this slide is that it **refuses to treat all requirement
changes as the same problem**. Five causes, five different verdicts:

| Cause | Remedy |
|---|---|
| The client **learns what they actually need by seeing something** | **Not a problem.** This is IID working as designed |
| **The world changed** — a law, a competitor, a policy | **Nothing prevents it.** Design to absorb it |
| Requirements were **never elicited properly** | **Preventable.** This is a **process failure** |
| A **new stakeholder appears with a veto** | **Preventable** — Class 1's stakeholder activity |
| Someone **wants something new and calls it a clarification** | A **governance problem**, not an engineering one |

## Key points

- Only **two** of the five are engineering failures you could have prevented:
  bad elicitation and missed stakeholders.
- One is **not a failure at all** — it is the intended behaviour of iterative
  development, and treating it as a problem is itself the mistake.
- One is **not an engineering problem** at all — scope creep dressed as
  clarification is a governance issue and needs a governance answer, not a
  technical one.

## Watch out for

- The instinct is to answer "requirements changed" with "we need to freeze the
  requirements". This table is the argument against that: freezing would only
  address rows 3 and 4, and would actively damage row 1.

## Prerequisites

[[requirement-definition]] · [[iterative-and-incremental-development]]
