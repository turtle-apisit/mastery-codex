import type { Concept } from "./vault";

/**
 * Lays a subject's prerequisite graph out as a left-to-right DAG: column =
 * how many prerequisites deep a concept sits, so reading left to right is
 * reading "what must I learn first".
 *
 * A force-directed layout would scatter the same data into a blob; the whole
 * point of this graph is the ordering, so the ordering gets the axis.
 */

export const NODE_W = 180;
export const NODE_H = 48;
export const COL_GAP = 76;
export const ROW_GAP = 14;
export const PAD = 20;

const COL_PITCH = NODE_W + COL_GAP;
const ROW_PITCH = NODE_H + ROW_GAP;

/** Roughly how many characters fit on one line inside a node. */
const CHARS_PER_LINE = 26;
const MAX_LINES = 3;

export type GraphNode = {
  concept: Concept;
  col: number;
  row: number;
  x: number;
  y: number;
  lines: string[];
};

export type GraphEdge = {
  from: string; // slug
  to: string; // slug
  d: string; // svg path
};

export type SubjectGraph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width: number;
  height: number;
  /** slug -> every slug it transitively depends on */
  ancestors: Map<string, Set<string>>;
  /** slug -> every slug that transitively depends on it */
  descendants: Map<string, Set<string>>;
};

/** Greedy word wrap, ellipsised if it would run past MAX_LINES. */
function wrap(label: string): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let cur = "";

  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w;
    if (next.length <= CHARS_PER_LINE) {
      cur = next;
      continue;
    }
    if (cur) lines.push(cur);
    cur = w;
    if (lines.length === MAX_LINES) break;
  }
  if (cur && lines.length < MAX_LINES) lines.push(cur);

  if (lines.length === MAX_LINES) {
    const consumed = lines.join(" ").length;
    if (consumed < label.length - 1) {
      const last = lines[MAX_LINES - 1];
      lines[MAX_LINES - 1] =
        last.length > CHARS_PER_LINE - 1
          ? `${last.slice(0, CHARS_PER_LINE - 1)}…`
          : `${last}…`;
    }
  }
  return lines;
}

export function buildGraph(concepts: Concept[]): SubjectGraph {
  const byName = new Map(concepts.map((c) => [c.skill_name, c]));

  // Prerequisites may name a concept in another subject (Lyra flags those in
  // its capture summary rather than linking them), so edges are filtered to
  // this subject only. That also guarantees every edge has both endpoints.
  const parentsOf = new Map<string, Concept[]>();
  for (const c of concepts) {
    parentsOf.set(
      c.slug,
      c.prerequisites
        .map((p) => byName.get(p))
        .filter((p): p is Concept => Boolean(p))
    );
  }

  // Depth = longest path from a root. `visiting` keeps a malformed vault with
  // a prerequisite cycle from hanging the page instead of just rendering oddly.
  const depth = new Map<string, number>();
  const visiting = new Set<string>();
  function depthOf(c: Concept): number {
    const cached = depth.get(c.slug);
    if (cached !== undefined) return cached;
    if (visiting.has(c.slug)) return 0;
    visiting.add(c.slug);
    const parents = parentsOf.get(c.slug) ?? [];
    const d = parents.length
      ? 1 + Math.max(...parents.map((p) => depthOf(p)))
      : 0;
    visiting.delete(c.slug);
    depth.set(c.slug, d);
    return d;
  }
  for (const c of concepts) depthOf(c);

  const maxCol = concepts.reduce((m, c) => Math.max(m, depth.get(c.slug)!), 0);
  const columns: Concept[][] = Array.from({ length: maxCol + 1 }, () => []);
  for (const c of concepts) columns[depth.get(c.slug)!].push(c);
  for (const col of columns) col.sort((a, b) => a.skill_name.localeCompare(b.skill_name));

  // Crossing reduction: repeatedly pull each node toward the average row of
  // the nodes it connects to. This is the barycentre heuristic, which gets
  // most of the benefit without the machinery of a full Sugiyama pass.
  const row = new Map<string, number>();
  columns.forEach((col) => col.forEach((c, i) => row.set(c.slug, i)));

  const childrenOf = new Map<string, Concept[]>();
  for (const c of concepts) childrenOf.set(c.slug, []);
  for (const c of concepts) {
    for (const p of parentsOf.get(c.slug) ?? []) childrenOf.get(p.slug)!.push(c);
  }

  function sweep(order: number[], pick: (c: Concept) => Concept[]) {
    for (const i of order) {
      const col = columns[i];
      const bary = new Map<string, number>();
      col.forEach((c, idx) => {
        const linked = pick(c);
        bary.set(
          c.slug,
          linked.length
            ? linked.reduce((s, l) => s + (row.get(l.slug) ?? 0), 0) / linked.length
            : idx
        );
      });
      col.sort((a, b) => (bary.get(a.slug)! - bary.get(b.slug)!) || a.skill_name.localeCompare(b.skill_name));
      col.forEach((c, idx) => row.set(c.slug, idx));
    }
  }

  const forward = columns.map((_, i) => i);
  const backward = [...forward].reverse();
  // Four sweeps is where this converges on the real vault (8 gives the same
  // result); two was still leaving crossings on the table.
  for (let pass = 0; pass < 4; pass++) {
    sweep(forward, (c) => parentsOf.get(c.slug) ?? []);
    sweep(backward, (c) => childrenOf.get(c.slug) ?? []);
  }

  const tallest = columns.reduce((m, col) => Math.max(m, col.length), 0);
  const height = PAD * 2 + tallest * ROW_PITCH - ROW_GAP;
  const width = PAD * 2 + columns.length * COL_PITCH - COL_GAP;

  // Centre each column vertically so short columns don't hug the top edge.
  const nodes: GraphNode[] = [];
  const pos = new Map<string, { x: number; y: number }>();
  columns.forEach((col, ci) => {
    const colHeight = col.length * ROW_PITCH - ROW_GAP;
    const top = PAD + (height - PAD * 2 - colHeight) / 2;
    col.forEach((c, ri) => {
      const x = PAD + ci * COL_PITCH;
      const y = top + ri * ROW_PITCH;
      pos.set(c.slug, { x, y });
      nodes.push({ concept: c, col: ci, row: ri, x, y, lines: wrap(c.skill_name) });
    });
  });

  const edges: GraphEdge[] = [];
  for (const c of concepts) {
    for (const p of parentsOf.get(c.slug) ?? []) {
      const a = pos.get(p.slug)!;
      const b = pos.get(c.slug)!;
      const x1 = a.x + NODE_W;
      const y1 = a.y + NODE_H / 2;
      const x2 = b.x;
      const y2 = b.y + NODE_H / 2;
      const bend = Math.max(28, (x2 - x1) * 0.45);
      edges.push({
        from: p.slug,
        to: c.slug,
        d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`,
      });
    }
  }

  // Transitive closure both ways, so selecting a node can light up everything
  // it needs and everything that needs it.
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
    cache.set(slug, out); // guards cycles
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

  return { nodes, edges, width, height, ancestors, descendants };
}
