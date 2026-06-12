# Product Requirements Document (PRD)
## Personal Portfolio — Jassim M. Shamim
**Digital Accessibility Engineer & Creative Technologist**

| | |
|---|---|
| **Author** | Jassim M. Shamim |
| **LinkedIn** | https://www.linkedin.com/in/jassim-m-shamim/ |
| **Status** | Draft v1.0 |
| **Last updated** | 10 June 2026 |
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
| `/work` | Full project showcase with sticky left scroll-spy | Juan Mora |
| `/playground` | Masonry grid of experiments, designs, curation | William Le |
| `/about` | Story, accessibility philosophy, skills, contact | — |

Shared persistent pill-style top nav and a shared bookend footer (CTA + wordmark) appear on every route, so the site feels continuous regardless of entry point.

**Decision:** Flat single-page-with-anchors per route (no separate case-study pages); projects link out to live demos/repos. Architecture supports adding `/work/[slug]` later without rework.

---

## 5. Signature Features (functional + a11y spec)

### 5.1 — 3D Spatial Hero (inspired by William Le)
A tilted "creative technologist's desk" diorama: floating panels for an AI/agent terminal, a Figma frame, an accessibility audit/contrast checker, and a code editor, arranged on a plane rotated ~20deg on X with layered depth + subtle mouse-parallax.

- **Implementation:** CSS 3D transforms, NOT WebGL. (Verified: William's scene uses per-element `matrix3d` encoding `rotateX(20deg)` + `scale(0.5)` with baked perspective and `will-change: transform`; zero `<canvas>`.) Keeps bundle + complexity low.
- **Behavior:** scene assembles on load; "camera" eases inward on scroll toward the work teaser.
- **A11y:** scene is decorative -> `aria-hidden="true"`; real `<h1>` + tagline as text. Under `prefers-reduced-motion: reduce`, parallax/assembly disabled and a static composed image shown. No info conveyed by animation alone.

### 5.2 — Work Showcase (inspired by Juan Mora)
Two-column layout: a sticky left index (`position: sticky; top: 0`) + scrolling content. Each project block: Title, Year pill, "View live / repo" button, then **Challenge / Services (tag chips) / Role**, plus media (looping muted video or images).

- **Behavior:** active project highlights in the index as you scroll (verified pattern on Juan's site).
- **A11y implementation:** index is a real `<nav aria-label="Projects">`; active state driven by IntersectionObserver, also sets `aria-current="true"`; clicking smooth-scrolls (Lenis) and moves focus to the section heading. Each project = `<section aria-labelledby>` with a heading. Videos `muted loop playsinline preload="none"` with poster + text alternative; only play in view and when motion allowed.

### 5.3 — Playground (inspired by William Le)
3-column masonry (verified: William's is 3 fixed columns ~495px wide) mixing design experiments, Figma concepts, AI-tool demos, and curation. Each card: preview (image/muted video), title, medium/tool, date tag; newest first.

- **Implementation:** CSS `columns: 3; gap` with `break-inside: avoid` (zero-JS, degrades to 2 -> 1 column).
- **A11y:** semantic list; each card is one focusable link with a clear accessible name; videos lazy-play in view, pause off-view; visible focus rings; keyboard-only operable.

### 5.4 — Bookend Footer
A single repeated CTA card ("Let's build something inclusive together") + large wordmark/monogram footer on every route (Juan resolves Home and Work to the identical closing moment). Contains `mailto:`, LinkedIn, GitHub, optional contact form. No downloads or sharing flows.

### 5.5 — Global Chrome
Persistent pill-style top nav (Home / Work / Playground / About) with a left monogram; optional live clock (William detail). Custom cursor is optional + progressive: never replaces the real cursor for keyboard/touch; disabled under reduced-motion.

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
| Motion | GSAP + ScrollTrigger + Lenis | matches Juan's verified stack |
| Content | MDX / typed content files | add a file = add a project |
| Hosting | Vercel | free, CI-friendly |
| Optional backend | Next route handler or FastAPI | only if/when needed |

No WebGL, no UnicornStudio required. (If the cinematic pre-rendered hero look is ever wanted, render the scene to a muted `.mp4` and scroll-scrub it — Juan's approach — but start with the lighter CSS-3D hero.)

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
- **Bonus credibility:** a visible footer "Accessibility" link with a short conformance statement + contact for issues.

---

## 9. Performance Budget

- JS <= ~120KB gzipped on the hero route; Lenis/GSAP load only where needed.
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

## 12. Open Questions

1. Monogram/wordmark: do you want a "JS" or "JMS" mark (like William's "W")?
2. Display typeface: Clash Display (proposed) or another?
3. Contact: email-only link, or a form (adds a serverless handler)?
4. Do you want individual deep case-study pages later, or keep links-to-live only?
5. Custom domain + analytics (privacy-friendly, e.g. Plausible)?
