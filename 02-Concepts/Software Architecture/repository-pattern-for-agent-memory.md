---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Repository Pattern for Agent Memory
score: 0
prerequisites:
- Agentic Architectures
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

# Repository Pattern for Agent Memory

## Summary

The fifth of the five agentic patterns.

> Agents require **persistent memory across long sessions**, making the
> Repository Pattern a **structural necessity** to **separate LLM logic from data
> storage**.

**How it applies:** defines abstractions for

- **Short-Term Memory** — in-flight context
- **Long-Term Memory** — vector embeddings of past interactions

> The agent interacts with a **memory interface provider** rather than managing
> raw queries.

**Why it's used:** separates **storage optimization protocols** — **context
compaction, sliding windows, summaries** — **entirely from the agentic execution
layers**.

## Key points

- **"Structural necessity", not a nicety.** Without it, every context-window
  strategy is entangled with the reasoning loop, and changing one means editing
  the other.
- The two memories are different *technologies*, not just different lifetimes:
  short-term is the live context window; long-term is **vector embeddings** —
  the same machinery as [[vector-databases]], pointed at conversation history
  instead of documents.

## Watch out for

- In the pattern matrix its core advantage is **"prevents rapid context window
  overflow"**. That is the actual failure it exists to stop, and it traces
  straight back to Context Management in
  [[llm-application-architecture]].

## Prerequisites

[[agentic-architectures]]
