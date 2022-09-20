import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="p-8 xl:p-36">
      <Image src="/dev-logo-svg.svg" alt="logo" width="200px" height="100px" className="dark:invert" />
      <h1 className="text-4xl font-bold max-w-3xl py-8">Software engineer, React enthusiast, and tennis player</h1>
      <p>
        I am Leo, a Software Engineer based in Phoenix, Arizona. Currently making people awesome as a Software
        Engineering Manager, and developing full stack with Java (Spring Boot) and TypeScript (React)
      </p>
      <div
        className="text-3xl w-full flex items-center justify-center pt-16 pb-10 sm:pt-52 gap-2 px-10 sm:px-4 
        flex-col sm:flex-row text-center"
      >
        Feel free to explore my personal{' '}
        <Link href="/projects">
          <a className="font-semibold underline-animation">Projects</a>
        </Link>
      </div>
    </div>
  );
}
