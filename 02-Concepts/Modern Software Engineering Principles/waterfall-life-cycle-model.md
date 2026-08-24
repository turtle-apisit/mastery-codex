---
subject: Modern Software Engineering Principles
skill_name: Waterfall Life-Cycle Model
score: 0
prerequisites:
- Software Life-Cycle
source:
- 2026-SEA601-02-Waterfall Life-Cycle Model.pdf
- 2026-SEA601-03-Iterative and Incremental Development.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 2 and Class 3
---

# Waterfall Life-Cycle Model

## Summary

The **classical model (1970)**, and the response to the **software crisis**.

Phases run left to right in time, each with its own owner:

```
Requirements -> Analysis -> Design -> Implementation -> Postdelivery Maintenance
  (Business    (System    (Architect)  (Programmer)      (Maintainer)
   analyst)     analyst)
```

**Characterized by:**

- **Feedback loops** — you may return to an earlier phase
- **Documentation-driven**

**Advantages:**

- **Systematic**
- **Documentation**
- **Maintenance is easier**

## Key points

- The feedback loops are what make it "(Iterative) Waterfall" in the Class 3
  slides — waterfall is not strictly one-directional in its real form.
- **Is waterfall incremental?** No — there is one delivery at the end.
  **Is waterfall iterative?** Only through the feedback loops, not by producing
  successive working versions.
- The **relay runner** analogy: each phase hands off to the next. The question to
  hold onto is *what is passed?* — a **document**.

## Watch out for

- Waterfall is documentation-driven **by design**, not by accident. Its strengths
  and its weaknesses both come from that single choice. See
  [[problems-with-the-waterfall-model]].

## Prerequisites

[[software-life-cycle]]
