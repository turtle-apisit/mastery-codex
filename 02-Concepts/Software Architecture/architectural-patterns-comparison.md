---
subject: Software Architecture
skill_name: Architectural Patterns Comparison
score: 0
prerequisites:
- Layered Architecture Style
- Pipeline Architecture Style
- Event-Driven Architecture Style
- Space-Based Architecture Style
source:
- class02_slides.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 Class 2
---

# Architectural Patterns Comparison

## Summary

The trade-off matrix, rated against quality attributes:

| Pattern | Scalability | Performance | Deployability | Testability | Primary Risk / Anti-Pattern |
|---|---|---|---|---|---|
| **Monolithic** | Low | **High** | Low | **High** | **Big Ball of Mud** |
| **Layered** | Low | Low-Medium | Low | Medium | **Architecture Sinkhole** |
| **Pipeline** | Medium | Medium | Medium | **High** | **Complex Error Recovery** |
| **Event-Driven** | **Extremely High** | High | **High** | Low-Medium | **Eventual Inconsistency** |
| **Space-Based** | **Extremely High** | High | Medium | **Low** | **Data Collisions & Sync Failures** |

## Key points

- **Monolithic scores High on performance and testability** — better than most
  distributed styles on both. In-process calls are fast, and a single deployment
  unit is easy to test end-to-end. This is the row that surprises people.
- Scalability and testability move in **opposite** directions across the table.
  The two extremely-scalable styles are the two least testable.
- Every row has a **named anti-pattern**, which is the practical way to memorise
  the table: each style has a characteristic way of going wrong.

## Watch out for

**Activity 1 — the FinTech "FastPay" scenario** is the exam-shaped application of
this table. Three subsystems, each wanting a different pattern:

1. **Trading Core** — high-frequency stock order matching. **Millions of
   transactions/sec, sub-millisecond latency, zero downtime.**
2. **User Profile & Admin Backoffice** — user onboarding, KYC document
   verification, administrative reporting. **Standard traffic.**
3. **Fraud Detection Engine** — real-time stream analysis passing transactions
   through **multiple sequential AI/rule evaluation models**.

The task: **select the optimal pattern for each subsystem**, **write a rigorous
architectural justification linking drivers to quality attributes**, and
**identify top failure risks and mitigation strategies**.

The shape of the answer follows the words in the scenario: *sub-millisecond +
zero downtime* → Space-Based; *standard traffic, ordinary CRUD* → Layered or
Monolithic; *multiple sequential stages* → Pipeline. **The key takeaway is that
one system uses several patterns — match patterns to specific subdomain
drivers.**

## Prerequisites

[[layered-architecture-style]] · [[pipeline-architecture-style]] · [[event-driven-architecture-style]] · [[space-based-architecture-style]]
