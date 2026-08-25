---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Agentic Architectures
score: 0
prerequisites:
- RAG as a Pipe-and-Filter Pipeline
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

# Agentic Architectures

## Summary

> While simple RAG systems map to a **linear Pipe-and-Filter design**, Agentic
> Architectures **reject linear data flows entirely**.

> Instead, they shift the paradigm toward **loops, state maintenance, and dynamic
> orchestration**.

> Depending on whether you are analyzing **a single autonomous agent** or **a
> network of multiple agents**, agentic systems heavily lean on **five classic
> software architecture style patterns**.

**The five:**

| # | Pattern | Where it fits |
|---|---|---|
| 1 | **Blackboard** | Multi-agent systems — see [[blackboard-pattern]] |
| 2 | **Microkernel / Plug-in** | Single-agent tool use — see [[microkernel-architecture-style]] |
| 3 | **Service-Oriented / Microservices** | Enterprise task delegation — see [[microservices-architecture]] |
| 4 | **Event-Driven** | Long-running background work — see [[event-driven-architecture-style]] |
| 5 | **Repository** | Agent memory — see [[repository-pattern-for-agent-memory]] |

## Key points

- **Three properties separate agentic from linear**: loops (it can repeat),
  state (it remembers between steps), dynamic orchestration (the sequence is
  decided at runtime, not fixed at design time). A pipeline has none of the
  three.
- **Not one of the five patterns is new.** Four already exist in this vault from
  the architecture styles deck, taught with no reference to AI at all. That is
  the point the lecture is making: agentic systems are assembled from the
  existing catalogue.

## Watch out for

- The single-agent / multi-agent split decides which pattern applies. Microkernel
  is the single-agent answer; Blackboard and Microservices are the multi-agent
  ones. Reaching for a multi-agent pattern to solve a single-agent problem is the
  standard over-engineering here.

## Prerequisites

[[rag-as-a-pipe-and-filter-pipeline]]
