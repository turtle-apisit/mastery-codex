import { supabase } from "./supabase/client";

// Techniques (concept notes) live in Supabase, not markdown — this module
// only ever touches `supabase`, never `fs`, so it's safe to import from
// both Server and Client Components (unlike lib/vault.ts, which reads the
// vault's remaining markdown — exercises, cycle log, agents — from disk).

export type Status = "untrained" | "training" | "mastered";

export type HistoryEntry = {
  date: string;
  activity: "capture" | "exercise" | "essay" | "quiz" | "exam" | "rust-check";
  delta: number;
  result: number;
  note?: string;
};

export type Concept = {
  subject: string;
  skill_name: string;
  slug: string;
  score: number;
  prerequisites: string[];
  source: string[];
  /** optional display name for the lecture group this note belongs to */
  unit: string | null;
  content_type: "theoretical" | "practical" | "mixed" | null;
  /** the actual reviewable content — what the concept is and how it works,
   * written from its cited source. Null on rows captured before this column
   * existed. */
  explanation: string | null;
  /** the worked calculation/approach, elaborating explanation's source-grounded
   * material in full detail. */
  reasoning: string | null;
  /** a real-world application example — the one field allowed to extend
   * beyond the cited source. Always paired with use_case_source. */
  use_case: string | null;
  /** citation for use_case when it isn't drawn from the cited lecture. */
  use_case_source: string | null;
  last_reviewed: string | null;
  history: HistoryEntry[];
  // derived
  status: Status;
  locked: boolean;
  rusty: boolean;
};

export function deriveStatus(score: number): Status {
  if (score >= 80) return "mastered";
  if (score >= 40) return "training";
  return "untrained";
}

/**
 * A concept is "rusty" when it has logged a real decay event (a peak score
 * that's dropped 10+ points from where it once was) — not from comparing
 * last_reviewed against wall-clock "now", which would silently flag more
 * and more of the vault as rusty the longer the seed data goes untouched,
 * regardless of whether Atlas ever actually logged a rust-check. Polaris is
 * the one that watches the calendar and decides when to log a fresh
 * rust-check; this just reflects what's already been logged.
 */
function isRusty(concept: {
  score: number;
  history: HistoryEntry[];
}): boolean {
  const peak = concept.history.reduce(
    (m, h) => Math.max(m, h.result),
    concept.score
  );
  return peak - concept.score >= 10;
}

/** Reads every Technique from Supabase and derives status/locked/rusty. */
export async function getAllConcepts(): Promise<Concept[]> {
  const [{ data: techniques }, { data: sources }, { data: prereqs }, { data: history }] =
    await Promise.all([
      supabase.from("techniques").select("*"),
      supabase.from("technique_sources").select("*"),
      supabase.from("technique_prerequisites").select("*"),
      supabase.from("technique_history").select("*").order("date", { ascending: true }),
    ]);

  const techs = techniques ?? [];
  const byId = new Map(techs.map((t) => [t.id, t]));

  const sourcesByTechnique = new Map<string, string[]>();
  for (const s of sources ?? []) {
    const arr = sourcesByTechnique.get(s.technique_id) ?? [];
    arr.push(s.source_file);
    sourcesByTechnique.set(s.technique_id, arr);
  }

  const prereqNamesByTechnique = new Map<string, string[]>();
  for (const p of prereqs ?? []) {
    const prereqTech = byId.get(p.prerequisite_id);
    if (!prereqTech) continue;
    const arr = prereqNamesByTechnique.get(p.technique_id) ?? [];
    arr.push(prereqTech.skill_name);
    prereqNamesByTechnique.set(p.technique_id, arr);
  }

  const historyByTechnique = new Map<string, HistoryEntry[]>();
  for (const h of history ?? []) {
    const arr = historyByTechnique.get(h.technique_id) ?? [];
    arr.push({
      date: h.date,
      activity: h.activity as HistoryEntry["activity"],
      delta: h.delta,
      result: h.result,
      note: h.note ?? undefined,
    });
    historyByTechnique.set(h.technique_id, arr);
  }

  const raw = techs.map((t) => ({
    subject: t.subject,
    skill_name: t.skill_name,
    slug: t.slug,
    score: t.score,
    prerequisites: prereqNamesByTechnique.get(t.id) ?? [],
    source: sourcesByTechnique.get(t.id) ?? [],
    unit: t.unit,
    content_type: t.content_type as Concept["content_type"],
    explanation: t.explanation,
    reasoning: t.reasoning,
    use_case: t.use_case,
    use_case_source: t.use_case_source,
    last_reviewed: t.last_reviewed,
    history: historyByTechnique.get(t.id) ?? [],
  }));

  const byName = new Map(raw.map((c) => [c.skill_name, c]));

  return raw.map((c) => {
    const status = deriveStatus(c.score);
    const locked = c.prerequisites.some((p) => {
      const prereq = byName.get(p);
      return !prereq || prereq.score < 40;
    });
    const rusty = isRusty(c);
    return { ...c, status, locked, rusty };
  });
}

