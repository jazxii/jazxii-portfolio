"use client";

import { useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useInViewAutoplay } from "@/lib/useInViewAutoplay";
import { asset } from "@/lib/asset";
import type { MediaItem as Media } from "@/content/projects";

// Treat these media extensions as video; everything else renders as an image.
// (Same convention as PlaygroundCard, so authors put the clip straight in `src`.)
const VIDEO_RE = /\.(mp4|webm|mov)(\?.*)?$/i;

/**
 * Project/playground media. Images get real alt text; a video `src`
 * (`.mp4`/`.webm`/`.mov`, detected by extension) renders muted/looping and
 * decorative (`aria-hidden`), with the description provided as adjacent
 * screen-reader text. The clip plays only while in view AND when the user
 * allows motion (PRD §5.2, §9); under reduced motion it holds the poster /
 * first frame. `preload="metadata"` + an optional `poster` keep it off the
 * critical path.
 */
export function MediaFigure({ media, className = "" }: { media: Media; className?: string }) {
  const isVideo = VIDEO_RE.test(media.src);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  // Gate playback to visibility (and motion-allowed): a card may sit far down
  // the page, and decoding off-screen clips competes with the scroll loop.
  useInViewAutoplay(videoRef, isVideo && !reducedMotion);

  const frame = `overflow-hidden rounded-card border border-border-soft bg-surface ${className}`;

  if (isVideo) {
    return (
      <figure className={frame}>
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          loop
          playsInline
          preload="metadata"
          poster={media.poster ? asset(media.poster) : undefined}
          width={media.width}
          height={media.height}
          className="block h-auto w-full"
        >
          <source src={asset(media.src)} />
        </video>
        <p className="sr-only">{media.videoDescription ?? media.alt}</p>
      </figure>
    );
  }

  return (
    <figure className={frame}>
      {/* Placeholder SVGs: plain img keeps them out of the optimizer; swap to next/image with real photos/AVIF. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(media.src)}
        alt={media.alt}
        width={media.width}
        height={media.height}
        loading="lazy"
        className="block h-auto w-full"
      />
    </figure>
  );
}
