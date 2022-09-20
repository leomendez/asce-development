import Link from 'next/link';
import Image from 'next/image';
import { ImNewTab } from 'react-icons/im';
import { AiFillGithub } from 'react-icons/ai';
import { ProjectCard } from '../components';

type Props = {};

export default function Projects({}: Props) {
  return (
    <div className="p-10 h-full w-full mb-32">
      <h1 className="text-3xl font-bold w-full border-b-2 pb-2 dark:border-asce-font-dark border-asce-font">
        Projects
      </h1>
      <div className="pt-8 flex gap-8 justify-start flex-col sm:flex-row">
        <ProjectCard
          content="Football website with stats about all football leagues in the world"
          title="Typescript + NextJS + Styled Components"
          githubLink="https://github.com/leomendez/asce-football"
          siteLink="https://football.asce-dev.com"
          imageSrc="/asce-football-screen.png"
          projectName="Asce Football"
        />
        <ProjectCard
          content="Portfolio site"
          title="Typescript + NextJS + Tailwind"
          githubLink="https://github.com/leomendez/asce-development"
          siteLink="https://asce-dev.com"
          imageSrc="/asce-dev-screen.png"
          projectName="Asce Development"
        />
      </div>
    </div>
  );
}
