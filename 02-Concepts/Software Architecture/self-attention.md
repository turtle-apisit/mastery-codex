---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Self-Attention
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

# Self-Attention

## Summary

The lecture's example does the work:

> Imagine you are reading a sentence and trying to understand a tricky word like
> **"bank"** in **"I sat by the river bank"**. Self-attention allows the model to
> **look around at the other words** ("river", "sat") to figure out the context.
> It **"attends" to the surrounding words to score how relevant they are to each
> other**.

So the meaning of a token is not fixed by the token — it is **computed from its
neighbours**, every time.

## Key points

- The output is a **relevance score between every pair of words**, which is what
  "globally" means in the Transformer's definition.
- It is the mechanism that makes the same word carry different meanings in
  different sentences, without needing a separate entry for each sense.
- **Self**-attention because the sequence attends **to itself** — not to some
  other sequence.

## Watch out for

- "Bank" as riverbank vs. financial institution is the standard exam example.
  The point is not the ambiguity; it is that **the disambiguating evidence is
  other tokens in the same input**.

## Prerequisites

[[tokens-and-embeddings]]
