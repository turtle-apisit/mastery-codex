---
subject: Modern Software Engineering Principles
skill_name: Understanding the Application Domain
score: 0
prerequisites:
- Requirement Elicitation Techniques
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

# Understanding the Application Domain

## Summary

The **application domain** (or just *domain*) is the **specific business
environment in which the software product is to operate**.

> **Every member of the development team must become fully familiar with the
> application domain.**

**Correct terminology is essential**, and the tool for it is a **glossary**: *a
list of technical words used in the domain, and their meanings.*

**The course's running example of failure:** in the Class 2 assignment, the term
**"no-show" was never clearly defined.** That single undefined word runs through
the rest of the course — it reappears as an ambiguity in the specification, as a
label-definition fault in the training data, and as the reason a model's error
cannot be evaluated.

## Key points

- The glossary is an artifact with a job, not documentation for its own sake.
  Without it, the same word means different things to the client, the analyst,
  and the programmer, and nobody notices until integration.
- Domain familiarity is also a **precondition for interviewing well** — the
  interviewer must be fully familiar with the domain.

## Watch out for

- An undefined term does not announce itself. It looks like agreement. Everyone
  says "no-show" and nobody asks whether it means *arrived late*, *cancelled in
  advance*, or *never appeared*.

## Prerequisites

[[requirement-elicitation-techniques]]
