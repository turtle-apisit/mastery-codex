---
subject: Software Architecture
skill_name: Monolithic and Distributed Architectures
score: 0
prerequisites:
- Three-Tier Architecture
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

# Monolithic and Distributed Architectures

## Summary

The top-level split of architecture styles:

| **MONOLITHIC** | **DISTRIBUTED** |
|---|---|
| Layered architecture | Service-based architecture |
| Pipeline architecture | Event-driven architecture |
| Microkernel architecture | Space-based architecture |
| | Service-oriented architecture |
| | Microservices architecture |

**Monolithic architecture** (Class 2): all software modules are **compiled,
packaged, and deployed as a Single Deployment Unit** (a single `.war` file,
executable binary). Key characteristics: **technical simplicity in early
stages**, **shared in-memory state and synchronous function calls**.

> **Master's Insight: Monolith is NOT inherently an Anti-pattern!**
> Ideal for **early-stage startups and domains with fluid, rapidly changing
> boundaries**.
> Weaknesses: **deployability bottlenecks, blast radius of failures, and lack of
> independent elasticity**.

## Key points

- Memorise the two lists — three monolithic styles, five distributed ones. Which
  column a style sits in decides whether the fallacies of distributed computing
  apply to it.
- The defining test is the **deployment unit**, not the code layout. Layered,
  pipeline and microkernel all ship as one thing.
- The single biggest cost of crossing into the right-hand column: **ACID
  transactions stop being available**, and you inherit distributed logging,
  contract versioning, and eventual consistency.

## Watch out for

- The monolith is a **legitimate choice**, especially when domain boundaries are
  still moving — which is precisely when microservices are hardest to draw. This
  is a favourite exam trap.

## Prerequisites

[[three-tier-architecture]]
