---
subject: Software Architecture
unit: Model-Driven Architecture
skill_name: Contract-First Development
score: 0
prerequisites:
- CIM PIM and PSM
source:
- class02_slides.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 Class 2
---

# Contract-First Development

## Summary

> **MDA principles are thriving today under new names across the industry.**

Four modern instances of the same PIM → PSM idea:

**1. OpenAPI / Swagger (REST contracts)** — write a **YAML specification (the
PIM)**, then **generate client SDKs and server stubs (the PSMs)** using
`openapi-generator` or Agentic AI.

**2. Protocol Buffers / gRPC (RPC contracts)** — write a **`.proto` schema (the
PIM)**, then **compile via `protoc`** into C++, Java, Go, and Python stubs.

**3. GraphQL schemas** — define the **Schema Definition Language (SDL)**, then
**auto-generate TypeScript types and resolver signatures**.

**4. SpecKit + PlantUML BPMN (AI-native system contracts)** — technology-agnostic
textual specs and process flows serving as **inputs for AI code generators**.

## Key points

- Every one of these has the same shape: **one technology-agnostic artifact, many
  generated technology-specific ones**. That is the PIM → PSM transformation
  under a different name.
- This is the answer to *"is MDA dead?"* — the OMG-era **tooling** died, the
  **idea** is now industry default.

## Watch out for

- The distinguishing feature of item 4 is that its contract is **prose plus
  diagrams**, not a schema. OpenAPI and `.proto` describe **interfaces**; SpecKit
  + BPMN describe **behaviour and workflow**, which is a strictly larger thing to
  specify.

## Prerequisites

[[cim-pim-and-psm]]
