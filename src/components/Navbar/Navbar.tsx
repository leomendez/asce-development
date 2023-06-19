'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import Image from 'next/image';
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';
import { NavItem } from './NavItem';

export const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <motion.div
      className="flex justify-between items-center py-6 px-10 md:px-36"
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
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
          <NavItem href="/projects" title="Projects" />
          <NavItem href="/blog" title="Blog" />
          <NavItem href="/contact" title="Contact" />
        </div>
      </HamburgerMenu>
    </motion.div>
  );
};
