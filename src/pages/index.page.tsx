import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {

  return (
    <div>
      <div className="flex w-full justify-between pt-24 px-10 sm:px-20 sm:flex-row flex-col-reverse gap-10 sm:gap-2 xl:px-64 3xl:px-96">
        <div className="text-xl flex flex-col gap-2 min-w-[240px]">
          <h2 className="text-3xl my-4 font-semibold">Hi, I am Leo 👋 </h2>
          <p>Software Developer 🖥 </p>
          <p>React Enthusiast ⚛ </p>
          <p>Tennis Player 🎾 </p>
        </div>
        <Image src="/dev-logo-svg.svg" alt="logo" width="500px" height="200px" className="dark:invert" />
      </div>
      <div className="text-3xl w-full flex items-center justify-center pt-16 pb-10 sm:pt-52 gap-2 px-10 sm:px-4 
        flex-col sm:flex-row text-center">
        Feel free to explore my{' '}
        <Link href="/projects">
          <a className="font-semibold underline-animation">Projects</a>
        </Link>
      </div>
    </div>
  );
}
