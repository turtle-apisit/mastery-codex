import type { Concept } from "./vault";

/**
 * Lays a subject's prerequisite graph out as a neural network: neurons in
 * layers, synapses between them. The layer index is still prerequisite depth,
 * so left to right remains "what has to be learned first" — the organic look
 * sits on top of a layout that means something, rather than replacing it with
 * a force-directed blob that means nothing.
 */

export const NODE_R = 9; // base neuron radius, grown by connection count
export const MAX_R = 17;
export const COL_PITCH = 156;
export const ROW_PITCH = 72;
export const PAD = 46;

/** Label wrap width under a neuron, in characters. */
const CHARS_PER_LINE = 17;
const MAX_LINES = 2;

export type GraphNode = {
  concept: Concept;
  col: number;
  row: number;
  x: number;
  y: number;
  r: number;
  /** in + out connections; drives radius, so hubs read as hubs */
  degree: number;
  lines: string[];
};

export type GraphEdge = {
  from: string;
  to: string;
  d: string;
  /** path length, so a signal pulse runs at the same speed on every synapse */
  len: number;
};

export type SubjectGraph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
  width: number;
  height: number;
  ancestors: Map<string, Set<string>>;
  descendants: Map<string, Set<string>>;
  byId: Map<string, GraphNode>;
};

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
    const shown = lines.join(" ").length;
    if (shown < label.length - 1) {
      const last = lines[MAX_LINES - 1];
      lines[MAX_LINES - 1] =
        last.length > CHARS_PER_LINE - 1
          ? `${last.slice(0, CHARS_PER_LINE - 1)}…`
          : `${last}…`;
    }
  }
  return lines;
}

/** Deterministic -1..1 from a slug, so the organic jitter never moves between renders. */
function jitter(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return ((Math.abs(h) % 1000) / 1000) * 2 - 1;
}

export function buildGraph(concepts: Concept[]): SubjectGraph {
  const byName = new Map(concepts.map((c) => [c.skill_name, c]));

  // A prerequisite can name a concept in another subject; those are dropped so
  // every edge is guaranteed both endpoints in this graph.
  const parentsOf = new Map<string, Concept[]>();
  for (const c of concepts) {
    parentsOf.set(
      c.slug,
      c.prerequisites
        .map((p) => byName.get(p))
        .filter((p): p is Concept => Boolean(p))
    );
  }
  const childrenOf = new Map<string, Concept[]>();
  for (const c of concepts) childrenOf.set(c.slug, []);
  for (const c of concepts) {
    for (const p of parentsOf.get(c.slug) ?? []) childrenOf.get(p.slug)!.push(c);
  }

  // Depth = longest path from a root. `visiting` stops a malformed vault with a
  // prerequisite cycle from hanging the page.
  const depth = new Map<string, number>();
  const visiting = new Set<string>();
  function depthOf(c: Concept): number {
    const cached = depth.get(c.slug);
    if (cached !== undefined) return cached;
    if (visiting.has(c.slug)) return 0;
    visiting.add(c.slug);
    const parents = parentsOf.get(c.slug) ?? [];
    const d = parents.length ? 1 + Math.max(...parents.map(depthOf)) : 0;
    visiting.delete(c.slug);
    depth.set(c.slug, d);
    return d;
  }
  for (const c of concepts) depthOf(c);

  const maxCol = concepts.reduce((m, c) => Math.max(m, depth.get(c.slug)!), 0);
  const columns: Concept[][] = Array.from({ length: maxCol + 1 }, () => []);
  for (const c of concepts) columns[depth.get(c.slug)!].push(c);
  for (const col of columns)
    col.sort((a, b) => a.skill_name.localeCompare(b.skill_name));

  // Crossing reduction by the barycentre heuristic: pull each node toward the
  // average row of what it connects to. Four sweeps is where this converges on
  // the real vault; it gets most of the benefit of a full Sugiyama pass without
  // the machinery.
  const row = new Map<string, number>();
  columns.forEach((col) => col.forEach((c, i) => row.set(c.slug, i)));

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
      col.sort(
        (a, b) =>
          bary.get(a.slug)! - bary.get(b.slug)! ||
          a.skill_name.localeCompare(b.skill_name)
      );
      col.forEach((c, idx) => row.set(c.slug, idx));
    }
  }
  const forward = columns.map((_, i) => i);
  const backward = [...forward].reverse();
  for (let pass = 0; pass < 4; pass++) {
    sweep(forward, (c) => parentsOf.get(c.slug) ?? []);
    sweep(backward, (c) => childrenOf.get(c.slug) ?? []);
  }

  const tallest = columns.reduce((m, col) => Math.max(m, col.length), 0);
  const height = PAD * 2 + Math.max(0, tallest - 1) * ROW_PITCH;
  const width = PAD * 2 + maxCol * COL_PITCH;

  const degreeOf = (c: Concept) =>
    (parentsOf.get(c.slug)?.length ?? 0) + (childrenOf.get(c.slug)?.length ?? 0);
  const maxDegree = Math.max(1, ...concepts.map(degreeOf));

  const nodes: GraphNode[] = [];
  const byId = new Map<string, GraphNode>();
  columns.forEach((col, ci) => {
    const colHeight = (col.length - 1) * ROW_PITCH;
    const top = PAD + (height - PAD * 2 - colHeight) / 2;
    col.forEach((c, ri) => {
      const degree = degreeOf(c);
      // Jitter keeps the layers readable while stopping the whole thing from
      // looking like a spreadsheet. Seeded from the slug, so it never moves.
      const node: GraphNode = {
        concept: c,
        col: ci,
        row: ri,
        x: PAD + ci * COL_PITCH + jitter(c.slug) * 12,
        y: top + ri * ROW_PITCH + jitter(c.slug + "|y") * 8,
        r: NODE_R + (degree / maxDegree) * (MAX_R - NODE_R),
        degree,
        lines: wrap(c.skill_name),
      };
      nodes.push(node);
      byId.set(c.slug, node);
    });
  });

  // Synapses leave and enter at the rim of the neuron rather than its centre,
  // so a curve never vanishes under the node it is attached to.
  const edges: GraphEdge[] = [];
  for (const c of concepts) {
    for (const p of parentsOf.get(c.slug) ?? []) {
      const a = byId.get(p.slug)!;
      const b = byId.get(c.slug)!;
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 1;
      const ux = dx / dist;
      const uy = dy / dist;
      const x1 = a.x + ux * (a.r + 2);
      const y1 = a.y + uy * (a.r + 2);
      const x2 = b.x - ux * (b.r + 6);
      const y2 = b.y - uy * (b.r + 6);
      const bend = Math.max(22, Math.abs(x2 - x1) * 0.5);
      edges.push({
        from: p.slug,
        to: c.slug,
        d: `M ${x1.toFixed(1)} ${y1.toFixed(1)} C ${(x1 + bend).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - bend).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
        len: Math.max(1, Math.round(Math.hypot(x2 - x1, y2 - y1) * 1.2)),
      });
    }
  }

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
    cache.set(slug, out); // also guards cycles
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

  return { nodes, edges, width, height, ancestors, descendants, byId };
}
