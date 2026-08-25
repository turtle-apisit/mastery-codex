---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Encoder-Decoder Models
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

# Encoder-Decoder Models

## Summary

Some models — **T5, BART** — use **both halves, just like the original
Transformer designed by Google**.

**How it works:** the **Encoder reads the entire input** (e.g. a French
sentence) and **passes that deep understanding to the Decoder**, which
**generates the output step-by-step** (e.g. the English translation).

**Why:** perfect for **transformation tasks where the input and output are
fundamentally different**:

- translation
- text summarization
- turning bullet points into a full article

## Key points

- The discriminator is **"input and output are fundamentally different"**. When
  the output is a transformed version of a whole input, you need something that
  read the whole input (encoder) *and* something that writes (decoder).
- This is the **original** Transformer shape. BERT and GPT are the later
  specialisations that each kept one half.

## Watch out for

- Summarization is the case worth thinking about: it is generation, so a
  decoder-only model can do it — but the encoder-decoder shape suits it better
  because the entire source must be understood before the first output token is
  chosen.

## Prerequisites

[[encoder-and-decoder-halves]]
