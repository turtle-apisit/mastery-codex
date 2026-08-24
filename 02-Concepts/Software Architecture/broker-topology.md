---
subject: Software Architecture
skill_name: Broker Topology
score: 0
prerequisites:
- Event-Driven Architecture Style
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
- class02_slides.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03 and Class 2
---

# Broker Topology

## Summary

> **There is no central event mediator** in the broker topology. The message flow
> is **distributed across the event processor components in a chain-like
> broadcasting fashion**, through a **lightweight message broker** such as
> **RabbitMQ, ActiveMQ, or HornetQ**.

**Four primary architecture components:**

1. An **initiating event**
2. The **event broker**
3. An **event processor**
4. A **processing event**

A **notification event** may be **sent but ignored** — nobody is obliged to
subscribe.

**The problems** — from the `PlaceOrder` example:

- **There is no control over the overall workflow** associated with the initiating
  event
- **Error handling is a big challenge**
- **The business process gets stuck and is unable to move without some sort of
  automated or manual intervention**
- **All other processes are moving along without regard for the error**

## Key points

- The trade-off from Class 2's comparison:

| Attribute | **Broker Topology** | Mediator Topology |
|---|---|---|
| Control mechanism | **Decentralized (Choreography)** | Centralized (Orchestration) |
| Central coordinator | **None** (event processor chain) | Central Mediator / Workflow Engine |
| Coupling | **Extremely Low** | Medium (services know the mediator) |
| Workflow visibility | **Hard to trace business flow** | Explicit workflow state management |
| Best used for | **High-speed, simple fire-and-forget** | Complex multi-step business transactions |

- Broker gives **maximum throughput and minimum coupling** — and pays for it with
  **no workflow visibility and no error coordination**.
- Last bullet of the problem list is the sharpest one: when one step fails, **the
  rest of the system carries on regardless**, because nothing is watching the
  whole flow.

## Watch out for

- **Master's Insight:** *Use **Broker** for maximum throughput. Use **Mediator**
  when business workflows require strict state transitions or compensation (e.g.
  the Saga Pattern).*

## Prerequisites

[[event-driven-architecture-style]]
