"use client";

import { useEffect, useState } from "react";
import {
  diffSnapshots,
  loadSnapshot,
  saveSnapshot,
  type GameEvent,
  type Snapshot,
} from "@/lib/eventDiff";

export default function EventToasts({ snapshot }: { snapshot: Snapshot }) {
  const [events, setEvents] = useState<GameEvent[]>([]);
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const prev = loadSnapshot();
    // Persist immediately, not on dismiss — otherwise a reload before the
    // toasts time out would replay the same events.
    saveSnapshot(snapshot);
    if (!prev) return; // first ever visit: record silently
    setEvents(diffSnapshots(prev, snapshot).slice(0, 4));
  }, [snapshot]);

  useEffect(() => {
    if (!events.length) return;
    const timers = events.map((_, i) =>
      setTimeout(() => {
        setDismissed((d) => new Set(d).add(i));
      }, 4500 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, [events]);

  const visible = events
    .map((e, i) => ({ e, i }))
    .filter(({ i }) => !dismissed.has(i));

  if (!visible.length) return null;

  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {visible.map(({ e, i }) => (
        <button
          type="button"
          className={"toast cut-sm " + e.kind}
          key={i}
          onClick={() => setDismissed((d) => new Set(d).add(i))}
        >
          <span className="toast-title">{e.title}</span>
          <span className="toast-detail">{e.detail}</span>
        </button>
      ))}
    </div>
  );
}
