"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";

type RevealProps = {
  /** element to render (default div) — use a semantic tag where it matters */
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** forwarded so aria-labelledby / anchor targets keep working */
  id?: string;
  /** px the block rises from */
  y?: number;
  /** seconds to delay the reveal */
  delay?: number;
};

/**
 * Reveals a single block (section, paragraph, card, figure) as it scrolls into
 * view: it rises into place, once. See decisions.md D17.
 *
 * Transform-only (no opacity): the content is NEVER hidden — it stays fully
 * opaque, in the tab order, in the a11y tree, and at full contrast the whole
 * time; only its position animates. That keeps reveals axe-clean (opacity:0
 * text trips color-contrast) and keyboard/SR-safe, and matches the project
 * rule that decorative motion never hides content. The start state is set in
 * JS inside useGSAP's layout effect, so reduced-motion / no-JS = static.
 */
export function Reveal({
  as,
  children,
  className,
  id,
  y = 24,
  delay = 0,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (reducedMotion || !el) return;
      gsap.from(el, {
        y,
        duration: 0.7,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
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
