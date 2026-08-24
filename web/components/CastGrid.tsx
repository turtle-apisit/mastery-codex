"use client";

import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Agent, AgentTier } from "@/lib/vault";

const TIER_ORDER: { tier: AgentTier; label: string; desc: string }[] = [
  { tier: "Party", label: "Party", desc: "companions who work with your material every day" },
  { tier: "NPC", label: "NPC", desc: "the teacher you meet every day" },
  { tier: "Central", label: "Central", desc: "quality assurance for the whole system, not part of your daily loop" },
];

function artPath(agent: Agent): string {
  const folder = agent.tier === "Party" ? "party" : agent.tier === "NPC" ? "npc" : "central";
  return `/art/${folder}/${agent.slug}.png`;
}

function shortDesc(description: string): string {
  return description.split(". Use ")[0] + ".";
}

export default function CastGrid({ agents }: { agents: Agent[] }) {
  const [selected, setSelected] = useState<Agent | null>(null);

  return (
    <>
      {TIER_ORDER.map(({ tier, label, desc }) => {
        const members = agents.filter((a) => a.tier === tier);
        if (!members.length) return null;
        return (
          <div className="cast-group" key={tier}>
            <div className="cast-group-name">
              {label} &mdash; {desc}
            </div>
            <div className="cast-grid">
              {members.map((agent) => (
                <button
                  key={agent.slug}
                  type="button"
                  className={"cast-card" + (selected?.slug === agent.slug ? " selected" : "")}
                  onClick={() => setSelected(agent)}
                >
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
                  </div>
                  <div className="cast-name">{agent.name}</div>
                  <div className="cast-role">{tier === "Party" ? agent.name : label}</div>
                  <div className="cast-desc">{shortDesc(agent.description)}</div>
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <div className="panel cast-detail" id="cast-detail" style={{ marginTop: 20 }}>
        <h2>Agent Detail</h2>
        {selected ? (
          <>
            <div className="cast-detail-head">
              <span className="cast-detail-name">{selected.name}</span>
              <span className="cast-detail-tier">{selected.tier}</span>
            </div>
            <div className="cast-detail-role">{shortDesc(selected.description)}</div>
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
          </>
        ) : (
          <p className="cast-detail-empty">
            Click a cast member above to see their full role, procedure, output, and don&rsquo;ts.
          </p>
        )}
      </div>
    </>
  );
}
