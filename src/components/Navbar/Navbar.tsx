import { useTheme } from 'next-themes';
import Link from 'next/link';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

type Props = {};

export default function Navbar({}: Props) {
  const { theme, setTheme } = useTheme();
  const [navOpen, setNavOpen] = useState(false);

  const icon = useMemo(() => (theme === 'dark' ? <MdDarkMode /> : <MdLightMode />), [theme]);

  return (
    <div className="flex justify-between items-center py-6 px-10">
      <div className="text-2xl font-semibold underline-animation">
        <Link href="/">
          <a className="flex gap-2 justify-center items-center">
            <Image src="/icon.png" alt="icon" width="20px" height="20px" className="dark:invert" />
            Asce Development
          </a>
        </Link>
      </div>
      <HamburgerMenu navOpen={navOpen} setNavOpen={setNavOpen}>
        <div
          className={`flex-col text-center sm:flex-row sm:visible sm:top-0 sm:w-auto sm:h-auto sm:flex
            gap-6 sm:gap-8 text-base
            ${navOpen ? ' flex items-center' : 'w-0 hidden'}`}
        >
          <Link href="/projects">
            <a
              className={
                'font-medium w-full sm:pb-0 pb-6 sm:flex sm:items-center ' +
                'border-asce-font dark:border-asce-font-dark'
              }
            >
              <span className="underline-animation">Projects</span>
            </a>
          </Link>
          <Link href="/blog">
            <a
              className={
                'font-medium w-full sm:pb-0 pb-6 sm:flex sm:items-center ' +
                'border-asce-font dark:border-asce-font-dark'
              }
            >
              <span className="underline-animation">Blog</span>
            </a>
          </Link>
          <Link href="/">
            <a
              className={
                'font-medium w-full sm:pb-0 pb-6 sm:flex sm:items-center ' +
                'border-asce-font dark:border-asce-font-dark'
              }
            >
              <span className="underline-animation">Home</span>
            </a>
          </Link>
          <button
            className={
              'shadow-sm border-asce-font dark:border-asce-font-dark border-2 rounded-full p-2 sm:ml-2 ' +
              'hover:opacity-70 text-sm flex justify-center items-center gap-2'
            }
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {icon}
          </button>
        </div>
      </HamburgerMenu>
    </div>
  );
}
