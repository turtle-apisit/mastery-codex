---
subject: Modern Software Engineering Principles
skill_name: Defect Reports
score: 0
prerequisites:
- Types of Maintenance
source:
- 2026-SEA601-05-Implementation_Testing_and_Maintenance.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 5
---

# Defect Reports

## Summary

Recall a **defect** is a generic term for a fault, failure, or error.

**What is the cause?**

- **Nothing may be wrong**
- **The user manual may be wrong**, not the code
- **Usually, however, there is a fault in the code**

**The mechanism.** If the product appears to function incorrectly, **the user
files a defect report** — and it **must include enough information to enable the
maintenance programmer to recreate the problem**.

> Ideally, every defect should be fixed immediately. In practice, **an immediate
> preliminary investigation is the best we can do.**

**The defect report file.** The maintenance programmer should **first consult**
it. It contains **all reported defects not yet fixed**, and **suggestions for
working around them**.

- **If the defect has been previously reported** — give the information in the
  file to the user.
- **If it is a new defect** — find **the cause**, **a way to fix it**, and **a way
  to work around the problem**. File the new defect with supporting documentation
  (listings, designs, manuals).

The file **also contains the client's requests for perfective and adaptive
maintenance**. Its contents **must be prioritized by the client**, and the next
modification is **the one with the highest priority**.

**Circulation.** Copies of defect reports must be circulated to all sites,
including **an estimate of when the defect can be fixed**, so that if the same
failure occurs elsewhere the user can determine whether a workaround exists and
how long until a fix.

**Ideal world vs real world:** ideally we fix every defect immediately and
distribute the new version to all sites. In reality we distribute defect reports,
we **do not have the staff for instant maintenance**, and **it is cheaper to make
a number of changes at the same time**, particularly with multiple sites.

**Authorizing changes:**

- **Corrective** — assign a maintenance programmer to determine the fault and its
  cause, then repair it; **test the fix**, **test the product as a whole
  (regression testing)**, **update the documentation**, **update the prologue
  comments**.
- **Adaptive and perfective** — as above, except **there is no defect report**;
  there is a **change in requirements** instead.

## Key points

- The client, not the maintenance team, sets priority on the defect report file.
- Regression testing and documentation updates are **part of** the fix, not
  follow-up work.

## Watch out for

- **AI touchpoint — this is the third practice that *breaks*:**
  *"**The prediction was wrong for me**" is a failure report with **no
  reproducible case**. Your defect report template **has no field for it**.*

## Prerequisites

[[types-of-maintenance]]
