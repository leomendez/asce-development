import Link from 'next/link';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai'

type Props = {};

export default function Footer({}: Props) {
  return (
    <div className="w-full flex justify-center items-center p-4 sm:absolute bottom-0 bg-asce-bg dark:bg-asce-bg-dark text-2xl">
      <Link href="https:github.com/leomendez">
        <a className='hover:scale-125 transition-all duration-150 hover:opacity-80' target="_blank"><AiFillGithub /></a>
      </Link>
    </div>
  );
}
