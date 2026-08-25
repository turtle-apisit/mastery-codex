"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Box = { x: number; y: number; w: number; h: number };

/**
 * Zoom floor. Low enough that a phone can pinch all the way out to the same
 * overview the Fit button gives — on a 360px screen a 1340-unit graph fits at
 * about 0.25, so a 0.35 floor would have made Fit unreachable by gesture.
 */
const MIN_SCALE = 0.12;
const MAX_SCALE = 3;

export type ViewportOptions = {
  /**
   * On hosts at least this wide, open at `readableScale` anchored to the left
   * edge instead of fitting the whole graph. Fitting a 145-neuron network into
   * a desktop panel lands around 0.6, where a label renders at ~7px — legible
   * to nobody. Wide screens therefore open at the start of the network, zoomed
   * enough to read, and Fit is one button away.
   */
  readableFrom?: number;
  readableScale?: number;
};

export function useViewport(
  content: { width: number; height: number },
  opts: ViewportOptions = {}
) {
  const { readableFrom = 660, readableScale = 0.95 } = opts;

  const hostRef = useRef<HTMLDivElement | null>(null);
  const [host, setHost] = useState({ w: 0, h: 0 });
  const [box, setBox] = useState<Box>({
    x: 0,
    y: 0,
    w: content.width,
    h: content.height,
  });

  // Pointers currently down, keyed by pointerId, so one finger pans and two
  // pinch without pulling in a gesture library.
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; box: Box; cx: number; cy: number } | null>(
    null
  );
  const [dragging, setDragging] = useState(false);
  const moved = useRef(false);

  const fit = useCallback(() => {
    const el = hostRef.current;
    if (!el) return;
    const w = el.clientWidth || content.width;
    const h = el.clientHeight || content.height;
    // Match the host's aspect ratio so nothing is squashed, then cover the
    // whole graph inside it.
    const s = Math.min(w / content.width, h / content.height);
    const vw = w / s;
    const vh = h / s;
    setBox({
      x: (content.width - vw) / 2,
      y: (content.height - vh) / 2,
      w: vw,
      h: vh,
    });
  }, [content.width, content.height]);

  /** Open at the left edge of the network — where the roots are — at a scale
   *  where labels are actually legible. */
  const showStart = useCallback(
    (target: number) => {
      const el = hostRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const vw = w / target;
      const vh = h / target;
      setBox({ x: 0, y: (content.height - vh) / 2, w: vw, h: vh });
    },
    [content.height]
  );

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setHost({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    setHost({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  // Choose the opening view once the host has a measured size, and again if the
  // graph or the host changes shape (orientation flip, panel resize).
  const shapeKey = `${host.w}x${host.h}:${content.width}x${content.height}`;
  const lastShape = useRef("");
  useEffect(() => {
    if (!host.w || !host.h) return;
    if (lastShape.current === shapeKey) return;
    lastShape.current = shapeKey;
    const fitScale = Math.min(host.w / content.width, host.h / content.height);
    if (host.w >= readableFrom && fitScale < readableScale) showStart(readableScale);
    else fit();
  }, [
    shapeKey,
    host.w,
    host.h,
    content.width,
    content.height,
    readableFrom,
    readableScale,
    fit,
    showStart,
  ]);

  /** Current on-screen scale: host pixels per graph unit. */
  const scale = host.w && box.w ? host.w / box.w : 1;

  const clampW = useCallback((hostW: number, w: number) => {
    return Math.min(hostW / MIN_SCALE, Math.max(hostW / MAX_SCALE, w));
  }, []);

  const zoomAt = useCallback(
    (factor: number, cx: number, cy: number) => {
      setBox((b) => {
        const hostW = hostRef.current?.clientWidth || b.w;
        const w = clampW(hostW, b.w / factor);
        const f = w / b.w;
        // Keep the point under the cursor pinned while scaling.
        return {
          x: cx - (cx - b.x) * f,
          y: cy - (cy - b.y) * f,
          w,
          h: b.h * f,
        };
      });
    },
    [clampW]
  );

  const zoomBy = useCallback(
    (factor: number) => {
      setBox((b) => {
        const hostW = hostRef.current?.clientWidth || b.w;
        const w = clampW(hostW, b.w / factor);
        const f = w / b.w;
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        return { x: cx - w / 2, y: cy - (b.h * f) / 2, w, h: b.h * f };
      });
    },
    [clampW]
  );

  /** Client point -> graph coordinates. */
  const toGraph = useCallback(
    (clientX: number, clientY: number) => {
      const el = hostRef.current;
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: box.x + ((clientX - r.left) / r.width) * box.w,
        y: box.y + ((clientY - r.top) / r.height) * box.h,
      };
    },
    [box]
  );

  /** Pan so a point sits in the middle of the view, without changing zoom. */
  const centerOn = useCallback((x: number, y: number) => {
    setBox((b) => ({ ...b, x: x - b.w / 2, y: y - b.h / 2 }));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if (!hostRef.current) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    moved.current = false;
    if (pointers.current.size === 1) setDragging(true);
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      const mid = toGraph((a.x + b.x) / 2, (a.y + b.y) / 2);
      pinch.current = {
        dist: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        box,
        cx: mid.x,
        cy: mid.y,
      };
      setDragging(false);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    const el = hostRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();

    if (pointers.current.size >= 2 && pinch.current) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      const start = pinch.current;
      const w = clampW(r.width, start.box.w * (start.dist / dist));
      const f = w / start.box.w;
      setBox({
        x: start.cx - (start.cx - start.box.x) * f,
        y: start.cy - (start.cy - start.box.y) * f,
        w,
        h: start.box.h * f,
      });
      moved.current = true;
      return;
    }

    if (!dragging) return;
    // 6px, not 2: a tap on a touchscreen drifts a few pixels before it lifts,
    // and treating that as a drag swallowed the click on whatever was tapped.
    if (Math.abs(e.clientX - prev.x) > 6 || Math.abs(e.clientY - prev.y) > 6) {
      moved.current = true;
    }
    const dx = ((e.clientX - prev.x) / r.width) * box.w;
    const dy = ((e.clientY - prev.y) / r.height) * box.h;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setBox((b) => ({ ...b, x: b.x - dx, y: b.y - dy }));
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) setDragging(false);
  };

  // Wheel must be a native non-passive listener: React registers onWheel
  // passively, so preventDefault there is ignored and the page scrolls away
  // underneath the zoom.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      const gx = box.x + ((e.clientX - r.left) / r.width) * box.w;
      const gy = box.y + ((e.clientY - r.top) / r.height) * box.h;
      zoomAt(e.deltaY < 0 ? 1.14 : 1 / 1.14, gx, gy);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [box, zoomAt]);

  return {
    hostRef,
    box,
    scale,
    dragging,
    /** true when the pointer sequence just ended was a drag, so click can ignore it */
    didDrag: () => moved.current,
    fit,
    zoomBy,
    centerOn,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endPointer,
      onPointerCancel: endPointer,
      onPointerLeave: endPointer,
    },
  };
}
