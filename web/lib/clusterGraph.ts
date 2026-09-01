import type { Concept } from "./techniques";
import { buildGraph, type SubjectGraph } from "./skillGraph";

/**
 * Level 2 of the star chart: a subject as a handful of constellations rather
 * than one 54-node web.
 *
 * The grouping is the source deck each note was captured from — which is to say
 * the lecture it was taught in. That is not an arbitrary cut: 79% of the
 * vault's prerequisite edges stay inside a group, so the clustering is
 * structure that is already in the material.
 *
 * Clusters expand in place instead of opening their own screen. The 21% of
 * edges that DO cross groups are the reason: drilling into an isolated group
 * would hide the fact that Sandwich Integration needs Modularity from a
 * different class, and that is exactly the kind of thing a prerequisite map
 * exists to show. A collapsed cluster still receives those edges, drawn to the
 * cluster itself.
 */

export const STAR_PAD = 30;
export const COL_GAP = 150;
export const ROW_GAP = 74;
export const CANVAS_PAD = 60;

/** Label wrap for a collapsed cluster, in characters. */
const NAME_CHARS = 22;

export type ClusterDot = { slug: string; x: number; y: number; r: number; status: string; locked: boolean };

export type Cluster = {
  id: string;
  name: string;
  concepts: Concept[];
  expanded: boolean;
  /** top-left of the cluster's box in canvas space */
  x: number;
  y: number;
  w: number;
  h: number;
  /** centre of the collapsed star, in canvas space */
  cx: number;
  cy: number;
  /** radius of the collapsed constellation */
  starR: number;
  dots: ClusterDot[];
  nameLines: string[];
  counts: { mastered: number; training: number; untrained: number; locked: number; rusty: number };
};

export type PlacedNode = {
  concept: Concept;
  clusterId: string;
  x: number;
  y: number;
  r: number;
  lines: string[];
};

export type ClusterEdge = {
  from: string;
  to: string;
  d: string;
  len: number;
  /** true when the edge spans two clusters — drawn differently */
  cross: boolean;
};

export type ClusterLayout = {
  clusters: Cluster[];
  nodes: PlacedNode[];
  edges: ClusterEdge[];
  width: number;
  height: number;
  byId: Map<string, PlacedNode>;
  clusterOf: Map<string, string>;
  ancestors: Map<string, Set<string>>;
  descendants: Map<string, Set<string>>;
};

/** Turn a source filename into something a human would read on a star. */
export function prettySource(file: string): string {
  let s = file.replace(/\.(pdf|pptx|md)$/i, "");
  s = s.replace(/^\d{4}-/, "");                 // leading year
  s = s.replace(/_Rev\d+.*$/i, "");             // revision suffixes
  s = s.replace(/[_]+/g, " ");
  s = s.replace(/\s+\d+$/, "");                 // trailing copy number
  // Course and chapter numbering is dropped: the constellation is named for
  // what it teaches, not for where it sat in the syllabus.
  s = s.replace(/^SEA\d+-\d+-/i, "");        // 2026-SEA601-04-Requirements…
  s = s.replace(/^CH\d+[\s-]*\d*[\s-]*/i, ""); // CH03_2_SEA604Microservices
  s = s.replace(/^class[\s-]*\d+[\s-]*/i, ""); // class02_slides
  s = s.replace(/SEA\d+/gi, "");
  // "SWArchStylePatterns" -> "SW Arch Style Patterns"
  s = s.replace(/([a-z])([A-Z])/g, "$1 $2");
  s = s.replace(/([A-Z]{2,})([A-Z][a-z])/g, "$1 $2");
  s = s.replace(/\s{2,}/g, " ").trim();
  return s || file;
}

function wrap(text: string, per: number, max = 2): string[] {
  const words = text.toUpperCase().split(" ");
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= per) cur = next;
    else {
      if (cur) lines.push(cur);
      cur = w;
    }
  }
  if (cur) lines.push(cur);
  if (lines.length > max) {
    const kept = lines.slice(0, max);
    kept[max - 1] = kept[max - 1].slice(0, per - 1) + "…";
    return kept;
  }
  return lines;
}

function seeded(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return (Math.abs(h) % 1000) / 1000;
}

/**
 * Arrange a cluster's concepts as a small constellation: rings of dots around a
 * centre, sized by how many there are. Collapsed clusters still show every
 * concept, so the size and the status mix of a group are readable without
 * opening it.
 */
