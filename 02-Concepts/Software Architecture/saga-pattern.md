---
subject: Software Architecture
skill_name: Saga Pattern
score: 0
prerequisites:
- Eventual Consistency and BASE
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
- CH03_2_SEA604Microservices.pptx
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03 and the Microservices deck
---

# Saga Pattern

## Summary

> **Transactional sagas are one way to manage distributed transactions.** Sagas
> utilize either **event sourcing for compensation** or **finite state machines**
> to manage the state of the transaction.

**How it works.** A service acts as a **mediator across multiple service calls**
and coordinates the transaction. The mediator **calls each part of the
transaction, records success or failure, and coordinates results**. If everything
goes as planned, all the values in the services and their contained databases
update synchronously.

**Compensating transactions — the error path.**

> In an error condition, **the mediator must ensure that no part of the
> transaction succeeds if one part fails.**

If the **first part succeeds yet the second part fails**, the mediator must
**send a request to all the parts that were successful and tell them to undo the
previous request**. This style of coordination is called a **compensating
transaction framework**.

Implementation: each request from the mediator typically **enters a pending
state** until the mediator indicates overall success.

**The costs:**

- The design **becomes complex if asynchronous requests must be juggled**,
  especially if new requests appear that are **contingent on pending
  transactional state**
- It **creates a lot of coordination traffic at the network level**
- **Saga only supports eventual consistency** — data is gradually updated and
  eventually matched, but not in a fraction of a second
- **Saga lacks isolation** (fragmentation of data during transactions), unlike
  normal ACID. Developers often have to use **other countermeasures** to prevent
  the resulting errors

## Key points

- Saga replaces **atomicity** with **compensation**: instead of preventing a
  partial commit, it lets parts commit and then **undoes** them.
- The **I** in ACID is the one saga cannot recover. Other transactions **can** see
  the intermediate, partially-applied state.
- It is a **mediator** pattern, which is why it appears both in event-driven
  architecture and in microservices.

## Watch out for

- Needing sagas between services is treated in the microservices deck as a
  **design smell**: *"if you find yourself needing transactions between services,
  it might be a sign that they are too small."* The first question is granularity,
  not coordination. See [[microservices-granularity]].

## Prerequisites

[[eventual-consistency-and-base]]
