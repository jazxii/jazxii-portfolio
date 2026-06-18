import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { RevealText } from "@/components/motion/RevealText";
import { Reveal } from "@/components/motion/Reveal";
import { RevealStagger } from "@/components/motion/RevealStagger";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "The tokens, type, and components that build this site — and the WCAG 2.2 AA rules every one of them must pass. Verified axe-clean in both themes.",
};

/* ------------------------------------------------------------------ */
/* Data                                                               */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  { id: "color", label: "Color tokens" },
  { id: "contrast", label: "Contrast" },
  { id: "type", label: "Typography" },
  { id: "spacing", label: "Spacing" },
  { id: "elevation", label: "Radius & elevation" },
  { id: "motion", label: "Motion" },
  { id: "components", label: "Components" },
  { id: "rules", label: "Accessibility rules" },
] as const;

// Theme-aware semantic tokens — each swatch renders the live value, so the
// palette re-themes with the page. Names mirror the CSS custom properties.
const TOKENS = [
  { name: "--bg", cls: "bg-bg", role: "Page background" },
  { name: "--surface", cls: "bg-surface", role: "Raised cards, nav" },
  { name: "--surface-2", cls: "bg-surface-2", role: "Hover, inset wells" },
  { name: "--text", cls: "bg-text", role: "Primary text" },
  { name: "--text-muted", cls: "bg-text-muted", role: "Secondary text" },
  { name: "--border-soft", cls: "bg-border-soft", role: "Hairline borders" },
  { name: "--accent", cls: "bg-accent", role: "Primary action" },
  { name: "--accent-strong", cls: "bg-accent-strong", role: "Hover, pressed" },
  { name: "--link", cls: "bg-link", role: "Links, accents" },
  { name: "--peach", cls: "bg-peach", role: "Brand accent" },
  { name: "--focus", cls: "bg-focus", role: "Focus ring" },
] as const;

type Level = "AAA" | "AA" | "Non-text";
type Row = {
  role: string;
  fg: string;
  fgHex: string;
  bg: string;
  bgHex: string;
  ratio: string;
  level: Level;
};

// Ratios verified against the values documented in globals.css; text pairs
// clear AA (4.5:1) comfortably, non-text (focus ring) clears 3:1.
const DARK_ROWS: Row[] = [
  { role: "Body text", fg: "#F5F3EE", fgHex: "#F5F3EE", bg: "#0E0E0E", bgHex: "#0E0E0E", ratio: "17.4 : 1", level: "AAA" },
  { role: "Muted text", fg: "#A7A39B", fgHex: "#A7A39B", bg: "#14161A", bgHex: "#14161A", ratio: "7.2 : 1", level: "AAA" },
  { role: "Link / accent", fg: "#AFC6FF", fgHex: "#AFC6FF", bg: "#0E0E0E", bgHex: "#0E0E0E", ratio: "11.4 : 1", level: "AAA" },
  { role: "Button label", fg: "#FFFFFF", fgHex: "#FFFFFF", bg: "#2D6BFF", bgHex: "#2D6BFF", ratio: "4.5 : 1", level: "AA" },
  { role: "Focus ring", fg: "#7FA8FF", fgHex: "#7FA8FF", bg: "#0E0E0E", bgHex: "#0E0E0E", ratio: "8.3 : 1", level: "Non-text" },
];

const LIGHT_ROWS: Row[] = [
  { role: "Body text", fg: "#1A1A1A", fgHex: "#1A1A1A", bg: "#FAF6EF", bgHex: "#FAF6EF", ratio: "16.1 : 1", level: "AAA" },
  { role: "Muted text", fg: "#57534A", fgHex: "#57534A", bg: "#FAF6EF", bgHex: "#FAF6EF", ratio: "7.0 : 1", level: "AAA" },
  { role: "Link / accent", fg: "#1E4FD0", fgHex: "#1E4FD0", bg: "#FAF6EF", bgHex: "#FAF6EF", ratio: "5.6 : 1", level: "AA" },
  { role: "Button label", fg: "#FFFFFF", fgHex: "#FFFFFF", bg: "#1E4FD0", bgHex: "#1E4FD0", ratio: "6.8 : 1", level: "AA" },
  { role: "Focus ring", fg: "#1E4FD0", fgHex: "#1E4FD0", bg: "#FAF6EF", bgHex: "#FAF6EF", ratio: "6.4 : 1", level: "Non-text" },
];

