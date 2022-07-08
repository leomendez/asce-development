import React from 'react';
import Image from 'next/image';
import { AiFillGithub } from 'react-icons/ai';
import { ImNewTab } from 'react-icons/im';

type Props = {
  githubLink: string;
  siteLink: string;
  projectName: string;
  imageSrc: string;
  title: string;
  content: string;
};

export default function ProjectCard({ githubLink, siteLink, projectName, content, imageSrc, title }: Props) {
  return (
    <div
      className="shadow-sm flex p-6 hover:shadow-md shadow-asce-primary-dark sm:w-80
                  flex-col rounded-lg bg-opacity-60 hover:scale-105 transition-all justify-between"
    >
      <div className="border-2 rounded-md m-2 border-asce-primary border-opacity-80">
        <Image
          className="rounded-md"
          alt="Preview Screenshot of www.asce-dev.com"
          src={imageSrc}
          width="1280px"
          height="780px"
          layout="responsive"
        />
      </div>
      <div className='flex flex-col justify-start h-full pt-2'>
        <div className="px-4 py-2 font-medium">{title}</div>
        <div className="p-4">{content}</div>
      </div>
      <div
        className="border-y-2 w-full py-2 px-4 flex justify-between items-center font-semibold 
        border-asce-primary "
      >
        {projectName}
        <div className="flex gap-4 text-xl">
          <a href={githubLink} target="_blank" className="transition-all duration-150 hover:opacity-80 hover:scale-125">
            <AiFillGithub />
          </a>
          <a href={siteLink} target="_blank" className="transition-all duration-150 hover:opacity-80 hover:scale-125">
            <ImNewTab />
          </a>
        </div>
      </div>
    </div>
  );
}
