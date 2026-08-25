---
subject: Software Architecture
unit: Model-Driven Architecture
skill_name: Architecture Decision Record
score: 0
prerequisites:
- Transformation Engines and Agentic AI
source:
- class02_slides.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 Class 2
---

# Architecture Decision Record

## Summary

An **ADR** records a technical decision, its context, and its consequences. In
the AI-driven MDA pipeline it takes over the job that **QVT/ATL rules** used to
do: it **defines technical decisions, constraints, and conventions as prompt
context for AI**.

**The worked example, `ADR-001.md`:**

```markdown
# ADR-001: Technology Stack & Architectural Decision

## Status: Accepted
## Context: Transform PIM Loyalty Specs into dual target production environments.

## Decisions:
1. Target Stack A (Enterprise RDBMS):
   - Language: Java 21 LTS with Spring Boot 3.2 & Spring Data JPA
   - Database: PostgreSQL (ANSI SQL DDL, Foreign Key Constraints)
   - Naming Convention: snake_case for tables/columns, camelCase for Java fields

2. Target Stack B (Cloud-Native NoSQL):
   - Language: Node.js 20 LTS with TypeScript & Express.js
   - Database: MongoDB with Mongoose ODM (Embed Transactions as sub-documents)
   - Naming Convention: camelCase for JSON keys & document fields
```

## Key points

- The structure is **Status / Context / Decisions**. Note the ADR carries a
  **status** (`Accepted`), which is what makes a series of ADRs a decision
  *history* rather than a settings file.
- **Naming conventions belong in the ADR**, not the PIM. Anything technology-
  specific has to live here to keep the PIM 100% technology-agnostic.
- Changing the target stack means **updating an ADR file** — that is the whole
  flexibility claim of AI-driven MDA over rewriting ATL rules.

## Watch out for

- The ADR is what makes the same PIM produce **two different PSMs** without the
  PIM changing at all. In the Coffee Shop example, ADR-001 is the *only* place
  the words PostgreSQL and MongoDB appear.

## Prerequisites

[[transformation-engines-and-agentic-ai]]
