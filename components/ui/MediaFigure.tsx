"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { asset } from "@/lib/asset";

type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
  videoSrc?: string;
  videoDescription?: string;
};

/**
 * Project/playground media. Images get real alt text; optional video is
 * muted/looping/decorative (aria-hidden) with the description provided as
 * adjacent screen-reader text. Video only plays while in view AND when
 * the user allows motion (PRD §5.2, §9). preload="none" + poster keeps
 * it out of the critical path.
 */
export function MediaFigure({ media, className = "" }: { media: Media; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (reducedMotion) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const frame = `overflow-hidden rounded-card border border-border-soft bg-surface ${className}`;

  if (media.videoSrc && !reducedMotion) {
    return (
      <figure className={frame}>
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          loop
          playsInline
          preload="none"
          poster={asset(media.src)}
          width={media.width}
          height={media.height}
          className="block h-auto w-full"
        >
          <source src={asset(media.videoSrc)} />
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
