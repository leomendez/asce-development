'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="h-full my-52">
      <motion.div
        className="p-8 md:p-36 flex flex-col justify-between h-full items-start"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <motion.h1
          className="text-5xl w-40"
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.4 },
          }}
        >
          Hey, I&apos;m <span className="text-rose-800 font-semibold">Leo</span>
        </motion.h1>
        <p className="text-slate-400 leading-8 md:w-2/3">
          I am a Software Engineer based in Phoenix, Arizona. Currently making people awesome as their Software
          Engineering Manager and developing full stack with Java (Spring Boot) and TypeScript (React)
        </p>
        <Link href="/projects">
          <motion.div
            className="border-2 border-teal-600 text-teal-600 rounded-md p-3"
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.9 }}
          >
            Check out my projects
          </motion.div>
        </Link>
      </motion.div>
    </main>
  );
}
