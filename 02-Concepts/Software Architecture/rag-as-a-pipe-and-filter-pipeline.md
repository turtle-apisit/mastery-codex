---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: RAG as a Pipe-and-Filter Pipeline
score: 0
prerequisites:
- Retrieval-Augmented Generation
- Pipeline Architecture Style
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

# RAG as a Pipe-and-Filter Pipeline

## Summary

> A Simple (or Naive) RAG architecture **fundamentally maps to the Pipe-and-Filter
> software architecture style pattern**.

> Runtime query execution is structured as a **sequential, unidirectional data
> processing pipeline**. Data flows through **independent, modular components
> (filters)** via **fixed connections (pipes)**.

**The four filters:**

1. **Filter 1 (Input Transform)** — captures user input and **generates an
   embedding vector**.
2. **Filter 2 (Retriever)** — **queries a vector database** to pull relevant
   document chunks.
3. **Filter 3 (Augmentation)** — **stuffs retrieved text chunks alongside the
   original prompt** into an LLM context template.
4. **Filter 4 (Generator)** — the LLM **processes the augmented prompt and
   streams the finalized text output**.

## Key points

- This is the payoff of the whole course: a brand-new AI system turns out to be
  **a pattern from 1990s software architecture**, unchanged. The vocabulary of
  [[pipeline-architecture-style]] — producer, transformer, consumer, one-way
  pipes, stateless filters — describes it exactly.
- Filter 1 is a **producer**, Filters 2–3 are **transformers**, Filter 4 is the
  **consumer**. Mapping them is a likely exam task.

## Watch out for

- The word **"Simple (or Naive)"** is load-bearing. This mapping holds for
  straightforward RAG. The moment loops and state appear the pattern breaks —
  which is exactly what [[agentic-architectures]] is about.
- Pipeline's known weakness applies here too: **error handling and rollback
  across filters is complex**. A retrieval that returns nothing does not throw;
  it just produces a worse answer.

## Prerequisites

[[retrieval-augmented-generation]] · [[pipeline-architecture-style]]
