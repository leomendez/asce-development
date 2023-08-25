'use client';
import { motion } from 'framer-motion';
import React from 'react';

export const MainHeading = () => {
  return (
    <motion.h1
      className="text-5xl w-40"
      animate={{ color: ['rgb(255 255 255)', 'rgb(13 148 136)', 'rgb(255 255 255)'] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatDelay: 1,
      }}
    >
      Hey, I&apos;m{' '}
      <motion.span
        className="font-semibold"
        animate={{ color: ['rgb(13 148 136)', 'rgb(159 18 57)', 'rgb(13 148 136)'] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        Leo
      </motion.span>
    </motion.h1>
  );
};
