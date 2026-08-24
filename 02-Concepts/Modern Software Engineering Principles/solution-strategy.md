---
subject: Modern Software Engineering Principles
skill_name: Solution Strategy
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

# Solution Strategy

## Summary

**A general approach to building the product.**

The procedure has a deliberate order:

1. **Find strategies without worrying about constraints.**
2. **Then modify the strategies in the light of the constraints, if necessary.**

**Sally's Software Shop mini case study.** Sally buys software from suppliers and
sells to the public; popular packages are stocked, the rest ordered as required;
institutions, corporations and some members of the public get credit facilities.
Monthly turnover is 300 packages at an average retail cost of $250. She has been
advised to computerize. **Should she?**

**A better question:** *what business functions should she computerize?* —
accounts payable, accounts receivable, inventory.

**Still better:** *how?* Batch or online? In-house or outsourcing?

**And the real question:** *what is Sally's **objective** in computerizing her
business?* The slides make the point by absurdity:

- Because she sells software? → she needs an in-house system with sound and light
  effects.
- Because she launders "hot" money? → she needs a product that keeps five
  different sets of books and has no audit trail.

> **Is the Director's objective clinic efficiency, or patient care? Those give
> different systems.**

## Key points

- The progression of questions — *should she? → what? → how? → why?* — is the
  content. Each level exposes that the previous one was underspecified.
- Considering constraints too early prunes strategies you never got to evaluate.
  That is why constraints are applied in step 2.

## Watch out for

- The **objective** determines the system. Two clients with identical functional
  requirements and different objectives need different products.

## Prerequisites

[[analysis-activity]]
