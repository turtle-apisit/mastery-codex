"use client";

import { useMemo, useState } from "react";
import type { Concept } from "@/lib/vault";

type Filter = "all" | "mastered" | "training" | "untrained" | "locked" | "rusty";

export default function SkillInventory({ concepts }: { concepts: Concept[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c = { mastered: 0, training: 0, untrained: 0, locked: 0, rusty: 0 };
    for (const concept of concepts) {
      if (concept.locked) c.locked++;
      else if (concept.rusty) c.rusty++;
      else c[concept.status]++;
    }
    return c;
  }, [concepts]);

  const bySubject = useMemo(() => {
    const map = new Map<string, Concept[]>();
    for (const c of concepts) {
      if (!map.has(c.subject)) map.set(c.subject, []);
      map.get(c.subject)!.push(c);
    }
    return Array.from(map.entries());
  }, [concepts]);

  function visible(c: Concept): boolean {
    if (filter === "all") return true;
    if (filter === "rusty") return c.rusty;
    if (c.rusty) return false;
    if (filter === "locked") return c.locked;
    return !c.locked && c.status === filter;
  }

  return (
    <div className="inventory">
      <div className="inv-head">
        <h2>
          Skills Acquired<span className="inv-total num">{concepts.length}</span>
        </h2>
        <div className="stat-row">
          <span className="tag mastered"><span className="dot mastered" />{counts.mastered} Mastered</span>
          <span className="tag training"><span className="dot training" />{counts.training} Training</span>
          <span className="tag untrained"><span className="dot untrained" />{counts.untrained} Untrained</span>
          <span className="tag locked"><span className="dot locked" />{counts.locked} Locked</span>
          <span className="tag rusty"><span className="dot rusty" />{counts.rusty} Rusty</span>
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Filter skills by status">
        {(["all", "mastered", "training", "untrained", "locked", "rusty"] as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={"filter-btn" + (filter === f ? " active" : "")}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="inv-groups">
        {bySubject.map(([subject, subjectConcepts]) => (
          <div className="inv-group" key={subject}>
            <div className="inv-group-name">{subject}</div>
            <div className="inv-grid">
              {subjectConcepts
                .filter(visible)
                .map((c) => (
                  <div
                    key={c.slug}
                    className={
                      "inv-chip" +
                      (c.locked ? " locked" : ` ${c.status}`) +
                      (c.rusty ? " rusty" : "")
                    }
                  >
                    {!c.locked && <span className={"dot " + c.status} />}
                    {c.skill_name}
                    <em className="num">{c.locked ? "—" : `Lv ${Math.floor(c.score / 10)}`}</em>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
