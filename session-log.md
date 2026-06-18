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

## Phase 5 — Work folder CTA fidelity pass (per Juan Mora reference)

**Trigger:** user supplied the Juan Mora "Curious?… Check out my **Work**" reference (image + HTML) and the rule "the folder is **not on top** — it sits inline as `W | folder | ork`, full bleed."

- **Layout audit first** — verified the existing `.intro-folder-cta` already renders the requested arrangement: giant faded `W` pinned far-left + `ork` far-right (`justify-between`, `clamp(9rem,32vw,34rem)`, peach @ 0.16) with the folder centred in the gap, overlapping the `o` (not overlaid on top). Confirmed full-bleed across 728/1440/1920 widths in both themes. No layout change needed.
- **Folder fidelity** — the one real gap vs the reference was the folder itself. Rebuilt `.folder-papers` from a single lined sheet into **3 stacked "project" sheets** (`.paper-1` peach, `.paper-2` blue, `.paper-3` white w/ document rows), fanned + staggered so the coloured top edges peek above the front flap (files-in-folder look). Added a large translucent centred **brand mark** (`.folder-mark`, white @ 0.2) on the front, replacing the tiny corner `jz`. [HomeIntro.tsx](components/hero/HomeIntro.tsx) + [globals.css](app/globals.css).
- **Interaction intact** — the existing hover/`:focus-visible` open (front tilts `rotateX`, papers lift) still drives the new `.folder-papers` container; Playwright "folder CTA opens on hover and on keyboard focus" stays green.
- **A11y** — whole `.folder-stage` is `aria-hidden`; new sheets are decorative (no text); brand mark + Portfolio pill sit on the gradient front, so axe reports them *incomplete* (gradient bg), never a violation. No contrast regression.
- ✅ tsc + eslint clean, build green, 18/18 tests, axe 0 violations both themes, console clean; verified light + dark in preview.

## Phase 6 — About page rewrite + Design System page + footer swap

**Trigger:** user supplied `About.html` + `jazxii.css` ("keep the about page content based on this") and asked for an "entire Design System page … based on everything and ADA", linked from the footer **instead of** Accessibility.

- **About page** ([about/page.tsx](app/about/page.tsx)) — rebuilt to the `About.html` content using project tokens (not the standalone `jazxii.css`): hero (eyebrow → h1 "Beautiful and accessible are the same goal." → intro → decorative circular portrait placeholder), a two-column rail layout for **The story**, **How I work** (numbered 01–03 principles), **Toolkit** (grouped skill chips), and the **Accessibility statement** absorbed in as a section with `id="accessibility"`. One h1, ordered h2s.
- **Design System page** ([design-system/page.tsx](app/design-system/page.tsx)) — new `/design-system` route, a static living style guide: "On this page" nav; **Color tokens** (theme-aware live swatches); **Contrast** (two real `<table>`s, dark + light, with measured WCAG ratios + level badges, color never the only signal); **Typography** specimens; 8-pt **Spacing**; **Radius & elevation**; **Motion** tokens + reduced-motion note; **Components** (buttons, chips, focus-ring demo, an accessible field with a proper error state via `aria-invalid`/`aria-describedby`); and an **Accessibility rules** section (8 non-negotiables with WCAG SC refs). One h1, logical h2/h3.
- **Footer** ([BookendFooter.tsx](components/chrome/BookendFooter.tsx)) — replaced the "Accessibility" link with **"Design system"** (`/design-system`). The standalone `/accessibility` route stays (still linked from the home hero + tested); the statement also lives on `about#accessibility`.
- **Incidental a11y fix (pre-existing):** the diorama's "● live" label (`.d-graph .live`) used `--color-peach-raw` (raw light peach `#F5A97E`), which never darkens for light mode → **1.6:1** on the beige card in light mode (a real, serious axe failure surfaced by the stricter run). Made it theme-aware: light peach on the dark card (9.4:1), burnt-orange `#9a3d12` on the light card (5.7:1). Both clear AA.
- **Tests** — added `/design-system` to the axe route matrix in [e2e/a11y.spec.ts](e2e/a11y.spec.ts) (now 6 routes × 2 themes).
- ✅ tsc + eslint clean, build green (9 static routes), **20/20** Playwright (axe 0 violations on all 6 routes × dark+light), console clean; verified About + Design System in light & dark via preview.

