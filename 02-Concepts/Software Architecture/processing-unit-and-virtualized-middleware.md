---
subject: Software Architecture
unit: Architecture Styles
skill_name: Processing Unit and Virtualized Middleware
score: 0
prerequisites:
- Space-Based Architecture Style
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

# Processing Unit and Virtualized Middleware

## Summary

**Processing Unit.**

- Contains the **application logic** (or portions of it)
- **Single or multiple** processing units depending on the size and complexity of
  the application
- **Can also contain small, single-purpose services** (as with microservices)
- In addition to application logic, it contains an **in-memory data grid and
  replication engine**

**Virtualized Middleware.**

> The virtualized middleware **handles the infrastructure concerns** within the
> architecture that **control various aspects of data synchronization and request
> handling**.

**Its four components:**

**1. Messaging Grid** — **manages input request and session state**. When a
request comes into the virtualized middleware, the messaging grid **determines
which active processing components are available** to receive the request and
**forwards the request to one of those processing units**.

**2. Data Grid** — **perhaps the most important and crucial component in this
architecture style**.

> In most modern implementations the data grid is implemented **solely within the
> processing units as a replicated cache**. However, for replicated caching
> implementations that require an external controller, or when using a
> **distributed cache**, this functionality resides **both in the processing units
> and in the data grid component within the virtualized middleware**.

> Since the messaging grid can forward a request to **any** of the processing
> units, **it is essential that each processing unit contains exactly the same
> data in its in-memory data grid.**

Replication is **asynchronous and very quickly**, usually completing **in less
than 100 milliseconds** — even though diagrams often show it as synchronous. The
**Hazelcast** member lists in the slides illustrate cluster membership changing
as instances join and leave (`Members {size:1, ver:1}` → `{size:2, ver:2}` →
`{size:3, ver:3}` → `{size:2, ver:4}`).

**3. Processing Grid** — an **optional** component that **manages orchestrated
request processing when there are multiple processing units involved in a single
business request**.

**4. Deployment Manager** —

> Manages the **dynamic startup and shutdown of processing unit instances based
> on load conditions**. It **continually monitors response times and user loads**,
> **starts up new processing units when load increases**, and **shuts them down
> when load decreases**. It is **a critical component to achieving variable
> scalability (elasticity)**.

## Key points

- Memorise the four middleware components and the one word that defines each:
  **messaging = routing**, **data = synchronisation**, **processing =
  orchestration (optional)**, **deployment manager = elasticity**.
- The **"exactly the same data in every processing unit"** requirement follows
  logically from the messaging grid being free to pick any unit. That causal link
  is the exam answer.

## Watch out for

- **Only the processing grid is optional.** The other three are required.

## Prerequisites

[[space-based-architecture-style]]
