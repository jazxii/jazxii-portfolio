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
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const playgroundItems: PlaygroundItem[] = [
  {
    slug: "a11y-agents",
    title: "AI Agents for A11y Testing",
    medium: "Experiment · Playwright + axe-core + LLM",
    date: "2026-03",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-a11y-agents.svg",
      alt: "Abstract waveform over a blue card, captioned 'Playwright · axe-core · LLM'.",
      width: 1280,
      height: 820,
    },
  },
  {
    slug: "wcag-graph-rag",
    title: "WCAG Graph RAG",
    medium: "Experiment · Neo4j + LLM retrieval",
    date: "2026-01",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-wcag-graphrag.svg",
      alt: "Small node-and-edge knowledge graph on a blue card, captioned 'Neo4j · LLM retrieval'.",
      width: 1280,
      height: 900,
    },
  },
  {
    slug: "house-of-alt",
    title: "House of Alt Campaign",
    medium: "Social campaign · video + design",
    date: "2024-04",
    href: "https://www.instagram.com/",
    media: {
      src: "/media/play-house-of-alt.svg",
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
      src: "/media/play-ar-filters.svg",
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
      src: "/media/play-world-space-week.svg",
      alt: "Stylised rocket on a blue card for the VIT × ISRO World Space Week event site.",
      width: 1280,
      height: 760,
    },
  },
  {
    slug: "thanima-2022",
    title: "Thanima 2022",
    medium: "Event site · front-end",
    date: "2022-09",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-thanima.svg",
      alt: "Stacked code-line bars on a blue card for the Thanima 2022 Onam festival website.",
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
      src: "/media/play-relic-edits.svg",
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
      src: "/media/play-mla-site.svg",
      alt: "Stacked code-line bars on a blue card for the first Malayalam Literary Association website.",
      width: 1280,
      height: 720,
    },
  },
];
