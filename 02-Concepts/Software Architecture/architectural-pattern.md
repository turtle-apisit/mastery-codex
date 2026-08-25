---
subject: Software Architecture
unit: Quality Attributes and Classic Patterns
skill_name: Architectural Pattern
score: 0
prerequisites: []
source:
- CH01_2_13illity_10Style 1.pdf
- class02_slides.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH01 and Class 2
---

# Architectural Pattern

## Summary

> An architectural pattern is a **general, reusable solution to a commonly
> occurring problem in software architecture within a given context**.
> Architectural patterns are similar to software design patterns **but have a
> broader scope**.

Architectural patterns define the **high-level layout, responsibility
boundaries, and interaction modes** of software components.

> **Selecting a pattern is not about following trends; it is about satisfying
> Architecture Drivers.**
> **Every pattern excels at certain Quality Attributes while sacrificing
> others.**

**The ten common patterns** catalogued in CH01:

1. Layered
2. Client-server
3. Master-slave
4. Pipe-filter
5. Broker
6. Peer-to-peer
7. Event-bus
8. Model-view-controller
9. Blackboard
10. Interpreter

## Key points

- **Architectural pattern vs design pattern**: same idea, **broader scope**. A
  design pattern shapes classes; an architectural pattern shapes the system.
- The governing quotation for the whole subject:
  > *"There is no best architecture — only the least worst set of trade-offs for
  > a given context."* — **Neal Ford & Mark Richards**

## Watch out for

- Choosing a pattern because it is current is the failure mode the slides name
  explicitly. The chain is **architecture drivers → quality attributes → pattern**,
  and it must be run in that direction.

## Prerequisites

None — this is a root concept for the subject.
