---
subject: Software Architecture
skill_name: Database Partitioning in Service-Based Architecture
score: 0
prerequisites:
- Service-Based Architecture Style
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

# Database Partitioning in Service-Based Architecture

## Summary

**The problem.**

> Services within a service-based architecture usually share a **single monolithic
> database** due to the small number of services (4 to 12). **This database
> coupling can present an issue with respect to database table schema changes. If
> not done properly, a table schema change can potentially impact every service**,
> making database changes **a very costly task in terms of effort and
> coordination**.

**How the coupling is expressed in code.**

> Within a service-based architecture, the shared class files representing the
> database table schemas — usually referred to as **entity objects** — reside in a
> **custom shared library** used by all the domain services (such as a JAR file
> or DLL).

> **Shared library versioning can help address this issue, but nevertheless, with
> a single shared library it is difficult to know which services are actually
> impacted by the table change without manual, detailed analysis.**

**The mitigation.**

> One way to mitigate the impact and risk of database changes is to **logically
> partition the database** and manifest the logical partitioning through
> **federated shared libraries**.

Common tables shared by all services live in a **common domain** with a
corresponding `common_entities_lib` shared library. Changes to those tables
**require coordination of all services** accessing the database. One way to
mitigate this:

> **Lock the common entity objects in the version control system and restrict
> change access to only the database team.** This helps control change and
> emphasizes the significance of changes to the common tables used by all
> services.

**The electronics recycling example.** Two separate **physical** databases: one
for **external customer-facing operations**, one for **internal operations**. This
allows internal data and operations to reside in a **separate network zone** from
external operations, providing **much better security access restrictions and
data protection**. **One-way access through the firewall** allows internal
services to access and update customer-facing information, **but not vice versa**.

## Key points

- The chain to remember: **shared database → shared entity-object library →
  schema change ripples everywhere → you cannot even tell who is affected without
  manual analysis.**
- The fix is **logical** partitioning surfaced through **federated** shared
  libraries — one library per logical partition instead of one for everything.
- Locking common entities in version control is a **process** control, not a
  technical one, and it is deliberate: it makes the cost of changing shared
  tables visible.

## Watch out for

- The recycling example's **one-way firewall** is a security pattern worth
  quoting: internal → external is allowed, external → internal is not.

## Prerequisites

[[service-based-architecture-style]]
