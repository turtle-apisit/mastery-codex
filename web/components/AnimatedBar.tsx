"use client";

import { useEffect, useState } from "react";

/**
 * Renders at 0 width, then hands the easing to a CSS transition on the next
 * frame — cheaper than driving width per-frame from JS.
 */
export default function AnimatedBar({
  pct,
  trackClass,
  fillClass,
}: {
  pct: number;
  trackClass: string;
  fillClass: string;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setWidth(pct);
      return;
    }
    const raf = requestAnimationFrame(() => setWidth(pct));
    return () => cancelAnimationFrame(raf);
  }, [pct]);

  return (
    <div className={trackClass}>
      <div className={fillClass + " bar-eased"} style={{ width: `${width}%` }}>
        {/* Keyed on pct so a changed score remounts the span and replays the
            one-shot sweep. Without the key it would only ever run on mount. */}
        <span key={pct} className="bar-shine" aria-hidden="true" />
      </div>
    </div>
  );
}
