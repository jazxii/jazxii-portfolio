import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";
import { Pill } from "@/components/ui/Pill";
import { asset } from "@/lib/asset";

// Private cohort hub: unlinked URL shared only inside the Team. Kept out of
// search indexes and never navigable from the portfolio.
export const metadata: Metadata = {
  title: "Field Notes — Field-Ready AI",
  description:
    "The private session hub for Field-Ready AI Cohort 01: recordings, notes, demos, homework, and the evolving program roadmap.",
  robots: { index: false, follow: false },
};

// SharePoint recordings — unlisted, cohort-only.
const RECORDING_S1 =
  "https://jazxii-my.sharepoint.com/:v:/p/jassim/IQBePCMcNWdDSL3WLCd2X1xCASW5dqQ2zKd0Ce2rU3w81TQ?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=oeGCD8";
const RECORDING_S2 =
  "https://jazxii-my.sharepoint.com/:v:/p/jassim/IQCA6hywRizgQr27ZVucNVCiAdUcFhNnXYxon5IPUVxrMAE?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=TLW8tt";

/* ------------------------------------------------------------------ */
/* Building blocks                                                    */
/* ------------------------------------------------------------------ */

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link underline underline-offset-4"
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

function NoteHeading({ children }: { children: string }) {
  return (
    <RevealText as="h3" className="mt-10 font-display text-xl font-medium">
      {children}
    </RevealText>
  );
}

function Quote({ children }: { children: ReactNode }) {
  return (
    <Reveal
      as="blockquote"
      className="mt-5 border-l-2 border-peach pl-5 font-display text-lg font-medium leading-relaxed sm:text-xl"
    >
      {children}
    </Reveal>
  );
}

function ResourceCard({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal className="mt-4 rounded-card border border-border-soft bg-surface p-5 sm:p-6">
      <p className="font-display text-lg font-medium">{title}</p>
      <div className="mt-1.5 text-sm text-text-muted">{children}</div>
    </Reveal>
  );
}

