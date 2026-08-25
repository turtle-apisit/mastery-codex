---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Generative AI Pipeline
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

# Generative AI Pipeline

## Summary

**Generative AI** refers to algorithms that **generate new content** — text,
images, music — **based on the data they were trained on**. The architecture of
a generative AI system **varies widely** depending on the application and the
type of generative model used.

The end-to-end pipeline has six stages, in two halves.

**Part 1 — Data & Modeling**

1. **Data Collection and Preprocessing** — gathering massive datasets (text
   corpora, images, audio). Includes **deduplication**, **cleaning out
   toxicity/PII**, **tokenization** (for text), and **normalization**.
2. **Model Selection** — choosing the right architecture **for the modality**:
   Transformers for text, Diffusion for images, GANs for video.
3. **Model Training** — the core learning loop. Defining **loss functions**
   (cross-entropy, adversarial loss), running **massive parallel computation on
   GPUs/TPUs**, optimising with algorithms like **AdamW**.

**Part 2 — Deploy & Iterate**

4. **Model Evaluation** — automated metrics (**BLEU, ROUGE** for text; **FID**
   for images) **alongside rigorous human evaluation** (side-by-side preference
   testing) and **safety red-teaming**.
5. **Deployment & Serving** — scalable APIs, managing memory and inference speed
   (**quantization**, **KV-caching**), and designing the user interface (chat
   UI, prompt bars).
6. **Feedback Loop** — continuously collecting **real user interactions** to
   refine and align the model through **reinforcement learning or iterative
   fine-tuning**.

## Key points

- The architecture is **chosen from the modality**, not from fashion — step 2 is
  where Transformer / Diffusion / GAN is decided.
- Evaluation is **deliberately not automated alone**: metrics *plus* human
  preference testing *plus* red-teaming. Any one of the three on its own is
  presented as insufficient.

## Watch out for

- Preprocessing is where the lecture's handwritten emphasis sits: **a clean
  process without duplicated data**, and **cleaning out toxicity/PII**. That
  work happens before any model exists, and it is what the training set — the
  thing that occupies the specification's slot — is made of.

## Prerequisites

None — this is a root concept for the subject.
