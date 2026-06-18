# AI SDLC — jazxii-portfolio

An **AI-assisted Software Development Life Cycle** playbook for this repo: how
features are planned, built, verified, and shipped with an AI pair (Claude /
Copilot) in the loop — plus a **Kanban board template** and a **roadmap** for
the next wave of work (interactive 3D elements + GSAP scroll animations).

> Companion docs: [jazxii-portfolio-PRD.md](jazxii-portfolio-PRD.md) (the what),
> [decisions.md](decisions.md) (the why), [session-log.md](session-log.md)
> (the history). This file is the *how we work* + *what's next*.

---

## 1. Principles

1. **Accessibility is a definition-of-done item, not a phase.** Every change
   keeps axe at **0 violations** across all routes × both themes and stays
   WCAG 2.2 AA. (PRD §8.)
2. **AI proposes, human disposes.** The AI drafts code, tests, and docs; the
   human reviews diffs, owns intent, and approves anything destructive.
3. **Small, reversible steps.** Prefer archiving over deleting (see
   [archive/](archive/)); keep the working tree green between steps.
4. **The verification loop is non-negotiable** (see §3). A feature isn't "done"
   until tsc + eslint + build + Playwright (axe) all pass.
5. **Document as you go.** Decisions → `decisions.md`; narrative → `session-log.md`;
   spec changes → the PRD.

---

## 2. The AI-SDLC stages

| Stage | Human | AI | Artifact |
|---|---|---|---|
| **0 · Frame** | States intent / acceptance criteria | Asks clarifying Qs, restates scope | A Kanban card (see §4) |
| **1 · Explore** | Points at refs/files | Reads code, summarises constraints, cites files | Short findings note |
| **2 · Design** | Picks the option | Proposes 1–3 approaches + tradeoffs | A `decisions.md` entry (Dn) |
| **3 · Build** | Reviews diffs | Implements in small edits, keeps a11y invariants | Code + updated tests |
| **4 · Verify** | Spot-checks preview | Runs the loop (§3), fixes failures | Green tsc/eslint/build/axe |
| **5 · Document** | Approves | Updates PRD / decisions / session-log | Updated docs |
| **6 · Ship** | Commits / deploys | Drafts commit message / PR summary | Commit on Vercel |

**Definition of Done (every card):**
- [ ] `npx tsc --noEmit` clean
- [ ] `npx eslint .` clean (React-compiler rules included — see [decisions.md](decisions.md) D11)
- [ ] `npm run build` green
- [ ] `npx playwright test` green — **axe 0 violations**, all routes × dark + light
- [ ] Keyboard-operable, visible focus, no traps; `prefers-reduced-motion` honoured
- [ ] Docs updated (PRD / decisions / session-log as applicable)

---

## 3. Verification loop (canonical)

```bash
npx tsc --noEmit        # types
npx eslint .            # lint (fails the build if it fails here — D11)
npm run build           # production build (Next 16 + React 19)
npx playwright test     # axe both themes + behaviour; server on port 3210
```

Restart the preview server after a rebuild. axe must be **0 violations** in both
themes; Lighthouse a11y = 1.0, perf ≥ 0.9 (PRD §2, §9).

---

## 4. Kanban board template

Copy this board (or a single card) when starting work. Keep WIP low — **max 2
cards In Progress** at once. Columns flow left → right.

```md
# Kanban — <milestone / sprint name>

## 📥 Backlog
- [ ] CARD-000 · <title>

## 🔎 Ready (groomed, acceptance criteria written)
- [ ] CARD-000 · <title>

## 🛠️ In Progress (WIP ≤ 2)
- [ ] CARD-000 · <title> — @owner

## 👀 In Review (diffs + verification loop)
- [ ] CARD-000 · <title>

## ✅ Done (DoD met, docs updated)
- [x] CARD-000 · <title>

## 🧊 Icebox / Parked
- [ ] CARD-000 · <title>
```

### Card template

```md
### CARD-000 · <short imperative title>
- **Type:** feat | fix | chore | a11y | perf | docs | spike
- **Why / user value:**
- **Acceptance criteria:**
  - [ ] <observable, testable outcome>
  - [ ] axe 0 violations (6 routes × 2 themes)
  - [ ] keyboard + reduced-motion safe
- **Approach (link decisions.md Dn):**
- **Files likely touched:**
- **Verification:** tsc · eslint · build · playwright
- **Effort:** S / M / L   **Impact:** Low / Med / High
- **Status notes / blockers:**
```

### Example (today's work, for reference)

