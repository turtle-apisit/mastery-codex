---
subject: Software Architecture
skill_name: Choreography and Orchestration
score: 0
prerequisites:
- Microservices Architecture
- Mediator Topology
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

# Choreography and Orchestration

## Summary

**Choreography (microservices)** — a **decentralized** communication style where
**no central coordinator exists**. Each microservice **acts independently,
listening for events and reacting to them** by calling other services as needed.

> It functions much like **dancers in a ballet**, where everyone knows their part
> and reacts to the music and other dancers **without being explicitly told what
> to do at every moment**.

> Choreography utilizes the **same communication style as a broker event-driven
> architecture** — no central coordinator, **respecting the bounded context
> philosophy**. Architects find it natural to implement **decoupled events between
> services**.

**Mediator topology (EDA)** — a **centralized** communication style centered
around an **event mediator** component that **manages and controls the entire
workflow** for events requiring coordination of multiple event processors.

> It acts like a **conductor in an orchestra**, **explicitly directing each part
> of the system** on when to execute its task.

**Orchestration in microservices.**

> Microservices architectures **don't include a global mediator** like other
> service-oriented architectures. If an architect needs to coordinate across
> several services, they can **create their own localized mediator**.

> **The First Law of Software Architecture suggests that neither of these
> solutions is perfect — each has trade-offs.** In choreography, the architect
> **preserves the highly decoupled philosophy** of the architecture style, thus
> reaping maximum benefits. **However, common problems like error handling and
> coordination become more complex in choreographed environments.**

**Two ways complexity is absorbed:**

1. **The front controller pattern** — a nominally **choreographed service becomes
   a more complex mediator** for some problem. The workflow owner service must
   coordinate across a wide variety of other services, **acting as a mediator in
   addition to its other domain responsibilities**. *The downside is added
   complexity in the service.*
2. **A dedicated mediator** — the architect builds a mediator to handle the
   complexity and coordination required for the business workflow. **While this
   creates coupling between these services**, it allows the architect to **focus
   coordination into a single service, leaving the others less affected.**

> Often, **domain workflows are inherently coupled** — the architect's job entails
> **finding the best way to represent that coupling** in ways that support both
> the domain and architectural goals.

## Key points

- **Ballet = choreography = decentralized. Orchestra conductor = mediator =
  centralized.** The analogies are the fastest way to hold the pair.
- Choreography in microservices is **the same mechanism** as broker topology in
  EDA — the two notes describe one idea in two contexts.
- The last sentence is the mature point: coupling in the workflow is often **a
  property of the domain**, not a design flaw. The architect chooses **where to
  put it**, not whether it exists.

## Watch out for

- The **front controller pattern** is what choreography degrades into when
  workflows get complex — a service quietly becoming a mediator while still
  carrying its own domain responsibilities. Recognising it by name is the useful
  part.

## Prerequisites

[[microservices-architecture]] · [[mediator-topology]]
