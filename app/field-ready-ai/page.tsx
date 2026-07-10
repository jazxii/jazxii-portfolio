import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";

export const metadata: Metadata = {
  title: "Field-Ready AI",
  description:
    "A live weekly AI program for experienced professionals, built on your own workflows instead of generic course content. Cohort 01 kicks off July 11, 2026.",
};

// Cohort 01 registration — MS Form (closes July 9 EOD per the program plan).
const FORM_URL = "https://forms.cloud.microsoft/r/JhnEFygTxL";

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const GLANCE = [
  "Live weekly sessions · Saturdays · 60–90 min",
  "A small, capped cohort — any role, any domain",
  "Session time announced to registrants once preferences are in",
  "Hands-on labs on your own laptop",
  "Every session recorded, with notes on the private Field Notes hub",
  "1:1 connects between sessions",
  "No technical background needed — and no ceiling if you're past the basics",
] as const;

const APPROACH = [
  {
    t: "Your work is the curriculum",
    p: "Sessions run on the tasks you actually do, captured before kickoff. No abstract demos.",
  },
  {
    t: "The roadmap is co-designed",
    p: "After the intro session, the program's direction is set by the cohort: deeper automation, agents, data work, team enablement, tool evaluation — whatever the room needs.",
  },
  {
    t: "A mental model, not a manual",
    p: "Treat AI like a high-IQ intern: brilliant, tireless, clueless about your business until briefed right. You already know how to manage one.",
  },
  {
    t: "Live and hands-on",
    p: "Demo, lab, debrief. No recordings-you'll-never-watch — though recordings exist too, on the cohort's private Field Notes hub.",
  },
] as const;

const KICKOFF_AGENDA = [
  {
    t: "Welcome & why this program exists",
    p: "The “can't keep up” problem — and a cohort built on your work, not a course catalog.",
  },
  {
    t: "“Here's what you told me”",
    p: "Playback of the registration responses: tools tried, comfort spread, shared frustrations, and the room's top time-eating tasks.",
  },
  {
    t: "The mental model",
    p: "AI as your high-IQ intern.",
  },
  {
    t: "Live demos",
    p: "Run on the top tasks from the room's own answers.",
  },
  {
    t: "Co-designing the road ahead",
    p: "Open discussion plus a priority vote on where the program goes next.",
  },
  {
    t: "How the program works",
    p: "The weekly rhythm, Field Notes, recordings, 1:1s, and homework style.",
  },
  {
    t: "First homework: the Delegation Diary",
    p: "A 15–20 minute exercise that seeds session two.",
  },
] as const;

const RHYTHM = [
  { t: "Saturday session", p: "Live — demo, lab, debrief." },
  {
    t: "Field Notes entry",
    p: "Recording and notes on the private hub within 48 hours.",
  },
  { t: "Weekday homework", p: "15–20 minutes that produces real work output." },
  { t: "1:1 connect", p: "A short check-in between sessions." },
  { t: "Next session", p: "Built on what the cohort chose and what you tried." },
] as const;

