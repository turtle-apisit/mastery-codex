---
subject: Software Architecture
unit: Generative AI and LLM Architecture
skill_name: Agentic Actions and Auditability
score: 0
prerequisites:
- Agentic Architectures
- Microkernel Architecture Style
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

# Agentic Actions and Auditability

## Summary

> When an AI Assistant **takes actions** (like drafting contracts or sending
> emails), **trust and compliance are paramount**.

**Tool Orchestration (Microkernel)** — the LLM uses a **strict interface (like
Function Calling)** to **request** an action. The **actual execution happens
safely inside a deterministic sandbox, not inside the LLM itself**.

**Human-in-the-Loop (HITL)** — **high-risk actions generate an approval ticket
rather than executing immediately**.

**Event Sourcing & Audit Logs** — **every action taken by the AI is recorded in
an immutable, append-only log**. This provides a **mathematically verifiable
audit trail** of ***why*** the AI took an action and ***what*** context it used
to make the decision.

## Key points

- **Request and execute are separated on purpose.** The model proposes; a
  deterministic sandbox disposes. The probabilistic component never holds the
  capability to act directly.
- HITL is applied **by risk**, not to everything — an approval gate on every
  action would make the assistant useless.
- The audit log answers **why** and **with what context**, not merely *what
  happened*. For a system whose behaviour was learned rather than written, the
  inputs to a decision are the only explanation available.

## Watch out for

- This is the direct answer to SEA601's **broken defect report**: *"the
  prediction was wrong for me"* has no reproducible case. An append-only record
  of the context behind each action is what makes such a complaint investigable
  at all.

## Prerequisites

[[agentic-architectures]] · [[microkernel-architecture-style]]
