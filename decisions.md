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

## Home intro — Work folder CTA

### D3a. "Work" word is split `W` + `ork`, not one centred word
- **Decision:** the giant faded "Work" behind the folder CTA is rendered as two absolutely-positioned spans — `W` pinned far-left and `ork` far-right via `justify-between` — rather than the reference's single centred `Work`.
- **Why:** guarantees true full-bleed (letters touch both edges at any width) and opens a clean centre gap for the folder, so the folder sits *between* the letters (`W | folder | ork`) instead of being overlaid on top of the word. The folder still overlaps the `o` edge, preserving the reference's read.
- **A11y:** decorative only (`aria-hidden`); the section's real name is the `aria-label="See my work"` + the sr-only link text.

### D3b. Folder is CSS-only, with stacked "project" sheets + a brand mark
- **Decision:** the CTA folder ([HomeIntro.tsx](components/hero/HomeIntro.tsx)) is layered CSS — `.folder-back`, a `.folder-papers` stack of three fanned/staggered sheets (`.paper-1` peach, `.paper-2` blue, `.paper-3` white w/ document rows), and a `.folder-front` flap carrying the "Portfolio" pill + a large translucent `.folder-mark`. No image assets (the reference used `folder-icon-*.png`).
- **Why:** matches the reference's "files peeking out of an open folder" look with zero new assets, themeable tokens, and reduced-motion safety for free. Opens on hover **and** `:focus-visible` (front tilts `rotateX`, papers lift); the global PRM backstop makes the open instant-but-motionless.
- **Contrast note:** the brand mark + Portfolio pill are white-ish text on the `.folder-front` *gradient* — axe returns *incomplete* (can't resolve a gradient to one colour), not a violation, so it never fails CI (same reasoning as [D3]).

## Navigation

### D4. Dynamic Island nav, with logo + theme toggle kept in the corners
- **Decision:** the centered nav is an iPhone-style "dynamic island" — collapsed pill (album art + EQ) that expands to reveal the links on hover / focus / tap. The **logo (left)** and **utilities + theme toggle (right)** stay in the header corners rather than folding into the island.
- **Why:** keeps the theme control and home link one tap away (not hidden behind a hover); also keeps the theme-toggle Playwright assertion (`toBeVisible`) valid since a `max-height:0` panel clips its contents to zero.
- **A11y:** links are always in the DOM + focusable (focus-within expands); a trigger `<button aria-expanded aria-controls>` covers touch; Escape + outside-tap dismiss → satisfies WCAG 1.4.13 (content on hover/focus). EQ static under reduced motion. Album art is a placeholder gradient (richer treatment planned).

### D4a. The island expands to a *functional* now-playing player, not a fake one
> **Reverted (2026-06-17, see [D4c]).** The player was archived; the expanded island now shows only the four enlarged nav links. Kept here for history.

- **Decision:** the expanded island stacks a real media player ([IslandPlayer.tsx](archive/IslandPlayer.tsx)) above a **centred** nav row. Every control is backed by an actual `<audio>` element — play/pause, prev/next, a seekable range slider, a like toggle, and AirPlay/cast via the Remote Playback API.
- **Why:** the user wanted the iOS now-playing mockup. A *fake* transport bar (control-shaped buttons that do nothing) is a UX dead end and an accessibility trap, so we made it genuinely work instead. Real controls are honest and screen-reader-operable.
- **A11y:** labelled `<button>`s; the progress bar is an `<input type=range>` named "Seek" with `aria-valuetext` time; a polite live region announces track changes; no autoplay (plays only on a user gesture — WCAG 1.4.2); play state mirrors the element. State is set in media-event handlers (not effect bodies) to satisfy the React-compiler rule ([D11]).
- **Copyright:** ships **original royalty-free** ambient loops (numpy + ffmpeg → `public/audio/*.mp3`, `preload="none"`). The "Intro · M83" label + gradient art are a visual homage, *not* the real recording/cover; `TRACKS` is swappable for licensed assets.
- **Nice-to-have that fell out:** the player lives in the layout, so audio keeps playing across client-side route changes.

### D4b. The collapsed EQ animates only when audio is really playing
> **Superseded (2026-06-17, see [D4c]).** With the player gone, the EQ loops continuously while minimised.

- **Decision:** the equaliser bars in the collapsed pill animate only under `.island[data-playing="true"]` (and motion-allowed); otherwise they're static. `IslandPlayer` reports real play state up via `onPlayingChange`.
- **Why:** an always-bouncing EQ on a silent player is a lie; gating it on real playback makes the pill an honest "now playing" indicator. (Previously it always animated under no-reduced-motion.)

### D4c. Reverted the in-island music player; expanded island is nav-only (2026-06-17)
> **Partly superseded (2026-06-17, see [D4d], [D4e]).** The expanded links are now spread (`space-between`), not centred, and the trigger no longer collapses to `height:0` — it crossfades. Kept here for history.

- **Decision:** removed the functional now-playing player from the dynamic island. The **collapsed** pill keeps the album-art chip + a **looping** equaliser (motion-allowed; static under reduced motion). On hover / focus / tap the island expands to show **only the four enlarged nav buttons** — the album art + EQ are hidden in the expanded view.
- **Why:** explicit user request — the player added UX/maintenance surface that didn't earn its place; the island should read as a clean nav with a tasteful "now playing"-style idle animation. A richer treatment (a 3D character / GSAP scroll animation) is planned instead (see [ai-sdlc.md](ai-sdlc.md)).
- **What moved:** [IslandPlayer.tsx](archive/IslandPlayer.tsx) was archived to `archive/` (excluded from `tsconfig.json` + `eslint.config.mjs`, with an `archive/README.md` restore note). The `.island-player` / `.ip-*` CSS and the `data-playing` plumbing were removed. The original royalty-free loops stay in `public/audio/` for future reuse.
- **Interaction note:** because the trigger (album art + EQ) collapses to `height:0` when expanded, hover-capable devices never click it (hover already expands); touch taps it to open and dismisses via Escape / outside-tap (WCAG 1.4.13). Tests drive the real paths (hover-expand + keyboard focus/Enter/Escape), not a fragile click on the collapsing trigger.
- **A11y:** unchanged guarantees — real `<nav aria-label="Main">`, always-focusable links, `aria-expanded`/`aria-controls` trigger, axe 0 violations on all 6 routes × 2 themes.

### D4d. Expanded island links spread edge-to-edge, not centred (2026-06-17)
- **Decision:** in the expanded island, `.island-nav ul` uses `justify-content: space-between` (with `padding: 8px 12px`, `gap: 4px`, `flex-wrap: nowrap`) so the four links span the full bar width — Home at the left end, About at the right. Reverses D4c's "centred" row.
- **Why:** explicit user request. Centring grouped the links in the middle of the 420px bar and left dead space flanking them ("the space is making to be seen not good"); spreading fills the bar and reads intentional.
- **A11y:** unchanged — links stay in a real `<nav>`, always focusable; only `justify-content` changed. The `e2e/a11y.spec.ts` island test now asserts `space-between` (was `center`).

### D4e. Island morph is jank-free: container box-morph + compositor crossfade (2026-06-17)
- **Decision:** the open/close animation no longer animates `max-height`/per-child `height`. Instead `.island` itself transitions `width` + `height` between collapsed (172×40) and expanded (`min(420px, 100vw−2rem)`×60) with `contain: layout` + `will-change: width, height`; the trigger (album art + EQ) and the `.island-panel` (links) are **absolutely stacked** (`position:absolute; inset:0`) and **crossfade on the compositor** (`opacity` + a small `translateY`). A shared **`--island-radius: 20px`** token drives both the expanded bar's `border-radius` and the active `.island-link`'s, so the active pill nests concentrically (collapsed pill stays `999px`).
- **Why:** the old approach ran three simultaneous layout-animated properties (`width` + `max-height` + trigger `height`) plus a flex re-wrap, thrashing the main thread → visible stutter; `max-height: 200px` also overshot the ~60px content so the easing felt broken. Box-morph + GPU crossfade is smooth, and `contain: layout` scopes the reflow to the pill.
- **A11y:** reduced-motion CSS backstop still zeroes the transition (instant open); focus-within / Escape / outside-tap paths and `aria-expanded` unchanged; no contrast change (bar stays solid `#0a0a0b`, white text, `blue-600` current).

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

## Content pages

### D13. About page is the supplied `About.html` content, re-tokenised
- **Decision:** [about/page.tsx](app/about/page.tsx) reproduces the user-supplied `About.html` **content + structure** (hero, The story, How I work 01–03, Toolkit, Accessibility statement) but built on the project's Tailwind v4 semantic tokens (`text-text`, `bg-surface`, `text-link`, `text-peach`, `font-display`…), **not** the standalone `jazxii.css` classes.
- **Why:** the standalone CSS uses a different token system (`--fs-h3`, `--display-accent`, `.principles`, `.chip`); porting it wholesale would fork the design system. Re-tokenising keeps one source of truth and the theme-aware AA guarantees.
- **Note:** the circular portrait is a decorative gradient placeholder (`aria-hidden`) until a real photo + alt text exists. The accessibility statement lives here at `id="accessibility"`.

### D14. New `/design-system` route is a living, self-proving style guide
- **Decision:** added a static `/design-system` page documenting tokens, contrast (two real `<table>`s with measured WCAG ratios for dark **and** light), type, spacing, radius/elevation, motion, components, and an 8-point "Accessibility rules" list with WCAG SC refs.
- **Why:** the PRD thesis is "accessible == beautiful"; a design system that publishes its own contrast math and is itself axe-clean in both themes is the proof. Color swatches use the live theme tokens so the palette re-themes; level badges use text (`AAA`/`AA`/`≥3:1 ✓`), never colour alone.
- **A11y:** one h1, ordered h2/h3, `<table>` with `<caption>` + `scope`, a demo field wired with `aria-invalid` + `aria-describedby`, focus-ring demo. Added to the axe route matrix (6 routes × 2 themes).

### D15. Footer links to the design system, not the accessibility statement
- **Decision:** the bookend footer's first nav link is now **Design system** (`/design-system`) instead of **Accessibility** (per user). The standalone `/accessibility` route is kept (still linked from the home hero, still axe-tested) and the statement is also reachable at `about#accessibility`.
- **Why:** explicit user request; the design-system page is the stronger credibility artefact, and the a11y statement remains reachable two other ways.

### D16. Diorama "● live" label is theme-aware (was a raw-peach AA failure)
- **Decision:** `.d-graph .live` no longer hard-codes `--color-peach-raw` (light peach `#F5A97E`). It keeps light peach on the dark card (~9.4:1) and overrides to burnt-orange `#9a3d12` on the light-mode beige card (~5.7:1) via the same three-block theme pattern used for tokens.
- **Why:** raw peach never darkens for light mode, so on the beige `--surface` card it measured **1.6:1** at 12px — a real, serious WCAG 1.4.3 failure (decorative `aria-hidden`, but axe checks contrast anyway, per [D3]). Pre-existing; surfaced by adding `/design-system` and re-running the full axe matrix. The semantic `--peach` terracotta would only reach ~4.25:1 on that card, so a dedicated darker value was needed.

## Motion — scroll reveals

### D17. Site-wide GSAP scroll-reveal system (2026-06-17)
- **Decision:** extend the home page's scroll-reveal feel to **every** route. Text "loads up" as you scroll and cards/lists appear in staggered batches, built on three reusable client primitives in [components/motion/](components/motion/): **`Reveal`** (block fade+rise), **`RevealText`** (per-line reveal via **SplitText**), **`RevealStagger`** (`ScrollTrigger.batch` over a list/grid's items). Plugins are registered once in [lib/gsap.ts](lib/gsap.ts); a single global **`SmoothScroll`** provider ([components/motion/SmoothScroll.tsx](components/motion/SmoothScroll.tsx)) runs one Lenis instance wired to ScrollTrigger.
- **Why now / tech:** GSAP went **100% free at v3.13** (Webflow, Apr 2025), so SplitText + ScrollSmoother now ship in the public `gsap` package (already on 3.15.0) with no auth — the formerly-paid SplitText is what makes the premium per-line reveal viable. Adopted **`@gsap/react`'s `useGSAP()`** (the current best practice): it runs setup in a layout effect and auto-reverts via `gsap.context()`, which is both FOUC-safe and cleanup-safe under React 19. Card reveals use `ScrollTrigger.batch()` (groups elements entering together — far cheaper than one trigger each).
- **Lenis consolidation:** smooth scroll was previously started per-component (`useLenis()` in `HomeIntro` + `WorkShowcase` → two separate instances). Now one global Lenis in the provider, synced the canonical way (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker` drives `lenis.raf`, `lagSmoothing(0)`), shared via [lib/lenisContext.ts](lib/lenisContext.ts). `HomeIntro`/`StoryLine` keep their existing reveals; `WorkShowcase` reads the shared instance for `scrollToAndFocus`.
- **A11y (the hard part):**
  - Reveals use **`opacity` only, never `autoAlpha`/visibility** — a not-yet-revealed block stays in the tab order and a11y tree, so keyboard/SR users can still reach card links inside it (focusing one scrolls it into view, firing the reveal). Hiding via `visibility` would drop them from the tab order = a keyboard trap-by-omission.
  - Initial hidden state is set **in JS inside `useGSAP`**, never in CSS — so reduced-motion / no-JS / failed-JS always renders fully visible (no invisible-content trap).
  - **`RevealText` only wraps plain-text headings** (no inline links): SplitText `aria: "auto"` puts the full string on an `aria-label` and `aria-hidden`s the line fragments, so AT reads one clean sentence; `autoSplit` re-splits after the `display:swap` font loads / on resize, and replays only once. Paragraphs with inline links use `Reveal`/`RevealStagger` (no splitting), preserving link semantics.
  - **Work project `<h2>`s stay un-hidden** — they're `tabIndex={-1}` focus targets for the index scroll-spy; an `opacity:0`+`visibility:hidden` heading can't receive focus, so on `/work` only non-focusable content blocks + media are revealed.
- **Perf:** content stays server-rendered (LCP = real text). `gsap`/`ScrollTrigger`/`SplitText` land in one shared client chunk cached across routes; Lenis is dynamically imported. Reduced motion = the global CSS backstop + the JS gate, so zero animation work runs.

### D18. About "The story" reworked to a persona narrative + two graphics (2026-06-18)
- **Decision:** rebuilt About → "The story" from text-only prose into a bespoke section that *shows* the persona, not just tells it: copy now frames the work as an **AI orchestrator for accessibility bridging ADA across the SDLC (build) and STLC (test) lifecycles** for streamlining/efficiency, plus a **keen eye for design/authenticity/aesthetics** and being an **active musician**. Two new graphics in [components/about/](components/about/): **`StoryBridge`** (an accessible SDLC ⇄ STLC bridge diagram) and **`OrchestrationGraph`** (a decorative neo4j-style node-graph motif in the heading rail, echoing the hero diorama).
- **Why:** user asked to convey this fuller persona with design + graphic components; the old copy omitted SDLC/STLC, music, and had no visuals.
- **A11y:** `StoryBridge` is a `<figure>` with **real text labels** (lane kickers + steps as a real `<ol>`) and a `<figcaption>` carrying the relationship — never an image-of-text; the connector track + flowing sheen are decorative (`aria-hidden`) and motion-gated. `OrchestrationGraph` is **shapes only, no text** (`aria-hidden`, `role="presentation"`), so there's nothing to contrast-check; its ring pulse is CSS + motion-gated. All labels meet AA (`text-text` / `text-text-muted` on surface tokens); the brand accent appears only as **non-text** (a peach dot, the `--accent` track) to avoid the peach-text-on-light AA shortfall from [D7]/[D16]. Reuses the transform-only reveal primitives ([D17]); lanes stagger in. axe 0 violations on `/about` × both themes confirmed.

### D19. Work opens as a full-screen hero; content panel scrolls up over it (2026-06-18)
- **Decision:** `/work` opens on a **full-screen statement hero** (the "Passionate about the craft and little details" headline + folder icon + a decorative left scroll-dots rail, Juan-Mora style). The hero is `position: sticky; top: 0`, and the project content lives in a `.work-panel` (`position: relative; z-index: 1`, opaque `--bg`, rounded top + soft top shadow) that **scrolls up and over** the held hero, carrying the cards from below. Pure CSS (sticky + stacking) — no JS/scroll-jacking, so it works under reduced motion (Lenis off → native scroll, same overlap).
- **Gotcha fixed — scroll-spy offset:** making `.work-panel` `position: relative` made it the **`offsetParent`** of the project `section`s, so their `offsetTop` no longer matched their document position — which broke the index-link `scrollToAndFocus` (it scrolled to the wrong/zero position). Fix in [lib/scroll.ts](lib/scroll.ts): compute the absolute target as `getBoundingClientRect().top + window.scrollY − 96` and pass that **number** to `lenis.scrollTo` (never the element), so a positioned ancestor can't mis-resolve it. Verified: index click scrolls + focuses + sets `aria-current`.
- **A11y:** `<h1>` is still present (a small "Work" eyebrow); the big headline is a `<p>` tagline (folder `aria-hidden`); the scroll-dots are decorative. axe 0 violations on `/work` × both themes; the `e2e` scroll-spy test passes.

## Tooling / process

### D11. ESLint (React-compiler rules) blocks the build — run it first
- `next build` (Next 16 + React 19) treats `react-hooks/set-state-in-effect` and `react-hooks/immutability` as **errors**, failing the build. Use `useSyncExternalStore` instead of setState-in-effect; mutate callback args/refs, not hook return values. (Also recorded in Claude memory.)

### D12. Verification loop
- Always: `npx tsc --noEmit` → `npx eslint` → `npm run build` → `npx playwright test` (server on **port 3210**, restart after rebuild) → preview screenshots. axe must be 0 violations in both themes; Lighthouse a11y = 1.0, perf ≥ 0.9.

### D20. Hold the ESLint 10 major (Dependabot ignore) (2026-06-18)
- **Decision:** pin **ESLint to `^9`** and tell Dependabot to ignore the ESLint major (`ignore` rule in `.github/dependabot.yml`). The rest of Dependabot's dev-deps PR (#7) is safe and was split into its own PR: **TypeScript 5→6, @types/node 20→25, @playwright/test 1.60→1.61, tailwind 4.3.0→4.3.1** (all pass tsc + eslint + build + Playwright).
- **Why:** `eslint-config-next@16.2.9` (pinned to the Next version) bundles an `eslint-plugin-react` that calls the **removed `context.getFilename()`** API, so ESLint 10 crashes `eslint` outright (`TypeError: contextOrFilename.getFilename is not a function`). It's invisible in CI because Next 16's `next build` doesn't lint, but it breaks `npm run lint` / the local verification loop (D12) and the React-compiler gate (D11). Revisit when a Next / `eslint-config-next` release declares ESLint 10 support.
- **Note:** the Playwright bump needs `npx playwright install` for the matching browser (CI does this); locally a stale browser shows as "Executable doesn't exist", not a real test failure.

---

## Still open (not yet decided)
- Real media (screenshots/recordings) for projects + playground; confirm playground links.
- Dynamic island "now playing"/album-art direction (3D model + media treatment).
- Whether to add per-project deep case-study pages later (architecture already supports `/work/[slug]`).
