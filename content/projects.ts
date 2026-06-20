/**
 * Project content model (PRD §5.2). Add a project = add an entry.
 * Content is real (sourced from LinkedIn); the media SVGs are still
 * placeholders — swap with real screenshots/recordings when available.
 * Every image needs real alt text describing what the visual shows.
 */

/** A single image — or an optional muted/looping video with the image as its poster. */
export type MediaItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional muted looping video; the image becomes its poster. */
  videoSrc?: string;
  videoDescription?: string;
};

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
  /** Cover media — used on the project section and the home teaser cards. */
  media: MediaItem;
  /**
   * Optional additional images/videos. On the Work page these render below the
   * cover as a featured-plus-grid gallery (see MediaGallery). Each item still
   * needs real alt text. The home teaser only ever shows `media`.
   */
  gallery?: MediaItem[];
};

export const projects: Project[] = [
  {
    slug: "neo4j-agentic-graph-rag",
    title: "Neo4j Agentic Graph RAG for WCAG 2.2",
    year: 2026,
    period: "2026 · Independent",
    challenge:
      "Accessibility tooling rarely reasons over WCAG as structured knowledge — it pattern-matches against rule strings. I built a governance layer that turns the full W3C WCAG 2.2 spec into a queryable knowledge graph, then put an agent on top of it so other tools can ask grounded, citation-backed accessibility questions.",
    services: [
      "Python",
      "Neo4j",
      "Graph RAG",
      "ReAct agents",
      "OpenAI / Anthropic / Ollama",
      "ETL",
    ],
    role: "Designer & builder — 5-phase ETL into a 2,400+ node WCAG graph (13 entity types) and a ReAct agent with 9 tools, with rule-based routing for CI and LLM routing for natural-language queries.",
    repoUrl: "https://github.com/jazxii/Neo4J-GraphRAG-ETL-pipeline",
    context: "Independent project",
    media: {
      src: "/media/project-agentic-grag-01-knowledge-graph.svg",
      alt: "Knowledge-graph diagram of WCAG principles, guidelines, and criteria nodes linked by labelled edges, with an agent node querying across them.",
      width: 1280,
      height: 800,
    },
    gallery: [
      {
        src: "/media/project-agentic-grag-02-react-agent.svg",
        alt: "ReAct agent diagram showing the agent node with tools and reasoning steps, querying the WCAG knowledge graph.",
        width: 1280,
        height: 800,
      },
      {
        src: "/media/project-agentic-grag-03-etl-routing.svg",
        alt: "ETL routing diagram showing the flow of data from WCAG sources into the knowledge graph.",
        width: 1280,
        height: 800,
      },
    ],
  },
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
    role: "Designer & builder — Intelligent Auditor V2 (LLM over DOM + screenshots), Graph RAG synthesis, a custom rule engine, regression/trend dashboards, and an admin console for feedback-driven retraining.",
    context: "Internal platform",
    media: {
      src: "/media/project-ai-ada-01-unified-workflow.svg",
      alt: "Diagram showing the unified accessibility workflow from design review to development and lead oversight, captioned 'Accessibility AI Platform'.",
      width: 1280,
      height: 800,
    },
    gallery: [
      {
        src: "/media/project-ai-ada-02-intelligent-auditor.svg",
        alt: "Diagram of the Intelligent Auditor V2 showing LLM reasoning over DOM and screenshots, captioned 'Intelligent Auditor V2'.",
        width: 1280,
        height: 800,
      },
      {
        src: "/media/project-ai-ada-03-dashboards-retraining.svg",
        alt: "Diagram showing dashboards and retraining processes for the Accessibility AI Platform, captioned 'Dashboards & Retraining'.",
        width: 1280,
        height: 800,
      },
    ],
  },
  {
    slug: "albertsons-accessibility-engineer",
    title: "Digital Accessibility Engineer · Albertsons",
    year: 2025,
    period: "May 2025 — present · Cognizant",
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
    role: "Accessibility engineer — audited web + mobile across 5 pods, ran P1/P2/P3 triage into go/no-go reviews, reviewed Figma specs, and remediated in JS/React alongside developers.",
    context: "Client engagement",
    media: {
      src: "/media/project-alb-01-conformance.svg",
      alt: "Accessibility audit checklist of the four WCAG principles, each row ticked and tagged with a P1–P3 priority.",
      width: 1280,
      height: 800,
    },
    gallery: [
      {
        src: "/media/project-alb-02-web-mobile.svg",
        alt: "Web and mobile accessibility audit results for Albertsons, showing linked WCAG criteria nodes labelled 'WCAG knowledge graph · Graph RAG'.",
        width: 1280,
        height: 800,
      },
      {
        src: "/media/project-alb-03-triage-gate.svg",
        alt: "Triage gate diagram for Albertsons accessibility audit, showing linked WCAG criteria nodes labelled 'WCAG knowledge graph · Graph RAG'.",
        width: 1280,
        height: 800,
      },
    ],
  },
  {
    slug: "program-analyst-trainee",
    title: "Program Analyst Trainee",
    year: 2025,
    period: "Oct 2024 — Oct 2025 · Cognizant",
    challenge:
      "On the NFT shared-services team I built test coverage across Agile and Waterfall projects while delivering accessibility validation for 5+ client accounts. I also began pushing accessibility left — proposing AI-assisted approaches to extend automated WCAG coverage beyond off-the-shelf tooling.",
    services: [
      "Selenium (Java)",
      "TestNG",
      "Maven",
      "STLC / Agile",
      "WCAG 2.1 / 2.2",
      "NVDA / VoiceOver / TalkBack",
    ],
    role: "QA & accessibility tester — built Selenium + TestNG + Maven suites, audited web/mobile to A/AA, shipped the GAAD 'Vision Hunt' kiosk, and piloted an AI defect-management tool.",
    context: "Client engagement",
    media: {
      src: "/media/work-pat-01-test-automation.svg",
      alt: "Test-automation pipeline diagram showing Selenium, TestNG, and Maven feeding a results dashboard with passing and failing cases.",
      width: 1280,
      height: 800,
    },
    gallery: [
      {
        src: "/media/work-pat-02-shift-left.svg",
        alt: "Shift-left approach diagram for accessibility testing, showing early integration of accessibility checks in the development process.",
        width: 1280,
        height: 800,
      },
      {
        src: "/media/work-pat-03-gaad-vision-hunt.svg",
        alt: "GAAD 'Vision Hunt' kiosk diagram, representing the Accessibility AI Platform.",
        width: 1280,
        height: 800,
      },
    ],
  },
  {
    slug: "isro-igbt-switch-matrix",
    title: "70KV SiC IGBT Switch Matrix",
    year: 2024,
    period: "Jan — May 2024 · ISRO / ISTRAC",
    challenge:
      "A radar system needed a high-voltage pulse source. Leading a project team at ISRO's Telemetry Tracking and Command Network, I oversaw the design and implementation of a Marx-modulator-based switch matrix that achieved a stable 70KV pulse wave and a 15% increase in radar system efficacy.",
    services: [
      "High-voltage design",
      "Marx modulator",
      "SiC IGBT",
      "ML-assisted tuning",
      "Systems",
    ],
    role: "Project lead — component design and implementation, plus ML-assisted PID tuning for pulse stability; cut testing duration ~20% and delivered outcomes to senior management.",
    context: "Research project",
    media: {
      src: "/media/project-isro-01-marx-pulse.svg",
      alt: "Oscilloscope-style square-wave pulse train on a grid, captioned 'Stable 70KV pulse · +15% radar efficacy'.",
      width: 1280,
      height: 800,
    },
    gallery: [
      {
        src: "/media/project-isro-02-switch-matrix.svg",
        alt: "Switch matrix diagram showing the configuration of SiC IGBTs and Marx modulators for high-voltage pulse generation.",
        width: 1280,
        height: 800,
      },
      {
        src: "/media/project-isro-03-ml-pid-tuning.svg",
        alt: "ML-assisted PID tuning diagram for pulse stability, showing the integration of machine learning algorithms with the switch matrix control system.",
        width: 1280,
        height: 800,
      },
    ],
  },
  
  {
    slug: "house-of-alt-campaign",
    title: "House of Alt — Social Media Campaign",
    year: 2024,
    period: "Mar — Apr 2024",
    challenge:
      "An awareness campaign needed a high volume of platform-ready content on a tight timeline. I produced static and short-form video content across Instagram, YouTube, Facebook, and X to drive reach and engagement.",
    services: ["Content production", "Video editing", "Social media", "Reels"],
    role: "Media team — produced 250 content pieces (static + one-minute reels), reaching 2.5k Instagram followers and 4k YouTube subscribers.",
    context: "Campaign work",
    media: {
      src: "/media/work-socialmedia-01-multi-platform.svg",
      alt: "Grid of social-media post thumbnails across Instagram, YouTube, Facebook, and X, captioned '250 pieces of content'.",
      width: 1280,
      height: 800,
    },
    gallery: [
      {
        src: "/media/work-socialmedia-02-short-form-reels.svg",
        alt: "Grid of short-form video reels across Instagram, YouTube, Facebook, and X, captioned '250 pieces of content'.",
        width: 1280,
        height: 800,
      },
      {
        src: "/media/work-socialmedia-03-content-volume.svg",
        alt: "Diagram showing the volume of content produced for the campaign, captioned '250 pieces of content'.",
        width: 1280,
        height: 800,
      },
    ],
  },
  {
    slug: "renewable-grid-integration",
    title: "Renewable Energy Grid Integration",
    year: 2023,
    period: "Jun 2023 · Grid Controller of India",
    challenge:
      "Integrating large-scale solar into a state grid risks stability if it isn't modelled carefully. I modelled the integration of 1000 MW of solar power into the Kerala state grid using advanced simulation, focused on improving efficiency and reducing the grid's import dependence.",
    services: ["PSSE", "Python (pyPSSE)", "Power systems", "Grid simulation"],
    role: "Intern — modelled 1000 MW solar into the Kerala grid with PSSE + pyPSSE, achieving a 25–30% reduction in power imports while improving stability.",
    context: "Internship project",
    media: {
      src: "/media/project-renewable-energy-01-solar-to-grid.svg",
      alt: "Diagram showing the integration of 1000 MW solar power into the Kerala state grid, captioned '25–30% reduction in power imports'.",
      width: 1280,
      height: 800,
    },
    gallery: [
      {
        src: "/media/project-renewable-energy-02-load-flow.svg",
        alt: "Load flow diagram showing the integration of 1000 MW solar power into the Kerala state grid.",
        width: 1280,
        height: 800,
      },
      {
        src: "/media/project-renewable-energy-03-import-reduction.svg",
        alt: "Diagram showing the reduction in power imports after integrating 1000 MW solar power into the Kerala state grid, captioned '25–30% reduction in power imports'.",
        width: 1280,
        height: 800,
      },
    ],
  },
  // {
  //   slug: "relic-labs-video-editing",
  //   title: "Freelance Video Editor · RELIC Labs",
  //   year: 2023,
  //   period: "Oct 2022 — May 2023",
  //   challenge:
  //     "RELIC Labs needed polished, on-brand video output on a freelance basis. I handled editing end-to-end, turning raw footage into finished pieces ready to publish.",
  //   services: ["Video editing", "Post-production", "Motion"],
  //   role: "Freelance editor — edited and delivered finished video content for the studio.",
  //   context: "Freelance",
  //   media: {
  //     src: "/media/project-relic-labs.svg",
  //     alt: "Video-editing timeline interface with stacked clip and audio tracks and a preview frame.",
  //     width: 1280,
  //     height: 800,
  //   },
  // },
  {
    slug: "enigma-8",
    title: "ENIGMA 8.0 · IEEE-VIT Vellore",
    year: 2022,
    period: "2021 — 2022 · IEEE-VIT",
    challenge:
      "IEEE-VIT's flagship technical fest needed a companion Android app to run registrations and event flow at scale. I led development of the app end-to-end using a clean UI and MVVM architecture — it drew over 2,400 registrations from 75+ countries.",
    services: ["Android", "Kotlin", "MVVM", "UI engineering"],
    role: "Lead developer — owned architecture, UI, and release, and ran a chapter session on Android development.",
    liveUrl:
      "https://play.google.com/store/apps/details?id=com.ieeevit.enigma8",
    media: {
      src: "/media/project-enigma.svg",
      alt: "Two tilted Android phone mockups showing an event app, captioned '2,400+ registrations · 75+ countries'.",
      width: 1280,
      height: 800,
    },
  },
  // {
  //   slug: "ieee-vit-chapter",
  //   title: "IEEE-VIT Vellore",
  //   year: 2023,
  //   period: "Nov 2020 — Sep 2023",
  //   challenge:
  //     "Beyond the ENIGMA build, I contributed across the IEEE-VIT chapter's tech, operations, and outreach over nearly three years — building training apps, running event operations, and driving registrations for flagship events.",
  //   services: ["Android", "MVVM", "AR filters", "Event ops"],
  //   role: "Tech / operations / outreach — built a training app on UI + MVVM, created AR filters for Palette'21, and handled event ops and outreach across multiple events.",
  //   context: "Student chapter",
  //   media: {
  //     src: "/media/project-ieee-vit.svg",
  //     alt: "IEEE-VIT event collage showing an app screen, an AR camera filter, and a registrations counter.",
  //     width: 1280,
  //     height: 800,
  //   },
  // },
  {
    slug: "malayalam-literary-association",
    title: "Malayalam Literary Association",
    year: 2023,
    period: "Feb 2022 — Nov 2023",
    challenge:
      "The association had no web presence. I helped build its first website and stayed on to maintain it and keep its content current, alongside publicity and outreach for events.",
    services: ["Frontend development", "Web maintenance", "HTML / CSS"],
    role: "Technical team & mentor — front-end developer on the first MLA website, responsible for new content and upkeep.",
    context: "Student association",
    media: {
      src: "/media/project-mla.png",
      alt: "Browser window mockup of the Malayalam Literary Association website homepage with navigation and an events section.",
      width: 1280,
      height: 800,
    },
  },
  // {
  //   slug: "vit-event-websites",
  //   title: "VIT Event Websites",
  //   year: 2022,
  //   period: "Aug — Nov 2022 · VIT Vellore",
  //   challenge:
  //     "Two VIT events needed dedicated web presences. I built the World Space Week site — run in partnership with ISRO — and the official site for Thanima 2022, VIT's Onam celebration hosted by the Office of Students' Welfare.",
  //   services: ["Frontend development", "HTML / CSS", "JavaScript", "Responsive design"],
  //   role: "Frontend developer — built and shipped the World Space Week and Thanima 2022 event sites.",
  //   context: "University project",
  //   media: {
  //     src: "/media/project-vit-events.svg",
  //     alt: "Two event website mockups side by side — a space-themed World Space Week page and a festive Thanima 2022 page.",
  //     width: 1280,
  //     height: 800,
  //   },
  // },
  // {
  //   slug: "photography-club-vit",
  //   title: "The Photography Club · VIT",
  //   year: 2022,
  //   period: "Mar — Dec 2022",
  //   challenge:
  //     "The club's video team covered campus events live. I was part of the crew that shot and captured a range of campus events, sharpening my photography and videography along the way.",
  //   services: ["Videography", "Photography", "Event coverage"],
  //   role: "Core committee, video team — shot and covered campus events.",
  //   context: "Student club",
  //   media: {
  //     src: "/media/project-photography-club.svg",
  //     alt: "Camera viewfinder framing a campus event, with focus brackets and exposure readouts overlaid.",
  //     width: 1280,
  //     height: 800,
  //   },
  // },
  // {
  //   slug: "kseb-substation-internships",
  //   title: "KSEB Substation Internships",
  //   year: 2022,
  //   period: "May — Jul 2022 · KSEB",
  //   challenge:
  //     "Across three Kerala State Electricity Board substations I learned high-voltage substation operations hands-on — from a 400KV station to a 220KV station and a 66→220KV conversion site — covering single-line diagrams, transformer maintenance, and on-site duties.",
  //   services: ["Substation operations", "Transformer maintenance", "Single-line diagrams"],
  //   role: "Intern — on-site duties across the Madakkathara 400KV, Kalamassery 220KV, and Ettumanoor 66→220KV substations.",
  //   context: "Internship",
  //   media: {
  //     src: "/media/project-kseb.svg",
  //     alt: "High-voltage substation single-line diagram showing transformers and 400KV / 220KV / 66KV feeders.",
  //     width: 1280,
  //     height: 800,
  //   },
  // },
];