"use client";

import { useEffect, useState } from "react";

const LINES = [
  "LINK START",
  "AUTHENTICATING WANDERER",
  "MOUNTING VAULT",
  "SYNC COMPLETE",
];

const LINE_MS = 260;
const HOLD_MS = 420;

export default function BootSequence() {
  const [phase, setPhase] = useState<"idle" | "playing" | "closing" | "done">("idle");
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || sessionStorage.getItem("mc:booted")) {
      setPhase("done");
      return;
    }
    sessionStorage.setItem("mc:booted", "1");
    setPhase("playing");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    const timers = LINES.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * LINE_MS)
    );
    timers.push(
      setTimeout(() => setPhase("closing"), LINES.length * LINE_MS + HOLD_MS)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (phase !== "closing") return;
    const done = setTimeout(() => setPhase("done"), 500);
    return () => clearTimeout(done);
  }, [phase]);

  useEffect(() => {
    if (phase === "idle" || phase === "done") return;
    const skip = () => setPhase("done");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, [phase]);

  if (phase === "idle" || phase === "done") return null;

  return (
    <div
      className={"boot-overlay" + (phase === "closing" ? " closing" : "")}
      role="presentation"
      aria-hidden="true"
    >
      <div className="boot-inner">
        <div className="boot-brand">
          MASTERY <em>CODEX</em>
        </div>
        <div className="boot-rule" />
        <ul className="boot-lines">
          {LINES.slice(0, visibleLines).map((line) => (
            <li className="boot-line" key={line}>
              <span className="boot-caret">&gt;</span> {line}
            </li>
          ))}
        </ul>
      </div>
      <div className="boot-skip">click anywhere to skip</div>
    </div>
  );
}
