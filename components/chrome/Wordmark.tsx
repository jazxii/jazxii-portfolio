/**
 * Placeholder wordmark. Swap the inner text for the designed logo
 * (SVG) when ready — keep an accessible name on the link in Nav.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-semibold tracking-tight lowercase ${className}`}
    >
      jazxii
    </span>
  );
}
