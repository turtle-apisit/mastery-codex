---
subject: Software Architecture
skill_name: Mediator Topology
score: 0
prerequisites:
- Broker Topology
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

# Mediator Topology

## Summary

> The mediator topology **addresses some of the shortcomings of the broker
> topology**. Central to it is an **event mediator**, which **manages and controls
> the workflow** for initiating events that require the coordination of multiple
> event processors.

**Five architecture components:**

1. An **initiating event**
2. An **event queue**
3. An **event mediator**
4. **Event channels**
5. **Event processors**

**Delegating to the appropriate type of mediator.** The event mediator can be
implemented in a variety of ways depending on the **nature and complexity** of the
events it processes.

> The **Simple Event Mediator** generates and sends a processing event when the
> workflow is simple. However, when the initiating event coming into the Simple
> Event Mediator is classified as either **hard or complex**, it **forwards the
> original initiating event to the corresponding mediators (BPEL or BPM)**. The
> Simple Event Mediator, having intercepted the original event, **may still be
> responsible for knowing when that event is complete**, or it **simply delegates
> the entire workflow (including client notification) to the other mediators**.

**Performance.**

> Although performance and scalability are **still good** within the mediator
> topology, they are **not as high as with the broker topology**.

## Key points

- Component count is a clean exam discriminator: **broker has 4**, **mediator has
  5** — the extra one being the **event queue** feeding the mediator.
- The three mediator tiers — **Simple → BPEL → BPM** — escalate by workflow
  complexity.
- Mediator = **orchestration** (centralized); broker = **choreography**
  (decentralized). See [[choreography-and-orchestration]].

## Watch out for

- The mediator buys **workflow visibility and error coordination** at the price of
  **medium coupling** (services must know the mediator) and **lower peak
  performance**. Neither topology is better; they answer different questions.

## Prerequisites

[[broker-topology]]
