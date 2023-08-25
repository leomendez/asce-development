import { ProjectCard } from '@/components/ProjectCard';

export default function Page() {
  return (
    <main className="h-full ">
      <div className="p-8 md:p-36 flex flex-col h-full items-start overflow-hidden">
        <h1 className="text-4xl font-bold">Projects</h1>
        <div className="mt-20 flex flex-col gap-4">
          <ProjectCard
            content="Football website with stats about all football leagues in the world"
            href="https://football.asce-dev.com"
            imageSrc="/asce-football-screen.png"
            tags={['React', 'TypeScript', 'NextJS', 'Styled Components']}
            title="Asce Football"
          />
          <ProjectCard
            content="Portfolio site"
            href="https://asce-dev.com"
            imageSrc="/asce-dev-screen.png"
            tags={['React', 'TypeScript', 'NextJS', 'Tailwind']}
            title="Asce Development"
          />
        </div>
      </div>
    </main>
  );
}
