---
subject: Modern Software Engineering Principles
skill_name: Classical Waterfall Phases
score: 0
prerequisites:
- Waterfall Life-Cycle Model
source:
- 2026-SEA601-02-Waterfall Life-Cycle Model.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 2
---

# Classical Waterfall Phases

## Summary

**Requirements phase**
- Explore the concept
- Elicit the client's requirements

**Analysis (specification) phase**
- Analyze the client's requirements
- Draw up the **specification document**
- Draw up the **software project management plan**
- Answers **"what the product is supposed to do"**

**Design phase**
- **Architectural design**, followed by
- **Detailed design**
- Answers **"how the product does it"**

**Implementation phase**
- Coding
- Unit testing
- Integration
- Acceptance testing

**Postdelivery maintenance** — then **Retirement**.

## Key points

- The **what / how** pair is the cleanest way to hold the Analysis/Design
  boundary: analysis says *what*, design says *how*.
- Design always splits into two levels: broad structure first (architectural),
  then specifics (detailed).
- The implementation phase contains **four** things, not one — coding is only the
  first of them.

## Watch out for

Three phases the course argues **should not exist as separate phases**:

- **Testing phase** — far too late to test after development and before delivery.
  In the classical paradigm, **verification** is testing at the end of each phase
  (too late) and **validation** is testing at the end of the project (far too
  late).
- **Documentation phase** — documentation must **always be current**. Key people
  may leave; you cannot perform a phase without the previous phase's
  documentation; you cannot test or maintain without documentation.
- **Planning phase** — you cannot plan at the beginning because you do not yet
  know exactly what is to be built. You do **preliminary** planning of the
  requirements and analysis phases at the start, and the **software project
  management plan (SPMP)** is drawn up **when the specifications have been signed
  off by the client**. Management then monitors the SPMP throughout the rest of
  the project.

## Prerequisites

[[waterfall-life-cycle-model]]
