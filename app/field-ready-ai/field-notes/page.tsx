import type { Metadata } from "next";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { Pill } from "@/components/ui/Pill";

// Private cohort hub: unlinked URL shared only inside the Team. Kept out of
// search indexes and never navigable from the portfolio.
export const metadata: Metadata = {
  title: "Field Notes — Field-Ready AI",
  description:
    "The private session hub for Field-Ready AI Cohort 01: recordings, notes, transcripts, homework, and the evolving program roadmap.",
  robots: { index: false, follow: false },
};

const ENTRY_PARTS = [
  "Recording (unlisted — shared only with the cohort)",
  "Session notes: key points, demos run, decisions made",
  "Transcript (cleaned before publishing)",
  "Homework due before the next session",
  "Resources: prompts shown, links, handouts",
] as const;

export default function FieldNotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <Pill className="border-peach/40 text-peach">
        Cohort 01 · private hub
      </Pill>
      <RevealText
        as="h1"
        className="mt-6 font-display text-h1 font-semibold"
      >
        Field Notes
      </RevealText>
      <Reveal as="p" className="mt-5 max-w-prose text-lg text-text-muted">
        One entry per session, newest on top — recording, notes, transcript,
        homework, and resources, live within 48 hours of each Saturday. This
        page is shared only with the cohort; please don&rsquo;t forward the
        link.
      </Reveal>

      {/* ---- Roadmap ---- */}
      <section aria-labelledby="roadmap-h" className="mt-14">
        <RevealText
          as="h2"
          id="roadmap-h"
          className="font-display text-h2 font-semibold"
        >
          Program roadmap
        </RevealText>
        <Reveal as="p" className="mt-3 max-w-prose text-text-muted">
          The roadmap is co-designed at kickoff and published here as it takes
          shape. After July 11, this block lists the upcoming session topics
          the cohort voted for.
        </Reveal>
        <Reveal className="mt-5 rounded-card border border-border-soft bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Status
          </p>
          <p className="mt-2">
            Taking shape — check back after the kickoff session.
          </p>
        </Reveal>
      </section>

      {/* ---- Sessions ---- */}
      <section aria-labelledby="sessions-h" className="mt-14">
        <RevealText
          as="h2"
          id="sessions-h"
          className="font-display text-h2 font-semibold"
        >
          Sessions
        </RevealText>

        <Reveal className="mt-5 rounded-card border border-border-soft bg-surface p-6 sm:p-8">
          <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
            Session 01 · Saturday, July 11, 2026 · 60–90 min · Upcoming
          </p>
          <h3 className="mt-3 font-display text-xl font-medium">
            Meet the Intern: where you are, where we&rsquo;re going
          </h3>
          <p className="mt-3 max-w-prose text-text-muted">
            The full entry — recording, notes, transcript, and the Delegation
            Diary homework — lands here within 48 hours of the session. Every
            entry includes:
          </p>
          <RevealStagger
            as="ul"
            className="mt-4 max-w-prose list-disc space-y-1.5 pl-6 text-text-muted"
          >
            {ENTRY_PARTS.map((part) => (
              <li key={part}>{part}</li>
            ))}
          </RevealStagger>
        </Reveal>
      </section>
    </div>
  );
}
