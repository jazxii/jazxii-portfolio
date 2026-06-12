"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Smooth scrolling via Lenis, only where a page opts in and only
 * when the user allows motion. Returns a ref to the live instance
 * so callers can scrollTo through it.
 */
export function useLenis(): React.RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let rafId = 0;

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor();
      lenisRef.current = lenis;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return lenisRef;
}

/**
 * Scroll to an element and move focus to it — anchor navigation must
 * land keyboard and screen-reader users at the target, not just the
 * viewport (PRD §5.2). Target needs tabIndex={-1}.
 */
export function scrollToAndFocus(
  target: HTMLElement,
  lenis: Lenis | null,
  reducedMotion: boolean,
) {
  if (lenis && !reducedMotion) {
    lenis.scrollTo(target, { offset: -96 });
  } else {
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  }
  target.focus({ preventScroll: true });
}
