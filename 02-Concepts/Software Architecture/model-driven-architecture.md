---
subject: Software Architecture
unit: Model-Driven Architecture
skill_name: Model-Driven Architecture
score: 0
prerequisites: []
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

# Model-Driven Architecture

## Summary

> **"Technology Fades, Business Rules Persist."**

**The tech churn reality.**

> Frameworks, languages, and databases **change every 3 to 5 years** —
> SOAP → REST → GraphQL; Spring Boot 2 → Spring Boot 3; SQL → NoSQL → Vector DBs.
> **Business domain rules** (insurance claim validation, loyalty tier
> calculation) **remain valid for decades**.

**The core problem.**

> Traditional development **entangles enduring business logic with volatile
> technology implementations**, forcing **expensive complete rewrites**.

**What MDA is.** An initiative defined by the **Object Management Group (OMG) in
2001**.

> **Core philosophy:** software development should be **driven by formal models
> rather than hand-crafted source code tied to specific platforms**.

**Three key objectives:**

1. **Decouple business logic from underlying technical infrastructure**
2. **Automate the creation of platform-specific code** via systematic
   transformations
3. **Preserve core business assets across technology generations**

## Key points

- The 3-to-5-year churn figure versus "valid for decades" is the whole
  motivation, and it is the number worth quoting.
- MDA is a **decoupling strategy applied across time** rather than across
  components — the same instinct as bounded context, aimed at technology
  generations instead of domains.

## Watch out for

- MDA is not a dead 2001 standard. **MDA principles are thriving today under new
  names** — see [[contract-first-development]].

## Prerequisites

None — this is a root concept for the subject.