```md
### CARD-018 · Revert + archive the in-island music player
- **Type:** chore + a11y
- **Why:** simplify the island to a clean nav; plan a richer 3D treatment instead.
- **Acceptance criteria:**
  - [x] Minimised: album art + looping EQ; Expanded: only 4 enlarged nav buttons
  - [x] Player archived, out of build/lint pipeline
  - [x] axe 0 violations, 22/22 Playwright
- **Approach:** decisions.md D4c
- **Status:** Done — see session-log Phase 8.
```

---

## 5. Roadmap — interactive 3D + GSAP scroll animations

Sequenced so each item is shippable on its own and never regresses the a11y or
perf budget. Every 3D/motion item ships a **static, reduced-motion-safe
fallback** first, then layers motion behind `prefers-reduced-motion: no-preference`.

### Now / Next (next 1–2 iterations)

| ID | Item | Effort | Impact | Notes |
|---|---|---|---|---|
| R1 | **3D character in the dynamic island** | M | High | The planned replacement for the music player. A small idle-animated avatar/mascot in the collapsed pill (CSS-3D first, then optional WebGL). Decorative (`aria-hidden`); idle loop only under motion-allowed; static frame otherwise. |
| ~~R2~~ | ~~**GSAP + ScrollTrigger groundwork**~~ ✅ Done (Phase 10) | S | Med | `lib/gsap.ts` registers ScrollTrigger + SplitText once; one global `SmoothScroll` provider runs Lenis synced to ScrollTrigger. See [decisions.md](decisions.md) D17. |
| R3 | **Work page scroll-spy polish** | M | High | Upgrade `/work` sticky index with GSAP-driven active-section transitions + `aria-current`; IntersectionObserver remains the source of truth (motion is enhancement only). |

### Later (2–4 iterations out)

| ID | Item | Effort | Impact | Notes |
|---|---|---|---|---|
| R4 | **Diorama → light WebGL upgrade (optional)** | L | Med | Re-introduce React Three Fiber *only* for the hero desk, code-split + `pointer:fine` gated, with the current CSS-3D diorama as the no-JS/reduced-motion fallback. Re-evaluate vs. the "no WebGL" decision (PRD §7). |
| ~~R5~~ | ~~**Scroll-driven section reveals**~~ ✅ Done (Phase 10) | M | Med | Shipped site-wide (not just About + Playground): `Reveal` / `RevealText` (SplitText) / `RevealStagger` (ScrollTrigger.batch) on every route; reduced-motion shows final state instantly. See [decisions.md](decisions.md) D17. |
| R6 | **Pinned scrollytelling beat on Home** | L | High | A pinned, scrubbed "build story" sequence (Juan-Mora-style) between hero and Work teaser; SVG/CSS first, 3D optional. |
| R7 | **Cursor-reactive 3D parallax depth** | M | Low | Extend the existing page-wide pointer parallax to a subtle multi-layer depth on the 3D character + diorama. |

### Icebox (validate value first)

| ID | Item | Notes |
|---|---|---|
| R8 | Audio re-introduction as an explicit, opt-in toggle (not autoplay) | Reuse archived `IslandPlayer.tsx`; gate behind a clear control. |
| R9 | Per-project deep case-study pages (`/work/[slug]`) with 3D headers | Architecture already supports it (PRD §4). |
| R10 | WebGL particle/shader ambient backdrop (perf-gated) | Must beat the current CSS ambient on the perf budget to ship. |

### Cross-cutting guardrails for all roadmap items

- **A11y:** decorative 3D/motion is `aria-hidden` and never the only way to get
  content; keyboard paths and visible focus are unaffected; `prefers-reduced-motion`
  always yields a polished static fallback (PRD §8).
- **Perf:** lazy-load GSAP/Lenis/WebGL; keep hero-route JS ≤ ~120 KB gz (PRD §9);
  LCP stays the real `<h1>` text, not a canvas.
- **Tech:** GSAP + ScrollTrigger + Lenis is the chosen motion stack (PRD §7);
  prefer CSS-3D before WebGL; register plugins once and gate in JS *and* CSS.

---

## 6. Roles in the loop

- **Human (maintainer):** owns intent, picks designs, reviews diffs, approves
  destructive/irreversible actions, commits/deploys.
- **AI pair:** explores the codebase, proposes approaches, writes code + tests +
  docs, runs the verification loop, and surfaces risks (a11y, perf, security).

---

_Last updated: 2026-06-17 (Phase 10 — GSAP scroll-reveals shipped site-wide; R2 + R5 done. Live board: [kanban.md](kanban.md). See [session-log.md](session-log.md))._
