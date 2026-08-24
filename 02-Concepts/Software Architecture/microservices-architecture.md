---
subject: Software Architecture
skill_name: Microservices Architecture
score: 0
prerequisites:
- Service-Based Architecture Style
source:
- CH03_2_SEA604Microservices.pptx
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from the SEA604 Microservices deck (text extracted from pptx; diagrams
    not captured)
---

# Microservices Architecture

## Summary

**A deliberately named style.** Unlike many architecture styles that are **named
retroactively**, microservices were **defined and popularized early in their
adoption** — notably through a **2014 blog post by Martin Fowler and James
Lewis**.

**Distributed by definition:**

> Microservices form a **distributed architecture: each service runs in its own
> process** — which originally implied a physical computer but quickly evolved to
> **virtual machines and containers**. **Decoupling** the services to this degree
> allows for a simple solution to a common problem in architectures that heavily
> feature **multitenant infrastructure** for hosting applications.

> **Separating each service into its own process solves all the problems brought
> on by sharing.** Before the evolutionary development of freely available open
> source operating systems, combined with **automated machine provisioning**, it
> was impractical for each domain to have its own infrastructure. Now, with
> **cloud resources and container technology, teams can reap the benefits of
> extreme decoupling** — both at the domain and operational level.

**Architecture style rating.** Microservices are designed to be **highly
scalable, flexible, and easy to change**. They **rely on automation and modern
engineering practices** to achieve these goals. **While they can be challenging
to build and maintain, the benefits often outweigh the costs.**

- **Automation** — heavily relied on for deployment, testing, and operations
- **Scalability** — easily scaled up or down, ideal for large workloads
- **Flexibility** — the decoupled nature allows easy changes to individual
  components without affecting the entire system
- **Reliability** — while distributed systems can be complex and prone to
  failures, microservices can be designed to be **highly fault-tolerant** through
  **redundancy and service discovery**
- **Evolutionary change** — supports **gradual changes to the architecture over
  time**, letting businesses adapt without major disruptions

## Key points

- The **process boundary** is the defining property — not size, not the word
  "micro". One service, one process, its own data.
- The enabling technologies are named and matter: **open source operating
  systems, automated machine provisioning, cloud resources, containers.** The
  style was impractical before them.
- Microservices sit at the far end of the monolith → service-based →
  microservices progression. See
  [[service-based-architecture-style]] for the full comparison table.

## Watch out for

- The dependence on **automation** is not optional. Without deployment, testing
  and operational automation, the number of moving parts becomes unmanageable —
  which is why the style is rated **High** on complexity and maintenance cost.

## Prerequisites

[[service-based-architecture-style]]
