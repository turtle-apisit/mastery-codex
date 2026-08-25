---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Serving and Inference Architecture
score: 0
prerequisites:
- LLM Application Architecture
- Decoder-Only Models (GPT)
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

# Serving and Inference Architecture

## Summary

> Deploying LLMs requires **specialized infrastructure** to handle massive
> compute requirements.

**KV Caching** — caching the **Key and Value tensors of past tokens** to **speed
up autoregressive generation**.

**Continuous Batching** — **dynamically grouping requests together at the token
level** to **maximize GPU utilization**.

**Quantization & LoRA** — **reducing model precision** (e.g. to **4-bit**) for
cheaper inference, and using **Low-Rank Adapters** for **efficient per-tenant
customization**.

## Key points

- **KV caching is a direct consequence of autoregression.** Because a
  decoder-only model feeds its own output back in, it would otherwise recompute
  attention over the entire prefix for every single new token. See
  [[decoder-only-models-gpt]].
- **Batching at the token level, not the request level.** Requests finish at
  different lengths, so a fixed batch would idle the GPU waiting for the slowest
  one. Continuous batching lets finished slots be refilled mid-flight.
- **LoRA is a multi-tenancy answer.** One base model, a small adapter per
  customer — instead of a full fine-tuned copy each.

## Watch out for

- All three trade something. Quantization trades **accuracy** for cost;
  continuous batching trades **per-request latency predictability** for
  throughput; KV caching trades **memory** for speed. Naming the cost, not just
  the benefit, is what a trade-off answer needs.

## Prerequisites

[[llm-application-architecture]] · [[decoder-only-models-gpt]]
