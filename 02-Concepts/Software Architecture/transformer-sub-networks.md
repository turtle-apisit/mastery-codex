---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Transformer Sub-Networks
score: 0
prerequisites:
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

# Transformer Sub-Networks

## Summary

What sits around the attention layer inside each block.

**Feedforward Neural Networks**

> Once the attention mechanism figures out **how words relate to each other**,
> the information is passed through a traditional feed-forward network. Think of
> this as the **"thinking" phase** where the model **digests the context and
> extracts deeper patterns** from it.

So attention decides *what is relevant*; the feedforward network decides *what
that means*.

**Layer Normalization & Residual Connections**

> Training deep neural networks is like **playing a long game of telephone** —
> the signal can get lost or blow up.

- **Residual connections** provide a **shortcut for the original data to bypass
  complex layers**, ensuring the core message isn't lost.
- **Layer normalization** keeps the numerical data **stable and within a healthy
  range** so the network learns smoothly.

## Key points

- Both exist to make **depth survivable**. Neither adds capability; they protect
  the signal as it passes through a stack repeated N times.
- The two failure modes named are opposite and both fatal: the signal **lost**
  (vanishing) or **blown up** (exploding). Residuals address the first,
  normalisation the second.
- In the diagram these appear as the repeated **Add & Norm** boxes — "Add" is the
  residual, "Norm" is the layer normalisation.

## Watch out for

- The telephone analogy is about **depth**, not sequence length. It is the number
  of stacked blocks that degrades the signal, not the number of tokens.

## Prerequisites

[[multi-head-attention]]
