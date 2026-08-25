---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Agentic Pattern Matrix
score: 0
prerequisites:
- Agentic Architectures
- Repository Pattern for Agent Memory
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

# Agentic Pattern Matrix

## Summary

The five patterns against what each is for and what it buys.

| Architecture Style Pattern | Primary Agentic Use-Case | Core Advantage |
|---|---|---|
| **Blackboard** | Complex, opportunistic multi-agent collaboration | Asynchronous, decoupled data pooling |
| **Microkernel** | Single-agent tool integration (ReAct loops) | High plug-and-play capability for custom tools |
| **Microservices** | Hierarchical enterprise task delegation | Strict context boundaries and error isolation |
| **Event-Driven** | High-scale, long-running background tasks | Handles high latency and API rate limits gracefully |
| **Repository** | Session persistence and memory management | Prevents rapid context window overflow |

## Key points

- Read the **Core Advantage** column as the reason to choose, and the **Use-Case**
  column as the situation. Both have to match; a pattern picked on advantage
  alone will be wrong for the situation.
- **Two of the five are about surviving the LLM rather than organising it** —
  Event-Driven handles latency and rate limits, Repository handles the context
  window. Those are constraints of the technology, not of the domain.
- Blackboard and Microservices are both multi-agent, and the split between them
  is **opportunistic vs. hierarchical**: agents that watch shared state and
  activate when they can help, versus an orchestrator that decomposes and
  delegates.

## Watch out for

- This table is the most likely exam artifact in the deck: given a scenario,
  name the pattern and justify it from these two columns.

## Prerequisites

[[agentic-architectures]] · [[repository-pattern-for-agent-memory]]
