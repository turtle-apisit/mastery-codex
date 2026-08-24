---
subject: Modern Software Engineering Principles
skill_name: Self-Documenting Code and Comments
score: 0
prerequisites:
- Good Programming Practice
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

# Self-Documenting Code and Comments

## Summary

> **Self-documenting code is exceedingly rare.**

The key issue: **can the code artifact be understood easily and unambiguously
by** the SQA team, maintenance programmers, and all others who have to read the
code?

**The example.** A code artifact contains
`xCoordinateOfPositionOfRobotArm`, abbreviated to `xCoord`. **This is fine**,
because the entire module deals with the movement of the robot arm — **but does
the maintenance programmer know this?**

**Comments.** The slides stage a small argument with themselves:

- *Suggestion*: comments are essential whenever the code is written in a
  non-obvious way, or uses some subtle aspect of the language.
- *Nonsense!* — **recode in a clearer way**. **We must never promote or excuse
  poor programming.** However, comments **can** assist future maintenance
  programmers.

And the resolution, which is the sentence worth memorising:

> **A comment that explains WHAT the code does is a confession that the code does
> not say.**
> **A comment that explains WHY — why this constant, why this order, why this
> apparent redundancy — is information that cannot be in the code at all.**

**Prologue comments** — every code artifact should carry a minimal prologue
comment block.

## Key points

- The *what* / *why* split is the usable rule. A *what* comment is a signal to
  rewrite the code; a *why* comment is irreplaceable.
- `xCoord` is acceptable **only because of context the reader may not have**.
  Abbreviation is a bet on the reader's knowledge.

## Watch out for

- "Self-documenting code" is not a licence to omit comments — the slides call
  genuinely self-documenting code **exceedingly rare**.

## Prerequisites

[[good-programming-practice]]
