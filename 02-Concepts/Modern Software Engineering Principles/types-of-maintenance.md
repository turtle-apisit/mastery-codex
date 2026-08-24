---
subject: Modern Software Engineering Principles
skill_name: Types of Maintenance
score: 0
prerequisites:
- Classical Waterfall Phases
source:
- 2026-SEA601-02-Waterfall Life-Cycle Model.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 2
---

# Types of Maintenance

## Summary

Three kinds, separated by **why** the change is being made.

**Corrective maintenance**
- **Corrects residual faults**
- Faults of any type: analysis, design, implementation, documentation, or others

**Perfective maintenance**
- **Adds functionality**
- Improves performance and security

**Adaptive maintenance**
- **Responses to changes in the environment in which the product operates**
- The product is ported to a new compiler, operating system, and/or hardware
- Example given: a change to a car registration number format

## Key points

- The classification is by **cause**, not by size or difficulty. A one-line change
  can be any of the three.
- The exam question from the slides: *"Modify a product to support a new TAX law
  is which?"* — the law is a change in the **environment the product operates
  in**, so it is **adaptive**, not corrective (nothing was faulty) and not
  perfective (no new capability was wanted for its own sake).
- **Corrective** maintenance has a defect report behind it. **Adaptive and
  perfective** maintenance have no defect report — there is a **change in
  requirements** instead.

## Watch out for

- Perfective vs adaptive is the common confusion. Ask: did **we** want it better,
  or did **the world** force it? Wanting it better is perfective; the world
  forcing it is adaptive.

## Prerequisites

[[classical-waterfall-phases]]
