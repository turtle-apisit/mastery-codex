"use client";

import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PortraitFx from "@/components/PortraitFx";
// Type-only: vault.ts reads the filesystem, so importing a *value* from it
// pulls fs into the browser bundle. A Record keyed by Cadence gives the sort
// order instead, and TypeScript still enforces that every case is covered.
import type { Agent, Cadence } from "@/lib/vault";
import { BIOS } from "@/lib/bios";

/**
 * The roster is one flat list, ordered by how often each agent is reached for.
 *
 * It used to be split into Party / NPC / Central tabs. That split described
 * write-authority — which agent may edit which files — and that is an
 * implementation concern. What someone opening this page wants to know is which
 * of these to use today, and every agent's own description already answers it:
 * Vega "every day", Antares "only in week 5 of each exam cycle". Grouping by
 * that instead would have produced two groups of one, so it is a badge on each
 * card and the sort order, rather than a heading.
 */
const CADENCE_RANK: Record<Cadence, number> = {
  daily: 0,
  capture: 1,
  weekly: 2,
  cycle: 3,
};

const CADENCE_LABEL: Record<Cadence, string> = {
  daily: "Every day",
  capture: "New material",
  weekly: "Weekly",
  cycle: "Each cycle",
};

const CADENCE_NOTE: Record<Cadence, string> = {
  daily: "part of the daily loop",
  capture: "runs when a new deck lands in the vault",
  weekly: "end-of-week review and audits, never the daily loop",
  cycle: "week 5 only, when the exam comes round",
};

function artPath(agent: Agent): string {
  const folder =
    agent.tier === "Party" ? "party" : agent.tier === "NPC" ? "npc" : "central";
  return `/art/${folder}/${agent.slug}.png`;
}

/** "Scribe (Party). Reads a newly..." -> "Scribe" */
function roleTitle(description: string): string {
  return description.split(" (")[0];
}

export default function CastGrid({
  agents,
  contract,
}: {
  agents: Agent[];
  contract: string;
}) {
  const roster = [...agents].sort(
    (a, b) =>
      CADENCE_RANK[a.cadence] - CADENCE_RANK[b.cadence] ||
      a.name.localeCompare(b.name)
  );

  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(
    roster[0]?.slug
  );
  const [contractOpen, setContractOpen] = useState(false);
  const selected = agents.find((a) => a.slug === selectedSlug) ?? roster[0];

  return (
    <>
      <button
        type="button"
        className={"cast-contract-toggle" + (contractOpen ? " open" : "")}
        onClick={() => setContractOpen((v) => !v)}
        aria-expanded={contractOpen}
      >
        <span className="car">&#9656;</span>
        Shared Contract
        <span className="cast-contract-sub">— every agent follows this</span>
      </button>
      {contractOpen && (
        <div className="cast-contract">
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contract}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className="roster">
        {roster.map((agent) => (
          <button
            key={agent.slug}
            type="button"
            className={
              "roster-card" + (agent.slug === selected?.slug ? " active" : "")
            }
            onClick={() => setSelectedSlug(agent.slug)}
            aria-pressed={agent.slug === selected?.slug}
          >
            <span className="roster-portrait">
              <Image
                src={artPath(agent)}
                alt=""
                fill
                sizes="72px"
                style={{ objectFit: "contain" }}
              />
            </span>
            <span className="roster-text">
              <span className="roster-name">{agent.name}</span>
              <span className="roster-role">{roleTitle(agent.description)}</span>
            </span>
            <span className={"roster-cadence " + agent.cadence}>
              {CADENCE_LABEL[agent.cadence]}
            </span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="cast-hero" key={selected.slug}>
          <PortraitFx src={artPath(selected)} alt={`${selected.name} portrait`} />
          <div className="cast-hero-body">
            <div className="cast-detail-head">
              <span className="cast-detail-name">{selected.name}</span>
              <span className={"roster-cadence " + selected.cadence}>
                {CADENCE_LABEL[selected.cadence]}
              </span>
            </div>
            <div className="cast-detail-role">
              {roleTitle(selected.description)}
              <em> · {CADENCE_NOTE[selected.cadence]}</em>
            </div>
            <p className="cast-detail-bio">{BIOS[selected.slug]}</p>
            <div className="cast-detail-section">
              <h3>Tools</h3>
              <div className="cast-detail-tools">
                {selected.tools.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="cast-detail-spec-label">Full capability sheet</div>
            <div className="cast-detail-sheet markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {selected.body}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
