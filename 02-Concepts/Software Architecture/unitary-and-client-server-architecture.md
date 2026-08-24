---
subject: Software Architecture
skill_name: Unitary and Client-Server Architecture
score: 0
prerequisites: []
source:
- CH03_SEA604_SWArchStylePatterns_Rev02_2.pdf
- CH01_2_13illity_10Style 1.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH03 and CH01
---

# Unitary and Client-Server Architecture

## Summary

**Unitary architecture** — the beginning of the story:

> *"When software originated, there was only the computer, and software ran on
> it. Through the various eras of hardware and software evolution, the two
> started as a **single entity, then split** as the need for more sophisticated
> capabilities grew."*

> *"Generally, software systems tend to **grow in functionality over time**,
> requiring **separation of concerns** to maintain operational architecture
> characteristics, such as performance and scale."*

**Client/Server** — the fundamental split:

> *"A fundamental style in architecture **separates technical functionality
> between frontend and backend**, called a **two-tier**, or client/server,
> architecture. Many different flavors of this architecture exist, depending on
> the era and computing capabilities."*

Flavours named: **Desktop + Database Server**, **Browser + Web Server**, and
**Three-tier**.

**As a pattern** (CH01): the pattern consists of **two parties — a server and
multiple clients**. The server provides services to multiple client components;
clients request services and the server provides them; **the server continues to
listen to client requests**.
*Usage:* online applications such as email, document sharing and banking.

## Key points

- The driver of the whole evolution is stated once and applies everywhere:
  **functionality grows → separation of concerns is required to preserve
  performance and scale**. Every later style is another cut along that line.
- Client/server is a **two-tier** architecture. Naming the tier count is the
  usual exam handle.

## Watch out for

- The asymmetry is what distinguishes it from **[[peer-to-peer-pattern]]**: in
  client/server, roles are **fixed**. A peer can be both and can **change its role
  dynamically**.

## Prerequisites

None — this is a root concept for the subject.
