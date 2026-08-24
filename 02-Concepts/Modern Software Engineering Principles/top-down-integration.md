---
subject: Modern Software Engineering Principles
skill_name: Top-Down Integration
score: 0
prerequisites:
- Stubs and Drivers
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

# Top-Down Integration

## Summary

> If code artifact `mAbove` **sends a message to** artifact `mBelow`, then
> `mAbove` is **implemented and integrated before** `mBelow`.

One possible ordering for the 13-module example: `a` / `b,c,d` / `e,f,g` /
`h,i,j,k` / `l,m`. Another: `a` / `[a] b,e,h` / `[a] c,d,f,i` /
`[a,d] g,j,k,l,m`.

**Three advantages:**

1. **Fault isolation.** When a previously successful test case fails after
   `mNew` is added, **the fault must lie in `mNew` or the interface(s) between
   `mNew` and the rest of the product.**
2. **Stubs are not wasted.** Each stub is **expanded into the corresponding
   complete artifact** at the appropriate step.
3. **Major design flaws show up early.**

Advantage 3 rests on a distinction:

- **Logic artifacts** include the **decision-making flow of control** — in the
  example, `a, b, c, d, g, j`
- **Operational artifacts** perform the **actual operations** of the product — in
  the example, `e, f, h, i, k, l, m`

**The logic artifacts are developed before the operational artifacts**, so design
problems surface first.

## Key points

- Top-down uses **stubs**, and this is what makes advantage 2 possible — the stub
  is a placeholder that later *becomes* the real thing.

## Watch out for

**The problem:**

- **Reusable artifacts are not properly tested**
- **Lower level (operational) artifacts are not tested frequently**
- **The situation is aggravated if the product is well designed** — a
  counter-intuitive claim worth remembering

**Defensive programming (fault shielding)** makes it worse:

```
if (x >= 0)
    y = computeSquareRoot (x, errorFlag);
```

`computeSquareRoot` is **never tested with x < 0**. The caller's guard means the
callee's error path never runs — **and this has implications for reuse**, because
the next caller may not guard.

## Prerequisites

[[stubs-and-drivers]]
