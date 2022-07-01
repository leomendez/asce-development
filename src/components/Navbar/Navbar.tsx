import { useTheme } from 'next-themes';
import Link from 'next/link';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import React, { useMemo } from 'react';
import Image from 'next/image';

type Props = {};

export default function Navbar({}: Props) {
  const { theme, setTheme } = useTheme();

  const icon = useMemo(() => (theme === 'dark' ? <MdDarkMode /> : <MdLightMode />), [theme]);

  return (
    <div className="flex justify-between items-center p-6">
      <div className="text-2xl font-semibold border-b-4 hover:border-asce-aux border-transparent transition-all">
        <Link href="/">
          <a className="flex gap-2 justify-center items-center">
            <Image src="/icon.png" alt="icon" width="20px" height="20px" className="dark:invert" />
            Asce Development
          </a>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-8 text-xl">
        <Link href="/projects">
          <a className=" border-b-4 hover:border-asce-aux border-transparent transition-all font-medium">Projects</a>
        </Link>
        <button
          className="shadow-sm border-asce-font dark:border-asce-font-dark border-2 rounded-full p-2 hover:opacity-70 text-sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {icon}
        </button>
      </div>
    </div>
  );
}
