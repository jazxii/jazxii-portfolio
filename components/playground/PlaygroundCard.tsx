"use client";

import { useEffect, useRef } from "react";
import type { PlaygroundItem } from "@/content/playground";
import { asset } from "@/lib/asset";
import { useReducedMotion } from "@/lib/useReducedMotion";

// Treat these media extensions as video; everything else renders as an image.
const VIDEO_RE = /\.(mp4|webm|mov)(\?.*)?$/i;

// "JUN 25’" — William Le-style date tag
const formatDate = (iso: string) => {
  const d = new Date(`${iso}-01T00:00:00`);
  const month = new Intl.DateTimeFormat("en", { month: "short" })
    .format(d)
    .toUpperCase();
  return `${month} ${String(d.getFullYear()).slice(2)}’`;
};

/**
 * One masonry card = one focusable link (PRD §5.3). Full-bleed media
 * with the title + date overlaid at the bottom; a dark gradient scrim
 * keeps the white caption text at AA contrast over any artwork, in
 * both color modes.
 *
 * Media can be an image OR a video (detected by extension). Video is
 * muted/looping and decorative (aria-hidden) — the link's title + medium
 * already name the card. It plays automatically while in view and motion
 * is allowed, and stays paused under prefers-reduced-motion (same policy
 * as the work MediaFigure, PRD §5.2/§9).
 */
export function PlaygroundCard({ item }: { item: PlaygroundItem }) {
  const isVideo = VIDEO_RE.test(item.media.src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  // The video carries `autoPlay muted` so it starts on its own as the card
  // loads. This effect only enforces the accessibility policy: under
  // prefers-reduced-motion we hold it on its first frame instead of playing.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  }, [reducedMotion]);

  const mediaClass =
    "block h-auto w-full transition-transform duration-500 ease-out-expo motion-safe:group-hover:scale-[1.03]";

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      className="group relative block overflow-hidden rounded-card bg-surface no-underline"
    >
      {isVideo ? (
        <video
          ref={videoRef}
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.media.poster ? asset(item.media.poster) : undefined}
          width={item.media.width}
          height={item.media.height}
          className={mediaClass}
        >
          <source src={asset(item.media.src)} />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={asset(item.media.src)}
          alt={item.media.alt}
          width={item.media.width}
          height={item.media.height}
          loading="lazy"
          className={mediaClass}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 p-5">
        <span className="font-medium text-white">
          {item.title}
          <span className="sr-only">
            {" "}
            — {item.medium} (opens in new tab)
          </span>
        </span>
        <span className="shrink-0 font-mono text-xs text-white/90">
          {formatDate(item.date)}
        </span>
      </span>
    </a>
  );
}
