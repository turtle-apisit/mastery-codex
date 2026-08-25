---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Multi-Head Attention
score: 0
prerequisites:
- Self-Attention
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

# Multi-Head Attention

## Summary

> Instead of looking at the sentence in just one way, the model has **multiple
> "heads"** — think of them as **different readers**.

The lecture's three examples of what heads specialise in:

- one head might focus on **grammar** (verbs vs nouns)
- another on the **emotional tone**
- another on **pronoun references** (who "he" refers to)

## Key points

- Heads run **in parallel over the same input**, each producing its own set of
  relevance scores; the results are combined.
- The reason it exists: one attention pass forces a single notion of "relevant",
  and relevance is not one thing. Grammar-relevant and tone-relevant are
  different questions about the same sentence.

## Watch out for

- The heads are **not** told what to specialise in. The division of labour is
  learned, and the grammar/tone/pronoun split is an illustration of what tends to
  emerge, not a configuration.

## Prerequisites

[[self-attention]]
