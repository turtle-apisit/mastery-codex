---
subject: Modern Software Engineering Principles
skill_name: Design Activity
score: 0
prerequisites:
- The Specification Document
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

# Design Activity

## Summary

Answers **"how the product does it"**. **Design bridges the gap between
requirements and actual implementation.**

The aim is to **refine the artifacts until the material is in a form that can be
implemented by the programmers** — to *define, organize, and structure the
components of the final solution to serve as a blueprint for construction*.

**Nonfunctional requirements finalised here:**

- Choice of programming language
- Reuse issues
- Portability issues

**Design is a model-building activity.**

- The **formality of the project dictates the type, complexity, and depth of
  models**.
- **Agile/iteration projects typically build fewer models, but models are still
  created.**
- **Cowboy coding**: jumping to programming without design often causes less than
  optimum solutions and may require rework.

**Two levels of design:**

- **Architectural design** (also *General Design*, *Conceptual Design*)
  - **Broad design of the overall system structure**
  - **Input:** Specifications
  - **Output:** Modular decomposition
- **Detailed design**
  - Low level design including specific program details:
    - Design of the **database**
    - Design of **user and system interfaces**
    - Design of **controls and security**

## Key points

- The input/output pair for architectural design is exam material:
  **specifications in, modular decomposition out**.
- "Agile builds fewer models, but still builds models" is the sentence that
  blocks the usual misreading of the Agile Manifesto.

## Watch out for

- Design **techniques** are covered separately: stepwise refinement and
  separation of concerns (which contains modularity, divide-and-conquer, and
  abstraction). See [[separation-of-concerns]].

## Prerequisites

[[the-specification-document]]
