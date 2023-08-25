import { BlogCard } from '@/components/BlogCard';

export default function Page() {
  return (
    <main className="h-full ">
      <div className="p-8 md:p-36 flex flex-col h-full items-start overflow-x-hidden">
        <h1
          className="text-4xl font-bold"
        >
          Blog
        </h1>
        <div
          className="text-slate-400 flex gap-16 flex-col items-center mt-20"
        >
          <BlogCard
            content="Some content"
            href="/blog/hello-world"
            imageSrc="/blog/hello-world/hello-world.jpg"
            tags={['React', 'TypeScript', 'NextJS', 'Styled Components']}
            title="Hello World"
          />
        </div>
      </div>
    </main>
  );
}
