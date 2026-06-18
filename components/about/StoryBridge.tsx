import { RevealStagger } from "@/components/motion/RevealStagger";

const SDLC = ["Plan", "Build", "Ship"];
const STLC = ["Strategy", "Execute", "Verify"];

function Lane({ kicker, steps }: { kicker: string; steps: string[] }) {
  return (
    <div className="rounded-card border border-border-soft bg-surface p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {kicker}
      </p>
      <ol className="mt-3 flex list-none flex-wrap items-center gap-x-2 gap-y-1 p-0">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-2 font-medium text-text">
            {step}
            {i < steps.length - 1 && (
              <span aria-hidden="true" className="text-text-muted">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * The SDLC ⇄ STLC bridge: a small accessible diagram showing how the AI
 * orchestration layer threads accessibility (ADA/WCAG) through both the build
 * and test lifecycles. Real text labels (not an image of text) + a figcaption
 * carry the meaning for screen readers; the connecting track is decorative
 * (aria-hidden) and its flowing sheen is CSS-only + motion-gated (globals.css).
 * Lanes reveal via the shared RevealStagger (transform-only, reduced-motion safe).
 */
export function StoryBridge() {
  return (
    <figure className="story-bridge mt-2">
      <div className="relative">
        <span aria-hidden="true" className="bridge-track" />
        <RevealStagger className="relative grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
          <Lane kicker="Build · SDLC" steps={SDLC} />

          <div className="grid place-items-center gap-1 rounded-card border border-border-soft bg-surface-2 px-5 py-4 text-center">
            <span aria-hidden="true" className="size-2 rounded-full bg-peach" />
            <span className="font-display text-base font-semibold text-text sm:text-lg">
              AI orchestration
            </span>
            <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
              ADA · WCAG woven in
            </span>
          </div>

          <Lane kicker="Test · STLC" steps={STLC} />
        </RevealStagger>
      </div>
      <figcaption className="mt-4 max-w-[60ch] text-sm text-text-muted">
        AI orchestration bridges the build (SDLC) and test (STLC) lifecycles —
        embedding WCAG/ADA conformance at every step, so accessibility is
        verified continuously instead of bolted on at the end.
      </figcaption>
    </figure>
  );
}
