---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: LLM Application Architecture
score: 0
prerequisites:
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

# LLM Application Architecture

## Summary

> Building an application with an LLM **requires more than just the model**.

Four layers in a robust architecture:

- **Orchestration Layer** — manages **prompts, chains of thought, and external
  API calls** (e.g. LangChain, LlamaIndex).
- **Context Management** — handles **token limits** by maintaining **short-term
  and long-term memory**.
- **Data Integration** — connects the LLM to **enterprise data via Vector
  Databases and APIs**.
- **Serving Infrastructure** — **load balancers, API gateways, and inference
  optimization** for latency and throughput.

## Key points

- This is the same claim SEA601 makes about AI-enabled software: **the model is
  the small box**, and everything around it is ordinary software engineering.
  Here that surrounding software is named layer by layer.
- **Context Management exists because of a hard constraint** — the token limit.
  It is not a feature, it is a workaround for a fixed window, and it is why the
  [[repository-pattern-for-agent-memory]] becomes structural later.

## Watch out for

- Each of the four layers is developed into its own topic further into the deck:
  data integration → [[retrieval-augmented-generation]], serving →
  [[serving-and-inference-architecture]], orchestration →
  [[agentic-architectures]], context → memory.

## Prerequisites

[[decoder-only-models-gpt]]
