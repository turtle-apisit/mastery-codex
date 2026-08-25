---
subject: Software Architecture
unit: Quality Attributes and Classic Patterns
skill_name: Blackboard Pattern
score: 0
prerequisites:
- Architectural Pattern
source:
- CH01_2_13illity_10Style 1.pdf
- LLMArchi.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH01
---

# Blackboard Pattern

## Summary

> This pattern is useful for problems **for which no deterministic solution
> strategies are known.**

**Three main components:**

- **Blackboard** — a **structured global memory** containing **objects from the
  solution space**
- **Knowledge source** — **specialized modules with their own representation**
- **Control component** — **selects, configures and executes modules**

**How it works:**

> **All the components have access to the blackboard.** Components may **produce
> new data objects that are added to the blackboard**. Components **look for
> particular kinds of data on the blackboard**, and may find these by **pattern
> matching with the existing knowledge source.**

**Usage:** **speech recognition**, **vehicle identification and tracking**,
**protein structure identification**, **sonar signals interpretation**.

## Key points

- The selection criterion is unusual and is the thing to remember: you reach for
  this pattern when **no deterministic solution strategy is known**. Every other
  pattern in the catalogue is chosen for structural reasons; this one is chosen
  because the *problem* has no known algorithm.
- Solutions are built **incrementally and opportunistically** — each knowledge
  source contributes what it can, when the blackboard's state allows it, rather
  than following a fixed sequence.
- All the usage examples are **interpretation of noisy sensor data**, where
  partial hypotheses have to be combined.

## Watch out for

- The blackboard is **shared global mutable state** — normally an anti-pattern.
  Here it is the mechanism, which is why the **control component** is a named,
  separate part: something must decide which knowledge source runs next.

## In agentic systems

The LLM deck calls this **the quintessential foundation for Multi-Agent Systems
(MAS)**.

> A centralized, global data store (the "Blackboard") maintains the
> **conversational state and execution graph**. Autonomous agents watch the
> blackboard. **When an agent sees a data state it can solve, it activates,
> performs work, updates the blackboard, and goes dormant.**

> **Why it's used:** it allows **decoupling of diverse AI models**. Agents do not
> need to know about each other; **they only interact with the shared state**.

Nothing about the pattern changed — the knowledge sources are now models, and
the blackboard holds a conversation instead of a sonar trace. Its original
selection criterion still fits: reach for it when **no deterministic solution
strategy is known**. See [[agentic-architectures]].

## Prerequisites

[[architectural-pattern]]
