"use client";

import { useEffect, useMemo, useState } from "react";
import type { Concept } from "@/lib/vault";
import { buildClusterLayout } from "@/lib/clusterGraph";
import { useViewport } from "@/lib/useViewport";

const STATUSES = ["mastered", "training", "untrained", "locked"] as const;

export function statusClass(c: Concept): string {
  return [c.status, c.locked ? "locked" : "", c.rusty ? "rusty" : ""]
    .filter(Boolean)
    .join(" ");
}

/**
 * Level 2: a subject drawn as constellations that expand in place.
 *
 * A collapsed cluster is not a placeholder — it still shows one dot per
 * concept, coloured by status, so the size and the state of a group read
 * without opening it. Cross-cluster prerequisites are drawn to the collapsed
 * star, so nothing is hidden by leaving a group shut.
 */
export default function ConstellationGraph({
  subject,
  concepts,
  isLit,
  selected,
  onSelect,
}: {
  subject: string;
  concepts: Concept[];
  isLit: (c: Concept) => boolean;
  selected: string | null;
  onSelect: (slug: string | null) => void;
}) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const layout = useMemo(
    () => buildClusterLayout(concepts, expanded),
    [concepts, expanded]
  );

  const {
    hostRef,

    svgRef,
    initialViewBox,
    labelsOn,
    dragging,
    didDrag,
    fit,
    zoomBy,
    centerOn,
    handlers,
  } = useViewport(layout);

  const active = layout.byId.has(selected ?? "") ? selected : null;
  const showLabels = labelsOn;


  const chain = useMemo(() => {
    if (!selected) return null;
    const set = new Set<string>([selected]);
    for (const s of layout.ancestors.get(selected) ?? []) set.add(s);
    for (const s of layout.descendants.get(selected) ?? []) set.add(s);
    return set;
  }, [selected, layout]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onSelect(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, onSelect]);

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const gid = `c-${subject.replace(/\W+/g, "-").toLowerCase()}`;
  const selectedConcept =
    (selected && concepts.find((c) => c.slug === selected)) || null;
  const openCount = layout.clusters.filter((c) => c.expanded).length;

  return (
    <div className="neural">
      <div
        className={"neural-stage" + (dragging ? " grabbing" : "")}
        ref={hostRef}
        {...handlers}
      >
        <svg
          className="neural-svg"
          ref={svgRef}
          viewBox={initialViewBox}
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={`${subject}: ${layout.clusters.length} lecture groups containing ${concepts.length} skills. Select a group to expand it.`}
        >
          <defs>
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
            <radialGradient id={`${gid}-nebula`}>
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.14" />
              <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* expanded clusters get a faint field behind them so the group is
              still legible as one thing once it is opened */}
          <g className="cluster-fields">
            {layout.clusters
              .filter((c) => c.expanded)
              .map((c) => (
                <rect
                  key={c.id}
                  className="cluster-field"
                  x={c.x + 8}
                  y={c.y + 8}
                  width={Math.max(0, c.w - 16)}
                  height={Math.max(0, c.h - 16)}
                  rx="16"
                />
              ))}
          </g>

          <g className="synapses">
            {layout.edges.map((e) => {
              const lit = chain ? chain.has(e.from) && chain.has(e.to) : false;
              return (
                <path
                  key={`${e.from}~${e.to}`}
                  d={e.d}
                  className={
                    "synapse" + (e.cross ? " cross" : "") + (lit ? " lit" : "")
                  }
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

          {/* collapsed constellations */}
          <g className="constellations">
            {layout.clusters
              .filter((c) => !c.expanded)
              .map((c) => {
                const anyLit = c.concepts.some((x) =>
                  chain ? chain.has(x.slug) : isLit(x)
                );
                return (
                  <g
                    key={c.id}
                    className={"cstar" + (anyLit ? " lit" : " dim")}
                    transform={`translate(${c.cx.toFixed(1)} ${c.cy.toFixed(1)})`}
                    tabIndex={0}
                    role="button"
                    aria-expanded={false}
                    aria-label={`${c.name}, ${c.concepts.length} skills. Expand.`}
                    onClick={() => {
                      if (didDrag()) return;
                      toggle(c.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggle(c.id);
                      }
                    }}
                  >
                    {/* A <g> only receives pointer events where its children
                        are painted, and the nebula and the labels are
                        pointer-events:none. Without this the only hit targets
                        were 2.6px dots and a dashed hairline — 2.4% of the
                        area the group appears to occupy. Note `transparent`,
                        not `none`: fill:none receives nothing. */}
                    <rect
                      className="cstar-hit"
                      x={c.x - c.cx}
                      y={c.y - c.cy}
                      width={c.w}
                      height={c.h}
                      rx="14"
                    />
                    <circle
                      className="cstar-nebula"
                      r={c.starR * 1.9}
                      fill={`url(#${gid}-nebula)`}
                    />
                    <circle className="cstar-ring" r={c.starR + 10} />
                    {/* faint web between the dots — the "constellation" */}
                    <g className="cstar-web">
                      {c.dots.map((d, i) => {
                        const n = c.dots[(i + 1) % c.dots.length];
                        return (
                          <line
                            key={d.slug}
                            x1={d.x}
                            y1={d.y}
                            x2={n.x}
                            y2={n.y}
                          />
                        );
                      })}
                    </g>
                    {c.dots.map((d) => (
                      <circle
                        key={d.slug}
                        className={
                          "cstar-dot " + (d.locked ? "locked" : d.status)
                        }
                        cx={d.x}
                        cy={d.y}
                        r={d.r}
                      />
                    ))}
                    <circle className="cstar-core" r={3.2} />
                    <text className="cstar-name" y={c.starR + 28}>
                      {c.nameLines.map((l, i) => (
                        <tspan key={i} x="0" dy={i === 0 ? 0 : 13}>
                          {l}
                        </tspan>
                      ))}
                    </text>
                    <text
                      className="cstar-meta"
                      y={c.starR + 28 + (c.nameLines.length - 1) * 13 + 15}
                    >
                      {c.concepts.length} SKILLS · TAP TO OPEN
                    </text>
                  </g>
                );
              })}
          </g>

          {/* expanded cluster headers */}
          <g className="cluster-heads">
            {layout.clusters
              .filter((c) => c.expanded)
              .map((c) => (
                <g
                  key={c.id}
                  className="chead"
                  transform={`translate(${(c.x + 20).toFixed(1)} ${(
                    c.y + 26
                  ).toFixed(1)})`}
                  tabIndex={0}
                  role="button"
                  aria-expanded
                  aria-label={`${c.name}. Collapse.`}
                  onClick={() => {
                    if (didDrag()) return;
                    toggle(c.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      toggle(c.id);
                    }
                  }}
                >
                  <rect
                    className="chead-hit"
                    x="-14"
                    y="-18"
                    width={Math.min(c.w - 12, c.name.length * 7.6 + 56)}
                    height="40"
                    rx="8"
                  />
                  <text className="chead-name">
                    {c.name.toUpperCase()}
                    <tspan className="chead-close" dx="10">
                      ✕
                    </tspan>
                  </text>
                  <text className="chead-meta" y="15">
                    {c.concepts.length} SKILLS
                  </text>
                </g>
              ))}
          </g>

          {/* neurons of expanded clusters */}
          <g className="neurons">
            {layout.nodes.map((n) => {
              const c = n.concept;
              const alive = chain ? chain.has(c.slug) : isLit(c);
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
                    if (didDrag()) return;
                    onSelect(isSel ? null : c.slug);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
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
                      {n.lines.map((l, i) => (
                        <tspan key={i} x="0" dy={i === 0 ? 0 : 12}>
                          {l}
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
          {openCount > 0 && (
            <button
              type="button"
              className="wide"
              onClick={() => setExpanded(new Set())}
              aria-label="Collapse all groups"
            >
              Close
            </button>
          )}
        </div>

        {openCount === 0 && (
          <p className="neural-hint">
            {layout.clusters.length} lecture groups · tap one to open it
          </p>
        )}
      </div>

      {selectedConcept && (
        <Readout
          concept={selectedConcept}
          all={concepts}
          ancestors={layout.ancestors}
          onClear={() => onSelect(null)}
          onJump={(slug) => {
            onSelect(slug);
            const t = layout.byId.get(slug);
            if (t) centerOn(t.x, t.y);
            else {
              // the target is inside a closed group: open it, then centre next frame
              const cid = layout.clusterOf.get(slug);
              if (cid) setExpanded((p) => new Set(p).add(cid));
            }
          }}
        />
      )}
    </div>
  );
}

function Readout({
  concept,
  all,
  ancestors,
  onClear,
  onJump,
}: {
  concept: Concept;
  all: Concept[];
  ancestors: Map<string, Set<string>>;
  onClear: () => void;
  onJump: (slug: string) => void;
}) {
  const byName = new Map(all.map((c) => [c.skill_name, c]));
  const needs = concept.prerequisites
    .map((p) => byName.get(p))
    .filter((p): p is Concept => Boolean(p));
  const unlocks = all.filter((c) => c.prerequisites.includes(concept.skill_name));
  const chainDepth = ancestors.get(concept.slug)?.size ?? 0;

  return (
    <div className="readout">
      <div className="readout-head">
        <span className={"dot " + (concept.locked ? "locked" : concept.status)} />
        <strong>{concept.skill_name}</strong>
        <span className="readout-tags">
          <span className={"rtag " + concept.status}>{concept.status}</span>
          {concept.locked && <span className="rtag locked">locked</span>}
          {concept.rusty && <span className="rtag rusty">rusty</span>}
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
