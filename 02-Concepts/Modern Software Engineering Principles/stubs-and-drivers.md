---
subject: Modern Software Engineering Principles
skill_name: Stubs and Drivers
score: 0
prerequisites:
- Modularity
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

# Stubs and Drivers

## Summary

**The approach up to now:** implementation followed by integration — code and
test each code artifact separately, then link all 13 artifacts together and test
the product as a whole. **This is a poor approach.**

**Stub** — stands in for an artifact that the one under test *calls*. To test
artifact `a`, artifacts `b`, `c`, `d` must be stubs. A stub is:

- An **empty artifact**, or
- One that **prints a message** (`"Procedure radarCalc called"`), or
- One that **returns precooked values** from preplanned test cases

**Driver** — stands in for the artifact that *calls* the one under test. To test
artifact `h` on its own requires a driver, which calls it:

- Once, or
- Several times, or
- Many times, each time checking the value returned

Testing artifact `d` requires **a driver and two stubs**.

**Two problems with implementation-then-integration:**

1. **Stubs and drivers must be written, then thrown away** after unit testing is
   complete.
2. **Lack of fault isolation.** A fault could lie in any of the 13 artifacts or
   13 interfaces. In a large product with 103 artifacts and 108 interfaces there
   are **211 places** where a fault might lie.

**The solution to both problems: combine unit and integration testing.**

## Key points

- Direction is the memory hook: a **stub is below** (something you call), a
  **driver is above** (something that calls you).
- The 211-places calculation is the argument, and it is worth being able to
  reproduce: artifacts **plus** interfaces.

## Watch out for

- The two problems have **one** shared solution. That solution is what the
  integration strategies — [[top-down-integration]], [[bottom-up-integration]],
  [[sandwich-integration]] — implement.

## Prerequisites

[[modularity]]
