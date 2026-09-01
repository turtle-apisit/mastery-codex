"use client";

import { useMemo, useState } from "react";
import type { Concept } from "@/lib/techniques";
import { buildGraph } from "@/lib/skillGraph";
import ConstellationGraph, { statusClass } from "@/components/ConstellationGraph";
import SystemView from "@/components/SystemView";

type StatusFilter = "mastered" | "training" | "untrained";
type FlagFilter = "rusty" | "locked";
type Filter = "all" | StatusFilter | FlagFilter;
type View = "chart" | "list";

const STATUS_FILTERS: StatusFilter[] = ["mastered", "training", "untrained"];
const FLAG_FILTERS: FlagFilter[] = ["rusty", "locked"];

/**
 * `status` is one bucket of three; `rusty` and `locked` are flags that lie on
 * top of it. Filtering by "training" therefore still shows the training skills
 * that have gone rusty — they are the ones most worth seeing.
 */
function matches(c: Concept, filter: Filter): boolean {
  if (filter === "all") return true;
  if (filter === "rusty") return c.rusty;
  if (filter === "locked") return c.locked;
  return c.status === filter;
}

const label = (f: Filter) =>
  f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1);

export default function SkillInventory({ concepts }: { concepts: Concept[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("chart");
  const [selected, setSelected] = useState<string | null>(null);
  /** null = system view (level 1); a subject = inside that planet (level 2) */
  const [openSubject, setOpenSubject] = useState<string | null>(null);

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

  const open = subjects.find((s) => s.subject === openSubject) ?? null;

  function enter(subject: string) {
    setOpenSubject(subject);
    setSelected(null);
  }
  function leave() {
    setOpenSubject(null);
    setSelected(null);
  }

  return (
    <div className="inventory">
      <div className="inv-head">
        <h2>
          Skills Acquired<span className="inv-total num">{concepts.length}</span>
        </h2>
        <div className="view-toggle" role="group" aria-label="Skill view">
          {(["chart", "list"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              className={"view-btn" + (view === v ? " active" : "")}
              onClick={() => setView(v)}
              aria-pressed={view === v}
            >
              {v === "chart" ? "Star Chart" : "List"}
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
        ) : view === "list" ? (
          <>Every skill in the vault, grouped by discipline.</>
        ) : open ? (
          <>Drag to pan, pinch or scroll to zoom, tap a neuron to trace it.</>
        ) : (
          <>Three disciplines orbiting the codex. Select one to enter it.</>
        )}
      </p>

      {view === "list" ? (
        <div className="inv-groups">
          {subjects.map(({ subject, concepts: list }) => {
            const hits = list.filter((c) => matches(c, filter)).length;
            if (hits === 0) return null;
            return (
              <section className="subject-card cut-sm" key={subject}>
                <div className="subject-head static">
                  <span className="subject-name">{subject}</span>
                  <span className="subject-meta num">
                    {filter === "all" ? (
                      <>
                        {list.length}
                        <i> skills</i>
                      </>
                    ) : (
                      <>
                        {hits} of {list.length}
                      </>
                    )}
                  </span>
                </div>
                <SkillList concepts={list} filter={filter} />
              </section>
            );
          })}
        </div>
      ) : open ? (
        <section className="subject-card cut-sm">
          <div className="subject-head static">
            <button type="button" className="back-btn" onClick={leave}>
              <span aria-hidden="true">‹</span> System
            </button>
            <span className="subject-name">{open.subject}</span>
            <span className="subject-meta num">
              {open.concepts.length}
              <i> skills</i> · {open.graph.edges.length}
              <i> links</i>
            </span>
          </div>
          <ConstellationGraph
            subject={open.subject}
            concepts={open.concepts}
            isLit={(c) => matches(c, filter)}
            selected={selected}
            onSelect={setSelected}
          />
        </section>
      ) : (
        <section className="subject-card cut-sm">
          <SystemView subjects={subjects} onOpen={enter} />
        </section>
      )}
    </div>
  );
}

function SkillList({
  concepts,
  filter,
}: {
  concepts: Concept[];
  filter: Filter;
}) {
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
