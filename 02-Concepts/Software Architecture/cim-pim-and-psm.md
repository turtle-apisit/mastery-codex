---
subject: Software Architecture
skill_name: CIM PIM and PSM
score: 0
prerequisites:
- Model-Driven Architecture
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

# CIM PIM and PSM

## Summary

MDA structures software specification into **3 levels of abstraction**.

**Level 1 — CIM (Computation Independent Model)**

- **Focus:** the **business domain and operational environment**
- **Audience:** Business Analysts, Domain Experts, Product Owners
- Uses **domain-specific language (Ubiquitous Language)**
- **Completely ignorant of IT systems, databases, or programming languages**
- **Answers:** *"What business problem are we solving?"*
- **Artifacts:** business policy documents, plain language use cases, value
  stream maps, domain glossaries

**Level 2 — PIM (Platform Independent Model)**

- **Focus:** software system structure and **precise business workflows**
- **Audience:** Software Architects, Lead Engineers
- **100% technology agnostic** — **no references to SQL, Java, REST, Docker, or
  cloud providers**
- **Answers:** *"What software structures and workflows satisfy the business
  rules?"*
- **Modern artifacts:** **Structured Specifications** (Spec Kit `spec.md`,
  OpenAPI, AsyncAPI) — numbered, testable requirements and invariants; and
  **PlantUML BPMN diagrams** — formal workflow decision gateways, state machines,
  sequence logic

**Level 3 — PSM (Platform Specific Model)**

- **Focus:** mapping the PIM to a **concrete technology stack**
- **Audience:** Software Engineers, DBAs, System Integrators
- **Enriches the PIM** with platform-specific constructs, annotations, and schemas
- **Bound to specific frameworks** — Spring Data JPA, Hibernate, Mongoose,
  ASP.NET Core
- **Answers:** *"How does this software execute on our chosen platform?"*
- **Artifacts:** SQL DDL scripts, Mongoose schemas, JPA annotated classes, REST
  controller implementations

## Key points

- The three "answers" questions are the fastest discriminator:
  **CIM = what problem · PIM = what structures · PSM = how it executes.**
- Each level has a **different audience**, and that is why the levels exist — the
  same reason SEA601 separates requirements from analysis.

## Watch out for

**The Coffee Shop Loyalty Points worked example runs end to end and is the most
likely exam material.**

**CIM (pure domain language — no software terms, databases, servers, or APIs):**

1. **Point earning:** 1 loyalty point for every **$10** spent
2. **Tier upgrades:** Standard (default) **1.0x**; Gold (**≥100** points) **1.5x**;
   Platinum (**≥300** points) **2.0x**
3. **Point redemption:** **10 points → $1 discount** on future orders
4. **Expiration:** unused points expire **12 months** after the transaction date

**PIM Part 1 — Spec Kit `spec.md`** (produced by Spec Kit's `/specify` command).
Spec Kit specs are **Markdown, not schemas**. The template mandates: **User
Scenarios** (primary story + Given/When/Then acceptance scenarios); **Functional
Requirements** numbered `FR-001…`, each testable and written in **MUST** form;
**Key Entities** described in **business prose** (no types, no keys, no tables);
**`[NEEDS CLARIFICATION: ...]` markers** wherever the CIM was ambiguous; and a
**Review Checklist gate** — *"no implementation details (language, framework,
API)"*.

> The spec is **written for the business reviewer, not the compiler**. **Structure
> comes from the template; precision comes from the FR numbering.**

Sample requirements: **FR-001** award 1 point per $10 spent, before multipliers ·
**FR-002** apply the tier multiplier, **rounding down** to whole points ·
**FR-003** promote to GOLD at ≥100 and PLATINUM at ≥300 · **FR-004** allow
redemption of 10 points for $1 · **FR-005** reject redemptions exceeding the
balance · **FR-006** expire unused points 12 months after the earning transaction
· **FR-007** retain a permanent, auditable history of every earning, redemption
and expiration event.

Key entities in prose: **Customer**, **Loyalty Account** (usable point balance +
current tier), **Transaction** (what kind — earn/redeem/expire — how much, and
when).

Edge cases: points **rounded down**; **cannot redeem more than the balance**;
**tier re-evaluated after every balance change** — with a genuine
`[NEEDS CLARIFICATION: does a tier ever downgrade when points expire? — assumed
NO for v1]`.

**PIM Part 2 — PlantUML BPMN workflow** encoding the multiplier branch, the
balance update, the tier upgrade thresholds, and the transaction record with
`expiresAt = timestamp + 12 months`.

**PSM — dual stacks generated from the same PIM:**

| Aspect | Stack A (Java + PostgreSQL) | Stack B (Node.js + MongoDB) |
|---|---|---|
| Data paradigm | Relational tables & foreign keys | Document model with embedded sub-docs |
| Type safety | Static compile-time (Java) | Static dev-time (TypeScript interface) |
| Persistence | JPA ORM annotations (`@Entity`) | Mongoose schema definitions |
| Execution | JVM synchronous / thread-pool | Event loop asynchronous |
| **What remained equal?** | **Core PIM specs, PlantUML BPMN workflows, and tier multiplier rules** | |

> **Architectural takeaway: technology details changed 100%, but the PIM blueprint
> remained pristine, untouched, and fully deterministic.**

## Prerequisites

[[model-driven-architecture]]
