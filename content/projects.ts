/**
 * Project content model (PRD §5.2). Add a project = add an entry.
 * Content is real (sourced from LinkedIn); the media SVGs are still
 * placeholders — swap with real screenshots/recordings when available.
 * Every image needs real alt text describing what the visual shows.
 */

export type Project = {
  slug: string;
  title: string;
  year: number;
  /** Short period label shown when a single year doesn't tell the story. */
  period?: string;
  challenge: string;
  services: string[];
  role: string;
  liveUrl?: string;
  repoUrl?: string;
  /**
   * Badge shown when there's no public link (internal / research work),
   * e.g. "Internal platform" or "Research project".
   */
  context?: string;
  media: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Optional muted looping video; the image becomes its poster. */
    videoSrc?: string;
    videoDescription?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "accessibility-ai-platform",
    title: "Accessibility AI Platform",
    year: 2026,
    period: "2025 — present · Cognizant",
    challenge:
      "Accessibility work was scattered across tools: design reviews in one place, dev fixes in another, audits in a third — losing context at every handoff. I designed and built an internal platform that unifies the whole ADA workflow end-to-end, from UX/UI design review through development, ADA engineering, and lead-level oversight, into a single product surface.",
    services: [
      "AI architecture",
      "Graph RAG",
      "Neo4j",
      "React",
      "Node.js",
      "Playwright",
      "axe-core",
    ],
    role: "Designer & builder — Intelligent Auditor V2 (LLM evaluation over DOM context and screenshots), Graph RAG synthesis over a WCAG knowledge graph and historical defects, a custom rule engine, regression/comparison/trend dashboards, and an admin console for clients, users, and feedback-driven retraining.",
    context: "Internal platform",
    media: {
      src: "/media/project-accessibility-ai.svg",
      alt: "Knowledge-graph diagram of linked WCAG criteria nodes labelled 'WCAG knowledge graph · Graph RAG', representing the Accessibility AI Platform.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "albertsons-wcag-program",
    title: "Albertsons WCAG 2.2 Program",
    year: 2025,
    period: "2025 — present · Cognizant",
    challenge:
      "As primary accessibility contact for assigned releases, I owned WCAG 2.2 AA conformance across Albertsons' web and Unified Mobile App over five pods — including the Pantry PDS and Product Description Page workflows — catching design-stage issues before they could ship and remediating the ones that did.",
    services: [
      "WCAG 2.2 AA audit",
      "NVDA / VoiceOver / TalkBack",
      "Figma design review",
      "ARIA",
      "Jetpack Compose",
      "SwiftUI",
    ],
    role: "Digital accessibility engineer — audited web + mobile across 5 pods, triaged cross-pod defects with P1/P2/P3 priority feeding release-lead go/no-go reviews, reviewed Figma specs for focus order, contrast, and touch targets, and remediated at code level alongside developers.",
    context: "Client engagement",
    media: {
      src: "/media/project-albertsons.svg",
      alt: "Accessibility audit checklist of the four WCAG principles, each row ticked and tagged with a P1–P3 priority.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "enigma-8",
    title: "ENIGMA 8.0",
    year: 2022,
    period: "2021 — 2022 · IEEE-VIT",
    challenge:
      "IEEE-VIT's flagship technical fest needed a companion Android app to run registrations and event flow at scale. I led development of the app end-to-end using a clean UI and MVVM architecture — it drew over 2,400 registrations from 75+ countries.",
    services: ["Android", "Kotlin", "MVVM", "UI engineering"],
    role: "Lead developer — architecture, UI, and release; also ran a session on Android development for the chapter.",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.ieeevit.enigma8",
    media: {
      src: "/media/project-enigma.svg",
      alt: "Two tilted Android phone mockups showing an event app, captioned '2,400+ registrations · 75+ countries'.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "isro-igbt-switch-matrix",
    title: "70KV SiC IGBT Switch Matrix",
    year: 2024,
    period: "2024 · ISRO",
    challenge:
      "A radar system needed a high-voltage pulse source. Leading a project team at ISRO, I oversaw the design and implementation of a Marx-modulator-based switch matrix that achieved a stable 70KV pulse wave and a 15% increase in radar system efficacy.",
    services: ["High-voltage design", "Marx modulator", "SiC IGBT", "Systems"],
    role: "Project lead — component design and implementation; cut testing duration ~20% through process improvements and delivered outcomes to senior management.",
    context: "Research project",
    media: {
      src: "/media/project-isro.svg",
      alt: "Oscilloscope-style square-wave pulse train on a grid, captioned 'Stable 70KV pulse · +15% radar efficacy'.",
      width: 1280,
      height: 800,
    },
  },
];
