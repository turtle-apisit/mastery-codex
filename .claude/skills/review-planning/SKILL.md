---
name: review-planning
description: Expertise for planning a week of study under a fixed time budget — rust/decay detection, weakest-first prioritization, lock-graph reading, budget allocation across subjects, and boss-prep week strategy. Load before writing a weekly plan or answering "how am I doing" / "what should I focus on."
---

# Review Planning

Orientation across a 5-week cycle. The scarce resource is 1–2 hours a day, and the job is deciding what it buys — never what the exercises themselves look like.

## 1. Locate the cycle position first

Everything downstream depends on which week it is.

```
week = floor(days_since(cycle_start) / 7) + 1     # 1..5
```

Read `cycle_start` and `cycle_number` from `03-Reviews/cycle-log.md`. If no cycle start is recorded, **ask once** — a guessed week 1 silently mis-times boss-prep and the exam, and the error compounds for five weeks.

| Week | Character of the plan |
|---|---|
| 1–3 | Normal loop. Even allocation across subjects with material due. |
| 4 | **Boss-prep.** Deliberately uneven — weakest concepts get the bulk of the time. |
| 5 | Exam week. Plan light: leave room for the exam, no new capture-driven load. |

## 2. Decay: what "rusty" actually means

Forgetting is time-since-retrieval, not time-since-exposure. Two independent triggers, either one sufficient:

- **Score decay** — current score is 15+ below its peak in `history`.
- **Staleness** — `last_reviewed` is 10+ days ago **and** status isn't `untrained`.

The staleness trigger needs the status guard: an untrained concept isn't rusty, it's simply not started. Calling it rusty inflates the rust list with things that were never learned and buries the real decay signal.

### Reading decay properly
- **Peak, not previous.** A concept at 82 → 71 → 68 is 14 below peak on the last step but 14+ cumulative — always measure against the maximum in `history`, or slow bleeds never trigger.
- **Distinguish decay from a wrong answer.** A drop from a `rust-check` entry is decay. A drop from an `exercise`/`essay` entry with a wrong-mechanism note is a *misconception* — much more urgent, because time won't heal it and it will keep producing confident wrong answers. Rank misconceptions above ordinary rust.
- **Mastered concepts decay too, and more quietly.** Nothing in the daily loop touches them, so staleness is usually the only signal you'll get. Don't let the "never review mastered" rule swallow a mastered concept sitting at 40 days.
- **Interval scales with mastery.** A concept at 85 tolerates a longer gap than one at 45. When several concepts trip the 10-day trigger at once, order the lower scores first.

## 3. Read the lock graph before ranking

A concept is **locked** while any prerequisite sits below 40. Locked concepts are not candidates for review — planning time against them is time the learner cannot spend.

The useful move is the inverse: find the **blocking prerequisites**. A single sub-40 prerequisite gating three downstream concepts is the highest-leverage target on the board, even if its own score isn't the lowest. Always name that leverage in the plan — "Loss Function (32) — unblocks Gradient Descent + Backpropagation" is a far better instruction than "Loss Function — untrained".

If every concept in a subject is locked, report the subject as **blocked** and name the root blocker. Never invent review material to fill the slot.

## 4. Weakest-first ranking

Within each subject, rank:

1. **Misconceptions** — a recent negative delta from a graded answer (confidently wrong).
2. **Rusty** — decayed or stale, per §2.
3. **Blocking prerequisites** below 40 — unlocks downstream work.
4. **Untrained and unlocked** — ready to start, never started.
5. **Lowest-scoring `training`** — in progress, ascending by score.

Never: `mastered` and not rusty. Under a 1–2 hour budget that time is strictly better spent lower on this list.

**Rusty outranks never-trained.** Recovering something once known is cheap and time-sensitive; starting something new is expensive and can wait a week without loss. This is the ranking rule most often gotten backwards, because untrained concepts *look* more alarming in a scorecard.

### Recency guard
A concept reviewed in the last two days should not lead the ranking even if its score is lowest — massed repetition on consecutive days produces much weaker retention than the same minutes spaced out. Push it to later in the week and say why.

## 5. Allocating the budget

Weeks 1–3: divide evenly across subjects that have material due, then within each subject spend the subject's slice top-down on the ranking until it's gone. Concretely, per day:

- name the subjects,
- name the specific concepts each day's exercises should prioritize,
- give the reason tag for each (`rusty` / `misconception` / `unblocks` / `new-capture` / `untrained`),
- and stop. The item format, count, and minutes are Vega's decisions, not yours.

**Interleave across days, block within a day.** Spreading one subject across three short days beats one long block — spacing is the mechanism that makes review stick.

**Leave slack.** Plan to roughly 80% of the budget. A plan filled to 100% fails on the first day something runs long, and a plan the learner falls behind on stops being read.

Never silently omit a subject with no activity. "Software Architecture — no material captured this week" is real information; an absent subject looks like an oversight.

## 6. Boss-prep (week 4)

Week 4 deliberately abandons even allocation. The exam is one week out and the goal is closing the widest gaps, not balanced progress.

- Rank weakest-first **across all subjects at once**, not within each.
- Concentrate the week on the top of that global list — a subject already in good shape can legitimately get one light touch.
- Include a **rust-check sweep** on `mastered` concepts that haven't been retrieved this cycle. This is exactly what the exam will expose, and it's the last chance to catch it cheaply.
- Do not start new material in week 4 unless a subject has nothing else available. New capture the week before an exam adds untrained concepts to the exam surface.
- Announce the transition explicitly. Boss-prep feeling different from weeks 1–3 is the point.

## 7. The spoken summary

Alongside the plan file, give the learner:

- cycle position (week N of 5, boss-prep active or not),
- the top 3 weak concepts with their reason tags,
- anything newly unlocked or newly blocked since last week,
- one honest sentence on trajectory — including when it's flat. A weekly summary that always reads as progress is worthless as a signal.

## Failure modes to avoid

- Guessing the cycle week rather than asking once.
- Ranking untrained above rusty.
- Measuring decay against the previous score instead of the peak.
- Planning review time against locked concepts.
- Filling the budget to 100%.
- Writing exercises. You decide *what needs attention*; Vega decides *how it gets tested*.
