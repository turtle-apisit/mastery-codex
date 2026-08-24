---
subject: Software Architecture
skill_name: Bounded Context
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

# Bounded Context

## Summary

> Microservices is **heavily inspired by the ideas in domain-driven design
> (DDD)**, a logical design process for software projects. One concept in
> particular from DDD — **bounded context** — decidedly inspired microservices.

> **The concept of bounded context represents a decoupling style.** When a
> developer defines a domain, that **domain includes many entities and behaviors,
> identified in artifacts such as code and database schemas**. For example, an
> application might have a domain called **CatalogCheckout**, which includes
> notions such as catalog items, customers, and payment.

> In a **traditional monolithic architecture**, developers would **share many of
> these concepts**, building **reusable classes and linked databases**. **Within a
> bounded context, the internal parts — such as code and data schemas — are
> coupled together to produce work; but they are never coupled to anything
> outside the bounded context**, such as a database or class definition from
> another bounded context. **This allows each context to define only what it needs
> rather than accommodating other constituents.**

**The city analogy.** Imagine a city with many small shops — a bakery, a
bookstore, a clothing store. Each specialises, and each is **independent with its
own inventory, staff, and operations**. Each microservice is like a
**self-contained shop**, responsible for a specific part of the application, with
**everything it needs to function independently** without relying too much on
other services. This keeps the system **flexible and scalable**.

## Key points

- The direction of coupling is the whole idea: **tightly coupled inside, never
  coupled outside**. Bounded context does not say "reduce coupling" — it says
  where coupling is allowed to exist.
- **"Define only what it needs rather than accommodating other constituents"** is
  the argument against the shared reusable class. Reuse across contexts forces
  every context to carry every other context's requirements.

## Watch out for

- This directly inverts the monolithic instinct toward reusable shared classes
  and linked databases. In microservices, **duplication across bounded contexts
  is correct**, and the shared library is the smell.

## Prerequisites

[[microservices-architecture]]
