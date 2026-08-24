---
subject: Software Architecture
skill_name: Transformation Engines and Agentic AI
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

# Transformation Engines and Agentic AI

## Summary

**1. Traditional MDA (OMG 2001 era).** Used rigid, rule-based transformation
languages:

**OMG QVT (Query / View / Transformation)** — the **theoretical OMG standard**
defining how model transformations must be structured. Consists of **Query**
(filtering model elements), **View** (simplified model views), and
**Transformation** (mapping rules).
*Analogy: **the "theoretical specification and rulebook" on paper**.*

**ATL (ATLAS Transformation Language)** — the **practical DSL and compiler** built
on the **Eclipse Modeling Framework (EMF)**. Developers wrote complex declarative
rules, e.g. `rule Class2Table { from c: UML!Class to t: Relational!Table ... }`.
*Analogy: **writing a custom compiler frontend for every stack migration**.*

**Mechanism:** hardcoded AST rewriting scripts parsed **XMI/UML** models and
generated code templates via Eclipse EMF.
**Bottlenecks:** **extreme complexity, steep learning curve, fragile toolchains,
and massive maintenance overhead** when technology stacks evolved.

**2. Agentic AI era (2024–2026).**

> **Agentic AI acts as the Transformation Engine** — e.g. Google Antigravity,
> Claude Code, GitHub Copilot Workspace, Devin.

> **Mechanism:** AI reads **text-based PIMs** (SpecKit + PlantUML BPMN) alongside
> **Architecture Decision Records (ADRs)** and **directly synthesizes target PSMs
> and source code.**

**The mapping of legacy MDA elements to AI-native tools:**

| Legacy MDA element | Modern replacement | Why it works better |
|---|---|---|
| **PIM** | Spec Kit `spec.md` + PlantUML BPMN | **Markdown + plain text**: human-reviewable by the business, and **natively understood by LLMs without heavy XMI parsers** |
| **QVT / ATL rules** | **ADR** (Architecture Decision Record) | Defines technical decisions, constraints, and conventions **as prompt context for AI** |
| **Transformation engine** | **Agentic AI** (Antigravity / Codex) | Translates PIM + ADR directly into runnable code **across any target stack without writing custom AST scripts** |
| **Determinism enforcement** | **BPMN + linters + auto-testing** | PlantUML BPMN **eliminates flow ambiguity**; test suites verify AI output compliance |

**Mitigating non-determinism — the trade-off challenge:**

- **ATL/QVT: 100% deterministic** — a rule-based compiler always produces
  **byte-identical output**
- **Agentic AI: probabilistic** — LLMs **may introduce structural variance across
  generations**

**The four-part architectural mitigation strategy:**

1. **PlantUML BPMN diagrams** — formally **lock down execution sequences,
   decision gateways (if/else), error branches, and state boundaries** to remove
   logic ambiguity
2. **Spec Kit specifications** — numbered `FR-xxx` requirements with
   **Given/When/Then acceptance scenarios**, each **individually verifiable
   against generated code**
3. **Architecture Decision Records (ADRs)** — explicit rules such as naming
   conventions, package structure, ORM frameworks
4. **Automated safety nets** — wrap AI generation in **automated linters, static
   type-checkers (`tsc`, `javac`), and unit test runners**

**Trade-off analysis:**

| Dimension | Traditional MDA (QVT/ATL) | AI-Driven MDA |
|---|---|---|
| Learning curve | **Extremely steep** (niche DSLs) | **Low** (Markdown, YAML, PlantUML, natural language) |
| Tooling overhead | Heavy, fragile Eclipse EMF toolchains | Lightweight text files & standard AI CLI agents |
| Flexibility | **Rigid**; new stacks require new ATL rules | **High**; changing stacks requires updating an **ADR file** |
| Determinism | **100% deterministic** | **Probabilistic**; requires BPMN + linters + auto-tests |

## Key points

- The **only** dimension where traditional MDA wins is **determinism** — and the
  four mitigations exist entirely to close that one gap.
- The prompt used in the worked example is worth knowing: *"Act as an MDA Model
  Transformation Engine. Read the PIM specification, the PlantUML BPMN workflow,
  and enforce the rules in `ADR-001.md`… **Every generated artifact must trace
  back to a numbered FR**."*
- In Spec Kit terms the pipeline is: `/specify` → `spec.md` (the PIM) → `/plan` →
  `plan.md` + `data-model.md` (**where concrete types first appear**) → `/tasks`
  → `/implement` (the PSM).

## Watch out for

- The **determinism** claim about ATL/QVT is **byte-identical output**, which is a
  stronger property than "correct". An AI-generated PSM can be correct and still
  differ between runs — which is why the mitigations verify **behaviour** (tests,
  BPMN conformance) rather than text.

## Prerequisites

[[cim-pim-and-psm]]
