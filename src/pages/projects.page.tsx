import Link from 'next/link';
import Image from 'next/image';
import { ImNewTab } from 'react-icons/im';
import { AiFillGithub } from 'react-icons/ai';

type Props = {};

export default function Projects({}: Props) {
  return (
    <div className="px-10 pt-4 pb-10">
      <h1 className="text-3xl font-bold w-full border-b-2 pb-2 dark:border-asce-font-dark border-asce-font">
        Projects
      </h1>
      <div className="pt-6">
        <div
          className="shadow-sm flex p-6 hover:shadow-md shadow-asce-primary-dark sm:w-80
                        flex-col rounded-lg bg-opacity-60 hover:scale-105 transition-all "
        >
          <div className="border-2 rounded-md m-2 border-asce-primary border-opacity-80">
            <Image
              className="rounded-md"
              alt="Preview Screenshot of www.asce-dev.com"
              src="/asce-football-screen.png"
              width="1280px"
              height="780px"
              layout="responsive"
            />
          </div>
          <div className="px-4 py-2 font-medium">Typescript + NextJS + Styled Components</div>
          <div className="p-4">Football website with stats about all football leagues in the world</div>
          <div className="border-y-2 w-full py-2 px-4 flex justify-between items-center font-semibold border-asce-primary">
            Asce Football
            <div className="flex gap-4 text-xl">
              <a
                href="https://github.com/leomendez/asce-football"
                target="_blank"
                className="transition-all duration-150 hover:opacity-80 hover:scale-125"
              >
                <AiFillGithub />
              </a>
              <a
                href="https://football.asce-dev.com"
                target="_blank"
                className="transition-all duration-150 hover:opacity-80 hover:scale-125"
              >
                <ImNewTab />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
