'use client';
import { motion } from 'framer-motion';
import { BiLinkExternal } from 'react-icons/bi';

export default function Page() {
  return (
    <main className="h-full ">
      <div className="p-8 md:p-64 flex flex-col h-full gap-32 items-center">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          Get In Touch
        </motion.h1>
        <motion.div
          className="text-slate-400 flex gap-16 flex-col items-center"
          initial={{ opacity: 0, x: -400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <p className="text-xl">Feel free to reach me via my socials below</p>
          <p className="flex gap-1 flex-wrap items-center justify-center">
            And to give credit where it is due. Please visit{' '}
            <a
              href="https://brittanychiang.com/"
              target="_blank"
              className="text-teal-600 flex items-center gap-1 hover:font-bold"
            >
              brittanychiang.com <BiLinkExternal />
            </a>{' '}
            I used her site as inspiration for this one.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
