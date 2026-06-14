"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The storytelling thread: a curvy line that *draws itself* down the home
 * narrative as you scroll, connecting the beats (statement → services →
 * folder CTA → stepped headline → benefits). Juan Mora's "grow-line",
 * reimagined as a scroll-scrubbed SVG stroke.
 *
 * - Decorative: aria-hidden, pointer-events:none, sits behind the content.
 * - Drawn via stroke-dashoffset scrubbed by a ScrollTrigger spanning the
 *   whole HomeIntro section; a glowing "pen tip" rides the path head.
 * - Not rendered at all under reduced motion (the section's own separator
 *   lines carry the structure); desktop only (hidden on small screens).
 */

// viewBox 0..100 (x) by 0..1000 (y); preserveAspectRatio="none" stretches
// it to the section height, so it reads as a tall vertical weave.
const PATH =
  "M 50 6 C 50 90, 16 130, 22 210 C 28 300, 84 320, 78 410 C 72 510, 16 530, 22 630 C 28 730, 84 752, 70 848 C 60 922, 50 952, 50 996";

export function StoryLine() {
  const reducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const tipRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reducedMotion) return;
    const wrap = wrapRef.current;
    const path = pathRef.current;
    const tip = tipRef.current;
    if (!wrap || !path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    let killed = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (killed) return;
        gsap.registerPlugin(ScrollTrigger);
        const st = ScrollTrigger.create({
          trigger: wrap,
          // span the whole page: line head descends from top to bottom as
          // you scroll the entire home route
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            path.style.strokeDashoffset = `${len * (1 - p)}`;
            if (tip) {
              const pt = path.getPointAtLength(len * p);
              const rect = wrap.getBoundingClientRect();
              // viewBox → px (linear because preserveAspectRatio="none")
              const x = (pt.x / 100) * rect.width;
              const y = (pt.y / 1000) * rect.height;
              tip.style.transform = `translate(${x}px, ${y}px)`;
              tip.style.opacity = p > 0.01 && p < 0.99 ? "1" : "0";
            }
          },
        });
        cleanup = () => st.kill();
      },
    );

    return () => {
      killed = true;
      cleanup();
    };
  }, [reducedMotion]);

  // Server + reduced-motion: render nothing (the separators carry structure)
  if (reducedMotion) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      data-testid="story-line"
      className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          ref={pathRef}
          d={PATH}
          stroke="var(--accent)"
          strokeOpacity={0.4}
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        ref={tipRef}
        className="absolute left-0 top-0 -ml-[5px] -mt-[5px] size-2.5 rounded-full bg-link opacity-0"
        style={{ boxShadow: "0 0 18px 2px var(--accent)" }}
      />
    </div>
  );
}
