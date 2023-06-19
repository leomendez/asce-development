'use client';
import { ProjectCard } from '@/components/ProjectCard';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <main className="h-full ">
      <div className="p-8 md:p-36 flex flex-col h-full items-start overflow-hidden">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          Projects
        </motion.h1>
        <motion.div
          className="mt-20 flex flex-col gap-4"
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
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
        </motion.div>
      </div>
    </main>
  );
}
