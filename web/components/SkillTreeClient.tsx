"use client";

import { useMemo, useState } from "react";
import type { Concept } from "@/lib/vault";

const TIER_X = 212;
const ROW_Y = 110;
const NODE_W = 172;
const NODE_H = 58;
const PAD_X = 100;
const PAD_Y = 60;

type Positioned = Concept & { x: number; y: number };

function layoutTree(concepts: Concept[]): { nodes: Positioned[]; width: number; height: number } {
  const byName = new Map(concepts.map((c) => [c.skill_name, c]));
  const depthCache = new Map<string, number>();

  function depthOf(name: string, seen: Set<string> = new Set()): number {
    if (depthCache.has(name)) return depthCache.get(name)!;
    if (seen.has(name)) return 0; // guard against accidental cycles
    const c = byName.get(name);
    if (!c || !c.prerequisites.length) {
      depthCache.set(name, 0);
      return 0;
    }
    const seen2 = new Set(seen).add(name);
    const d = 1 + Math.max(...c.prerequisites.map((p) => depthOf(p, seen2)));
    depthCache.set(name, d);
    return d;
  }

  const tiers = new Map<number, Concept[]>();
  for (const c of concepts) {
    const d = depthOf(c.skill_name);
    if (!tiers.has(d)) tiers.set(d, []);
    tiers.get(d)!.push(c);
  }

  const nodes: Positioned[] = [];
  const tierIndices = Array.from(tiers.keys()).sort((a, b) => a - b);
  let maxRows = 1;
  for (const tierIdx of tierIndices) {
    const rows = tiers.get(tierIdx)!;
    maxRows = Math.max(maxRows, rows.length);
    rows.forEach((c, i) => {
      nodes.push({
        ...c,
        x: PAD_X + tierIdx * TIER_X,
        y: PAD_Y + i * ROW_Y,
      });
    });
  }

  const width = PAD_X * 2 + (tierIndices.length - 1) * TIER_X + NODE_W;
  const height = PAD_Y * 2 + (maxRows - 1) * ROW_Y + NODE_H;

  return { nodes, width: Math.max(width, 500), height: Math.max(height, 300) };
}

function statusOf(c: Concept): string {
  return c.locked ? "locked" : c.status;
}

export default function SkillTreeClient({
  concepts,
  subjects,
}: {
  concepts: Concept[];
  subjects: string[];
}) {
  const [subject, setSubject] = useState(subjects[0] ?? "");
  const [selected, setSelected] = useState<Concept | null>(null);

  const subjectConcepts = useMemo(
    () => concepts.filter((c) => c.subject === subject),
    [concepts, subject]
  );
  const { nodes, width, height } = useMemo(
    () => layoutTree(subjectConcepts),
    [subjectConcepts]
  );
  const byName = useMemo(
    () => new Map(nodes.map((n) => [n.skill_name, n])),
    [nodes]
  );

  const edges: {
    from: Positioned;
    to: Positioned;
    toLocked: boolean;
    charged: boolean;
  }[] = [];
  for (const node of nodes) {
    for (const prereqName of node.prerequisites) {
      const from = byName.get(prereqName);
      if (from) {
        edges.push({
          from,
          to: node,
          toLocked: node.locked,
          charged: !node.locked && from.status === "mastered",
        });
      }
    }
  }

  return (
    <>
      <div className="subject-tabs" role="tablist" aria-label="Subject">
        {subjects.map((s) => (
          <button
            key={s}
            type="button"
            className={"filter-btn" + (s === subject ? " active" : "")}
            onClick={() => {
              setSubject(s);
              setSelected(null);
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <section className="panel">
        <h2>Skill Tree &middot; {subject}</h2>
        <div className="legend">
          <span className="legend-item"><span className="dot mastered" />Mastered</span>
          <span className="legend-item"><span className="dot training" />Training</span>
          <span className="legend-item"><span className="dot untrained" />Untrained</span>
          <span className="legend-item"><span className="dot locked" />Locked</span>
          <span className="legend-item"><span className="dot rusty" />Rusty (needs review)</span>
        </div>
        <div className="tree-scroll">
          <div className="tree-canvas" style={{ width, height }}>
            <svg width={width} height={height}>
              {edges.map((e, i) => (
                <line
                  key={i}
                  x1={e.from.x + NODE_W / 2}
                  y1={e.from.y + NODE_H / 2}
                  x2={e.to.x + NODE_W / 2}
                  y2={e.to.y + NODE_H / 2}
                  className={
                    e.toLocked ? "to-locked" : e.charged ? "to-charged" : ""
                  }
                />
              ))}
            </svg>
            {nodes.map((n) => (
              <button
                key={n.slug}
                type="button"
                disabled={n.locked}
                className={
                  "node " +
                  statusOf(n) +
                  (n.rusty ? " rusty" : "") +
                  (selected?.slug === n.slug ? " selected" : "")
                }
                style={{ left: n.x + NODE_W / 2, top: n.y + NODE_H / 2 }}
                onClick={() => setSelected(n)}
              >
                <span className="n-title">{n.skill_name}</span>
                <span className="n-meta">
                  {n.locked ? (
                    "Locked"
                  ) : (
                    <>
                      <span className={"dot " + n.status} />
                      Lv {Math.floor(n.score / 10)} &middot; {n.score}/100
                      {n.rusty ? " · rusty" : ""}
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="panel detail">
        <h2>Skill Detail</h2>
        {selected ? (
          <>
            <div className="detail-head">
              <span className="detail-name">{selected.skill_name}</span>
              <span className={"detail-pill " + statusOf(selected)}>
                {statusOf(selected)}
                {selected.rusty ? " · rusty" : ""}
              </span>
            </div>
            {!selected.locked && (
              <div className="detail-score num">{selected.score} / 100</div>
            )}
            <div className="detail-source">
              Source: <span>{selected.source.join(", ")}</span>
            </div>
            <ul className="detail-log">
              {selected.history.map((h, i) => (
                <li key={i}>
                  <time>{h.date}</time>
                  <span className={"delta" + (h.activity === "rust-check" ? " decay" : "")}>
                    {h.delta > 0 ? `+${h.delta}` : h.delta === 0 ? "—" : h.delta}
                  </span>
                  <span>
                    {h.activity} &mdash; {h.note}
                  </span>
                </li>
              ))}
            </ul>
            {selected.locked && (
              <div className="detail-note locked-note">
                Locked &mdash; requires {selected.prerequisites.join(", ")} to reach Training level first.
              </div>
            )}
          </>
        ) : (
          <p className="detail-empty">
            Click a skill node above to see where it came from &mdash; source material and every exercise that leveled it up.
          </p>
        )}
      </section>
    </>
  );
}
