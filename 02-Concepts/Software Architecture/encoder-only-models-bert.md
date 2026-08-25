---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Encoder-Only Models (BERT)
score: 0
prerequisites:
- Encoder and Decoder Halves
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

# Encoder-Only Models (BERT)

## Summary

**BERT — Bidirectional Encoder Representations from Transformers** — uses **only
the Encoder half**.

**How it works:** it **reads the entire sentence at once**, looking **both left
and right (bidirectional)** to gain a **deep understanding of the context**.

**Why:** its job is to **understand text, not write long essays**. It excels at:

- classifying emails as spam
- analysing sentiment
- finding a specific answer in a paragraph

## Key points

- The name spells out the design: **Bidirectional** (both directions at once) ·
  **Encoder** (which half) · **Representations from Transformers** (what it
  produces).
- Bidirectionality is available **because** there is no generation. Nothing is
  being written, so there is no future to hide.

## Watch out for

- Every task listed produces a **short, closed answer** — a label, a score, a
  span. That is the signature of an encoder-only model, and the fastest way to
  tell it apart from [[decoder-only-models-gpt]] in an exam.

## Prerequisites

[[encoder-and-decoder-halves]]
