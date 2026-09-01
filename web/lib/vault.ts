import fs from "fs";
import path from "path";
import matter from "gray-matter";

// The web app lives in web/, the vault (exercises, reviews, agents, art)
// lives one level up at the repo root. Concept notes (Techniques) no longer
// live here as markdown — see lib/techniques.ts, which reads them from
// Supabase instead.
const VAULT_ROOT = path.join(process.cwd(), "..");

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
