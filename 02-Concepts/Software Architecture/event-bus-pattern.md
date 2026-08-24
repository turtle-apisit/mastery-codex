---
subject: Software Architecture
skill_name: Event-Bus Pattern
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

# Event-Bus Pattern

## Summary

> This pattern primarily deals with **events** and has **4 major components**:

1. **Event source**
2. **Event listener**
3. **Channel**
4. **Event bus**

> **Sources publish messages to particular channels on an event bus. Listeners
> subscribe to particular channels. Listeners are notified of messages that are
> published to a channel to which they have subscribed before.**

**Usage:** **Android development**, **notification services**.

## Key points

- The **channel** is the discriminating component. Without channels this would be
  a plain broadcast; channels are what make it **selective publish/subscribe**.
- Note the tense in *"to which they have subscribed **before**"* — a listener
  receives only messages published **after** it subscribes. Events are not
  replayed to late subscribers.
- This is the **CH01 pattern-catalogue** version of what the CH03 deck develops in
  depth as the **[[event-driven-architecture-style]]**: source ≈ event producer,
  channel ≈ event channel, listener ≈ event consumer.

## Watch out for

- Compare with the [[broker-pattern]]: a **broker maintains a registry and
  redirects clients to services** (request/response). An **event bus** delivers
  published messages to subscribers, and the publisher **never learns who
  received them**.

## Prerequisites

[[architectural-pattern]]
