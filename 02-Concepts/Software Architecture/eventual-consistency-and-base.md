---
subject: Software Architecture
unit: Architecture Styles
skill_name: Eventual Consistency and BASE
score: 0
prerequisites:
- ACID Transactions
- Monolithic and Distributed Architectures
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

# Eventual Consistency and BASE

## Summary

> Distributed architectures rely on **eventual consistency** to ensure the data
> processed by separate deployment units is **at some unspecified point in time**
> all synchronized into a consistent state.

And the trade-off, stated plainly:

> **This is one of the trade-offs of distributed architecture: high scalability,
> performance, and availability at the sacrifice of data consistency and data
> integrity.**

**BASE** is the counterpart to ACID:

- **B**asic
- **A**vailability
- **S**oft state
- **E**ventual consistency

> **BASE transactions are not a piece of software, but rather a technique.**
> **Soft state** refers to data in transit — data that is not yet settled and may
> still change without new input.

## Key points

- **ACID vs BASE** is the fundamental exam pair:
  - ACID → **monolithic** and **service-based** (coarse-grained services, single
    shared database, transactions scoped to one domain service)
  - BASE → **microservices** and other **highly distributed**, fine-grained
    architectures
- "At some unspecified point in time" is a real property, not vagueness in the
  wording. Eventual consistency gives you **no bound** on when convergence
  happens.
- **Eventual inconsistency** is listed as the **primary risk / anti-pattern of
  event-driven architecture** in the comparison matrix.

## Watch out for

- Sagas and BASE are the two named techniques for managing distributed
  transactions, and they are **complementary, not alternatives** — the slides say
  *"in addition to sagas, BASE transactions are used."* See [[saga-pattern]].

## Prerequisites

[[acid-transactions]] · [[monolithic-and-distributed-architectures]]
