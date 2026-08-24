---
subject: Modern Software Engineering Principles
skill_name: Engineering AI-Enabled Software
score: 0
prerequisites:
- Modern Maintenance Definition
- Testing to Specifications and Testing to Code
- The Specification Document
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

# Engineering AI-Enabled Software

## Summary

> **What happens to the software process when one component's behaviour was
> *learned* rather than *written*?**

**The model is the small box.** In a real ML system the model itself is a small
fraction of the code. Everything around it — *data collection, verification,
feature extraction, configuration, serving infrastructure, monitoring, process
management, analysis tools, resource management* — **is ordinary software
engineering** (Sculley et al., *Hidden Technical Debt in Machine Learning
Systems*, NeurIPS 2015).

**So what changes? Mostly nothing.** Ninety-plus percent of the Health Centre
system is booking, records, notifications and reporting. Every slide in the
course applies to it, unchanged. **The interesting question is only about the
small box — and about the parts of the system that touch it.**

**Seventeen practices. 9 hold, 5 are strained or reframed, 3 break.**

> Both halves of that message matter. **A student who hears only "three break"
> has learned the wrong thing, and so has a student who hears only "nine
> hold".**

**Holds unchanged (9):** needs vs wants (C1) · stakeholders (C1) · cost of
correcting faults (C2) · iterative and incremental (C3) · cohesion and coupling
(C4) · good programming practice (C5) · reviews and inspections (C5) ·
corrective maintenance (C5) · ethics (C2)

**Strained or reframed (5):** mistake→fault→failure (C2) · requirements (C4) ·
integration order (C5) · testing to specification (C5) · adaptive maintenance
(C5)

**Break (3):** specification precision (C4) · unit testing (C5) · defect reports
(C5)

**What replaces the broken parts:**

1. **Instead of test cases → evaluation on slices.** Not *"does it work?"* but
   **"for whom does it work?"**
2. **Instead of "the specification is the document" → the data occupies the
   specification's slot.** So it needs what a specification needs: **version
   control, a definition of every field, a named owner** — and **review of the
   labelling instruction**, because nobody can review the rows themselves.
3. **Instead of "ship it and fix bugs" → monitor, and expect decay.** The system
   has to know when it has stopped working.

## Key points

- **New hazard in integration order** — it becomes **pipeline order**, and
  **training and serving must compute features identically. When they diverge
  nothing errors — the predictions just get worse.** A silent failure with no
  exception and no defect report.
- **Ethics is "more exposed"**: Class 2's Health Centre case was an AI case, and
  **nothing in it required any machine learning to understand**.

## Watch out for

- This is the intended takeaway of the whole course, so an exam answer that
  leans entirely one way is wrong by construction. The correct shape is
  **"mostly the same, in three specific places not at all"** — and you should be
  able to name which three and what replaces them.

## Prerequisites

[[modern-maintenance-definition]] · [[testing-to-specifications-and-testing-to-code]] · [[the-specification-document]]
