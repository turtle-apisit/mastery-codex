import { supabase } from "./supabase/client";

// The Simulation feature's data layer. SIMULATION.md carries the objective
// and the format; this module only knows how to read and write it.
//
// Everything here is client-safe (Supabase only, never `fs`), same as
// lib/techniques.ts.

export type SetStatus = "ready" | "in_progress" | "submitted" | "graded";
export type ItemType = "choice" | "written";
export type SourceBasis = "lecture" | "outside" | "mixed";

/** One option of a choice item.
 *
 * `options` is an unconstrained `json` column, so this shape is a convention
 * rather than something the database enforces — it is specified in
 * `.claude/skills/exercise-design/SKILL.md` §8. `diagnosis` names what
 * picking this option would mean, and is null on the correct one. It is what
 * Atlas writes the item's history note from, which is why a wrong option
 * without one is a malformed item rather than a cosmetic problem. */
export type ChoiceOption = {
  text: string;
  diagnosis: string | null;
};

export type ExamItem = {
  id: string;
  position: number;
  item_type: ItemType;
  technique_id: string;
  question: string;
  /** null on a written item */
  options: ChoiceOption[] | null;
  /** 0-based index into `options`, so 0 is option A. Null on a written item. */
  correct_option: number | null;
  model_answer: string | null;
  rubric: string | null;
  source_basis: SourceBasis;
  /** joined from `techniques`, for display */
  technique_name: string;
  /** the learner's attempt, absent until the round is submitted */
  attempt: ExamAttempt | null;
};

export type ExamAttempt = {
  id: string;
  chosen_option: number | null;
  is_correct: boolean | null;
  written_answer: string | null;
  /** 0-3, null while the written item is still ungraded */
  content_score: number | null;
  /** 0 or 1 each, and deliberately never converted into a score delta */
  writing_clarity: number | null;
  writing_precision: number | null;
  feedback: string | null;
  graded_by: string | null;
  answered_at: string;
};

export type ExamSet = {
  id: string;
  subject: string;
  set_number: number;
  status: SetStatus;
  targeting_note: string | null;
  created_at: string;
};

export type ExamSetWithItems = ExamSet & { items: ExamItem[] };

/** How many points each item type is worth. Nothing in the schema encodes
 * this — a set is whatever its items say it is — so it lives here. */
export const CHOICE_POINTS = 1;
export const WRITTEN_POINTS = 5;

/** Options render in the order written and are never shuffled, so an index
 * maps to a stable letter. */
export function optionLetter(index: number): string {
  return String.fromCharCode(65 + index);
}

function asOptions(raw: unknown): ChoiceOption[] | null {
  if (!Array.isArray(raw)) return null;
  return raw.map((o) => {
    // Tolerate a plain string, so a hand-written row still renders rather
    // than throwing. It is still a malformed item — the UI says so where it
    // matters, at grading time, rather than by crashing the page here.
    if (typeof o === "string") return { text: o, diagnosis: null };
    const obj = (o ?? {}) as Record<string, unknown>;
    return {
      text: typeof obj.text === "string" ? obj.text : "",
      diagnosis: typeof obj.diagnosis === "string" ? obj.diagnosis : null,
    };
  });
}

