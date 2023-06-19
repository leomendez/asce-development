'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="h-full ">
      <div className="p-8 md:p-36 flex flex-col h-full items-start overflow-hidden">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            ease: 'easeInOut',
          }}
        >
          Blog
        </motion.h1>
        <motion.div
          className="text-slate-400 flex gap-16 flex-col items-center"
          initial={{ opacity: 0, x: -400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
            <Link href="/blog/hello-world">some</Link>
        </motion.div>
      </div>
    </main>
  );
}
