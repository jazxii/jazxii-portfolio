/**
 * Playground content model (PRD §5.3). Add an item = add an entry.
 * Newest first. All entries are PLACEHOLDERS — swap with real
 * experiments, Figma concepts, AI demos, and curation.
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
    slug: "contrast-grid",
    title: "Contrast Grid",
    medium: "Web experiment · TypeScript",
    date: "2026-05",
    href: "https://example.com/contrast-grid",
    media: {
      src: "/media/play-contrast-grid.svg",
      alt: "Grid of color token pairs, each cell labelled with its WCAG contrast ratio.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "focus-ring-studies",
    title: "Focus Ring Studies",
    medium: "Design exploration · CSS",
    date: "2026-04",
    href: "https://example.com/focus-rings",
    media: {
      src: "/media/play-focus-rings.svg",
      alt: "Twelve button variations demonstrating different visible focus indicator treatments.",
      width: 1280,
      height: 960,
    },
  },
  {
    slug: "reduced-motion-lab",
    title: "Reduced Motion Lab",
    medium: "Web experiment · GSAP",
    date: "2026-03",
    href: "https://example.com/prm-lab",
    media: {
      src: "/media/play-prm-toggle.svg",
      alt: "Animation playground with a toggle comparing full-motion and reduced-motion variants side by side.",
      width: 1280,
      height: 720,
    },
  },
  {
    slug: "token-inspector",
    title: "Token Inspector",
    medium: "Dev tool · React",
    date: "2026-02",
    href: "https://example.com/token-inspector",
    media: {
      src: "/media/play-color-tokens.svg",
      alt: "Browser devtools panel listing design tokens with live contrast warnings.",
      width: 1280,
      height: 880,
    },
  },
  {
    slug: "ascii-shader",
    title: "ASCII Shader",
    medium: "Creative coding · Canvas",
    date: "2025-12",
    href: "https://example.com/ascii-shader",
    media: {
      src: "/media/play-ascii-shader.svg",
      alt: "Portrait rendered entirely from ASCII characters with a blue gradient.",
      width: 1280,
      height: 1100,
    },
  },
  {
    slug: "figma-a11y-kit",
    title: "Figma A11y Annotation Kit",
    medium: "Figma community file",
    date: "2025-10",
    href: "https://example.com/figma-kit",
    media: {
      src: "/media/play-figma-kit.svg",
      alt: "Figma components for annotating tab order, landmarks, and ARIA roles on mockups.",
      width: 1280,
      height: 800,
    },
  },
  {
    slug: "sound-visualizer",
    title: "Sound Visualizer",
    medium: "Creative coding · Web Audio",
    date: "2025-08",
    href: "https://example.com/sound-viz",
    media: {
      src: "/media/play-sound-viz.svg",
      alt: "Audio waveform visualization with a synchronized text transcript below it.",
      width: 1280,
      height: 960,
    },
  },
  {
    slug: "type-specimen",
    title: "Clash Display Specimen",
    medium: "Typography · Print to web",
    date: "2025-06",
    href: "https://example.com/type-specimen",
    media: {
      src: "/media/play-type-spec.svg",
      alt: "Type specimen poster for Clash Display showing weights from medium to bold.",
      width: 1280,
      height: 1140,
    },
  },
];
