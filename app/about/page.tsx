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
    "WCAG 2.2",
    "ARIA",
    "Screen reader testing",
    "Audit & remediation",
    "Accessible design systems",
  ],
  "Engineering": [
    "TypeScript",
    "React / Next.js",
    "CSS architecture",
    "Testing & CI",
    "Node.js",
  ],
  "Creative": [
    "Motion design (GSAP)",
    "Figma",
    "Creative coding",
    "AI tooling",
    "Typography",
  ],
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <h1 className="font-display text-h1 font-semibold">About</h1>

      <section aria-labelledby="story-heading" className="mt-10">
        <h2 id="story-heading" className="font-display text-h2 font-semibold">
          The short version
        </h2>
        <div className="mt-4 space-y-4 max-w-prose">
          <p>
            I’m Jassim — a digital accessibility engineer and creative
            technologist. I spend my days making sure that the most ambitious
            interfaces on the web are also the most usable ones, for every
            person and every input method.
          </p>
          <p>
            Most portfolios in this space make you choose: visually stunning
            or genuinely accessible. This site is my argument that the choice
            is false. Every animation here has a reduced-motion path, every
            interaction works from a keyboard, and every page holds WCAG 2.2
            AA — without giving up the craft.
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
          <ButtonLink href="mailto:jassimmohammed2910@gmail.com">
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
