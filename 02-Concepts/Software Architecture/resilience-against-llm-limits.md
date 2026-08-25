---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Resilience Against LLM Limits
score: 0
prerequisites:
- LLM Application Architecture
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

# Resilience Against LLM Limits

## Summary

> Third-party LLM APIs (like OpenAI or Anthropic) have **unpredictable latency
> and strict rate limits**. Architecting for resilience is **mandatory**.

**Circuit Breaker Pattern** — if the LLM API throws **consecutive timeouts**,
the circuit **"opens"** and **immediately returns a friendly error** to the user
**rather than hanging indefinitely**.

**Exponential Backoff & Retries** — on **HTTP 429 (Too Many Requests)**, the
system **waits briefly, then retries with exponentially increasing delays**.

**Asynchronous Queuing** — long-running or low-priority prompts are placed in a
**message broker (Kafka, RabbitMQ)** and **processed when API capacity frees
up**.

**Fallback Models** — if the primary advanced model fails, the system
**automatically routes the query to a faster, cheaper, locally-hosted model**.

## Key points

- Each control answers a **different** failure: the API is down (circuit
  breaker), you are being throttled (backoff), you have more work than capacity
  (queuing), the model is unavailable (fallback). They are not alternatives.
- **A friendly error beats an indefinite hang.** That is the circuit breaker's
  whole argument, and it is a statement about user experience as much as
  reliability.

## Watch out for

- The dependency here is **external and outside your control** — a third party's
  latency and quota. That is what makes resilience mandatory rather than
  defensive: you cannot fix the upstream, only survive it.
- Fallback models trade **quality for availability**. Answering with a weaker
  model is a product decision, not purely a technical one.

## Prerequisites

[[llm-application-architecture]]
