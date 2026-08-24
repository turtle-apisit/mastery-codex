---
subject: Software Architecture
skill_name: MOF Metamodeling Levels
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

# MOF Metamodeling Levels

## Summary

The **OMG Meta-Object Facility (MOF)** four-level stack, and its modern Agentic AI
counterpart.

| Meta-level | OMG traditional standard | Modern Agentic AI architecture |
|---|---|---|
| **M3** (Meta-Metamodel) | **OMG MOF Specification** | **LLM base meta-prompt & system instructions** |
| **M2** (Metamodel) | **UML Metamodel / SysML Metamodel** | **Spec Kit spec template & PlantUML BPMN syntax rules** |
| **M1** (Model) | **System PIM** (e.g. the `LoyaltyAccount` model) | **Your system specs** (`spec.md` & `.puml`) |
| **M0** (User Objects) | **Runtime instances in memory** | **Database records & executable JSON objects** |

## Key points

- Read it bottom-up to understand it: **M0 is real data**, **M1 describes that
  data**, **M2 describes what a model is allowed to look like**, **M3 describes
  what a metamodel is allowed to look like**.
- **M3 is self-describing** — that is where the stack stops, rather than
  continuing forever.
- The AI-era column makes a specific claim worth noticing: **the LLM's system
  instructions occupy M3**, the **spec template and BPMN syntax occupy M2**.
  Whatever constrains the *form* of your specs is the metamodel.

## Watch out for

- The number goes **down** as you get more concrete. M3 is the most abstract,
  M0 is the actual running data — the opposite of the CIM/PIM/PSM levels, which
  are numbered 1, 2, 3 from abstract to concrete. Mixing up the two numbering
  directions is an easy exam slip.

## Prerequisites

[[model-driven-architecture]]
