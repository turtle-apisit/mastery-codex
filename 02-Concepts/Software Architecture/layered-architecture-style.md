---
subject: Software Architecture
skill_name: Layered Architecture Style
score: 0
prerequisites:
- Architectural Pattern
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
- CH01_2_13illity_10Style 1.pdf
- class02_slides.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03, CH01, and Class 2
---

# Layered Architecture Style

## Summary

Also known as **"N-tiered architecture"**.

> Components are organized into **logical horizontal layers**, with **each layer
> performing a specific role** within the application (such as presentation logic
> or business logic).

**The layers** (CH01 naming, with aliases):

- **Presentation layer** (also known as **UI layer**)
- **Application layer** (also known as **service layer**)
- **Business logic layer** (also known as **domain layer**)
- **Data access layer** (also known as **persistence layer**)

> Although there are **no specific restrictions** on the number and types of
> layers, in some cases the **business layer and persistence layer are combined**
> — particularly when persistence logic (SQL or HSQL) is embedded within business
> layer components. **Thus, smaller applications may have only three layers.**

**Key principles** (Class 2):

- **Separation of Concerns** — each layer has a distinct responsibility
- **Layer Isolation** — lower layers do not depend on upper layers

**Why use this style:**

- A good choice for **small, simple applications or websites**
- A good choice **as a starting point** for situations with **very tight budget
  and time constraints** — because of its simplicity and familiarity among
  developers and architects, it is **perhaps the lowest-cost architecture style**
- A good choice **when an architect is still analyzing business needs and
  requirements** and is unsure which style would be best

**Architecture characteristics rating:**

> **Overall cost and simplicity are the primary strengths.** Being monolithic in
> nature, layered architectures **don't have the complexities associated with
> distributed architecture styles**, are simple and easy to understand, and are
> **relatively low cost to build and maintain**.

*Usage (CH01):* general desktop applications; e-commerce web applications.

## Key points

- The layer names all have **two names each**. Both sets appear in exams.
- Its rating in the comparison matrix: **Scalability Low, Performance
  Low-Medium, Deployability Low, Testability Medium**, primary risk **Architecture
  Sinkhole**.
- The "still analyzing requirements" justification is genuinely useful advice —
  it is the **default** style precisely because it commits you to least.

## Watch out for

- Two related concepts have their own notes: **[[layers-of-isolation]]**
  (open/closed layers) and the **[[architecture-sinkhole-anti-pattern]]**.

## Prerequisites

[[architectural-pattern]]
