/**
 * Juan-Mora-style project CTA: a "See it live" pill paired with a circular
 * peach arrow button — but it's ONE link (one focusable control, one accessible
 * name), opening in a new tab.
 *
 * The arrow is an inline SVG (a stroked path), not a "↗" text glyph, on purpose:
 * the peach circle flips light/dark per theme, and a text glyph there would trip
 * axe color-contrast in one theme. An SVG icon is a non-text graphic, so it
 * sidesteps that while staying ≥3:1 in both themes.
 */
export function LiveCta({
  href,
  label,
  project,
}: {
  href: string;
  label: string;
  project: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="view"
      className="group inline-flex items-center gap-2 no-underline"
    >
      <span className="inline-flex items-center rounded-pill bg-surface-2 px-5 py-2.5 text-sm font-semibold text-text transition-colors group-hover:bg-text group-hover:text-bg">
        {label}
        <span className="sr-only">: {project} (opens in new tab)</span>
      </span>
      <span
        aria-hidden="true"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-peach text-bg transition-transform duration-300 ease-out-expo group-hover:rotate-45"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 12 L12 4" />
          <path d="M5.5 4 H12 V10.5" />
        </svg>
      </span>
    </a>
  );
}
