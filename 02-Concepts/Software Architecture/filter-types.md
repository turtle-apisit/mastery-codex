---
subject: Software Architecture
skill_name: Filter Types
score: 0
prerequisites:
- Pipeline Architecture Style
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

# Filter Types

## Summary

**Four types of filter**, and two of them have functional-programming twins.

**Producer** — the **starting point** of a process. **Outbound only**. Sometimes
called the **source**.

**Transformer** — accepts input, **optionally performs a transformation** on some
or all of the data, then forwards it to the outbound pipe.
→ **Functional advocates will recognize this as `map`.**

**Tester** — accepts input, **tests one or more criteria**, then **optionally
produces output based on the test**.
→ **Functional programmers will recognize this as similar to `reduce`.**

**Consumer** — the **termination point** for the pipeline flow. Consumers
sometimes **persist the final result to a database**, or **display the final
results on a user interface screen**.

**The Kafka example.** **Apache Kafka** is a framework implementation of a
software bus using **stream-processing** — open source, from the Apache Software
Foundation, written in **Scala and Java**, aiming to provide a **unified,
high-throughput, low-latency platform for handling real-time data feeds**. It
connects to external systems via **Kafka Connect** and provides **Kafka Streams**,
a Java stream processing library. It uses a **binary TCP-based protocol**
optimized for efficiency, relying on a **"message set" abstraction** that groups
messages together to reduce network round-trip overhead — this *"leads to larger
network packets, larger sequential disk operations, contiguous memory blocks
[…] which allows Kafka to turn a bursty stream of random message writes into
linear writes."*

In the course example, a **Service Info Capture** filter (a **producer** filter)
subscribes to the Kafka topic and receives service information, then sends the
captured data to a **tester** filter called **Duration Filter**, which determines
whether the captured data relates to the duration (in milliseconds) of the
service request.

## Key points

- The `map` / `reduce` mapping is the memory hook: **transformer = map**,
  **tester = reduce**.
- Every pipeline has exactly one **producer** at the start and one **consumer** at
  the end; transformers and testers are the interchangeable middle.

## Watch out for

- **Tester filters produce output *optionally*.** A pipeline stage that can drop
  its input is why error recovery is complex — data can vanish without an error.

## Prerequisites

[[pipeline-architecture-style]]
