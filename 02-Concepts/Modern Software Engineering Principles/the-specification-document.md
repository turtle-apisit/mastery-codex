---
subject: Modern Software Engineering Principles
skill_name: The Specification Document
score: 0
prerequisites:
- Analysis Activity
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

# The Specification Document

## Summary

The specification document ("specifications", SRS):

> **It constitutes a contract.**

> It **must not have imprecise phrases** like *"optimal"* or *"98% complete"*.

Having complete and correct specifications is essential for four things:

- **Contract**
- **Design**
- **Testing**
- **Maintenance**

**Software document properties** — the five C's:

- **Correct**
- **Precise**
- **Complete**
- **Current** (up to date)
- **Concise?** — with the question mark, because conciseness competes with
  completeness

**The specification document must not have:**

- **Omissions**
- **Contradictions**

## Key points

- "It constitutes a contract" is the load-bearing claim. Everything else —
  precision, no omissions, no contradictions — follows from a document being
  legally and practically binding.
- The four dependents show why a bad spec is expensive in four places at once,
  not one.

## Watch out for

**AI touchpoint — the training data occupies the specification's place in the
process.** It does **both jobs a specification does**:

1. It is the **input you build from**
2. It is **what says the behaviour is correct**

— *but the implementer can no longer object.* And the properties still apply:
**"Correct, precise, complete, current, no omissions, no contradictions" — apply
them to the training set.**

This is why the reviewable artifact becomes **the labelling instruction**: nobody
can review the rows themselves, so you review the rule that produced them.

## Prerequisites

[[analysis-activity]]
