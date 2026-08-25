---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Retrieval-Augmented Generation
score: 0
prerequisites:
- Vector Databases
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

# Retrieval-Augmented Generation

## Summary

> **LLMs lack access to private or up-to-date information.** RAG solves this by
> **combining retrieval with generation**.

**Three stages:**

1. **Ingestion Pipeline** — documents are **chunked**, **converted to
   embeddings**, and **stored in a Vector Database**.
2. **Retrieval** — when a user asks a question, **the query is embedded**, and a
   **similarity search fetches relevant context**.
3. **Generation** — the **retrieved context is injected into the prompt**, and
   the LLM generates a **grounded, factual response**.

**The full loop** from the architecture diagram:

```
Indexing (offline):
  Documents ─chunk─► Chunks ─embed─► vectors ─index─► Vector Store

Query (online):
  User ─► Query ─embed─► vector ─search─► Vector Store
                                    │
                            relevant contexts
                                    │
        Query + Contexts ─► Prompt ─► LLM ─► Response ─► User
```

## Key points

- The two halves run at **different times**: indexing is offline and batch,
  retrieval-and-generation is online per request. Both touch the same vector
  store from opposite sides.
- **The model is never modified.** RAG changes what goes *into the prompt*, not
  the weights — which is why it can serve information that did not exist when the
  model was trained.
- "Grounded" is doing real work in that last sentence: the answer is tied to
  retrieved text the user could go and read.

## Watch out for

- **Chunking is a design decision, not a formatting step.** Chunks too small lose
  the context that made them meaningful; too large and the similarity search
  returns mostly irrelevant text alongside the useful part.

## Prerequisites

[[vector-databases]]
