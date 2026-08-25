"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Concept } from "@/lib/vault";

/**
 * Level 1 of the star chart: the whole vault as a solar system, one planet per
 * subject, the learner at the centre.
 *
 * Warframe's system view is the reference for the composition. Note what it
 * does NOT do: no lines are drawn between planets — relationships are implied
 * by the orbits, and node-to-node links only appear once you are inside a
 * planet. That is right here too, since prerequisites never cross subjects.
 *
 * The motion is Obsidian's graph view: every body is under a small force
 * simulation, so it drifts, can be dragged, shoves its neighbours out of the
 * way and springs back to its orbit when released. Nothing here is a canned
 * keyframe animation.
 *
 * Laid out in real host pixels rather than a fixed viewBox, so labels stay at a
 * true readable size on a phone instead of scaling down with the artwork.
 */

export type SystemSubject = {
  subject: string;
  concepts: Concept[];
};

type Counts = {
  mastered: number;
  training: number;
  untrained: number;
  locked: number;
  rusty: number;
  open: number;
};

/** Physics body. `angle`/`spread` describe the orbit slot it is tethered to. */
type Body = {
  subject: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spread: number;
};

// Simulation constants. Tuned for "calm orrery", not "bouncy toy": a light
// spring, heavy damping, and a revolution slow enough to read as drift.
const SPRING = 0.014;
const DAMPING = 0.9;
const REPEL = 0.55;
const REVOLVE_DEG_PER_SEC = 0.9;
const SETTLE = 0.02; // below this speed the body is treated as at rest

function tally(list: Concept[]): Counts {
  const c: Counts = {
    mastered: 0,
    training: 0,
    untrained: 0,
    locked: 0,
    rusty: 0,
    open: 0,
  };
  for (const x of list) {
    c[x.status]++;
    if (x.locked) c.locked++;
    else c.open++;
    if (x.rusty) c.rusty++;
  }
  return c;
}

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: r * Math.cos(a), y: r * Math.sin(a) };
}

/** Ring segment, drawn clockwise from `from`° to `to`°, centred on the origin. */
function arcPath(r: number, from: number, to: number) {
  const span = Math.max(0.01, Math.min(359.99, to - from));
  const s = polar(r, from);
  const e = polar(r, from + span);
  return `M ${s.x.toFixed(2)} ${s.y.toFixed(2)} A ${r} ${r} 0 ${
    span > 180 ? 1 : 0
  } 1 ${e.x.toFixed(2)} ${e.y.toFixed(2)}`;
}

/** Deterministic -1..1, so the organic offsets never move between renders. */
function seed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return ((Math.abs(h) % 1000) / 1000) * 2 - 1;
}

function wrapLabel(name: string, perLine: number): string[] {
  const words = name.toUpperCase().split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= perLine) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

