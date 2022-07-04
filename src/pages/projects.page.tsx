import Link from 'next/link';
import { ImNewTab } from 'react-icons/im';

type Props = {};

export default function Projects({}: Props) {
  return (
    <div className="px-10 pt-4">
      <h1 className="text-3xl font-bold w-full border-b-2 pb-2 dark:border-asce-font-dark border-asce-font">Projects</h1>
      <div className="pt-6">
        <Link href="https://football.asce-dev.com" target="_blank">
          <a
            className="shadow-sm flex p-2 w-64 hover:shadow-md shadow-asce-primary-dark cursor-pointer 
                        flex-col rounded-lg bg-opacity-60 hover:scale-105 transition-all"
            target="_blank"
          >
            <div className='border-2 rounded-md p-4 m-2 h-32 border-asce-primary border-opacity-40'>Image placeholder</div>
            <div className="px-4 py-2 font-medium">NextJS + Styled Components</div>
            <div className="p-4">Football website with stats about all football leagues in the world</div>
            <div className="border-y-2 w-full py-2 px-4 flex justify-between items-center font-semibold border-asce-primary">
              Asce Football <ImNewTab />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}
