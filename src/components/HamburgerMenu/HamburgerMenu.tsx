import React, { useState } from 'react';

type Props = {
  children: React.ReactNode;
  navOpen: boolean;
  setNavOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HamburgerMenu({ children, navOpen, setNavOpen }: Props) {
  return (
    <>
      <div className={`w-full h-[92%] absolute top-16 left-0 ${navOpen ? ' backdrop-blur-sm z-10' : ' -z-10'}`} />
      <div
        className={`absolute text-lg transition-all duration-300 top-16 right-0 sm:relative 
            sm:visible sm:top-0 sm:w-auto sm:gap-6 h-5/6 sm:h-auto
           dark:bg-asce-bg-dark bg-asce-bg px-8 py-6 sm:p-0 sm:shadow-none
          ${
            navOpen
              ? ' shadow-md dark:shadow-asce-primary-dark w-2/3 z-10 visible'
              : 'w-0 z-0 p-0 dark:bg-transparent bg-transparent'
          }`}
      >
        {children}
      </div>
      <button className="sm:hidden flex flex-col gap-1" onClick={() => setNavOpen((prev) => !prev)}>
        <span
          className={`w-4 h-0.5 bg-asce-font dark:bg-asce-font-dark transition-all duration-200
            ${navOpen && 'rotate-45 translate-y-1'}`}
        />
        <span
          className={`w-4 h-0.5 bg-asce-font dark:bg-asce-font-dark transition-all duration-200
            ${navOpen && 'hidden'}`}
        />
        <span
          className={`w-4 h-0.5 bg-asce-font dark:bg-asce-font-dark transition-all duration-200
            ${navOpen && '-rotate-45 -translate-y-0.5'}`}
        />
      </button>
    </>
  );
}
