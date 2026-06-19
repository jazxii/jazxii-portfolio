"use client";

import { useRef } from "react";
import Link from "next/link";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useInViewAutoplay } from "@/lib/useInViewAutoplay";

const EMAIL = "jassimmohammed2910@gmail.com";
const BUILT_WITH = ["Next.js", "GSAP", "Lenis", "Tailwind", "axe-core"];
const LINKS = [
  { href: "/design-system", label: "Design system", internal: true },
  { href: "/about", label: "About", internal: true },
  { href: `mailto:${EMAIL}`, label: "Email", internal: false },
] as const;

function FooterLink({
  href,
  label,
  internal,
}: {
  href: string;
  label: string;
  internal: boolean;
}) {
  const cls = "text-white/90 underline underline-offset-4 hover:text-white";
  return internal ? (
    <Link href={href} className={cls}>
      {label}
    </Link>
  ) : (
    <a href={href} className={cls}>
      {label}
    </a>
  );
}

/**
 * Cinematic closing banner (Juan Mora-style): a full-bleed desk scene with the
 * name split giant across the bottom, the character framed between the words.
 *
 * This is a deliberately *fixed-dark* island regardless of theme, so the warm
 * scene reads the same in light and dark mode. Because the canvas is always
 * near-black we use the fixed light-peach primitive (`--color-peach-raw`) and
 * fixed light text rather than the theme-swapping semantic tokens — the burnt
 * `--peach` of light mode would fail contrast on this dark backdrop. The giant
 * name is decorative (aria-hidden); the real name lives in the copyright line.
 *
 * Layout follows the reference responsively: from `lg` up the name splits giant
 * left/right with the links along the top; below `lg` the giant split reads as
 * disconnected, so it collapses to a compact centred wordmark up top with two
 * tidy link columns at the foot (the reference's mobile treatment).
 *
 * Motion policy: autoplay-loop the scene when motion is allowed; hold the
 * static poster frame under prefers-reduced-motion.
 */
export function FooterBanner() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only decode the scene while the footer is near the viewport — it sits at the
  // very bottom of every page, so for most of a scroll it stays paused and off
  // the main thread (keeps smooth scrolling from stuttering).
  useInViewAutoplay(videoRef, !reducedMotion);

  const poster = asset("/media/footer-scene-poster.jpg");
  const giantName =
    "font-display font-semibold leading-[0.82] tracking-tight";
  const giantStyle = {
    color: "var(--color-peach-raw)",
    fontSize: "clamp(2.75rem, 11vw, 8.5rem)",
  } as const;
  const colLabel =
    "font-mono text-xs uppercase tracking-[0.16em] text-white/50";

  return (
    <section
      aria-label="Studio sign-off"
      className="relative isolate mt-16 flex min-h-svh w-full flex-col overflow-hidden px-6 py-9 text-white sm:px-10 sm:py-20"
      style={{ backgroundColor: "#0a0b0d" }}
    >
      {/* Decorative scene — fills the banner behind everything. */}
      {reducedMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="pointer-events-none absolute inset-0 -z-10 size-full object-cover"
        >
          <source src={asset("/media/footer-scene.webm")} type="video/webm" />
          <source src={asset("/media/footer-scene.mp4")} type="video/mp4" />
        </video>
      )}
      {/* Scrim: darkens top + bottom so text stays legible over the warm scene. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,11,13,0.78) 0%, rgba(10,11,13,0.28) 32%, rgba(10,11,13,0.55) 68%, rgba(10,11,13,0.94) 100%)",
        }}
      />

      {/* ---------- Mobile / tablet (< lg): compact wordmark + columns ---------- */}
      <div className="flex flex-1 flex-col lg:hidden">
        <div className="text-center">
          <p
            aria-hidden="true"
            className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            style={{ color: "var(--color-peach-raw)" }}
          >
            Jassim{" "}
            <span style={{ color: "var(--accent)" }} aria-hidden="true">
              •
            </span>{" "}
            Shamim
          </p>
          <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/75 sm:text-xs">
            AI Accessibility Engineer
          </p>
          <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/60 sm:text-xs">
            Chennai, India · 2026
          </p>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-x-6 gap-y-2 pt-14">
          <nav aria-label="Footer">
            <p className={colLabel}>Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-right">
            <p className={colLabel}>Built with</p>
            <ul className="mt-3 space-y-2 text-sm text-white/90">
              {BUILT_WITH.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ---------- Desktop (lg+): top links + giant split name ---------- */}
      <div className="hidden flex-1 flex-col lg:flex">
        <div className="flex items-start justify-between gap-6">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {LINKS.map((l) => (
                <li key={l.label}>
                  <FooterLink {...l} />
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-right">
            <p className={colLabel}>Built with</p>
            <ul className="mt-2 space-y-1 text-sm text-white/90">
              {BUILT_WITH.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Giant split name pinned to the bottom — the scene shows between them. */}
        <div className="mt-auto flex items-end justify-between gap-8 pt-16">
          <div>
            <p aria-hidden="true" className={giantName} style={giantStyle}>
              Jassim
            </p>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-white/70">
              AI Accessibility Engineer{" "}
              <span className="text-white/45">· 2026</span>
            </p>
          </div>

          <div className="text-right">
            <p aria-hidden="true" className={giantName} style={giantStyle}>
              Shamim
            </p>
            <p className="mt-3 font-mono text-sm uppercase tracking-[0.14em] text-white/70">
              Chennai, India
            </p>
          </div>
        </div>
      </div>

      {/* Hairline sign-off. */}
      <p className="mt-10 border-t border-white/15 pt-5 text-xs text-white/55">
        © {new Date().getFullYear()} Jassim M. Shamim · Built to WCAG 2.2 AA
      </p>
    </section>
  );
}