## Phase 7 — Dynamic island becomes a real "now playing" player + centered nav

**Trigger:** user asked to (a) centre the four nav links when the island expands, and (b) show a now-playing screen on top (per an iOS media-player mockup) — and decided the controls should **actually play real music**, with nav below.

- **UX call (asked + agreed):** a fake transport bar would be a control-shaped dead end + a11y trap, so the player is **fully functional** instead — real `<audio>`, no fake buttons.
- **Original audio (no copyright):** generated 3 short ambient loops via numpy + ffmpeg → [public/audio/](public/audio/) (`intro/drift/halcyon.mp3`, ~120–145 KB each, `preload="none"`). The "Intro · M83" label is a visual homage only — NOT the real recording/cover (both copyrighted); `TRACKS` is trivially swappable for licensed assets.
- **Player** ([IslandPlayer.tsx](components/chrome/IslandPlayer.tsx)) — real play/pause, prev/next (prev restarts if past 3s), a **seekable** progress slider (`<input type=range>` filled to `--pct`, with `aria-valuetext` time), star=like toggle (`aria-pressed`), and AirPlay/cast via the Remote Playback API (announces a fallback where unsupported — never a silent dead button). All controls are labelled `<button>`s; a polite live region announces track changes ("Now playing: …"). No autoplay; only plays on a user gesture. State updates happen in media-event handlers, not effect bodies (keeps the React-compiler `set-state-in-effect` rule green).
- **Island wiring** ([Nav.tsx](components/chrome/Nav.tsx) + [globals.css](app/globals.css)) — the expanded panel now stacks the player above a **centred** nav row (`.island-nav ul { justify-content: center }`); island widened to `min(440px, 100vw−2rem)`. The collapsed **EQ animates only when audio is genuinely playing** (`.island[data-playing="true"]`, motion-allowed) — `IslandPlayer` reports play state up via `onPlayingChange`. Audio persists across client-side route changes (Nav lives in the layout), so music keeps playing as you navigate.
- **Tests** — added an "island music player" describe block to [e2e/a11y.spec.ts](e2e/a11y.spec.ts): labelled controls + named Seek slider + centred nav + track-switch, and a real-audio Play→Pause assertion (3×0 flakes).
- ✅ tsc + eslint clean, build green (9 static routes), **22/22** Playwright (axe 0 violations 6 routes × 2 themes + 2 player tests), console clean; verified real playback / seek / next / live-region / EQ-gating in preview.

---

## Phase 8 — Revert + archive the in-island music player; nav-only expanded island

**Trigger:** user asked to revert and archive the now-playing player. Minimised island keeps album art + a looping music animation; expanded island shows **only the four enlarged nav buttons** (no album art / player). A 3D-character / animation treatment is planned for later.

- **Nav** ([Nav.tsx](components/chrome/Nav.tsx)) — removed the `IslandPlayer` import, the `playing` state, and the `data-playing` attribute. The trigger keeps the album-art chip + EQ; the expanded `.island-panel` now contains only the `<nav>` links.
- **Archived player** — moved `components/chrome/IslandPlayer.tsx` → [archive/IslandPlayer.tsx](archive/IslandPlayer.tsx) with an [archive/README.md](archive/README.md) restore note. Excluded `archive/**` from [tsconfig.json](tsconfig.json) + [eslint.config.mjs](eslint.config.mjs) so it never re-enters the build/lint pipeline. Original royalty-free loops stay in [public/audio/](public/audio/).
- **CSS** ([globals.css](app/globals.css)) — EQ now **loops while minimised** (was gated on `data-playing`); removed all `.island-player` / `.ip-*` styles; enlarged the nav links (`.island-link` padding/size up); narrowed the expanded island to `min(420px, 100vw−2rem)`; the trigger (album art + EQ) collapses to `height:0` when the island is expanded so only the four buttons show.
- **Tests** ([e2e/a11y.spec.ts](e2e/a11y.spec.ts)) — replaced the "island music player" block with a "dynamic island nav" block: hover-expand reveals the four centred links + asserts no player remains, and keyboard focus → Enter → Escape toggles `aria-expanded`. (Drove the real interaction paths since the trigger collapses on hover.)
- ✅ tsc + eslint clean, build green (8 routes), **22/22** Playwright (axe 0 violations 6 routes × 2 themes + 2 nav tests), preview verified in light + dark.
- **AI SDLC doc** — added [ai-sdlc.md](ai-sdlc.md): an AI-assisted SDLC playbook with a Kanban board template and a roadmap for interactive 3D elements + GSAP scroll animations.

