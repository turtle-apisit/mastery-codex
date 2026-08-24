---
subject: Modern Software Engineering Principles
skill_name: Walkthroughs and Inspections
score: 0
prerequisites:
- Testing to Specifications and Testing to Code
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

# Walkthroughs and Inspections

## Summary

**Non-execution-based testing** rests on two underlying principles:

- **We should not review our own work**
- **Group synergy**

**Walkthroughs.** A walkthrough team consists of **four to six members**,
including representatives of:

- The team responsible for the **current workflow**
- The team responsible for the **next workflow**
- The **SQA group**

The walkthrough is **preceded by preparation**, which produces two lists: items
**not understood**, and items that **appear to be incorrect**.

Managing walkthroughs:

- Must be **document-driven, rather than participant-driven**
- **Verbalization leads to fault finding**
- **Should never be used for performance appraisal**

**Inspections.** An inspection has **five formal steps**:

1. **Overview**
2. **Preparation**, aided by **statistics of fault types**
3. **Inspection**
4. **Rework**
5. **Follow-up**

**Fault statistics** are recorded by **severity** (major or minor) and by **fault
type**. Examples of design faults: *not all specification items have been
addressed*; *actual and formal arguments do not correspond*.

**Strengths and weaknesses of reviews:**

- Reviews are an **effective way to detect faults**
- **Faults are detected early in the process**
- Reviews are **less effective if the process is inadequate**:
  - Large-scale software should consist of **smaller, largely independent
    pieces**
  - The **documentation of previous workflows has to be complete and available
    online**

## Key points

- Walkthrough = 4–6 people, informal, document-driven. Inspection = five formal
  steps, driven by fault statistics. Inspections are the more rigorous of the
  two.
- **Never for performance appraisal** is not a nicety — the moment a walkthrough
  can affect someone's review, people stop volunteering the faults it exists to
  find.
- Reviews are the only testing method that can run **before code exists**, which
  is what makes them cheap under the cost-of-correcting-faults curve.

## Watch out for

- **AI touchpoint:** reviews and inspections **hold unchanged — and are now your
  best tool.** *"Testing weakened, so review carries more of the load — but the
  reviewable artifact is **the labelling instruction**."*

## Prerequisites

[[testing-to-specifications-and-testing-to-code]]
