import { ButtonLink } from "@/components/ui/Button";
import { FooterBanner } from "./FooterBanner";
import { asset } from "@/lib/asset";

const EMAIL = "jassimmohammed2910@gmail.com";

/**
 * Shared bookend: identical closing moment on every route (PRD §5.4) —
 * one CTA card + a full-bleed cinematic sign-off banner. The footer itself
 * carries no horizontal padding so the banner can bleed edge-to-edge; the
 * CTA card supplies its own gutter.
 */
export function BookendFooter() {
  return (
    <footer className="mt-24">
      <div className="px-4 sm:px-6">
        <section
          aria-labelledby="cta-heading"
          className="mx-auto max-w-5xl rounded-card border border-border-soft bg-surface p-8 text-center shadow-glow sm:p-16"
        >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={asset("/media/memoji-hearts.png")}
          alt=""
          aria-hidden="true"
          width={128}
          height={128}
          decoding="async"
          loading="lazy"
          className="mx-auto mb-5 size-24 object-contain sm:size-28"
        />
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
      </div>

      <FooterBanner />
    </footer>
  );
}
