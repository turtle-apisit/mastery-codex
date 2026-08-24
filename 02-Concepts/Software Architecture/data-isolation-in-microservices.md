---
subject: Software Architecture
skill_name: Data Isolation in Microservices
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

# Data Isolation in Microservices

## Summary

Back to the city of shops: **each shop might have its own inventory and
accounting system, separate from the other shops.**

> **Each microservice should have its own data storage, rather than sharing a
> single database.** This helps to keep them independent and **avoids problems
> that can arise from having multiple systems relying on the same data**.

**The consequence you must then handle:**

> You need to decide **how to keep the data consistent across different
> microservices**. You might choose to have **one service as the "source of
> truth"** for certain information, or you could use techniques like
> **replication or caching** to distribute data.

**The compensating benefit:**

> While data isolation can be challenging, it also gives you more flexibility.
> **Each microservice can choose the best data storage solution for its specific
> needs**, without having to compromise on the requirements of other services.

## Key points

- **Database-per-service is the single clearest line between microservices and
  service-based architecture.** SBA shares one monolithic database; microservices
  do not.
- The three named consistency strategies: **source of truth**, **replication**,
  **caching**.
- Polyglot persistence — each service picking its own store — is a **consequence**
  of isolation, not an independent goal.

## Watch out for

- Losing the shared database means **losing ACID across services**. That is what
  forces [[eventual-consistency-and-base]] and the [[saga-pattern]] into the
  picture, and it is the direct price of this decision.

## Prerequisites

[[microservices-architecture]]
