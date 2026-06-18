"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  // Always open a route at the top. We own scrolling (Lenis tracks its own
  // position), so the browser's scroll restoration would otherwise drop the
  // visitor partway down the next page — e.g. into the Work cards instead of
  // the hero. Take restoration over, then snap both Lenis and the window to 0
  // on every route change (and the first load). immediate:true = no animation.
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // A hash (e.g. /work#enigma-8 from the home teaser) is an intentional
    // deep-link — let it land on its target instead of forcing the top.
    if (!window.location.hash) {
      lenisRef.current?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    }

    // The global Lenis instance persists across client-side navigations, so it
    // keeps the PREVIOUS route's scroll height and clamps scrolling to it — on
    // a taller page the visitor gets stuck partway down until a full reload.
    // Recompute the limit (and ScrollTrigger's start/end positions) once the
    // new route has painted, so the whole page is scrollable without a reload.
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        lenisRef.current?.resize();
        ScrollTrigger.refresh();
      });
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [pathname]);

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
