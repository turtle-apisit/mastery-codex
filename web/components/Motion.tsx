"use client";

import { useEffect } from "react";

// Elements that rise into view as you scroll. The selector lives here rather
// than in markup so no page has to opt in one element at a time.
//
// `.hero` and `.bento .tile` are deliberately absent: they are above the fold
// on every page that has them, and anything this component hides stays hidden
// until hydration finishes. Their entrance is a plain CSS load animation in
// globals.css instead, which starts at first paint and needs no script.
const TARGETS =
  ".inventory, .panel, .fa-intro, .fa-unit-card, .fa-item, .course-list-card";

// Cards that carry a soft highlight under the pointer.
const LIT = ".tile, .fa-unit-card, .course-list-card";

// The hidden-until-revealed state is applied by THIS script (via the
// `js-reveal` class on <html>) and never by the stylesheet alone. If the
// script never runs — it throws, it is blocked, the browser has no
// IntersectionObserver — the class is absent and every element renders at
// full opacity. Content is never waiting on JS to become visible.
export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canReveal = typeof IntersectionObserver !== "undefined" && !reduced;

    if (canReveal) root.classList.add("js-reveal");

    // Two things rule out a cleverer trigger. A scroll-driven CSS timeline
    // measures `entry` against the element's own height, so a panel taller
    // than the viewport stays half-faded for a full screen of scrolling. And
    // a negative bottom rootMargin — reveal only once the element is 12% up
    // from the bottom edge — strands anything sitting in that band on a page
    // with nothing left to scroll. Plain viewport intersection has neither
    // problem: the observer's first callback covers everything already on
    // screen, so visible content can never be stuck invisible.
    const io = canReveal
      ? new IntersectionObserver((entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            e.target.classList.add("is-in");
            io!.unobserve(e.target);
          }
        })
      : null;

    const seen = new WeakSet<Element>();
    const scan = () => {
      if (!io) return;
      for (const el of document.querySelectorAll(TARGETS)) {
        if (seen.has(el)) continue;
        seen.add(el);
        // Already on screen when we found it — mark it revealed in this same
        // task, so it is never painted in the hidden state and no transition
        // runs. Only what is genuinely below the fold gets an entrance.
        if (el.getBoundingClientRect().top < window.innerHeight) {
          el.classList.add("is-in");
          continue;
        }
        io.observe(el);
      }
    };
    scan();

    // Client-fetched pages mount their content after this effect runs, so
    // watch for what arrives later.
    const mo = io ? new MutationObserver(scan) : null;
    mo?.observe(document.body, { childList: true, subtree: true });

    // --- pointer highlight ------------------------------------------------
    // Cards get a faint wash that follows the cursor. Coarse pointers have no
    // hover to follow, so they never pay for the listener.
    const fine =
      !reduced && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;
    let pending: { el: HTMLElement; x: number; y: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { el, x, y } = pending;
      pending = null;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    const onMove = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.(LIT) as HTMLElement | null;
      if (!el) return;
      const r = el.getBoundingClientRect();
      pending = {
        el,
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      };
      // One write per frame, whatever rate the pointer reports at.
      if (!frame) frame = requestAnimationFrame(flush);
    };
    if (fine) document.addEventListener("pointermove", onMove, { passive: true });

    // --- sticky nav elevation ---------------------------------------------
    // The header only casts a shadow once there is content under it, so at the
    // top of a page it reads as part of the page rather than a bar over it.
    // Not gated on reduced-motion: it is a state cue, not an animation.
    const onScroll = () => {
      root.classList.toggle("is-scrolled", window.scrollY > 4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io?.disconnect();
      mo?.disconnect();
      if (fine) document.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      root.classList.remove("js-reveal");
      root.classList.remove("is-scrolled");
    };
  }, []);

  return null;
}
