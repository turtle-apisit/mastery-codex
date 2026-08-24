"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Character" },
  { href: "/cast", label: "Cast" },
  { href: "/jobs", label: "Jobs" },
  { href: "/quests", label: "Quests" },
  { href: "/skill-tree", label: "Skill Tree" },
  { href: "/log", label: "Log" },
];

export type NavHud = {
  level: number;
  xpPct: number;
  streak: number;
  bossPrep: boolean;
  week: number;
  lengthWeeks: number;
};

export default function TopNav({ hud }: { hud: NavHud }) {
  const pathname = usePathname();

  return (
    <nav className="topnav">
      <div className="topnav-inner">
        <Link href="/" className="brand">
          MASTERY <em>CODEX</em>
        </Link>
        <div className="tabs">
          {TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={"tab" + (pathname === tab.href ? " active" : "")}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <div className="nav-hud">
          <span className="nav-hud-lv">
            <span className="t">LV</span>
            <span className="num">{hud.level}</span>
          </span>
          <span className="nav-hud-xp">
            <span className="nav-hud-xp-track">
              <span className="nav-hud-xp-fill" style={{ width: `${hud.xpPct}%` }} />
            </span>
          </span>
          <span className="nav-hud-streak num">{hud.streak}d</span>
          <span className={"nav-hud-cycle" + (hud.bossPrep ? " boss" : "")}>
            {hud.bossPrep ? "BOSS WEEK" : `W${hud.week}/${hud.lengthWeeks}`}
          </span>
        </div>
      </div>
    </nav>
  );
}
