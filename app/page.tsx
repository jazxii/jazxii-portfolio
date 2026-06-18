import Link from "next/link";
import { Diorama } from "@/components/hero/Diorama";
import { HomeIntro } from "@/components/hero/HomeIntro";
import { WorkTeaser } from "@/components/hero/WorkTeaser";
import { StoryLine } from "@/components/hero/StoryLine";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Storytelling thread that draws down the whole page as you scroll */}
      <StoryLine />

      {/* ---- First screen ---- */}
      <section className="mx-auto grid min-h-[calc(100svh-5.5rem)] max-w-7xl grid-cols-1 items-center gap-10 px-4 pt-6 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:pt-0">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted sm:text-sm">
            Jassim M. Shamim — Digital Accessibility Engineer @ Cognizant ·
            Ex-ISRO
          </p>

          {/* Giant brand wordmark — decorative (the name is in the nav + eyebrow) */}
          <p
            aria-hidden="true"
            className="mt-7 font-display text-[clamp(4rem,11vw,9rem)] font-semibold leading-[0.85] tracking-tight text-peach"
          >
            jazxii
          </p>

          <div className="mt-7 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border-soft pt-4">
            <span className="font-semibold">Agentic AI × Inclusive Design</span>
            <span className="text-text">
              Chennai, India <span className="text-text-muted">2026</span>
            </span>
          </div>

          <h1 className="mt-9 max-w-xl font-display text-[clamp(2rem,2.8vw,3.4rem)] font-semibold leading-[1.07]">
            Building a digital world that’s beautiful — <br></br> and built for everyone.
          </h1>

          <p className="mt-7 font-mono text-xs text-text-muted">
            WCAG 2.2 AA · keyboard-first · reduced-motion safe —{" "}
            <Link
              href="/accessibility"
              className="text-link underline underline-offset-4"
            >
              this site is the proof
            </Link>
            .
          </p>
        </div>

        {/* Decorative CSS-3D diorama (desktop only; aria-hidden inside) */}
        <div className="hidden lg:flex lg:justify-center">
          <div className="scale-[0.82] xl:scale-100">
            <Diorama />
          </div>
        </div>
      </section>

      {/* Scroll-driven intro flow (Juan Mora-style), reduced-motion safe */}
      <HomeIntro />

      <WorkTeaser />
    </div>
  );
}
