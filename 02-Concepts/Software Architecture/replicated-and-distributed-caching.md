---
subject: Software Architecture
skill_name: Replicated and Distributed Caching
score: 0
prerequisites:
- Processing Unit and Virtualized Middleware
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

# Replicated and Distributed Caching

## Summary

> Space-based architecture **relies on caching for the transactional processing**
> of an application. **Removing the need for direct reads and writes to a database
> is how space-based architecture is able to support high scalability, high
> elasticity, and high performance.**

**Replicated caching** — every processing unit holds a full copy in its own
memory.

- **Extremely fast**
- **Supports high levels of fault tolerance**
- *But most product companies are moving away from this model*

**When replicated caching is not possible:** **high data volumes** (the size of
the cache) and **high update rates** to the cache data.

**Distributed caching** — one central copy.

> Distributed caching requires an **external server or service dedicated to
> holding a centralized cache**. In this model the processing units **do not store
> data in internal memory**, but rather use a **proprietary protocol to access the
> data from the central cache server**. Distributed caching **supports high levels
> of data consistency** because the data is **all in one place and does not need
> to be replicated**.

**The trade-off, stated directly:**

> A **distributed** cache will **always offer better data consistency** over a
> replicated cache, because the cache of data is in a single place.
>
> However, **performance and fault tolerance will always be better when using a
> replicated cache**.

**Near-cache** — the hybrid.

> A near-cache is a **caching hybrid model bridging in-memory data grids with a
> distributed cache**. The distributed cache is referred to as the **full backing
> cache**, and each in-memory data grid inside each processing unit is the
> **front cache**.

> While the front caches are **always kept in sync with the full backing cache**,
> the front caches **are not synchronized between other processing units** sharing
> the same data. This means **multiple processing units sharing the same data
> context (such as a customer profile) will likely all have different data in
> their front cache.**

## Key points

- The trade-off is stated in absolute terms — **always** — and is worth quoting
  exactly: **distributed wins on consistency, replicated wins on performance and
  fault tolerance.**
- The reason each wins is the same fact viewed twice: **one copy** means
  consistent but remote and single-point; **many copies** means fast and
  redundant but divergent.

## Watch out for

- The near-cache warning is the sharp edge: it looks like the best of both, but
  **front caches are not synchronised with each other**, so two processing units
  handling the same customer can legitimately hold different data. Recall that
  the messaging grid can route a request to **any** processing unit.

## Prerequisites

[[processing-unit-and-virtualized-middleware]]
