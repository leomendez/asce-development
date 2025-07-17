'use client';
import { motion } from 'framer-motion';
import React from 'react';

export const MainHeading = () => {
  return (
    <h1
      className="w-40 animate-text bg-linear-to-r from-teal-500 via-purple-500 
      to-orange-500 bg-clip-text text-transparent text-5xl font-black"
    >
      Hey, I&apos;m <span>Leo</span>
    </h1>
  );
};
