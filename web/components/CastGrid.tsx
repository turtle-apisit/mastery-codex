"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

function Portrait({ agent }: { agent: Agent }) {
  return (
    <div className="cast-portrait">
      <div className="cast-ring" aria-hidden="true" />
      <div className="cast-ring inner" aria-hidden="true" />
      <span className="cast-flame cf1" aria-hidden="true"><i /></span>
      <span className="cast-flame cf2" aria-hidden="true"><i /></span>
      <span className="cast-ember ce1" aria-hidden="true" />
      <span className="cast-ember ce2" aria-hidden="true" />
      <span className="cast-ember ce3" aria-hidden="true" />
      <span className="cast-twinkle" style={{ top: "8%", left: "12%", animationDuration: "1.7s", animationDelay: "0s" }} aria-hidden="true" />
      <span className="cast-twinkle" style={{ top: "16%", left: "84%", animationDuration: "2.1s", animationDelay: ".5s" }} aria-hidden="true" />
      <span className="cast-twinkle" style={{ top: "70%", left: "20%", animationDuration: "1.9s", animationDelay: "1s" }} aria-hidden="true" />
      <Image src={artPath(agent)} alt={`${agent.name} portrait`} fill style={{ objectFit: "contain" }} />
      <div className="cast-portrait-scrim" aria-hidden="true">
        <span className="cast-name">{agent.name}</span>
        <span className="cast-role">{roleTitle(agent.description)}</span>
      </div>
    </div>
  );
}

export default function CastGrid({ agents, contract }: { agents: Agent[]; contract: string }) {
  const availableTiers = useMemo(
    () => TIER_ORDER.filter((t) => agents.some((a) => a.tier === t.tier)),
    [agents]
  );
  const [activeTier, setActiveTier] = useState<AgentTier>(availableTiers[0]?.tier ?? "Party");
  const [selected, setSelected] = useState<Agent | null>(null);
  const [contractOpen, setContractOpen] = useState(false);

  const active = availableTiers.find((t) => t.tier === activeTier) ?? availableTiers[0];
  const members = agents.filter((a) => a.tier === active?.tier);

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

      <div className="cast-strip">
        {members.map((agent) => (
          <button
            key={agent.slug}
            type="button"
            className={"cast-card" + (selected?.slug === agent.slug ? " selected" : "")}
            onClick={() => setSelected(agent)}
          >
            <Portrait agent={agent} />
          </button>
        ))}
      </div>

      <div className="panel cast-detail" id="cast-detail" style={{ marginTop: 20 }}>
        <h2>Agent Detail</h2>
        {selected ? (
          <div className="cast-detail-grid">
            <div className="cast-detail-portrait">
              <Portrait agent={selected} />
            </div>
            <div className="cast-detail-body">
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
        ) : (
          <p className="cast-detail-empty">
            Click a cast member above to see their full role, procedure, output, and don&rsquo;ts.
          </p>
        )}
      </div>
    </>
  );
}
