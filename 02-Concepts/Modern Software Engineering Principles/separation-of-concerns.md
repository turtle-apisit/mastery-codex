---
subject: Modern Software Engineering Principles
skill_name: Separation of Concerns
score: 0
prerequisites:
- Design Activity
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

# Separation of Concerns

## Summary

> **Trying to do too many things at the same time often leads to mistakes.**

Separation of concerns helps to:

- **Divide a problem into parts that can be dealt with separately**
- **Create an understanding of how the parts depend on / relate to each other**

Note that both halves matter — separating without understanding the relationships
between the parts is not the technique.

**Example dimensions of separation:**

- **Time**
  - Requirements, design, implementation, testing
  - Dial, receive confirmation, connect, talk
- **Qualities**
  - Efficiency and user friendliness
  - Correctness and portability
- **Views**
  - Data flow and control flow
  - Management and development

## Key points

- Separation of concerns is the **parent** concept. Three named techniques are
  **special cases** of it:
  - **[[modularity]]**
  - **Divide-and-conquer** — dividing **"horizontally"**, the **"brick" effect**
  - **Abstraction** — dividing **"vertically"**, the **"iceberg" effect**
- The horizontal/vertical and brick/iceberg pairings are the compact way to hold
  the difference. See [[divide-and-conquer-and-abstraction]].
- Together with **stepwise refinement**, these are the design techniques listed
  for the design activity.

## Watch out for

- The dimensions list shows that "concerns" are not only components. Time,
  quality attributes, and viewpoints are all legitimate axes to separate along.

## Prerequisites

[[design-activity]]
