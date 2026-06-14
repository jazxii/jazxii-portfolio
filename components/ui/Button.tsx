import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent hover:bg-accent-strong border border-transparent",
  ghost: "bg-transparent text-text border border-border-soft hover:bg-surface-2",
};

/**
 * Link styled as a button. External links get an explicit
 * "(opens in new tab)" cue for screen readers.
 */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
  className = "",
  cursor,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  /** Optional custom-cursor label hint (e.g. "email", "view"). */
  cursor?: string;
}) {
  const cls = `inline-flex items-center gap-2 rounded-pill px-5 py-2.5 text-sm font-semibold no-underline transition-colors ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        data-cursor={cursor}
      >
        {children}
        <span className="sr-only"> (opens in new tab)</span>
        <span aria-hidden="true">↗</span>
      </a>
    );
  }

  return (
    <Link href={href} className={cls} data-cursor={cursor}>
      {children}
    </Link>
  );
}
