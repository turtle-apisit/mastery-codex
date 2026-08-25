"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

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
  /** on-screen scale at or above which labels are worth drawing */
  labelScale?: number;
};

/**
 * Pan/zoom over an SVG viewBox.
 *
 * The viewBox is written straight to the element rather than held in state.
 * Panning fires on every pointermove, and routing that through React re-rendered
 * the entire graph — several hundred SVG nodes — once per frame, which is what
 * made dragging feel like it was catching. React now only re-renders when
 * something *discrete* changes, which in practice is the label-visibility flag
 * crossing its threshold.
 */
export function useViewport(
  content: { width: number; height: number },
  opts: ViewportOptions = {}
) {
  const {
    readableFrom = 660,
    readableScale = 0.95,
    labelScale = 0.8,
  } = opts;

  const hostRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const boxRef = useRef<Box>({ x: 0, y: 0, w: content.width, h: content.height });

  const [labelsOn, setLabelsOn] = useState(false);
  const labelsOnRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; box: Box; cx: number; cy: number } | null>(
    null
  );
  const moved = useRef(false);

  /** Push the current box onto the element and reconcile the label flag. */
  const apply = useCallback(() => {
    const b = boxRef.current;
    svgRef.current?.setAttribute(
      "viewBox",
      `${b.x.toFixed(2)} ${b.y.toFixed(2)} ${b.w.toFixed(2)} ${b.h.toFixed(2)}`
    );
    const hostW = hostRef.current?.clientWidth ?? 0;
    if (!hostW || !b.w) return;
    const on = hostW / b.w >= labelScale;
    if (on !== labelsOnRef.current) {
      labelsOnRef.current = on;
      setLabelsOn(on);
    }
  }, [labelScale]);

  // React owns the initial viewBox attribute, so it would clobber the live one
  // on any re-render. Re-applying after every commit keeps the two in step.
  useLayoutEffect(apply);

  const setBox = useCallback(
    (next: Box) => {
      boxRef.current = next;
      apply();
    },
    [apply]
  );

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
  }, [content.width, content.height, setBox]);

  /** Open at the left edge — where the roots are — at a legible scale. */
  const showStart = useCallback(
    (target: number) => {
      const el = hostRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      setBox({ x: 0, y: (content.height - h / target) / 2, w: w / target, h: h / target });
    },
    [content.height, setBox]
  );

  // Choose the opening view once the host has a measured size, and again if the
  // graph or the host changes shape (orientation flip, panel resize).
  const shapeRef = useRef("");
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const settle = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const key = `${w}x${h}:${content.width}x${content.height}`;
      if (shapeRef.current === key) return;
      shapeRef.current = key;
      const fitScale = Math.min(w / content.width, h / content.height);
      if (w >= readableFrom && fitScale < readableScale) showStart(readableScale);
      else fit();
    };
    const ro = new ResizeObserver(settle);
    ro.observe(el);
    settle();
    return () => ro.disconnect();
  }, [content.width, content.height, readableFrom, readableScale, fit, showStart]);

  const clampW = useCallback((hostW: number, w: number) => {
    return Math.min(hostW / MIN_SCALE, Math.max(hostW / MAX_SCALE, w));
  }, []);

  const zoomAt = useCallback(
    (factor: number, cx: number, cy: number) => {
      const b = boxRef.current;
      const hostW = hostRef.current?.clientWidth || b.w;
      const w = clampW(hostW, b.w / factor);
      const f = w / b.w;
      // Keep the point under the cursor pinned while scaling.
      setBox({ x: cx - (cx - b.x) * f, y: cy - (cy - b.y) * f, w, h: b.h * f });
    },
    [clampW, setBox]
  );

  const zoomBy = useCallback(
    (factor: number) => {
      const b = boxRef.current;
      const hostW = hostRef.current?.clientWidth || b.w;
      const w = clampW(hostW, b.w / factor);
      const f = w / b.w;
      const cx = b.x + b.w / 2;
      const cy = b.y + b.h / 2;
      setBox({ x: cx - w / 2, y: cy - (b.h * f) / 2, w, h: b.h * f });
    },
    [clampW, setBox]
  );

  /** Pan so a point sits in the middle of the view, without changing zoom. */
  const centerOn = useCallback(
    (x: number, y: number) => {
      const b = boxRef.current;
      setBox({ ...b, x: x - b.w / 2, y: y - b.h / 2 });
    },
    [setBox]
  );

  const toGraph = useCallback((clientX: number, clientY: number) => {
    const el = hostRef.current;
    const b = boxRef.current;
    if (!el) return { x: 0, y: 0 };
    const r = el.getBoundingClientRect();
    return {
      x: b.x + ((clientX - r.left) / r.width) * b.w,
      y: b.y + ((clientY - r.top) / r.height) * b.h,
    };
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
        box: { ...boxRef.current },
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
    const b = boxRef.current;

    if (pointers.current.size >= 2 && pinch.current) {
      pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      const [p1, p2] = [...pointers.current.values()];
      const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y) || 1;
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
    const dx = ((e.clientX - prev.x) / r.width) * b.w;
    const dy = ((e.clientY - prev.y) / r.height) * b.h;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    setBox({ ...b, x: b.x - dx, y: b.y - dy });
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
      const b = boxRef.current;
      const gx = b.x + ((e.clientX - r.left) / r.width) * b.w;
      const gy = b.y + ((e.clientY - r.top) / r.height) * b.h;
      zoomAt(e.deltaY < 0 ? 1.14 : 1 / 1.14, gx, gy);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  return {
    hostRef,
    svgRef,
    /** viewBox for the server render; live updates go straight to the element */
    initialViewBox: `0 0 ${content.width} ${content.height}`,
    labelsOn,
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
