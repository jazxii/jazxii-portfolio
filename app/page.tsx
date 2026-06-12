import { Hero3D } from "@/components/hero/Hero3D";
import { HomeIntro } from "@/components/hero/HomeIntro";
import { WorkTeaser } from "@/components/hero/WorkTeaser";

export default function HomePage() {
  return (
    <>
      {/* Real text first in the DOM: the h1 is the LCP element, not the scene (PRD §9) */}
      <section className="mx-auto max-w-6xl px-4 pt-16 text-center sm:px-6 sm:pt-20">
        <p className="font-mono text-sm text-text-muted">
          Jassim M. Shamim — Digital Accessibility Engineer &amp; Creative
          Technologist
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-display font-semibold">
          Building a digital world that’s beautiful{" "}
          <span className="text-link">and built for everyone.</span>
        </h1>
      </section>

      {/* Decorative CSS-3D diorama (aria-hidden + inert inside) */}
      <Hero3D />

      {/* Scroll-driven intro flow (Juan Mora-style), reduced-motion safe */}
      <HomeIntro />

      <WorkTeaser />
    </>
  );
}
