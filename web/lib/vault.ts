import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { supabase } from "@/lib/supabase/client";

// The web app lives in web/, the rest of the vault (exercises, reviews,
// agents, art) lives one level up at the repo root. Concept notes
// (Techniques) no longer live here — they're Supabase rows, read below.
const VAULT_ROOT = path.join(process.cwd(), "..");

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

/**
 * Reads every Technique (concept note) from Supabase and derives
 * status/locked/rusty. Techniques used to be `02-Concepts/**\/*.md` files;
 * they now live in the `techniques`/`technique_sources`/
 * `technique_prerequisites`/`technique_history` tables (mastery-codex-db).
 */
export async function getAllConcepts(): Promise<Concept[]> {
  const [{ data: techniques }, { data: sources }, { data: prereqs }, { data: history }] =
    await Promise.all([
      supabase.from("techniques").select("*"),
      supabase.from("technique_sources").select("*"),
      supabase.from("technique_prerequisites").select("*"),
      supabase.from("technique_history").select("*").order("date", { ascending: true }),
    ]);

  const skillNameById = new Map((techniques ?? []).map((t) => [t.id, t.skill_name]));

  const sourcesById = new Map<string, string[]>();
  for (const s of sources ?? []) {
    const list = sourcesById.get(s.technique_id) ?? [];
    list.push(s.source_file);
    sourcesById.set(s.technique_id, list);
  }

  const prereqNamesById = new Map<string, string[]>();
  for (const p of prereqs ?? []) {
    const name = skillNameById.get(p.prerequisite_id);
    if (!name) continue;
    const list = prereqNamesById.get(p.technique_id) ?? [];
    list.push(name);
    prereqNamesById.set(p.technique_id, list);
  }

  const historyById = new Map<string, HistoryEntry[]>();
  for (const h of history ?? []) {
    const list = historyById.get(h.technique_id) ?? [];
    list.push({
      date: h.date,
      activity: h.activity as HistoryEntry["activity"],
      delta: h.delta,
      result: h.result,
      note: h.note ?? undefined,
    });
    historyById.set(h.technique_id, list);
  }

  const raw = (techniques ?? []).map((t) => ({
    subject: t.subject,
    skill_name: t.skill_name,
    slug: t.slug,
    score: t.score,
    prerequisites: prereqNamesById.get(t.id) ?? [],
    source: sourcesById.get(t.id) ?? [],
    unit: t.unit,
    last_reviewed: t.last_reviewed,
    history: historyById.get(t.id) ?? [],
    status: (t.status as Status | null) ?? deriveStatus(t.score),
  }));
  const byName = new Map(raw.map((c) => [c.skill_name, c]));

  return raw.map((c) => {
    const locked = c.prerequisites.some((p) => {
      const prereq = byName.get(p);
      return !prereq || prereq.score < 40;
    });
    const rusty = isRusty(c);
    return { ...c, locked, rusty };
  });
}

