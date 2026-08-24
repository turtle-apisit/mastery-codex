---
subject: Software Architecture
skill_name: Contract Maintenance and Versioning
score: 0
prerequisites:
- Monolithic and Distributed Architectures
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03
---

# Contract Maintenance and Versioning

## Summary

> Another particularly difficult challenge within distributed architecture is
> **contract creation, maintenance, and versioning**.

> **A contract is behavior and data that is agreed upon by both the client and
> the service.**

Why it is hard:

- **Decoupled services and systems owned by different teams and departments** —
  nobody can change both sides at once
- **Even more complex are the communication models needed for version
  deprecation** — telling everyone a version is going away, and knowing when it
  is safe to remove it

## Key points

- The definition has **two halves**: a contract is **behavior *and* data**. A
  schema alone is not a contract — the expected behaviour is part of the
  agreement.
- The root difficulty is **organisational**, not technical: the difficulty comes
  from **different teams owning the two sides**.

## Watch out for

- The microkernel style has the same idea at a smaller scale: contracts between
  **plug-in components and the core system** are usually standard across a domain,
  and when a third party controls the plug-in's contract you **create an adapter**
  so the core system does not need specialized code per plug-in. See
  [[plug-in-components-and-registry]].
- Contract-first tooling (OpenAPI, gRPC, GraphQL) is the modern response to this
  problem — see [[contract-first-development]].

## Prerequisites

[[monolithic-and-distributed-architectures]]
