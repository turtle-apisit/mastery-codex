---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Key Generative Models
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

# Key Generative Models

## Summary

Four families, each with a job it is best at.

**Generative Adversarial Networks (GANs)** — a **generator and a discriminator
competing**. *Great for realistic images and video.*

**Variational Autoencoders (VAEs)** — a **probabilistic representation of input
data in a latent space**. *Good for data reconstruction.*

**Diffusion Models** — generate data by **gradually transforming noise into
structured data**. **State-of-the-art for high-fidelity images.**

**Transformers** — based on **self-attention**. **The core architecture behind
modern Large Language Models (LLMs).**

## Key points

- The mechanism is the discriminator: GANs compete, VAEs compress into a latent
  space, Diffusion denoises, Transformers attend.
- Pairing model to modality is the whole point of the slide, and it is the same
  decision as step 2 of the [[generative-ai-pipeline]].

## Watch out for

- Diffusion has displaced GANs for still images while GANs remain listed for
  video — "newest wins everywhere" is not what the slide says.
- Only the Transformer row leads anywhere else in this deck. Everything from
  here on is about that one family.

## Prerequisites

None — this is a root concept for the subject.
