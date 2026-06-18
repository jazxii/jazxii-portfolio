# Product Requirements Document (PRD)
## Personal Portfolio — Jassim M. Shamim
**Digital Accessibility Engineer & Creative Technologist**

| | |
|---|---|
| **Author** | Jassim M. Shamim |
| **LinkedIn** | https://www.linkedin.com/in/jassim-m-shamim/ |
| **Status** | Draft v1.4 |
| **Last updated** | 19 June 2026 |
| **Inspiration** | williamle.design (spatial 3D entry + Playground), juanmora.co (scroll-driven Work) |

---

## 1. Vision & Positioning

A portfolio that proves the thesis of my work: that beautiful, cutting-edge digital experiences and universal accessibility are the same goal, not a trade-off. It fuses two inspirations — William Le's spatial, Apple-style 3D entry and masonry "Playground," and Juan Mora's cinematic scroll-driven "Work" page with a sticky project index — while being fully keyboard-operable, screen-reader-friendly, reduced-motion-safe, and WCAG 2.2 AA compliant.

**Strategic differentiator:** Both reference sites are visually outstanding but accessibility-thin (verified: neither declares a `lang` attribute; Juan's site uses almost no landmark semantics and ships no skip link; both lean on autoplaying motion). Because I build accessibility for a living, **the portfolio itself is my strongest proof of skill.** It will match their craft AND be exemplary on accessibility. That contrast is the story.

**Tagline concept:** *"Building a digital world that's beautiful and built for everyone."*

---

## 2. Goals & Success Metrics

**Primary goal:** Recruiter / hiring-manager inbound and credibility for accessibility-engineering and creative-technologist roles.
**Secondary goal:** A living home for experiments, design curation, and side projects.

**Success metrics:**
- Lighthouse Accessibility = 100; Performance >= 90 (mobile).
- Zero automated axe-core violations in CI.
- Full keyboard operability, no focus traps.
- Core Web Vitals green: LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Qualitative: a recruiter can grasp who I am and see three projects within 60 seconds.

---

## 3. Personas

1. **Hiring manager / recruiter (primary):** desktop, time-pressed, needs proof of engineering depth + design taste fast.
2. **Fellow engineer / designer:** will inspect the craft, possibly via keyboard or screen reader.
3. **Me (maintainer):** needs a low-friction way to add projects and playground items over time.

---

## 4. Information Architecture / Sitemap

Flat, anchor-driven structure (mirrors both references) to keep complexity low:

| Route | Purpose | Inspiration |
|---|---|---|
| `/` | Spatial 3D hero entry + selected-work teaser + bookend CTA | William Le |
| `/work` | Full-screen hero headline → content panel scrolls over it; full project showcase with sticky left scroll-spy | Juan Mora |
| `/playground` | Masonry grid of experiments, designs, curation | William Le |
| `/about` | Story, "How I work" principles, toolkit, + the accessibility statement at `#accessibility` | — |
| `/design-system` | Living style guide: tokens, contrast math (both themes), type, components, ADA rules — linked from the footer | — |

Shared persistent pill-style top nav and a shared bookend footer (CTA + wordmark) appear on every route, so the site feels continuous regardless of entry point.

**Decision:** Flat single-page-with-anchors per route (no separate case-study pages); projects link out to live demos/repos. Architecture supports adding `/work/[slug]` later without rework.

---

## 5. Signature Features (functional + a11y spec)

### 5.1 — 3D Spatial Hero (inspired by William Le)
A tilted "creative technologist's desk" diorama on the right of a two-column first screen: a neo4j **WCAG knowledge-graph** card, a **Figma ADA-review** frame (selection handles + "Add to cart" + spec ✓s), an **auditor terminal** (`$ auditor run --pods 5 … ✓ 22 patches drafted`), and a floating **contrast chip** (`Aa 17.2 : 1 ✓`) — the desk that tells the AI-accessibility story at a glance. The left column carries the eyebrow, a giant peach `jazxii` wordmark, a meta row (Agentic AI × Inclusive Design · Chennai, India 2026), the `<h1>` ("Building a digital world that's beautiful — and built for everyone."), and a mono sub-line linking to the proof.

- **Implementation:** **CSS 3D transforms only, no WebGL/canvas** (`components/hero/Diorama.tsx`). Each layer sits on a `preserve-3d` plane at its own `translateZ` depth; the plane's resting tilt is `rotateX(12deg) rotateY(-11deg)`. (The earlier v1.1 WebGL/React-Three-Fiber monogram was removed — `three/@react-three/fiber/@react-three/drei` are no longer dependencies.)
- **Behavior:** the plane tilts toward the **mouse position anywhere on the page** (rAF-throttled, `pointer: fine` only); reduced motion / touch hold the resting tilt. The Figma frame is a filled, rounded card whose "Add to cart" button wears a focus-ring (the ADA demo). No entrance opacity fade (keeps the decorative text at full contrast for axe).
- **A11y:** the whole diorama is decorative -> `aria-hidden="true"`; it contains no focusable elements. The real `<h1>` is text and the LCP. The giant `jazxii` wordmark is decorative (`aria-hidden`, the name is in the nav + eyebrow). Diorama colours hold WCAG AA even though hidden (tag/button use `--color-blue-600`).

### 5.1a — Scroll story-line (inspired by Juan Mora)
Juan's "grow-line" reimagined as an accessible SVG thread (`StoryLine.tsx`): a curvy line that **draws from the top of the first screen down the entire home route as you scroll** (ScrollTrigger scrub on `stroke-dashoffset`, spanning the whole page), led by a glowing **pen-tip pointer** that descends with the scroll. Decorative, `pointer-events:none`, desktop-only, and **not rendered under reduced motion** (separators carry structure). *(The earlier hand-drawn signature was removed.)*

### 5.1b — Work folder CTA (inspired by Juan Mora)
Juan's "Curious?… Check out my **Work**" beat, rebuilt in CSS (`HomeIntro.tsx`). A **full-bleed faded "Work"** spans the home route — `W` pinned far-left, `ork` far-right — with the CTA column (the line "Curious?… Check out my", a folder, "Or keep scrolling") centred in the gap, so the folder reads as `W | folder | ork` rather than overlaying the word. The folder is layered CSS (no image assets): a back panel, a stack of three fanned/staggered "project" sheets whose coloured top edges peek out, and a front flap with a "Portfolio" pill + a large translucent brand mark.
- **Behavior:** one `<Link href="/work">` that **opens on hover and on keyboard `:focus-visible`** (front flap tilts `rotateX`, sheets lift); the reduced-motion backstop makes the open instant and motionless.
- **A11y:** the whole folder/word is decorative (`aria-hidden`); the link carries sr-only text ("work — view all projects") and the section an `aria-label`. The folder's text sits on a gradient, so axe reports it *incomplete*, never a contrast violation.

### 5.2 — Work Showcase (inspired by Juan Mora)
**Opens as a full-screen hero** (v1.3): a small `Work` eyebrow `<h1>`, the muted display tagline **"Driven by the craft. Defined by the details."** with a decorative blue **folder + "iii"** icon, and a decorative left scroll-dots rail. The hero is `position: sticky; top: 0; min-height: 100vh`; the project content lives in a `.work-panel` (`position: relative; z-index: 1`, opaque `--bg`, rounded top + soft shadow) that **scrolls up and over** the held hero — the cards rise from below (Juan-Mora overlap, done in pure CSS, no scroll-jacking).

Inside the panel (v1.4): a **left-anchored** layout — the page hugs one left edge (`px-6 sm:px-10 xl:px-16`, no centered max-width) so the sticky `<nav>` index **pins to the left** with a 64px gap to a width-capped (`max-w-[72rem]`) card column; the hero + intro share the same left edge. Each project block: Title, Year pill, "View live / repo" button (or a context badge when there's no public link), then **Challenge + Services (tag chips) side-by-side with Role on its own full-width row** below a divider, plus media — a **cover plus an optional gallery** (featured cover full-width, the rest in a responsive grid; images and/or muted looping video), revealed via the shared reveal primitives (§5.6). (See decisions D22, D23.)

- **Behavior:** active project highlights in the index as you scroll (verified pattern on Juan's site).
- **A11y implementation:** the hero `<h1>` keeps the page identity (the tagline is a decorative `<p>`, folder `aria-hidden`); the sticky overlap works under reduced motion (Lenis off → native scroll). Index is a real `<nav aria-label="Projects">`; active state driven by IntersectionObserver, also sets `aria-current="true"`. Clicking smooth-scrolls (Lenis) and moves focus to the section heading — the scroll target is computed as an **absolute `getBoundingClientRect().top + scrollY − 96` number** passed to `lenis.scrollTo` (not the element), so the positioned `.work-panel` becoming the sections' `offsetParent` can't mis-resolve it (see decisions D19). Each project = `<section aria-labelledby>` with a `tabIndex={-1}` heading. Videos `muted loop playsinline preload="none"` with poster + text alternative; only play in view and when motion allowed.

### 5.3 — Playground (inspired by William Le)
3-column masonry (verified: William's is 3 fixed columns ~495px wide) mixing design experiments, Figma concepts, AI-tool demos, and curation. Each card: preview (image **or autoplaying muted/looping video**), title, medium/tool, date tag; newest first. Cards **fade + rise in as they scroll into view** (v1.4). (See decisions D24, D25.)

- **Implementation:** CSS `columns: 3; gap` with `break-inside: avoid` (zero-JS, degrades to 2 -> 1 column). Card media auto-detects video by file extension (`.mp4`/`.webm`/`.mov`) and renders `<video autoplay muted loop playsinline>` (optional poster), else `<img>`.
- **A11y:** semantic list; each card is one focusable link with a clear accessible name; video is decorative (`aria-hidden` — the link title/medium name the card), muted, and **paused under reduced motion**; visible focus rings; keyboard-only operable. The fade-in reveal is opt-in `fade` on `RevealStagger` (§5.6) and is axe-clean (opacity:0 cards trip **no** color-contrast violations; reduced motion shows everything static + opaque).

### 5.4 — Bookend Footer
A single repeated CTA card ("Let's build something inclusive together") + large wordmark/monogram footer on every route (Juan resolves Home and Work to the identical closing moment). The CTA carries `mailto:`, LinkedIn, GitHub; the footer nav links **Design system** · About · email. No downloads or sharing flows.

### 5.5 — Global Chrome
Persistent top nav: a left `jazxii.` wordmark (peach dot), a centred **iPhone-style "dynamic island"**, and a right cluster of `Email` / `in` / `gh` links + a live clock (12-hour) + the theme toggle. Plus a **custom cursor**.
- **Dynamic island (`Nav.tsx`):** collapsed, it's a black pill showing album art + a **looping animated equaliser**. On hover, keyboard focus, or tap it **morphs (a smooth container box-morph — width/height transitioned with `contain: layout`; trigger + panel crossfade on the compositor, no jank)** to reveal **the four nav buttons spread edge-to-edge** (`justify-content: space-between`; Home / Work / Playground / About) — the album art + EQ are hidden in the expanded view, and the active link shares the bar's `--island-radius` so it nests concentrically. The links live in a real `<nav aria-label="Main">`, always in the DOM and focusable (focus triggers `:focus-within` to expand); a trigger `<button aria-expanded aria-controls>` opens it for touch; Escape + outside-tap dismiss (WCAG 1.4.13). The EQ animates in a loop while minimised (motion-allowed) and is static under reduced motion. The island lives in the layout so it stays continuous across client-side navigation. *(A functional "now playing" music player previously lived in the expanded island; it was reverted on 2026-06-17 and archived to `archive/IslandPlayer.tsx` — original royalty-free loops remain in `public/audio/`. A richer 3D-character / GSAP-scroll treatment is planned; see `ai-sdlc.md`.)*
- **Ambient backdrop:** the blue top-glow + film grain renders on **every route** (in `layout.tsx`), fixed and decorative, behind content; never affects measured text contrast.
- **Theme toggle (`ThemeToggle.tsx` + `lib/theme.ts`):** dark is primary; the site follows the system scheme by default and the toggle overrides it (persisted to localStorage, mirrored on `<html data-theme>`). A no-FOUC init script in `layout.tsx` applies a stored choice before paint. Accessible `<button>` whose name states the action ("Switch to light/dark theme"); shows a **"Light mode"/"Dark mode" text label** on desktop and a sun/moon icon on mobile — never colour alone.
- **Custom cursor (`Cursor.tsx`):** dot + trailing ring that grows over interactive elements and shows a contextual label from `data-cursor` ("view" / "email"). Progressive — mounts only on `pointer: fine` + motion-allowed; keyboard/touch keep the native cursor and focus rings; inputs keep their caret. Decorative (`aria-hidden`).

### 5.6 — Site-wide scroll reveals (GSAP, v1.3)
Every route layers on the home page's "text loads up / cards appear on scroll" feel via three reusable client primitives in `components/motion/`, built on `@gsap/react`'s `useGSAP` (GSAP is 100% free since v3.13 — SplitText ships in the public package):
- **`RevealText`** — per-line text reveal via **SplitText** (`aria:"auto"` keeps the full string as the accessible name; `autoSplit` re-splits after the web font swaps). Headings only.
- **`Reveal`** — a single block rises into place.
- **`RevealStagger`** — a list/grid reveals in a staggered batch as items enter, driven by an **`IntersectionObserver`** (reliable on load, unlike `ScrollTrigger.batch`, which never revealed items already in the first viewport — see decisions D25). An opt-in `fade` adds an opacity fade for media-led cards (Playground); default off elsewhere (transform-only).
- **Smooth scroll:** one global Lenis instance (`components/motion/SmoothScroll.tsx`, mounted in the layout) synced to ScrollTrigger (`lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker` drives `lenis.raf`). On every route change it resets scroll to the **top** (browser restoration off; hash deep-links exempt) and recomputes Lenis's scroll limit + `ScrollTrigger.refresh()`, so the persisted global Lenis can't strand the visitor mid-page on a taller route (decisions D21).
- **A11y/perf:** all gate on `useReducedMotion` (reduced motion = final state instantly); reveals are **transform-only (no opacity/visibility) by default**, so content is never hidden from axe, the tab order, or the a11y tree, and never trips color-contrast. The one opt-in exception is `RevealStagger fade` on the media-led Playground cards (opacity 0→1) — verified axe-clean (opacity:0 cards trip no color-contrast violations) and still fully static/opaque under reduced motion. Content stays server-rendered (LCP = real text); `gsap`/`ScrollTrigger`/`SplitText` ship in one shared client chunk. (See decisions D17, D25.)

### 5.7 — About "The story" (v1.3)
The `/about` story section conveys the persona — an **AI orchestrator for accessibility bridging ADA across the SDLC (build) and STLC (test) lifecycles**, with a keen eye for design/authenticity/aesthetics, and an active musician — via copy plus two graphics in `components/about/`:
- **`StoryBridge`** — an accessible **SDLC ⇄ STLC bridge** `<figure>`: real text lanes (Plan→Build→Ship ⇄ AI-orchestration hub ⇄ Strategy→Execute→Verify) + a `<figcaption>` carrying the meaning; the connector track + flowing sheen are decorative (`aria-hidden`) and motion-gated.
- **`OrchestrationGraph`** — a decorative neo4j-style node-cluster motif (shapes only, no text → nothing to contrast-check; `aria-hidden`) in the heading rail, echoing the hero diorama's graph card.
- **A11y:** brand peach appears only as non-text accents (a dot, the `--accent` track) to avoid the peach-text-on-beige AA shortfall; all labels meet AA. (See decisions D18.)

---

## 6. Design Tokens

Built from a **blue / black / beige** identity, blending Juan's warm beige light surface (sampled `#FAF6EF`) with William's near-black canvas (`#0E0E0E`). **Dark is the primary mode** (makes 3D panels + work media pop, like William's); a beige-forward light mode is available. Both AA-compliant. Starting values — tune in design.

```css
/* ---- Color (verify each final pairing against WCAG AA) ---- */
--color-ink:      #0E0E0E; /* near-black, primary dark bg (William) */
--color-surface:  #14161A; /* raised dark surface / cards */
--color-beige:    #FAF6EF; /* warm beige, light bg (Juan) */
--color-beige-2:  #EFE9DC; /* beige raised surface */
--color-blue:     #2D6BFF; /* primary brand / action */
--color-blue-600: #1E4FD0; /* hover / pressed */
--color-blue-200: #AFC6FF; /* accents on dark */
--color-peach:    #F5A97E; /* warm peach accent: wordmark, diorama, brand dot (darkens to #B3501F for AA text on beige) */
--color-text-hi:  #F5F3EE; /* high-emphasis text on dark */
--color-text-lo:  #A7A39B; /* muted text (large/secondary only) */
--color-text-ink: #1A1A1A; /* text on beige */
--color-focus:    #7FA8FF; /* 3px focus ring, high contrast both modes */

/* ---- Type ---- */
--font-sans:    "Inter", system-ui, sans-serif;          /* UI/body */
--font-display: "Clash Display", "Inter", sans-serif;    /* headlines */
--font-mono:    "JetBrains Mono", monospace;             /* code accents */
--fs-display: clamp(2.5rem, 6vw, 6rem);
--fs-h1: clamp(2rem, 4vw, 3.5rem);
--fs-h2: clamp(1.5rem, 3vw, 2.25rem);
--fs-body: 1rem;        /* 16px min */
--fs-small: 0.875rem;
--lh-tight: 1.05; --lh-body: 1.6; --tracking: 0.01em;

/* ---- Space (8pt) ---- */
--s-1:.25rem; --s-2:.5rem; --s-3:.75rem; --s-4:1rem; --s-6:1.5rem;
--s-8:2rem; --s-12:3rem; --s-16:4rem; --s-24:6rem; --s-32:8rem;

/* ---- Radius / elevation ---- */
--radius-card: 16px; --radius-pill: 999px;
--shadow-1: 0 2px 8px rgb(0 0 0 / .25);
--shadow-glow: 0 0 80px rgb(45 107 255 / .25); /* Juan's top-glow */

/* ---- Motion (all gated by prefers-reduced-motion) ---- */
--ease-out: cubic-bezier(.22,1,.36,1);
--dur-fast:.2s; --dur-base:.5s; --dur-slow:.9s;
```

**Contrast notes:** body text at `--color-text-hi` on `--color-ink` passes AA; reserve `--color-text-lo` for large/secondary text; `--color-blue` + white text for actions on dark passes. Verify every final pairing with axe DevTools.

---

## 7. Tech Stack (low-complexity)

**Recommended: Next.js (App Router) + TypeScript + Tailwind CSS + GSAP/ScrollTrigger + Lenis, deployed on Vercel.**

**Why Next.js over React+FastAPI here:** a portfolio is content-heavy and largely static. Next's static generation gives great SEO, fast LCP, and accessible server-rendered HTML for free. FastAPI is a Python backend; a portfolio has no real backend need beyond perhaps a contact-form handler. Standing up a separate FastAPI service adds complexity for little benefit. If a backend is needed later (contact form, an LLM-powered demo), add a small Next serverless route — or introduce a FastAPI microservice only then.

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router) + TS | SSG, image optimization, routing |
| Styling | Tailwind + CSS variables (tokens) | tokens map to Tailwind theme |
| Motion | GSAP + ScrollTrigger + SplitText + `@gsap/react` + Lenis | matches Juan's verified stack; one global Lenis↔ScrollTrigger + reusable reveal primitives (§5.6). GSAP free since v3.13 |
| 3D hero | CSS 3D transforms (no WebGL) | `Diorama.tsx`; pointer parallax, zero deps |
| Content | MDX / typed content files | add a file = add a project |
| Hosting | Vercel | free, CI-friendly |
| Optional backend | Next route handler or FastAPI | only if/when needed |

**No WebGL (v1.2):** the hero diorama is pure CSS 3D transforms — no `three`/`@react-three/fiber`/`@react-three/drei` (a v1.1 WebGL monogram experiment was reverted). This keeps the hero on the perf budget with zero 3D dependencies and a static, reduced-motion-safe fallback for free.

---

## 8. Accessibility Requirements (P0 — signature)

Target **WCAG 2.2 AA**. Must-haves:
- Valid `lang` attribute; per-route `<title>`.
- One `<h1>` per page; logical heading order.
- Landmarks: `<header> <nav> <main> <footer>`.
- "Skip to content" link as the first focusable element.
- Visible focus indicators everywhere (3px `--color-focus`); never `outline:none` without a replacement.
- Full keyboard operability, no traps (nav, 3D scene, custom cursor included).
- Text alternatives for meaningful media; decorative media `aria-hidden`.
- Color is never the only signal.
- Global, respected `prefers-reduced-motion: reduce` path: disables parallax, autoplay, scroll-jacking; offers equally-polished static fallbacks.
- **Bonus credibility:** a visible footer **"Design system"** link to a living style guide that publishes its own contrast math and ADA rules and is itself axe-clean in both themes. The conformance statement + contact lives on `about#accessibility` (and the standalone `/accessibility` route, linked from the home hero).

---

## 9. Performance Budget

- JS <= ~120KB gzipped on the hero route; Lenis/GSAP load lazily where needed. The CSS-3D diorama adds no JS beyond a tiny pointer-parallax handler.
- Images via `<picture>` AVIF/WebP with width/height set (avoid CLS).
- All video `preload="none"`, lazy-played in view, with posters.
- Fonts self-hosted, `font-display: swap`, subset.
- LCP element is real text (the `<h1>`), not the 3D scene.

---

## 10. Phased Build Plan / Milestones

| Phase | Focus | Deliverable |
|---|---|---|
| **0 — Foundations (wk 1)** | Repo, Next+TS+Tailwind, tokens, base layout w/ landmarks, skip link, nav, bookend footer, reduced-motion plumbing, axe-core + Lighthouse CI | Deployed accessible skeleton |
| **1 — Content + Work (wk 2)** | Content model for projects + playground; sticky scroll-spy Work page (Challenge/Services/Role); real projects added | Highest-value page live |
| **2 — Playground (wk 3)** | CSS-columns masonry, lazy media, experiments + curation, date tags, focus polish | Playground live |
| **3 — 3D Hero (wk 4)** | CSS-3D diorama, mouse parallax, scroll ease-in, reduced-motion static fallback, `<h1>`/tagline as text | Hero live (built last; site usable without it) |
| **4 — About + audit (wk 5)** | About page (a11y philosophy), optional contact form, custom cursor (progressive), live clock; manual a11y pass (keyboard, VoiceOver/NVDA), perf tuning | Launch |

---

## 11. References

- **William Le** — https://williamle.design/ (3D entry) and /play (Playground). Built in Framer; CSS-3D transforms (matrix3d, rotateX ~20deg); 3-col masonry; respects reduced-motion; no `lang`/skip-link.
- **Juan Mora** — https://juanmora.co/ (home) and /work. Built in Webflow; GSAP 3.15 + ScrollTrigger + SplitText + Lenis 1.3.17; sticky left scroll-spy; video-driven cinematic hero (`preload="none"`, muted loop); shared bookend CTA + wordmark; beige `#FAF6EF` light surface.

---

## 12. Content provenance (v1.1)

Real content sourced from the author's LinkedIn profile. `/work` projects:
**Accessibility AI Platform** (Cognizant — Graph RAG over a WCAG knowledge
graph, LLM auditor over DOM+screenshots; internal, no public link),
**Albertsons WCAG 2.2 Program** (web + Unified Mobile App, 5 pods),
**ENIGMA 8.0** (IEEE-VIT Android app, public Play Store link, 2,400+
registrations from 75+ countries), **ISRO — 70KV SiC IGBT Switch Matrix**
(Marx modulator, +15% radar efficacy; research, no public link). Projects
without a public URL render a context badge ("Internal platform" / "Research
project") instead of a live/repo button. Media SVGs remain on-brand
placeholders pending real screenshots/recordings.

## 13. Open Questions

1. ~~Monogram: "JS" or "JMS"?~~ → the brand mark is the **`jazxii` wordmark** (giant in the hero, `jazxii.` with a peach dot in the nav).
2. Display typeface: Clash Display (current) or another?
3. Contact: email-only link (current) — add a form later? (`/accessibility` already has one.)
4. Individual deep case-study pages later, or keep links-to-live only?
5. Custom domain + privacy-friendly analytics (e.g. Plausible)?
6. Replace placeholder project/playground media with real captures.
