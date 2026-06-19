"use client";

import { useEffect, type RefObject } from "react";

/**
 * Play a muted, looping, decorative `<video>` only while it's near the viewport,
 * and pause it once it scrolls away.
 *
 * A looping video that autoplays even while off-screen keeps decoding and
 * compositing every frame, which competes with the Lenis + GSAP scroll loop and
 * makes smooth scrolling stutter ("stick"). Gating playback to visibility keeps
 * that cost off the main thread during the bulk of a scroll. Reduced motion is
 * respected by the caller (it renders a static poster, so `ref` is null here).
 *
 * `rootMargin` starts playback slightly before the element enters so it's
 * already running by the time it's seen.
 */
export function useInViewAutoplay(
  ref: RefObject<HTMLVideoElement | null>,
  enabled: boolean,
  rootMargin = "200px",
) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!enabled) {
      video.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ref, enabled, rootMargin]);
}
