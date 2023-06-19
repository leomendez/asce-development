'use client';
import { BlogCard } from '@/components/BlogCard';
import { motion } from 'framer-motion';

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
          className="text-slate-400 flex gap-16 flex-col items-center mt-20"
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <BlogCard
            content="Some content"
            href="/blog/hello-world"
            imageSrc="/blog/hello-world/hello-world.jpg"
            tags={['React', 'TypeScript', 'NextJS', 'Styled Components']}
            title="Hello World"
          />
        </motion.div>
      </div>
    </main>
  );
}
