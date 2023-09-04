import React from 'react';
import { MainHeading } from './MainHeading';
import { ProjectsLink } from './ProjectsLink';

export default function Home() {
  return (
    <main className="h-full mt-10">
      <div className="p-8 md:p-36 flex flex-col md:gap-32 gap-16 h-full items-start">
        <MainHeading />
        <p className="text-slate-400 leading-8 md:w-2/3">
          I am a Software Engineer based in Phoenix, Arizona. Currently making people awesome as their Software
          Engineering Manager and developing full stack with TypeScript (React) and Java (Spring Boot)
        </p>
        <ProjectsLink />
      </div>
    </main>
  );
}
