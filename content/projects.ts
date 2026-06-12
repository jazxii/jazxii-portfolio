/**
 * Project content model (PRD §5.2). Add a project = add an entry.
 * All entries below are PLACEHOLDERS — swap with real work.
 * Media lives in /public/media; every image needs real alt text
 * describing what the visual shows.
 */

export type Project = {
  slug: string;
  title: string;
  year: number;
  challenge: string;
  services: string[];
  role: string;
  liveUrl?: string;
  repoUrl?: string;
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
    slug: "inclusive-design-system",
    title: "Inclusive Design System",
    year: 2026,
    challenge:
      "A fintech product team shipped fast but every release reintroduced the same accessibility defects. The challenge: a component library where the accessible path is the only path — tokens, focus management, and ARIA baked in so product teams can't ship inaccessible UI by accident.",
    services: ["Design systems", "WCAG 2.2 audit", "React", "Design tokens"],
    role: "Lead accessibility engineer — architecture, token contrast tooling, component APIs, CI gates.",
    liveUrl: "https://example.com/design-system",
    repoUrl: "https://github.com/jazxii",
    media: {
      src: "/media/project-design-system.svg",
      alt: "Component library screens showing a button matrix with contrast ratios annotated on each variant.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "screen-reader-analytics",
    title: "Screen Reader Analytics",
    year: 2025,
    challenge:
      "Product analytics ignore assistive-tech users entirely. Built a privacy-first telemetry layer that surfaces where screen reader and keyboard users abandon flows, giving teams evidence to prioritise fixes.",
    services: ["Data viz", "Accessibility research", "TypeScript", "D3"],
    role: "Creator — research, instrumentation design, accessible dashboard UI.",
    liveUrl: "https://example.com/sr-analytics",
    media: {
      src: "/media/project-analytics.svg",
      alt: "Dashboard with a funnel chart comparing task completion for keyboard, screen reader, and pointer users.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "ai-alt-text-pipeline",
    title: "AI Alt-Text Pipeline",
    year: 2025,
    challenge:
      "A media company's archive had two million images without alternative text. Built a human-in-the-loop pipeline pairing vision models with editor review queues — quality of hand-written alt text at a fraction of the cost.",
    services: ["AI engineering", "Python", "Vision models", "Editorial tooling"],
    role: "Engineer — model evaluation, review UI, confidence thresholds, rollout.",
    repoUrl: "https://github.com/jazxii",
    media: {
      src: "/media/project-alt-text.svg",
      alt: "Editorial review queue showing an image, a suggested description, and approve and rewrite controls.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "motion-safe-storytelling",
    title: "Motion-Safe Storytelling",
    year: 2024,
    challenge:
      "Award-bait scroll experiences usually exclude motion-sensitive and keyboard users. Recreated a cinematic scroll-driven story so the reduced-motion path is equally polished — proof that craft and care can coexist.",
    services: ["Creative coding", "GSAP", "Scroll choreography", "Reduced motion"],
    role: "Designer-engineer — concept, motion design, dual-path implementation.",
    liveUrl: "https://example.com/motion-safe",
    media: {
      src: "/media/project-motion.svg",
      alt: "Side-by-side comparison of a scroll story in full-motion and reduced-motion modes showing identical content.",
      width: 1280,
      height: 800,
    },
  },
];
