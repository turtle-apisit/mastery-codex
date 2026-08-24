---
subject: Software Architecture
skill_name: Asynchronous Communication
score: 0
prerequisites:
- Event-Driven Architecture Style
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

# Asynchronous Communication

## Summary

> The event-driven architecture style offers a **unique characteristic over other
> architecture styles** in that it **relies solely on asynchronous
> communication** — for both **fire-and-forget** processing (no response
> required) **and request/reply** processing (response required from the event
> consumer).

> Asynchronous communication can be a powerful technique for **increasing the
> overall responsiveness of a system**.

**Responsiveness vs performance.** The synchronous/asynchronous comparison is
called out explicitly as *"a good example of the difference between
**responsiveness** and **performance**"* — asynchronous communication does not
make the total work finish sooner; it makes the **caller free sooner**.

**Error handling — the workflow event pattern.**

> The **workflow event pattern of reactive architecture** is one way of addressing
> the issues associated with error handling in an asynchronous workflow. It is a
> **reactive architecture pattern that addresses both resiliency and
> responsiveness** — the system can be **resilient in terms of error handling
> without an impact to responsiveness**.

**Preventing data loss.**

> **Data loss is always a primary concern** when dealing with asynchronous
> communications — by data loss we mean **a message getting dropped or never
> making it to its final destination**. Fortunately there are **basic
> out-of-the-box techniques** that can be leveraged to prevent it.

## Key points

- **Responsiveness ≠ performance** is the single most exam-worthy idea here.
  Performance is how fast the work completes; responsiveness is how fast the
  system acknowledges you.
- EDA is the only style in the course that relies **solely** on asynchronous
  communication — and it covers **both** fire-and-forget and request/reply, so
  "asynchronous" does not mean "no response".

## Watch out for

- The workflow event pattern exists because asynchronous error handling is
  genuinely hard — it is the answer to the broker topology's *"the business
  process gets stuck"* problem.

## Prerequisites

[[event-driven-architecture-style]]
