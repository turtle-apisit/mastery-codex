---
subject: Software Architecture
skill_name: API Layer and Service Mesh
score: 0
prerequisites:
- Microservices Architecture
source:
- CH03_2_SEA604Microservices.pptx
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from the SEA604 Microservices deck (text extracted from pptx)
---

# API Layer and Service Mesh

## Summary

**API layer.** In the city of shops, there might be a **central directory or
information desk** to make it easier for customers to find what they need. That
is the API layer: **a place where you can find information about the different
services and how to interact with them.**

> While an API layer can be helpful, **it is not meant to do all the work**. **The
> main logic and functionality should be inside the individual microservices.** If
> you start putting **too much logic into the API layer**, it can **become a
> single point of failure** and make your system **less flexible**.

**Operational reuse.** Some things are **common to all shops** — like fire safety
regulations or waste management. These are **operational concerns**: important for
the overall system, but **they don't necessarily need to be implemented
differently for each shop**.

> One way to handle these concerns is to **have a central team or platform that
> provides these services to all the microservices**, ensuring **consistency and
> efficiency**. However, **it is important to avoid making the microservices too
> dependent on this central platform, as that could create a single point of
> failure.**

**Service mesh and the sidecar pattern.** The **sidecar pattern** attaches an
operational component alongside each service; the **service plane connects the
sidecars** into a **service mesh**.

> Each service forms a **node in the overall mesh**. **The service mesh forms a
> console that allows teams to globally control operational coupling** — such as
> monitoring levels, logging, and **other cross-cutting operational concerns**.

## Key points

- The same warning appears twice — for the API layer and for the central
  operational platform — and it is the same warning: **any shared central
  component risks becoming a single point of failure** and eroding the decoupling
  the style exists for.
- The service mesh is the accepted answer to operational reuse because it
  controls **operational coupling** (logging, monitoring) while leaving **domain
  coupling** untouched.

## Watch out for

- Distinguish the two kinds of coupling. Sharing **business logic** centrally
  violates bounded context; sharing **operational concerns** through a mesh does
  not.

## Prerequisites

[[microservices-architecture]]
