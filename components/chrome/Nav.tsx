"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "./Wordmark";
import { LiveClock } from "./LiveClock";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/playground", label: "Playground" },
  { href: "/about", label: "About" },
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <Link
        href="/"
        className="rounded-pill border border-border-soft bg-surface/80 px-4 py-1.5 text-lg text-text no-underline shadow-card backdrop-blur-md"
      >
        <Wordmark />
        <span className="sr-only">— home</span>
      </Link>

      <nav aria-label="Main">
        <ul className="flex items-center gap-1 rounded-pill border border-border-soft bg-surface/80 p-1.5 shadow-card backdrop-blur-md">
          {LINKS.map(({ href, label }) => {
            const current = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={current ? "page" : undefined}
                  className={`block rounded-pill px-3 py-1.5 text-sm font-medium no-underline transition-colors sm:px-4 ${
                    current
                      ? "bg-accent text-on-accent"
                      : "text-text hover:bg-surface-2"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="hidden rounded-pill border border-border-soft bg-surface/80 px-4 py-2 shadow-card backdrop-blur-md sm:block">
        <LiveClock />
      </div>
    </header>
  );
}
