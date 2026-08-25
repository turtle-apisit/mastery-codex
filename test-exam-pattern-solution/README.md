# Exam pattern — trial run

A sandbox for working out what an exam system here actually needs, by writing
and taking real exams by hand before building anything.

**The vault is not touched.** No `04-Exercises/`, no `05-Answers/`, no changes to
any agent file. Everything produced during the trial lives in this folder. If
the trial says a piece of the system is worth building, it gets built after —
not before.

## Why by hand first

A design already exists on paper: Vega writes exercises, Atlas commits scores,
`exercise-design` carries a five-band grading rubric, `xp-ledger` carries the
score arithmetic. None of it has ever been used on a real question with a real
answer. Building the plumbing now would lock in whatever that design got wrong,
and the cost of finding out later is a system nobody wants to use.

So: design the questions by hand, answer them for real, grade them, and record
what actually happened. The need shows up in the friction.

## The three records

| File | Holds | Written when |
|---|---|---|
| `feedback.md` | What happened while doing it — observations, not conclusions | During, immediately |
| `risk.md` | Things that could break, and what breaks if ignored | Whenever one is spotted |
| `strengths.md` | What worked, and *why* it worked | Whenever something goes well |

Each file separates two kinds of entry:

- **Baseline** — what was already known or suspected before the first exam. Fixed
  at the start, never added to afterwards.
- **Observed** — what the trial actually produced. Only this half is evidence.

That split is the whole point. Without it the final analysis just re-reads the
starting assumptions back and calls them findings.

## Working rule

Write the observation **before** interpreting it. "Took 40 minutes to write four
questions" is data. "Question authoring is too slow to do daily" is a
conclusion, and it belongs in the analysis at the end, not in the log.

## Analysis at the end

When there is enough material, the three records get read together to answer:

1. Which parts of the paper design survived contact with real use
2. Which parts were never needed
3. What was needed that nobody had designed
4. What is worth automating, and what is better left manual

Only then does anything get built.
