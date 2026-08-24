---
subject: Data Science and Engineering Principles
skill_name: Apriori Algorithm
score: 0
prerequisites:
- Support Confidence and Lift
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

# Apriori Algorithm

## Summary

Presented by **Rakesh Agrawal and Ramakrishnan Srikant in 1994**, Apriori finds
frequently occurring itemsets and produces association rules from them.

**The Apriori property** is what makes it efficient:

> If an itemset is frequent, then **all of its subsets must also be frequent**.

If `{Bread, Butter, Milk}` is frequent, then `{Bread, Butter}`, `{Butter, Milk}`,
`{Bread, Milk}`, `{Bread}`, `{Butter}` and `{Milk}` must all be frequent too.

And **contrapositively** — this is the half that does the actual work:

> If an itemset is **infrequent**, then **all of its supersets must also be
> infrequent**.

So if `{Beer, Chips}` is found infrequent, the algorithm can immediately
**prune** every larger itemset containing it, without ever counting them.

**The two steps:**

1. **Find frequent itemsets** — grow itemsets by size, pruning as you go. Stop
   when no itemset of the next size clears minimum support. In the worked
   example the search stops at 2-itemsets, because `{milk, bread, eggs}` appears
   only in T2 = 1/3 = 33.33% support, below the 50% threshold.
2. **Generate association rules** from the frequent itemsets found.

## Key points

- **Rules from an n-itemset must use every item in it.** From the frequent
  itemset `{Milk, Bread, Butter}` there are **six** possible rules, and
  `{Milk} → {Bread}` is **not** one of them — Butter is missing. All items must
  appear on the left or the right, none may be dropped, and both sides must be
  non-empty.
- You may legitimately **stop at 2-itemsets** even when larger frequent itemsets
  exist — you are then choosing to extract only pairwise relationships. Go to
  3-itemsets when you need more complex bundles.

## Watch out for

- The pruning direction is the exam trap. Frequent → subsets frequent is the
  stated property; infrequent → supersets infrequent is the contrapositive, and
  it is the one the algorithm actually applies.

## Prerequisites

[[support-confidence-and-lift]]
