# Kanban — jazxii-portfolio

Generated from [ai-sdlc.md](ai-sdlc.md) (§4 templates + §5 roadmap). Newest sprint:
**Site-wide GSAP scroll-reveals**. WIP limit: **max 2 In Progress**. Flow left → right.

> Definition of Done (every card): tsc clean · eslint clean (React-compiler rules, D11) ·
> `npm run build` green · `npx playwright test` green (**axe 0 violations, 6 routes × 2 themes**) ·
> keyboard-operable + visible focus + `prefers-reduced-motion` honoured · docs updated.

---

## 📥 Backlog
- [ ] CARD-027 · 3D character in the dynamic island (roadmap **R1**, M/High)
- [ ] CARD-028 · Work page scroll-spy polish — GSAP-driven active transitions over the existing IntersectionObserver (roadmap **R3**, M/High)
- [ ] CARD-029 · Pinned scrollytelling beat on Home between hero and Work teaser (roadmap **R6**, L/High)
- [ ] CARD-030 · Diorama → optional light WebGL upgrade, code-split + `pointer:fine` gated (roadmap **R4**, L/Med)
- [ ] CARD-031 · Cursor-reactive multi-layer parallax depth on character + diorama (roadmap **R7**, M/Low)
- [ ] CARD-032 · Replace placeholder project + playground media (SVGs) with real screenshots/recordings (chore, M/Med)
- [ ] CARD-033 · Confirm playground links (several point to LinkedIn as stand-ins) (chore, S/Low)

## 🔎 Ready (groomed, acceptance criteria written)
- (empty — the GSAP scroll-reveal cards CARD-021–025 shipped, see Done. Pull the next item from Backlog.)

## 🛠️ In Progress (WIP ≤ 2)
- (empty — pull from Ready)

## 👀 In Review (diffs + verification loop)
- (empty)

## ✅ Done (DoD met, docs updated)
- [x] CARD-018 · Revert + archive the in-island music player (session-log Phase 8, decisions D4c)
- [x] CARD-019 · Dynamic island smoothness refactor — container box-morph + compositor crossfade (Phase 9, decisions D4e)
- [x] CARD-020 · Island radius token (`--island-radius`) + expanded links spread `space-between` (Phase 9, decisions D4d/D4e)
- [x] CARD-021–025 · Site-wide GSAP scroll-reveal system (Phase 10, decisions D17)
- [x] CARD-026 · Home statement word-spacing fix (Phase 11)
- [x] CARD-034 · About "The story" persona rework + SDLC⇄STLC bridge + orchestration node-graph (Phase 11, decisions D18)
- [x] CARD-035 · Work hero headline "Passionate about the craft and little details" + folder icon (Phase 12)
- [x] CARD-036 · Revert out-of-session 4-column / LiveCta ProjectSection rewrite to committed 2-column layout (Phase 12)
- [x] CARD-037 · Work opens as full-screen hero; content panel scrolls up over it (sticky) + scroll-spy `offsetParent` fix (Phase 12, decisions D19)

## 🧊 Icebox / Parked (validate value first)
- [ ] CARD-R8 · Audio re-introduction as explicit opt-in toggle (reuse archived `IslandPlayer.tsx`)
- [ ] CARD-R9 · Per-project deep case-study pages (`/work/[slug]`) with 3D headers
- [ ] CARD-R10 · WebGL particle/shader ambient backdrop (must beat the CSS ambient on the perf budget)

---

## Active cards (detail)

### CARD-021 · `lib/gsap.ts` central plugin registration + add `@gsap/react`
- **Type:** chore + perf  ·  **Effort:** S  ·  **Impact:** Med
- **Why / user value:** one consistent GSAP instance with plugins registered once; foundation for every reveal. (Roadmap R2.)
- **Acceptance criteria:**
  - [ ] `@gsap/react` installed; `lib/gsap.ts` registers `ScrollTrigger` + `SplitText` + `useGSAP` and re-exports them
  - [ ] No double-registration; SSR-safe (`typeof window` guard)
  - [ ] eslint clean (React-compiler rules)
