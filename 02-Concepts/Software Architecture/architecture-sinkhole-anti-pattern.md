---
subject: Software Architecture
unit: Architecture Styles
skill_name: Architecture Sinkhole Anti-Pattern
score: 0
prerequisites:
- Layered Architecture Style
- Anti-Pattern
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
- class02_slides.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03 and Class 2
---

# Architecture Sinkhole Anti-Pattern

## Summary

> This anti-pattern occurs when **requests move from layer to layer as simple
> pass-through processing with no business logic performed within each layer**.

The example: the presentation layer responds to a simple request from the user to
retrieve **basic customer data** (such as name and address) — and that request
travels down through every layer and back, with each layer doing nothing but
forwarding it.

**The cost** (Class 2): it **degrades performance and increases code boilerplate
without adding value** — simple pass-through CRUD.

## Key points

- It is the **primary risk / anti-pattern of the layered architecture** in the
  comparison matrix, the way Big Ball of Mud is the monolith's.
- The name is the diagnosis: requests fall through the layers like a sinkhole and
  nothing happens on the way.
- The fix is not "remove layers" — some requests legitimately are pass-through.
  It becomes an anti-pattern when **most** of them are.

## Watch out for

- This is exactly what **open layers** exist to relieve. If a layer contributes
  nothing to a class of request, marking it **open** lets that request skip it —
  see [[layers-of-isolation]].

## Prerequisites

[[layered-architecture-style]] · [[anti-pattern]]
