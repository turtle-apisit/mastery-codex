---
subject: Modern Software Engineering Principles
skill_name: Fault Failure and Defect Terminology
score: 0
prerequisites: []
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

# Fault Failure and Defect Terminology

## Summary

The precise chain, and why the sloppy word matters:

```
Mistake  --leads to-->  Fault  --causes-->  Failure
                        (also called Bug, Error, Defect)
```

- **Mistake** — the human act. A person did something wrong.
- **Fault** — the resulting flaw sitting in the artifact.
- **Failure** — the observable wrong behaviour when the fault is executed.
- **Defect** — a **generic term** for a fault, failure, or error.

The classic example: `x = n/d;` — the fault is the missing check on `d`; the
failure is the program terminating when `d = 0`.

The course's point about language:

> *"A bug crept into the code"* instead of *"I made a mistake"* — the word **bug**
> quietly removes the human from the sentence.

**Two questions worth being able to answer:**

- *If there is no failure, does it mean there is no fault?* **No.** A fault on a
  path that is never executed produces no failure and is still there.
- *Can you have a failure with no fault in the code?* **Yes** — and this is the
  AI touchpoint.

## Key points

- Related terminology from the same class: **internal software**, **contract
  software**, **commercial off-the-shelf (COTS) software**, **open-source
  software** — categories by who it is built for and how it is distributed.

## Watch out for

**Where is the "fault" in a model?** The AI touchpoint lists three places, none of
which is a line of code:

1. **The data it learned from** — incomplete, mislabelled, or from a different
   world than the one it now runs in.
2. **The definition of what it was asked to predict** — e.g. what exactly counts
   as a *"no show"*.
3. **The threshold someone chose** for turning a probability into a decision.

This is the case of *a failure with no fault in any line of code*, and it is the
first of the three practices the course says **break** for AI-enabled software.

## Prerequisites

None — this is a root concept for the subject.
