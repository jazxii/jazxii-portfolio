# Archive

Code kept for reference but intentionally **out of the build pipeline**
(excluded in `tsconfig.json` and `eslint.config.mjs`).

## IslandPlayer.tsx

The functional "now playing" music player that previously lived inside the
dynamic-island nav (Phase 7). Reverted on 2026-06-17: the expanded island now
shows only the four enlarged nav buttons; the collapsed pill keeps the album
art + looping equaliser.

It was a fully real, accessible `<audio>` player (labelled transport buttons,
a named "Seek" slider, like toggle, AirPlay/cast, polite live region, no
autoplay). The original royalty-free loops still ship in `public/audio/`.

To restore: move this file back to `components/chrome/IslandPlayer.tsx`, import
it in `Nav.tsx`, render it inside `.island-panel`, and re-add the `.island-player`
/ `.ip-*` styles to `app/globals.css` (see git history for the removed block).

A richer treatment (3D character / GSAP scroll animation) is planned — see
`../ai-sdlc.md`.
