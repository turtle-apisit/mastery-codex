---
subject: Software Architecture
skill_name: Space-Based Architecture Style
score: 0
prerequisites:
- Monolithic and Distributed Architectures
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

# Space-Based Architecture Style

## Summary

> Space-based architecture gets its name from the concept of **tuple space** — the
> technique of using **multiple parallel processors communicating through shared
> memory**.

**The problem it solves.** Most MVC web applications follow the same request
flow: browser → web server → application server → database server. This is fine
for a small set of users, but **bottlenecks start appearing as user load
increases** — first at the web-server layer, then the application-server layer,
and finally the database-server layer. The usual solution is to **scale out the
web server**, which is fine — **but what if the bottleneck happens at the
application server or DB server?**

**The answer:**

> **High scalability, high elasticity, and high performance are achieved by
> removing the central database as a synchronous constraint** in the system, and
> instead leveraging **replicated in-memory data grids**.

> Application data is kept **in-memory and replicated among all the active
> processing units**. When a processing unit updates data, it **asynchronously
> sends that data to the database**, usually via messaging with persistent
> queues. Processing units **start up and shut down dynamically** as user load
> increases and decreases, thereby addressing **variable scalability**. **Because
> there is no central database involved in the standard transactional processing
> of the application, the database bottleneck is removed.**

**General topology:** Processing Unit · Virtualized middleware · Data pumps ·
Data readers · Data writers.

**Real-world applications:** **concert ticket flash sales**, **high-frequency
trading platforms**.

**Cloud vs on-premises.** A powerful feature is deploying **processing units and
virtualized middleware in managed cloud environments while keeping the physical
databases and data on-prem**. The **asynchronous data pumps and eventual
consistency model** make this cloud-based data synchronization very effective:
transactional processing occurs on **dynamic and elastic cloud environments**
while **physical data management, reporting, and analytics stay in secure local
on-prem environments**.

## Key points

- The central move is **removing the database from the request path**. Everything
  else in the style — data pumps, writers, readers, caching strategy — exists to
  make that safe.
- Rating in the matrix: **Scalability Extremely High, Performance High,
  Deployability Medium, Testability Low**, primary risk **Data Collisions & Sync
  Failures**.

## Watch out for

- **Master's Insight:** offers **extreme elasticity and sub-millisecond response
  times**, but requires **complex asynchronous database synchronization and
  collision management**.
- **Data collisions:** most systems do not have consistent update rates over long
  periods, so when calculating collision rates it helps to **understand the
  maximum update rate during peak usage** and calculate **minimum, normal, and
  peak collision rates**.

## Prerequisites

[[monolithic-and-distributed-architectures]]
