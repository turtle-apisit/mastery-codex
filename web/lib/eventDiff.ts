/**
 * The vault is read-only and rendered once per build — there is no live event
 * stream to subscribe to. So "events" are the difference between the state this
 * browser is seeing now and the state it saw last time it loaded the app. That
 * means they fire when the vault's files actually changed since your last
 * visit, not live during a session, and they are per-browser rather than synced.
 */

const KEY = "mc:snapshot";

export type Snapshot = {
  jobLevels: Record<string, number>;
  mastered: string[];
  streak: number;
};

export type GameEvent = {
  kind: "levelup" | "mastered" | "streak";
  title: string;
  detail: string;
};

export function loadSnapshot(): Snapshot | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Snapshot) : null;
  } catch {
    return null;
  }
}

export function saveSnapshot(s: Snapshot): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    // private mode / storage disabled — events just never fire, which is fine
  }
}

export function diffSnapshots(prev: Snapshot, next: Snapshot): GameEvent[] {
  const events: GameEvent[] = [];

  for (const [subject, level] of Object.entries(next.jobLevels)) {
    const before = prev.jobLevels[subject];
    if (before !== undefined && level > before) {
      events.push({
        kind: "levelup",
        title: "Level Up",
        detail: `${subject} — Lv ${before} → ${level}`,
      });
    }
  }

  const was = new Set(prev.mastered);
  for (const name of next.mastered) {
    if (!was.has(name)) {
      events.push({ kind: "mastered", title: "Skill Mastered", detail: name });
    }
  }

  if (next.streak > prev.streak) {
    events.push({
      kind: "streak",
      title: "Streak Extended",
      detail: `${next.streak} days running`,
    });
  }

  return events;
}
