"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { LenisContext } from "@/lib/lenisContext";

/**
 * One global Lenis instance for the whole app, wired to GSAP the canonical way:
 * Lenis emits scroll → ScrollTrigger.update, and GSAP's single ticker drives
 * lenis.raf (so there's exactly one rAF loop and ScrollTrigger scrubs stay in
 * perfect sync with the smoothed scroll — no jitter). See decisions.md D17.
 *
 * Mounted once in the root layout. Under reduced motion it does nothing and the
 * browser's native scroll is used (the global CSS backstop already forces
 * `scroll-behavior: auto`). Adds no DOM — it only provides context + the effect.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let cancelled = false;
    let lenis: Lenis | null = null;
    const tick = (time: number) => {
      // gsap.ticker time is in seconds; Lenis expects milliseconds
      lenis?.raf(time * 1000);
    };

    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      lenis = new LenisCtor();
      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
