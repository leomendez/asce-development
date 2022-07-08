import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

type Props = {};

export default function Footer({}: Props) {
  return (
    <div
      className="w-full flex flex-col items-center p-4 sm:absolute bottom-0 justify-center
      bg-asce-bg dark:bg-asce-bg-dark text-sm"
    >
      <div className="flex gap-4 duration-150 pb-2 text-2xl">
        <a
          href="https:github.com/leomendez"
          className="transition-all duration-150 hover:opacity-80 hover:scale-125"
          target="_blank"
        >
          <AiFillGithub />
        </a>
        <a
          href="https://twitter.com/leomenbel"
          className="transition-all duration-150 hover:opacity-80 hover:scale-125"
          target="_blank"
        >
          <AiFillTwitterCircle />
        </a>
        <a
          href="https://www.linkedin.com/in/leonardo-mendez-a5ba85107/"
          className="transition-all duration-150 hover:opacity-80 hover:scale-125"
          target="_blank"
        >
          <AiFillLinkedin />
        </a>
      </div>
      <div>&copy; Copyright {new Date().getFullYear()}, Leo Mendez</div>
    </div>
  );
}
