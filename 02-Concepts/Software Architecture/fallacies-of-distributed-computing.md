---
subject: Software Architecture
unit: Architecture Styles
skill_name: Fallacies of Distributed Computing
score: 0
prerequisites:
- Monolithic and Distributed Architectures
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

# Fallacies of Distributed Computing

## Summary

> *"A fallacy is something that is **believed or assumed to be true but is
> not**. All **eight** of the fallacies of distributed computing apply to
> distributed architectures today."*

| # | Fallacy | Reality |
|---|---|---|
| 1 | The network is reliable | **The network is not reliable** |
| 2 | Latency is zero | **Latency is not zero** |
| 3 | Bandwidth is infinite | **Bandwidth is not infinite** |
| 4 | The network is secure | **The network is not secure** |
| 5 | The topology never changes | **The network topology always changes** |
| 6 | There is only one administrator | **There are many network administrators, not just one** |
| 7 | Transport cost is zero | **Remote access costs money** |
| 8 | The network is homogeneous | **The network is not homogeneous** |

## Key points

- Each fallacy is an assumption you get **for free inside a monolith** — an
  in-process function call really is reliable, instant, free, and secure. Every
  one of them stops holding the moment the call crosses a network.
- The list is finite and fixed at **eight**, and exams ask you to name them in
  order.

## Watch out for

- Three further distributed-architecture problems are covered alongside them and
  are **not** in the eight: **[[distributed-logging]]**, **distributed
  transactions** (see [[eventual-consistency-and-base]]), and **[[contract-maintenance-and-versioning]]**.

## Prerequisites

[[monolithic-and-distributed-architectures]]
