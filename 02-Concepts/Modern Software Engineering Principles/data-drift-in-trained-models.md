---
subject: Modern Software Engineering Principles
skill_name: Data Drift in Trained Models
score: 0
prerequisites:
- Software Deterioration
source:
- 2026-SEA601-01-Introduction to Software Development.pdf
- 2026-SEA601-05-Implementation_Testing_and_Maintenance.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 1 and Class 5
---

# Data Drift in Trained Models

## Summary

**A trained model is also an artifact** — it is human-made, it is complex, and it
is intangible. **But it deteriorates differently.**

**Data drift:**

> A model's failure rate rises **even when nobody touches it**, because the world
> it was trained on moves away from the world it now sees.

This is the one place where the deterioration curve from Class 1 rises with **no
change events marked on it**.

## Key points

- In maintenance vocabulary, **drift is adaptive maintenance triggered by nobody
  doing anything**. Ordinary adaptive maintenance responds to a change in the
  environment that someone made; drift responds to the environment changing on
  its own.
- The consequence for process: **the system has to know when it has stopped
  working**. No user will file a defect report saying *"your model degraded by
  four percent over six months."*
- The replacement practice is therefore **monitor, and expect decay** — instead of
  "ship it and fix bugs".

## Watch out for

- Drift is not a fault in the code. Nothing in the source changed. The
  conventional defect-report → find fault → fix loop has no entry point here,
  which is why monitoring has to be designed in rather than added on.

## Prerequisites

[[software-deterioration]]
