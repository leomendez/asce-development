'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { NavItem } from './NavItem';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center py-6 px-10 md:px-36">
      <div className="text-2xl font-semibold transition-all duration-150 hover:opacity-80 hover:scale-125">
        <Link href="/">
          <Image src="/icon.png" alt="icon" width={70} height={70} className="pink-logo" />
        </Link>
      </div>
      <HamburgerMenu navOpen={navOpen} setNavOpen={setNavOpen}>
        <div
          className={`flex-col text-center sm:flex-row sm:visible sm:top-0 sm:w-auto sm:h-auto sm:flex
            gap-6 sm:gap-24 text-teal-600 text-lg
            ${navOpen ? ' flex items-center' : 'w-0 hidden'}`}
        >
          <NavItem
            href="/projects"
            title="Projects"
            active={pathname === '/projects'}
            onClick={() => setNavOpen(false)}
          />
          <NavItem href="/blog" title="Blog" active={pathname === '/blog'} onClick={() => setNavOpen(false)} />
          <NavItem href="/contact" title="Contact" active={pathname === '/contact'} onClick={() => setNavOpen(false)} />
        </div>
      </HamburgerMenu>
    </div>
  );
};
