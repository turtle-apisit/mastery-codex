# Feedback log

What actually happened while designing, taking, and grading exams by hand.

**Record the observation before interpreting it.** "Writing four questions took
40 minutes" is data. "Authoring is too slow for daily use" is a conclusion —
that belongs in the final analysis, not here.

## Entry format

```
### YYYY-MM-DD · <phase> · <one-line title>

**What happened**
Plain description of the event. No judgement.

**Friction / Worked well / Neutral**
Which of the three, in one word.

**Might mean**
Optional. A hunch, clearly marked as a hunch. Leave blank if there isn't one.
```

Phases: `design` (writing questions) · `answer` (taking it) · `grade` (marking
it) · `review` (looking back at a past exam)

---

## Baseline — what was known before the first exam

Fixed at the start. Nothing gets added here once the trial begins; new material
goes under Observed.

### Only 20 of 169 concepts are reachable

149 concepts are locked behind prerequisites that have never been scored, so the
first exams can only draw from 20. The locked set is not evenly spread either —
Software Architecture has 9 open of 75.

### The prerequisite graph makes some questions worth far more than others

Passing `Architectural Pattern` opens 10 further concepts. Passing
`Architecture Quality Attributes` or `Generative AI Pipeline` opens none. Two
questions of identical difficulty can differ tenfold in what they unlock.

### A grading rubric exists but has never graded anything

`exercise-design` defines five delta bands, from +15~20 for a complete answer
down to −5~10 for a confidently wrong one. It has never been applied to a real
answer, so nothing is known about whether the bands are the right shape or
whether they can be applied consistently.

### The notes were written by the same process that will write the questions

Every concept note here was captured from the source decks in this project. A
question written from a note, answered from the same note, and graded against
the same note may measure how well the note was written rather than how well the
material is understood.

---

## Observed

Entries from the trial itself. This half is the evidence.

<!-- newest at the top -->

### 2026-08-25 · design · MCQ format cut estimated time from 920 to 427 minutes

**What happened**
Built a second exam over the same 54 notes: 80 MCQ + 20 written instead of
79 written-only (W12). Same coverage, same confusion-weighting logic. Total
estimated time dropped from 920 to 427 minutes by moving most of the coverage
load onto MCQ (1–2.5 min/item) and keeping writing only for the 20
highest-confusion notes.

**Worked well** Worked well

**Might mean** The all-written exam wasn't oversized because of scope —
scope (54 notes, full coverage) was fixed by W10/W11 and didn't change.
It was oversized because of *format*. Format choice may be the real lever
for making full-coverage revision exams sittable, not cutting breadth. Still
untested: whether MCQ on the confusion points actually discriminates as well
as writing does, or just measures recognition — that's the next thing to
check once the student takes one for real.

### 2026-08-25 · design · Full-coverage exam sized to 79 items / ~920 minutes

**What happened**
Asked an agent to build a full-coverage exam over all 54 notes, weighted
toward "Watch out for" confusion points (W11). It produced 79 items (25 notes
got 2, 29 got 1), each sized per exercise-design's time table, totalling an
estimated 920 minutes (~15h20m).

**Friction** Friction

**Might mean** "Cover everything, weighted toward what's confusing" and "a
sittable exam" are in tension — full coverage of a 54-note subject at
exam-design's per-item time estimates does not fit any single sitting. Not
yet raised with the user; flagging so it's not lost before the next design
decision (split into sessions? cut breadth? drop the per-item time floor?).

**What happened**
I offered the 20-unlocked-concept set as the testable pool for Modern Software
Engineering Principles. The user asked for an exam on that subject, then
corrected: use all 54 notes in the subject, not just the unlocked ones. They
have already studied the full material through the actual course; this project
started late, after the coursework, specifically to design a study method —
so this is revision before a final exam, not first-time sequential learning.

**Friction**

**Might mean** The prerequisite-lock model (S1 in strengths.md) was designed
for a learner starting from zero. It may be the wrong gate for exam-prep /
revision use, where the learner wants access to everything they already
covered, not a graph that unlocks it piece by piece. This could mean revision
mode needs to bypass locks entirely, or that locks and "already learned"
status are two different things the current model conflates. Not yet
discussed with the user — flagging for the end-of-trial analysis.
