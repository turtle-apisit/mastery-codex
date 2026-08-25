---
subject: Software Architecture
unit: Quality Attributes and Classic Patterns
skill_name: Model-View-Controller Pattern
score: 0
prerequisites:
- Architectural Pattern
source:
- CH01_2_13illity_10Style 1.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH01
---

# Model-View-Controller Pattern

## Summary

Three components:

- **Model** — contains the **core functionality and data**
- **View** — **displays the information to the user**. **More than one view may be
  defined**
- **Controller** — **handles the input from the user**

> This is done to **separate internal representations of information from the
> ways information is presented to, and accepted from, the user**. It **decouples
> components and allows efficient code reuse.**

**Usage:** architecture for **World Wide Web applications** in major programming
languages; web frameworks such as **Django and Rails**.

## Key points

- The purpose sentence contains a **two-way** split, and both directions matter:
  internal representation separated from how information is **presented to** the
  user (view) *and* from how it is **accepted from** the user (controller).
- **Multiple views over one model** is explicitly allowed and is the main payoff —
  the same data rendered as a table, a chart, and an API response.

## Watch out for

- MVC is a **separation of concerns applied to the presentation boundary**, not a
  three-layer stack. The Model is not "the database layer" — it holds the **core
  functionality** as well as the data.
- MVC is the request-based model that [[event-driven-architecture-style]] is
  contrasted against, and its request flow (browser → web server → application
  server → database server) is the bottleneck story that motivates
  [[space-based-architecture-style]].

## Prerequisites

[[architectural-pattern]]
