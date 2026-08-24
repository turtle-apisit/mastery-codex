---
subject: Software Architecture
skill_name: Three-Tier Architecture
score: 0
prerequisites:
- Unitary and Client-Server Architecture
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03
---

# Three-Tier Architecture

## Summary

> An architecture that became quite popular during the **late 1990s**, providing
> **even more layers of separation**.

As tools like **application servers** became popular in Java and .NET, companies
started building even more layers in their topology:

- A **database tier** using an industrial-strength database server
- An **application tier** managed by an application server
- A **frontend** coded in generated HTML and, increasingly, **JavaScript** as its
  capabilities expanded

> The three-tier architecture corresponded with **network-level protocols** such
> as **CORBA (Common Object Request Broker Architecture)** and **DCOM
> (Distributed Component Object Model)** that facilitated building **distributed
> architectures**.

## Key points

- Three-tier is the point where the split stops being about *where the code runs*
  and starts being about *distribution* — CORBA and DCOM exist to let tiers on
  different machines call each other.
- The progression to hold: **unitary → two-tier (client/server) → three-tier →
  distributed styles**. Each step adds separation to preserve performance and
  scale.

## Watch out for

- Three-tier is a **deployment** topology (three physical tiers). **Layered
  architecture** is a **logical** organisation. They frequently coincide, which is
  why the terms get used interchangeably — but layered architecture with all
  layers in one deployment unit is still monolithic.

## Prerequisites

[[unitary-and-client-server-architecture]]
