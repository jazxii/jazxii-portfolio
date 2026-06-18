import type { MediaItem } from "@/content/projects";
import { MediaFigure } from "./MediaFigure";

/**
 * Renders one or more project media items (images and/or muted-looping videos).
 *
 * Layout, by count:
 *  - 1 item  → a single full-width figure (unchanged from before).
 *  - 2+ items → the first item stays full-width as the "cover", and the rest
 *    flow in a responsive 2-column grid below it.
 *
 * Deliberately NOT a carousel: a static featured-plus-grid keeps every shot
 * reachable without keyboard traps, hidden slides, or live-region juggling, and
 * each item keeps its own real alt text / video description. The list is a real
 * <ul> with role="list" so VoiceOver still announces it as a list after the
 * Tailwind list reset.
 */
export function MediaGallery({
  items,
  className = "",
}: {
  items: MediaItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  const [cover, ...rest] = items;

  if (rest.length === 0) {
    return <MediaFigure media={cover} className={className} />;
  }

  return (
    <div className={className}>
      <MediaFigure media={cover} />
      <ul role="list" className="mt-4 grid list-none gap-4 p-0 sm:grid-cols-2">
        {rest.map((item, index) => (
          <li key={`${item.src}-${index}`}>
            <MediaFigure media={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
