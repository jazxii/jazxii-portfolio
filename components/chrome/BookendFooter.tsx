import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "./Wordmark";

const EMAIL = "jassimmohammed2910@gmail.com";

/**
 * Shared bookend: identical closing moment on every route (PRD §5.4) —
 * one CTA card + large wordmark footer.
 */
export function BookendFooter() {
  return (
    <footer className="mt-24 px-4 pb-10 sm:px-6">
      <section
        aria-labelledby="cta-heading"
        className="mx-auto max-w-5xl rounded-card border border-border-soft bg-surface p-8 text-center shadow-glow sm:p-16"
      >
        <h2 id="cta-heading" className="font-display text-h2 font-semibold">
          Let’s build something inclusive together
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-text-muted">
          Open to accessibility engineering and creative technology roles,
          audits, and collaborations.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={`mailto:${EMAIL}`} variant="primary" cursor="email">
            Email me
          </ButtonLink>
          <ButtonLink
            href="https://www.linkedin.com/in/jassim-m-shamim/"
            variant="ghost"
            external
          >
            LinkedIn
          </ButtonLink>
          <ButtonLink href="https://github.com/jazxii" variant="ghost" external>
            GitHub
          </ButtonLink>
        </div>
      </section>

      <div className="mx-auto mt-16 flex max-w-5xl flex-col items-center gap-6">
        <p aria-hidden="true" className="font-display text-display font-semibold leading-none">
          <Wordmark />
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <li>
              <Link href="/accessibility" className="text-link underline underline-offset-4">
                Accessibility
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-link underline underline-offset-4">
                About
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="text-link underline underline-offset-4"
              >
                {EMAIL}
              </a>
            </li>
          </ul>
        </nav>
        <p className="text-sm text-text-muted">
          © {new Date().getFullYear()} Jassim M. Shamim · Built to WCAG 2.2 AA
        </p>
      </div>
    </footer>
  );
}