export default function SystemView({
  subjects,
  onOpen,
}: {
  subjects: SystemSubject[];
  onOpen: (subject: string) => void;
}) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  // Seeded with a plausible desktop size rather than zero: the ResizeObserver
  // only reports after mount, so a zero default renders an empty stage on the
  // server and the chart would be missing from the prerendered HTML.
  const [size, setSize] = useState({ w: 1000, h: 560 });
  const [hover, setHover] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [bodies, setBodies] = useState<Body[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);

  const dragRef = useRef<{ subject: string; moved: boolean } | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() =>
      setSize({ w: el.clientWidth, h: el.clientHeight })
    );
    ro.observe(el);
    setSize({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  const { w, h } = size;
  const narrow = w < 560;
  const cx = w / 2;
  const cy = h / 2;
  const rx = Math.min(w * 0.33, 320);
  const ry = Math.min(h * 0.32, 235);
  const coreR = Math.max(38, Math.min(w, h) * 0.11);
  const labelSize = narrow ? 10 : 12.5;
  const metaSize = narrow ? 8.5 : 10;
  const perLine = narrow ? 13 : 17;

  const specs = useMemo(() => {
    const maxTotal = Math.max(...subjects.map((x) => x.concepts.length), 1);
    return subjects.map((s, i) => ({
      subject: s.subject,
      concepts: s.concepts,
      counts: tally(s.concepts),
      total: s.concepts.length,
      baseAngle: (360 / subjects.length) * i + seed(s.subject) * 14,
      spread: 1 + seed(s.subject + "|r") * 0.09,
      r:
        (narrow ? 17 : 22) +
        (s.concepts.length / maxTotal) * (narrow ? 7 : 10),
    }));
  }, [subjects, narrow]);

  /** Where a body belongs right now, given its orbit slot. */
  const homeOf = useCallback(
    (angle: number, spread: number) => {
      const p = polar(1, angle);
      return { x: cx + rx * spread * p.x, y: cy + ry * spread * p.y };
    },
    [cx, cy, rx, ry]
  );

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!specs.length) return;
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      setBodies((prev) => {
        const specByName = new Map(specs.map((s) => [s.subject, s]));
        const byName = new Map(prev.map((b) => [b.subject, b]));
        // Reconciled here rather than in an effect of its own: a body that has
        // never been simulated starts parked in its orbit slot, and one that
        // already exists keeps its momentum through a resize.
        const next: Body[] = specs.map((s) => {
          const hit = byName.get(s.subject);
          if (hit) return { ...hit };
          const home = homeOf(s.baseAngle, s.spread);
          return {
            subject: s.subject,
            x: home.x,
            y: home.y,
            vx: 0,
            vy: 0,
            angle: s.baseAngle,
            spread: s.spread,
          };
        });

        for (const b of next) {
          const spec = specByName.get(b.subject);
          if (!spec) continue;

          if (!reduced) b.angle += REVOLVE_DEG_PER_SEC * dt;

          if (dragRef.current?.subject === b.subject) {
            b.x = pointerRef.current.x;
            b.y = pointerRef.current.y;
            b.vx = 0;
            b.vy = 0;
            continue;
          }

          // tether to the orbit slot
          const p = polar(1, b.angle);
          const hx = cx + rx * b.spread * p.x;
          const hy = cy + ry * b.spread * p.y;
          b.vx += (hx - b.x) * SPRING;
          b.vy += (hy - b.y) * SPRING;

          // shove neighbours apart, including room for their labels
          for (const o of next) {
            if (o.subject === b.subject) continue;
            const os = specByName.get(o.subject);
            if (!os) continue;
            const dx = b.x - o.x;
            const dy = b.y - o.y;
            const d = Math.hypot(dx, dy) || 0.001;
            const min = spec.r + os.r + (narrow ? 74 : 104);
            if (d < min) {
              const push = ((min - d) / min) * REPEL;
              b.vx += (dx / d) * push * 10;
              b.vy += (dy / d) * push * 10;
            }
          }

          // keep clear of the core so nothing sits on the portrait
          const dcx = b.x - cx;
          const dcy = b.y - cy;
          const dc = Math.hypot(dcx, dcy) || 0.001;
          const keep = coreR * 1.5 + spec.r;
          if (dc < keep) {
            const push = ((keep - dc) / keep) * REPEL * 12;
            b.vx += (dcx / dc) * push;
            b.vy += (dcy / dc) * push;
          }

          b.vx *= DAMPING;
          b.vy *= DAMPING;
          if (Math.abs(b.vx) < SETTLE) b.vx = 0;
          if (Math.abs(b.vy) < SETTLE) b.vy = 0;
          b.x += b.vx;
          b.y += b.vy;
        }
        return next;
      });

      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [specs, cx, cy, rx, ry, coreR, narrow, reduced, homeOf]);

  function stagePoint(e: React.PointerEvent) {
    const el = hostRef.current;
    if (!el) return { x: 0, y: 0 };
    const b = el.getBoundingClientRect();
    return { x: e.clientX - b.left, y: e.clientY - b.top };
  }

  function onMove(e: React.PointerEvent) {
    const p = stagePoint(e);
    pointerRef.current = p;
    if (dragRef.current) {
      dragRef.current.moved = true;
      return;
    }
    setTilt({ x: (p.x / w - 0.5) * 2, y: (p.y / h - 0.5) * 2 });
  }

  function endDrag() {
    dragRef.current = null;
    setDragging(null);
  }

  const layer = (depth: number) => ({
    transform: `translate(${(tilt.x * depth).toFixed(2)}px, ${(
      tilt.y * depth
    ).toFixed(2)}px)`,
  });

  // Static decoration, kept out of the 60fps render path.
  const graticule = useMemo(
    () => (
      <>
        {[0.55, 0.78, 1, 1.24, 1.5].map((k, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx * k}
            ry={ry * k}
            className={"orbit" + (k === 1 ? " orbit-main" : "")}
          />
        ))}
        <line x1="0" y1={cy} x2={w} y2={cy} className="ecliptic" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * coreR * 1.4}
              y1={cy + Math.sin(a) * coreR * 1.4}
              x2={cx + Math.cos(a) * rx * 1.6}
              y2={cy + Math.sin(a) * ry * 1.6}
              className="spoke"
            />
          );
        })}
      </>
    ),
    [cx, cy, rx, ry, w, coreR]
  );

  const posOf = new Map(bodies.map((b) => [b.subject, b]));

  return (
    <div
      className={"system-stage" + (dragging ? " dragging" : "")}
      ref={hostRef}
      onPointerMove={onMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={() => {
        endDrag();
        setTilt({ x: 0, y: 0 });
      }}
    >
      <svg className="system-svg" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <radialGradient id="core-glow">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.85" />
            <stop offset="35%" stopColor="var(--gold)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="portrait-fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="30%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="80%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id="portrait-mask">
            <rect
              x={cx - coreR * 1.6}
              y={cy - coreR * 2.1}
              width={coreR * 3.2}
              height={coreR * 4.2}
              fill="url(#portrait-fade)"
            />
          </mask>
          {specs.map((s) => {
            const id = s.subject.replace(/\W+/g, "-").toLowerCase();
            return (
              <clipPath key={id} id={`globe-${id}`}>
                <circle cx="0" cy="0" r={s.r} />
              </clipPath>
            );
          })}
        </defs>

        <g className="graticule" style={layer(6)}>
          {graticule}
        </g>

        {/* the learner at the centre, the way the Void figure anchors
            Warframe's chart */}
        <g className="core" style={layer(-3)}>
          <circle cx={cx} cy={cy} r={coreR * 3} fill="url(#core-glow)" />
          <image
            href="/art/character-portrait.png"
            x={cx - coreR * 1.15}
            y={cy - coreR * 1.9}
            width={coreR * 2.3}
            height={coreR * 3.4}
            preserveAspectRatio="xMidYMid meet"
            mask="url(#portrait-mask)"
            className="core-portrait"
          />
          <circle cx={cx} cy={cy} r={coreR * 0.11} className="core-spark" />
        </g>

        <g className="planets" style={layer(14)}>
          {specs.map((s) => {
            // Falls back to the orbit slot so the server render — which never
            // runs a frame of the simulation — still draws the whole system.
            const b = posOf.get(s.subject) ?? homeOf(s.baseAngle, s.spread);
            const id = s.subject.replace(/\W+/g, "-").toLowerCase();
            const r = s.r;
            const ringR = r + 9;
            const tickR = r + 17;
            const tickLen = Math.max(3, r * 0.16);
            const lines = wrapLabel(s.subject, perLine);
            const isHot = hover === s.subject || dragging === s.subject;
            const labelTop = tickR + tickLen + labelSize + 7;

            let cursor = -90;
            const segs = (["mastered", "training", "untrained"] as const)
              .map((k) => {
                const frac = s.counts[k] / s.total;
                const from = cursor;
                const to = cursor + frac * 360;
                cursor = to;
                return frac > 0.005
                  ? { k, d: arcPath(ringR, from + 1.5, to - 1.5) }
                  : null;
              })
              .filter(Boolean) as { k: string; d: string }[];

            return (
              <g
                key={s.subject}
                className={
                  "planet" +
                  (isHot ? " hot" : "") +
                  (dragging === s.subject ? " grabbed" : "")
                }
                transform={`translate(${b.x.toFixed(2)} ${b.y.toFixed(2)})`}
                tabIndex={0}
                role="button"
                aria-label={`${s.subject}, ${s.total} skills, ${s.counts.open} unlocked`}
                onPointerDown={(e) => {
                  e.stopPropagation();
                  (e.target as Element).setPointerCapture?.(e.pointerId);
                  pointerRef.current = stagePoint(e);
                  dragRef.current = { subject: s.subject, moved: false };
                  setDragging(s.subject);
                }}
                onPointerUp={() => {
                  // A drag that ends on the planet must not also open it.
                  const wasDrag = dragRef.current?.moved;
                  endDrag();
                  if (!wasDrag) onOpen(s.subject);
                }}
                onPointerEnter={() => setHover(s.subject)}
                onPointerLeave={() => setHover(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onOpen(s.subject);
                  }
                }}
              >
                {/* Same trap as the constellations: the halo and both labels
                    are pointer-events:none, so without an explicit target the
                    planet is only grabbable on its own small disc. */}
                <circle className="planet-hit" r={tickR + tickLen * 2.4} />
                <rect
                  className="planet-hit"
                  x={-Math.max(90, tickR + 30)}
                  y={tickR}
                  width={Math.max(180, (tickR + 30) * 2)}
                  height={labelTop + (lines.length - 1) * (labelSize + 3) + metaSize + 12 - tickR}
                  rx="10"
                />
                <circle className="planet-halo" r={r * 2.6} />

                {/* outer bearing ring: slow ticks, the technical furniture that
                    makes it read as an instrument rather than a marble */}
                <g className="tick-ring">
                  {Array.from({ length: 24 }, (_, i) => {
                    const a = (i * 15 * Math.PI) / 180;
                    const major = i % 6 === 0;
                    const len = major ? tickLen * 1.9 : tickLen;
                    return (
                      <line
                        key={i}
                        x1={Math.cos(a) * tickR}
                        y1={Math.sin(a) * tickR}
                        x2={Math.cos(a) * (tickR + len)}
                        y2={Math.sin(a) * (tickR + len)}
                        className={"tick" + (major ? " major" : "")}
                      />
                    );
                  })}
                </g>

                <circle className="planet-track" r={ringR} />
                {segs.map((seg) => (
                  <path key={seg.k} d={seg.d} className={"planet-seg " + seg.k} />
                ))}

                {/* holographic body: a dark shell with a wireframe globe inside
                    and a lit limb, not a naturalistic sphere */}
                <circle className="planet-body" r={r} />
                <g className="planet-wire" clipPath={`url(#globe-${id})`}>
                  <ellipse rx={r} ry={r * 0.3} />
                  <ellipse rx={r * 0.93} ry={r * 0.22} cy={-r * 0.46} />
                  <ellipse rx={r * 0.93} ry={r * 0.22} cy={r * 0.46} />
                  <ellipse rx={r * 0.34} ry={r} />
                  <ellipse rx={r * 0.72} ry={r} />
                </g>
                <path
                  className="planet-limb"
                  d={arcPath(r - 1, 20, 160)}
                />
                <circle className="planet-core" r={r * 0.16} />

                {/* a moon, because one orbiting dot does more for "alive" than
                    any amount of glow */}
                <g className="planet-sat">
                  <circle cx={r * 1.55} cy="0" r={Math.max(1.4, r * 0.07)} />
                </g>

                {/* target brackets, on hover only */}
                <g className="planet-lock">
                  {[
                    [-1, -1],
                    [1, -1],
                    [-1, 1],
                    [1, 1],
                  ].map(([sx, sy], i) => {
                    const d = tickR + tickLen * 2.6;
                    const k = d * 0.26;
                    return (
                      <path
                        key={i}
                        d={`M ${sx * d} ${sy * (d - k)} L ${sx * d} ${sy * d} L ${
                          sx * (d - k)
                        } ${sy * d}`}
                      />
                    );
                  })}
                </g>

                <text
                  className="planet-name"
                  y={labelTop}
                  style={{ fontSize: labelSize }}
                >
                  {lines.map((l, i) => (
                    <tspan key={i} x="0" dy={i === 0 ? 0 : labelSize + 3}>
                      {l}
                    </tspan>
                  ))}
                </text>
                <text
                  className="planet-meta"
                  y={
                    labelTop +
                    (lines.length - 1) * (labelSize + 3) +
                    metaSize +
                    7
                  }
                  style={{ fontSize: metaSize }}
                >
                  {s.total} SKILLS · {s.counts.open} OPEN
                  {s.counts.rusty ? ` · ${s.counts.rusty} RUSTY` : ""}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div className="system-chrome" aria-hidden="true">
        <span className="corner tl" />
        <span className="corner tr" />
        <span className="corner bl" />
        <span className="corner br" />
      </div>
      <p className="system-caption">
        Origin System · drag a body · select to enter
      </p>
    </div>
  );
}
