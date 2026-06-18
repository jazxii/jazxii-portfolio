"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

/**
 * Single place that registers GSAP plugins, so every motion component shares
 * one registered instance (avoids double-registration warnings and keeps the
 * plugin list in one spot — see decisions.md D17).
 *
 * SplitText + ScrollTrigger now ship in the public `gsap` package (free since
 * GSAP 3.13), so no auth/registry steps are needed. `useGSAP` runs its setup in
 * a layout effect and auto-reverts via gsap.context() on unmount — that's what
 * makes the reveals FOUC-safe and cleanup-safe in React 19.
 */
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
