---
subject: Software Architecture
unit: Architecture Styles
skill_name: Layers of Isolation
score: 0
prerequisites:
- Layered Architecture Style
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03
---

# Layers of Isolation

## Summary

> The **layers of isolation** concept means that **changes made in one layer of
> the architecture generally don't impact or affect components in other layers**,
> **providing the contracts between those layers remain unchanged**.

> Each layer is **independent of the other layers**, thereby having **little or no
> knowledge of the inner workings** of other layers.

**Open and closed layers.** While **closed** layers facilitate layers of
isolation and therefore help **isolate change**, **there are times when it makes
sense for certain layers to be open.**

**The worked example.** To stop the presentation layer reaching shared business
objects directly, you **add a new services layer** containing all the shared
business objects. This **architecturally restricts** the presentation layer from
accessing them, because the business layer is **closed**.

**However — the new services layer must be marked as open**; otherwise the
business layer would be **forced to go through the services layer to access the
persistence layer**.

> Leveraging the concept of open and closed layers helps **define the
> relationship between architecture layers and request flows**.

## Key points

- Isolation is **conditional**: it holds *"providing the contracts between those
  layers remain unchanged."* Change a contract and isolation is gone.
- **Closed layer** = a request must pass through it. **Open layer** = a request may
  **skip** it.
- The example is the exam-worthy part, because the answer is counter-intuitive:
  adding a layer to *restrict* one path requires marking that new layer **open**
  so it does not accidentally block another.

## Watch out for

- Adding a layer without thinking about open/closed is how you get **tight
  coupling** in one direction and the **[[architecture-sinkhole-anti-pattern]]**
  in the other.

## Prerequisites

[[layered-architecture-style]]