function constellation(concepts: Concept[], id: string): { dots: ClusterDot[]; r: number } {
  const n = concepts.length;
  const r = Math.max(24, Math.min(52, 16 + Math.sqrt(n) * 7));
  const dots: ClusterDot[] = [];
  // one dot in the middle, the rest spread over one or two rings
  const rings = n <= 5 ? 1 : 2;
  const inner = Math.max(1, Math.round(n * (rings === 1 ? 1 : 0.38)));
  concepts.forEach((c, i) => {
    const onInner = i < inner;
    const count = onInner ? inner : n - inner;
    const idx = onInner ? i : i - inner;
    const ringR = onInner ? r * (rings === 1 ? 0.62 : 0.42) : r * 0.88;
    const jitter = seeded(c.slug) * 0.5 - 0.25;
    const a = ((idx + 0.5) / Math.max(1, count)) * Math.PI * 2 + jitter + seeded(id);
    dots.push({
      slug: c.slug,
      x: Math.cos(a) * ringR,
      y: Math.sin(a) * ringR,
      r: 2.6,
      status: c.status,
      locked: c.locked,
    });
  });
  return { dots, r };
}

export function buildClusterLayout(
  concepts: Concept[],
  expandedIds: Set<string>
): ClusterLayout {
  const byName = new Map(concepts.map((c) => [c.skill_name, c]));

  // ---- group by source deck -------------------------------------------------
  const groups = new Map<string, Concept[]>();
  for (const c of concepts) {
    const id = (c.source && c.source[0]) || "unsourced";
    if (!groups.has(id)) groups.set(id, []);
    groups.get(id)!.push(c);
  }
  const clusterOf = new Map<string, string>();
  for (const [id, list] of groups) for (const c of list) clusterOf.set(c.slug, id);

  // ---- concept-level prerequisite relations --------------------------------
  const parentsOf = new Map<string, Concept[]>();
  const childrenOf = new Map<string, Concept[]>();
  for (const c of concepts) childrenOf.set(c.slug, []);
  for (const c of concepts) {
    const ps = c.prerequisites
      .map((p) => byName.get(p))
      .filter((p): p is Concept => Boolean(p));
    parentsOf.set(c.slug, ps);
  }
  for (const c of concepts)
    for (const p of parentsOf.get(c.slug)!) childrenOf.get(p.slug)!.push(c);

  // ---- cluster-level DAG, for column order ---------------------------------
  const clusterParents = new Map<string, Set<string>>();
  for (const id of groups.keys()) clusterParents.set(id, new Set());
  for (const c of concepts) {
    const a = clusterOf.get(c.slug)!;
    for (const p of parentsOf.get(c.slug)!) {
      const b = clusterOf.get(p.slug)!;
      if (a !== b) clusterParents.get(a)!.add(b);
    }
  }
  const depth = new Map<string, number>();
  const visiting = new Set<string>();
  function depthOf(id: string): number {
    const hit = depth.get(id);
    if (hit !== undefined) return hit;
    if (visiting.has(id)) return 0; // cluster cycles are possible; do not hang
    visiting.add(id);
    const ps = [...(clusterParents.get(id) ?? [])];
    const d = ps.length ? 1 + Math.max(...ps.map(depthOf)) : 0;
    visiting.delete(id);
    depth.set(id, d);
    return d;
  }
  for (const id of groups.keys()) depthOf(id);

  // ---- measure each cluster -------------------------------------------------
  type Draft = {
    id: string;
    name: string;
    concepts: Concept[];
    expanded: boolean;
    sub: SubjectGraph | null;
    w: number;
    h: number;
    starR: number;
    dots: ClusterDot[];
    nameLines: string[];
  };
  const drafts: Draft[] = [...groups.entries()].map(([id, list]) => {
    const expanded = expandedIds.has(id);
    // A note may carry its own `unit:` label. Some deck filenames simply do not
    // contain the lecture's subject — "class02_slides.pdf" cleans up to
    // "slides" — and no amount of regex invents what is not there, so the note
    // is allowed to say. Falls back to the tidied filename when absent.
    const name = list.find((c) => c.unit)?.unit || prettySource(id);
    const nameLines = wrap(name, NAME_CHARS);
    if (expanded) {
      const sub = buildGraph(list);
      return {
        id,
        name,
        concepts: list,
        expanded,
        sub,
        w: sub.width,
        // the sub-layout already carries 46px of top padding, which is where the
        // cluster name is drawn, so no extra height is needed for it
        h: sub.height,
        starR: 0,
        dots: [],
        nameLines,
      };
    }
    const { dots, r } = constellation(list, id);
    return {
      id,
      name,
      concepts: list,
      expanded,
      sub: null,
      w: r * 2 + STAR_PAD * 2,
      h: r * 2 + STAR_PAD + nameLines.length * 15 + 22,
      starR: r,
      dots,
      nameLines,
    };
  });

  // ---- place clusters in columns by depth ----------------------------------
  const maxDepth = Math.max(0, ...drafts.map((d) => depth.get(d.id)!));
  const columns: Draft[][] = Array.from({ length: maxDepth + 1 }, () => []);
  for (const d of drafts) columns[depth.get(d.id)!].push(d);
  for (const col of columns) col.sort((a, b) => a.name.localeCompare(b.name));

  const colW = columns.map((col) => Math.max(0, ...col.map((d) => d.w)));
  const colH = columns.map((col) =>
    col.reduce((s, d) => s + d.h, 0) + Math.max(0, col.length - 1) * ROW_GAP
  );
  const canvasH = CANVAS_PAD * 2 + Math.max(1, ...colH);
  const canvasW =
    CANVAS_PAD * 2 +
    colW.reduce((s, w) => s + w, 0) +
    Math.max(0, columns.length - 1) * COL_GAP;

  const clusters: Cluster[] = [];
  const nodes: PlacedNode[] = [];
  const byId = new Map<string, PlacedNode>();
  const starOf = new Map<string, { x: number; y: number }>();

  let xCursor = CANVAS_PAD;
  columns.forEach((col, ci) => {
    let yCursor = CANVAS_PAD + (canvasH - CANVAS_PAD * 2 - colH[ci]) / 2;
    for (const d of col) {
      const x = xCursor + (colW[ci] - d.w) / 2;
      const y = yCursor;
      const counts = { mastered: 0, training: 0, untrained: 0, locked: 0, rusty: 0 };
      for (const c of d.concepts) {
        counts[c.status]++;
        if (c.locked) counts.locked++;
        if (c.rusty) counts.rusty++;
      }

      if (d.expanded && d.sub) {
        for (const n of d.sub.nodes) {
          const placed: PlacedNode = {
            concept: n.concept,
            clusterId: d.id,
            x: x + n.x,
            y: y + n.y,
            r: n.r,
            lines: n.lines,
          };
          nodes.push(placed);
          byId.set(n.concept.slug, placed);
        }
        clusters.push({
          ...d,
          x,
          y,
          cx: x + d.w / 2,
          cy: y + d.sub.height / 2,
          counts,
        });
      } else {
        const cx = x + d.w / 2;
        const cy = y + STAR_PAD + d.starR;
        for (const dot of d.dots) starOf.set(dot.slug, { x: cx + dot.x, y: cy + dot.y });
        clusters.push({ ...d, x, y, cx, cy, counts });
      }

      yCursor += d.h + ROW_GAP;
    }
    xCursor += colW[ci] + COL_GAP;
  });

  // ---- edges ---------------------------------------------------------------
  // An endpoint resolves to the node itself when its cluster is open, and to
  // the cluster's star when it is not, so a collapsed group still visibly
  // receives and sends prerequisites.
  const clusterById = new Map(clusters.map((c) => [c.id, c]));
  function endpoint(slug: string): { x: number; y: number; r: number } {
    const n = byId.get(slug);
    if (n) return { x: n.x, y: n.y, r: n.r };
    const cl = clusterById.get(clusterOf.get(slug)!)!;
    return { x: cl.cx, y: cl.cy, r: cl.starR };
  }

  const edges: ClusterEdge[] = [];
  const seen = new Set<string>();
  for (const c of concepts) {
    for (const p of parentsOf.get(c.slug)!) {
      const ca = clusterOf.get(p.slug)!;
      const cb = clusterOf.get(c.slug)!;
      const cross = ca !== cb;
      const a = endpoint(p.slug);
      const b = endpoint(c.slug);
      // Both ends collapsed into the same star: nothing to draw.
      if (a.x === b.x && a.y === b.y) continue;
      // Two collapsed clusters produce one line, not one per concept pair.
      const key = cross && !byId.has(p.slug) && !byId.has(c.slug) ? `${ca}~${cb}` : `${p.slug}~${c.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);

      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;
      const x1 = a.x + ux * (a.r + 3);
      const y1 = a.y + uy * (a.r + 3);
      const x2 = b.x - ux * (b.r + 6);
      const y2 = b.y - uy * (b.r + 6);
      const bend = Math.max(26, Math.abs(x2 - x1) * 0.45);
      edges.push({
        from: p.slug,
        to: c.slug,
        cross,
        d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + bend).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - bend).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
        len: Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) * 1.2)),
      });
    }
  }

  // ---- transitive closure for chain highlighting ---------------------------
  const ancestors = new Map<string, Set<string>>();
  const descendants = new Map<string, Set<string>>();
  function collect(
    slug: string,
    step: (s: string) => Concept[],
    cache: Map<string, Set<string>>
  ): Set<string> {
    const hit = cache.get(slug);
    if (hit) return hit;
    const out = new Set<string>();
    cache.set(slug, out);
    for (const n of step(slug)) {
      out.add(n.slug);
      for (const deep of collect(n.slug, step, cache)) out.add(deep);
    }
    return out;
  }
  for (const c of concepts) {
    collect(c.slug, (s) => parentsOf.get(s) ?? [], ancestors);
    collect(c.slug, (s) => childrenOf.get(s) ?? [], descendants);
  }

  return {
    clusters,
    nodes,
    edges,
    width: canvasW,
    height: canvasH,
    byId,
    clusterOf,
    ancestors,
    descendants,
  };
}
