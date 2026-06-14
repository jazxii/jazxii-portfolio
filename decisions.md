# Decisions — jazxii-portfolio

Key technical/design decisions and their rationale. Each entry: what was decided, why, and any tradeoff or reversal. Newest-relevant first within sections.

---

## Hero & 3D

### D1. Hero is CSS-3D, not WebGL (reversed an earlier choice)
- **Decision:** the hero "creative technologist's desk" is a pure **CSS 3D transform** diorama ([Diorama.tsx](components/hero/Diorama.tsx)) — a neo4j WCAG graph card, a Figma ADA-review frame, an auditor terminal, and a contrast chip on a tilted `preserve-3d` plane.
- **History:** initially built as **WebGL via React Three Fiber** (a frosted "JS" monogram). The user then provided a reference image + HTML for the CSS diorama and chose to **remove WebGL entirely**.
- **Why:** matches the supplied reference; zero 3D dependencies (uninstalled `three`/`@react-three/fiber`/`@react-three/drei`); stays on the PRD perf budget; static + reduced-motion-safe for free.
- **Tradeoff:** less "wow" than real WebGL, but lighter and exactly the requested look.

### D2. Diorama tilt follows the mouse across the whole page
- **Decision:** the parallax `pointermove` listener is on `window` (not the diorama element), so the plane tilts from the mouse position anywhere on the page.
- **Why:** explicit user request; feels more alive.
- **Guardrails:** `pointer: fine` + motion-allowed only; rAF-throttled; rests at `rotateX(12) rotateY(-11)`.

### D3. Diorama is decorative but must still pass contrast
- **Decision:** `.scene` is `aria-hidden`, but its text colours meet WCAG AA anyway.
- **Why:** axe-core checks color-contrast on visible text **even inside `aria-hidden`**. The entrance opacity fade caused axe to sample mid-animation (white-on-blue → 2.17), so the **fade was removed** and the tag/button use `--color-blue-600` (white text ≥ 4.5:1).

## Navigation

### D4. Dynamic Island nav, with logo + theme toggle kept in the corners
- **Decision:** the centered nav is an iPhone-style "dynamic island" — collapsed pill (album art + EQ) that expands to reveal the links on hover / focus / tap. The **logo (left)** and **utilities + theme toggle (right)** stay in the header corners rather than folding into the island.
- **Why:** keeps the theme control and home link one tap away (not hidden behind a hover); also keeps the theme-toggle Playwright assertion (`toBeVisible`) valid since a `max-height:0` panel clips its contents to zero.
- **A11y:** links are always in the DOM + focusable (focus-within expands); a trigger `<button aria-expanded aria-controls>` covers touch; Escape + outside-tap dismiss → satisfies WCAG 1.4.13 (content on hover/focus). EQ static under reduced motion. Album art is a placeholder gradient (richer treatment planned).

### D5. Island is absolutely centered to avoid layout shift
- **Decision:** `.island-wrap` is `position: absolute; left: 50%` inside the sticky header; expanding changes width/height without pushing the logo/utilities (which sit above it at higher z-index).

## Theme

### D6. System-default theme with an explicit override
- **Decision:** dark is primary. The site follows `prefers-color-scheme` by default; the toggle writes an explicit choice to `localStorage` + `<html data-theme>`.
- **CSS:** three blocks — `:root` (dark), `:root[data-theme="light"]` (explicit), and `@media (prefers-color-scheme: light) :root:not([data-theme])` (system, no-JS fallback). A no-FOUC `<head>` script applies a stored choice before paint.
- **D6a. Hydration:** the init script mutates `<html>` before React hydrates → `suppressHydrationWarning` on `<html>` is the correct, intended fix (not a workaround).

### D7. Peach is a theme-aware accent
- **Decision:** `--peach` = light peach (`#F5A97E`) on dark, terracotta (`#B3501F`) on beige.
- **Why:** light peach text fails AA on the beige light surface; the giant wordmark/brand dot need a darker peach in light mode. Diorama internals keep literal `#F5A97E` because they sit on dark card surfaces.

## Accessibility (cross-cutting)

### D8. Motion is gated in JS *and* CSS; decorative motion never blocks content
- `useReducedMotion` / `useMediaQuery` (via `useSyncExternalStore`) gate JS animations; a global `@media (prefers-reduced-motion: reduce)` CSS backstop zeroes durations.
- The scroll story line is **not rendered** under reduced motion; the custom cursor mounts only on `pointer: fine` + motion-allowed; the EQ bars are static under reduced motion.

### D9. Projects without a public link show a context badge
- **Decision:** internal/research work (Accessibility AI Platform, Albertsons, ISRO) renders an "Internal platform" / "Client engagement" / "Research project" pill instead of a dead "View live" button. Only ENIGMA 8.0 has a real public (Play Store) link.

### D10. Ambient backdrop is global and contrast-safe
- **Decision:** the blue top-glow + film grain renders on **every route** (moved to `layout.tsx`), fixed + decorative + behind content. It never changes measured text contrast (axe computes against the solid surface, not the overlay).

## Tooling / process

### D11. ESLint (React-compiler rules) blocks the build — run it first
- `next build` (Next 16 + React 19) treats `react-hooks/set-state-in-effect` and `react-hooks/immutability` as **errors**, failing the build. Use `useSyncExternalStore` instead of setState-in-effect; mutate callback args/refs, not hook return values. (Also recorded in Claude memory.)

### D12. Verification loop
- Always: `npx tsc --noEmit` → `npx eslint` → `npm run build` → `npx playwright test` (server on **port 3210**, restart after rebuild) → preview screenshots. axe must be 0 violations in both themes; Lighthouse a11y = 1.0, perf ≥ 0.9.

---

## Still open (not yet decided)
- Real media (screenshots/recordings) for projects + playground; confirm playground links.
- Dynamic island "now playing"/album-art direction (3D model + media treatment).
- Whether to add per-project deep case-study pages later (architecture already supports `/work/[slug]`).
