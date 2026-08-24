import fs from "fs";
import path from "path";
import matter from "gray-matter";

// The web app lives in web/, the vault (concept notes, exercises, agents,
// art) lives one level up at the repo root.
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
  last_reviewed: string | null;
  history: HistoryEntry[];
  // derived
  status: Status;
  locked: boolean;
  rusty: boolean;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
 * regardless of whether Bram ever actually logged a rust-check. Sable is
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

function readConceptFile(filePath: string): Omit<
  Concept,
  "status" | "locked" | "rusty"
> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return {
    subject: data.subject,
    skill_name: data.skill_name,
    slug: slugify(data.skill_name),
    score: data.score ?? 0,
    prerequisites: data.prerequisites ?? [],
    source: data.source ?? [],
    last_reviewed: data.last_reviewed ?? null,
    history: data.history ?? [],
  };
}

/** Reads every concept note in the vault and derives status/locked/rusty. */
export function getAllConcepts(): Concept[] {
  const conceptsDir = path.join(VAULT_ROOT, "02-Concepts");
  if (!fs.existsSync(conceptsDir)) return [];

  const files: string[] = [];
  for (const subject of fs.readdirSync(conceptsDir)) {
    const subjectDir = path.join(conceptsDir, subject);
    if (!fs.statSync(subjectDir).isDirectory()) continue;
    for (const f of fs.readdirSync(subjectDir)) {
      if (f.endsWith(".md")) files.push(path.join(subjectDir, f));
    }
  }

  const raw = files.map(readConceptFile);
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

export function getSubjects(): string[] {
  const conceptsDir = path.join(VAULT_ROOT, "02-Concepts");
  if (!fs.existsSync(conceptsDir)) return [];
  return fs
    .readdirSync(conceptsDir)
    .filter((f) => fs.statSync(path.join(conceptsDir, f)).isDirectory());
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

export function getJobSummaries(): JobSummary[] {
  const all = getAllConcepts();
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
    for (const c of concepts) {
      if (c.locked) locked++;
      else if (c.rusty) rusty++;
      else if (c.status === "mastered") mastered++;
      else if (c.status === "training") training++;
      else untrained++;
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
export function getQuestLog(): LogEntry[] {
  const all = getAllConcepts();
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
export function getStreak(): number {
  const dates = Array.from(
    new Set(getQuestLog().map((e) => e.date))
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
  body: string; // markdown body (role, procedure, output, etc.)
};

const TIER_BY_SLUG: Record<string, AgentTier> = {
  yuki: "Party",
  bram: "Party",
  sable: "Party",
  orin: "NPC",
  vesna: "Central",
  kade: "Central",
  ashen: "Central",
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
