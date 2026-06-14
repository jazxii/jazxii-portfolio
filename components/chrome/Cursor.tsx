"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Progressive custom cursor (PRD §5.5): a dot + trailing ring that grows
 * over interactive elements and shows a contextual label from `data-cursor`.
 *
 * - Only mounts on pointer:fine AND motion-allowed, so keyboard and touch
 *   users get the native cursor and focus rings, untouched.
 * - `cursor: none` is scoped to a body class added only while active, and
 *   inputs keep their caret (see globals.css).
 * - Decorative: aria-hidden; conveys nothing not already in the DOM.
 */

const LABELS: Record<string, string> = {
  view: "view",
  email: "email",
  copy: "copy",
  play: "play",
};

export function Cursor() {
  const reducedMotion = useReducedMotion();
  const pointerFine = useMediaQuery("(pointer: fine)");
  const enabled = !reducedMotion && pointerFine;
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!root || !dot || !ring || !label) return;

    document.documentElement.classList.add("cursor-hidden");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;
    let shown = false;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      mx = event.clientX;
      my = event.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      if (!shown) {
        shown = true;
        root.style.opacity = "1";
      }
      const interactive = (event.target as HTMLElement | null)?.closest(
        "a, button, [role='button'], [data-cursor]",
      ) as HTMLElement | null;
      root.classList.toggle("is-hover", !!interactive);
      const mode = interactive?.dataset.cursor;
      const text = mode ? (LABELS[mode] ?? "") : "";
      label.textContent = text;
      root.classList.toggle("has-label", text.length > 0);
    };

    const onLeave = () => {
      root.style.opacity = "0";
      shown = false;
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className="custom-cursor">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={dotRef} className="cursor-dot" />
    </div>
  );
}
