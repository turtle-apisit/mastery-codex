---
subject: Software Architecture
skill_name: Microservices Granularity
score: 0
prerequisites:
- Bounded Context
source:
- CH03_2_SEA604Microservices.pptx
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from the SEA604 Microservices deck (text extracted from pptx)
---

# Microservices Granularity

## Summary

**The problem.** While it is great to have specialized shops, **if they are too
small, customers have to go to multiple places** to buy everything they need.
Likewise: **if microservices are too small, you end up with a lot of
communication between them, which can be inefficient.**

> The size of a microservice should be based on **the specific needs of your
> application**. Some parts might naturally be larger than others. **The goal is
> to find a balance between making them too small and too big.**

**Three signals for deciding granularity:**

**Purpose** — each microservice should have a **clear and focused job to do**,
like a specialized tool designed for a specific task.

**Transactions** — if **multiple microservices need to work together to complete
a task**, consider how they will communicate and coordinate. **Sometimes it is
better to keep these closely related services together to avoid complications.**

**Choreography** — if **many microservices need to constantly communicate with
each other** to function, **it might be a sign that they should be grouped
together into a larger service**. This simplifies things and reduces
communication overhead.

## Key points

- All three signals point the same direction: **chatter between services is
  evidence that a boundary is in the wrong place**.
- The rule is explicitly **not** "make them as small as possible". *Micro* is not
  a target.
- This is why **[[service-based-architecture-style]]** is called pragmatic — it
  gets architectural modularity *"without having to get tangled up in the
  complexities and pitfalls of granularity"*.

## Watch out for

- Applied to transactions: **"If you find yourself needing transactions between
  services, it might be a sign that they are too small."** Reach for the
  granularity question **before** reaching for the [[saga-pattern]] — *"trying to
  force them to work together in a transaction can be difficult and can violate
  the principles of the architecture."*

## Prerequisites

[[bounded-context]]