export async function getSubjects(): Promise<string[]> {
  const { data } = await supabase.from("techniques").select("subject");
  return Array.from(new Set((data ?? []).map((d) => d.subject)));
}

export type JobSummary = {
  subject: string;
  level: number;
  xpPct: number;
  mastered: number;
  training: number;
  untrained: number;
  locked: number;
  rusty: number;
  total: number;
};

export async function getJobSummaries(): Promise<JobSummary[]> {
  const all = await getAllConcepts();
  const subjects = Array.from(new Set(all.map((c) => c.subject)));

  return subjects.map((subject) => {
    const concepts = all.filter((c) => c.subject === subject);
    const scored = concepts.filter((c) => !c.locked);
    const avgScore = scored.length
      ? scored.reduce((s, c) => s + c.score, 0) / scored.length
      : 0;
    const level = Math.floor(avgScore / 10);

    let mastered = 0,
      training = 0,
      untrained = 0,
      locked = 0,
      rusty = 0;
    // status is one of three buckets; rusty and locked are flags layered on
    // top, so a Training-and-rusty concept counts in BOTH training and rusty.
    // These figures deliberately sum to more than `total` — they measure two
    // different axes, and collapsing them into one bucket made the training
    // count silently exclude exactly the concepts most in need of work.
    for (const c of concepts) {
      if (c.status === "mastered") mastered++;
      else if (c.status === "training") training++;
      else untrained++;
      if (c.locked) locked++;
      if (c.rusty) rusty++;
    }

    return {
      subject,
      level,
      xpPct: Math.round(avgScore),
      mastered,
      training,
      untrained,
      locked,
      rusty,
      total: concepts.length,
    };
  });
}

export type LogEntry = HistoryEntry & { subject: string; concept: string };

/** Flattens every concept's history into one reverse-chronological feed. */
export async function getQuestLog(): Promise<LogEntry[]> {
  const all = await getAllConcepts();
  const entries: LogEntry[] = [];
  for (const c of all) {
    for (const h of c.history) {
      entries.push({ ...h, subject: c.subject, concept: c.skill_name });
    }
  }
  return entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Counts the current daily-activity streak, backward from the most recent
 * logged activity (not necessarily "today" — the seed vault's most recent
 * activity is what anchors it). */
export async function getStreak(): Promise<number> {
  const questLog = await getQuestLog();
  const dates = Array.from(
    new Set(questLog.map((e) => e.date))
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  if (!dates.length) return 0;

  let streak = 1;
  for (let i = 0; i < dates.length - 1; i++) {
    const cur = new Date(dates[i]).getTime();
    const next = new Date(dates[i + 1]).getTime();
    if (Math.round((cur - next) / 86400000) <= 3) {
      // allow weekend/light-day gaps up to 3 days apart
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
