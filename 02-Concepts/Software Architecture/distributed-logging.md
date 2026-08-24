---
subject: Software Architecture
skill_name: Distributed Logging
score: 0
prerequisites:
- Fallacies of Distributed Computing
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

# Distributed Logging

## Summary

> **Performing root-cause analysis to determine why a particular order was
> dropped is very difficult and time-consuming in a distributed architecture**,
> due to the distribution of application and system logs.

> Distributed architectures contain **dozens to hundreds of different logs, all
> located in a different place and all with a different format**, making it
> difficult to track down a problem.

**Tooling.** Logging consolidation tools such as **Splunk** help to consolidate
information from various sources and systems into one consolidated log and
console — **but these tools only scratch the surface** of the complexities
involved with distributed logging.

## Key points

- Three separate problems in one: logs are **many**, in **different places**, and
  in **different formats**. A tool can fix location; it cannot fix format
  differences or the absence of a shared correlation identifier.
- The honest framing in the slides — consolidation tools "only scratch the
  surface" — is the exam-worthy part. Buying Splunk is not the answer.

## Watch out for

- This is a cost you take on the moment you cross into distributed
  architectures, and it does not appear in any quality-attribute rating table.

## Prerequisites

[[fallacies-of-distributed-computing]]
