'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from 'react-icons/ai';

export const Footer = () => {
  return (
    <motion.div
      className="text-teal-600 w-full flex flex-col items-center p-4 bottom-0 justify-center text-sm"
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="flex gap-24 duration-150 pb-2 text-2xl">
        <a
          href="https://github.com/leomendez"
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
    </motion.div>
  );
};
