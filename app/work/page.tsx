import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { WorkShowcase } from "@/components/work/WorkShowcase";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects — accessibility engineering and creative technology by Jassim M. Shamim.",
};

export default function WorkPage() {
  return (
    <>
      {/* Full-screen hero statement. It's sticky, so the content panel below
          scrolls up and over it — the project cards rise from below. */}
      <section
        aria-labelledby="work-h1"
        className="sticky top-0 flex min-h-screen flex-col justify-center px-4 sm:px-6"
      >
        {/* decorative scroll-progress dots down the left edge (reference style) */}
        <span aria-hidden="true" className="work-scroll-rail hidden md:block" />

        <div className="mx-auto w-full max-w-6xl">
          <h1
            id="work-h1"
            className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted"
          >
            Work
          </h1>

          {/* Hero tagline — folder icon is decorative (aria-hidden); the text is
              a real, readable line (not a heading, to keep the h1→project-h2 outline). */}
          <Reveal
            as="p"
            className="mt-4 max-w-6xl font-display text-h1 font-semibold leading-[1.08] text-text-muted text-balance sm:text-display"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 28 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 inline-block h-[0.78em] w-auto translate-y-[0.04em]"
            >
              {/* tab */}
              <rect x="3.5" y="3.5" width="10" height="6" rx="2" fill="var(--accent)" />
              {/* body */}
              <rect x="2" y="6" width="24" height="15.5" rx="3.5" fill="var(--accent)" />
              {/* "iii" mark */}
              <g
                fill="#dbe4ff"
                style={{
                  transform: "skewX(-10deg)",
                  transformBox: "fill-box",
                  transformOrigin: "center",
                }}
              >
                <rect x="12.4" y="11.5" width="1.7" height="5" rx="0.85" />
                <rect x="14.9" y="11.5" width="1.7" height="5" rx="0.85" />
                <rect x="17.4" y="11.5" width="1.7" height="5" rx="0.85" />
              </g>
            </svg>
            Driven by the craft. Defined by the details.
          </Reveal>
        </div>
      </section>

      {/* Content panel — rises over the hero on scroll, carrying the cards. */}
      <div className="work-panel">
        <div className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:px-6">
          <Reveal as="p" className="max-w-xl text-text-muted">
            Selected projects where craft and accessibility are the same goal.
          </Reveal>
        </div>
        <WorkShowcase projects={projects} />
      </div>
    </>
  );
}
