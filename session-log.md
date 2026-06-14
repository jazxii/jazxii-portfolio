# Session Log — jazxii-portfolio

Chronological record of work done with Claude Code. Newest phase last.
Date: 2026-06-14. Stack: Next.js 16.2.9 (App Router, Turbopack) · React 19.2.4 · Tailwind v4 · GSAP + ScrollTrigger + Lenis. Dev/preview on **port 3210**.

---

## Phase 1 — PRD gap analysis + first build

**Goal:** verify the site against [jazxii-portfolio-PRD.md](jazxii-portfolio-PRD.md), close the gaps, add the reference-site signatures (William Le 3D entry, Juan Mora scroll line), and replace placeholder content with real LinkedIn data.

- Read the PRD + audited the codebase; scraped `williamle.design` and `juanmora.co` (Firecrawl token was invalid → used `curl` + HTML inspection) to pin down the real techniques.
- **Content overhaul** — replaced 4 placeholder projects with real work in [content/projects.ts](content/projects.ts): Accessibility AI Platform (Cognizant), Albertsons WCAG 2.2 Program, ENIGMA 8.0 (real Play Store link), ISRO 70KV SiC IGBT Switch Matrix. Added a `context` badge field + period line; [ProjectSection.tsx](components/work/ProjectSection.tsx) shows "Internal platform"/"Research project" when there's no public link. Replaced 8 playground items in [content/playground.ts](content/playground.ts). Rewrote bio on [about/page.tsx](app/about/page.tsx) (AI/LLM R&D, Ex-ISRO, Claude Certified Architect, languages). Generated on-brand placeholder SVGs; removed 12 orphaned ones.
- **Hand-drawn signature** (`Signature.tsx`) — cursive "Jassim" drawn via `stroke-dashoffset` (pure CSS). *(Removed later in Phase 2.)*
- **Scroll story line** ([StoryLine.tsx](components/hero/StoryLine.tsx)) — SVG thread drawn on scroll with a pen-tip dot.
- **WebGL 3D hero** (`Hero3DScene.tsx` + `Hero.tsx`) — React Three Fiber frosted "JS" monogram, gated + code-split. *(Removed later in Phase 2.)*
- **Chrome polish** — custom cursor ([Cursor.tsx](components/chrome/Cursor.tsx)), light/dark theme toggle ([ThemeToggle.tsx](components/chrome/ThemeToggle.tsx) + [lib/theme.ts](lib/theme.ts)), ambient blue glow + film grain.
- **Tests** — extended [e2e/a11y.spec.ts](e2e/a11y.spec.ts) (axe both themes, reduced-motion safety, theme persistence, context badge).
- **Lint gotcha** — `next build` runs ESLint and fails on React-compiler rules (`react-hooks/set-state-in-effect`, `react-hooks/immutability`). Refactored to `useSyncExternalStore` ([lib/useMediaQuery.ts](lib/useMediaQuery.ts)) and callback-arg mutation. Saved to memory.
- ✅ tsc + eslint clean, build green, 18/18 Playwright tests, axe 0 violations.

## Phase 2 — Pivot: CSS diorama hero (per reference image)

**Trigger:** user supplied an image + HTML for a **CSS-3D diorama** hero (graph card / Figma frame / terminal / contrast chip) and asked to remove the signature. Decision: replace the WebGL monogram entirely.

- **Removed WebGL** — deleted `Hero3DScene.tsx`, `Hero.tsx`, `Hero3D.tsx`; uninstalled `three`, `@react-three/fiber`, `@react-three/drei`, typeface.
- **Removed signature** — deleted `Signature.tsx` + usages + CSS.
- **New hero** ([app/page.tsx](app/page.tsx)) — two-column first screen: eyebrow → giant peach `jazxii` wordmark → meta row → `<h1>` → mono sub-link; right column = [Diorama.tsx](components/hero/Diorama.tsx) (the provided HTML as CSS-3D layers).
- **Story line** — moved to page root, spans the whole home route with a descending pen-tip pointer.
- **Nav redesign** ([Nav.tsx](components/chrome/Nav.tsx)) — `jazxii.` logo (peach dot) · centered pill · `Email/in/gh` + 12-hr clock + theme toggle; responsive (two-row mobile). Theme toggle → "Light mode"/"Dark mode" text (icon on mobile). [LiveClock.tsx](components/chrome/LiveClock.tsx) → 12-hr local.
- **Peach token** added (theme-aware: light peach on dark, terracotta on beige for AA).
- **axe fix** — diorama is `aria-hidden` but axe still checks its text contrast; the opacity fade-in was sampled mid-animation (white-on-blue → 2.17). Removed the fade; darkened tag/button to `--color-blue-600`.
- ✅ build green, 18/18 tests, verified hero/work/playground/about + light mode + mobile via preview.

## Phase 3 — Diorama box, page-wide tilt, W|folder|ork

- **UX ADA box** — gave `.d-fig` a filled rounded background + the "Add to cart" focus-ring demo (per a closer reference crop).
- **Page-wide tilt** — diorama parallax listener moved from the scene element to `window`; the plane now tilts from mouse position anywhere on the page. Verified transform changes across the viewport.
- **Folder CTA** — rebuilt to "W [folder] ork" with flanking big letters; GSAP `.cta-big-word` drift replaced with a `.work-letter` rise.
- ✅ build green, 18/18 tests.

## Phase 4 — Full-width watermark, global ambient, dynamic island, hydration fix

- **Full-width "Work" watermark** — `W` pinned far-left, `ork` far-right (~460px, faded peach), folder centered in the gap (Juan reference). [HomeIntro.tsx](components/hero/HomeIntro.tsx).
- **Ambient on every route** — moved `.ambient` (blue top-glow + grain) from page.tsx into [layout.tsx](app/layout.tsx). Verified on `/about`.
- **Dynamic Island nav** — centered nav is now an iPhone-style island: collapsed black pill (simple album-art gradient + animated EQ bars) that morphs/expands downward on hover, focus-within, or tap to reveal the nav links. Keyboard-accessible, Escape/outside-tap dismiss (WCAG 1.4.13), EQ static under reduced motion. Logo + theme toggle stay in the corners.
- **Hydration fix** — added `suppressHydrationWarning` to `<html>` (the no-FOUC theme script sets `data-theme` before hydration). Console clean.
- ✅ tsc + eslint clean, build green, 18/18 tests, axe 0 violations, zero console errors.

---

## Current state

- Routes: `/`, `/work`, `/playground`, `/about`, `/accessibility` — all static.
- Hero: CSS-3D diorama (no WebGL deps). Nav: dynamic island. Ambient glow + custom cursor + theme toggle global.
- Verification: `npx tsc --noEmit`, `npx eslint`, `npm run build`, `npx playwright test` (server on 3210; restart after rebuild).

## Open / next

- Replace placeholder project + playground **media** (SVGs) with real screenshots/recordings.
- Confirm playground links (several point to LinkedIn as stand-ins).
- Dynamic island: richer album art / "now playing" + planned 3D-model treatment.
- Nothing committed yet — all changes are in the working tree.
