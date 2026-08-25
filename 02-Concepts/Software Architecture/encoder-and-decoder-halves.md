---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Encoder and Decoder Halves
score: 0
prerequisites:
- Transformer Architecture
- Multi-Head Attention
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

# Encoder and Decoder Halves

## Summary

> A full Transformer consists of **two halves**:

1. **The Encoder** — **reads and understands the input text entirely in one
   go**. It builds a **complete, deep understanding of the whole sentence**.
2. **The Decoder** — **takes what the Encoder understood and generates the
   output text one word at a time**, looking back at what it just wrote to guess
   the next word.

> **Different models use different halves depending on their job.**

That last line is the organising idea of the next three notes: BERT takes the
first half, GPT the second, T5 and BART take both.

## Key points

- The split is **understand vs. produce**. Reading is done all at once; writing is
  done one token at a time, because each new token depends on the ones already
  written.
- The decoder's backward glance at its own output is why generation is
  **autoregressive** and why it cannot be parallelised the way reading can.

## Watch out for

- "Two halves" is structural, not sequential-by-necessity. A model is free to
  use one, the other, or both — which is exactly what
  [[encoder-only-models-bert]], [[decoder-only-models-gpt]] and
  [[encoder-decoder-models]] do.

## Prerequisites

[[transformer-architecture]] · [[multi-head-attention]]