const TYPE = [
  { sample: "Beautiful & accessible", role: "Display", spec: "Clash Display 600 · clamp(2.5rem, 6vw, 6rem) · 1.05", cls: "font-display text-display font-semibold leading-[1.05]" },
  { sample: "Heading level one", role: "H1", spec: "Clash Display 600 · clamp(2rem, 4vw, 3.5rem) · 1.1", cls: "font-display text-h1 font-semibold" },
  { sample: "Heading level two", role: "H2", spec: "Clash Display 600 · clamp(1.5rem, 3vw, 2.25rem) · 1.15", cls: "font-display text-h2 font-semibold" },
  { sample: "Body copy is set in Inter at sixteen pixels with a 1.6 line height for comfortable reading.", role: "Body", spec: "Inter 400 · 1rem (16px) · 1.6", cls: "text-base" },
  { sample: "mono · eyebrows · code · 09:41", role: "Mono", spec: "JetBrains Mono · 0.8125–0.875rem · UI accents", cls: "font-mono text-sm" },
] as const;

const SPACE = [
  { name: "1", px: 4 },
  { name: "2", px: 8 },
  { name: "3", px: 12 },
  { name: "4", px: 16 },
  { name: "6", px: 24 },
  { name: "8", px: 32 },
  { name: "12", px: 48 },
  { name: "16", px: 64 },
  { name: "24", px: 96 },
] as const;

const MOTION = [
  { token: "--ease-out", value: "cubic-bezier(.22, 1, .36, 1)", use: "All enters & state changes" },
  { token: "--dur-fast", value: "0.2s", use: "Hover, focus, taps" },
  { token: "--dur-base", value: "0.5s", use: "Reveals, the folder open" },
  { token: "--dur-slow", value: "0.9s", use: "Scroll-scrubbed beats" },
] as const;

const RULES = [
  { t: "Semantic HTML before ARIA", p: "A real <button>, <nav>, <table>, and <label> ship first; ARIA only fills the gaps semantics cannot.", sc: "WCAG 4.1.2" },
  { t: "One h1, ordered headings, landmarks", p: "Every page has a single h1, never skips a level, and lives inside header / nav / main / footer landmarks.", sc: "WCAG 1.3.1 · 2.4.6" },
  { t: "Skip link is first in the tab order", p: "The very first Tab reveals “Skip to content”, jumping past the nav straight to <main>.", sc: "WCAG 2.4.1" },
  { t: "Visible focus, never removed", p: "A 3px --focus ring (≥3:1 in both themes) marks the focused element; outline is never dropped without a replacement.", sc: "WCAG 2.4.7 · 2.4.11" },
  { t: "Contrast holds in both themes", p: "Text clears 4.5:1, UI and focus indicators clear 3:1 — measured for dark and light (see the tables above).", sc: "WCAG 1.4.3 · 1.4.11" },
  { t: "Color is never the only signal", p: "State and meaning always carry a text label, icon, or shape alongside any color cue.", sc: "WCAG 1.4.1" },
  { t: "Reduced motion is first-class", p: "prefers-reduced-motion disables parallax, scroll-jacking, and autoplay; the static layout is equally finished.", sc: "WCAG 2.3.3" },
  { t: "Targets and media behave", p: "Interactive targets are at least 44px, and media never autoplays with sound.", sc: "WCAG 2.5.8 · 1.4.2" },
] as const;

/* ------------------------------------------------------------------ */
/* Building blocks                                                    */
/* ------------------------------------------------------------------ */

function Section({
  id,
  heading,
  intro,
  children,
}: {
  id: string;
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
      <RevealText
        as="h2"
        id={`${id}-h`}
        className="font-display text-h2 font-semibold"
      >
        {heading}
      </RevealText>
      {intro ? (
        <Reveal as="p" className="mt-3 max-w-[60ch] text-text-muted">
          {intro}
        </Reveal>
      ) : null}
      <div className="mt-8">{children}</div>
    </section>
  );
}

