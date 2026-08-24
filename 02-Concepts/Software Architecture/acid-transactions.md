---
subject: Software Architecture
skill_name: ACID Transactions
score: 0
prerequisites: []
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

# ACID Transactions

## Summary

The four guarantees a relational database (RDBMS) gives a transaction. Standard
commits and rollbacks executed from persistence frameworks leverage them **to
guarantee that data is updated correctly, ensuring high data consistency and
integrity**.

**A — Atomicity**
All operations in a transaction succeed, or **none** of them do. A partially
completed transaction is **rolled back** so the data returns to its prior state.
There is no half-done state.

**C — Consistency**
A transaction takes the database from one **valid state** to another valid state.
All defined rules must hold — **referential integrity** (foreign keys) and
**business rules**.

**I — Isolation**
Concurrent transactions do not interfere with each other. Each transaction
executes as if it were the only one running; intermediate states of one
transaction are not visible to another.

**D — Durability**
Once a transaction has been committed, it **remains committed** — it survives
crashes and power loss.

## Key points

> **Architects and developers take transactions for granted in a monolithic
> architecture world because they are so straightforward and easy to manage. Such
> is not the case with distributed architectures.**

- Losing ACID is the **central** cost of distribution, and the reason
  [[eventual-consistency-and-base]] and the [[saga-pattern]] exist at all.
- In **service-based architecture**, services are coarse-grained and share a
  single database, so **regular ACID transactions are still used** within a single
  domain service. This is one of that style's main selling points.

## Watch out for

- **Consistency** here is *not* the "C" in the CAP theorem. In ACID it means
  **satisfying the database's declared rules**; in CAP it means all nodes seeing
  the same data. Same word, different property.

## Prerequisites

None — this is a root concept for the subject.
