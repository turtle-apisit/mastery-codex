---
subject: Modern Software Engineering Principles
skill_name: Informal Semiformal and Formal Specifications
score: 0
prerequisites:
- The Specification Document
source:
- 2026-SEA601-04-Requirements_Analysis_and_Design.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 4
---

# Informal Semiformal and Formal Specifications

## Summary

A **ladder of precision**, from natural language to mathematics.

**1. Informal** — written in a **natural language**.

> **Natural language is not a good way to specify a product.**

*Online shopping example.* Bad: *"The system shall provide a fast and
user-friendly checkout process."* Better:

> The system shall complete the checkout process **within 3 seconds** after the
> user clicks 'Place Order', assuming network latency of **less than 100 ms**.
> The checkout process shall require **no more than 3 user interactions** and
> display clear error messages on invalid input.

*Traffic light example.* *"The traffic light shall change to green when no cars
are detected on the opposing lane."* Four categories of defect in one sentence:

- **Ambiguity** — what does "no cars" mean? Zero cars at the intersection, or no
  cars within 50 metres? Is "opposing lane" one lane or all opposing lanes?
- **Incomplete specification** — what if traffic is heavy on both lanes? Is there
  a maximum red time before a forced switch? Are pedestrians accounted for?
- **No systematic handling of edge cases** — what if the sensor fails? What if a
  vehicle is stalled in the opposing lane with no other cars present?
- **No clear logic or priority** — how is priority determined when multiple lanes
  wait? Should emergency vehicles override?

**2. Semiformal** — **graphical**: UML, DFD (Data Flow Diagram), ER (Entity
Relationship Diagram), decision tree.

**3. Formal** — **mathematically based techniques**: Finite State Machine, Z
Specification.

*Finite State Machine example (a safe):* the set of states J is
`{Safe Locked, A, B, Safe Unlocked, Sound Alarm}`; the set of inputs K is
`{1L, 1R, 2L, 2R, 3L, 3R}`; the transition function T is shown as a
function/table/diagram; the initial state is `Safe Locked`; the set of final
states is `{Safe Unlocked, Sound Alarm}`.

> **"Formal methods are the only technique in this course that can prove the
> ABSENCE of a fault rather than demonstrate its presence. That is why the
> industries that use them are the ones where a fault kills people."**

## Key points

- Memorise the FSM's **five components**: states, inputs, transition function,
  initial state, final states.
- Testing can only ever show that faults are **present**. Formal methods are the
  one exception in the syllabus.

## Watch out for

**The Health Centre prediction system** — *"The system shall predict which
patients will not attend."* **This is not a software requirement. It cannot pass
or fail.** The four issues:

- **Ambiguity / Incompleteness** — what is "will not attend"? **How good is good
  enough?**
- **Edge cases** — new patient with no history; model fails to load
- **Priority** — **which of the two errors is worse**: incorrectly flagging
  someone (false positive) or missing a real no-show (false negative)?

**AI touchpoint — a requirement for a model needs three parts:**

1. **The task** — predict what, from what, for whom, at what moment
2. **The acceptable error profile** — *not* "95% accurate". **Which errors, and
   how bad is each?** Flagging an attender costs a patient their appointment;
   missing a real no-show costs an empty chair. Those are not equally bad, and
   **only the client can say by how much**
3. **The fallback** — what the system does when the model has no answer, or a bad
   one

And the third of the three practices that **break**: specification precision.
**Not "the specification became vague" — it became *extensional*.** It states no
rule, it gives examples. It is **perfectly precise about the cases it covers,
wholly silent about the rest — and not on the informal → semiformal → formal
ladder at all.**

## Prerequisites

[[the-specification-document]]
