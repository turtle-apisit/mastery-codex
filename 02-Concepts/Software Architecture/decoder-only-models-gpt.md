---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Decoder-Only Models (GPT)
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

# Decoder-Only Models (GPT)

## Summary

**GPT — Generative Pre-trained Transformer** — uses **only the Decoder half**.

**How it works:** it reads text and **can only look at the words that came
*before* it (unidirectional)**. It **constantly tries to guess the very next
word, then feeds that guessed word back into itself to guess the next one** —
**autoregressive**.

**Why:** its job is **generation**. Because it is **strictly trained to predict
the next token based on previous tokens**, it is powerful at:

- writing code
- drafting emails
- having fluid conversations

## Key points

- **Unidirectional is not a limitation, it is the training objective.** A model
  allowed to see the next word could not be trained to predict it.
- **Autoregressive** = its own output becomes its next input. That loop is why
  generation cost grows with output length, and why **KV-caching** exists — see
  [[serving-and-inference-architecture]].

## Watch out for

- The BERT/GPT contrast is the exam pair, and both halves matter:
  **bidirectional + understand** versus **unidirectional + generate**. Getting
  the direction right but the job wrong (or vice versa) is a half-answer.

## Prerequisites

[[encoder-and-decoder-halves]]