---

## Phase 9 — Dynamic island animation polish (smoothness → radius → spread)

**Trigger:** user reported the island's expand-on-focus animation **stuttered**, then iterated on the expanded look.

- **Smoothness refactor** ([globals.css](app/globals.css)) — the morph was driven by three concurrent layout-animated properties (`.island` `width` + `.island-panel` `max-height: 0→200px` + `.island-trigger` `height: 40→0`) plus a flex re-wrap, thrashing the main thread; the `max-height` also overshot the ~60px content ~3.5×, so the easing felt broken. Rebuilt as a **container box-morph**: `.island` transitions its own `width`+`height` with `contain: layout` + `will-change`; trigger and panel are `position:absolute; inset:0` and **crossfade on the compositor** (opacity + small `translateY`); `.island-nav ul` set `flex-wrap: nowrap`. (decisions [D4e](decisions.md).)
- **Radius match** — introduced a shared `--island-radius: 20px` token used by both the expanded bar and the active `.island-link`, so the current-page pill nests concentrically (collapsed pill stays `999px`).
- **Spread layout** — per user, expanded links now `justify-content: space-between` (pad `8px 12px`, gap `4px`) to fill the bar edge-to-edge instead of centring with empty sides. Reverses the D4c "centred" detail. (decisions [D4d](decisions.md).)
- **Tests** ([e2e/a11y.spec.ts](e2e/a11y.spec.ts)) — island assertion updated `center` → `space-between`; test title reworded to "four spread nav links".
- **Verified** in the preview (port 3210; restart cleared a stale Turbopack CSS compile): collapsed 172×40, expanded 420×60, bar+link radius both 20px, links at 12px insets evenly spread; dynamic-island + reduced-motion + light-theme axe tests green.

---

## Phase 10 — Site-wide GSAP scroll-reveal system

**Trigger:** user asked whether GSAP drives the scroll animations and wanted the **same "text loads up / cards appear on scroll"** feel on **all** routes (it previously existed only on Home). Researched the latest GSAP first (now 100% free since v3.13 — SplitText/ScrollSmoother ship in the public package; `@gsap/react useGSAP`, `ScrollTrigger.batch`, `gsap.matchMedia` are the current patterns).

