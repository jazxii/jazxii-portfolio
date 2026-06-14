"use client";

import { useSyncExternalStore } from "react";

/**
 * Theme override store. The site follows the system colour scheme by default;
 * an explicit choice (set via the nav toggle) is persisted to localStorage and
 * mirrored onto <html data-theme>. Exposed through useSyncExternalStore so the
 * toggle reads it without setState-in-effect.
 */

export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function getStored(): Theme | null {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function setTheme(next: Theme) {
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage may be unavailable; the data attribute still applies */
  }
  document.documentElement.dataset.theme = next;
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  // cross-tab changes
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

/** The explicit override, or null when following the system preference. */
export function useThemeOverride(): Theme | null {
  return useSyncExternalStore(subscribe, getStored, () => null);
}
