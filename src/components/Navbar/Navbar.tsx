import { useTheme } from 'next-themes';
import Link from 'next/link';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import React, { useMemo } from 'react';

type Props = {};

export default function Navbar({}: Props) {
  const { theme, setTheme } = useTheme();

  const icon = useMemo(() => (theme === 'dark' ? <MdDarkMode /> : <MdLightMode />), [theme]);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="text-2xl font-semibold hover:border-b-4 border-asce-imperialRed transition-all">
        <Link href="/">
          <a>Navbar</a>
        </Link>
      </div>
      <div className="flex justify-between items-center gap-2">
        Right content{' '}
        <button
          className="shadow-sm border-2 rounded-full p-2 hover:opacity-70 text-sm"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {icon}
        </button>
      </div>
    </div>
  );
}
