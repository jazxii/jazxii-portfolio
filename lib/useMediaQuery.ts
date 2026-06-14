"use client";

import { useSyncExternalStore } from "react";

/**
 * Subscribe to a media query without setState-in-effect. Returns false on
 * the server (and the first hydration frame) so SSR is deterministic, then
 * corrects to the real value — same pattern as useReducedMotion.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
