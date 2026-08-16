import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/_data";

export default function Page() {
  return (
    <main className="pb-5">
      <div className="p-8 md:p-36 flex flex-col items-start ">
        <h1 className="text-4xl font-bold">Projects</h1>
        <div className="mt-20 flex flex-col gap-4 w-full">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              content={project.content}
              href={project.href}
              imageSrc={project.imageSrc}
              isInternal={project.isInternal}
              tags={project.tags}
              title={project.title}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
