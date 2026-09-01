"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AnimatedBar from "@/components/AnimatedBar";
import AnimatedNum from "@/components/AnimatedNum";
import PortraitFx from "@/components/PortraitFx";
import SkillInventory from "@/components/SkillInventory";
import { supabase } from "@/lib/supabase/client";
import type { Concept, CycleInfo, JobSummary } from "@/lib/vault";

export default function CharacterView({
  concepts: allConcepts,
  jobs: allJobs,
  cycle,
  streak,
}: {
  concepts: Concept[];
  jobs: JobSummary[];
  cycle: CycleInfo;
  streak: number;
}) {
  const [courseNames, setCourseNames] = useState<Set<string> | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase.from("courses").select("name");
        setCourseNames(new Set((data ?? []).map((c) => c.name)));
      } catch {
        setCourseNames(new Set());
      }
    }
    load();
  }, []);

  // Course = Skill: a discipline only shows up as an acquired Skill once a
  // Course row exists for it, not just because concept notes exist in the
  // vault.
  const concepts =
    courseNames === null ? [] : allConcepts.filter((c) => courseNames.has(c.subject));
  const jobs = courseNames === null ? [] : allJobs.filter((j) => courseNames.has(j.subject));

  const unlocked = concepts.filter((c) => !c.locked);
  const totalXp = unlocked.reduce((s, c) => s + c.score, 0);
  const maxXp = unlocked.length * 100;
  const xpPct = maxXp ? Math.round((totalXp / maxXp) * 100) : 0;
  const baseLevel = jobs.reduce((s, j) => s + j.level, 0);
  // Only a real lead counts. With every discipline tied at level 0 the sort
  // still returns a winner, and the hero would claim a strongest subject before
  // a single exercise had been graded.
  const ranked = [...jobs].sort((a, b) => b.level - a.level);
  const strongest = ranked[0]?.level > 0 ? ranked[0] : null;

  const pips = Array.from({ length: cycle.lengthWeeks }, (_, i) => {
    const weekNum = i + 1;
    if (weekNum < cycle.week) return "filled";
    if (weekNum === cycle.lengthWeeks - 1) return "boss";
    return "";
  });

  if (courseNames === null) {
    return (
      <div className="page">
        <p className="field-hint">Loading…</p>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="hero cut" id="character">
        <div className="hero-art" aria-hidden="true">
          <Image
            src="/art/town-hub-background.png"
            alt=""
            fill
            style={{ objectFit: "cover", objectPosition: "center 32%" }}
            priority
          />
        </div>

        <PortraitFx src="/art/character-portrait.png" alt="Character portrait" />

        <div className="hero-id">
          <div className="hero-eyebrow">Origin System // Navigation</div>
          <h1 className="hero-name">AI Engineering Apprentice</h1>
          <div className="hero-meta">
            <span>{strongest ? `Strongest in ${strongest.subject}` : "No discipline trained yet"}</span>
            <span className="streak">{streak}-day streak</span>
          </div>
        </div>
      </section>

      <section className="bento" aria-label="Character stats">
        <div className="tile">
          <span className="tile-label">Level</span>
          <span className="tile-figure num">
            <AnimatedNum value={baseLevel} />
          </span>
          <span className="tile-note">Across {jobs.length} disciplines</span>
        </div>

        <div className="tile">
          <span className="tile-label">Experience</span>
          <span className="tile-figure num">
            <AnimatedNum value={xpPct} />
            <span className="unit">%</span>
          </span>
          <AnimatedBar pct={xpPct} trackClass="xp-track" fillClass="xp-fill" />
          <span className="tile-note num">
            {totalXp} / {maxXp} XP
          </span>
        </div>

        <div className="tile">
          <span className="tile-label">Streak</span>
          <span className="tile-figure num">
            <AnimatedNum value={streak} />
            <span className="unit">days</span>
          </span>
          <span className="tile-note">Consecutive active days</span>
        </div>

        <div className={"tile" + (cycle.bossPrep ? " boss" : "")}>
          <span className="tile-label">Exam Cycle {cycle.cycleNumber}</span>
          <span className="tile-figure">
            {cycle.week}
            <span className="unit">of {cycle.lengthWeeks}</span>
          </span>
          <div className="cycle-pips" aria-hidden="true">
            {pips.map((p, i) => (
              <span key={i} className={"pip" + (p ? ` ${p}` : "")} />
            ))}
          </div>
          <span className="tile-note">
            {cycle.bossPrep ? (
              <strong>Boss Prep active</strong>
            ) : (
              <>
                Boss Prep in <strong>{cycle.daysUntilBossPrep} days</strong>
              </>
            )}
          </span>
        </div>
      </section>

      <SkillInventory concepts={concepts} />
    </div>
  );
}
