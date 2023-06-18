import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-full my-52">
      <div className="p-8 md:p-36 flex flex-col justify-between h-full items-start">
        <h1 className="text-5xl w-40">
          Hey, I&apos;m <span className="text-rose-800 font-semibold">Leo</span>
        </h1>
        <p className="text-slate-400 leading-8 md:w-2/3">
          I am a Software Engineer based in Phoenix, Arizona. Currently making people awesome as a Software Engineering
          Manager, and developing full stack with Java (Spring Boot) and TypeScript (React)
        </p>
        <Link className="border-2 border-teal-600 text-teal-600 rounded-md p-3" href="/projects">Check out my projects</Link>
      </div>
    </main>
  );
}
