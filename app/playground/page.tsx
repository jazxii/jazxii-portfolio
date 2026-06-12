import type { Metadata } from "next";
import { playgroundItems } from "@/content/playground";
import { PlaygroundCard } from "@/components/playground/PlaygroundCard";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Experiments, design curation, and side projects by Jassim M. Shamim.",
};

export default function PlaygroundPage() {
  return (
    <div className="px-3 pt-16 sm:px-4">
      <header className="mx-auto max-w-3xl pb-14 text-center">
        <h1 className="font-display text-display font-semibold text-text-muted">
          Playground
        </h1>
        <p className="mt-2 text-xl text-text-muted">
          Crafting accessible experiences
        </p>
      </header>

      {/* CSS-columns masonry: zero JS, 3 → 2 → 1 (PRD §5.3) */}
      <ul className="masonry list-none p-0">
        {playgroundItems.map((item) => (
          <li key={item.slug}>
            <PlaygroundCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