- **Approach:** decisions D17.  **Files:** `package.json`, `lib/gsap.ts`
- **Verification:** tsc · eslint · build

### CARD-022 · Global `SmoothScroll` provider (one Lenis, synced to ScrollTrigger)
- **Type:** feat + perf  ·  **Effort:** M  ·  **Impact:** High
- **Why:** site-wide buttery scroll; correct Lenis↔ScrollTrigger sync; removes duplicate per-component Lenis instances.
- **Acceptance criteria:**
  - [ ] Single Lenis created in a layout-mounted client provider, only when motion allowed
  - [ ] `lenis.on("scroll", ScrollTrigger.update)` + `gsap.ticker` drives `lenis.raf`; `lagSmoothing(0)`
  - [ ] `HomeIntro`, `StoryLine`, `WorkShowcase` read the shared instance (no own Lenis); Home reveals + Work scroll-spy still work
  - [ ] Reduced-motion → no Lenis, native scroll; axe 0 violations 6×2
- **Approach:** decisions D17.  **Files:** `components/motion/SmoothScroll.tsx`, `lib/lenisContext.ts`, `lib/scroll.ts`, `app/layout.tsx`, `components/hero/HomeIntro.tsx`, `components/hero/StoryLine.tsx`, `components/work/WorkShowcase.tsx`
- **Verification:** tsc · eslint · build · playwright · preview (Home + Work)

### CARD-023 · Reveal primitives (`Reveal`, `RevealText`, `RevealStagger`)
- **Type:** feat + a11y  ·  **Effort:** M  ·  **Impact:** High
- **Why:** reusable, accessible scroll-reveal building blocks for server-rendered pages.
- **Acceptance criteria:**
  - [ ] `Reveal` (block fade/rise), `RevealText` (SplitText per-line, reverts cleanly, AT reads full string), `RevealStagger` (ScrollTrigger.batch)
  - [ ] All gate on `useReducedMotion()`; initial hidden state set in JS (no invisible content if JS fails / motion reduced)
  - [ ] No FOUC (state set in `useGSAP` layout effect)
- **Approach:** decisions D17.  **Files:** `components/motion/Reveal.tsx`, `RevealText.tsx`, `RevealStagger.tsx`
- **Verification:** tsc · eslint · build · playwright

### CARD-024 · Apply reveals across routes (+ playground hover guard)
- **Type:** feat + a11y  ·  **Effort:** M  ·  **Impact:** High  ·  (Roadmap R5)
- **Why:** the user's core request — text loads up and cards appear on scroll on every route.
- **Acceptance criteria:**
  - [ ] `/work`, `/playground`, `/about`, `/design-system`, `/accessibility` reveal headings (SplitText) + cards/lists (batch)
  - [ ] Playground card hover `scale` gated by reduced motion
  - [ ] Content stays server-rendered (LCP = text); axe 0 violations 6×2; keyboard + reduced-motion safe
- **Approach:** decisions D17.  **Files:** the five route `page.tsx` + `components/work/ProjectSection.tsx`
- **Verification:** tsc · eslint · build · playwright · preview (all routes, dark+light, reduced-motion)

### CARD-025 · Extend e2e tests for reveals
- **Type:** test  ·  **Effort:** S  ·  **Impact:** Med
- **Acceptance criteria:**
  - [ ] Reduced-motion: reveal targets fully visible on each new route
  - [ ] Motion: targets end `opacity:1`/untransformed after scroll; heading accessible names intact (`getByRole`)
  - [ ] axe matrix stays green
- **Files:** `e2e/a11y.spec.ts`
- **Verification:** playwright

---

_Last updated: 2026-06-18. Source of truth for cards; mirror status to [session-log.md](session-log.md) phases._
