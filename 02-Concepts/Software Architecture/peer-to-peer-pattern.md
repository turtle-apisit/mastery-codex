---
subject: Software Architecture
unit: Quality Attributes and Classic Patterns
skill_name: Peer-to-Peer Pattern
score: 0
prerequisites:
- Architectural Pattern
source:
- CH01_2_13illity_10Style 1.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA604 CH01
---

# Peer-to-Peer Pattern

## Summary

> In this pattern, individual components are known as **peers**. Peers may
> **function both as a client**, requesting services from other peers, **and as a
> server**, providing services to other peers.

> A peer may act as a client, or as a server, or as both, **and it can change its
> role dynamically with time.**

**Usage:**

- **File-sharing networks** such as Gnutella and G2
- **Multimedia protocols** such as P2PTV and PDTP
- **Cryptocurrency-based products** such as Bitcoin and Blockchain

## Key points

- The defining property is **dynamic role change**. Not merely "a component can
  do both" — it can **switch which one it is doing over time**.
- This is the direct contrast with **[[unitary-and-client-server-architecture]]**,
  where roles are **fixed**: a server is always a server.
- There is **no central coordinator**, which makes it structurally similar to
  choreography and to the EDA broker topology — and it inherits the same
  weakness: no global view of what is happening.

## Watch out for

- The examples span three eras (file sharing, streaming protocols, blockchain),
  which is worth noticing: the pattern keeps reappearing whenever the goal is
  **no central authority**, not merely decentralised computing.

## Prerequisites

[[architectural-pattern]]
