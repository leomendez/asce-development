import React from 'react';
import { MainHeading } from '@/components/MainHeading';
import { ProjectsLink } from '@/components/ProjectsLink';

export default function Home() {
  return (
    <main className="h-full mt-10">
      <div className="p-8 md:p-36 flex flex-col md:gap-32 gap-16 h-full items-start">
        <MainHeading />
        <p className="text-slate-400 leading-8 md:w-2/3">
          Senior Software Engineer specializing in TypeScript, React, and scalable web applications. 7+ years building products that matter at Parchment/Instructure.
        </p>
        <ProjectsLink />
      </div>
    </main>
  );
}
