import type { Metadata } from "next";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { StoryBridge } from "@/components/about/StoryBridge";
import { OrchestrationGraph } from "@/components/about/OrchestrationGraph";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Jassim M. Shamim — Digital Accessibility Engineer & Creative Technologist, and this site's accessibility statement.",
};

const PRINCIPLES = [
  {
    t: "Accessibility is the architecture",
    p: "Semantics, keyboard paths, and reduced-motion fallbacks are designed first — not patched in after the visuals.",
  },
  {
    t: "Automate the audit, keep the judgment",
    p: "Agents and LLMs do the heavy lifting at scale; a human eye owns the call on what good actually means.",
  },
  {
    t: "Craft is credibility",
    p: "If the inclusive option also looks the best in the room, the argument for accessibility wins itself.",
  },
] as const;

const TOOLKIT = [
  {
    group: "Accessibility engineering",
    items: ["WCAG 2.2", "ARIA", "axe-core", "Screen reader testing", "A11y audits"],
  },
  {
    group: "AI & automation",
    items: ["Agentic AI frameworks", "LLM orchestration", "RAG pipelines", "Neo4j", "Python"],
  },
  {
    group: "Design",
    items: ["Figma", "Typography", "Layout systems", "Visual curation"],
  },
] as const;

/** Two-column section: a heading rail on the left, content on the right. */
function AboutSection({
  id,
  labelledBy,
  heading,
  children,
}: {
  id?: string;
  labelledBy: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className="border-t border-border-soft py-14 sm:py-16"
    >
      <div className="grid gap-8 md:grid-cols-[260px_1fr] md:gap-12">
        <RevealText
          as="h2"
          id={labelledBy}
          className="font-display text-h2 font-semibold md:text-balance"
        >
          {heading}
        </RevealText>
        <div>{children}</div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ---- Hero ---- */}
      <section
        aria-labelledby="about-h1"
        className="grid items-center gap-10 py-16 sm:py-24 md:grid-cols-[1fr_auto]"
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
            About
          </p>
          <RevealText
            as="h1"
            id="about-h1"
            className="mt-5 max-w-[14ch] font-display text-display font-semibold leading-[1.05]"
          >
            Beautiful and accessible are the same goal.
          </RevealText>
          <Reveal
            as="p"
            className="mt-6 max-w-[44ch] text-lg text-text-muted sm:text-xl"
          >
            I’m Jassim M. Shamim — a Digital Accessibility Engineer and creative
            technologist working at the intersection of deep-tech automation and
            human-centric design.
          </Reveal>
        </div>

        {/* Portrait — Memoji on the decorative gradient circle */}
        <Reveal>
          <div
            className="relative mx-auto grid size-64 place-items-center overflow-hidden rounded-full border border-border-soft bg-surface sm:size-80"
            style={{
              backgroundImage:
                "radial-gradient(120% 120% at 30% 20%, color-mix(in oklab, var(--peach) 38%, transparent), transparent 60%), radial-gradient(120% 120% at 80% 90%, color-mix(in oklab, var(--accent) 32%, transparent), transparent 60%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/memoji-portrait.png"
              alt="Jassim M. Shamim"
              width={256}
              height={256}
              decoding="async"
              className="size-[88%] object-contain"
            />
          </div>
        </Reveal>
      </section>

      {/* ---- The story (bespoke: persona narrative + SDLC⇄STLC bridge + orchestration motif) ---- */}
      <section
        aria-labelledby="story-h"
        className="border-t border-border-soft py-14 sm:py-16"
      >
        <div className="grid gap-8 md:grid-cols-[260px_1fr] md:gap-12">
          <div>
            <RevealText
              as="h2"
              id="story-h"
              className="font-display text-h2 font-semibold md:text-balance"
            >
              The story
            </RevealText>
            <OrchestrationGraph className="mt-6 hidden h-auto w-32 md:block" />
          </div>

          <div className="space-y-8">
            <RevealStagger className="max-w-[62ch] space-y-4 text-lg leading-relaxed">
              <p>
                My work runs on one belief:{" "}
                <strong className="font-semibold text-text">
                  exceptional digital experiences must be fundamentally inclusive
                </strong>{" "}
                — built that way, not retrofitted or “compliant enough.”
              </p>
              <p>
                I work as an{" "}
                <strong className="font-semibold text-text">
                  AI orchestrator for accessibility
                </strong>
                : I wire up agentic frameworks and large language models that
                thread WCAG/ADA conformance through the whole delivery pipeline —
                bridging the build side (SDLC) and the test side (STLC) so
                accessibility is verified continuously, not bolted on at the end.
                Less manual audit toil; a faster, more reliable path to inclusive
                software.
              </p>
            </RevealStagger>

            <StoryBridge />

            <RevealStagger className="max-w-[62ch] space-y-4 text-lg leading-relaxed">
              <p>
                I care as much about how it looks as how it works. I keep a keen
                eye on{" "}
                <strong className="font-semibold text-text">
                  design, authenticity, and aesthetics
                </strong>{" "}
                — curating typography, layout, and motion in Figma so the
                accessible path is also the most beautiful one in the room.
              </p>
              <p>
                Away from the screen I’m an active musician, and that ear for
                rhythm, timing, and texture quietly shapes how I pace interfaces
                and tune motion.
              </p>
              <p>
                Whether I’m orchestrating AI audits or shaping a layout, the goal
                is the same: bridge cutting-edge technology and universal
                usability — a digital world that’s beautiful <em>and</em> built
                for everyone.
              </p>
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ---- How I work ---- */}
      <AboutSection labelledBy="phil-h" heading="How I work">
        <RevealStagger
          as="ol"
          className="m-0 grid max-w-[62ch] list-none gap-0 p-0"
        >
          {PRINCIPLES.map(({ t, p }, i) => (
            <li
              key={t}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-border-soft py-5"
            >
              <span aria-hidden="true" className="font-mono text-sm text-peach">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-xl font-medium">{t}</p>
                <p className="mt-1 text-text-muted">{p}</p>
              </div>
            </li>
          ))}
        </RevealStagger>
      </AboutSection>

      {/* ---- Toolkit ---- */}
      <AboutSection labelledBy="skills-h" heading="Toolkit">
        <RevealStagger className="grid gap-8">
          {TOOLKIT.map(({ group, items }) => (
            <div key={group}>
              <h3 className="mb-3 text-sm font-medium text-text-muted">
                {group}
              </h3>
              <ul className="flex list-none flex-wrap gap-2 p-0">
                {items.map((item) => (
                  <li key={item}>
                    <span className="inline-flex items-center rounded-pill border border-border-soft px-4 py-2 font-mono text-xs text-text">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </RevealStagger>
      </AboutSection>

      {/* ---- Accessibility statement (anchor target from elsewhere) ---- */}
      <AboutSection
        id="accessibility"
        labelledBy="a11y-h"
        heading="Accessibility statement"
      >
        <RevealStagger className="max-w-[62ch] space-y-4 text-lg leading-relaxed">
          <p>
            This site targets{" "}
            <strong className="font-semibold text-text">WCAG 2.2 AA</strong>. It
            is built to be fully keyboard-operable with visible focus indicators,
            uses semantic landmarks and one <code className="font-mono text-base">h1</code>{" "}
            per page, provides text alternatives for meaningful media, and
            respects{" "}
            <code className="font-mono text-base">prefers-reduced-motion</code> —
            animation is an enhancement, never a requirement.
          </p>
          <p>
            Found a barrier? That’s a bug. Please tell me:{" "}
            <a
              href="mailto:jassimmohammed2910@gmail.com"
              className="text-link underline underline-offset-4"
            >
              jassimmohammed2910@gmail.com
            </a>
            .
          </p>
          <p className="text-text-muted">
            Curious how the pieces fit together? See the{" "}
            <a
              href="/design-system"
              className="text-link underline underline-offset-4"
            >
              design system
            </a>{" "}
            for tokens, components, and the contrast math behind them.
          </p>
        </RevealStagger>
      </AboutSection>
    </div>
  );
}
