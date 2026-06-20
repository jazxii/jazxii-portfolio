"use client";

import { useEffect, type RefObject } from "react";

/**
 * "dark"  = dark content sits under the header → nav shows LIGHT contents.
 * "light" = light content sits under the header → nav shows DARK contents.
 *
 * The nav's default (no override) already follows the page theme via CSS
 * tokens; sections whose tone DIFFERS from the page base (e.g. the always-dark
 * footer banner, which is dark even in light mode) register an override here so
 * the glass pills flip to stay legible and contextual while they pass beneath
 * the sticky header. See <Nav> + the `header[data-tone]` rules in globals.css.
 */
export type NavTone = "light" | "dark";

// Active overrides, innermost-last. A small LIFO stack so nested/adjacent toned
// regions resolve predictably (the last one to enter the header band wins).
const stack: { id: number; tone: NavTone }[] = [];
let nextId = 1;
const listeners = new Set<(tone: NavTone | null) => void>();

const current = (): NavTone | null =>
  stack.length ? stack[stack.length - 1].tone : null;
const emit = () => listeners.forEach((listener) => listener(current()));

/** Subscribe to the resolved override tone (null = use the theme default). */
export function subscribeNavTone(cb: (tone: NavTone | null) => void) {
  listeners.add(cb);
  cb(current());
  return () => {
    listeners.delete(cb);
  };
}

/**
 * Register `ref`'s section so the nav adopts `tone` while that section sits under
 * the sticky header. Uses an IntersectionObserver whose root is collapsed (via a
 * negative bottom rootMargin) to a thin band at the very top of the viewport —
 * roughly the header's height — so the section counts as "active" exactly while
 * it passes beneath the header. IntersectionObserver reflects the live layout, so
 * unlike a ScrollTrigger it needs no refresh after late media/font reflows and
 * never drifts to a stale scroll position. It's also independent of Lenis, so it
 * works the same under reduced motion; a tone change is colour-only (no motion).
 */
export function useNavTone(ref: RefObject<HTMLElement | null>, tone: NavTone) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const id = nextId++;
    const remove = () => {
      const i = stack.findIndex((entry) => entry.id === id);
      if (i !== -1) {
        stack.splice(i, 1);
        emit();
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!stack.some((e) => e.id === id)) {
            stack.push({ id, tone });
            emit();
          }
        } else {
          remove();
        }
      },
      // Detection band = top ~6% of the viewport (≈ the header strip).
      { rootMargin: "0px 0px -94% 0px", threshold: 0 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      remove();
    };
  }, [ref, tone]);
}
