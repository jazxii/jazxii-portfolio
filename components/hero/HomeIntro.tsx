"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useLenis } from "@/lib/scroll";

/**
 * Juan Mora-style scroll-driven intro (his home flow: big statement →
 * services → folder "Work" CTA → stepped headline → benefit lines),
 * rebuilt accessibly:
 * - SSR/no-JS/reduced-motion state is fully visible and static; GSAP
 *   only dims/offsets things when the user allows motion.
 * - The word-split statement is aria-hidden with an sr-only sentence,
 *   so screen readers hear one clean line, not 13 fragments.
 * - Dimmed words never drop below 50% opacity (≥3:1 for display-size
 *   text in both modes); entrance reveals use opacity 0 + transform.
 * - The folder CTA is one link that opens on hover AND focus; the
 *   giant background word is decorative SVG (aria-hidden).
 */

const STATEMENT =
  "Making ambitious interfaces work for every hand, eye, and ear.";

const SERVICES = [
  {
    title: "Accessible design systems",
    copy: "Component libraries where the accessible path is the only path — tokens, focus management, and ARIA baked into the API.",
  },
  {
    title: "WCAG audits & remediation",
    copy: "Deep audits that turn compliance debt into clear, prioritised engineering work your team can actually ship.",
  },
  {
    title: "Creative web experiences",
    copy: "Scroll stories, 3D moments, and motion design that keep every bit of their polish under reduced motion.",
  },
  {
    title: "AI-powered a11y tooling",
    copy: "Human-in-the-loop pipelines that scale alt text, captions, and accessibility checks without losing editorial quality.",
  },
] as const;

const STEPS = ["Good design", "includes everyone —", "and working with me proves it."];

const BENEFITS = [
  "I treat WCAG 2.2 AA as a starting point, not a ceiling.",
  "I keep the craft — motion, 3D, typography — while making it inclusive.",
  "I build design systems that make accessibility the default.",
  "I back every decision with screen reader, keyboard, and user evidence.",
];

