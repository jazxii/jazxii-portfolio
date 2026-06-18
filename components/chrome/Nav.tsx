"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LiveClock } from "./LiveClock";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
] as const;

const EMAIL = "jassimmohammed2910@gmail.com";

/**
 * iPhone-style "dynamic island" nav: a centered black pill showing simple
 * album art + a looping animated equaliser while minimised. On hover,
 * keyboard focus, or tap it morphs/expands downward to reveal the navigation
 * links — the album art + EQ are hidden in the expanded view, leaving only
 * the four enlarged nav buttons. Logo (left) and utilities + theme toggle
 * (right) stay in the corners so the theme control is always reachable.
 *
 * A11y: the links live in a real <nav aria-label="Main"> that's always in
 * the DOM and focusable — focusing one triggers :focus-within and expands
 * the island (WCAG 1.4.13: dismissable via Escape, hoverable, persistent).
 * The album art + EQ are decorative (aria-hidden); the trigger <button>
 * carries the accessible name and aria-expanded for touch users.
 *
 * The now-playing music player was archived (see archive/IslandPlayer.tsx);
 * a richer 3D/animated treatment is planned (see ai-sdlc.md roadmap).
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);

  // Touch/tap-open path: dismiss on Escape or outside tap.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      if (
        islandRef.current &&
        !islandRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6">
      {/* Wordmark */}
      <Link
        href="/"
        className="relative z-10 font-display text-lg font-semibold lowercase tracking-tight text-text no-underline"
      >
        jazxii
        <span aria-hidden="true" className="text-peach">
          .
        </span>
        <span className="sr-only"> — home</span>
      </Link>

      {/* Dynamic island — absolutely centred so expanding never shifts layout */}
      <div className="island-wrap">
        <div
          ref={islandRef}
          className="island"
          data-open={open ? "true" : undefined}
        >
          <button
            type="button"
            className="island-trigger"
            aria-expanded={open}
            aria-controls="nav-island-panel"
            aria-label="Open navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="album-art" aria-hidden="true" />
            <span className="eq" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          </button>

          <div id="nav-island-panel" className="island-panel">
            <nav aria-label="Main" className="island-nav">
              <ul>
                {LINKS.map(({ href, label }) => {
                  const current = pathname === href;
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={current ? "page" : undefined}
                        onClick={() => setOpen(false)}
                        className={`island-link ${current ? "is-current" : ""}`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Right utilities — toggle always shown; links/clock on large screens */}
      <div className="relative z-10 flex items-center gap-5">
        <a
          href={`mailto:${EMAIL}`}
          data-cursor="email"
          className="hidden text-sm text-text-muted no-underline transition-colors hover:text-text lg:inline"
        >
          Email
        </a>
        <a
          href="https://www.linkedin.com/in/jassim-m-shamim/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-sm text-text-muted no-underline transition-colors hover:text-text lg:inline"
        >
          in
          <span className="sr-only"> — LinkedIn (opens in new tab)</span>
        </a>
        <a
          href="https://github.com/jazxii"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden text-sm text-text-muted no-underline transition-colors hover:text-text lg:inline"
        >
          gh
          <span className="sr-only"> — GitHub (opens in new tab)</span>
        </a>
        <span className="hidden lg:inline">
          <LiveClock />
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}
