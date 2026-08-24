---
subject: Modern Software Engineering Principles
skill_name: Client Constraints
score: 0
prerequisites:
- Requirement Definition
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

# Client Constraints

## Summary

> **It is vital to determine the client's constraints.**

**Deadline** — nowadays software products are often **mission critical**, so the
deadline is frequently non-negotiable.

**Cost** — and here is the awkward part:

> **The client will rarely inform the developer how much money is available.**
> A **bidding procedure** is used instead.

**Other constraints:**

- **Parallel running** — the new system must run alongside the old one
- **Portability**
- **Reliability**
- **Rapid response time**

## Key points

- Most of these are **nonfunctional requirements** wearing a different hat. The
  reason they are collected separately is that they **bound the solution space**
  before any solution is proposed.
- The cost asymmetry is worth remembering as a fact about practice, not a
  complaint: you are usually designing against a budget you cannot see.

## Watch out for

- The **solution strategy** step deals with this directly: **find strategies
  without worrying about constraints first**, then **modify the strategies in the
  light of the constraints**. Constraints are applied *after* the strategies
  exist, not before. See [[solution-strategy]].

## Prerequisites

[[requirement-definition]]
