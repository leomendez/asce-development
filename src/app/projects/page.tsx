import { ProjectCard } from "@/components/ProjectCard";

export default function Page() {
  return (
    <main className="pb-5">
      <div className="p-8 md:p-36 flex flex-col items-start ">
        <h1 className="text-4xl font-bold">Projects</h1>
        <div className="mt-20 flex flex-col gap-4 w-full">
          <ProjectCard
            content="Comprehensive football statistics platform covering global leagues with real-time data visualization, built with React and TypeScript for optimal performance."
            href="https://football.asce-dev.com"
            imageSrc="/asce-football-screen.png"
            tags={["React", "TypeScript", "NextJS", "Styled Components"]}
            title="Asce Football"
          />
          <ProjectCard
            content="Modern portfolio website showcasing technical projects and blog content, built with Next.js 15 and Tailwind CSS featuring responsive design and MDX integration."
            href="https://asce-dev.com"
            imageSrc="/asce-dev-screen.png"
            tags={["React", "TypeScript", "NextJS", "Tailwind"]}
            title="Portfolio Site"
          />
          <ProjectCard
            content="Full-stack product optimization that increased conversion rates from 20% to 80%+ through improved user experience and streamlined workflows at Parchment."
            imageSrc="/graduation-verification.svg"
            tags={[
              "Java Spring Boot",
              "React",
              "TypeScript",
              "Vitest",
              "Jotai",
              "AWS EC2",
              "AWS Lambda",
              "Python",
            ]}
            title="Graduation Verification System"
            isInternal={true}
          />
          <ProjectCard
            content="Spearheaded Playwright adoption for automated UI testing, dramatically improving test reliability and developer ownership through co-located testing architecture."
            imageSrc="/testing-infrastructure.svg"
            tags={["Playwright", "TypeScript", "GitHub Actions", "Node.js"]}
            title="Testing Infrastructure Migration"
            isInternal={true}
          />
          <ProjectCard
            content="Created internal CLI tooling to improve developer workflows, documentation standards, and team productivity across remote engineering teams."
            imageSrc="/cli-tools.svg"
            tags={["Node.js", "TypeScript", "CLI Frameworks"]}
            title="Developer Experience CLI Tools"
            isInternal={true}
          />
          <ProjectCard
            content="Led organization-wide adoption of Next.js and major framework upgrades, establishing modern frontend architecture patterns used across multiple teams."
            imageSrc="/nextjs-migration.svg"
            tags={["Next.js", "React", "TypeScript", "Modern Build Tools"]}
            title="Next.js Migration Initiative"
            isInternal={true}
          />
        </div>
      </div>
    </main>
  );
}
