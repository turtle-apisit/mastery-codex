---
subject: Modern Software Engineering Principles
skill_name: Ensuring Maintainability
score: 0
prerequisites:
- Types of Maintenance
- Modularity
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

# Ensuring Maintainability

## Summary

> **Maintenance is not a one-time effort. We must plan for maintenance over the
> entire life cycle.**

- **Design workflow** — use **information-hiding** techniques
- **Implementation workflow** — select **variable names meaningful to future
  maintenance programmers**
- **Documentation** must be **complete and correct, and reflect the current
  version of every artifact**

And it does not stop at delivery: **during postdelivery maintenance,
maintainability must not be compromised** — always be conscious of the
**inevitable further maintenance**. The principles leading to maintainability are
**equally applicable to postdelivery maintenance itself**.

**What is required of postdelivery maintenance programmers?**

- **At least 67% of the total cost of a product accrues during postdelivery
  maintenance**, and **maintenance is a major income source**
- **Nevertheless, even today many organizations assign maintenance to
  unsupervised beginners and less competent programmers**
- Postdelivery maintenance is **one of the most difficult aspects of software
  production**, because it **incorporates aspects of all other workflows**

**Corrective maintenance in practice.** What tools does the programmer have to
find the fault? **The defect report filed by the user, the source code, and often
nothing else.** The fault could lie **anywhere** within the product, and its
original cause **might lie in the by-now non-existent specifications or design
documents**. So the programmer must have **superb debugging skills**.

**Then how to fix it without introducing a regression fault?** Consult the
detailed documentation for the product as a whole and for each individual module
— but **what usually happens** is there is **no documentation at all**, or it is
**incomplete**, or it is **faulty**. The programmer must then **deduce from the
source code itself** all the information needed.

**After changing the code, the programmer must:**

- **Test that the modification works correctly** — using specially constructed
  test cases
- **Check for regression faults** — using stored test data
- **Add the specially constructed test cases to the stored test data** for future
  regression testing
- **Document all changes**

**Adaptive and perfective maintenance** require going through requirements,
specifications, design, and implementation-and-integration workflows, **using the
existing product as a starting point**.

## Key points

- **The asymmetry of expertise:** when programs are developed, specifications
  come from analysis experts, designs from design experts, code from programming
  experts. **But a maintenance programmer must be expert in all three areas — and
  also in testing and documentation.**
- **Conclusion:** *no form of maintenance is a task for an unsupervised beginner,
  or should be done by a less skilled computer professional.*
- Three skills named for corrective maintenance: **superb diagnostic skills,
  superb testing skills, superb documentation skills**.

## Watch out for

- Maintainability is decided at **design and implementation** time, long before
  any maintenance happens. It cannot be added later.

## Prerequisites

[[types-of-maintenance]] · [[modularity]]
