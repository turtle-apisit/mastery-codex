---
subject: Software Architecture
skill_name: Event-Driven Architecture Style
score: 0
prerequisites:
- Monolithic and Distributed Architectures
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

# Event-Driven Architecture Style

## Summary

> The event-driven architecture style is a **popular distributed asynchronous
> architecture style** used to produce **highly scalable and high-performance
> applications**.

> Event-driven architecture is made up of **decoupled event processing components
> that asynchronously receive and process events**.

**Request-based vs event-based.**

> Most applications follow a **request-based model**. Requests made to the system
> to perform some action are sent to a **request orchestrator** — typically a user
> interface, but it can also be an API layer or enterprise service bus. The role
> of the request orchestrator is to **deterministically and synchronously direct
> the request** to various **request processors**, which handle the request by
> retrieving or updating information in a database.

> **An event-based model, on the other hand, reacts to a particular situation and
> takes action based on that event.**

**The online auction example.**

> Submitting a bid for an item in an online auction **is not a request made to the
> system, but rather an event that happens after the current asking price is
> announced**. The system must **respond to this event** by comparing the bid to
> others received at the same time to determine who is the current highest
> bidder.

**Key characteristics** (Class 2): **decoupled in space and time** — producers
don't wait for consumers — with **high elasticity, responsiveness, and horizontal
scalability**.

```
[ Event Producer ] --(Publishes Event)--> [ Event Channel ] --> [ Event Consumer(s) ]
```

**Two primary topologies:**

- The **[[mediator-topology]]** is used when you require **control over the
  workflow** of an event process
- The **[[broker-topology]]** is used when you require a **high degree of
  responsiveness and dynamic control** over the processing of an event

**Broadcast capabilities.** A unique characteristic: the ability to **broadcast
events without knowledge of who (if anyone) is receiving the message and what
they do with it**. When a producer publishes a message, **the same message is
received by multiple subscribers**. Broadcast is **essential to patterns for
eventual consistency, complex event processing (CEP)**, and many other
situations.

**Request-reply.** Two mechanisms are shown: request-reply message processing
using a **correlation ID**, and using a **temporary queue**.

## Key points

- The distinction is not "asynchronous vs synchronous" but **who initiates and
  who decides**: a request is directed *at* a processor deterministically; an
  event is announced and whoever cares reacts.
- Rating in the matrix: **Scalability Extremely High, Performance High,
  Deployability High, Testability Low-Medium**, primary risk **Eventual
  Inconsistency**.

## Watch out for

- **Master's Insight:** the trade-offs are **non-deterministic execution order**,
  **eventual consistency challenges**, and **severe debugging complexity**.

## Prerequisites

[[monolithic-and-distributed-architectures]]
