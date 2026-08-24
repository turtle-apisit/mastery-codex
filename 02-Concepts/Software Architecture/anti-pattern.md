---
subject: Software Architecture
skill_name: Anti-Pattern
score: 0
prerequisites:
- Big Ball of Mud
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

# Anti-Pattern

## Summary

> An anti-pattern is a **common response to a recurring problem** that is
> **usually ineffective and risks being highly counterproductive**.

**History.** The term was **coined in 1995 by computer programmer Andrew
Koenig**, inspired by the book *Design Patterns*, which highlighted a number of
design patterns considered highly reliable and effective. It was **popularized
three years later by the book *AntiPatterns***, which extended its use beyond
software design to refer informally to **any commonly reinvented but bad
solution to a problem**.

**Examples given:** analysis paralysis, cargo cult programming, death march,
groupthink, vendor lock-in.

## Key points

- Both halves of the definition are needed. An anti-pattern is not merely a bad
  idea — it is a bad idea that is **commonly reached for**, because it looks like
  the obvious response to a recurring problem.
- **Anti-pattern is the deliberate mirror of pattern**: a pattern is a reusable
  *good* solution to a recurring problem; an anti-pattern is the reusable *bad*
  one.

## Watch out for

- The architecture anti-patterns named in this course:
  **[[big-ball-of-mud]]** (monolithic), **[[architecture-sinkhole-anti-pattern]]**
  (layered), complex error recovery (pipeline), eventual inconsistency
  (event-driven), and data collisions / sync failures (space-based).

## Prerequisites

[[big-ball-of-mud]]
