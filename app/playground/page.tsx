import type { Metadata } from "next";
import { playgroundItems } from "@/content/playground";
import { PlaygroundCard } from "@/components/playground/PlaygroundCard";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Experiments, design curation, and side projects by Jassim M. Shamim.",
};

export default function PlaygroundPage() {
  return (
    <div className="px-3 pt-16 sm:px-4">
      <header className="mx-auto max-w-3xl pb-14 text-center">
        <RevealText
          as="h1"
          className="font-display text-display font-semibold text-text-muted"
        >
          Playground
        </RevealText>
        <Reveal as="p" className="mt-2 text-xl text-text-muted">
          Crafting accessible experiences
        </Reveal>
      </header>

      {/* CSS-columns masonry: zero JS, 3 → 2 → 1 (PRD §5.3).
          RevealStagger batch-reveals the cards as they scroll in — fade + rise,
          a touch slower, so the media-led cards ease in instead of snapping. */}
      <RevealStagger
        as="ul"
        selector=":scope > li"
        className="masonry list-none p-0"
        fade
        y={36}
        duration={0.9}
      >
        {playgroundItems.map((item, index) => (
          <li key={`${item.slug}-${index}`}>
            <PlaygroundCard item={item} />
          </li>
        ))}
      </RevealStagger>
    </div>
  );
}
