---
subject: Software Architecture
unit: Quality Attributes and Classic Patterns
skill_name: Broker Pattern
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

# Broker Pattern

## Summary

> This pattern is used to **structure distributed systems with decoupled
> components**. These components **interact with each other by remote service
> invocations**. **A broker component is responsible for the coordination of
> communication among components.**

**The mechanism:**

> **Servers publish their capabilities** (services and characteristics) **to a
> broker**. **Clients request a service from the broker**, and **the broker then
> redirects the client to a suitable service from its registry.**

**Usage:** message broker software such as **Apache ActiveMQ, Apache Kafka,
RabbitMQ, and JBoss Messaging**.

## Key points

- The broker holds a **registry** of published capabilities — this is what lets
  clients find services **without knowing about them in advance**, which is the
  decoupling the pattern buys.
- Note the redirect: the broker **points the client at a suitable service**
  rather than necessarily proxying every message.
- Same idea, larger scale: the **plug-in registry** in
  [[plug-in-components-and-registry]] does the same job inside a microkernel, and
  the slides name **Apache ZooKeeper and Consul** there.

## Watch out for

- **Do not confuse this with [[broker-topology]] in event-driven architecture.**
  The names overlap and the meanings differ:
  - **Broker *pattern*** — a broker component **coordinates** communication and
    maintains a service registry
  - **Broker *topology*** (EDA) — there is **no central mediator**; messages
    flow through a **lightweight message broker** in a chain-like broadcast

  The EDA broker is deliberately dumb; the broker pattern's broker is the
  coordinator.

## Prerequisites

[[architectural-pattern]]