function SessionEntry({
  id,
  date,
  title,
  children,
}: {
  id: string;
  date: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-h`}
      className="mt-16 scroll-mt-28 border-t border-border-soft pt-12"
    >
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
        {date}
      </p>
      <RevealText
        as="h2"
        id={`${id}-h`}
        className="mt-3 font-display text-h2 font-semibold"
      >
        {title}
      </RevealText>
      {children}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function FieldNotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <Pill className="border-peach/40 text-peach">
        Cohort 01 · private hub
      </Pill>
      <RevealText as="h1" className="mt-6 font-display text-h1 font-semibold">
        Field Notes
      </RevealText>
      <Reveal as="p" className="mt-5 max-w-prose text-lg text-text-muted">
        One entry per session, newest on top — recording, notes, demos,
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
          Co-designed at kickoff and updated as the cohort steers. Where the
          program stands after two sessions:
        </Reveal>
        <RevealStagger as="ol" className="m-0 mt-5 grid list-none gap-0 p-0">
          {[
            {
              n: "01",
              t: "Meet the Intern",
              p: "Done · July 11 — the mental model, the ladder, one workflow run three ways.",
            },
            {
              n: "02",
              t: "Meet the Machine",
              p: "Done · July 18 — fundamentals: how it works, what it costs, which tool when.",
            },
            {
              n: "03",
              t: "The build begins",
              p: "Next — briefing done right, the never-list, subscriptions set up together, and the first app built from the cohort's own briefs.",
            },
            {
              n: "→",
              t: "Then, as voted at kickoff",
              p: "Agents and automation · rolling AI out to teams · documents and data · evaluating tools.",
            },
          ].map((item) => (
            <li
              key={item.t}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-border-soft py-4 last:border-b-0"
            >
              <span aria-hidden="true" className="font-mono text-sm text-peach">
                {item.n}
              </span>
              <div>
                <p className="font-display text-lg font-medium">{item.t}</p>
                <p className="mt-1 text-sm text-text-muted">{item.p}</p>
              </div>
            </li>
          ))}
        </RevealStagger>
      </section>

      {/* ================= SESSION 02 ================= */}
      <SessionEntry
        id="session-02"
        date="Session 02 · Saturday, July 18, 2026"
        title="Meet the Machine"
      >
        <Reveal as="p" className="mt-4 max-w-prose text-text-muted">
          The fundamentals session — requested by the cohort, delivered in
          full. How an LLM actually works, what tokens are and why
          they&rsquo;re your bill, how the harness shapes behaviour, plans and
          limits in plain terms — a proper introduction to Claude itself. The
          fundamentals earned the whole session: briefing and ground rules
          move to next time, where the app build begins.
        </Reveal>

        <ResourceCard
          title={
            <ExternalLink href={RECORDING_S2}>Session recording</ExternalLink>
          }
        >
          Meet the Machine — Claude fundamentals (July 18, 2026). Hosted on
          SharePoint; viewing may require sign-in.
        </ResourceCard>

        <NoteHeading>The whole session in three facts</NoteHeading>
        <Quote>
          It predicts one token at a time — probable is not true, so verify
          what matters. It re-reads everything, every time — there is no
          memory; the transcript is the memory. And its desk gets worse the
          more you pile on — more context is not better context.
        </Quote>

        <NoteHeading>What we covered</NoteHeading>
        <RevealStagger
          as="ul"
          className="mt-4 max-w-prose list-disc space-y-2.5 pl-6 marker:text-peach"
        >
          <li>
            <strong>The pipeline.</strong> Tokenizer → embeddings →
            transformer → probabilities → decode, then loop. The model picks
            one token, re-reads everything, and repeats — a few hundred times
            per answer.
          </li>
          <li>
            <strong>Why it&rsquo;s confident and wrong.</strong> It selects
            the most <em>probable</em> next token, and probable ≠ true.
            Fluency is not knowledge; confidence is a property of the
            sampling, not the facts.
          </li>
          <li>
            <strong>The desk.</strong> The context window is working memory.
            Attention is a finite budget, and overloading it makes answers
            worse — context rot is real.
          </li>
          <li>
            <strong>The tokenizer.</strong> Byte Pair Encoding merges
            whatever was frequent — so specialist jargon fragments
            expensively, and non-English scripts pay twice (heavier bytes,
            fewer merges).
          </li>
          <li>
            <strong>The money.</strong> Everything — your text, your files,
            your project instructions, the whole conversation — is re-sent on
            every message. Long threads grow expensive cumulatively.
          </li>
          <li>
            <strong>The harness.</strong> The model is the brain; the harness
            is everything around it — tools, permissions, and how context
            reaches the desk. Writing project instructions is hand-building a
            harness.
          </li>
          <li>
            <strong>Plans, plainly.</strong> Pro is $20/month; usage runs on
            a rolling 5-hour window plus a weekly cap, from one shared pool.
            With optional usage credits switched off, $20 is a hard ceiling.
          </li>
          <li>
            <strong>Tools and models.</strong> Chat is a conversation; Cowork
            and Code are handoffs. Start on the default model; escalate only
            when quality actually fails.
          </li>
        </RevealStagger>

        <NoteHeading>Demos you can run yourself</NoteHeading>
        <ResourceCard
          title={
            <ExternalLink
              href={asset("/field-ready-ai/session-2-tokenizer-demo.html")}
            >
              The live tokenizer
            </ExternalLink>
          }
        >
          Watch Byte Pair Encoding compress raw bytes into tokens, merge by
          merge. Try the presets — plain English vs. technical jargon vs.
          Malayalam vs. JSON — then type a sentence from your own week and
          see what it costs.
        </ResourceCard>
        <ResourceCard title="The expensive thread">
          <p>
            Ask a trivial question in a fresh chat, then ask the identical
            question at the bottom of a long working thread with files
            attached. Same words — roughly a hundred times the cost, because
            the whole thread is re-read for every token of the reply. The
            single biggest habit that follows:{" "}
            <strong>new task → new chat.</strong>
          </p>
          <code className="mt-3 block w-fit rounded-card bg-surface-2 px-4 py-2.5 font-mono text-sm text-text">
            quick one — what does p95 mean again?
          </code>
        </ResourceCard>
        <ResourceCard title="Bare chat vs. a project">
          Ask &ldquo;is this result acceptable?&rdquo; in an empty chat and
          you get a hedge. Ask inside a project holding your standing rules
          and baseline file, and you get a verdict in your mandated format.
          Same model — different desk.
        </ResourceCard>

        <NoteHeading>The whiteboard</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose text-text-muted">
          The pipeline, sketched live in the session — from &ldquo;can you
          fix this bug?&rdquo; through the tokenizer, vector embeddings, and
          the transformer.
        </Reveal>
        <Reveal className="mt-4">
          <Image
            src="/field-ready-ai/session-2-whiteboard-preview.jpg"
            alt="Hand-drawn whiteboard from the session. Main flow: the prompt “can you fix this bug?” goes to api.claude.com, into a tokenizer, becomes a list of token IDs, then vector embeddings on x, y, z axes, then the transformer (“attention is all you need”) enriches the vectors with meaning, ending in next-token probabilities — with the “I hate cats / I don't hate cats” example alongside. Around it: the model line-up (Fable, Opus, Sonnet, Haiku ordered by speed), the temperature parameter, and the Role–Context–Task–Format–Example brief structure from the lab."
            width={1800}
            height={1456}
            loading="lazy"
            className="h-auto w-full rounded-card border border-border-soft bg-surface"
          />
        </Reveal>
        <Reveal
          as="p"
          className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          <ExternalLink
            href={asset("/field-ready-ai/session-2-excalidrawimg.png")}
          >
            Full-size sketch (PNG, 3.9 MB)
          </ExternalLink>
          <a
            href={asset("/field-ready-ai/session-2.excalidraw")}
            download
            className="text-link underline underline-offset-4"
          >
            Excalidraw source file
            <span className="sr-only"> (downloads a file)</span>
            <span aria-hidden="true"> ↓</span>
          </a>
        </Reveal>

        <NoteHeading>The habits, ranked</NoteHeading>
        <RevealStagger
          as="ol"
          className="mt-4 max-w-prose list-decimal space-y-2 pl-6 marker:font-mono marker:text-sm marker:text-peach"
        >
          <li>
            <strong>New task → new chat</strong> — bigger than everything
            below combined.
          </li>
          <li>Stable knowledge lives in a project, written once.</li>
          <li>
            Route by difficulty — default model first, escalate on actual
            failure.
          </li>
          <li>Right information, not all information.</li>
          <li>Extract before you attach.</li>
          <li>Front-load the brief; don&rsquo;t negotiate over ten rounds.</li>
          <li>Compact formats — CSV beats pretty-printed anything.</li>
        </RevealStagger>

        <NoteHeading>Coming next</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose text-text-muted">
          The parts the fundamentals deliberately made room for: how to build
          a proper brief (the onboarding conversation you&rsquo;d have with a
          new hire), the ground rules for what never goes into a personal AI
          account — and then the build begins: a todo/calendar app, created
          together from a real brief, once everyone&rsquo;s subscription is
          set up.
        </Reveal>

        <NoteHeading>Resources</NoteHeading>
        <ResourceCard
          title={
            <ExternalLink href={asset("/field-ready-ai/session-2-deck.html")}>
              Session 2 slides
            </ExternalLink>
          }
        >
          The full deck. Arrow keys to navigate, F for fullscreen.
        </ResourceCard>

        <NoteHeading>Before next session</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose">
          Homework: brief the app we build next — who it&rsquo;s for, 3–5
          features, and what &ldquo;done&rdquo; looks like. Post it in the
          channel; next time, your brief is on screen. Subscriptions get set
          up together — Claude Pro, with usage credits switched off from
          minute one so $20 stays a hard ceiling.
        </Reveal>
      </SessionEntry>

      {/* ================= SESSION 01 ================= */}
      <SessionEntry
        id="session-01"
        date="Session 01 · Saturday, July 11, 2026"
        title="Meet the Intern"
      >
        <Reveal as="p" className="mt-4 max-w-prose text-text-muted">
          The kickoff — where the cohort is, where it&rsquo;s going, and the
          one mental model everything else hangs on. One real workflow, run
          four ways, in twenty-five minutes.
        </Reveal>

        <ResourceCard
          title={
            <ExternalLink href={RECORDING_S1}>Session recording</ExternalLink>
          }
        >
          Meet the Intern — where you are, where we&rsquo;re going (July 11,
          2026). Hosted on SharePoint; viewing may require sign-in.
        </ResourceCard>

        <NoteHeading>The problem this program answers</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose">
          Every week brings a new tool, a new model, a new thing you&rsquo;re
          apparently already behind on. Chasing that firehose is a losing
          game — so this program inverts it:
        </Reveal>
        <Quote>
          Instead of you catching up with AI, AI catches up with your work.
        </Quote>

        <NoteHeading>The room</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose">
          Everyone in this cohort already uses AI weekly. Between them
          they&rsquo;ve tried five-plus tools, and one has already shipped a
          working app with AI. So there is no beginner script here — the wall
          this group has hit isn&rsquo;t <em>using</em> AI, it&rsquo;s making
          it <strong>repeatable</strong>: for themselves, and for their
          teams. When asked where the program should go, the vote was
          unanimous — agents and automation, rolling AI out to teams,
          documents and data, evaluating tools.
        </Reveal>
        <Quote>That&rsquo;s not my curriculum. That&rsquo;s yours.</Quote>

        <NoteHeading>The one mental model</NoteHeading>
        <Quote>
          Working with AI is managing a brilliant intern — tireless, has read
          everything, knows nothing about your business until you brief it.
          And confident even when it&rsquo;s wrong — which is why its work
          never ships unreviewed.
        </Quote>
        <Reveal as="p" className="mt-4 max-w-prose">
          The good news: if you&rsquo;ve ever worked with an intern, you
          already have the core skill — delegation. Brief well, give context,
          review the work. This program just points that skill at a new hire.
          As one of the cohort put it in the room —{" "}
          <em>&ldquo;consider us as interns.&rdquo;</em> That framing shaped
          everything that followed, including Session 2 itself.
        </Reveal>

        <NoteHeading>The ladder</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose">
          The program&rsquo;s spine — four steps, each trading a little setup
          for a lot of repeatability:
        </Reveal>
        <Reveal className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-sm sm:text-base">
            <caption className="sr-only">
              The four-step ladder from prompting to autonomous agents
            </caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  className="border-b-2 border-border-soft py-2.5 pr-4 text-left font-mono text-xs uppercase tracking-[0.16em] text-peach"
                >
                  Step
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-border-soft py-2.5 pr-4 text-left font-mono text-xs uppercase tracking-[0.16em] text-peach"
                >
                  What it is
                </th>
                <th
                  scope="col"
                  className="border-b-2 border-border-soft py-2.5 text-left font-mono text-xs uppercase tracking-[0.16em] text-peach"
                >
                  What changes
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "1 · Prompt",
                  "You brief the intern every time",
                  "Works — but you re-explain everything, every time",
                ],
                [
                  "2 · Project",
                  "A permanent job description",
                  "Instructions and reference files written once, applied always",
                ],
                [
                  "3 · Skill",
                  "The intern owns the whole SOP",
                  "The entire procedure, packaged and callable on demand",
                ],
                [
                  "4 · Agent",
                  "The intern runs it unprompted",
                  "Watches the folder, executes the SOP without being asked",
                ],
              ].map(([step, what, changes]) => (
                <tr key={step}>
                  <td className="whitespace-nowrap border-b border-border-soft py-3 pr-4 align-top font-medium">
                    {step}
                  </td>
                  <td className="border-b border-border-soft py-3 pr-4 align-top">
                    {what}
                  </td>
                  <td className="border-b border-border-soft py-3 align-top text-text-muted">
                    {changes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        <NoteHeading>The demo: one workflow, three ways</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose">
          A real performance-engineering workflow — post-test reporting and
          baseline comparison — run live on synthetic data, up the first
          three steps of the ladder:
        </Reveal>
        <RevealStagger
          as="ul"
          className="mt-4 max-w-prose list-disc space-y-2.5 pl-6 marker:text-peach"
        >
          <li>
            <strong>Step 1 — the prompt.</strong> Baseline and cycle results
            attached, the full SOP pasted as one long brief. It caught the
            planted story: a critical +42% regression on the checkout-payment
            path, a search endpoint breaching its P90 and throughput targets,
            an error-rate spike — and one transaction that had genuinely{" "}
            <em>improved</em>. Then the limitation, out loud: nobody retypes
            that paragraph every cycle. So don&rsquo;t.
          </li>
          <li>
            <strong>Step 2 — the project.</strong> Same rules written once as
            project instructions. New cycle attached, and the only thing
            typed was <em>&ldquo;Here are this cycle&rsquo;s
            results.&rdquo;</em>{" "}
            It flagged the new regressions — including a +31% slowdown on a
            revenue path — and noticed something subtler: last cycle&rsquo;s
            critical issue was back at baseline. The fix, confirmed.
            That&rsquo;s half of why baselines exist.
          </li>
          <li>
            <strong>Step 3 — the skill.</strong> The whole SOP — validation
            rules, thresholds, severity, report format — written in plain
            English in a skill file. Not code. And not hand-written either:
            it was built by describing the SOP to Claude in one conversation.
            Fresh chat, files attached, one sentence —{" "}
            <em>&ldquo;Process this cycle&rsquo;s results.&rdquo;</em> — and
            out came a downloadable Excel report you&rsquo;d attach to a
            stakeholder email.
          </li>
        </RevealStagger>
        <Quote>
          One sentence in, a stakeholder-ready file out. That&rsquo;s the
          difference between using AI and owning a workflow.
        </Quote>
        <Reveal as="p" className="mt-4 max-w-prose text-text-muted">
          And wherever the AI stumbled along the way, that was part of the
          lesson, not a blooper: trust, but verify. The engineer stays in the
          loop — that&rsquo;s a feature of the ladder, not a bug.
        </Reveal>

        <NoteHeading>How the program runs</NoteHeading>
        <RevealStagger
          as="ul"
          className="mt-4 max-w-prose list-disc space-y-2 pl-6 marker:text-peach"
        >
          <li>
            <strong>Saturdays, live</strong> — working sessions on the
            cohort&rsquo;s actual workflows, not lectures.
          </li>
          <li>
            <strong>Field Notes within 48 hours</strong> — recording, notes,
            and every prompt shown, so nobody takes notes in the room.
          </li>
          <li>
            <strong>Light homework</strong> — designed to surface material
            for the next session.
          </li>
          <li>
            <strong>1:1s between sessions</strong> — a small cohort means
            real bandwidth.
          </li>
        </RevealStagger>

        <NoteHeading>Decisions made together</NoteHeading>
        <RevealStagger
          as="ul"
          className="mt-4 max-w-prose list-disc space-y-2 pl-6 marker:text-peach"
        >
          <li>Fundamentals first — the cohort asked, Session 2 delivered.</li>
          <li>
            Personal subscriptions set up together, after the fundamentals,
            with cost protections on from day one.
          </li>
          <li>
            A shared channel as the home for notes, questions, and resources.
          </li>
          <li>
            After fundamentals: building an app together, to see the full
            thought process of building with AI.
          </li>
          <li>Standing recording rule: no company or client names.</li>
        </RevealStagger>

        <NoteHeading>Resources</NoteHeading>
        <ResourceCard
          title={
            <ExternalLink href={asset("/field-ready-ai/session-1-deck.html")}>
              Session 1 slides
            </ExternalLink>
          }
        >
          The full deck. Arrow keys to navigate, F for fullscreen.
        </ResourceCard>

        <NoteHeading>Homework</NoteHeading>
        <Reveal as="p" className="mt-3 max-w-prose">
          The Delegation Diary: through the week, any moment you catch
          yourself thinking{" "}
          <em>
            &ldquo;an intern could have done the first 80% of this&rdquo;
          </em>{" "}
          — write it down. Two minutes a day. Those entries are the raw
          material the ladder gets climbed with.
        </Reveal>
      </SessionEntry>

      <p className="mt-16 border-t border-border-soft py-8 text-sm text-text-muted">
        Field-Ready AI · Field Notes — questions to{" "}
        <a
          href="mailto:jassim@jazxii.com"
          className="text-link underline underline-offset-4"
        >
          jassim@jazxii.com
        </a>
      </p>
    </div>
  );
}
