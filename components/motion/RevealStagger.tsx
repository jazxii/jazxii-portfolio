"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
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
  /**
   * Also fade the items in (opacity 0 → 1), not just rise. OFF by default to
   * preserve the site-wide transform-only / axe-clean reveal; opt in only for
   * media-led items whose accessible name is NOT carried by faded body text
   * (e.g. the Playground artwork cards, where the caption sits on its own
   * always-opaque scrim). See decisions.md D17.
   */
  fade?: boolean;
  /** seconds the reveal runs (defaults 0.6; a touch slower reads as a soft fade) */
  duration?: number;
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
  fade = false,
  duration = 0.6,
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

      gsap.set(items, fade ? { y, opacity: 0 } : { y });

      // Drive the reveal from an IntersectionObserver rather than ScrollTrigger.
      // ScrollTrigger.update here is fed only by Lenis scroll events, so a
      // trigger created at rest (this masonry on load) never gets its initial
      // evaluation — with fade the cards would sit invisible until the first
      // scroll. The observer fires reliably on load for on-screen items AND
      // re-fires as the masonry settles, independent of Lenis. Items entering
      // together animate as a soft stagger. See decisions.md D17.
      const observer = new IntersectionObserver(
        (entries) => {
          const entering = entries
            .filter((entry) => entry.isIntersecting)
            .map((entry) => entry.target as HTMLElement);
          if (!entering.length) return;
          gsap.to(entering, {
            y: 0,
            ...(fade ? { opacity: 1 } : {}),
            duration,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          });
          entering.forEach((el) => observer.unobserve(el));
        },
        // reveal when an item reaches ~88% down the viewport (matches the old
        // ScrollTrigger "top 88%" start) so it eases in just before fully shown
        { rootMargin: "0px 0px -12% 0px" },
      );
      items.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    },
    { dependencies: [reducedMotion], scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