export function HomeIntro() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useLenis();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return;

    let killed = false;
    let cleanup = () => {};

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (killed) return;
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          // 1 — statement: word-by-word brightness reveal, scrubbed
          gsap.fromTo(
            ".intro-word",
            { opacity: 0.5 },
            {
              opacity: 1,
              stagger: 0.15,
              ease: "none",
              scrollTrigger: {
                trigger: ".intro-statement",
                start: "top 75%",
                end: "center 45%",
                scrub: 0.4,
              },
            },
          );

          // 2 — service blocks: masked line-slide titles + copy fade
          gsap.utils.toArray<HTMLElement>(".intro-service").forEach((el) => {
            gsap
              .timeline({
                scrollTrigger: { trigger: el, start: "top 85%", once: true },
              })
              .from(el.querySelectorAll(".line-inner"), {
                yPercent: 110,
                duration: 0.8,
                ease: "power3.out",
              })
              .from(
                el.querySelector("p"),
                { opacity: 0, y: 18, duration: 0.5, ease: "power2.out" },
                "-=0.35",
              );
          });

          // 3 — folder CTA: big "W … ork" letters rise, folder pops in
          gsap.from(".work-letter", {
            opacity: 0,
            y: 50,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".intro-folder-cta",
              start: "top 70%",
              once: true,
            },
          });
          gsap.from(".folder-stage", {
            scale: 0.7,
            y: 60,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: ".intro-folder-cta",
              start: "top 65%",
              once: true,
            },
          });

          // 4 — stepped headline: pinned while three lines build up
          gsap
            .timeline({
              scrollTrigger: {
                trigger: ".intro-steps",
                start: "top top",
                end: "+=120%",
                pin: true,
                scrub: 0.5,
              },
            })
            .from(".intro-step", {
              opacity: 0,
              y: 48,
              stagger: 0.5,
              ease: "power2.out",
            });

          // 5 — benefits: heading line-slide, separators draw, rows slide
          gsap.from(".intro-benefits .line-inner", {
            yPercent: 110,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".intro-benefits",
              start: "top 80%",
              once: true,
            },
          });
          gsap.utils.toArray<HTMLElement>(".intro-benefit").forEach((el, i) => {
            gsap
              .timeline({
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
                delay: i * 0.05,
              })
              .from(el.querySelector(".benefit-line"), {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 0.7,
                ease: "power2.out",
              })
              .from(
                el.querySelector(".benefit-row"),
                { opacity: 0, x: -28, duration: 0.6, ease: "power3.out" },
                "-=0.4",
              );
          });
        }, root);

        cleanup = () => ctx.revert();
      },
    );

    return () => {
      killed = true;
      cleanup();
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef}>
      {/* ---- Big scroll-reveal statement (Juan's "16 years…" beat) ---- */}
      <section
        aria-label="Introduction"
        className="intro-statement mx-auto flex min-h-[70vh] max-w-5xl items-center px-4 py-24 sm:px-6"
      >
        <h2 className="font-display text-h1 font-semibold leading-tight">
          <span className="sr-only">{STATEMENT}</span>
          <span aria-hidden="true">
            {STATEMENT.split(" ").map((word, i) => (
              <span key={i} className="intro-word inline-block">
                {word}
                {i < STATEMENT.split(" ").length - 1 ? " " : ""}
              </span>
            ))}
          </span>
        </h2>
      </section>

      {/* ---- Services (Juan's "I help companies to succeed…") ---- */}
      <section
        aria-labelledby="intro-services-heading"
        className="mx-auto max-w-5xl px-4 py-16 sm:px-6"
      >
        <h2
          id="intro-services-heading"
          className="font-mono text-sm uppercase tracking-widest text-text-muted"
        >
          I help teams ship work like:
        </h2>
        <ul className="mt-12 grid list-none gap-x-10 gap-y-14 p-0 sm:grid-cols-2">
          {SERVICES.map((service) => (
            <li key={service.title} className="intro-service">
              <h3 className="font-display text-h2 font-semibold">
                <span className="line-mask">
                  <span className="line-inner">{service.title}</span>
                </span>
              </h3>
              <p className="mt-3 max-w-prose text-text-muted">{service.copy}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Folder CTA (Juan's "Work" word with the folder between letters) ---- */}
      <section
        aria-label="See my work"
        className="intro-folder-cta relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24"
      >
        {/* Giant faded "W … ork" spanning the full width, folder in the gap */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-between px-[1vw]"
        >
          <span className="work-letter">W</span>
          <span className="work-letter">ork</span>
        </div>

        {/* centre column: Curious? / folder / keep scrolling (on top) */}
        <div className="relative flex flex-col items-center gap-8 text-center">
          <p className="text-lg font-medium">Curious?… Check out my</p>

          <Link href="/work" className="folder-link rounded-card no-underline">
            <span className="sr-only">work — view all projects</span>
            <span aria-hidden="true" className="folder-stage block">
              <span className="folder block">
                <span className="folder-back block" />
                <span className="folder-papers block" />
                <span className="folder-front flex items-start justify-between p-4">
                  <span className="rounded-pill border border-white/40 px-3 py-1 font-mono text-xs font-semibold text-white">
                    Portfolio
                  </span>
                  <span className="font-display text-2xl font-semibold text-white/35">
                    jz
                  </span>
                </span>
              </span>
            </span>
          </Link>

          <p aria-hidden="true" className="text-lg font-medium text-text-muted">
            Or keep scrolling
          </p>
        </div>
      </section>

      {/* ---- Pinned stepped headline (Juan's "Good design takes time…") ---- */}
      <section
        aria-labelledby="intro-steps-heading"
        className="intro-steps flex min-h-screen items-center"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 id="intro-steps-heading" className="font-display text-display font-semibold leading-tight">
            {STEPS.map((line) => (
              <span key={line} className="intro-step block">
                {line}
              </span>
            ))}
          </h2>
        </div>
      </section>

      {/* ---- Benefits checklist ---- */}
      <section
        aria-labelledby="intro-benefits-heading"
        className="intro-benefits mx-auto max-w-5xl px-4 py-24 sm:px-6"
      >
        <h2 id="intro-benefits-heading" className="font-display text-h2 font-semibold">
          <span className="line-mask">
            <span className="line-inner">
              Teams partner with me for{" "}
              <span className="text-link">perspective + deep craft</span>
            </span>
          </span>
        </h2>
        <ul className="mt-10 list-none space-y-6 p-0">
          {BENEFITS.map((benefit) => (
            <li key={benefit} className="intro-benefit">
              <span className="benefit-line block h-px w-full bg-border-soft" />
              <span className="benefit-row mt-6 flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-on-accent"
                >
                  ✓
                </span>
                <p className="text-lg">{benefit}</p>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
