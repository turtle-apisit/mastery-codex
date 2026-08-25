# Risk register

Things that could break the exam system, and what breaks if they are ignored.

A risk earns a place here only if it names **what specifically goes wrong**. "It
might not scale" is not a risk. "Grading the same answer differently in two
sessions makes the score meaningless, so Polaris plans the wrong week" is.

## Entry format

```
### R<n> · <short name>

**The risk**
What could go wrong.

**Shows up when**
The condition that triggers it. If it cannot be triggered, it is not a risk.

**What breaks**
The concrete downstream damage.

**Severity** — low / medium / high
**Status** — open / mitigated / accepted / disproved
```

`disproved` is the most valuable status here. A risk the trial showed to be
imaginary is a real result, and it should be marked, not deleted.

---

## Baseline — risks visible from the design alone

Identified before the first exam. These are predictions, not findings; the trial
exists to confirm or kill them.

### R1 · Grading drift between sessions

**The risk** The same answer scores differently depending on when it is graded.

**Shows up when** Two similar answers are graded in separate sessions, with no
shared record of how the earlier one was judged.

**What breaks** Score stops being a measurement. `exercise-design` says the
scorecard is a measurement instrument and that bending a delta breaks every
downstream decision — Polaris's weekly plan and Antares's exam calibration both
read it as if it means the same thing over time.

**Severity** high · **Status** open

### R2 · Circular grounding

**The risk** Questions written from a note, answered from the same note, and
graded against the same note measure note quality, not understanding.

**Shows up when** The answer is written with the note open, or the grader has no
source other than the note itself.

**What breaks** Scores rise while understanding does not. The star chart unlocks
concepts that are not actually earned.

**Severity** high · **Status** open

### R3 · The unlock graph distorts what gets studied

**The risk** Choosing questions by what they unlock rather than by what needs
learning.

**Shows up when** `Architectural Pattern` (unlocks 10) is repeatedly chosen over
a concept that is genuinely weaker but unlocks nothing.

**What breaks** Progress looks fast on the chart while leaving real gaps. The
20-open / 149-locked shape makes this tempting from the very first exam.

**Severity** medium · **Status** open

### R4 · Authoring cost exceeds the value

**The risk** Designing a good question by hand takes long enough that it stops
happening.

**Shows up when** Question writing competes with studying for the same hour.

**What breaks** The system falls out of use, and no amount of built
infrastructure fixes a loop nobody runs.

**Severity** medium · **Status** open — *this is a main thing the trial measures*

### R5 · Answering effort is not recorded

**The risk** Nothing captures how long an answer took or whether notes were open.

**Shows up when** Comparing two scores of 15 where one took four minutes closed-book
and the other took twenty with the note open.

**What breaks** Equal scores that mean different things, which undermines every
comparison built on them.

**Severity** medium · **Status** open

---

## Observed

Risks found by running the trial, and baseline risks that the trial confirmed,
killed, or reshaped.

<!-- newest at the top -->
