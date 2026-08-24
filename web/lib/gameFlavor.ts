/**
 * Display-only game framing derived from data the vault already has.
 * Nothing here is persisted or read back — it exists to give the UI
 * quest-board and job-class texture without inventing new vault fields.
 */

/** Monster-Hunter-style quest rank, from the reward the exercise already carries. */
export function questRank(rewardXp: number): "S" | "A" | "B" | "C" {
  if (rewardXp >= 30) return "S";
  if (rewardXp >= 20) return "A";
  if (rewardXp >= 10) return "B";
  return "C";
}

/** Ragnarok-style class title for a subject, from its computed level. */
export function classTitle(level: number): string {
  if (level >= 8) return "Master";
  if (level >= 5) return "Expert";
  if (level >= 3) return "Adept";
  if (level >= 1) return "Apprentice";
  return "Novice";
}

const SUBJECT_GLYPHS: { match: string; glyph: string }[] = [
  { match: "machine learning", glyph: "◈" },
  { match: "architecture", glyph: "▣" },
  { match: "language", glyph: "◆" },
  { match: "mlops", glyph: "⬢" },
  { match: "deployment", glyph: "⬢" },
  { match: "data", glyph: "▤" },
];

/**
 * Subjects are arbitrary folder names, so this matches on keywords and falls
 * back to a generic emblem rather than assuming a fixed set.
 */
export function subjectGlyph(subject: string): string {
  const s = subject.toLowerCase();
  return SUBJECT_GLYPHS.find((g) => s.includes(g.match))?.glyph ?? "◇";
}

const TYPE_GLYPHS: { match: string; glyph: string }[] = [
  { match: "essay", glyph: "✎" },
  { match: "quiz", glyph: "?" },
  { match: "exercise", glyph: "⚔" },
  { match: "problem", glyph: "⚔" },
  { match: "review", glyph: "↺" },
];

export function questTypeGlyph(type: string): string {
  const t = (type ?? "").toLowerCase();
  return TYPE_GLYPHS.find((g) => t.includes(g.match))?.glyph ?? "◆";
}
