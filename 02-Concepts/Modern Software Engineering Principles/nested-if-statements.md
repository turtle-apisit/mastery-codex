---
subject: Modern Software Engineering Principles
skill_name: Nested if Statements
score: 0
prerequisites:
- Good Programming Practice
source:
- 2026-SEA601-05-Implementation_Testing_and_Maintenance.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from SEA601 Class 5
---

# Nested if Statements

## Summary

**The example problem:** a map consists of two squares. Write code to determine
whether a point on the Earth's surface lies in `map_square_1`, `map_square_2`, or
is not on the map. The slides show a **badly nested** solution 1 and an
**acceptably nested** solution 2.

**The rules:**

> A combination of **if-if** and **if-else-if** statements is usually **difficult
> to read**.

**Simplify.** The if-if combination

```
if <condition1>
    if <condition2>
```

is frequently equivalent to the single condition

```
if <condition1> && <condition2>
```

**Rule of thumb:**

> **"If statements nested to a depth of greater than three should be avoided as
> poor programming practice."**

## Key points

- The depth limit is **three**. Deeper than that is the flag.
- Note the hedge in *"frequently equivalent"* — flattening if-if into `&&` is not
  always a safe transformation. If the outer branch has an `else`, or if
  condition2 depends on condition1 being evaluated first (short-circuit
  semantics), the two forms differ.

## Watch out for

- The problem the slides name is specifically the **mixture** of if-if and
  if-else-if in one construct, not nesting on its own.

## Prerequisites

[[good-programming-practice]]
