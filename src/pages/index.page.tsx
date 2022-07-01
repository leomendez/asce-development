import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <div className="flex w-full justify-between pt-32 px-20">
        <div className="text-xl flex flex-col gap-2">
          <h2 className="text-3xl my-4 font-semibold">Hi, I am Leo Mendez 👋 </h2>
          <p>Software Developer 🖥 </p>
          <p>Tennis Player 🎾 </p>
          <p>Gamer 🎮 </p>
        </div>
        <Image src="/dev-logo-svg.svg" alt="logo" width="500px" height="200px" className="dark:invert" />
      </div>
      <div className="text-3xl w-full flex items-center justify-center pt-52 gap-2">
        Feel free to explore my{' '}
        <Link href="/projects">
          <a className="font-semibold border-b-4 hover:border-asce-aux border-transparent">Projects</a>
        </Link>
      </div>
    </div>
  );
}
