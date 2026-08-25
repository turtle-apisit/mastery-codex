---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Security in RAG Pipelines
score: 0
prerequisites:
- Retrieval-Augmented Generation
source:
- LLMArchi.pdf
last_reviewed: null
history:
- date: '2026-08-25'
  activity: capture
  delta: 0
  result: 0
  note: Captured from the Generative AI architecture deck
---

# Security in RAG Pipelines

## Summary

> When an LLM accesses enterprise documents, strict **Document-Level Security**
> and **Role-Based Access Control (RBAC)** are **non-negotiable**.

**Three controls, at three different points in the pipeline:**

**Pre-Filtering (Vector DB level)** — **before a similarity search executes**,
the query is filtered using **metadata tags** (e.g. `department: legal`,
`clearance: top-secret`).

> **The LLM never sees unauthorized chunks.**

**Post-Filtering** — a **secondary security agent validates the retrieved
context chunks against the user's IAM (Identity and Access Management) token
before injecting them into the prompt**.

**Data Masking** — **PII (Personally Identifiable Information) is scrubbed or
tokenized during the ingestion phase**, before entering the Vector Database.

## Key points

- The three controls sit at **ingestion**, **before retrieval**, and **after
  retrieval** — defence in depth along the pipeline, not one gate.
- **Pre-filtering is the strongest of the three** because of that one sentence:
  the model never receives the data at all. Anything filtered *after* the model
  has seen it is damage control.
- Masking happens **once, at ingestion**. Every query thereafter is safe by
  construction rather than by repeated checking.

## Watch out for

- A prompt cannot be trusted to keep a secret it was given. This is why the
  architecture puts the boundary at **retrieval**, not in the instructions —
  "don't reveal this" is not an access control.

## Prerequisites

[[retrieval-augmented-generation]]
