import Link from 'next/link';
import { ImNewTab } from 'react-icons/im';

type Props = {};

export default function Projects({}: Props) {
  return (
    <div className="px-10 pt-4">
      <h1 className="text-3xl font-bold w-full border-b-2 pb-2">Projects</h1>
      <div className="pt-6">
        <Link href="https://football.asce-dev.com" target="_blank">
          <a
            className="shadow-sm flex p-2 w-64 hover:shadow-asce-aux shadow-asce-secondary-dark cursor-pointer 
                        flex-col rounded-lg"
            target="_blank"
          >
            <div className="border-b-2 w-full px-2 pt-2 flex justify-between items-center font-semibold border-asce-primary">Asce Football <ImNewTab /></div>
            <div className="p-2">Football website with stats about all football leagues in the world</div>
          </a>
        </Link>
      </div>
    </div>
  );
}
