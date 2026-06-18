import type { Metadata } from "next";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description:
    "Conformance statement for jazxii.dev — WCAG 2.2 AA, with a direct contact for any issues.",
};

export default function AccessibilityPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-16 sm:px-6">
      <RevealText as="h1" className="font-display text-h1 font-semibold">
        Accessibility statement
      </RevealText>

      <div className="mt-8 max-w-prose space-y-4">
        <Reveal as="p">
          This site is designed and built to conform to{" "}
          <a
            href="https://www.w3.org/TR/WCAG22/"
            className="text-link underline underline-offset-4"
          >
            WCAG 2.2 Level AA
          </a>
          . Accessibility is the point of my work, so this site is also my
          test bench: every feature ships with keyboard support, screen
          reader semantics, visible focus indicators, AA color contrast, and
          a first-class <code className="font-mono text-sm">prefers-reduced-motion</code>{" "}
          experience.
        </Reveal>
      </div>

      <section aria-labelledby="measures-heading" className="mt-12">
        <RevealText
          as="h2"
          id="measures-heading"
          className="font-display text-h2 font-semibold"
        >
          What that means in practice
        </RevealText>
        <RevealStagger
          as="ul"
          className="mt-4 max-w-prose list-disc space-y-2 pl-6"
        >
          <li>Every page is fully operable with a keyboard alone, with no focus traps.</li>
          <li>Decorative motion — the 3D hero, parallax, smooth scrolling — is disabled when your system asks for reduced motion, with an equally polished static experience.</li>
          <li>Videos never autoplay with sound, only play while in view, and carry text alternatives.</li>
          <li>Color contrast meets or exceeds 4.5:1 for text and 3:1 for interface components in both dark and light modes.</li>
          <li>Automated axe-core checks run on every change; manual screen reader and keyboard testing back them up.</li>
        </RevealStagger>
      </section>

      <section aria-labelledby="issues-heading" className="mt-12">
        <RevealText
          as="h2"
          id="issues-heading"
          className="font-display text-h2 font-semibold"
        >
          Found an issue?
        </RevealText>
        <Reveal as="p" className="mt-4 max-w-prose">
          If anything on this site doesn’t work for you, that’s a bug I want
          to know about. Email{" "}
          <a
            href="mailto:jassimmohammed2910@gmail.com"
            className="text-link underline underline-offset-4"
          >
            jassimmohammed2910@gmail.com
          </a>{" "}
          and I’ll fix it — and credit you if you’d like.
        </Reveal>
      </section>
    </div>
  );
}
