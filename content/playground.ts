/**
 * Playground content model (PRD §5.3). Add an item = add an entry.
 * Newest first. Content is real (experiments, builds, and creative work);
 * the media SVGs are placeholders — swap with real captures when ready.
 */

export type PlaygroundItem = {
  slug: string;
  title: string;
  medium: string;
  date: string; // ISO yyyy-mm
  href: string;
  media: {
    /** Image, or a video file (.mp4/.webm/.mov) — the card auto-detects it. */
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Optional still shown for videos before play / under reduced motion. */
    poster?: string;
  };
};

export const playgroundItems: PlaygroundItem[] = [
  {
    slug: "clawspace-agents",
    title: "Clawspace Agents",
    medium: "Experiment · Playwright + axe-core + LLM",
    date: "2026-03",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-clawspace.mp4",
      alt: "Abstract waveform over a blue card, captioned 'Playwright · axe-core · LLM'.",
      width: 1280,
      height: 820,
    },
  },
  {
    slug: "linkedin-banner",
    title: "LinkedIn Banner",
    medium: "Experiment · Neo4j + LLM retrieval",
    date: "2026-01",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-linkedin-banner.png",
      alt: "Small node-and-edge knowledge graph on a blue card, captioned 'Neo4j · LLM retrieval'.",
      width: 1280,
      height: 900,
    },
  },
  {
    slug: "wcag-graph-rag",
    title: "WCAG Graph RAG",
    medium: "Experiment · Neo4j + LLM retrieval",
    date: "2026-01",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-ai-character-sheet.png",
      alt: "Small node-and-edge knowledge graph on a blue card, captioned 'Neo4j · LLM retrieval'.",
      width: 1280,
      height: 900,
    },
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    medium: "Social campaign · video + design",
    date: "2024-04",
    href: "https://www.instagram.com/",
    media: {
      src: "/media/play-logo-design.png",
      alt: "Play button on a blue card, captioned '250 pieces · 2.5k Instagram / 4k YouTube'.",
      width: 1280,
      height: 980,
    },
  },
  {
    slug: "ar-filters-palette",
    title: "AR Filters — Palette '21",
    medium: "Creative tech · Spark AR",
    date: "2021-09",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-self-ai-gen.mp4",
      alt: "Concentric augmented-reality target rings on a blue card, captioned 'Spark AR · creative tech'.",
      width: 1280,
      height: 940,
    },
  },
  {
    slug: "world-space-week",
    title: "World Space Week",
    medium: "Web app · VIT × ISRO",
    date: "2022-10",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-equally-design.png",
      alt: "Stylised rocket on a blue card for the VIT × ISRO World Space Week event site.",
      width: 1280,
      height: 760,
    },
  },
  {
    slug: "mla-website",
    title: "First MLA Website",
    medium: "Front-end · maintenance",
    date: "2022-02",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-l-and-d.mov",
      alt: "Stacked code-line bars on a blue card for the first Malayalam Literary Association website.",
      width: 1280,
      height: 720,
    },
  },
  {
    slug: "mla-website",
    title: "First MLA Website",
    medium: "Front-end · maintenance",
    date: "2022-02",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-logo-ai-cinematic.mp4",
      alt: "Stacked code-line bars on a blue card for the first Malayalam Literary Association website.",
      width: 1280,
      height: 720,
    },
  },
  {
    slug: "dynamic-island-topnav",
    title: "Dynamic Island Topnav",
    medium: "Event site · front-end",
    date: "2022-09",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-dynamicisland-topnav.mov",
      alt: "Stacked code-line bars on a blue card for the Dynamic Island Topnav event site.",
      width: 1280,
      height: 880,
    },
  },
  {
    slug: "relic-labs-edits",
    title: "RELIC LABS Edits",
    medium: "Freelance · video editing",
    date: "2023-05",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-socialmedia-design.png",
      alt: "Video play button on a blue card, captioned 'freelance video editing'.",
      width: 1280,
      height: 780,
    },
  },
  {
    slug: "mla-website",
    title: "First MLA Website",
    medium: "Front-end · maintenance",
    date: "2022-02",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-ada-tree.png",
      alt: "Stacked code-line bars on a blue card for the first Malayalam Literary Association website.",
      width: 1280,
      height: 720,
    },
  },{
    slug: "mla-website",
    title: "First MLA Website",
    medium: "Front-end · maintenance",
    date: "2022-02",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-disability-divide.png",
      alt: "Stacked code-line bars on a blue card for the first Malayalam Literary Association website.",
      width: 1280,
      height: 720,
    },
  },
];
