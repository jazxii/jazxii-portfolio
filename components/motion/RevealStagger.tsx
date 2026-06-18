"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealStaggerProps = {
  /** element to render (default div) */
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** forwarded so aria-labelledby / anchor targets keep working */
  id?: string;
  /**
   * CSS selector for the items to reveal, scoped to this wrapper. Defaults to
   * the wrapper's direct children — pass a selector when the items are nested
   * (e.g. ">li" / ".card").
   */
  selector?: string;
  /** px the items rise from */
  y?: number;
};

/**
 * Reveals a list/grid of items (cards, chips, swatches, rows) in staggered
 * batches as they scroll into view, using ScrollTrigger.batch — efficient for
 * many elements (it groups those entering together rather than one trigger
 * each).
 *
 * Transform-only (no opacity): items stay fully opaque, focusable, in the a11y
 * tree, and at full contrast — only their position animates. That keeps the
 * reveal axe-clean (opacity:0 text trips color-contrast) and keyboard/SR-safe.
 * Reduced-motion / no-JS = static. See decisions.md D17.
 */
export function RevealStagger({
  as,
  children,
  className,
  id,
  selector,
  y = 28,
}: RevealStaggerProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const root = ref.current;
      if (reducedMotion || !root) return;

      const nodes = selector
        ? root.querySelectorAll<HTMLElement>(selector)
        : (root.children as unknown as NodeListOf<HTMLElement>);
      const items = gsap.utils.toArray<HTMLElement>(nodes);
      if (!items.length) return;

      gsap.set(items, { y });
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          }),
      });
    },
    { dependencies: [reducedMotion], scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