- **Groundwork** — added `@gsap/react`; [lib/gsap.ts](lib/gsap.ts) registers `ScrollTrigger` + `SplitText` once and re-exports `gsap`/`useGSAP` (roadmap R2).
- **One global smooth scroll** — [components/motion/SmoothScroll.tsx](components/motion/SmoothScroll.tsx) (mounted in [layout.tsx](app/layout.tsx)) runs a single Lenis synced to ScrollTrigger (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker` drives `lenis.raf`). Consolidated the two per-component Lenis instances: [lib/scroll.ts](lib/scroll.ts) now re-exports `useLenisInstance` from [lib/lenisContext.ts](lib/lenisContext.ts); `HomeIntro`/`StoryLine`/`WorkShowcase` updated.
- **Reveal primitives** ([components/motion/](components/motion/)) — `Reveal` (block fade+rise), `RevealText` (SplitText per-line, `aria:"auto"` + `autoSplit`), `RevealStagger` (`ScrollTrigger.batch`). All gate on `useReducedMotion`, set initial state in JS (no FOUC / no invisible-content), and use **opacity not visibility** so focusable content stays in the tab order. (decisions [D17](decisions.md).)
- **Wired across routes** — `/work` (H1/intro + project content blocks & media; project H2s kept visible as focus targets), `/playground` (H1/subtitle + batch-revealed masonry cards; hover scale now `motion-safe:`), `/about` (hero + every section heading + staggered prose/principles/toolkit), `/design-system` (`Section` heading+intro + staggered token/type/spacing/rules lists), `/accessibility` (headings + list + link-safe paragraphs). Home unchanged.
- ✅ tsc + eslint clean.

---

## Phase 11 — Home statement spacing fix + About "The story" persona rework

**Trigger:** user spotted the home statement words jammed together (no spaces), asked to confirm Lenis is in use, and asked to convey a fuller persona (AI orchestrator bridging ADA across SDLC/STLC, design/authenticity/aesthetics eye, active musician) with design + graphic components.

- **Spacing bug** ([HomeIntro.tsx](components/hero/HomeIntro.tsx)) — the `.intro-word` reveal spans are `display:inline-block` with the inter-word space placed *inside* each span; inline-block trims trailing whitespace at the box edge → words collapsed. Fixed by emitting the space as a text node **between** the spans (via `Fragment`). Verified a real 5px gap returns.
- **Lenis** — confirmed in use: one global instance (the `lenis` class is on `<html>`) via the `SmoothScroll` provider, synced to ScrollTrigger; off under reduced motion.
- **About "The story"** ([about/page.tsx](app/about/page.tsx)) — rebuilt to a bespoke section: new copy (AI orchestrator bridging SDLC⇄STLC + design eye + musician) with two graphics — **`StoryBridge`** (accessible SDLC⇄STLC bridge `<figure>` with real labels + figcaption + a decorative motion-gated connector) and **`OrchestrationGraph`** (decorative neo4j-style node motif in the heading rail). New CSS in [globals.css](app/globals.css) (`.bridge-track` flow + `.orch-ring` pulse, both motion-gated). (decisions [D18](decisions.md).)
- ✅ tsc + eslint clean, build green, **25/25** Playwright (axe 0 violations 6 routes × 2 themes), verified About story + bridge + graph in preview (desktop + the rail graph at ≥768px).

---

## Phase 12 — Work page: hero headline + folder, revert, full-screen hero that scrolls over

**Trigger:** user iterated on `/work` — add a Juan-Mora-style headline + folder, revert an out-of-session header rewrite, then make the page open as a full-screen hero with the cards rising over it on scroll.

- **Headline + folder** ([work/page.tsx](app/work/page.tsx)) — added the muted-gray display tagline "Passionate about the craft and little details" with a decorative blue **folder + slanted "iii"** SVG (inline, `aria-hidden`, `var(--accent)`). Real text (a `<p>` tagline, not a heading) so the `h1`→project-`h2` outline is preserved.
- **Reverted an out-of-session rewrite** — `ProjectSection.tsx` had been changed at ~01:14 (not by this session) into a 4-column Juan-Mora header using a `LiveCta` component; per user, `git checkout HEAD` restored the committed 2-column layout (ButtonLink + context badge) and re-applied only this session's `Reveal` wrappers. `components/work/LiveCta.tsx` is now orphaned (untracked, unused).
- **Full-screen hero + slide-over panel** — the hero (eyebrow `h1` "Work" + the tagline + left scroll-dots rail) is `position: sticky; top: 0; min-h-screen`; the projects live in `.work-panel` (`relative`, `z-1`, opaque, rounded top + shadow) that scrolls up over the held hero. Pure CSS (no scroll-jacking; reduced-motion-safe). (decisions [D19](decisions.md).)
- **Scroll-spy fix** ([lib/scroll.ts](lib/scroll.ts)) — making `.work-panel` positioned turned it into the sections' `offsetParent`, breaking index-link `scrollToAndFocus`. Now computes the absolute target (`getBoundingClientRect().top + scrollY − 96`) and passes a **number** to `lenis.scrollTo`. Verified: click scrolls + focuses + sets `aria-current`.
- ✅ tsc + eslint clean, build green, **25/25** Playwright (axe 0 violations 6×2 + scroll-spy). Verified hero + panel-rises-over + scroll-spy in preview (dark + light). Note: home light-mode axe is intermittently flaky on the `opacity:0.5` reveal words (passes on re-run; pre-existing).

---

## Phase 13 — Work page: multi-media gallery, card layout, + global scroll fixes (2026-06-19)

**Trigger:** user asked to (a) support multiple images/videos per Work card, (b) stop the project cards "popping up" when entering `/work` (open on the hero), (c) always open any page at the top, (d) move Role to its own full-width row, and (e) pin the project index to the left with the cards spread wider — then reported scrolling that **gets stuck until reload**.

- **Multiple media per card** — `Project.media` stays the single **cover** (still used by the home teaser); added optional `Project.gallery: MediaItem[]`. New [MediaGallery.tsx](components/ui/MediaGallery.tsx) renders the cover full-width then the rest in a responsive 2-col `<ul role="list">` grid (deliberately **not** a carousel — no hidden slides / focus traps). Extracted a shared `MediaItem` type into [content/projects.ts](content/projects.ts); [MediaFigure.tsx](components/ui/MediaFigure.tsx) imports it; [ProjectSection.tsx](components/work/ProjectSection.tsx) passes `[media, ...gallery]`. (decisions [D22](decisions.md).)
- **Open at the top + un-stick scrolling** ([SmoothScroll.tsx](components/motion/SmoothScroll.tsx)) — the global Lenis persists across client navs, which caused two bugs: the browser restored the prior scroll (landing in the Work cards), and Lenis kept the *previous* route's scroll **limit** so a taller page clamped ~⅓ down ("stuck until reload"). Now on every `usePathname()` change: `scrollRestoration="manual"`, snap to top (hash deep-links exempt), and after paint (double rAF) `lenis.resize()` + `ScrollTrigger.refresh()`. **Diagnosed empirically** by exposing the Lenis instance: limit was stale `5541` (Home) on a client nav to Work vs. the real `16134`; matches after the fix and reaches the true bottom. (decisions [D21](decisions.md).)
- **Card layout** ([ProjectSection.tsx](components/work/ProjectSection.tsx)) — **Challenge + Services side-by-side**, **Role on its own full-width row** below a hairline divider (kills the dead space a short Challenge left under it; Role capped `max-w-3xl`).
- **Left-anchored index + wider cards** ([WorkShowcase.tsx](components/work/WorkShowcase.tsx) + [work/page.tsx](app/work/page.tsx)) — dropped the centered `mx-auto max-w` for a left gutter (`px-6 sm:px-10 xl:px-16`); the sticky `<nav>` index now pins to the left edge with a `gap-x-16` to the cards (`max-w-[72rem]`); hero + intro widened to `max-w-7xl` to share the left edge. Checked at 1920 @ 75% (≈2560 CSS px): index at 64px, 64px gap, cards 1152px, no overflow. (decisions [D23](decisions.md).)
- ✅ tsc + eslint clean. (Scroll/sticky behaviour verified by element-measurement + screenshots; the headless preview can't drive Lenis scroll reliably.)

## Phase 14 — Playground: video autoplay + slow fade-in reveal (2026-06-19)

**Trigger:** user added an `.mp4` to a Playground card ("not loading"; wants it autoplaying on mute as it loads), then asked for the masonry contents to **fade in slowly on scroll** instead of appearing abruptly.

- **Video cards** ([PlaygroundCard.tsx](components/playground/PlaygroundCard.tsx)) — the card always rendered `<img>`, so `<img src="*.mp4">` silently failed. Now auto-detects video by extension and renders `<video autoPlay muted loop playsInline preload="metadata">` (optional `poster` added to `PlaygroundItem.media`), `<img>` otherwise. Reduced motion pauses it. First tried the work MediaFigure "play in view" IntersectionObserver, but it paused the freshly-mounted video — native **`autoPlay`** is the reliable path. Verified playing/looping/muted. (decisions [D24](decisions.md).)
- **Fade-in reveal** ([RevealStagger.tsx](components/motion/RevealStagger.tsx)) — added opt-in `fade` + `duration` props; `/playground` uses `fade y={36} duration={0.9}`. **Switched the engine `ScrollTrigger.batch` → `IntersectionObserver`**: the batch never revealed items already in the first viewport on load (transform-only had masked it; with opacity they went blank). IO fires reliably on load + as the masonry settles. (decisions [D25](decisions.md).)
- **Duplicate-key fix** ([playground/page.tsx](app/playground/page.tsx)) — the user's content has repeated `slug`s; the list now keys on `` `${slug}-${index}` `` (duplicate React keys had corrupted the nodes GSAP animates).
- **a11y check** — ran the project's own **axe-core** against `/playground` with all cards at `opacity:0` → **0 color-contrast violations**, so the fade keeps the [D17] axe-clean guarantee; reduced motion renders everything static + opaque.
- **Environment gotcha** — the headless preview is `visibilityState:"hidden"`, which **pauses `requestAnimationFrame` and `IntersectionObserver`**; scroll/visibility reveals don't run there between renders (forced renders via screenshots confirmed the fade works in a real browser). Cost several debugging iterations.
- ✅ tsc + eslint clean. Verified video playback + the staggered fade via forced-render screenshots.

---

## Current state

- Routes: `/`, `/work`, `/playground`, `/about` (a11y statement at `#accessibility`), `/accessibility`, `/design-system` — statically rendered, each with GSAP scroll-reveals (text + cards) layered on as client islands.
- `/work` opens as a **full-screen hero** ("Driven by the craft. Defined by the details." + folder icon, sticky); the project content panel scrolls up and over it. The page is **left-anchored** — the sticky scroll-spy index pins to the left with a gap to a width-capped card column ([WorkShowcase.tsx](components/work/WorkShowcase.tsx)); each card shows Challenge + Services with **Role on a full-width row**, plus a **cover + optional media gallery** ([MediaGallery.tsx](components/ui/MediaGallery.tsx)).
- `/playground` cards render **image or autoplaying muted/looping video** and **fade + rise in on scroll** (RevealStagger `fade`, IntersectionObserver-driven).
- Motion: one global Lenis ↔ ScrollTrigger (`SmoothScroll` in the layout) that also **resets scroll to the top + recomputes Lenis/ScrollTrigger on every route change** (opens at top; fixes the cross-nav stuck-scroll); reusable `Reveal` / `RevealText` (SplitText) / `RevealStagger` (IntersectionObserver) primitives in [components/motion/](components/motion/); plugins registered once in [lib/gsap.ts](lib/gsap.ts). All reduced-motion + keyboard safe.
- Hero: CSS-3D diorama (no WebGL deps). Nav: dynamic island — collapsed shows album art + a **looping EQ**; expands (hover / focus / tap) via a smooth box-morph to **four nav buttons spread edge-to-edge** (player reverted + archived); active pill shares the bar's `--island-radius`. Ambient glow + custom cursor + theme toggle global. Footer links: Design system · About · email.
- Planning: [ai-sdlc.md](ai-sdlc.md) holds the Kanban template + the 3D/GSAP roadmap.
- Verification: `npx tsc --noEmit`, `npx eslint`, `npm run build`, `npx playwright test` (server on 3210; restart after rebuild).

## Open / next

- Build the planned **3D character / animation** treatment for the island (see [ai-sdlc.md](ai-sdlc.md) roadmap).
- Finish the real-**media** swap: real Playground `.mp4`/`.mov`/`.png` + a real WCAG-project cover have landed; remaining SVG placeholders + several **duplicate Playground `slug`/title placeholders and mismatched alt text** still need cleanup, and the new gallery field is wired but unused (add `gallery` arrays when real extra shots exist).
- Confirm playground links (several point to LinkedIn as stand-ins).
- Re-run the **full verification loop** (`npm run build` + Playwright/axe) for the Phase 13–14 changes — only tsc + eslint were run this session (preview couldn't exercise scroll/visibility animations, see Phase 14 note).
- Nothing committed yet — all changes are in the working tree.
