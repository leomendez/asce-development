import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HamburgerMenu({ children, navOpen, setNavOpen }: Props) {
  return (
    <>
      <div
        className={`w-full h-[92%] absolute top-24 left-0 ${navOpen ? ' backdrop-blur-xs z-10' : ' -z-10'}`}
        onClick={() => setNavOpen(false)}
      />
      <div
        className={`absolute text-lg transition-all duration-300 top-16 right-0 sm:relative 
            sm:visible sm:top-0 sm:w-auto sm:gap-6 h-[92%] sm:h-auto
            px-8 py-6 sm:p-0 sm:shadow-none
          ${navOpen ? ' shadow-md  w-2/3 z-10 visible' : 'w-0 z-0 p-0 dark:bg-transparent bg-transparent'}`}
      >
        {children}
      </div>
      <button className="sm:hidden flex flex-col gap-2 items-end" onClick={() => setNavOpen((prev) => !prev)}>
        <span
          className={`h-0.5 bg-teal-600 transition-all duration-200
            ${navOpen ? 'rotate-45 translate-y-1 w-4' : 'w-8'}`}
        />
        <span
          className={`w-6 h-0.5 bg-teal-600 transition-all duration-200
            ${navOpen && 'hidden'}`}
        />
        <span
          className={`w-4 h-0.5 bg-teal-600 transition-all duration-200
            ${navOpen && '-rotate-45 -translate-y-1.5'}`}
        />
      </button>
    </>
  );
}
