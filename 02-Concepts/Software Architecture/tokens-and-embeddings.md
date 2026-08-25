---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Tokens and Embeddings
score: 0
prerequisites:
- Transformer Architecture
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

# Tokens and Embeddings

## Summary

> Before text enters a model, it is **chopped into pieces called "tokens"**
> (words or sub-words). **Embeddings translate these tokens into lists of
> numbers (vectors)** so the computer can understand their meaning.

> **Words with similar meanings have similar numbers.**

That last line is the whole idea. Meaning is encoded as **position in a vector
space**, so "closeness" becomes something arithmetic can measure — which is what
makes similarity search over embeddings possible later in
[[vector-databases]].

## Key points

- A token is **a word *or a sub-word***, not necessarily a word. That is why
  token counts never match word counts.
- Two steps, not one: **tokenize** (text → discrete pieces), then **embed**
  (pieces → vectors).

## Watch out for

- Tokenization also appears as a **preprocessing** step in the
  [[generative-ai-pipeline]]. Same operation, two places: once over the training
  corpus, once over every request at inference.

## Prerequisites

[[transformer-architecture]]
