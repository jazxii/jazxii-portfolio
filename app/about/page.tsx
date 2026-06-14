import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "About",
  description:
    "Story, accessibility philosophy, and skills of Jassim M. Shamim — Digital Accessibility Engineer & Creative Technologist.",
};

const skills = {
  "Accessibility": [
    "WCAG 2.2 AA",
    "ARIA",
    "NVDA / VoiceOver / TalkBack",
    "Audit & remediation",
    "React / Compose / SwiftUI",
  ],
  "AI & Engineering": [
    "LLM orchestration",
    "Graph RAG",
    "Knowledge graphs / Neo4j",
    "Playwright + axe-core",
    "TypeScript / React / Node",
  ],
  "Creative": [
    "Motion design (GSAP)",
    "Figma",
    "Video editing",
    "AR filters",
    "Photography",
  ],
};

const languages = ["English", "Malayalam", "Hindi"];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <h1 className="font-display text-h1 font-semibold">About</h1>

      <p className="mt-4 font-mono text-sm text-text-muted">
        Digital Accessibility Engineer @ Cognizant · AI &amp; LLM R&amp;D ·
        Ex-ISRO · Chennai, India
      </p>

      <section aria-labelledby="story-heading" className="mt-10">
        <h2 id="story-heading" className="font-display text-h2 font-semibold">
          The short version
        </h2>
        <div className="mt-4 space-y-4 max-w-prose">
          <p>
            I’m Jassim — a digital accessibility engineer and creative
            technologist who builds inclusive tech with AI workflows. My
            background in QA and accessibility testing gave me a user-first
            mindset; my work now lives at the crossover of accessibility, AI,
            and design, where I architect LLM systems and knowledge graphs to
            make the most ambitious interfaces usable for everyone.
          </p>
          <p>
            At Cognizant I designed and built an internal Accessibility AI
            Platform — Graph RAG over a WCAG knowledge graph, an LLM auditor
            over live DOM and screenshots — that unifies the whole ADA workflow
            in one place. Before that I led a high-voltage project at ISRO. I
            care about writing better code, designing cleaner interfaces, and
            experimenting with intelligent systems that make life easier — and
            more inclusive.
          </p>
          <p className="font-medium text-text">
            Always learning. Always improving. Always creating.
          </p>
        </div>
      </section>

      <section aria-labelledby="philosophy-heading" className="mt-14">
        <h2 id="philosophy-heading" className="font-display text-h2 font-semibold">
          Accessibility philosophy
        </h2>
        <div className="mt-4 space-y-4 max-w-prose">
          <p>
            Accessibility is not a compliance checkbox or a constraint on
            design — it is a quality bar. When focus order, semantics, contrast,
            and motion preferences are designed in from the first commit, the
            result is better for everyone: faster, clearer, more robust.
          </p>
          <p>
            My working rules: semantic HTML before ARIA. The keyboard path is
            the product, not an afterthought. Reduced motion deserves the same
            polish as full motion. And if a component can be misused
            inaccessibly, the component API is wrong, not the user.
          </p>
        </div>
      </section>

      <section aria-labelledby="skills-heading" className="mt-14">
        <h2 id="skills-heading" className="font-display text-h2 font-semibold">
          Skills
        </h2>
        <dl className="mt-6 space-y-8">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <dt className="font-mono text-xs uppercase tracking-widest text-text-muted">
                {group}
              </dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <li key={skill}>
                      <Pill>{skill}</Pill>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="more-heading" className="mt-14">
        <h2 id="more-heading" className="font-display text-h2 font-semibold">
          Certifications &amp; languages
        </h2>
        <dl className="mt-6 space-y-8">
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Certification
            </dt>
            <dd className="mt-3">
              <Pill>Claude Certified Architect — Foundations</Pill>
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs uppercase tracking-widest text-text-muted">
              Languages
            </dt>
            <dd className="mt-3">
              <ul className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <li key={language}>
                    <Pill>{language}</Pill>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="contact-heading" className="mt-14">
        <h2 id="contact-heading" className="font-display text-h2 font-semibold">
          Contact
        </h2>
        <p className="mt-4 max-w-prose">
          The fastest way to reach me is email. I’m open to accessibility
          engineering and creative technology roles, audits, and
          collaborations.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href="mailto:jassimmohammed2910@gmail.com" cursor="email">
            jassimmohammed2910@gmail.com
          </ButtonLink>
          <ButtonLink
            href="https://www.linkedin.com/in/jassim-m-shamim/"
            variant="ghost"
            external
          >
            LinkedIn
          </ButtonLink>
        </div>
      </section>
    </div>
  );
}
