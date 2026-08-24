import type { Metadata } from "next";
import { Rajdhani, IBM_Plex_Sans_Thai, IBM_Plex_Mono } from "next/font/google";
import TopNav from "@/components/TopNav";
import MatrixRain from "@/components/MatrixRain";
import HudFrame from "@/components/HudFrame";
import BootSequence from "@/components/BootSequence";
import EventToasts from "@/components/EventToasts";
import { getAllConcepts, getCycleInfo, getJobSummaries, getStreak } from "@/lib/vault";
import "./globals.css";

const rajdhani = Rajdhani({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-rajdhani",
});

const plexSansThai = IBM_Plex_Sans_Thai({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-plex-sans-thai",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "Mastery Codex",
  description: "A game-style status window for tracking mastery across coursework.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jobs = getJobSummaries();
  const cycle = getCycleInfo();
  const concepts = getAllConcepts();
  const unlocked = concepts.filter((c) => !c.locked);
  const totalXp = unlocked.reduce((s, c) => s + c.score, 0);
  const maxXp = unlocked.length * 100;

  const streak = getStreak();
  const hud = {
    level: jobs.reduce((s, j) => s + j.level, 0),
    xpPct: maxXp ? Math.round((totalXp / maxXp) * 100) : 0,
    streak,
    bossPrep: cycle.bossPrep,
    week: cycle.week,
    lengthWeeks: cycle.lengthWeeks,
  };

  const snapshot = {
    jobLevels: Object.fromEntries(jobs.map((j) => [j.subject, j.level])),
    mastered: concepts
      .filter((c) => !c.locked && c.status === "mastered")
      .map((c) => c.skill_name),
    streak,
  };

  return (
    <html lang="en">
      <body
        className={`${rajdhani.variable} ${plexSansThai.variable} ${plexMono.variable}`}
      >
        <MatrixRain />
        <HudFrame />
        <TopNav hud={hud} />
        {children}
        <EventToasts snapshot={snapshot} />
        <BootSequence />
      </body>
    </html>
  );
}
