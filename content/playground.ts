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
      alt: "Screen recording of the Clawspace dashboard — a dark agent control panel greeting 'Good morning, Jazxii', with content-queue, open-boards, digests and proposals metric cards above live activity-log, bus-headlines, token-budget and Notion-sync panels.",
      width: 1280,
      height: 820,
      poster: "/media/project-clawspace-img.png",
    },
  },
  {
    slug: "linkedin-banner",
    title: "LinkedIn Banner design",
    medium: "Experiment · Neo4j + LLM retrieval",
    date: "2026-05",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-linkedin-banner.png",
      alt: "Dark LinkedIn banner reading 'Inclusive Technology' in bold white, with floating iridescent glass cubes and a pill showing the phone number and the email jassimmohammed2910@gmail.com.",
      width: 1280,
      height: 900,
    },
  },
  {
    slug: "character-sheet-higgsfield-ai",
    title: "Character sheet from higgsfield AI",
    medium: "Higgsfield AI · AI + nano banana pro",
    date: "2026-05",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-ai-character-sheet.png",
      alt: "AI-generated six-panel character sheet of a bearded man in sunglasses and a light-grey coat over black on a grey studio backdrop — front, profile and back (with a backpack) full-body views, two face close-ups, and a wrist wearing a smartwatch.",
      width: 1280,
      height: 900,
    },
  },
  {
    slug: "logo-design",
    title: "Logo Design : VibeQart",
    medium: "Logo Design · Figma + design",
    date: "2026-05",
    href: "https://www.instagram.com/",
    media: {
      src: "/media/play-logo-design.png",
      alt: "Logo design for 'Vibe Qart' — a serif 'VQ' monogram enclosing a tiny dress, gift boxes, perfume and flowers, shown in four colourways (gold on cream, cream on brown, gold on black, cream on charcoal) above the wordmark.",
      width: 1280,
      height: 980,
    },
  },
  {
    slug: "cinematic-reel-higgsfield-ai",
    title: "Cinematic Reel — Higgsfield AI",
    medium: "Creative tech · Higgsfield AI",
    date: "2026-05",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-self-ai-gen.mp4",
      alt: "AI-generated cinematic clip — a lone figure dwarfed by towering concrete pillars that cast long diagonal shadows across a sunlit floor.",
      width: 1280,
      height: 940,
    },
  },
  {
    slug: "equa11y-web-design",
    title: "Equa11y Web Design",
    medium: "Web app · Design + Discovery",
    date: "2026-01",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-equally-design.png",
      alt: "Landing-page design for the Equa11y accessibility platform — a split hero contrasting 'AI that scans thousands of pages a second' (with a live WCAG scan-results table) against 'Auditors who actually use a screen reader' (a human auditor profile), above a row of client logos.",
      width: 1280,
      height: 760,
    },
  },
  {
    slug: "l-&-d-session",
    title: "Learning & Development Session",
    medium: "Session · AI accessibility intro",
    date: "2026-05",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-l-and-d.mov",
      alt: "Screen recording from the AI-accessibility Learning & Development session — dark slides headed 'What you'll leave this session able to do yourself', listing outcomes like auditing HTML for WCAG 2.2, writing JIRA-ready defects, generating ARIA fixes, and writing Playwright + axe-core tests.",
      width: 1280,
      height: 720,
    },
  },
  {
    slug: "logo-ai-cinematic",
    title: "Logo AI Cinematic video : MAM Associates",
    medium: "Front-end · maintenance",
    date: "2026-05",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-logo-ai-cinematic.mp4",
      alt: "AI logo-reveal animation for MAM Associates — sweeping black ink brushstrokes draw across a cream background to form the brand mark.",
      width: 1280,
      height: 720,
    },
  },
  {
    slug: "dynamic-island-topnav",
    title: "Dynamic Island Topnav",
    medium: "Event site · front-end",
    date: "2026-06",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-dynamicisland-topnav.mov",
      alt: "Screen recording of the Dynamic Island top-nav — an iPhone-style black pill with a gradient album-art chip and an animated equaliser, which expands to reveal the navigation links.",
      width: 1280,
      height: 880,
    },
  },
  {
    slug: "socialmedia-campaign",
    title: "Social media campaign for Tanishq",
    medium: "Freelance · video/graphic editing",
    date: "2024-05",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-socialmedia-design.png",
      alt: "Three Tanishq Raksha Bandhan social-media posts in red and gold — 'Where bonds shine brighter' and 'This Raksha Bandhan' showing children celebrating, alongside a gold necklace with a '25% off' offer.",
      width: 1280,
      height: 780,
    },
  },
  {
    slug: "accessibility-research-poster",
    title: "Accessibility Research Poster",
    medium: "Research · Accessibility",
    date: "2022-02",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-ada-tree.png",
      alt: "Hand-drawn infographic with the pull-quote 'The Accessibility Tree (AT)… is the most reliable and semantically rich world model for a web agent' (key phrases highlighted in yellow), ringed by doodled browser, eye, code, brain and node-graph icons.",
      width: 1280,
      height: 720,
    },
  },{
    slug: "accessibility-divide-article",
    title: "Accessibility Divide Article",
    medium: "Research · Accessibility",
    date: "2022-02",
    href: "https://www.linkedin.com/in/jassim-m-shamim/",
    media: {
      src: "/media/play-disability-divide.png",
      alt: "Two-panel sketch comparing 'The Digital Divide' (a person blocked by a brick wall, a cell tower and a phone) and 'The Disability Divide' (a person facing a buggy, broken web page), separated by a deep chasm.",
      width: 1280,
      height: 720,
    },
  },
];
