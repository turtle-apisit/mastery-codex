"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Navigation" },
  { href: "/observatory", label: "Observatory" },
  { href: "/simulation", label: "Simulation" },
  { href: "/final-approach", label: "Final Approach" },
];

export default function TopNav() {
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
      </div>
    </nav>
  );
}
