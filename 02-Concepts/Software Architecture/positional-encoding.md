---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Positional Encoding
score: 0
prerequisites:
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

# Positional Encoding

## Summary

> Unlike reading left-to-right, a Transformer **reads all words at the exact same
> time to be fast**. Positional encodings **act like page numbers**, attaching a
> **unique signal to each word** so the model knows the exact order of the
> sentence.

The example the lecture uses:

> knowing **"Dog bites man" is different from "Man bites dog"**.

## Key points

- This exists **only because** of the parallelism. A model that read
  sequentially would get order for free; the Transformer trades it away and then
  buys it back explicitly.
- The signal is **added to** the token embedding, not stored beside it — order
  becomes part of the same vector the attention layers see.

## Watch out for

- The "page numbers" analogy is the one to reproduce: position is **attached to
  each token**, not a separate ordering step applied to the sequence.

## Prerequisites

[[tokens-and-embeddings]]
