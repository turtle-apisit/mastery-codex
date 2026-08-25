# Strengths

What worked, and — the part that matters — *why* it worked.

"That went well" is not usable at the end. The mechanism is what can be kept,
copied, or automated. Without it there is nothing to build on.

## Entry format

```
### S<n> · <short name>

**What worked**
The thing that went right.

**Why it worked**
The mechanism. What specifically caused it. If this cannot be named, the entry
is praise, not a finding.

**Would it survive automation?**
keep-manual / worth-building / unknown

Some things work *because* a person did them. Naming those is as valuable as
naming what should be automated — they are the parts to leave alone.
```

---

## Baseline — what the design already gets right on paper

Untested. Listed so the trial can confirm or contradict them rather than
rediscovering them as if they were new.

### S1 · Locks make question selection defensible

**What worked** The prerequisite graph decides what *can* be asked, before
anyone decides what *should* be.

**Why it works** A concept is locked until its prerequisites reach a real score,
so an exam cannot test something the learner has no grounding for. The choice is
narrowed by structure rather than by taste — 20 candidates instead of 169.

**Would it survive automation?** worth-building — it is already computed

### S2 · One writer for scores

**What worked** Only Atlas writes `score`, `status`, `history`.

**Why it works** Centralising the write removes the class of bug where two
agents disagree about a number. Every other agent hands over a result instead of
editing, so there is exactly one place where the arithmetic can be wrong.

**Would it survive automation?** worth-building

### S3 · Negative deltas for confidently wrong answers

**What worked** The rubric scores a confidently wrong answer between −5 and −10
rather than 0.

**Why it works** It treats a wrong answer as *evidence the previous score was
too high*, not as a neutral event. A scheme that floors at zero lets a wrong
mental model sit at a passing score forever.

**Would it survive automation?** unknown — depends on whether the bands can be
applied consistently, which is R1

### S4 · Notes carry a "Watch out for" section

**What worked** Every concept note ends with the traps, the exam-bait
distinctions, and the things commonly got backwards.

**Why it works** Those sections were written from the source material's own
emphasis, so they point at exactly what a question should probe. They are a
question bank that already exists without having been written as one.

**Would it survive automation?** unknown — the trial should test whether
questions built from those sections are better than questions built from the
summary

---

## Observed

What the trial actually showed to work.

<!-- newest at the top -->
