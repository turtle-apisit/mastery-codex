"use client";

import { useMemo, useState } from "react";
import type { Concept } from "@/lib/vault";
import {
  buildGraph,
  NODE_H,
  NODE_W,
  type SubjectGraph,
} from "@/lib/skillGraph";

type StatusFilter = "mastered" | "training" | "untrained";
type FlagFilter = "rusty" | "locked";
type Filter = "all" | StatusFilter | FlagFilter;
type View = "graph" | "list";

const STATUS_FILTERS: StatusFilter[] = ["mastered", "training", "untrained"];
const FLAG_FILTERS: FlagFilter[] = ["rusty", "locked"];

/**
 * `status` is one bucket of three; `rusty` and `locked` are flags that lie on
 * top of it. Filtering by "training" therefore still shows the training
 * concepts that have gone rusty — they are the ones most worth seeing.
 */
function matches(c: Concept, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "rusty") return c.rusty;
  if (filter === "locked") return c.locked;
  return c.status === filter;
}

function label(f: Filter): string {
  return f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1);
}

export default function SkillInventory({ concepts }: { concepts: Concept[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("graph");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c = { mastered: 0, training: 0, untrained: 0, locked: 0, rusty: 0 };
    for (const concept of concepts) {
      c[concept.status]++;
      if (concept.locked) c.locked++;
      if (concept.rusty) c.rusty++;
    }
    return c;
  }, [concepts]);

  const subjects = useMemo(() => {
    const map = new Map<string, Concept[]>();
    for (const c of concepts) {
      if (!map.has(c.subject)) map.set(c.subject, []);
      map.get(c.subject)!.push(c);
    }
    return Array.from(map.entries()).map(([subject, list]) => ({
      subject,
      concepts: list,
      graph: buildGraph(list),
    }));
  }, [concepts]);

  function toggleCollapse(subject: string) {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(subject)) next.delete(subject);
      else next.add(subject);
      return next;
    });
  }

  return (
    <div className="inventory">
      <div className="inv-head">
        <h2>
          Skills Acquired<span className="inv-total num">{concepts.length}</span>
        </h2>
        <div className="view-toggle" role="group" aria-label="Skill view">
          {(["graph", "list"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              className={"view-btn" + (view === v ? " active" : "")}
              onClick={() => setView(v)}
              aria-pressed={view === v}
            >
              {v === "graph" ? "Graph" : "List"}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-row" role="group" aria-label="Filter skills">
        <button
          type="button"
          className={"filter-btn" + (filter === "all" ? " active" : "")}
          onClick={() => setFilter("all")}
        >
          All<span className="filter-n num">{concepts.length}</span>
        </button>

        <span className="filter-sep" aria-hidden="true" />

        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-btn ${f}` + (filter === f ? " active" : "")}
            onClick={() => setFilter(f)}
          >
            <span className={"dot " + f} />
            {label(f)}
            <span className="filter-n num">{counts[f]}</span>
          </button>
        ))}

        <span className="filter-sep" aria-hidden="true" />

        {FLAG_FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-btn flag ${f}` + (filter === f ? " active" : "")}
            onClick={() => setFilter(f)}
          >
            <span className={"dot " + f} />
            {label(f)}
            <span className="filter-n num">{counts[f]}</span>
          </button>
        ))}
      </div>

      <p className="filter-note">
        {filter === "rusty" || filter === "locked" ? (
          <>
            <strong>{label(filter)}</strong> is a flag, not a bucket — these
            skills are also counted under their status above.
          </>
        ) : (
          <>Click any skill to trace what it needs and what needs it.</>
        )}
      </p>

      <div className="inv-groups">
        {subjects.map(({ subject, concepts: list, graph }) => {
          const hits = list.filter((c) => matches(c, filter)).length;
          if (hits === 0) return null;
          const isCollapsed = collapsed.has(subject);

          return (
            <section className="subject-card cut-sm" key={subject}>
              <button
                type="button"
                className="subject-head"
                onClick={() => toggleCollapse(subject)}
                aria-expanded={!isCollapsed}
              >
                <span className={"chev" + (isCollapsed ? " closed" : "")} aria-hidden="true" />
                <span className="subject-name">{subject}</span>
                <span className="subject-meta num">
                  {filter === "all" ? (
                    <>{list.length} skills</>
                  ) : (
                    <>
                      {hits} of {list.length}
                    </>
                  )}
                </span>
              </button>

              {!isCollapsed &&
                (view === "graph" ? (
                  <SkillGraph
                    graph={graph}
                    filter={filter}
                    selected={selected}
                    onSelect={setSelected}
                  />
                ) : (
                  <SkillList concepts={list} filter={filter} />
                ))}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function statusClass(c: Concept): string {
  return [c.status, c.locked ? "locked" : "", c.rusty ? "rusty" : ""]
    .filter(Boolean)
    .join(" ");
}

function SkillGraph({
  graph,
  filter,
  selected,
  onSelect,
}: {
  graph: SubjectGraph;
  filter: Filter;
  selected: string | null;
  onSelect: (slug: string | null) => void;
}) {
  const inSubject = graph.nodes.some((n) => n.concept.slug === selected);
  const active = inSubject ? selected : null;

  // A selection lights up the whole dependency chain through the node; with no
  // selection the filter decides. Either way nodes are dimmed rather than
  // removed, because pulling nodes out of a graph destroys the shape you came
  // to read.
  const lit = useMemo(() => {
    if (!active) return null;
    const set = new Set<string>([active]);
    for (const s of graph.ancestors.get(active) ?? []) set.add(s);
    for (const s of graph.descendants.get(active) ?? []) set.add(s);
    return set;
  }, [active, graph]);

  function isLit(slug: string, c: Concept): boolean {
    if (lit) return lit.has(slug);
    return matches(c, filter);
  }

  return (
    <div className="graph-scroll">
      <svg
        className="skill-graph"
        width={graph.width}
        height={graph.height}
        viewBox={`0 0 ${graph.width} ${graph.height}`}
        role="img"
        aria-label="Prerequisite graph. Skills flow left to right; each arrow points from a prerequisite to the skill that needs it."
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 7 4 L 0 7 z" fill="currentColor" />
          </marker>
        </defs>

        <g className="edges">
          {graph.edges.map((e) => {
            const on =
              lit !== null
                ? lit.has(e.from) && lit.has(e.to)
                : filter === "all";
            return (
              <path
                key={`${e.from}->${e.to}`}
                d={e.d}
                className={"edge" + (on ? " lit" : "")}
                markerEnd="url(#arrow)"
              />
            );
          })}
        </g>

        <g className="nodes">
          {graph.nodes.map((n) => {
            const c = n.concept;
            const on = isLit(c.slug, c);
            return (
              <g
                key={c.slug}
                className={
                  "gnode " + statusClass(c) + (on ? " lit" : " dim") +
                  (c.slug === active ? " selected" : "")
                }
                transform={`translate(${n.x}, ${n.y})`}
                onClick={() => onSelect(active === c.slug ? null : c.slug)}
                tabIndex={0}
                role="button"
                aria-pressed={c.slug === active}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    onSelect(active === c.slug ? null : c.slug);
                  }
                }}
              >
                <title>
                  {c.skill_name}
                  {c.locked ? " — locked" : ""}
                  {c.rusty ? " — rusty" : ""}
                  {c.prerequisites.length
                    ? `\nNeeds: ${c.prerequisites.join(", ")}`
                    : "\nNo prerequisites"}
                </title>
                <rect className="gnode-box" width={NODE_W} height={NODE_H} rx="7" />
                <rect className="gnode-stripe" width="3" height={NODE_H} rx="1.5" />
                <text className="gnode-label" x="13" y={NODE_H / 2 - (n.lines.length - 1) * 6.5 + 4}>
                  {n.lines.map((line, i) => (
                    <tspan key={i} x="13" dy={i === 0 ? 0 : 13}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {c.locked && (
                  <text className="gnode-flag lock" x={NODE_W - 9} y="15">
                    ✕
                  </text>
                )}
                {c.rusty && (
                  <text className="gnode-flag rust" x={NODE_W - 9} y={NODE_H - 7}>
                    ⟳
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

function SkillList({ concepts, filter }: { concepts: Concept[]; filter: Filter }) {
  const visible = concepts.filter((c) => matches(c, filter));
  return (
    <div className="inv-grid">
      {visible.map((c) => (
        <div className={"inv-chip " + statusClass(c)} key={c.slug}>
          <span className="chip-name">{c.skill_name}</span>
          <span className="chip-flags" aria-hidden="true">
            {c.rusty && <i className="rust">⟳</i>}
            {c.locked && <i className="lock">✕</i>}
          </span>
          <em className="num">Lv {Math.floor(c.score / 10)}</em>
        </div>
      ))}
    </div>
  );
}
