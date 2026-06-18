/**
 * Decorative node-graph motif for the About story — an abstract "AI
 * orchestrator" cluster (a central hub routing to satellite agents),
 * echoing the hero diorama's neo4j graph card. Purely shapes, no text, so
 * there's nothing for axe to contrast-check; aria-hidden + presentation role
 * keep it out of the a11y tree (the surrounding prose carries the meaning).
 * The gentle ring pulse is CSS-only and motion-gated (globals.css).
 */
export function OrchestrationGraph({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 160 120"
      fill="none"
      aria-hidden="true"
      role="presentation"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* edges from the hub to each agent */}
      <g stroke="var(--accent)" strokeOpacity="0.45" strokeWidth="1.5">
        <line x1="80" y1="60" x2="26" y2="26" />
        <line x1="80" y1="60" x2="134" y2="30" />
        <line x1="80" y1="60" x2="28" y2="96" />
        <line x1="80" y1="60" x2="130" y2="94" />
      </g>

      {/* satellite agents */}
      <g fill="var(--surface-2)" stroke="var(--accent)" strokeWidth="1.5">
        <circle cx="26" cy="26" r="7" />
        <circle cx="134" cy="30" r="7" />
        <circle cx="28" cy="96" r="7" />
        <circle cx="130" cy="94" r="7" />
      </g>

      {/* pulsing ring + central orchestrator node */}
      <circle
        className="orch-ring"
        cx="80"
        cy="60"
        r="18"
        stroke="var(--peach)"
        strokeOpacity="0.5"
        strokeWidth="1.5"
      />
      <circle cx="80" cy="60" r="11" fill="var(--peach)" />
    </svg>
  );
}