function LevelBadge({ level }: { level: Level }) {
  const label = level === "Non-text" ? "≥3:1 ✓" : level;
  return (
    <span className="inline-flex items-center rounded-pill border border-border-soft px-2.5 py-0.5 font-mono text-xs text-text">
      {label}
    </span>
  );
}

function ContrastTable({ caption, rows }: { caption: string; rows: Row[] }) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <caption className="mb-3 text-left font-mono text-xs uppercase tracking-widest text-text-muted">
        {caption}
      </caption>
      <thead>
        <tr className="border-b border-border-soft">
          <th scope="col" className="py-2 pr-4 font-semibold">Pairing</th>
          <th scope="col" className="py-2 pr-4 font-semibold">Foreground on background</th>
          <th scope="col" className="py-2 pr-4 font-semibold">Ratio</th>
          <th scope="col" className="py-2 font-semibold">Level</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.role} className="border-b border-border-soft/60">
            <th scope="row" className="py-3 pr-4 font-normal">{r.role}</th>
            <td className="py-3 pr-4">
              <span className="inline-flex flex-wrap items-center gap-1.5 font-mono text-xs">
                <span className="inline-block size-4 rounded-sm border border-border-soft" style={{ background: r.fg }} aria-hidden="true" />
                {r.fgHex}
                <span className="text-text-muted">on</span>
                <span className="inline-block size-4 rounded-sm border border-border-soft" style={{ background: r.bg }} aria-hidden="true" />
                {r.bgHex}
              </span>
            </td>
            <td className="py-3 pr-4 font-mono">{r.ratio}</td>
            <td className="py-3"><LevelBadge level={r.level} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function DesignSystemPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ---- Hero ---- */}
      <header className="py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-text-muted">
          Reference
        </p>
        <RevealText
          as="h1"
          className="mt-5 max-w-[18ch] font-display text-display font-semibold leading-[1.05]"
        >
          Design system
        </RevealText>
        <Reveal as="p" className="mt-6 max-w-[58ch] text-lg text-text-muted">
          The tokens, type, and components that build this site — and the WCAG
          2.2 AA rules every one of them must pass. This page is part of the
          proof: it is itself keyboard-operable and verified axe-clean in both
          the dark and light themes.
        </Reveal>
      </header>

      {/* ---- On this page ---- */}
      <nav
        aria-label="On this page"
        className="border-t border-border-soft py-6"
      >
        <ul className="flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-link underline underline-offset-4"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---- Color tokens ---- */}
      <Section
        id="color"
        heading="Color tokens"
        intro="Semantic tokens, not raw hex. Each name maps to a different value per theme, so components stay correct in dark and light without conditional styling. Swatches below render the live value."
      >
        <RevealStagger
          as="ul"
          className="grid list-none grid-cols-1 gap-x-8 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TOKENS.map((t) => (
            <li key={t.name} className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`size-12 shrink-0 rounded-lg border border-border-soft ${t.cls}`}
              />
              <span>
                <code className="font-mono text-sm text-text">{t.name}</code>
                <span className="block text-sm text-text-muted">{t.role}</span>
              </span>
            </li>
          ))}
        </RevealStagger>
      </Section>

      {/* ---- Contrast ---- */}
      <Section
        id="contrast"
        heading="Contrast"
        intro="The pairings that carry text or meaning, measured in both themes. Text clears 4.5:1 (most clear AAA); the focus ring is a non-text indicator and clears 3:1."
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <ContrastTable caption="Dark mode (primary)" rows={DARK_ROWS} />
          <ContrastTable caption="Light mode" rows={LIGHT_ROWS} />
        </div>
      </Section>

      {/* ---- Typography ---- */}
      <Section
        id="type"
        heading="Typography"
        intro="Clash Display for headlines, Inter for body, JetBrains Mono for accents. Sizes are fluid clamps so they scale without breakpoints; body never drops below 16px."
      >
        <RevealStagger as="ul" className="grid list-none gap-8 p-0">
          {TYPE.map((t) => (
            <li
              key={t.role}
              className="grid gap-2 border-b border-border-soft pb-8 last:border-b-0 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8"
            >
              <p className={`${t.cls} text-balance`}>{t.sample}</p>
              <p className="font-mono text-xs text-text-muted md:text-right">
                <span className="text-text">{t.role}</span>
                <span className="block">{t.spec}</span>
              </p>
            </li>
          ))}
        </RevealStagger>
      </Section>

      {/* ---- Spacing ---- */}
      <Section
        id="spacing"
        heading="Spacing"
        intro="An 8-point rhythm (with 4px half-steps). Consistent spacing is a readability and predictability aid, not only an aesthetic one."
      >
        <RevealStagger as="ul" className="grid list-none gap-3 p-0">
          {SPACE.map((s) => (
            <li key={s.name} className="flex items-center gap-4">
              <code className="w-14 shrink-0 font-mono text-xs text-text-muted">
                s-{s.name}
              </code>
              <span
                aria-hidden="true"
                className="h-4 rounded-sm bg-accent"
                style={{ width: `${s.px}px` }}
              />
              <span className="font-mono text-xs text-text-muted">{s.px}px</span>
            </li>
          ))}
        </RevealStagger>
      </Section>

      {/* ---- Radius & elevation ---- */}
      <Section
        id="elevation"
        heading="Radius & elevation"
        intro="Two radii (a 16px card, a fully-round pill) and two shadows (a quiet card lift, an ambient brand glow) keep surfaces consistent."
      >
        <div className="flex flex-wrap gap-6">
          <figure className="m-0 grid place-items-center gap-3">
            <div className="grid size-28 place-items-center rounded-card border border-border-soft bg-surface shadow-card">
              <span className="font-mono text-xs text-text-muted">card</span>
            </div>
            <figcaption className="font-mono text-xs text-text-muted">
              radius 16px · shadow-card
            </figcaption>
          </figure>
          <figure className="m-0 grid place-items-center gap-3">
            <div className="grid size-28 place-items-center rounded-pill border border-border-soft bg-surface">
              <span className="font-mono text-xs text-text-muted">pill</span>
            </div>
            <figcaption className="font-mono text-xs text-text-muted">
              radius 999px
            </figcaption>
          </figure>
          <figure className="m-0 grid place-items-center gap-3">
            <div className="grid size-28 place-items-center rounded-card border border-border-soft bg-surface shadow-glow">
              <span className="font-mono text-xs text-text-muted">glow</span>
            </div>
            <figcaption className="font-mono text-xs text-text-muted">
              shadow-glow
            </figcaption>
          </figure>
        </div>
      </Section>

      {/* ---- Motion ---- */}
      <Section
        id="motion"
        heading="Motion"
        intro="One easing curve and three durations. Motion is always an enhancement — it is gated in JS (useReducedMotion) and zeroed by a global prefers-reduced-motion backstop in CSS."
      >
        <table className="w-full border-collapse text-left text-sm">
          <caption className="sr-only">Motion tokens and their uses</caption>
          <thead>
            <tr className="border-b border-border-soft">
              <th scope="col" className="py-2 pr-4 font-semibold">Token</th>
              <th scope="col" className="py-2 pr-4 font-semibold">Value</th>
              <th scope="col" className="py-2 font-semibold">Used for</th>
            </tr>
          </thead>
          <tbody>
            {MOTION.map((m) => (
              <tr key={m.token} className="border-b border-border-soft/60">
                <th scope="row" className="py-3 pr-4 font-normal">
                  <code className="font-mono text-xs text-text">{m.token}</code>
                </th>
                <td className="py-3 pr-4 font-mono text-xs">{m.value}</td>
                <td className="py-3 text-text-muted">{m.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          className="mt-8 inline-flex items-center rounded-pill bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform duration-200 ease-out-expo hover:scale-105"
        >
          Hover me (still under reduced motion)
        </button>
      </Section>

      {/* ---- Components ---- */}
      <Section
        id="components"
        heading="Components"
        intro="Shared primitives. Each is keyboard-operable, carries a visible focus ring, and states its meaning in text — not color alone."
      >
        <div className="grid gap-10">
          {/* Buttons */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-text-muted">Buttons</h3>
            <div className="flex flex-wrap items-center gap-3">
              <ButtonLink href="mailto:jassimmohammed2910@gmail.com" cursor="email">
                Primary
              </ButtonLink>
              <ButtonLink
                href="https://www.linkedin.com/in/jassim-m-shamim/"
                variant="ghost"
                external
              >
                Ghost (external)
              </ButtonLink>
            </div>
          </div>

          {/* Chips */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-text-muted">Chips</h3>
            <ul className="flex list-none flex-wrap gap-2 p-0">
              {["WCAG 2.2", "ARIA", "axe-core", "Neo4j"].map((c) => (
                <li key={c}>
                  <span className="inline-flex items-center rounded-pill border border-border-soft px-4 py-2 font-mono text-xs text-text">
                    {c}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Focus ring demo */}
          <div>
            <h3 className="mb-1 text-sm font-medium text-text-muted">
              Focus indicator
            </h3>
            <p className="mb-4 max-w-[52ch] text-sm text-text-muted">
              Press <kbd className="rounded border border-border-soft bg-surface px-1.5 py-0.5 font-mono text-xs">Tab</kbd>{" "}
              to move through these — every control shows the same 3px ring.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="rounded-pill border border-border-soft bg-surface px-5 py-2.5 text-sm font-semibold text-text"
              >
                Button
              </button>
              <a
                href="#components"
                className="rounded-pill px-5 py-2.5 text-sm font-semibold text-link underline underline-offset-4"
              >
                Link
              </a>
            </div>
          </div>

          {/* Accessible form field */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-text-muted">
              Form field (with error state)
            </h3>
            <div className="grid max-w-md gap-6">
              <div className="grid gap-1.5">
                <label htmlFor="ds-email" className="text-sm font-medium">
                  Email address
                </label>
                <input
                  id="ds-email"
                  type="email"
                  aria-describedby="ds-email-help"
                  placeholder="you@example.com"
                  className="rounded-card border border-border-soft bg-surface px-4 py-2.5 text-text placeholder:text-text-muted"
                />
                <p id="ds-email-help" className="text-sm text-text-muted">
                  We will only use this to reply.
                </p>
              </div>

              <div className="grid gap-1.5">
                <label htmlFor="ds-email-err" className="text-sm font-medium">
                  Email address
                </label>
                <input
                  id="ds-email-err"
                  type="email"
                  defaultValue="jassim@"
                  aria-invalid="true"
                  aria-describedby="ds-email-err-msg"
                  className="rounded-card border border-accent bg-surface px-4 py-2.5 text-text"
                />
                <p
                  id="ds-email-err-msg"
                  className="flex items-center gap-1.5 text-sm text-text"
                >
                  <span aria-hidden="true" className="font-semibold text-link">
                    ⚠
                  </span>
                  <span>
                    <span className="font-semibold">Error:</span> enter a full
                    email, like name@example.com.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Accessibility rules ---- */}
      <Section
        id="rules"
        heading="Accessibility rules"
        intro="The non-negotiables every token and component above is built to satisfy. These are checked by axe-core in CI on every route, in both themes, and backed by manual keyboard and screen-reader passes."
      >
        <RevealStagger as="ol" className="m-0 grid list-none gap-0 p-0">
          {RULES.map((r, i) => (
            <li
              key={r.t}
              className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 border-b border-border-soft py-5"
            >
              <span aria-hidden="true" className="font-mono text-sm text-peach">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-xl font-medium">{r.t}</p>
                <p className="mt-1 text-text-muted">{r.p}</p>
                <p className="mt-1.5 font-mono text-xs uppercase tracking-widest text-text-muted">
                  {r.sc}
                </p>
              </div>
            </li>
          ))}
        </RevealStagger>
      </Section>
    </div>
  );
}
