"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PortraitFx from "@/components/PortraitFx";
import type { Agent, AgentTier } from "@/lib/vault";
import { BIOS } from "@/lib/bios";

const TIER_ORDER: { tier: AgentTier; label: string; desc: string }[] = [
  { tier: "Party", label: "Party", desc: "companions who work with your material every day" },
  { tier: "NPC", label: "NPC", desc: "the teacher you meet every day" },
  { tier: "Central", label: "Central", desc: "quality assurance for the whole system, not part of your daily loop" },
];

function artPath(agent: Agent): string {
  const folder = agent.tier === "Party" ? "party" : agent.tier === "NPC" ? "npc" : "central";
  return `/art/${folder}/${agent.slug}.png`;
}

/** "Scribe (Party). Reads a newly..." -> "Scribe" */
function roleTitle(description: string): string {
  return description.split(" (")[0];
}

export default function CastGrid({ agents, contract }: { agents: Agent[]; contract: string }) {
  const availableTiers = TIER_ORDER.filter((t) => agents.some((a) => a.tier === t.tier));
  const [activeTier, setActiveTier] = useState<AgentTier>(availableTiers[0]?.tier ?? "Party");
  const [contractOpen, setContractOpen] = useState(false);

  const active = availableTiers.find((t) => t.tier === activeTier) ?? availableTiers[0];
  const members = agents.filter((a) => a.tier === active?.tier);

  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(members[0]?.slug);
  const selected = agents.find((a) => a.slug === selectedSlug) ?? members[0];

  // switching tier: jump the selection to that tier's first member, like
  // picking a new roster page in a character-select screen
  useEffect(() => {
    if (!members.some((m) => m.slug === selectedSlug)) {
      setSelectedSlug(members[0]?.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTier]);

  return (
    <>
      <button
        type="button"
        className={"cast-contract-toggle" + (contractOpen ? " open" : "")}
        onClick={() => setContractOpen((v) => !v)}
        aria-expanded={contractOpen}
      >
        <span className="car">&#9656;</span>
        Shared Contract<span className="cast-contract-sub">— every agent follows this</span>
      </button>
      {contractOpen && (
        <div className="cast-contract">
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contract}</ReactMarkdown>
          </div>
        </div>
      )}

      <div className="cast-tabs">
        {availableTiers.map(({ tier, label }) => (
          <button
            key={tier}
            type="button"
            className={"cast-tab" + (tier === active?.tier ? " active" : "")}
            onClick={() => setActiveTier(tier)}
          >
            {label}
            <span className="n">{agents.filter((a) => a.tier === tier).length}</span>
          </button>
        ))}
        <span className="cast-tabs-desc">{active?.desc}</span>
      </div>

      <div className="cast-select-row">
        {members.map((agent) => (
          <button
            key={agent.slug}
            type="button"
            className={"cast-chip" + (agent.slug === selected?.slug ? " active" : "")}
            onClick={() => setSelectedSlug(agent.slug)}
          >
            <span className="cast-chip-portrait">
              <Image src={artPath(agent)} alt="" fill style={{ objectFit: "contain" }} />
            </span>
            <span className="cast-chip-name">{agent.name}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="cast-hero" key={selected.slug}>
          <PortraitFx src={artPath(selected)} alt={`${selected.name} portrait`} />
          <div className="cast-hero-body">
            <div className="cast-detail-head">
              <span className="cast-detail-name">{selected.name}</span>
              <span className="cast-detail-tier">{selected.tier}</span>
            </div>
            <div className="cast-detail-role">{roleTitle(selected.description)}</div>
            <p className="cast-detail-bio">{BIOS[selected.slug]}</p>
            <div className="cast-detail-spec-label">Full capability sheet</div>
            <div className="cast-detail-section markdown-body">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{selected.body}</ReactMarkdown>
            </div>
            <div className="cast-detail-section">
              <h3>Tools</h3>
              <div className="cast-detail-tools">
                {selected.tools.map((t) => (
                  <span className="tag" key={t}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
