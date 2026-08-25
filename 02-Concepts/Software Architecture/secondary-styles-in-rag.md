---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Secondary Styles in RAG
score: 0
prerequisites:
- RAG as a Pipe-and-Filter Pipeline
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

# Secondary Styles in RAG

## Summary

> An enterprise-grade Simple RAG setup also relies on **complementary patterns**.

**Event-Driven / Batch Processing (for ingestion)**

> The **data preparation phase runs completely out-of-band from the query
> pipeline**. Often automated via **batch processing or file-upload events**.

**Component-Based / SOA (Service-Oriented Architecture)**

> The system **isolates primary responsibilities**. The **Retriever** (Pinecone,
> Milvus, Qdrant) and the **Generator** (OpenAI API or internal LLM) function as
> **decoupled, interchangeable services**.

## Key points

- **One system, three styles at once.** Pipe-and-filter for the query path,
  event-driven for ingestion, SOA for the components. That is the normal case,
  not a compromise — the same lesson as the FinTech "FastPay" exercise where each
  subsystem earns its own pattern.
- "Out-of-band" is the important property of ingestion: it must not sit in the
  request path, or every query would wait for indexing.

## Watch out for

- **Interchangeable** is the test for whether the SOA claim is real. If swapping
  Pinecone for Qdrant means touching the generator, the responsibilities were not
  actually isolated.

## Prerequisites

[[rag-as-a-pipe-and-filter-pipeline]]
