---
subject: Software Architecture
skill_name: Interpreter Pattern
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

# Interpreter Pattern

## Summary

> This pattern is used for designing a component that **interprets programs
> written in a dedicated language**. It mainly specifies **how to evaluate lines
> of programs**, known as **sentences or expressions** written in a particular
> language.

> **The basic idea is to have a class for each symbol of the language.**

**Usage:**

- **Database query languages** such as **SQL**
- **Languages used to describe communication protocols**

## Key points

- **One class per symbol of the language** is the structural rule, and it is what
  makes the pattern recognisable.
- The pattern is about a **dedicated language** — a DSL — not general-purpose
  language implementation.
- Compare with **[[pipeline-architecture-style]]**, whose canonical example is a
  **compiler toolchain** (lexical analysis → parsing → semantic analysis → code
  generation). Pipeline describes the **stages of processing** a language;
  interpreter describes **the structure of the evaluator** itself.

## Watch out for

- Because there is a class per symbol, the pattern **scales badly with grammar
  size**. It fits small, stable DSLs; it does not fit a large evolving language.

## Prerequisites

[[architectural-pattern]]
