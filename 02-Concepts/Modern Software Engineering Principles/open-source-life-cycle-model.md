---
subject: Modern Software Engineering Principles
skill_name: Open-Source Life-Cycle Model
score: 0
prerequisites:
- Types of Maintenance
source:
- 2026-SEA601-03-Iterative and Incremental Development.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 3
---

# Open-Source Life-Cycle Model

## Summary

**Two informal phases:**

1. **One individual builds an initial version**, made available via the Internet.
2. **If there is sufficient interest**: the initial version is widely downloaded,
   **users become co-developers**, and the product is extended.

**The key structural claim:** the second informal phase consists **solely of
postdelivery maintenance** — reporting and correcting defects (corrective),
adding functionality (perfective), porting to a new environment (adaptive). So
the open-source model **is** a postdelivery maintenance life-cycle model.

**Closed-source vs open-source:**

| | Closed-source | Open-source |
|---|---|---|
| Maintained by | Employees | Generally **unpaid volunteers** |
| Users can submit | **Failure reports only** (source code not available) | **Both failure and fault reports**, strongly encouraged |
| Release cadence | Roughly **once a year**, after careful SQA testing | **As soon as it is ready** — a month or even a day later |
| Testing | By the SQA group | Core group does **minimal** testing; extensive testing done by the peripheral group while using it |

**Two groups of people:**

- **Core group** — a small number of dedicated maintainers with the inclination,
  time, and skills to **submit fault reports ("fixes")**. They take
  responsibility for managing the project and **have the authority to install
  fixes**.
- **Peripheral group** — users who choose to submit defect reports from time to
  time.

The slogan: **"Release early and often."**

## Key points

- The failure/fault report distinction is doing real work here. A **failure
  report** says "it broke"; a **fault report** says "here is the flaw, and here is
  the fix". Only open-source users can produce the second, because only they can
  read the source.

## Watch out for

- There is no development phase in the conventional sense after the initial
  version. Everything after phase 1 is maintenance by the modern definition.

## Prerequisites

[[types-of-maintenance]]
