"use client";

import { useRef } from "react";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useInViewAutoplay } from "@/lib/useInViewAutoplay";

/**
 * Looping memoji that rises and waves, beside the giant home wordmark.
 *
 * The source clip has a solid dark backdrop (the character's own hair and
 * shirt are near-black, so it can't be keyed to transparency cleanly), so it
 * lives inside a circular avatar disc — the dark backdrop reads as the disc.
 * A soft peach bloom sits behind the disc (tasteful, not neon) to tie it to the
 * giant peach "jazxii" wordmark beside it. Decorative (aria-hidden): the name is
 * already in the nav + eyebrow.
 *
 * Motion policy (matches PlaygroundCard / MediaFigure): autoplay-loop while in
 * view when motion is allowed, hold the static poster frame under
 * prefers-reduced-motion. The glow is static, so reduced motion is unaffected.
 */
export function WaveAvatar({ className = "" }: { className?: string }) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause the loop once it scrolls out of view (perf parity with the footer).
  useInViewAutoplay(videoRef, !reducedMotion);

  const poster = asset("/media/memoji-wave-poster.png");

  const media = reducedMotion ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={poster}
      alt=""
      width={256}
      height={256}
      decoding="async"
      loading="lazy"
      className="size-full object-cover"
    />
  ) : (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      width={256}
      height={256}
      className="size-full object-cover"
    >
      <source src={asset("/media/memoji-wave.webm")} type="video/webm" />
      <source src={asset("/media/memoji-wave.mp4")} type="video/mp4" />
    </video>
  );

  return (
    <span
      className={`relative inline-flex shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Soft peach bloom behind the disc — large blur, low opacity (not neon). */}
      <span
        className="pointer-events-none absolute -inset-3 rounded-full blur-2xl"
        style={{ background: "var(--color-peach-raw)", opacity: 0.28 }}
      />
      {/* The disc: a faint highlight ring + a peach-tinted soft shadow. */}
      <span className="relative size-full overflow-hidden rounded-full bg-surface-2 ring-1 ring-white/15 shadow-[0_10px_30px_-8px_rgba(245,169,126,0.55)]">
        {media}
      </span>
    </span>
  );
}
