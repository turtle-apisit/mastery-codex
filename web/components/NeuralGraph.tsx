"use client";

import { useEffect, useMemo } from "react";
import type { Concept } from "@/lib/vault";
import type { GraphNode, SubjectGraph } from "@/lib/skillGraph";
import { useViewport } from "@/lib/useViewport";

/** Labels are 11 graph units tall, so below this scale they render under ~9px
 *  on screen and stop being readable. Past that point the graph is an overview
 *  and names come from tapping a neuron. */
const LABEL_SCALE = 0.8;

const STATUSES = ["mastered", "training", "untrained", "locked"] as const;

export function statusClass(c: Concept): string {
  return [c.status, c.locked ? "locked" : "", c.rusty ? "rusty" : ""]
    .filter(Boolean)
    .join(" ");
}

export default function NeuralGraph({
  graph,
  subject,
  isLit,
  selected,
  onSelect,
}: {
  graph: SubjectGraph;
  subject: string;
  isLit: (c: Concept) => boolean;
  selected: string | null;
  onSelect: (slug: string | null) => void;
}) {
  // Destructured rather than kept as `vp.*`: the react-hooks lint rule treats
  // any object holding a ref as ref-like and flags reading its other fields
  // during render.
  const {
    hostRef,
    box,
    scale,
    dragging,
    didDrag,
    fit,
    zoomBy,
    centerOn,
    handlers,
  } = useViewport(graph);

  const active = graph.byId.has(selected ?? "") ? selected : null;

  // A selection lights its whole dependency chain in both directions;
  // otherwise the filter decides. Nodes are dimmed rather than removed —
  // pulling nodes out of a graph destroys the shape you opened it to read.
  const chain = useMemo(() => {
    if (!active) return null;
    const set = new Set<string>([active]);
    for (const s of graph.ancestors.get(active) ?? []) set.add(s);
    for (const s of graph.descendants.get(active) ?? []) set.add(s);
    return set;
  }, [active, graph]);

  const on = (slug: string, c: Concept) => (chain ? chain.has(slug) : isLit(c));

  const selectedNode = active ? graph.byId.get(active) ?? null : null;
  const showLabels = scale >= LABEL_SCALE;

  // Escape clears the selection — a graph you cannot back out of is a trap.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSelect(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onSelect]);

  const gid = `g-${subject.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div className="neural">
      <div
        className={"neural-stage" + (dragging ? " grabbing" : "")}
        ref={hostRef}
        {...handlers}
      >
        <svg
          className="neural-svg"
          viewBox={[box.x, box.y, box.w, box.h].join(" ")}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${subject} prerequisite network. ${graph.nodes.length} skills connected by ${graph.edges.length} prerequisite links, flowing left to right from what to learn first.`}
        >
          <defs>
            {/* One halo gradient per status, reused by every neuron. A real
                blur filter on 145 nodes is what makes these charts crawl. */}
            {STATUSES.map((s) => (
              <radialGradient id={`${gid}-halo-${s}`} key={s}>
                <stop offset="0%" stopColor={`var(--${s})`} stopOpacity="0.55" />
                <stop offset="55%" stopColor={`var(--${s})`} stopOpacity="0.12" />
                <stop offset="100%" stopColor={`var(--${s})`} stopOpacity="0" />
              </radialGradient>
            ))}
            <radialGradient id={`${gid}-halo-accent`}>
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.7" />
              <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g className="synapses">
            {graph.edges.map((e) => {
              const lit = chain ? chain.has(e.from) && chain.has(e.to) : false;
              return (
                <path
                  key={`${e.from}~${e.to}`}
                  d={e.d}
                  className={"synapse" + (lit ? " lit" : "")}
                  style={
                    lit
                      ? ({
                          strokeDasharray: `${Math.round(e.len / 7)} ${e.len}`,
                          "--len": String(e.len),
                        } as React.CSSProperties)
                      : undefined
                  }
                />
              );
            })}
          </g>

          <g className="neurons">
            {graph.nodes.map((n) => {
              const c = n.concept;
              const alive = on(c.slug, c);
              const isSel = c.slug === active;
              const halo = isSel ? "accent" : c.locked ? "locked" : c.status;
              return (
                <g
                  key={c.slug}
                  className={
                    "neuron " +
                    statusClass(c) +
                    (alive ? " lit" : " dim") +
                    (isSel ? " selected" : "")
                  }
                  transform={`translate(${n.x.toFixed(1)} ${n.y.toFixed(1)})`}
                  tabIndex={alive ? 0 : -1}
                  role="button"
                  aria-pressed={isSel}
                  aria-label={c.skill_name}
                  onClick={() => {
                    // A drag that happens to end over a neuron must not select it.
                    if (didDrag()) return;
                    onSelect(isSel ? null : c.slug);
                  }}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      onSelect(isSel ? null : c.slug);
                    }
                  }}
                >
                  <circle
                    className="halo"
                    r={n.r * 2.6}
                    fill={`url(#${gid}-halo-${halo})`}
                  />
                  <circle className="soma" r={n.r} />
                  <circle className="nucleus" r={Math.max(2, n.r * 0.34)} />
                  {c.rusty && <circle className="rust-ring" r={n.r + 4} />}
                  {showLabels && (
                    <text className="axon-label" y={n.r + 15}>
                      {n.lines.map((line, i) => (
                        <tspan key={i} x="0" dy={i === 0 ? 0 : 12}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        <div className="neural-controls">
          <button type="button" onClick={() => zoomBy(1.3)} aria-label="Zoom in">
            +
          </button>
          <button
            type="button"
            onClick={() => zoomBy(1 / 1.3)}
            aria-label="Zoom out"
          >
            −
          </button>
          <button type="button" className="wide" onClick={fit}>
            Fit
          </button>
        </div>

        {!showLabels && !selectedNode && (
          <p className="neural-hint">Zoom in for names — or tap a neuron</p>
        )}
      </div>

      {selectedNode && (
        <SelectionReadout
          node={selectedNode}
          graph={graph}
          onClear={() => onSelect(null)}
          onJump={(slug) => {
            const t = graph.byId.get(slug);
            if (!t) return;
            onSelect(slug);
            centerOn(t.x, t.y);
          }}
        />
      )}
    </div>
  );
}

function SelectionReadout({
  node,
  graph,
  onClear,
  onJump,
}: {
  node: GraphNode;
  graph: SubjectGraph;
  onClear: () => void;
  onJump: (slug: string) => void;
}) {
  const c = node.concept;
  const needs = c.prerequisites
    .map((p) => graph.nodes.find((n) => n.concept.skill_name === p)?.concept)
    .filter((p): p is Concept => Boolean(p));
  const unlocks = graph.nodes
    .filter((n) => n.concept.prerequisites.includes(c.skill_name))
    .map((n) => n.concept);
  const chainDepth = graph.ancestors.get(c.slug)?.size ?? 0;

  return (
    <div className="readout">
      <div className="readout-head">
        <span className={"dot " + (c.locked ? "locked" : c.status)} />
        <strong>{c.skill_name}</strong>
        <span className="readout-tags">
          <span className={"rtag " + c.status}>{c.status}</span>
          {c.locked && <span className="rtag locked">locked</span>}
          {c.rusty && <span className="rtag rusty">rusty</span>}
        </span>
        <button
          type="button"
          className="readout-x"
          onClick={onClear}
          aria-label="Clear selection"
        >
          ✕
        </button>
      </div>
      <div className="readout-body">
        <div className="readout-col">
          <span className="readout-label">
            Needs first
            {chainDepth > needs.length ? ` · ${chainDepth} in the chain` : ""}
          </span>
          {needs.length ? (
            <div className="readout-links">
              {needs.map((p) => (
                <button key={p.slug} type="button" onClick={() => onJump(p.slug)}>
                  <span className={"dot " + (p.locked ? "locked" : p.status)} />
                  {p.skill_name}
                </button>
              ))}
            </div>
          ) : (
            <p className="readout-none">Nothing — this is a starting point.</p>
          )}
        </div>
        <div className="readout-col">
          <span className="readout-label">Unlocks</span>
          {unlocks.length ? (
            <div className="readout-links">
              {unlocks.map((u) => (
                <button key={u.slug} type="button" onClick={() => onJump(u.slug)}>
                  <span className={"dot " + (u.locked ? "locked" : u.status)} />
                  {u.skill_name}
                </button>
              ))}
            </div>
          ) : (
            <p className="readout-none">Nothing yet — end of this branch.</p>
          )}
        </div>
      </div>
    </div>
  );
}
