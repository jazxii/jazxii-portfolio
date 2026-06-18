"use client";

import { useRef, type ElementType } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealTextProps = {
  /** semantic tag to render — h1/h2/h3/p etc. (default p) */
  as?: ElementType;
  /** plain text to reveal line-by-line (no inline markup — SplitText aria
   *  preserves the string but not nested element semantics like links) */
  children: string;
  className?: string;
  /** forwarded so aria-labelledby targets keep resolving to this heading */
  id?: string;
  /** stagger between lines, seconds */
  stagger?: number;
};

/**
 * Premium per-line text reveal: the text splits into lines that rise up from
 * behind a mask and fade in, staggered, as it scrolls into view.
 *
 * Accessibility (decisions.md D17):
 * - Under reduced motion we render the plain element with the full text and
 *   NO split at all — perfect for AT, zero motion.
 * - When animating, SplitText `aria: "auto"` puts an aria-label with the full
 *   string on the element and aria-hides the per-line fragments, so screen
 *   readers still read one clean sentence.
 * - `autoSplit` re-splits after the web font swaps in / on resize so line
 *   breaks are always correct; once revealed it re-renders to the final state
 *   instead of replaying. SplitText.revert() restores the original DOM on unmount.
 */
export function RevealText({
  as,
  children,
  className,
  id,
  stagger = 0.12,
}: RevealTextProps) {
  const Tag = (as ?? "p") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (reducedMotion || !el) return;

      let revealed = false;
      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        aria: "auto",
        autoSplit: true,
        onSplit: (self) => {
          if (revealed) {
            // already played once — re-split (font/resize) lands at final state
            gsap.set(self.lines, { yPercent: 0, opacity: 1 });
            return;
          }
          return gsap.from(self.lines, {
            yPercent: 100,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
            onComplete: () => {
              revealed = true;
            },
          });
        },
      });

      return () => split.revert();
    },
    { dependencies: [reducedMotion], scope: ref },
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  );
}
