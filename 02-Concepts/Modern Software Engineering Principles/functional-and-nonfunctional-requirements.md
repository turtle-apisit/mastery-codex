---
subject: Modern Software Engineering Principles
skill_name: Functional and Nonfunctional Requirements
score: 0
prerequisites:
- Requirement Definition
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

# Functional and Nonfunctional Requirements

## Summary

**Functional requirement** — specifies **an action that the software product must
be able to perform**.

**Nonfunctional requirement** — specifies **properties of the software product
itself**, such as:

- Platform constraints
- Response times
- Easy to use
- Reliability
- Security

**Worked examples.** For the business need *"help the marketing team reach out to
non-paying customers and offer new products to convert them to paying
customers"*, the derived requirements are:

- The system shall **require customers' emails** in order to contact the support
  team
- The system shall **save users' name, email and phone number**
- The system shall **allow call center staff to send follow-up emails**
- The system shall **allow customers to post their photos**

## Key points

- Functional = **what it does**; nonfunctional = **how well / under what
  constraints** it does it.
- Many nonfunctional requirements cannot be settled during requirements at all —
  choice of programming language, reuse issues, and portability issues **are
  finalised during the design activity**.

## Watch out for

- Look at the last example requirement — *allow customers to post their photos*.
  It is a perfectly well-formed functional requirement that has **nothing to do
  with the stated need**. Well-formed and traceable are different tests, and this
  is the slide showing the difference.

## Prerequisites

[[requirement-definition]]
