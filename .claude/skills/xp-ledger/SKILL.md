---
name: xp-ledger
description: Expertise for committing graded results to the score ledger without corrupting it. Covers the score/status arithmetic, handoff validation, append-only history invariants, rust-check bookkeeping, clamping and boundary cases, scorecard row construction, and ledger repair. Load before writing any score, status, history entry, or scorecard row.
---

# XP Ledger

You are the only writer of scores in the system. Everything downstream — the weekly plan, the lock graph, the exam blueprint, the dashboard — reads what you wrote and trusts it. A ledger that is merely *approximately* right is worse than one that is visibly incomplete, because nothing signals the drift.

The job is bookkeeping, not judgment. You never decide whether an answer was good.

## 1. Validate the handoff before touching anything

Reject, don't repair. A bounced handoff costs one round trip; a logged bad handoff is permanent.

Check in order:

1. **Concept exists.** Look it up by `skill_name` + `subject`. Missing → refuse and flag the gap. Never create a placeholder note.
2. **`source` present on the concept.** An unsourced concept can't carry a score — bounce it.
3. **Required fields present** — `concept`, `subject`, `activity`, `delta`, `result_note`. Any missing → bounce.
4. **`activity` is a known kind** — `capture` | `exercise` | `essay` | `quiz` | `exam` | `rust-check`.
5. **`result_note` is substantive.** "Correct" / "partial" / "good" is not a note. Bounce it: next week's retry item is built from this string, and an empty note makes the concept untargetable forever.
6. **Sign matches activity.** A `rust-check` with a positive delta, or a `capture` with a nonzero delta, is a malformed handoff.
7. **Concept isn't `locked`.** A graded result on a locked concept means something upstream ignored the lock. Refuse and name the blocking prerequisite.

## 2. The arithmetic — in this order, always

```
1. insert technique_history row   (technique_id, date, activity, delta, result, note)
2. score  = clamp(0, 100, previous_score + delta)
3. update techniques set score = <new score>   ← status follows automatically, see below
4. last_reviewed = activity date   (except activity: capture)
5. append scorecard row
```

**Status is a pure function of cumulative score** — a Postgres generated column on `techniques`, not a value you set:

| Score | Status |
|---|---|
| 0–39 | `untrained` |
| 40–79 | `training` |
| 80–100 | `mastered` |

You never write `status` at all; you write `score` and the database derives it. That's a stronger guarantee than the old discipline of "never set status from the feel of a single answer" — it's no longer possible to set it from anything but the cumulative score, because there's no column to set.

`locked` is **not** a status stored anywhere. It is derived at read time from the prerequisite graph — a concept is locked while any prerequisite is below 40.

### Clamping
Clamp silently in the data, loudly in the summary. `score: 96, delta: +15` → stores 100, and the summary says `clamped +15 → +4 (ceiling)`. The lost delta matters to Corvus's calibration audit; swallowing it hides that grading has drifted generous near the ceiling.

Same at the floor: `score: 3, delta: −10` → stores 0, summary says `clamped at floor`.

### `result` in the history entry
`result` is the **post-delta score**, not the delta and not a verdict. It exists so the history reconstructs the score curve without replaying arithmetic. If `result` ≠ the new score, the entry is wrong.

## 3. Append-only means append-only

The history is an audit log, not a state field. `technique_history` enforces this at the database level — an `update` or `delete` against it is rejected outright, not just discouraged.

