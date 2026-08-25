---
subject: Software Architecture
unit: Architecture Styles
skill_name: Pipeline Architecture Style
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

# Pipeline Architecture Style

## Summary

Also called **Pipes and Filters**. Structures systems that **produce and process
a stream of data**: **unidirectional data flow** where data flows through
**pipes** and is transformed by independent **filters**.

**Pipes:**

> Pipes form the **communication channel between filters**. Each pipe is
> typically **unidirectional and point-to-point** (rather than broadcast) **for
> performance reasons**, accepting input from one source and always directing
> output to another.

> The payload carried on the pipes **may be any data format**, but architects
> **favor smaller amounts of data to enable high performance**.

**Filters:**

> Filters are **self-contained, independent from other filters, and generally
> stateless**. **Filters should perform one task only.** Composite tasks should be
> handled by **a sequence of filters rather than a single one**.

**Key characteristics** (Class 2): **high composability and modularity** —
filters can be **reordered or replaced** — and **strongly decoupled processing
stages**.

**Real-world applications:** **ETL pipelines**, **video encoding streams**,
**compiler toolchains** (consecutive filters perform lexical analysis, parsing,
semantic analysis, and code generation), workflows in bioinformatics,
**Electronic Data Interchange (EDI)**.

**Architecture characteristics rating:**

> **Overall cost and simplicity combined with modularity** are the primary
> strengths. Being **monolithic in nature**, pipeline architectures don't have the
> complexities of distributed styles. **Architectural modularity is achieved
> through the separation of concerns between the various filter types** — any
> filter can be **modified or replaced without impacting the other filters**.

## Key points

- **Stateless filters + point-to-point unidirectional pipes** is what buys the
  composability. Both properties are load-bearing.
- Rating in the matrix: **Scalability Medium, Performance Medium, Deployability
  Medium, Testability High**, primary risk **Complex Error Recovery**.

## Watch out for

- **Master's Insight:** *error handling and transaction rollback across filters
  are complex; **state management must be handled carefully**.* Stateless filters
  make composition easy and make **recovering a half-finished pipeline hard**.

## Prerequisites

[[architectural-pattern]]
