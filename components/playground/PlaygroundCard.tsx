import type { PlaygroundItem } from "@/content/playground";

// "JUN 25’" — William Le-style date tag
const formatDate = (iso: string) => {
  const d = new Date(`${iso}-01T00:00:00`);
  const month = new Intl.DateTimeFormat("en", { month: "short" })
    .format(d)
    .toUpperCase();
  return `${month} ${String(d.getFullYear()).slice(2)}’`;
};

/**
 * One masonry card = one focusable link (PRD §5.3). Full-bleed media
 * with the title + date overlaid at the bottom; a dark gradient scrim
 * keeps the white caption text at AA contrast over any artwork, in
 * both color modes.
 */
export function PlaygroundCard({ item }: { item: PlaygroundItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-card bg-surface no-underline"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.media.src}
        alt={item.media.alt}
        width={item.media.width}
        height={item.media.height}
        loading="lazy"
        className="block h-auto w-full transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
      />
      <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-3 p-5">
        <span className="font-medium text-white">
          {item.title}
          <span className="sr-only">
            {" "}
            — {item.medium} (opens in new tab)
          </span>
        </span>
        <span className="shrink-0 font-mono text-xs text-white/90">
          {formatDate(item.date)}
        </span>
      </span>
    </a>
  );
}
