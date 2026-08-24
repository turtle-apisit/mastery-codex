---
subject: Modern Software Engineering Principles
skill_name: Sandwich Integration
score: 0
prerequisites:
- Top-Down Integration
- Bottom-Up Integration
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

# Sandwich Integration

## Summary

The combination that takes both strategies' strengths:

- **Logic artifacts are integrated top-down**
- **Operational artifacts are integrated bottom-up**
- **Finally, the interfaces between the two groups are tested**

**Three advantages:**

1. **Major design faults are caught early** — from the top-down half
2. **Operational artifacts are thoroughly tested**, and **they may be reused with
   confidence** — from the bottom-up half
3. **There is fault isolation at all times**

## Key points

- The split is along the **logic / operational** line from top-down integration —
  logic artifacts carry the decision-making flow of control, operational
  artifacts perform the actual operations.
- This is the resolution of the whole integration section: it is the answer to
  both of top-down's and bottom-up's respective weaknesses at once.

## Watch out for

- Do not forget the **third step**. The interface between the two halves is the
  one place neither sub-strategy has exercised, and it is tested last and
  explicitly.

## Prerequisites

[[top-down-integration]] · [[bottom-up-integration]]
