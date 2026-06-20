"use client";

import { setTheme, useThemeOverride } from "@/lib/theme";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Light/dark toggle (PRD §6). The site follows the system preference by
 * default; this lets the user override it. The choice is persisted and
 * re-applied before paint by the init script in layout.tsx (no FOUC).
 *
 * Accessible: a real <button> whose accessible name states the action
 * ("Switch to light/dark theme"); the state is conveyed by icon + label,
 * never by colour alone.
 */
export function ThemeToggle() {
  const override = useThemeOverride();
  const systemLight = useMediaQuery("(prefers-color-scheme: light)");
  const effective = override ?? (systemLight ? "light" : "dark");
  const target = effective === "dark" ? "light" : "dark";
  const label = `Switch to ${target} theme`;

  return (
    <button
      type="button"
      onClick={() => setTheme(target)}
      aria-label={label}
      title={label}
      className="nav-toggle"
    >
      {/* compact icon on small screens, label on large */}
      <span aria-hidden="true" className="lg:hidden">
        {target === "light" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        )}
      </span>
      <span className="hidden lg:inline">
        {target === "light" ? "Light mode" : "Dark mode"}
      </span>
    </button>
  );
}
