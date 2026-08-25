---
subject: Software Architecture
unit: Architecture Styles
skill_name: Service-Based Architecture Style
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

# Service-Based Architecture Style

## Summary

> Service-based architecture is a **hybrid of the microservices architecture
> style** and is considered **one of the most pragmatic architecture styles**,
> mostly due to its **architectural flexibility**.

**Topology.** A **distributed macro layered structure** consisting of:

- A **separately deployed user interface**
- **Separately deployed remote coarse-grained services**
- A **monolithic database**

**Services** are typically **coarse-grained "portions of an application"** —
usually called **domain services** — that are **independent and separately
deployed**. They are deployed in the same manner as any monolithic application
(EAR file, WAR file, assembly) and **do not require containerization**, although
you could use Docker.

**How many services?** Because they typically **share a single monolithic
database**, the number of services in an application context generally ranges
between **4 and 12**, with **the average being about 7**.

**Instances.** In most cases there is **only a single instance** of each domain
service. Based on scalability, fault tolerance, and throughput needs, multiple
instances can exist — which then require **load balancing between the user
interface and the domain service** so the UI is directed to a healthy, available
instance.

**Topology variants:**

- **User interface variants** — the single monolithic UI can be **broken apart
  into user interface domains**, even to a level matching each domain service
- **Database variants** — the single monolithic database can be broken into
  separate databases, **even as far as domain-scoped databases matching each
  domain service** (similar to microservices). **In these cases it is important
  to make sure the data in each separate database is not needed by another domain
  service.**
- **An API layer** can be added between the user interface and domain services

**Service design and granularity.** Because domain services are coarse-grained,
each is typically designed using a **layered architecture style** consisting of
an **API facade layer, a business layer, and a persistence layer**. Another
popular approach is to **domain partition** each service using sub-domains,
similar to the **modular monolith**.

**Transactions.** Because domain services are coarse-grained, **regular ACID
transactions with commits and rollbacks are used** to ensure database integrity
within a single domain service. Highly distributed architectures like
microservices, with fine-grained services, use **BASE transactions** instead and
**hence do not support the same level of database integrity**.

**When to use it:**

- **One of the most pragmatic architecture styles available**
- **A natural fit when doing domain-driven design** — because services are
  coarse-grained and domain-scoped, each domain fits nicely into a separately
  deployed domain service
- Each service **compartmentalizes** a particular domain into a single unit of
  software, **making it easier to apply changes to that domain**
- **In most cases the transaction is scoped to a particular domain service**,
  allowing traditional commit and rollback functionality
- **A good choice for achieving a good level of architectural modularity without
  having to get tangled up in the complexities and pitfalls of granularity**

> As services become **more fine-grained**, issues surrounding **orchestration and
> choreography** start to appear. **Both are required when multiple services must
> be coordinated to complete a certain business transaction.**

## Key points

- **The comparison table** — Monolithic vs Service-Based vs Microservices — is the
  centrepiece:

| Aspect | Monolithic | Service-Based (SBA) | Microservices |
|---|---|---|---|
| System structure | Single application, all functionality | Coarse-grained services (**4–12**) sharing a single database | Fine-grained services, **each with its own database** |
| Deployment | Entire system at once as one file (WAR/EAR) | Each service separately, but each **packaged like a monolithic app** | Each microservice independently, often **containers/cloud** |
| Development | One team manages the entire codebase | Teams split by **service domain** but **still share the database** | Teams split by microservice, **separate code and databases** |
| Complexity | Low initially, **grows significantly with scale** | **Medium** — less complex than microservices | **High** — many services, complex inter-service communication |
| Database | Single database | **Single shared database** | **Separate database per microservice** |
| Communication | **In-process calls** within the same application | **Remote calls (API or RPC)** between UI and services | Remote calls (API, messaging, event-driven) between microservices |
| Scalability | Must scale the entire system together (**scale up**) | Can scale **specific services** independently (**scale out**) | Can scale **individual** microservices with maximum flexibility |
| Flexibility | **Low** — any change requires redeploying the whole system | **Medium** — can update individual services without affecting the rest | **High** — can update any microservice independently |
| Fault tolerance | Failure in one module can impact the whole system | Failure in one service may not stop others, **but the shared DB is a single point of failure** | Failure **isolated** to the affected microservice |
| Maintenance cost | Low at the start, **high as the system grows** | **Medium** — easier to manage than microservices | **High** — requires service discovery, monitoring, orchestration tools |
| Best for | Small to medium internal systems | **Medium to large business systems needing team separation** | Very large, globally distributed systems |

- SBA's defining compromise: **distributed deployment with a shared database**.
  That single choice buys back ACID and costs you the shared-DB single point of
  failure.

## Watch out for

- The shared database is **both** the reason SBA is pragmatic (ACID, no
  distributed transactions) **and** its main weakness (single point of failure,
  schema changes ripple). See
  [[database-partitioning-in-service-based-architecture]].

## Prerequisites

[[monolithic-and-distributed-architectures]]
