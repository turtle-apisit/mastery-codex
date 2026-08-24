---
subject: Modern Software Engineering Principles
skill_name: Software Process Activities
score: 0
prerequisites:
- Software Process
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

# Software Process Activities

## Summary

The five generic activities every software process contains, whatever lifecycle
model wraps them:

1. **Communication**
2. **Planning**
3. **Modeling**
   - Analysis of requirements
   - Design
4. **Construction**
   - Code generation
   - Testing
5. **Deployment**

**The building analogy** the class uses to justify them:

- The **buyer** (client, customer) wants a dream house — they have a vision and
  needs. Their options are to buy an existing house, build it themselves, or
  hire constructors.
- The **constructors** (programmers, developers) need **details** of the house.
- The **blueprint** is what carries those details — but who made it, and how?
- The **architect** is **the bridge between buyer and constructor**: understand
  and capture needs, define the solution, specify the product to develop
  (specifications and instructions — drawings, blueprints, models), and handle
  test and inspections.

Mapped into software development, the same five steps appear: understand and
capture needs → specify the product → describe in detail the system that solves
the need → implement the solution → test.

## Key points

- Modeling covers **both** analysis and design; Construction covers **both** coding
  and testing. Testing is not a separate top-level activity.
- The architect role exists because the buyer's vision and the constructor's
  required detail are at different levels of abstraction and nobody bridges them
  automatically.

## Watch out for

- These activities are **not phases**. A lifecycle model decides how they are
  ordered and repeated — the same five activities appear in waterfall and in
  agile.

## Prerequisites

[[software-process]]
