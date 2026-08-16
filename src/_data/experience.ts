export type Role = {
  company: string;
  title: string;
  /** "YYYY-MM" or "YYYY" */
  start: string;
  /** "YYYY-MM", "YYYY", or "present" */
  end: string;
  summary: string;
  stack: string[];
  highlights: string[];
};

export type Project = {
  title: string;
  content: string;
  imageSrc: string;
  tags: string[];
  href?: string;
  isInternal?: boolean;
};

export type SkillGroup = {
  label: string;
  items: string[];
};

export type Education = {
  institution: string;
  credentials: string[];
};

export const bio =
  "Senior Software Engineer specializing in TypeScript, React, and scalable web applications. 7+ years building products that matter. Currently working on AI for Industry at Cognite";

export const roles: Role[] = [
  {
    company: "Cognite",
    // TODO: confirm exact title
    title: "Senior Software Engineer",
    // Confirmed by src/_posts/relay-state.mdx: "In February I started a new job
    // at a company called Cognite."
    start: "2026-02",
    end: "present",
    summary:
      "On the Atlas team, building the Atlas AI product as part of the Agent Experience group. Mostly frontend, with a focus on making a persistent AI agent feel native inside a large microfrontend application.",
    stack: [
      "TypeScript",
      "React",
      "single-spa",
      "LangGraph",
      "Python",
    ],
    highlights: [
      "Solved persistent agent state across single-spa microfrontends, where a memory-router subapp has to survive navigation between independently bundled applications",
      "Authored relay-state, an open source state synchronization library built on useSyncExternalStore and a window-level cache",
      "Working on the agentic loop with LangGraph",
    ],
  },
  {
    company: "Parchment (Instructure)",
    title: "Senior Software Engineer",
    start: "2018",
    end: "2026",
    summary:
      "Progressed from Integration Engineer to Sr. Software Engineer to Engineering Manager, then back to a Senior IC role.",
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Java Spring Boot",
      "GraphQL",
      "Playwright",
    ],
    highlights: [
      "Architected GraphQL code generation improving type safety across frontend apps",
      "Led Next.js adoption and major framework upgrades organization-wide",
      "Increased product conversion rates from 20% to 80%+ through technical optimization",
      "Built CLI tools and testing infrastructure used by multiple engineering teams",
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      "TypeScript",
      "React",
      "Next.js",
      "single-spa",
      "microfrontends",
      "modern testing frameworks",
    ],
  },
  {
    label: "Backend",
    items: ["Node.js", "Java Spring Boot", "GraphQL", "Python"],
  },
  {
    label: "AI",
    items: ["LangGraph", "agentic loops", "agent UX in existing products"],
  },
  {
    label: "DevOps",
    items: ["Docker", "automated testing (Playwright, Selenium)", "GitHub Actions"],
  },
];

export const education: Education[] = [
  {
    institution: "Kansas Wesleyan University",
    credentials: ["MBA", "BS Computer Science"],
  },
];

export const projects: Project[] = [
  {
    title: "relay-state",
    content:
      "Open source state synchronization library for microfrontends. Built on useSyncExternalStore and a window-level cache so independently bundled applications can share state that module-scoped stores like Jotai and Zustand cannot cross.",
    href: "https://github.com/leomendez/relay-state",
    imageSrc: "/blog/relay-state/relay-state.svg",
    tags: ["TypeScript", "React", "single-spa", "Open Source"],
  },
  {
    title: "Asce Football",
    content:
      "Comprehensive football statistics platform covering global leagues with real-time data visualization, built with React and TypeScript for optimal performance.",
    href: "https://football.asce-dev.com",
    imageSrc: "/asce-football-screen.png",
    tags: ["React", "TypeScript", "NextJS", "Styled Components"],
  },
  {
    title: "Portfolio Site",
    content:
      "Modern portfolio website showcasing technical projects and blog content, built with Next.js and Tailwind CSS featuring responsive design and MDX integration.",
    href: "https://asce-dev.com",
    imageSrc: "/asce-dev-screen.png",
    tags: ["React", "TypeScript", "NextJS", "Tailwind"],
  },
  {
    title: "Graduation Verification System",
    content:
      "Full-stack product optimization that increased conversion rates from 20% to 80%+ through improved user experience and streamlined workflows at Parchment.",
    imageSrc: "/graduation-verification.svg",
    tags: [
      "Java Spring Boot",
      "React",
      "TypeScript",
      "Vitest",
      "Jotai",
      "AWS EC2",
      "AWS Lambda",
      "Python",
    ],
    isInternal: true,
  },
  {
    title: "Testing Infrastructure Migration",
    content:
      "Spearheaded Playwright adoption for automated UI testing, dramatically improving test reliability and developer ownership through co-located testing architecture.",
    imageSrc: "/testing-infrastructure.svg",
    tags: ["Playwright", "TypeScript", "GitHub Actions", "Node.js"],
    isInternal: true,
  },
  {
    title: "Developer Experience CLI Tools",
    content:
      "Created internal CLI tooling to improve developer workflows, documentation standards, and team productivity across remote engineering teams.",
    imageSrc: "/cli-tools.svg",
    tags: ["Node.js", "TypeScript", "CLI Frameworks"],
    isInternal: true,
  },
  {
    title: "Next.js Migration Initiative",
    content:
      "Led organization-wide adoption of Next.js and major framework upgrades, establishing modern frontend architecture patterns used across multiple teams.",
    imageSrc: "/nextjs-migration.svg",
    tags: ["Next.js", "React", "TypeScript", "Modern Build Tools"],
    isInternal: true,
  },
];

export const formatRoleDates = ({ start, end }: Role): string => {
  const year = (value: string) => value.split("-")[0];
  return end === "present"
    ? `${year(start)} — present`
    : `${year(start)} — ${year(end)}`;
};
