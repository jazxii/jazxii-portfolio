"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * The "creative technologist's desk" diorama (PRD §5.1).
 * Pure CSS 3D transforms — no canvas, no WebGL. The entire scene is
 * decorative: aria-hidden + inert; the real h1/tagline live outside it.
 *
 * Motion (mouse parallax, assembly, scroll camera-ease) only runs when
 * the user allows it; under prefers-reduced-motion the same composed
 * scene renders statically (CSS in globals.css handles assembly; this
 * component handles parallax + scroll).
 */
export function Hero3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // Mouse parallax — pointer only, rAF-throttled, additive on top of the
  // base plane transform via CSS vars.
  useEffect(() => {
    const stage = stageRef.current;
    const plane = planeRef.current;
    if (!stage || !plane || reducedMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    const apply = () => {
      rafId = 0;
      plane.style.setProperty("--parallax-x", `${(-targetY * 4).toFixed(2)}deg`);
      plane.style.setProperty("--parallax-y", `${(targetX * 6).toFixed(2)}deg`);
    };

    const onPointerLeave = () => {
      plane.style.setProperty("--parallax-x", "0deg");
      plane.style.setProperty("--parallax-y", "0deg");
    };

    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerleave", onPointerLeave);
    return () => {
      cancelAnimationFrame(rafId);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reducedMotion]);

  // Scroll camera-ease: the plane drifts inward as you scroll toward the
  // work teaser (GSAP ScrollTrigger, scrubbed; loaded only here).
  useEffect(() => {
    const stage = stageRef.current;
    const plane = planeRef.current;
    if (!stage || !plane || reducedMotion) return;

    let killed = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (killed) return;
        gsap.registerPlugin(ScrollTrigger);
        const tween = gsap.fromTo(
          plane,
          { "--camera-z": 0 },
          {
            "--camera-z": 140,
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
        cleanup = () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      },
    );

    return () => {
      killed = true;
      cleanup();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      inert
      className="hero-stage pointer-events-auto mx-auto mt-4 max-w-6xl select-none overflow-hidden px-4 sm:px-6"
    >
      <div
        ref={planeRef}
        className="hero-plane relative mx-auto grid h-105 max-w-4xl grid-cols-2 gap-6 sm:grid-cols-[1.2fr_1fr] sm:gap-8"
        style={
          {
            transform:
              "rotateX(calc(20deg + var(--parallax-x, 0deg))) rotateZ(-4deg) rotateY(var(--parallax-y, 0deg)) scale(0.92) translateZ(calc(var(--camera-z, 0) * 1px))",
          } as React.CSSProperties
        }
      >
        {/* Panel 1 — AI agent terminal */}
        <div
          className="hero-panel rounded-card border border-border-soft bg-surface p-5 font-mono text-xs leading-relaxed"
          style={{ "--panel-z": "70px", "--panel-delay": "0.05s" } as React.CSSProperties}
        >
          <div className="flex gap-1.5 pb-3">
            <span className="size-2.5 rounded-full bg-accent/80" />
            <span className="size-2.5 rounded-full bg-text-muted/50" />
            <span className="size-2.5 rounded-full bg-text-muted/30" />
          </div>
          <p className="text-text-muted">agent@jazxii ~ %</p>
          <p className="text-text">npx axe ./portfolio --tags wcag22aa</p>
          <p className="text-text-muted">Scanning 4 routes…</p>
          <p className="font-semibold text-link">✓ 0 violations found</p>
          <p className="mt-2 text-text-muted">agent@jazxii ~ % ▍</p>
        </div>

        {/* Panel 2 — Figma frame */}
        <div
          className="hero-panel rounded-card border border-border-soft bg-surface-2 p-5"
          style={{ "--panel-z": "120px", "--panel-delay": "0.2s" } as React.CSSProperties}
        >
          <div className="flex items-center justify-between pb-3">
            <span className="font-mono text-xs text-text-muted">hero-v3.fig</span>
            <span className="size-2.5 rounded-full bg-accent" />
          </div>
          <div className="rounded-lg border-2 border-dashed border-link/60 p-4">
            <div className="h-3 w-2/3 rounded-pill bg-text/80" />
            <div className="mt-2 h-2 w-1/2 rounded-pill bg-text-muted/60" />
            <div className="mt-4 inline-block rounded-pill bg-accent px-4 py-1.5 text-xs font-semibold text-on-accent">
              CTA
            </div>
          </div>
        </div>

        {/* Panel 3 — contrast checker */}
        <div
          className="hero-panel rounded-card border border-border-soft bg-surface p-5"
          style={{ "--panel-z": "150px", "--panel-delay": "0.35s" } as React.CSSProperties}
        >
          <p className="pb-3 font-mono text-xs text-text-muted">contrast.audit</p>
          <div className="flex items-center gap-3">
            <span className="size-9 rounded-lg bg-ink ring-1 ring-border-soft" />
            <span className="size-9 rounded-lg bg-beige" />
            <span className="font-mono text-sm font-semibold text-text">17.0 : 1</span>
          </div>
          <p className="mt-3 inline-block rounded-pill bg-accent px-3 py-1 font-mono text-xs font-semibold text-on-accent">
            AA · AAA pass
          </p>
        </div>

        {/* Panel 4 — code editor */}
        <div
          className="hero-panel rounded-card border border-border-soft bg-surface p-5 font-mono text-xs leading-relaxed"
          style={{ "--panel-z": "95px", "--panel-delay": "0.5s" } as React.CSSProperties}
        >
          <p className="pb-2 text-text-muted">Hero.tsx</p>
          <p>
            <span className="text-link">{"<h1"}</span>{" "}
            <span className="text-text-muted">className=</span>
            <span className="text-text">&quot;display&quot;</span>
            <span className="text-link">{">"}</span>
          </p>
          <p className="pl-4 text-text">Built for everyone</p>
          <p>
            <span className="text-link">{"</h1>"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
