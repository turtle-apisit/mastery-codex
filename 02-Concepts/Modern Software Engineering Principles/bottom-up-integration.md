---
subject: Modern Software Engineering Principles
skill_name: Bottom-Up Integration
score: 0
prerequisites:
- Stubs and Drivers
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

# Bottom-Up Integration

## Summary

> If code artifact `mAbove` **calls** code artifact `mBelow`, then `mBelow` is
> **implemented and integrated before** `mAbove`.

One possible ordering: `l,m` / `h,i,j,k` / `e,f,g` / `b,c,d,a`. Another:
`h,e,b` / `i,f,c,d` / `l,m,j,k,g [d]` / `a [b,c,d]`.

**Three advantages** — and they are precisely top-down's weaknesses:

1. **Operational artifacts are thoroughly tested.**
2. **Operational artifacts are tested with drivers, not by fault shielding,
   defensively programmed artifacts.**
3. **Fault isolation.**

**The difficulty:**

> **Major design faults are detected late.**

**The solution:** combine top-down and bottom-up strategies, making use of their
strengths and minimizing their weaknesses — see [[sandwich-integration]].

## Key points

- Bottom-up uses **drivers** (top-down uses stubs). The driver calls the artifact
  directly, with whatever inputs you choose — including the ones a defensive
  caller would have filtered out. That is exactly why advantage 2 holds.
- **Fault isolation is an advantage of both** strategies. It is not a
  discriminator between them; the discriminator is *what gets tested well* and
  *when design faults appear*.

## Watch out for

- The two strategies are mirror images: bottom-up's single weakness (late design
  faults) is top-down's advantage 3, and top-down's weakness (untested
  operational artifacts) is bottom-up's advantages 1 and 2.

## Prerequisites

[[stubs-and-drivers]]
