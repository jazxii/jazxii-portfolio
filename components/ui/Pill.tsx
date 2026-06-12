import type { ReactNode } from "react";

export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-pill border border-border-soft bg-surface px-3 py-1 font-mono text-xs text-text ${className}`}
    >
      {children}
    </span>
  );
}
