"use client";

import { useEffect, useState } from "react";

/**
 * Decorative live clock (William Le detail). Hidden from assistive
 * tech: a ticking clock is noise in a screen reader, and the time
 * conveys no site information.
 */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <span aria-hidden="true" className="font-mono text-sm text-text-muted tabular-nums">
      {time}
    </span>
  );
}