- **Never edit or delete a past entry.** A wrong entry is corrected by appending a correcting entry with a `note` explaining the correction — never by rewriting history (and the database won't let you anyway).
- **Two handoffs, same concept, same day → two entries.** Never merge deltas. The sequence *is* the information: `+15 then −8` and `+7` produce the same score and mean completely different things.
- **Order within a day follows arrival order.** Don't sort by activity type.
- **Never backfill a date.** If a result arrives late, log it today with the real activity date in the note.

The one legitimate repair: a **missing** entry discovered by audit may be appended retroactively, dated correctly, with `result_note` stating it was added retroactively and why. That's an addition, not an edit.

## 4. Rust-checks

A rust-check is decay bookkeeping, not a graded event. It records that time has passed, and nothing else.

- `activity: rust-check`, delta always negative.
- `result_note` **must** begin with the word `rust` and state the interval: `"rust — 12 days since last review"`. This is what makes it distinguishable in the scorecard from a real drop caused by a wrong answer. Those two look identical in a score column and mean opposite things.
- **`last_reviewed` does not move.** A rust-check is not a review. Advancing it here would suppress the next rust-check and freeze the concept at a falsely fresh timestamp — the single most damaging bookkeeping error available to you.
- Status recomputes normally. Decay legitimately drops `mastered` → `training`.
- Never apply two rust-checks for the same interval. Before committing, check the history for an existing rust-check whose interval overlaps.

## 5. Scorecard rows

Format: `date | concept | status | score | note`

The `note` column carries the activity kind plus the delta plus any flag:

```
2026-08-24 | Gradient Descent  | training   | 65 | exercise, +15
2026-08-24 | Cross-Validation  | training   | 71 | rust-check, -11, rust — 12d unreviewed
2026-08-25 | Regularization    | untrained  | 22 | essay, -6, confidently wrong mechanism
2026-08-25 | Backpropagation   | mastered   | 100 | exam, +4 (clamped from +15)
```

Never skip the row. The Technique row holds the current state; the scorecard is the **trend**, and trend is what Polaris ranks on and Corvus audits. A score updated without its row is an invisible change.

One row per history entry. Never one summarizing row per day.

## 6. Boundary cases

- **Crossing 40 upward** — the concept stops being a blocker. Say so in the summary: `Loss Function → training (40): unlocks Gradient Descent`. Downstream planning depends on knowing a lock opened.
- **Crossing 40 downward** — a dependent concept has just become locked while sitting at a nonzero score. Flag it explicitly; nothing else in the system will notice.
- **Crossing 80 in either direction** — worth calling out, it changes review eligibility.
- **Delta of exactly 0** — legitimate (on-topic, no understanding shown). Log it. It moves `last_reviewed`, which correctly suppresses a rust-check.
- **`activity: capture`** — delta 0, no `last_reviewed` change. Capturing material is not evidence of understanding.
- **Concept renamed upstream** — do not chase it. Bounce the handoff and name the mismatch; a silent match-by-similarity can log a score against the wrong concept.

## 7. Simulation rounds

A Simulation round does not arrive as one handoff. It arrives as one graded
exam set — twelve items, one subject, each item bound to a `technique_id`.
`SIMULATION.md` has the feature's objective and format; this section is only
the bookkeeping.

### One row per item, never one per round

Twelve graded items produce twelve `technique_history` rows. A set that touches
seven Techniques still produces twelve rows, not seven and not one.

This is the same rule as §3's "two handoffs, same concept, same day → two
entries", and it is the rule the whole feature depends on: a per-round row can
only answer *how did today go*, and the question Simulation exists to answer is
*which Technique improved*. Never net two items on the same Technique into one
delta. `+3, −3, +9` is three rows and means something a single `+9` does not.

Rows go in `exam_items.position` order — arrival order, per §3.

### Activity kind

| Item | `activity` |
|---|---|
| `choice` | `quiz` |
| `written` | `essay` |

`exam` stays reserved for Antares's five-week cycle. Logging a daily drill as
`exam` makes the two indistinguishable in the history, and Corvus's calibration
audit needs to tell them apart.

### Delta

Choice items:

| Result | Delta |
|---|---|
| correct | `+3` |
| incorrect | `−3` |

Written items, from `content_score` (0–3):

| `content_score` | Delta |
|---|---|
| 3 | `+9` |
| 2 | `+4` |
| 1 | `−2` |
| 0 | `−8` |

**Why choice is the small number.** A four-option item has a 25% floor: a
correct answer is part evidence and part luck, and the ledger should not pay
full price for a coin flip. A written answer cannot be guessed, so it carries
the weight. Were the two equal, a round would be decided by the ten items that
are cheapest to get right by accident, and the score curve moment 6 compares
would be mostly noise.

### Writing sub-scores never become a delta

`writing_clarity` and `writing_precision` are each `0` or `1` (the database
constrains both to that range), and together with `content_score`'s `0–3` they
make the written item's five points. They are recorded on the `exam_attempts`
row and stop there. Only `content_score` moves a Technique's score.

A learner who understands the Technique and writes it awkwardly has not
understood it less. Folding prose quality into the delta would put noise into
the one number the feature's success test reads, and it would make a score
drop ambiguous between "lost the concept" and "wrote it badly" — which are
opposite problems with opposite remedies.

### Building the note

§1.5 bounces a handoff whose note is not substantive, and that applies here
unchanged. "Correct" is not a note.

- **Choice, incorrect** — name the misunderstanding the chosen distractor
  indicates. You do not have to infer it: `exam_items.options` is a JSON array
  of `{ text, diagnosis }` objects and the chosen one's `diagnosis` says what
  picking it means (`exercise-design` §8). Lift that into the note. A
  distractor whose `diagnosis` is missing is a malformed item — bounce it
  rather than logging `"incorrect"`, which leaves the Technique untargetable.
- **Choice, correct** — state what the item established, from the question and
  the correct option: `"identified write skew as the anomaly snapshot
  isolation still permits"`, not `"correct"`.
- **Written** — Vega's `feedback`, trimmed to the substance. The full text
  already lives on the attempt; the note carries what next round needs.

### Dating the rows

The activity date is `exam_attempts.answered_at` — when the learner produced
the evidence, not when grading finished. The 10 choice items grade instantly
and the 2 written items may grade later, and all twelve belong to the same
round.

If grading lands on a later day, §3 still holds: log it today and put the real
answer date in the note. Never backfill.

### Before committing a round

- **Every item's Technique must be unlocked.** A graded result on a locked
  Technique means the targeting step ignored the lock (§1.7). Bounce that item
  and name the blocking prerequisite — do not log it and do not quietly drop it.
- **Row count must equal graded-item count.** An eleven-row commit for a
  twelve-item round is a missing row, not a rounding difference.
- **An ungraded written item is not a zero.** If only the 10 choice items have
  been graded, commit those ten and say plainly that two are outstanding.
  `content_score: null` is "not yet judged"; `content_score: 0` is "judged and
  wrong", and they must never collapse into each other.

Clamping (§2), boundary reporting (§6) and the scorecard row (§5) work exactly
as they do for any other activity — one scorecard row per history row.

### What the database already guarantees, and what it does not

Worth knowing so validation effort goes where it is actually needed. Already
enforced by `check` constraints, so there is no point re-checking them:
`item_type` is `choice` or `written`; a `choice` item cannot exist without both
`options` and `correct_option`; a `written` item cannot exist without both
`rubric` and `model_answer`; `source_basis` is one of `lecture` / `outside` /
`mixed`; `content_score` is `0–3`; `graded_by` is `auto` (the ten choice items,
scored by comparison) or `vega` (the two written ones, scored by judgment).

Not enforced anywhere, and therefore yours to check: that the round is ten
choice plus two written, that its Techniques all belong to one subject, that a
question is not a repeat, and that a note is substantive.

## 8. Ledger integrity

Invariants that must hold after every commit:

1. `score` equals `clamp(0,100, sum of all history deltas)`.
2. `status` equals `f(score)` per the table.
3. Every history entry has a matching scorecard row.
4. `last_reviewed` equals the date of the most recent non-`capture`, non-`rust-check` entry.
5. Every entry's `result` equals the running score at that point.

If a commit would break one of these, stop and report. Do not "fix" the score to match — a drifted score usually means an earlier entry is wrong or missing, and overwriting the total destroys the evidence needed to find it.

## Failure modes to avoid

- Setting status from a single result instead of the cumulative score.
- Advancing `last_reviewed` on a rust-check.
- Merging same-day deltas into one entry.
- Editing history to correct it.
- Rounding, nudging, or "smoothing" a delta you were handed.
- Skipping the scorecard row when the score didn't change — a 0-delta row is real data.
