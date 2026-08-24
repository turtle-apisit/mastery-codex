---
subject: Data Science and Engineering Principles
skill_name: Support Confidence and Lift
score: 0
prerequisites:
- Transactional Data and Market Basket Analysis
source:
- Association rules.pdf
last_reviewed: null
history:
- date: '2026-08-24'
  activity: capture
  delta: 0
  result: 0
  note: Captured from Association rules.pdf
---

# Support Confidence and Lift

## Summary

The three metrics that judge an association rule `X → Y`.

**Support** — *how popular is the itemset?* The fraction of all transactions that
contain the itemset.

**Confidence** — *if X, how often is Y also present?* The conditional
probability of Y given X.

**Lift** — *is the association stronger than random?*

```
Lift(X -> Y) = Confidence(X -> Y) / Support(Y)
```

Range of lift: `[0, +infinity)`.

**Reading a lift value:**

- **Lift = 1** → **no association**. X and Y co-occur exactly as often as chance
  predicts.
- **Lift > 1** → a genuine, non-coincidental relationship.
- **Lift < 1** → X and Y appear together *less* than chance.

## Key points

- The lecture's worked example: for the rule `{Bread} → {Milk}`,
  `Lift = 100% / 100% = 1`. Confidence is a perfect 100%, and the rule is still
  worthless — customers buy milk in **every** transaction regardless of bread.
- If milk's support had been lower (say 50%), the same confidence would have
  produced a lift well above 1 and a real finding.
- **This is why lift matters**: high confidence alone cannot distinguish a real
  pattern from a popular item.

## Watch out for

- "Frequent" has a precise meaning: an itemset appears in the transaction
  database **at or above a user-defined minimum support threshold**. The
  threshold is a choice you make, not a property of the data.

## Prerequisites

[[transactional-data-and-market-basket-analysis]]
