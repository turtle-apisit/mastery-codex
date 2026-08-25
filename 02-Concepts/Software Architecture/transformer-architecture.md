---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Transformer Architecture
score: 0
prerequisites: []
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

# Transformer Architecture

## Summary

> The Transformer is a **neural network architecture designed to handle
> sequential data (like text) but WITHOUT processing it sequentially**.

> It looks at the words in a sentence and figures out **how they relate to each
> other globally**, making it **highly parallelizable** and exceptionally
> powerful for language.

That single sentence carries the whole trade. Earlier sequence models read left
to right, so the work could not be spread across hardware. The Transformer reads
everything at once — which buys parallelism, and immediately creates the problem
that it no longer knows what order the words were in. See
[[positional-encoding]].

**The stack, bottom to top** (from the canonical diagram):

```
Inputs ──► Input Embedding ──► + Positional Encoding
              │
              ▼
     ┌── Multi-Head Attention ──► Add & Norm
  Nx │            │
     └── Feed Forward ─────────► Add & Norm
              │
              ▼
        Linear ──► Softmax ──► Output Probabilities
```

`Nx` marks that the block is **stacked N times**, not run once.

## Key points

- "Sequential data without sequential processing" is the definition worth
  reproducing verbatim — it names both what it handles and what it refuses to do.
- Parallelism is not a side benefit; it is the reason the architecture scales to
  the model sizes that make LLMs possible.

## Watch out for

- The lecture's worked example is **"Dog bites man"**: the text is split into
  tokens — `Dog` / `bites` / `man` — before anything else happens. Order is then
  re-supplied separately, which is why "Dog bites man" and "Man bites dog" do not
  collapse into the same input.

## Prerequisites

None — this is a root concept for the subject.
