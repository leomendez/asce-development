"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

export const ProjectsLink = () => {
  return (
    <Link href="/projects">
      <motion.div
        className="border-2 border-teal-600 text-teal-600 rounded-md p-3"
        whileHover={{
          scale: 1.1,
          transition: { duration: 0.2 },
        }}
        whileTap={{ scale: 0.9 }}
      >
        View my work
      </motion.div>
    </Link>
  );
};

