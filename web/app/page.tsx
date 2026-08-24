import Image from "next/image";
import PortraitFx from "@/components/PortraitFx";
import SkillInventory from "@/components/SkillInventory";
import { getAllConcepts, getCycleInfo, getJobSummaries, getStreak } from "@/lib/vault";

export default function CharacterPage() {
  const concepts = getAllConcepts();
  const jobs = getJobSummaries();
  const cycle = getCycleInfo();
  const streak = getStreak();

  const unlocked = concepts.filter((c) => !c.locked);
  const totalXp = unlocked.reduce((s, c) => s + c.score, 0);
  const maxXp = unlocked.length * 100;
  const xpPct = maxXp ? Math.round((totalXp / maxXp) * 100) : 0;
  const baseLevel = jobs.reduce((s, j) => s + j.level, 0);
  const strongest = [...jobs].sort((a, b) => b.level - a.level)[0];

  const pips = Array.from({ length: cycle.lengthWeeks }, (_, i) => {
    const weekNum = i + 1;
    if (weekNum < cycle.week) return "filled";
    if (weekNum === cycle.lengthWeeks - 1) return "boss";
    return "";
  });

  return (
    <div className="page">
      <div className="cover-banner cut">
        <Image
          src="/art/town-hub-background.png"
          alt="Mastery Codex hub"
          fill
          style={{
            objectFit: "cover",
            objectPosition: "center 35%",
          }}
          priority
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(5,13,20,.22) 0%, rgba(5,13,20,.68) 58%, var(--surface) 100%)",
          }}
        />
      </div>

      <section className="hud" id="character">
        <div className="char-top">
          <PortraitFx src="/art/character-portrait.png" alt="Character portrait" />

          <div className="crest cut-sm">
            <span className="crest-tag">LV</span>
            <span className="crest-num num">{baseLevel}</span>
          </div>

          <div className="hud-id">
            <div className="eyebrow">Mastery Codex // Status Window</div>
            <div className="char-title">AI Engineering Apprentice</div>
            <div className="char-sub">
              Strongest in {strongest?.subject ?? "—"} &middot;{" "}
              <span className="streak">{streak}-day streak</span>
            </div>
            <div className="xp-row">
              <div className="xp-track">
                <div className="xp-fill" style={{ width: `${xpPct}%` }} />
              </div>
              <span className="xp-label num">
                {totalXp} / {maxXp} XP
              </span>
            </div>
          </div>

          <div className="cycle-block">
            <div className="eyebrow">Exam Cycle {cycle.cycleNumber}</div>
            <div className="cycle-pips">
              {pips.map((p, i) => (
                <span key={i} className={"pip" + (p ? ` ${p}` : "")} />
              ))}
            </div>
            <div className="cycle-note">
              Week {cycle.week} of {cycle.lengthWeeks}
              {cycle.bossPrep ? (
                <>
                  {" "}
                  &middot; <strong>Boss Prep active</strong>
                </>
              ) : (
                <>
                  {" "}
                  &middot; Boss Prep starts in <strong>{cycle.daysUntilBossPrep} days</strong>
                </>
              )}
            </div>
          </div>
        </div>

        <SkillInventory concepts={concepts} />
      </section>
    </div>
  );
}
