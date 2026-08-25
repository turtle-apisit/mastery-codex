---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Vector Databases
score: 0
prerequisites:
- LLM Application Architecture
- Tokens and Embeddings
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

# Vector Databases

## Summary

Vector databases — **Pinecone, Milvus, Chroma** — are **purpose-built to store
and query high-dimensional embeddings**.

Three capabilities:

- **Fast Similarity Search** — using algorithms like **HNSW (Hierarchical
  Navigable Small World)** to find nearest neighbours **in milliseconds**.
- **Hybrid Search** — combining **keyword search (BM25)** with vector search for
  **optimal retrieval accuracy**.
- **Metadata Filtering** — ensuring users **only retrieve documents they have
  access to**.

## Key points

- Ordinary indexes answer "equals" and "between". These answer **"nearest"** in a
  space of hundreds of dimensions, which is the operation embeddings require.
- **Hybrid search exists because neither method is sufficient alone.** Vector
  search finds things that mean the same; keyword search finds the exact term
  someone typed. Product codes and proper nouns are why BM25 is still there.

## Watch out for

- **Metadata filtering is a security control, not a convenience.** It is the
  mechanism behind pre-filtering in [[security-in-rag-pipelines]] — the way an
  LLM is prevented from ever seeing chunks the user is not cleared for.

## Prerequisites

[[llm-application-architecture]] · [[tokens-and-embeddings]]
