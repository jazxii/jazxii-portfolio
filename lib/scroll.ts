"use client";

import type Lenis from "lenis";

// Smooth scrolling is now provided once, globally, by <SmoothScroll>
// (components/motion/SmoothScroll.tsx). Components that need the live instance
// read it from context via useLenisInstance — re-exported here so existing
// callers keep importing scroll helpers from one place.
export { useLenisInstance } from "./lenisContext";

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
  // Compute the target's absolute document position numerically (rect + scroll)
  // minus the sticky-header offset. We pass a NUMBER — not the element — to
  // Lenis, because a positioned ancestor (the Work content panel) makes the
  // element's offsetTop relative to the panel, which mis-resolves the scroll.
  const top = target.getBoundingClientRect().top + window.scrollY - 96;
  if (lenis && !reducedMotion) {
    lenis.scrollTo(top, { offset: 0 });
  } else {
    window.scrollTo({ top, behavior: reducedMotion ? "auto" : "smooth" });
  }
  target.focus({ preventScroll: true });
}
