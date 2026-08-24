---
subject: Software Architecture
skill_name: Micro-frontends
score: 0
prerequisites:
- Microservices Architecture
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

# Micro-frontends

## Summary

**The monolithic frontend.** In the city of shops, the shops **might all share a
common shopping center or mall**. That is a **monolithic user interface**: a
**single point of access for users**, which **connects to multiple backend
services** to provide the necessary information or functionality.

**The micro-frontend alternative:**

> This approach **utilizes components at the user interface level** to create a
> **synchronous level of granularity and isolation in the user interface as the
> backend services**. **Each service emits the user interface for that service**,
> which the frontend coordinates with the other emitted UI components.

> Using this pattern, teams can **isolate service boundaries from the user
> interface to the backend services, unifying the entire domain within a single
> team.**

**Implementation.** Developers can implement the micro-frontend pattern in a
variety of ways — using a **component-based web framework such as React**, or one
of several **open source frameworks that support this pattern**.

## Key points

- The purpose is **team ownership**, not UI technology: the boundary is extended
  all the way from the database to the screen, so **one team owns one whole
  vertical slice**.
- **The service emits its own UI.** The shell coordinates; it does not implement.
- Compare with **service-based architecture**, where the same idea appears as a
  *user interface variant* — the monolithic UI broken apart into **user interface
  domains matching each domain service**.

## Watch out for

- A monolithic frontend over microservice backends is a legitimate and common
  design. Micro-frontends are the option you take when **UI work is the
  bottleneck** because every change needs the one frontend team.

## Prerequisites

[[microservices-architecture]]
