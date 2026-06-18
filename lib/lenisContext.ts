"use client";

import { createContext, useContext, type RefObject } from "react";
import type Lenis from "lenis";

/**
 * Shares the single global Lenis instance (created by <SmoothScroll>) with any
 * component that needs to drive programmatic scrolling — e.g. the Work index
 * scroll-spy. Null when there's no provider or motion is reduced.
 */
export const LenisContext = createContext<RefObject<Lenis | null> | null>(null);

export function useLenisInstance(): RefObject<Lenis | null> | null {
  return useContext(LenisContext);
}