const FAQ = [
  {
    q: "Do I need a technical background?",
    a: "No. If you can write an email, you're qualified. Already tinkering? The program scales with you.",
  },
  {
    q: "How many sessions are there?",
    a: "Sessions run weekly. Only the July 11 kickoff is fixed in advance — the roadmap after that is co-designed with the cohort on day one.",
  },
  {
    q: "What tools do we use?",
    a: "The approved toolset is confirmed with your organization before kickoff, so labs run on tools you're cleared to use.",
  },
  {
    q: "Is my data safe?",
    a: "Only non-confidential material is used in labs, and ground rules are set together at kickoff.",
  },
  {
    q: "What if I miss a Saturday?",
    a: "Every session's recording, notes, and transcript go up on the private Field Notes hub within 48 hours — and 1:1 catch-ups are available.",
  },
  {
    q: "Is there homework?",
    a: "Yes — 15–20 minutes a week, designed to produce real work deliverables, not busywork.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Building blocks                                                    */
/* ------------------------------------------------------------------ */

function Section({
  id,
  eyebrow,
  heading,
  intro,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="scroll-mt-28 border-t border-border-soft py-14 sm:py-16"
    >
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
        {eyebrow}
      </p>
      <RevealText
        as="h2"
        id={`${id}-h`}
        className="mt-3 font-display text-h2 font-semibold"
      >
        {heading}
      </RevealText>
      {intro ? (
        <Reveal as="p" className="mt-3 max-w-[62ch] text-text-muted">
          {intro}
        </Reveal>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function FieldReadyAiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ---- Hero ---- */}
      <header className="py-16 sm:py-24">
        <Pill className="border-peach/40 text-peach">
          Cohort 01 — kicks off July 11, 2026
        </Pill>
        <RevealText
          as="h1"
          className="mt-6 max-w-[14ch] font-display text-display font-semibold leading-[1.05]"
        >
          Field-Ready AI
        </RevealText>
        <Reveal as="p" className="mt-6 max-w-[38ch] font-display text-h2 font-semibold text-balance">
          AI, decoded for leaders who don&rsquo;t have time for another course.
        </Reveal>
        <Reveal
          as="p"
          className="mt-5 font-mono text-sm uppercase tracking-widest text-text-muted"
        >
          Live weekly sessions · Saturdays · 60–90 min · Built on your own
          workflows
        </Reveal>
        <Reveal className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href={FORM_URL} external>
            Reserve your seat
          </ButtonLink>
          <ButtonLink href="#how-it-works" variant="ghost">
            How it works
          </ButtonLink>
        </Reveal>
      </header>

      {/* ---- The problem ---- */}
      <Section id="problem" eyebrow="The problem" heading="You can't keep up — and that's not on you">
        <Reveal as="p" className="max-w-[62ch] text-lg leading-relaxed">
          You&rsquo;ve got real work on your plate. AI content is everywhere —
          newsletters, courses, LinkedIn hot takes — and none of it fits your
          week. The courses that exist are built for people with time, not
          people with responsibilities. Field-Ready AI flips it: instead of
          you catching up with AI, AI catches up with <em>your</em> work.
        </Reveal>
      </Section>

      {/* ---- The approach ---- */}
      <Section
        id="approach"
        eyebrow="The approach"
        heading="What makes this different"
      >
        <RevealStagger
          as="ul"
          className="grid list-none gap-5 p-0 sm:grid-cols-2"
        >
          {APPROACH.map((a) => (
            <li
              key={a.t}
              className="rounded-card border border-border-soft bg-surface p-6"
            >
              <h3 className="font-display text-xl font-medium">{a.t}</h3>
              <p className="mt-2 text-text-muted">{a.p}</p>
            </li>
          ))}
        </RevealStagger>
      </Section>

      {/* ---- At a glance ---- */}
      <Section id="glance" eyebrow="Program at a glance" heading="The shape of it">
        <RevealStagger as="ul" className="m-0 grid list-none gap-0 p-0">
          {GLANCE.map((g) => (
            <li
              key={g}
              className="flex items-baseline gap-4 border-b border-border-soft py-4 last:border-b-0"
            >
              <span aria-hidden="true" className="font-mono text-sm text-peach">
                {"//"}
              </span>
              <span>{g}</span>
            </li>
          ))}
        </RevealStagger>
      </Section>

      {/* ---- Kickoff session ---- */}
      <Section
        id="kickoff"
        eyebrow="Kickoff · Saturday, July 11"
        heading="Meet the Intern: where you are, where we're going"
        intro="The only session published in detail — because everything after it is built from what the room decides."
      >
        <RevealStagger as="ol" className="m-0 grid list-none gap-0 p-0">
          {KICKOFF_AGENDA.map((item, i) => (
            <li
              key={item.t}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-border-soft py-5"
            >
              <span aria-hidden="true" className="font-mono text-sm text-peach">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-xl font-medium">{item.t}</p>
                <p className="mt-1 text-text-muted">{item.p}</p>
              </div>
            </li>
          ))}
        </RevealStagger>

        <Reveal className="mt-8 rounded-card border border-border-soft bg-surface p-6">
          <h3 className="font-display text-xl font-medium">What comes next</h3>
          <p className="mt-2 max-w-[62ch] text-text-muted">
            Sessions 2 onward are built from what the cohort chooses on day
            one. The roadmap is published on Field Notes as it takes shape —
            the open end isn&rsquo;t a gap in the plan, it is the plan.
          </p>
        </Reveal>
      </Section>

      {/* ---- How it works ---- */}
      <Section
        id="how-it-works"
        eyebrow="How it works"
        heading="One weekly loop"
        intro="Every week runs the same rhythm, so the program fits around your calendar instead of fighting it."
      >
        <RevealStagger
          as="ol"
          className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-5"
        >
          {RHYTHM.map((r, i) => (
            <li
              key={r.t}
              className="rounded-card border border-border-soft bg-surface p-5"
            >
              <span aria-hidden="true" className="font-mono text-xs text-peach">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-medium">{r.t}</h3>
              <p className="mt-1 text-sm text-text-muted">{r.p}</p>
            </li>
          ))}
        </RevealStagger>
      </Section>

      {/* ---- Who it's for ---- */}
      <Section id="who" eyebrow="Fit check" heading="Who it's for — and who it isn't">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal className="rounded-card border border-border-soft bg-surface p-6">
            <h3 className="font-display text-xl font-medium">For</h3>
            <p className="mt-2 text-text-muted">
              People with real experience in their field — in any domain —
              who haven&rsquo;t had a front-row view of how AI actually
              works, builds, and helps in real scenarios. From &ldquo;never
              touched AI&rdquo; to &ldquo;tinkered plenty and want
              depth,&rdquo; the program meets you where you are.
            </p>
          </Reveal>
          <Reveal className="rounded-card border border-border-soft bg-surface p-6">
            <h3 className="font-display text-xl font-medium">Not for</h3>
            <p className="mt-2 text-text-muted">
              People wanting vendor certifications, or a fixed syllabus to
              skim.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---- Facilitator ---- */}
      <Section id="facilitator" eyebrow="Facilitator" heading="Who's running this">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Decorative avatar — the name and role are stated in text beside it */}
          <Image
            src="/media/memoji-portrait.png"
            alt=""
            width={112}
            height={112}
            className="size-28 shrink-0 rounded-card border border-border-soft bg-surface object-cover"
          />
          <div className="max-w-[62ch]">
            <p className="font-display text-xl font-medium">
              Jassim — Accessibility Engineer &amp; AI Workflow Architect
            </p>
            <p className="mt-2 text-text-muted">
              Builds AI-powered engineering platforms (A11yNexus, BugCraft AI)
              and designs and delivers AI enablement training for enterprise
              teams.
            </p>
            <p className="mt-3">
              &ldquo;I build these systems for a living — which is exactly why
              I can explain them without the jargon.&rdquo;
            </p>
            <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              <a
                href="https://www.linkedin.com/in/jassim-m-shamim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link underline underline-offset-4"
              >
                LinkedIn<span className="sr-only"> (opens in new tab)</span>
                <span aria-hidden="true"> ↗</span>
              </a>
              <Link href="/" className="text-link underline underline-offset-4">
                Portfolio home
              </Link>
            </p>
          </div>
        </div>
      </Section>

      {/* ---- FAQ ---- */}
      <Section id="faq" eyebrow="FAQ" heading="Questions, answered">
        <div className="grid gap-3">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group rounded-card border border-border-soft bg-surface"
            >
              <summary className="cursor-pointer list-item px-6 py-4 font-display text-lg font-medium marker:text-peach">
                {f.q}
              </summary>
              <p className="max-w-[62ch] px-6 pb-5 text-text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* ---- Footer CTA ---- */}
      <section
        aria-labelledby="register-h"
        className="border-t border-border-soft py-14 sm:py-16"
      >
        <div className="rounded-card border border-border-soft bg-surface p-8 sm:p-12">
          <RevealText
            as="h2"
            id="register-h"
            className="max-w-[24ch] font-display text-h2 font-semibold"
          >
            Cohort 01 kicks off July 11. Seats are limited.
          </RevealText>
          <Reveal as="p" className="mt-3 max-w-[54ch] text-text-muted">
            Registration takes about five minutes — and your answers literally
            become the course material.
          </Reveal>
          <Reveal className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
            <ButtonLink href={FORM_URL} external>
              Reserve your seat
            </ButtonLink>
            <a
              href="mailto:jassim@jazxii.com"
              className="text-sm text-link underline underline-offset-4"
            >
              jassim@jazxii.com
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