export async function getExamSets(): Promise<ExamSet[]> {
  const { data, error } = await supabase
    .from("exam_sets")
    .select("id, subject, set_number, status, targeting_note, created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ExamSet[];
}

export async function getExamSet(id: string): Promise<ExamSetWithItems | null> {
  const { data: set, error: setErr } = await supabase
    .from("exam_sets")
    .select("id, subject, set_number, status, targeting_note, created_at")
    .eq("id", id)
    .maybeSingle();
  if (setErr) throw setErr;
  if (!set) return null;

  const { data: rows, error: itemErr } = await supabase
    .from("exam_items")
    .select(
      `id, position, item_type, technique_id, question, options, correct_option,
       model_answer, rubric, source_basis,
       techniques ( skill_name ),
       exam_attempts ( id, chosen_option, is_correct, written_answer,
                       content_score, writing_clarity, writing_precision,
                       feedback, graded_by, answered_at )`,
    )
    .eq("exam_set_id", id)
    .order("position");
  if (itemErr) throw itemErr;

  const items: ExamItem[] = (rows ?? []).map((r) => {
    const row = r as unknown as Record<string, unknown>;
    const technique = row.techniques as { skill_name?: string } | null;
    // exam_attempts is one-to-one on exam_item_id, but PostgREST still
    // returns an embedded to-many as an array. One attempt per item is the
    // database's own constraint, not an assumption made here.
    const attempts = (row.exam_attempts ?? []) as ExamAttempt[];
    return {
      id: row.id as string,
      position: row.position as number,
      item_type: row.item_type as ItemType,
      technique_id: row.technique_id as string,
      question: row.question as string,
      options: asOptions(row.options),
      correct_option: (row.correct_option as number | null) ?? null,
      model_answer: (row.model_answer as string | null) ?? null,
      rubric: (row.rubric as string | null) ?? null,
      source_basis: row.source_basis as SourceBasis,
      technique_name: technique?.skill_name ?? "(unknown Technique)",
      attempt: Array.isArray(attempts) ? (attempts[0] ?? null) : (attempts ?? null),
    };
  });

  return { ...(set as ExamSet), items };
}

export type DraftAnswer = {
  item: ExamItem;
  /** 0-based option index for a choice item */
  chosen: number | null;
  /** the learner's prose for a written item */
  written: string;
};

/**
 * Submit a whole round at once.
 *
 * All twelve answers land together rather than item by item, deliberately:
 * revealing a choice item's result before the rest are locked in would let a
 * later answer be adjusted on what an earlier one gave away, and the round's
 * job is to be evidence.
 *
 * Choice items are graded here, by comparison — `graded_by: 'auto'`. Written
 * items are stored ungraded (`content_score: null`, which means "not yet
 * judged" and must never be confused with a judged zero); Vega grades those
 * against the item's rubric afterwards.
 */
export async function submitRound(
  setId: string,
  answers: DraftAnswer[],
): Promise<void> {
  const rows = answers.map(({ item, chosen, written }) =>
    item.item_type === "choice"
      ? {
          exam_item_id: item.id,
          chosen_option: chosen,
          is_correct: chosen !== null && chosen === item.correct_option,
          graded_by: "auto",
          graded_at: new Date().toISOString(),
        }
      : {
          exam_item_id: item.id,
          written_answer: written.trim(),
        },
  );

  const { error: attemptErr } = await supabase
    .from("exam_attempts")
    .insert(rows);
  if (attemptErr) throw attemptErr;

  // 'submitted', not 'graded' — the two written items are still outstanding.
  const { error: setErr } = await supabase
    .from("exam_sets")
    .update({ status: "submitted" })
    .eq("id", setId);
  if (setErr) throw setErr;
}

export async function markInProgress(setId: string): Promise<void> {
  const { error } = await supabase
    .from("exam_sets")
    .update({ status: "in_progress" })
    .eq("id", setId)
    .eq("status", "ready");
  if (error) throw error;
}

export type RoundScore = {
  choiceCorrect: number;
  choiceTotal: number;
  /** points earned on the written half, null while either is ungraded */
  writtenPoints: number | null;
  writtenTotal: number;
  /** null while any written item is still ungraded */
  total: number | null;
  max: number;
  ungradedWritten: number;
};

export function scoreRound(items: ExamItem[]): RoundScore {
  const choice = items.filter((i) => i.item_type === "choice");
  const written = items.filter((i) => i.item_type === "written");

  const choiceCorrect = choice.filter((i) => i.attempt?.is_correct).length;
  const ungradedWritten = written.filter(
    (i) => i.attempt == null || i.attempt.content_score == null,
  ).length;

  // content_score is 0-3 and carries 3 of a written item's 5 points; the two
  // writing sub-scores are 0 or 1 each and carry the other 2. They count
  // toward the round's number and still never move a Technique's score —
  // that asymmetry is the point, not an inconsistency (SIMULATION.md §6).
  const writtenPoints =
    ungradedWritten > 0
      ? null
      : written.reduce(
          (sum, i) =>
            sum +
            (i.attempt?.content_score ?? 0) +
            (i.attempt?.writing_clarity ?? 0) +
            (i.attempt?.writing_precision ?? 0),
          0,
        );

  const choicePoints = choiceCorrect * CHOICE_POINTS;
  return {
    choiceCorrect,
    choiceTotal: choice.length,
    writtenPoints,
    writtenTotal: written.length * WRITTEN_POINTS,
    total: writtenPoints === null ? null : choicePoints + writtenPoints,
    max: choice.length * CHOICE_POINTS + written.length * WRITTEN_POINTS,
    ungradedWritten,
  };
}

// ---------------------------------------------------------------------------
// Moment 6: what moved.
//
// This is the reason the feature exists. Everything above it is plumbing for
// the question "which Techniques improved over the last N rounds, and which
// did not" — and the answer has to come from stored rows, not a summary.
// ---------------------------------------------------------------------------

/** The activities a Simulation round writes. `exam` is Antares's five-week
 * cycle and deliberately not counted here. */
const SIM_ACTIVITIES = ["quiz", "essay"] as const;

export type TechniqueProgress = {
  technique_id: string;
  skill_name: string;
  /** current cumulative score, straight off the Technique */
  score: number;
  status: "untrained" | "training" | "mastered";
  /** score before the first Simulation event counted here */
  startedAt: number;
  /** score now minus score before the first counted event */
  moved: number;
  /** one entry per Simulation event, oldest first */
  points: { date: string; delta: number; result: number; note: string | null }[];
};

/**
 * Per-Technique movement across a subject's Simulation history.
 *
 * Techniques with no Simulation events are left out rather than listed at
 * zero: "not yet examined" and "examined and did not move" are different
 * answers, and flattening them is exactly the failure this view exists to
 * avoid.
 */
export async function getSubjectProgress(
  subject: string,
): Promise<TechniqueProgress[]> {
  const { data: techniques, error: tErr } = await supabase
    .from("techniques")
    .select("id, skill_name, score, status")
    .eq("subject", subject);
  if (tErr) throw tErr;
  if (!techniques?.length) return [];

  const byId = new Map(techniques.map((t) => [t.id, t]));

  const { data: history, error: hErr } = await supabase
    .from("technique_history")
    .select("technique_id, date, activity, delta, result, note, created_at")
    .in("technique_id", [...byId.keys()])
    .in("activity", [...SIM_ACTIVITIES])
    .order("created_at", { ascending: true });
  if (hErr) throw hErr;

  const grouped = new Map<string, typeof history>();
  for (const row of history ?? []) {
    const list = grouped.get(row.technique_id) ?? [];
    list.push(row);
    grouped.set(row.technique_id, list);
  }

  const out: TechniqueProgress[] = [];
  for (const [id, rows] of grouped) {
    const t = byId.get(id);
    if (!t || !rows?.length) continue;
    // `result` is the post-delta score, so the score before the first counted
    // event is that event's result minus its own delta — no arithmetic replay
    // over the whole history needed.
    const startedAt = rows[0].result - rows[0].delta;
    out.push({
      technique_id: id,
      skill_name: t.skill_name,
      score: t.score,
      status: t.status as TechniqueProgress["status"],
      startedAt,
      moved: t.score - startedAt,
      points: rows.map((r) => ({
        date: r.date,
        delta: r.delta,
        result: r.result,
        note: r.note,
      })),
    });
  }

  // Weakest first, which is also the order the next round should target in.
  return out.sort((a, b) => a.score - b.score || a.skill_name.localeCompare(b.skill_name));
}
