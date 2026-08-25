---
subject: Software Architecture
unit: Quality Attributes and Classic Patterns
skill_name: Master-Slave Pattern
score: 0
prerequisites:
- Architectural Pattern
source:
- CH01_2_13illity_10Style 1.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH01
---

# Master-Slave Pattern

## Summary

> This pattern consists of two parties: **master and slaves**. The **master
> component distributes the work among identical slave components**, and
> **computes a final result from the results which the slaves return**.

**Usage:**

- **Database replication** — the master database is regarded as **the
  authoritative source**, and the slave databases are **synchronized to it**
- **Peripherals connected to a bus** in a computer system (master and slave
  drives)

## Key points

- The slaves are **identical** — this is the property that distinguishes the
  pattern from client/server or broker, where components differ by role or
  service.
- Two responsibilities in the master: **distribute the work** and **compute the
  final result**. It is a scatter-gather, not just a dispatcher.
- In the database usage, the master is **the authoritative source** — which makes
  it the same idea as the "source of truth" strategy for
  [[data-isolation-in-microservices]].

## Watch out for

- The master is a **single point of failure** by construction. Nothing in the
  pattern provides for its loss.
- The terminology is dated and increasingly replaced in industry with
  primary/replica or leader/follower — but the course and the exam use
  master/slave.

## Prerequisites

[[architectural-pattern]]