export async function getSubjects(): Promise<string[]> {
  const { data } = await supabase.from("techniques").select("subject");
  return Array.from(new Set((data ?? []).map((t) => t.subject)));
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

export type Exercise = {
  subject: string;
  title: string;
  type: string;
  minutes: number;
  retry: boolean;
  rewardXp: number;
  date: string;
};

/** Reads every exercise file under 04-Exercises/. */
export function getExercises(): Exercise[] {
  const dir = path.join(VAULT_ROOT, "04-Exercises");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf-8"));
      return {
        subject: data.subject,
        title: data.title,
        type: data.type,
        minutes: data.minutes,
        retry: !!data.retry,
        rewardXp: data.reward_xp,
        date: data.date,
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

export type CycleInfo = {
  cycleNumber: number;
  week: number; // 1-5
  lengthWeeks: number;
  bossPrep: boolean;
  daysUntilBossPrep: number;
};

/** Reads 03-Reviews/cycle-log.md to compute the current week of the exam cycle. */
export function getCycleInfo(): CycleInfo {
  const file = path.join(VAULT_ROOT, "03-Reviews", "cycle-log.md");
  const fallback: CycleInfo = {
    cycleNumber: 1,
    week: 1,
    lengthWeeks: 5,
    bossPrep: false,
    daysUntilBossPrep: 21,
  };
  if (!fs.existsSync(file)) return fallback;

  const { data } = matter(fs.readFileSync(file, "utf-8"));
  const start = new Date(data.cycle_start).getTime();
  const lengthWeeks = data.cycle_length_weeks ?? 5;
  const daysSinceStart = Math.floor((Date.now() - start) / 86400000);
  const week = Math.min(lengthWeeks, Math.max(1, Math.floor(daysSinceStart / 7) + 1));
  const bossPrepWeekStart = (lengthWeeks - 1) * 7;
  const daysUntilBossPrep = Math.max(0, bossPrepWeekStart - daysSinceStart);

  return {
    cycleNumber: data.cycle_number ?? 1,
    week,
    lengthWeeks,
    bossPrep: week === lengthWeeks - 1,
    daysUntilBossPrep,
  };
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

export type AgentTier = "Party" | "NPC" | "Central";

export type Agent = {
  slug: string;
  name: string;
  description: string;
  tools: string[];
  tier: AgentTier;
  cadence: Cadence;
  body: string; // markdown body (role, procedure, output, etc.)
};

/** Tier survives only because the portrait art is filed under it. */
const TIER_BY_SLUG: Record<string, AgentTier> = {
  lyra: "Party",
  atlas: "Party",
  polaris: "Party",
  vega: "NPC",
  rigel: "Central",
  corvus: "Central",
  antares: "Central",
};

/**
 * How often an agent is actually reached for. Taken from the "Use ..." sentence
 * in each agent's own description — Vega "every day", Antares "only in week 5
 * of each exam cycle", and so on.
 *
 * This replaced Party/NPC/Central as the way the roster is organised. That
 * split described write-authority, which is an implementation detail; what a
 * reader of the page wants to know is which of these to reach for today.
 */
export const CADENCE_ORDER = ["daily", "capture", "weekly", "cycle"] as const;
export type Cadence = (typeof CADENCE_ORDER)[number];

const CADENCE_BY_SLUG: Record<string, Cadence> = {
  vega: "daily",
  atlas: "daily",
  lyra: "capture",
  polaris: "weekly",
  rigel: "weekly",
  corvus: "weekly",
  antares: "cycle",
};

const SHARED_CONTRACT_HEADING = "## Shared contract";

function splitBody(content: string): { body: string; contract: string } {
  const idx = content.indexOf(SHARED_CONTRACT_HEADING);
  const withoutContract = idx === -1 ? content.trim() : content.slice(0, idx).trim();
  const contract = idx === -1 ? "" : content.slice(idx).trim();
  // Drop the leading "# Name — the Role" heading — the Cast card/detail
  // header already shows name + tier, so it'd be redundant here.
  const body = withoutContract.replace(/^#\s+.*\n+/, "").trim();
  return { body, contract };
}

/** Reads the real .claude/agents/*.md files — the single source of truth
 * for both the agent's runtime prompt and the Cast page content. The
 * shared contract section is split out so it can be shown once, not once
 * per agent card. */
export function getAgents(): Agent[] {
  const dir = path.join(VAULT_ROOT, ".claude", "agents");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, f), "utf-8")
      );
      const { body } = splitBody(content);
      return {
        slug,
        name: slug.charAt(0).toUpperCase() + slug.slice(1),
        description: data.description ?? "",
        tools: (data.tools ?? "")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
        tier: TIER_BY_SLUG[slug] ?? "Party",
        cadence: CADENCE_BY_SLUG[slug] ?? "weekly",
        body,
      };
    });
}

/** Extracts the shared 8-point contract from any one agent file — it's
 * identical across all of them, so this is shown once on the Cast page
 * instead of repeated per card. */
export function getSharedContract(): string {
  const dir = path.join(VAULT_ROOT, ".claude", "agents");
  if (!fs.existsSync(dir)) return "";
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  if (!files.length) return "";
  const { content } = matter(
    fs.readFileSync(path.join(dir, files[0]), "utf-8")
  );
  // Drop the "## Shared contract (...)" heading itself — the Cast page
  // already renders its own "Shared Contract" box header.
  return splitBody(content).contract.replace(/^##\s+.*\n+/, "").trim();
}
