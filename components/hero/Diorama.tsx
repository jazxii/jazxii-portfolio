"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The "creative technologist's desk" diorama (PRD §5.1): a tilted plane of
 * floating panels — a neo4j WCAG knowledge graph, a Figma ADA-review frame,
 * an auditor terminal, and a contrast chip. Pure CSS 3D transforms, no canvas.
 *
 * Decorative: aria-hidden. Pointer parallax sets the plane's tilt from the
 * mouse position anywhere on the page (rAF-throttled, pointer:fine only);
 * under reduced motion it rests at the base tilt. The depth of each layer
 * lives in its `--z` (translateZ) in globals.css.
 */

const BASE_X = 12; // resting rotateX
const BASE_Y = -11; // resting rotateY

export function Diorama() {
  const reducedMotion = useReducedMotion();
  const planeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane || reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let rx = BASE_X;
    let ry = BASE_Y;

    // tilt follows the mouse across the whole viewport
    const onMove = (event: PointerEvent) => {
      const px = event.clientX / window.innerWidth - 0.5;
      const py = event.clientY / window.innerHeight - 0.5;
      rx = BASE_X - py * 12;
      ry = BASE_Y + px * 16;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const apply = () => {
      raf = 0;
      plane.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [reducedMotion]);

  return (
    <div className="scene" aria-hidden="true">
      <div
        ref={planeRef}
        className="diorama"
        style={{ transform: `rotateX(${BASE_X}deg) rotateY(${BASE_Y}deg)` }}
      >
        {/* knowledge graph */}
        <div className="d-layer d-graph">
          <div className="bar">
            <span>wcag-graph · neo4j</span>
            <span className="live">● live</span>
          </div>
          <svg viewBox="0 0 330 290" width="330" height="290">
            <g stroke="currentColor" opacity="0.3" fill="none">
              <path d="M165 130 L75 60" />
              <path d="M165 130 L255 58" />
              <path d="M165 130 L62 200" />
              <path d="M165 130 L262 196" />
              <path d="M165 130 L165 248" />
              <path d="M75 60 L255 58" />
              <path d="M262 196 L165 248" />
            </g>
            <g
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              textAnchor="middle"
            >
              <circle cx="165" cy="130" r="34" fill="#F5A97E" />
              <text x="165" y="127" fill="#0E0E0E" fontWeight="600">
                WCAG
              </text>
              <text x="165" y="140" fill="#0E0E0E" fontWeight="600">
                2.2
              </text>
              <circle cx="75" cy="60" r="24" fill="#2D6BFF" />
              <text x="75" y="64" fill="#fff">
                1.4.3
              </text>
              <circle cx="255" cy="58" r="24" fill="#2D6BFF" />
              <text x="255" y="62" fill="#fff">
                2.5.8
              </text>
              <circle cx="62" cy="200" r="24" fill="#2D6BFF" />
              <text x="62" y="204" fill="#fff">
                4.1.2
              </text>
              <circle
                cx="262"
                cy="196"
                r="22"
                fill="none"
                stroke="#2D6BFF"
                strokeWidth="1.5"
              />
              <text x="262" y="200" fill="currentColor">
                C42
              </text>
              <circle
                cx="165"
                cy="248"
                r="22"
                fill="none"
                stroke="#F5A97E"
                strokeWidth="1.5"
              />
              <text x="165" y="252" fill="currentColor">
                defects
              </text>
            </g>
          </svg>
        </div>

        {/* Figma ADA-review frame */}
        <div className="d-layer d-fig">
          <span className="tag">UX ADA review</span>
          <span className="hndl h1x" />
          <span className="hndl h2x" />
          <span className="hndl h3x" />
          <span className="hndl h4x" />
          <span className="fbtn">Add to cart</span>
          <p className="spec">
            target 44px ✓
            <br />
            focus order ✓
          </p>
        </div>

        {/* auditor terminal */}
        <div className="d-layer d-term">
          <span className="p1">$ auditor run --pods 5</span>
          <br />
          DOM + screenshot eval <span className="p2">· LLM</span>
          <br />
          graph-rag cite <span className="p2">→ SC 2.5.8</span>
          <br />
          <span className="ok">✓ 22 patches drafted</span>
        </div>

        {/* contrast chip */}
        <div className="d-layer d-chip">
          <strong>Aa</strong> 17.2 : 1 ✓
        </div>
      </div>
    </div>
  );
}
